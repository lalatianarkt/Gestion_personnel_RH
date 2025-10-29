package com.rh.manage.Repository;

import com.rh.manage.Model.ManagerEmploye;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManagerEmployeRepository extends JpaRepository<ManagerEmploye, Long> {

    List<ManagerEmploye> findByManager_Id(String managerId);

    List<ManagerEmploye> findByEmploye_Id(String employeId);
}

