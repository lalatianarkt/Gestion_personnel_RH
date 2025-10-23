package com.rh.manage.Service;

import com.rh.manage.Model.Token;
import com.rh.manage.Model.User;
import com.rh.manage.Repository.TokenRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
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
        tokenRepository.save(token);
        return token;
    }

    public Token save(Token token) {
        return tokenRepository.save(token);
    }
    
    @Transactional
    public void update(Token token) {
        tokenRepository.updateToken(
            token.getTokenGenere(),
            token.getIsActive() != null ? token.getIsActive().intValue() : 0, // conversion Integer → int
            String.valueOf(token.getId()) // conversion int → String si besoin
        );
    } 

    /**
     * 🔍 Récupère le dernier token d’un utilisateur
     */
    public Token getDernierTokenByUser(User user) {
        Optional<Token> tokenOpt = tokenRepository.findLastTokenByUser(user);
        return tokenOpt.orElse(null);
    } 

    /**
     * Vérifie si un token est valide (actif et non expiré)
     */
    public boolean isValid(String tokenValue) {
        Token token = tokenRepository.findByTokenGenere(tokenValue).get();
        if (token == null) return false;

        return token.getIsActive() == 1 && token.getExpiresAt().isAfter(LocalDateTime.now());
    }

    /**
     * Désactive un token (utile après usage ou déconnexion)
     */
    public void deactivateToken(String tokenValue) {
        Token token = tokenRepository.findByTokenGenere(tokenValue).get();
        if (token != null) {
            token.setIsActive(0);
            tokenRepository.save(token);
        }
    }
}
