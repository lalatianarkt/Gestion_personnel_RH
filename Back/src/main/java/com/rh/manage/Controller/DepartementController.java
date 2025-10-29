package com.rh.manage.Controller;

import com.rh.manage.Model.Departement;
import com.rh.manage.Service.DepartementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/departements")
@CrossOrigin(origins = "*") // permet les requêtes depuis le front (React, etc.)
public class DepartementController {

    @Autowired
    private DepartementService departementService;

    // ✅ 1. Ajouter un département
    @PostMapping
    public ResponseEntity<Departement> createDepartement(@RequestBody Departement departement) {
        Departement newDepartement = departementService.saveDepartement(departement);
        return ResponseEntity.ok(newDepartement);
    }

    // ✅ 2. Récupérer tous les départements
    @GetMapping
    public ResponseEntity<List<Departement>> getAllDepartements() {
        List<Departement> departements = departementService.getAllDepartements();
        return ResponseEntity.ok(departements);
    }

    // ✅ 3. Récupérer un département par ID
    @GetMapping("/{id}")
    public ResponseEntity<Departement> getDepartementById(@PathVariable String id) {
        Optional<Departement> departement = departementService.getDepartementById(id);
        return departement.map(ResponseEntity::ok)
                          .orElse(ResponseEntity.notFound().build());
    }

    // ✅ 4. Mettre à jour un département
    @PutMapping("/{id}")
    public ResponseEntity<Departement> updateDepartement(@PathVariable String id, @RequestBody Departement updatedDepartement) {
        Optional<Departement> existing = departementService.getDepartementById(id);
        if (existing.isPresent()) {
            Departement departement = existing.get();
            departement.setNom(updatedDepartement.getNom());
            departement.setDescription(updatedDepartement.getDescription());
            departement.setModifiedAt(updatedDepartement.getModifiedAt());
            departement.setNbEmploye(updatedDepartement.getNbEmploye());
            departement.setIdTypeDepartement(updatedDepartement.getIdTypeDepartement());
            Departement saved = departementService.saveDepartement(departement);
            return ResponseEntity.ok(saved);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ 5. Supprimer un département
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartement(@PathVariable String id) {
        departementService.deleteDepartement(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ 6. Rechercher un département par nom
    @GetMapping("/nom/{nom}")
    public ResponseEntity<Departement> getDepartementByNom(@PathVariable String nom) {
        Departement departement = departementService.getDepartementByNom(nom);
        if (departement != null) {
            return ResponseEntity.ok(departement);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
