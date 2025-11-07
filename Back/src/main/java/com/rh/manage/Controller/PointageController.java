package com.rh.manage.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.rh.manage.Model.Employe;
import com.rh.manage.Model.Pointage;
import com.rh.manage.Service.EmployeService;
import com.rh.manage.Service.PointageService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/pointages")
public class PointageController {

   @Autowired
   PointageService pointageService;

   @Autowired
   EmployeService employeService;

    @GetMapping("/employe/{idEmp}")
    public List<Pointage> getPointagesByEmploye(
            @PathVariable String idEmp,
            @RequestParam(required = false) String date) {

        Employe employe = employeService.getById(idEmp).orElseThrow(() -> new RuntimeException("Employé non trouvé"));
        LocalDate dateDuJour = (date != null) ? LocalDate.parse(date) : LocalDate.now();
        return pointageService.getPointagesByEmployeAndDate(employe, dateDuJour);
    }

    @PostMapping
    public Pointage ajouterPointage(@RequestBody Pointage pointage) {
        pointage.setCreatedAt(LocalDate.now().atStartOfDay());
        return pointageService.savePointage(pointage);
    }

    @PutMapping("/{id}")
    public Pointage modifierPointage(@PathVariable String id, @RequestBody Pointage pointage) {
        Pointage existant = pointageService.getPointageById(id).orElseThrow(() -> new RuntimeException("Pointage non trouvé"));
        existant.setHeureArrivee(pointage.getHeureArrivee());
        existant.setHeureDepart(pointage.getHeureDepart());
        existant.setHeureJournaliere(pointage.getHeureJournaliere());
        existant.setModifiedAt(LocalDate.now().atStartOfDay());
        return pointageService.savePointage(existant);
    }

    @DeleteMapping("/{id}")
    public void supprimerPointage(@PathVariable String id) {
        pointageService.deletePointage(id);
    }
}
