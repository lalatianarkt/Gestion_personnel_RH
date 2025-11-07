package com.rh.manage.Repository;

import com.rh.manage.Model.DepartementManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DepartementManagerRepository extends JpaRepository<DepartementManager, String> {
    
    // Trouver par département
    List<DepartementManager> findByDepartementId(String departementId);
    
    // Trouver par manager
    List<DepartementManager> findByManagerId(String managerId);
    
    // Trouver la gestion actuelle d'un département
    Optional<DepartementManager> findByDepartementIdAndDateFinIsNull(String departementId);
    
    // Trouver les gestions actuelles d'un manager
    List<DepartementManager> findByManagerIdAndDateFinIsNull(String managerId);
    
    // Trouver toutes les gestions actives
    List<DepartementManager> findByDateFinIsNull();
    
    // Trouver les gestions dans une période
    List<DepartementManager> findByDateDebutBetween(LocalDate startDate, LocalDate endDate);
    
    // Vérifier si un département a un manager actuel
    boolean existsByDepartementIdAndDateFinIsNull(String departementId);
    
    // Vérifier si un manager gère actuellement un département
    boolean existsByManagerIdAndDepartementIdAndDateFinIsNull(String managerId, String departementId);
    
    // Compter le nombre de départements gérés par un manager
    @Query("SELECT COUNT(dm) FROM DepartementManager dm WHERE dm.manager.id = :managerId AND dm.dateFin IS NULL")
    Long countActiveDepartementsByManager(@Param("managerId") String managerId);
    
    // Trouver l'historique complet d'un département
    List<DepartementManager> findByDepartementIdOrderByDateDebutDesc(String departementId);
}