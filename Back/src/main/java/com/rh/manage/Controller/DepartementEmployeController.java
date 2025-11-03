package com.rh.manage.Controller;

import com.rh.manage.Model.DepartementEmploye;
import com.rh.manage.Service.DepartementEmployeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departement-employes")
@CrossOrigin(origins = "*")
public class DepartementEmployeController {

    @Autowired
    DepartementEmployeService service;

    

    // Créer une affectation
    @PostMapping
    public ResponseEntity<?> create(@RequestBody DepartementEmploye de) {
        try {
            DepartementEmploye saved = service.createData(de);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Récupérer tous
    @GetMapping
    public ResponseEntity<List<DepartementEmploye>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    // Récupérer par ID
    // @GetMapping("/{id}")
    // public ResponseEntity<?> getById(@PathVariable String id) {
    //     return service.getById(id).get()
    //             .map(ResponseEntity::ok)
    //             .orElse(ResponseEntity.status(404).body("Affectation non trouvée"));
    // }

    // Récupérer les départements d’un employé
    @GetMapping("/employe/{employeId}")
    public ResponseEntity<?> getByEmploye(@PathVariable String employeId) {
        List<DepartementEmploye> list = service.getByEmployeId(employeId);
        if (list.isEmpty()) {
            return ResponseEntity.status(404).body("Aucun département trouvé pour cet employé");
        }
        return ResponseEntity.ok(list);
    }

    // Récupérer les employés d’un département
    @GetMapping("/departement/{departementId}")
    public ResponseEntity<?> getByDepartement(@PathVariable String departementId) {
        List<DepartementEmploye> list = service.getByDepartementId(departementId);
        if (list.isEmpty()) {
            return ResponseEntity.status(404).body("Aucun employé trouvé pour ce département");
        }
        return ResponseEntity.ok(list);
    }

    // Supprimer une affectation
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        try {
            service.delete(id);
            return ResponseEntity.ok("Affectation supprimée avec succès");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
