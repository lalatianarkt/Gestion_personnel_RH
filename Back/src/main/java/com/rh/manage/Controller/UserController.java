package com.rh.manage.Controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/sendToken")
    public ResponseEntity<?> sendToken(@RequestBody User user) {
        String token = emailService.sendTokenEmail(user.getEmail());
        Token tok = new Token();
        tok.setCreatedAt(now);
        tok.setExpiresAt(now + 30s);
        // if(token is not expired){
        tok.setIsActive(0);
        tok.setTokenGenere(token);
        tok.setType("inscription");
        user = userService.findByEmail(user.getEmail()).get();
        tok.setUser(user);
        tokenService.save(tok);
        return ResponseEntity.ok(Map.of("message", "Compte confirmé avec succès"));
    }

    @PostMapping("/confirmUser")
    public ResponseEntity<?> confirmUser(@RequestBody User user, Token token_entre){
        Token token = tokenService.getDernierTokenByUser(user);
        if(token.getExpiresAt() < now){
            if(token.getTokenGenere().equals(token_entre.getTokenGenere())){
                token.setIsActive(0); //n'est plus active
                tokenService.update(token);
                return ok(200);
            } else {
                return 500 ==> erreur => "Veuillez renvoyer vers votre gmail";
            }
        }

        return ResponseEntity;
    } 

    @PostMapping
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            

            // System.out.println("débogage+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            // System.out.println("email received : " + user.getEmail());
            // System.out.println("password received : " + user.getPassword());
            // System.out.println("typeUser : " + user.getTypeUser().getId());
            // System.out.println("matricule : " + user.getEmploye().getInfosProfessionnelles().getMatricule());



            // System.out.println("débogage+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

            // Vérifier email avant enregistrement
            if (user.getEmail() == null || user.getEmail().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Email obligatoire");
            }

            if (user.getPassword() == null || user.getPassword().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Mot de passe obligatoire");
            }

            // Enregistrer l'utilisateur
            userService.registerUser(user);

            // Réponse succès
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Utilisateur créé avec succès");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de l'inscription : " + e.getMessage());
        }
    }

    @PostMapping("/auth")
    public ResponseEntity<?> authenticate(@RequestBody User userRequest) {
        try {
            // 1️⃣ Authentifier l'utilisateur
            User user = userService.authenticate(userRequest);
            
            if (user != null) {
                // 2️⃣ Générer un token
                Token token = tokenService.generateToken(user, "AUTH");
                
                // 3️⃣ Retourner une réponse réussie
                return ResponseEntity.ok(Map.of(
                    "status", 200,
                    "message", "Authentification réussie",
                    "token", token.getTokenGenere(),
                    "user", user.getEmail()
                ));
            } else {
                // Mot de passe ou email invalide
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

