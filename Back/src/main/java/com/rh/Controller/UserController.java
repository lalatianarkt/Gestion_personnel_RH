package com.rh.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.rh.Model.Token;
import com.rh.Model.User;
import com.rh.Service.TokenService;
import com.rh.Service.UserService;

public class UserController {
    @Autowired
    private UserService userService;

    @Autowired 
    private TokenService tokenService;

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

