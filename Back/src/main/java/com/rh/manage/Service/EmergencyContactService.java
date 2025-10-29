package com.rh.manage.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rh.manage.Model.EmergencyContact;
import com.rh.manage.Repository.EmergencyContactRepository;

@Service
public class EmergencyContactService {

    @Autowired
    private EmergencyContactRepository emergencyContactRepository;

    // ✅ Récupérer tous les contacts d'urgence
    public List<EmergencyContact> getAll() {
        return emergencyContactRepository.findAll();
    }

    // ✅ Récupérer un contact par ID
    public Optional<EmergencyContact> getById(String id) {
        return emergencyContactRepository.findById(id);
    }

    // ✅ Ajouter un nouveau contact
    public EmergencyContact create(EmergencyContact contact) {
        if (emergencyContactRepository.existsByContact(contact.getContact())) {
            throw new IllegalArgumentException("Le contact existe déjà !");
        }
        if (contact.getEmail() != null && emergencyContactRepository.existsByEmail(contact.getEmail())) {
            throw new IllegalArgumentException("L'email est déjà utilisé !");
        }
        return emergencyContactRepository.save(contact);
    }

    // ✅ Mettre à jour un contact existant
    public EmergencyContact update(EmergencyContact contact) {
        if (contact.getId() == null || !emergencyContactRepository.existsById(contact.getId())) {
            throw new IllegalArgumentException("L'ID est invalide ou inexistant");
        }
        return emergencyContactRepository.save(contact);
    }

    // ✅ Supprimer un contact par ID
    public void deleteById(String id) {
        if (!emergencyContactRepository.existsById(id)) {
            throw new IllegalArgumentException("L'ID est inexistant");
        }
        emergencyContactRepository.deleteById(id);
    }
}
