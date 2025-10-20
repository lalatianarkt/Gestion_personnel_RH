package com.rh.Service;

import com.rh.Model.Token;
import com.rh.Model.User;
import com.rh.Repository.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class TokenService {

    @Autowired
    private TokenRepository tokenRepository;

    /**
     * Génère et enregistre un nouveau token pour un utilisateur.
     *
     * @param user L'utilisateur pour lequel le token est généré
     * @param type Le type de token (ex: "AUTH", "RESET_PASSWORD", etc.)
     * @return Le token nouvellement créé
     */
    public Token generateToken(User user, String type) {
        // Génération d'un token aléatoire unique
        String generatedToken = UUID.randomUUID().toString();

        // Définition des dates
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiration = now.plusHours(2); // token valable 2h

        // Création de l'objet Token
        Token token = new Token();
        token.setTokenGenere(generatedToken);
        token.setType(type);
        token.setCreatedAt(now);
        token.setExpiresAt(expiration);
        token.setIsActive(1); // 1 = actif
        token.setUser(user);

        // Enregistrement en base
        // return tokenRepository.save(token);
        return token;
    }
}
