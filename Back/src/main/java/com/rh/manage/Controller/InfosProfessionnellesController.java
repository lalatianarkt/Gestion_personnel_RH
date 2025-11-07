package com.rh.manage.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rh.manage.Model.InfosProfessionnelles;
import com.rh.manage.Service.InfosProfessionnellesService;

import java.util.List;

@RestController
@RequestMapping("/api/infosPro")
@CrossOrigin(origins = "*")
public class InfosProfessionnellesController {

    @Autowired
    private InfosProfessionnellesService infosProService;

    // @GetMapping("/check-matricule/{matricule}")
    // public boolean checkMatricule(@PathVariable String matricule) {
    //     return infosProService.isMatriculeExists(matricule);
    // }

    // === CREATE ===
    @PostMapping
    public ResponseEntity<?> createInfosPro(@RequestBody InfosProfessionnelles infosPro) {
        try {
            InfosProfessionnelles savedInfosPro = infosProService.create(infosPro);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedInfosPro);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erreur lors de la création: " + e.getMessage());
        }
    }

    // === READ ALL ===
    @GetMapping
    public ResponseEntity<List<InfosProfessionnelles>> getAllInfosPro() {
        List<InfosProfessionnelles> infosProList = infosProService.getAll();
        return ResponseEntity.ok(infosProList);
    }

    // === READ BY ID ===
    @GetMapping("/{id}")
    public ResponseEntity<?> getInfosProById(@PathVariable String id) {
        try {
            InfosProfessionnelles infosPro = infosProService.getById(id).get();
            return ResponseEntity.ok(infosPro);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Infos professionnelles non trouvées pour l'ID: " + id);
        }
    }

    // === READ BY EMPLOYE ID ===
    // @GetMapping("/employe/{employeId}")
    // public ResponseEntity<?> getInfosProByEmployeId(@PathVariable String employeId) {
    //     try {
    //         InfosProfessionnelles infosPro = infosProService.;
    //         return ResponseEntity.ok(infosPro);
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND)
    //                 .body("Infos professionnelles non trouvées pour l'employé ID: " + employeId);
    //     }
    // }

    // === UPDATE ===
    // @PutMapping("/{id}")
    // public ResponseEntity<?> updateInfosPro(@PathVariable String id, @RequestBody InfosProfessionnelles infosPro) {
    //     try {
    //         InfosProfessionnelles updatedInfosPro = infosProService.update(id, infosPro);
    //         return ResponseEntity.ok(updatedInfosPro);
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.BAD_REQUEST)
    //                 .body("Erreur lors de la mise à jour: " + e.getMessage());
    //     }
    // }

    // === DELETE ===
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInfosPro(@PathVariable String id) {
        try {
            infosProService.deleteById(id);
            return ResponseEntity.ok("Infos professionnelles supprimées avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Erreur lors de la suppression: " + e.getMessage());
        }
    }
}