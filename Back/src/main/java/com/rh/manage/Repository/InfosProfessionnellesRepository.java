package com.rh.manage.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rh.manage.Model.InfosProfessionnelles;

@Repository
public interface InfosProfessionnellesRepository extends JpaRepository<InfosProfessionnelles, String> {

    // Vérifie si le matricule existe
    // boolean existsByMatricule(String matricule);
    // Optional<InfosProfessionnelles> findByMatricule(String matricule);
    // ✅ REQUÊTE NATIVE qui fonctionne
    @Query(value = "SELECT * FROM infos_professionnelles WHERE id_employe = :employeId", nativeQuery = true)
    Optional<InfosProfessionnelles> findByEmployeId(@Param("employeId") String employeId);

    // ✅ Vérifier l'existence avec requête native
    @Query(value = "SELECT COUNT(*) > 0 FROM infos_professionnelles WHERE id_employe = :employeId", nativeQuery = true)
    boolean existsByEmployeId(@Param("employeId") String employeId);

}

