package com.rh.Repository;

import com.rh.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    
    // Recherche par email
    Optional<User> findByEmail(String email);
    
    // Recherche par employé
    Optional<User> findByEmployeId(String employeId);
    
    // Vérification d'existence par email
    boolean existsByEmail(String email);
    
    // Vérification d'existence par employé
    boolean existsByEmployeId(String employeId);
    
    // Recherche des utilisateurs créés après une certaine date
    List<User> findByCreatedAtAfter(LocalDateTime date);
}
