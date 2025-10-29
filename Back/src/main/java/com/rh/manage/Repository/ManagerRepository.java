package com.rh.manage.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rh.manage.Model.Manager;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, String> {
    // Vous pouvez ajouter des méthodes custom si nécessaire, par ex :
    // List<Manager> findByDepartementId(String departementId);
}
