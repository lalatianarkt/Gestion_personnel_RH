package com.rh.manage.Service;

import com.rh.manage.Model.Departement;
import com.rh.manage.Model.DepartementEmploye;
import com.rh.manage.Model.Employe;
import com.rh.manage.Repository.DepartementEmployeRepository;
import com.rh.manage.Service.DepartementService;
import com.rh.manage.Service.EmployeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DepartementEmployeService {

    @Autowired
    DepartementEmployeRepository repository;

    @Autowired
    EmployeService employeService;

    @Autowired
    DepartementService departementService;

    // Créer ou mettre à jour une affectation
    public DepartementEmploye createData(DepartementEmploye de) throws Exception {
        try {
            // Vérifier l'existence de l'employé
            Employe employe = employeService.getById(de.getEmploye().getId())
                    .orElseThrow(() -> new Exception("Employé non trouvé avec l'ID : " + de.getEmploye().getId()));

            // Vérifier l'existence du département
            Departement departement = departementService.getDepartementById(de.getDepartement().getId())
                    .orElseThrow(() -> new Exception("Département non trouvé avec l'ID : " + de.getDepartement().getId()));

            // Affecter les objets
            de.setEmploye(employe);
            de.setDepartement(departement);

            // Sauvegarder
            return repository.save(de);

        } catch (Exception e) {
            // Log pour debug
            System.err.println("Erreur lors de la création de l'affectation employé-département : " + e.getMessage());
            e.printStackTrace();

            // Relancer pour que le controller puisse catcher
            throw e;
        }
    }


    // Récupérer par ID
    public Optional<DepartementEmploye> getById(String id) {
        return repository.findById(id);
    }

    // Récupérer tous
    public List<DepartementEmploye> getAll() {
        return repository.findAll();
    }

    // Récupérer tous les départements d'un employé
    public List<DepartementEmploye> getByEmployeId(String employeId) {
        return repository.findByEmployeId(employeId);
    }

    // Récupérer tous les employés d'un département
    public List<DepartementEmploye> getByDepartementId(String departementId) {
        return repository.findByDepartementId(departementId);
    }

    // Supprimer
    public void delete(String id) throws Exception {
        if (!repository.existsById(id)) {
            throw new Exception("Affectation non trouvée");
        }
        repository.deleteById(id);
    }
}
