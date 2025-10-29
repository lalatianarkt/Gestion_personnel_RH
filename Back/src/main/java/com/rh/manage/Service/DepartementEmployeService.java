package com.rh.manage.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rh.manage.Model.DepartementEmploye;
import com.rh.manage.Repository.DepartementEmployeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class DepartementEmployeService {

    @Autowired
    private DepartementEmployeRepository repository;

    // Créer ou mettre à jour
    public DepartementEmploye save(DepartementEmploye de) {
        return repository.save(de);
    }

    // Récupérer par id
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
    public void delete(String id) {
        repository.deleteById(id);
    }
}

