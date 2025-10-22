package com.rh.manage.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rh.manage.Model.InfosProfessionnelles;

@Repository
public interface InfosProfessionnellesRepository extends JpaRepository<InfosProfessionnelles, String> {

    // Vérifie si le matricule existe
    boolean existsByMatricule(String matricule);
    Optional<InfosProfessionnelles> findByMatricule(String matricule);
}

