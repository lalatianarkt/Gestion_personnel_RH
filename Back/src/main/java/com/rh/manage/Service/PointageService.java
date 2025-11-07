package com.rh.manage.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rh.manage.Model.Employe;
import com.rh.manage.Model.Pointage;
import com.rh.manage.Repository.PointageRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PointageService {

    @Autowired
    private PointageRepository pointageRepository;

    public List<Pointage> getPointagesByEmployeAndDate(Employe employe, LocalDate date) {
        return pointageRepository.findByEmployeAndDateDuJour(employe, date);
    }

    public List<Pointage> getPointagesDuJour(LocalDate date) {
        return pointageRepository.findByDateDuJour(date);
    }

    public Pointage savePointage(Pointage pointage) {
        return pointageRepository.save(pointage);
    }

    public Optional<Pointage> getPointageById(String id) {
        return pointageRepository.findById(id);
    }

    public void deletePointage(String id) {
        pointageRepository.deleteById(id);
    }
}

