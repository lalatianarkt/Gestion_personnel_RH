package com.rh.manage.Controller;

import com.rh.manage.Model.ManagerEmploye;
import com.rh.manage.Service.ManagerEmployeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manager-employe")
@CrossOrigin(origins = "*")
public class ManagerEmployeController {

    private final ManagerEmployeService service;

    public ManagerEmployeController(ManagerEmployeService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<ManagerEmploye>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ManagerEmploye> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/manager/{managerId}")
    public ResponseEntity<List<ManagerEmploye>> getByManager(@PathVariable String managerId) {
        return ResponseEntity.ok(service.getByManager(managerId));
    }

    @GetMapping("/employe/{employeId}")
    public ResponseEntity<List<ManagerEmploye>> getByEmploye(@PathVariable String employeId) {
        return ResponseEntity.ok(service.getByEmploye(employeId));
    }

    @PostMapping
    public ResponseEntity<ManagerEmploye> create(@RequestBody ManagerEmploye managerEmploye) {
        return ResponseEntity.ok(service.create(managerEmploye));
    }

    // @PutMapping("/{id}")
    // public ResponseEntity<ManagerEmploye> update(@PathVariable Long id, @RequestBody ManagerEmploye updated) {
    //     return ResponseEntity.ok(service.update(id, updated));
    // }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
