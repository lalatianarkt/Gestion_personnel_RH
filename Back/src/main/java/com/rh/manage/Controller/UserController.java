package com.rh.manage.Controller;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rh.manage.Model.Token;
import com.rh.manage.Model.User;
import com.rh.manage.Service.EmailService;
import com.rh.manage.Service.TokenService;
import com.rh.manage.Service.UserService;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired 
    private TokenService tokenService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/resendToken")
    public ResponseEntity<Map<String, String>> resendToken(@RequestParam String email) {
        try {
            // Appel du service pour renvoyer le token par email
            String token = emailService.sendTokenEmail(email);

            // Réponse réussie
            return ResponseEntity.ok(Map.of(
                "status", "200",
                "message", "📩 Un nouveau token a été envoyé à " + email
            ));
        } catch (Exception e) {
            // En cas d'erreur
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "status", "500",
                "message", "❌ Erreur lors de l'envoi du token : " + e.getMessage()
            ));
        }
    } 

    // 🔹 Envoi du token d'inscription par email
    @PostMapping("/sendToken")
    // @PostMapping
    public ResponseEntity<?> sendToken(@RequestBody User user) {
        try {
            if (user.getEmail() == null || user.getEmail().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Email obligatoire");
            }

            if (user.getPassword() == null || user.getPassword().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Mot de passe obligatoire");
            }
            userService.registerUser(user);
            LocalDateTime now = LocalDateTime.now();
            // Vérifie si l'utilisateur existe
            Optional<User> existingUser = userService.findByEmail(user.getEmail());
            if (existingUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Utilisateur non trouvé"));
            }

            // Génère un token et envoie par email
            String tokenValue = emailService.sendTokenEmail(user.getEmail());

            Token tok = new Token();
            tok.setCreatedAt(now);
            tok.setExpiresAt(now.plusSeconds(30)); // expire dans 30 secondes
            tok.setIsActive(1);
            tok.setTokenGenere(tokenValue);
            tok.setType("inscription");
            tok.setUser(existingUser.get());

            tokenService.save(tok);

            return ResponseEntity.ok(Map.of("message", "Token envoyé avec succès à " + user.getEmail() + "" + "Veuillez valider votre inscription dans votre email"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Erreur lors de l'envoi du token : " + e.getMessage()));
        }
    }

    // 🔹 Confirmation du compte utilisateur
    @PostMapping("/confirmUser")
    public ResponseEntity<?> confirmUser(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String tokenInput = request.get("token");

            if (email == null || tokenInput == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Email et token requis"));
            }

            Optional<User> userOpt = userService.findByEmail(email);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Utilisateur non trouvé"));
            }

            User user = userOpt.get();
            Token token = tokenService.getDernierTokenByUser(user);

            if (token == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Aucun token trouvé pour cet utilisateur"));
            }

            LocalDateTime now = LocalDateTime.now();

            if (now.isAfter(token.getExpiresAt())) {
                return ResponseEntity.status(HttpStatus.GONE)
                        .body(Map.of("message", "Le token a expiré. Veuillez renvoyer un nouveau token."));
            }

            if (!token.getTokenGenere().equals(tokenInput)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Token invalide. Veuillez vérifier votre email."));
            }

            // ✅ Confirmation réussie
            token.setIsActive(0); // désactive le token
            tokenService.update(token);

            // user.setVerified(true);
            user.setStatut(1);
            user.setModifiedAt(LocalDateTime.now());
            userService.save(user);

            return ResponseEntity.ok(Map.of("message", "Compte confirmé avec succès"));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Erreur lors de la confirmation : " + e.getMessage()));
        }
    }

    // 🔹 Inscription utilisateur
    @PostMapping
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            if (user.getEmail() == null || user.getEmail().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Email obligatoire");
            }

            if (user.getPassword() == null || user.getPassword().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Mot de passe obligatoire");
            }

            // userService.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Utilisateur créé avec succès");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de l'inscription : " + e.getMessage());
        }
    }

    // 🔹 Authentification utilisateur
    @PostMapping("/auth")
    public ResponseEntity<?> authenticate(@RequestBody User userRequest) {
            try {
            User user = userService.authenticate(userRequest);

            if (user != null) {
                Token token = tokenService.generateToken(user, "AUTH");

                // Déterminer le chemin de redirection selon le type d'utilisateur
                String path;
                switch (user.getTypeUser().getType()) {
                    case "Admin":
                        path = "/dashboard-RH/";
                        break;
                    case "Manager":
                        path = "/dashboard-Manager";
                        break;
                    case "Employe":
                        path = "/dashboard-Employe";
                        break;
                    default:
                        path = "/"; // fallback
                }

                // Retourner la réponse
                return ResponseEntity.ok(Map.of(
                    "status", 200,
                    "message", "Authentification réussie",
                    "token", token.getTokenGenere(),
                    "user", user.getEmail(),
                    "path", path
                ));
            } else {
                return ResponseEntity.status(401).body(Map.of(
                    "status", 401,
                    "message", "Authentification échouée : identifiants invalides"
                ));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                "status", 500,
                "message", "Erreur serveur : " + e.getMessage()
            ));
        }
    }

}
