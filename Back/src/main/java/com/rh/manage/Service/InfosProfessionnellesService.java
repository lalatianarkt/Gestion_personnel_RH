package com.rh.manage.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rh.manage.Model.InfosProfessionnelles;
import com.rh.manage.Repository.InfosProfessionnellesRepository;

@Service
public class InfosProfessionnellesService {

    @Autowired
    private InfosProfessionnellesRepository infosProfessionnellesRepository;

    // Vérifie si le matricule existe
    public boolean isMatriculeExists(String matricule) {
        return infosProfessionnellesRepository.existsByMatricule(matricule);
    }

    /**
     * Cherche une InfosProfessionnelles par son matricule.
     * @param matricule Le matricule à rechercher
     * @return Optional contenant l'objet si trouvé, sinon vide
     */
    public Optional<InfosProfessionnelles> findByMatricule(String matricule) {
        return infosProfessionnellesRepository.findByMatricule(matricule);
    }
}

