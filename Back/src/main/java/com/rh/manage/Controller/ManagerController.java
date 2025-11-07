package com.rh.manage.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rh.manage.Dto.ManagerDTO;
import com.rh.manage.Model.Manager;
import com.rh.manage.Service.DepartementManagerService;
import com.rh.manage.Service.ManagerService;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/managers")
@CrossOrigin(origins = "*")
public class ManagerController {

    @Autowired
    ManagerService managerService;

    @Autowired
    private DepartementManagerService departementManagerService;

    // GET /api/managers
    @GetMapping
    public List<Manager> getAllManagers() {
        return managerService.getAllManagers();
    }

    // GET /api/managers/{id}
    @GetMapping("/{id}")
    public Manager getManagerById(@PathVariable String id) {
        return managerService.getManagerById(id)
                .orElseThrow(() -> new RuntimeException("Manager non trouvé avec id : " + id));
    }

    @PostMapping("/insertManagerDepartment")
    public ResponseEntity<?> insertManagerToDepartement(@RequestBody ManagerDTO managerDTO) {
        try {
            departementManagerService.insertManagerWithDepartement(managerDTO);
            
            // ✅ SUCCÈS
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Manager affecté au département avec succès");
            response.put("timestamp", LocalDateTime.now());
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (IllegalArgumentException e) {
            // ❌ ERREUR DE VALIDATION
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", e.getMessage());
            errorResponse.put("type", "VALIDATION_ERROR");
            errorResponse.put("timestamp", LocalDateTime.now());
            
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            
        } catch (Exception e) {
            // ❌ ERREUR TECHNIQUE
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Erreur interne du serveur lors de l'affectation");
            errorResponse.put("type", "INTERNAL_ERROR");
            errorResponse.put("timestamp", LocalDateTime.now());
            
            // Log technique détaillé (en développement)
            System.err.println("Erreur technique: " + e.getMessage());
            e.printStackTrace();
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    // POST /api/managers
    @PostMapping
    public Manager createManager(@RequestBody Manager manager) {
        return managerService.saveManager(manager);
    }

    // PUT /api/managers/{id}
    @PutMapping("/{id}")
    public Manager updateManager(@PathVariable String id, @RequestBody Manager manager) {
        manager.setId(id);
        return managerService.saveManager(manager);
    }

    // DELETE /api/managers/{id}
    @DeleteMapping("/{id}")
    public void deleteManager(@PathVariable String id) {
        managerService.deleteManager(id);
    }
}
