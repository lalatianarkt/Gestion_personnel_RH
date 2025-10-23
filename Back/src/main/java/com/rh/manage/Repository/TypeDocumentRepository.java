package com.rh.manage.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rh.manage.Model.TypeDocument;

import java.util.List;
import java.util.Optional;

@Repository
public interface TypeDocumentRepository extends JpaRepository<TypeDocument, String> {
    
    // Trouver un type de document par son intitulé
    Optional<TypeDocument> findByIntitule(String intitule);
    
    // Trouver tous les types de documents ordonnés par intitulé
    List<TypeDocument> findAllByOrderByIntitule();
    
    // Vérifier si un intitulé existe
    boolean existsByIntitule(String intitule);
}
