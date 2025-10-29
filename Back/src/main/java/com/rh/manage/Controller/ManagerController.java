package com.rh.manage.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.rh.manage.Model.Manager;
import com.rh.manage.Service.ManagerService;

import java.util.List;

@RestController
@RequestMapping("/api/managers")
@CrossOrigin(origins = "*")
public class ManagerController {

    @Autowired
    ManagerService managerService;

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
