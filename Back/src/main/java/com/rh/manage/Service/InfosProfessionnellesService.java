package com.rh.manage.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rh.manage.Model.InfosProfessionnelles;
import com.rh.manage.Repository.InfosProfessionnellesRepository;

@Service
public class InfosProfessionnellesService {

    @Autowired
    private InfosProfessionnellesRepository infosProfessionnellesRepository;

    // ✅ Vérifie si le matricule existe
    public boolean isMatriculeExists(String matricule) {
        return infosProfessionnellesRepository.existsByMatricule(matricule);
    }

    // ✅ Cherche une InfosProfessionnelles par son matricule
    public Optional<InfosProfessionnelles> findByMatricule(String matricule) {
        return infosProfessionnellesRepository.findByMatricule(matricule);
    }

    // ✅ Récupérer toutes les InfosProfessionnelles
    public List<InfosProfessionnelles> getAll() {
        return infosProfessionnellesRepository.findAll();
    }

    // ✅ Récupérer une InfosProfessionnelles par son ID
    public Optional<InfosProfessionnelles> getById(String id) {
        return infosProfessionnellesRepository.findById(id);
    }

    // ✅ Ajouter une nouvelle InfosProfessionnelles
    public InfosProfessionnelles create(InfosProfessionnelles infos) {
        return infosProfessionnellesRepository.save(infos);
    }

    // ✅ Mettre à jour une InfosProfessionnelles existante
    public InfosProfessionnelles update(InfosProfessionnelles infos) {
        if (infos.getId() == null || !infosProfessionnellesRepository.existsById(infos.getId())) {
            throw new IllegalArgumentException("L'ID de l'InfosProfessionnelles est invalide ou inexistant");
        }
        return infosProfessionnellesRepository.save(infos);
    }

    // ✅ Supprimer une InfosProfessionnelles par ID
    public void deleteById(String id) {
        if (!infosProfessionnellesRepository.existsById(id)) {
            throw new IllegalArgumentException("L'ID de l'InfosProfessionnelles est inexistant");
        }
        infosProfessionnellesRepository.deleteById(id);
    }
}
