package com.rh.Repository;

import com.rh.Model.Token;
import com.rh.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Integer> {

    // Trouver un token par sa valeur
    Optional<Token> findByTokenGenere(String tokenGenere);

    // Vérifier si un token actif existe pour un utilisateur
    Optional<Token> findByUserAndIsActive(User user, Integer isActive);
}
