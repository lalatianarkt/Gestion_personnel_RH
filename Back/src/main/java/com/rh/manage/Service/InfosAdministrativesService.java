package com.rh.manage.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rh.manage.Model.InfosAdministratives;
import com.rh.manage.Repository.InfosAdministrativesRepository;

@Service
public class InfosAdministrativesService {

    @Autowired
    private InfosAdministrativesRepository infosAdministrativesRepository;

    // ✅ Vérifie si le CIN existe
    public boolean isCinExists(String cin) {
        return infosAdministrativesRepository.existsByCin(cin);
    }

    // ✅ Récupérer toutes les infos administratives
    public List<InfosAdministratives> getAll() {
        return infosAdministrativesRepository.findAll();
    }

    // ✅ Récupérer une InfosAdministratives par ID
    public Optional<InfosAdministratives> getById(String id) {
        return infosAdministrativesRepository.findById(id);
    }

    // ✅ Récupérer une InfosAdministratives par CIN
    public Optional<InfosAdministratives> getByCin(String cin) {
        return infosAdministrativesRepository.findByCin(cin);
    }

    // ✅ Ajouter une nouvelle InfosAdministratives
    public InfosAdministratives create(InfosAdministratives infos) {
        if (isCinExists(infos.getCin())) {
            throw new IllegalArgumentException("Le CIN existe déjà !");
        }
        return infosAdministrativesRepository.save(infos);
    }

    // ✅ Mettre à jour une InfosAdministratives existante
    public InfosAdministratives update(InfosAdministratives infos) {
        if (infos.getId() == null || !infosAdministrativesRepository.existsById(infos.getId())) {
            throw new IllegalArgumentException("L'ID est invalide ou inexistant");
        }
        return infosAdministrativesRepository.save(infos);
    }

    // ✅ Supprimer par ID
    public void deleteById(String id) {
        if (!infosAdministrativesRepository.existsById(id)) {
            throw new IllegalArgumentException("L'ID est inexistant");
        }
        infosAdministrativesRepository.deleteById(id);
    }
}
