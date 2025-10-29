package com.rh.manage.Service;

import com.rh.manage.Model.ManagerEmploye;
import com.rh.manage.Repository.ManagerEmployeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ManagerEmployeService {

    private final ManagerEmployeRepository repository;

    public ManagerEmployeService(ManagerEmployeRepository repository) {
        this.repository = repository;
    }

    public List<ManagerEmploye> getAll() {
        return repository.findAll();
    }

    public Optional<ManagerEmploye> getById(Long id) {
        return repository.findById(id);
    }

    public ManagerEmploye create(ManagerEmploye managerEmploye) {
        return repository.save(managerEmploye);
    }

    // public ManagerEmploye update(Long id, ManagerEmploye updated) {
    //     return repository.findById(id).map(existing -> {
    //         existing.setDateDebut(updated.getDateDebut());
    //         existing.setDateFin(updated.getDateFin());
    //         existing.setManager(updated.getManager());
    //         existing.setEmploye(updated.getEmploye());
    //         return repository.save(existing);
    //     }).orElseThrow(() -> new RuntimeException("Affectation non trouvée avec id : " + id));
    // }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<ManagerEmploye> getByManager(String managerId) {
        return repository.findByManager_Id(managerId);
    }

    public List<ManagerEmploye> getByEmploye(String employeId) {
        return repository.findByEmploye_Id(employeId);
    }
}

