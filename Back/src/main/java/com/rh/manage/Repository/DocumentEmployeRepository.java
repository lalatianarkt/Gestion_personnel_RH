package com.rh.manage.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rh.manage.Model.DocumentEmploye;

import java.util.List;

@Repository
public interface DocumentEmployeRepository extends JpaRepository<DocumentEmploye, String> {
    
    // Trouver tous les documents d'un employé
    List<DocumentEmploye> findByEmployeId(String employeId);
    
    // Trouver les documents d'un employé avec le type de document
    List<DocumentEmploye> findByEmployeIdAndTypeDocumentIsNotNull(String employeId);
    
    // Trouver les documents par type de document
    List<DocumentEmploye> findByTypeDocumentId(String typeDocumentId);
    
    // Trouver les documents d'un employé par type de document
    List<DocumentEmploye> findByEmployeIdAndTypeDocumentId(String employeId, String typeDocumentId);
    
    // Compter le nombre de documents par employé
    Long countByEmployeId(String employeId);
    
    // Requête personnalisée pour récupérer les documents avec les informations du type
    @Query("SELECT d FROM DocumentEmploye d LEFT JOIN FETCH d.typeDocument WHERE d.employe.id = :employeId")
    List<DocumentEmploye> findDocumentsWithTypeByEmployeId(@Param("employeId") String employeId);
}
