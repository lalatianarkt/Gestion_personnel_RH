package com.rh.manage.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rh.manage.Model.Employe;
import com.rh.manage.Model.Pointage;

import java.time.LocalDate;
import java.util.List;

public interface PointageRepository extends JpaRepository<Pointage, String> {
    List<Pointage> findByEmployeAndDateDuJour(Employe employe, LocalDate dateDuJour);
    List<Pointage> findByDateDuJour(LocalDate dateDuJour);
}

