package com.rh.manage.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.rh.manage.Model.Employe;

import java.util.Optional;

@Repository
public interface EmployeRepository extends JpaRepository<Employe, String> {
    Optional<Employe> findByEmail(String email);
}

