package com.rh.manage.Controller;

import com.rh.manage.Dto.EmployeDTO;
import com.rh.manage.Model.Employe;
import com.rh.manage.Service.DepartementService;
import com.rh.manage.Service.EmployeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.*;

import java.sql.Connection;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/employes")
public class EmployeController {

    @Autowired
    private EmployeService employeService;

    @Autowired
    private DepartementService departementService;

    // 🔹 Récupérer tous les employés
    @GetMapping
    public ResponseEntity<List<Employe>> getAllEmployes() {
        System.out.println("All emp " + employeService.getAll());
        return ResponseEntity.ok(employeService.getAll());
    }

    // 🔹 Récupérer un employé par ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getEmployeById(@PathVariable String id) {
        Optional<Employe> employeOpt = employeService.getById(id);
        // System.out.println("emp : " + employeOpt.get().getId());
        if (employeOpt.isPresent()) { 
            return ResponseEntity.ok(employeOpt.get());
        } else {
            return ResponseEntity.status(404).body("Employé non trouvé");
        }
    }

    // 🔹 Récupérer un employé par email
    @GetMapping("/email/{email}")
    public ResponseEntity<?> getEmployeByEmail(@PathVariable String email) {
        System.out.println("++++++++++++++++++++++++++++++++++++++++++++email " + email);
        Optional<Employe> employeOpt = employeService.getByEmail(email);
        Employe emp = employeOpt.get();
        if(emp != null){
            System.out.println("emp " + emp.getEmail());
        }
        if (employeOpt.isPresent()) {
            return ResponseEntity.ok(employeOpt.get());
        } else {
            return ResponseEntity.status(404).body("Employé non trouvé");
        }
    }

    @PostMapping
    public ResponseEntity<?> saveEmploye(@RequestBody EmployeDTO employeDTO) {
        try {
            employeService.insertionIntegraleEmploye(employeDTO);
            return ResponseEntity.ok("Employé enregistré avec succès");
        } catch (DataAccessException e) {
            System.out.println("erreur : ++++++++++++++++++++++++++++++++++++++++++++++++ : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de l'enregistrement de l'employé : problème d'accès aux données");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body("Données employé invalides : " + e.getMessage());
        } 
        // catch(HttpMessageNotReadableException e){
        //     e.printStackTrace();
        //     System.out.println("erreur de conversion : " + e.getMessage());
        //     return ResponseEntity.badRequest()
        //             .body("Erreur de conversion en JSON : " + e.getMessage());
        // }
        
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur inattendue : " + e.getMessage());
        }
    }

    

}
