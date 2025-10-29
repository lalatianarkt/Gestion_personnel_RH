package com.rh.manage.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rh.manage.Model.DepartementEmploye;

import java.util.List;

@Repository
public interface DepartementEmployeRepository extends JpaRepository<DepartementEmploye, String> {

    // Récupérer tous les départements pour un employé
    List<DepartementEmploye> findByEmployeId(String employeId);

    // Récupérer tous les employés d'un département
    List<DepartementEmploye> findByDepartementId(String departementId);
}

