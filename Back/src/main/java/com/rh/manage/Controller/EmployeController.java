package com.rh.manage.Controller;

import com.rh.manage.Model.Employe;
import com.rh.manage.Service.EmployeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/employes")
public class EmployeController {

    @Autowired
    private EmployeService employeService;

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

    // @PostMapping("/insertion")
    // public ResponseEntity<?> insertionEmpInfo(@RequestBody String entity) {
    //     try {
            
    //     } catch (Exception e) {
            
    //     }
    //     return entity;
    // }
    
}
