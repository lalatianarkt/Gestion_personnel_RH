package com.rh.manage.Controller;

import com.rh.manage.Dto.EmployeDTO;
import com.rh.manage.Dto.EmployeInfosDTO;
import com.rh.manage.Model.Employe;
import com.rh.manage.Model.InfosProfessionnelles;
import com.rh.manage.Service.DepartementService;
import com.rh.manage.Service.EmployeService;
import com.rh.manage.Service.InfosProfessionnellesService;

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

    @Autowired
    private InfosProfessionnellesService infosProfessionnellesService;

    // @GetMapping("/getManager")
    // public ResponseEntity<List<Employe>> getAllManagers() {
    //     return ResponseEntity.ok(employeService.getAllManagers());
    // }
    

    // 🔹 Récupérer tous les employés
    // @GetMapping
    // public ResponseEntity<List<Employe>> getAllEmployes() {
    //     System.out.println("All emp " + employeService.getAll());
    //     return ResponseEntity.ok(employeService.getAll());
    // }

    @GetMapping
    public ResponseEntity<List<EmployeInfosDTO>> getAllEmployes() {
        try {
            List<EmployeInfosDTO> employesWithInfos = employeService.getAllEmployesWithInfos();
            System.out.println("Nombre d'employés avec infos: " + employesWithInfos.size());
            return ResponseEntity.ok(employesWithInfos);
        } catch (Exception e) {
            System.err.println("Erreur lors de la récupération des employés: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEmployeById(@PathVariable String id) {
        try {

            EmployeInfosDTO emp = employeService.getEmployeWithInfosById(id);
            // Optional<Employe> employeOpt = employeService.getById(id);
            
            if (emp != null) {
            //     Employe employe = employeOpt.get();
                
            //     // Récupérer InfosProfessionnelles par idEmploye
            //     Optional<InfosProfessionnelles> infosProOpt = infosProfessionnellesService.getById(id);
                
            //     // Créer le DTO
            //     EmployeInfosDTO employeInfosDTO = new EmployeInfosDTO();
            //     employeInfosDTO.setEmploye(employe);
            //     employeInfosDTO.setInfosProfessionnelles(infosProOpt.orElse(null));
                
            //     System.out.println("Employé trouvé: " + employe.getId());
                return ResponseEntity.ok(emp);
            } else {
                System.out.println("Employé non trouvé: " + id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employé non trouvé");
            }
        } catch (Exception e) {
            System.err.println("Erreur lors de la récupération de l'employé " + id + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la récupération de l'employé");
        }
    }

    // 🔹 Récupérer un employé par ID
    // @GetMapping("/{id}")
    // public ResponseEntity<?> getEmployeById(@PathVariable String id) {
    //     Optional<Employe> employeOpt = employeService.getById(id);
    //     // System.out.println("emp : " + employeOpt.get().getId());
    //     if (employeOpt.isPresent()) { 
    //         return ResponseEntity.ok(employeOpt.get());
    //     } else {
    //         return ResponseEntity.status(404).body("Employé non trouvé");
    //     }
    // }

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

            // System.out.println("ato++++++++++++++++++++++++++++++++++++++++++++++");
            // employeDTO.getEmergencyContact().getCreatedAt();
            // employeDTO.getEmergencyContact().getAdresse();
           System.out.println("contact 2323 " + employeDTO.getEmergencyContact().getContact());
            // System.out.println("lala" + employeDTO.getEmergencyContact().getAdresse());     
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
