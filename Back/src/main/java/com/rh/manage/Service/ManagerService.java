package com.rh.manage.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rh.manage.Model.Manager;
import com.rh.manage.Model.ManagerEmploye;
import com.rh.manage.Repository.ManagerRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ManagerService {

    // private final ManagerRepository managerRepository;

    // public ManagerService(ManagerRepository managerRepository) {
    //     this.managerRepository = managerRepository;
    // } 

    @Autowired
    ManagerRepository managerRepository;

    // public Manager getManagerParDepartement(String departementId) {
    //     return managerRepository.findByDepartementId(departementId).get();
    // } 

    // Récupérer tous les managers
    public List<Manager> getAllManagers() {
        return managerRepository.findAll();
    }

    // Récupérer un manager par id
    public Optional<Manager> getManagerById(String id) {
        return managerRepository.findById(id);
    }

    // public Manager getManagerParDepartement(String departementId) {
    //     return managerRepository.findByDepartementId(departementId).orElse(null);
    // }


    // Créer ou mettre à jour un manager
    public Manager saveManager(Manager manager) {
        return managerRepository.save(manager);
    }

    // Supprimer un manager
    public void deleteManager(String id) {
        managerRepository.deleteById(id);
    }
}

