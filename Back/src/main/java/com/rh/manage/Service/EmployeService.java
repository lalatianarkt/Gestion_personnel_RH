package com.rh.manage.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.rh.manage.Model.Employe;
import com.rh.manage.Repository.EmployeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeService {

    @Autowired
    private EmployeRepository employeRepository;

    // ✅ Récupérer tous les employés
    public List<Employe> getAll() {
        return employeRepository.findAll();
    }

    // ✅ Récupérer par ID
    public Optional<Employe> getById(String id) {
        return employeRepository.findById(id);
    }

    // ✅ Récupérer par email
    public Optional<Employe> getByEmail(String email) {
        return employeRepository.findByEmail(email);
    }

    // ✅ Créer un employé
    public Employe create(Employe employe) {
        return employeRepository.save(employe);
    }

    // ✅ Mettre à jour un employé
    public Employe update(Employe employe) {
        return employeRepository.save(employe);
    }

    // ✅ Supprimer un employé
    public void delete(String id) {
        employeRepository.deleteById(id);
    }
}
