package com.rh.manage.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rh.manage.Dto.EmployeDTO;
import com.rh.manage.Dto.EmployeInfosDTO;
import com.rh.manage.Model.Departement;
import com.rh.manage.Model.EmergencyContact;
import com.rh.manage.Model.Employe;
import com.rh.manage.Model.InfosAdministratives;
import com.rh.manage.Model.InfosProfessionnelles;
import com.rh.manage.Model.Nationalite;
import com.rh.manage.Model.Poste;
import com.rh.manage.Model.PosteEmploye;
import com.rh.manage.Model.Sexe;
import com.rh.manage.Repository.EmployeRepository;
import com.rh.manage.Repository.InfosProfessionnellesRepository;

import java.sql.Connection;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeService {

    @Autowired
    private InfosProfessionnellesRepository infosProfessionnellesRepository;

    @Autowired
    InfosProfessionnellesService infosProfessionnellesService;

    @Autowired
    EmployeRepository employeRepository;

    @Autowired
    InfosAdministrativesService infosAdministrativesService;

    @Autowired 
    EmergencyContactService emergencyContactService;

    @Autowired
    NationaliteService nationaliteService;

    @Autowired
    SexeService sexeService;

    // @Autowired
    // HistoriquePosteService historiquePosteService;

    // ✅ Récupérer tous les employés
    public List<Employe> getAll() {
        return employeRepository.findAll();
    }

    // ✅ Récupérer par ID
    public Optional<Employe> getById(String id) {
        return employeRepository.findById(id);
    }

    // ✅ Récupérer par email
    public Optional<Employe> getByEmail(String email) {
        return employeRepository.findByEmail(email);
    }

    // ✅ Créer un employé
    public Employe create(Employe employe) {
        return employeRepository.save(employe);
    }

    // ✅ Mettre à jour un employé
    public Employe update(Employe employe) {
        return employeRepository.save(employe);
    }

    // ✅ Supprimer un employé
    public void delete(String id) {
        employeRepository.deleteById(id);
    }

    public List<EmployeInfosDTO> getAllEmployesWithInfos() {
        List<Employe> employes = employeRepository.findAll();
        List<EmployeInfosDTO> result = new ArrayList<>();
        
        for (Employe employe : employes) {
            // Récupérer InfosProfessionnelles par idEmploye
            InfosProfessionnelles infosPro = infosProfessionnellesRepository
                .findByEmployeId(employe.getId())
                .orElse(null); // ou .orElse(new InfosProfessionnelles()) si vous voulez toujours un objet
            
            EmployeInfosDTO dto = new EmployeInfosDTO(employe, infosPro);
            result.add(dto);
        }
        
        return result;
    }

    public EmployeInfosDTO getEmployeWithInfosById(String id) {
        Optional<Employe> employeOpt = employeRepository.findById(id);

        

        
        if (employeOpt.isPresent()) {
            Employe employe = employeOpt.get();
            Optional<InfosProfessionnelles> infosProOpt = infosProfessionnellesRepository.findByEmployeId(id);
            
            EmployeInfosDTO dto = new EmployeInfosDTO();
            dto.setEmploye(employe);
            dto.setInfosProfessionnelles(infosProOpt.orElse(null));
            
            return dto;
        }
        return null;
    }

    public void validation_formulaire_insertion(EmployeDTO employeDTO) throws Exception {
        StringBuilder errors = new StringBuilder();

        if(employeDTO.getInfosAdministratives() != null){
            InfosAdministratives infosAdministratives = employeDTO.getInfosAdministratives();

            if(infosAdministratives.getCin().length() != 12){
                errors.append("Le nombre de chiffres dans cin doit contenir obligatoirement 12 chiffres. \n");
            }
        }
        
        // Validation de l'employé
        if (employeDTO.getEmploye() != null) {
            Employe employe = employeDTO.getEmploye();
            
            if (employe.getNom() == null || employe.getNom().trim().isEmpty()) {
                errors.append("Le nom de l'employé est obligatoire.\n");
            } else if (employe.getNom().length() > 100) {
                errors.append("Le nom de l'employé ne doit pas dépasser 100 caractères.\n");
            } 
            
            if (employe.getPrenom() == null || employe.getPrenom().trim().isEmpty()) {
                errors.append("Le prénom de l'employé est obligatoire.\n");
            } else if (employe.getPrenom().length() > 250) {
                errors.append("Le prénom de l'employé ne doit pas dépasser 250 caractères.\n");
            }
            
            if (employe.getDateNaissance() == null) {
                errors.append("La date de naissance est obligatoire.\n");
            } else if (employe.getDateNaissance().isAfter(java.time.LocalDate.now())) {
                errors.append("La date de naissance ne peut pas être dans le futur.\n");
            }
            
            if (employe.getTelephone() == null || employe.getTelephone().trim().isEmpty()) {
                errors.append("Le téléphone de l'employé est obligatoire.\n");
            } else if (employe.getTelephone().length() > 12) {
                errors.append("Le téléphone de l'employé ne doit pas dépasser 12 caractères.\n");
            }
            
            if (employe.getEmail() == null || employe.getEmail().trim().isEmpty()) {
                errors.append("L'email de l'employé est obligatoire.\n");
            } else if (employe.getEmail().length() > 100) {
                errors.append("L'email de l'employé ne doit pas dépasser 100 caractères.\n");
            } else if (!isValidEmail(employe.getEmail())) {
                errors.append("L'email de l'employé n'est pas valide.\n");
            }
            
            if (employe.getAdresse() == null || employe.getAdresse().trim().isEmpty()) {
                errors.append("L'adresse de l'employé est obligatoire.\n");
            } else if (employe.getAdresse().length() > 255) {
                errors.append("L'adresse de l'employé ne doit pas dépasser 255 caractères.\n");
            }
            
            if (employe.getLieuNaissance() == null || employe.getLieuNaissance().trim().isEmpty()) {
                errors.append("Le lieu de naissance est obligatoire.\n");
            }
        } else {
            errors.append("Les informations de l'employé sont obligatoires.\n");
        }
        
        // Validation du contact d'urgence
        if (employeDTO.getEmergencyContact() != null) {
            EmergencyContact emergencyContact = employeDTO.getEmergencyContact();
            
            if (emergencyContact.getNom() == null || emergencyContact.getNom().trim().isEmpty()) {
                errors.append("Le nom du contact d'urgence est obligatoire.\n");
            } else if (emergencyContact.getNom().length() > 250) {
                errors.append("Le nom du contact d'urgence ne doit pas dépasser 250 caractères.\n");
            }
            
            if (emergencyContact.getContact() == null || emergencyContact.getContact().trim().isEmpty()) {
                errors.append("Le contact d'urgence est obligatoire.\n");
            } else if (emergencyContact.getContact().length() != 12) {
                errors.append("Le contact d'urgence doit contenir exactement 12 caractères.\n");
            } else if (!emergencyContact.getContact().matches("\\d{10}")) {
                errors.append("Le contact d'urgence doit contenir uniquement des chiffres.\n");
            }
            
            if (emergencyContact.getEmail() != null && !emergencyContact.getEmail().trim().isEmpty()) {
                if (emergencyContact.getEmail().length() > 100) {
                    errors.append("L'email du contact d'urgence ne doit pas dépasser 100 caractères.\n");
                } else if (!isValidEmail(emergencyContact.getEmail())) {
                    errors.append("L'email du contact d'urgence n'est pas valide.\n");
                }
            }
            
            if (emergencyContact.getAdresse() != null && emergencyContact.getAdresse().length() > 255) {
                errors.append("L'adresse du contact d'urgence ne doit pas dépasser 255 caractères.\n");
            }
        } else {
            errors.append("Le contact d'urgence est obligatoire.\n");
        }
        
        // Validation des informations professionnelles
        if (employeDTO.getInfosProfessionnelles() != null) {
            InfosProfessionnelles infosPro = employeDTO.getInfosProfessionnelles();
            
            if (infosPro.getDateEmbauche() == null) {
                errors.append("La date d'embauche est obligatoire.\n");
            } else if (infosPro.getDateEmbauche().isAfter(java.time.LocalDate.now())) {
                errors.append("La date d'embauche ne peut pas être dans le futur.\n");
            }
            
            if (infosPro.getPoste() == null || infosPro.getPoste().getId() == null) {
                errors.append("Le poste est obligatoire.\n");
            }
            
            if (infosPro.getTypeContrat() == null || infosPro.getTypeContrat().getId() == null) {
                errors.append("Le type de contrat est obligatoire.\n");
            }
        } else {
            errors.append("Les informations professionnelles sont obligatoires.\n");
        }
        
        // Validation des informations administratives
        if (employeDTO.getInfosAdministratives() != null) {
            InfosAdministratives infosAdmin = employeDTO.getInfosAdministratives();
            
            if (infosAdmin.getCin() == null || infosAdmin.getCin().trim().isEmpty()) {
                errors.append("Le CIN est obligatoire.\n");
            }
            
            if (infosAdmin.getNombreEnfants() < 0) {
                errors.append("Le nombre d'enfants ne peut pas être négatif.\n");
            }
            
            if (infosAdmin.getSituationFamiliale() == null || infosAdmin.getSituationFamiliale().getId() == null) {
                errors.append("La situation familiale est obligatoire.\n");
            }
        } else {
            errors.append("Les informations administratives sont obligatoires.\n");
        }
        
        // Validation du sexe et nationalité
        if (employeDTO.getSexe() == null || employeDTO.getSexe().getId() == null) {
            errors.append("Le sexe est obligatoire.\n");
        }
        
        if (employeDTO.getNationalite() == null || employeDTO.getNationalite().getNationalite() == null) {
            errors.append("La nationalité est obligatoire.\n");
        }
        
        // Si des erreurs ont été trouvées, lancer une exception
        if (errors.length() > 0) {
            throw new IllegalArgumentException("Erreurs de validation :\n" + errors.toString());
        }
    }

    // Méthode utilitaire pour valider les emails
    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return email != null && email.matches(emailRegex);
    }
// 202758134454
    @Transactional
    public void insertionIntegraleEmploye(EmployeDTO employeDTO) throws Exception {
        try {

            // System.out.println("right here +++++++++++++++++++++++++++++++++++++++++++++++++++++");
            // System.out.println(employeDTO);
             // System.out.println("emp : " + employe.getNomMere());
            // System.out.println("infosPro : " + employeDTO.getInfosProfessionnelles().getMatricule());
            // System.out.println("infosAdmin : " + employeDTO.getInfosAdministratives().getSituationFamiliale().getType());
            // System.out.println("departement : " + employeDTO.getDepartement().getId());
            // System.out.println("emergency contact : " + employeDTO.getEmergencyContact().getAdresse());
            // System.out.println();
            // Création des informations professionnelles, administratives et du contact d'urgence 

            // 1. Validation du formulaire
            validation_formulaire_insertion(employeDTO);
            Employe employe = employeDTO.getEmploye();
            
            InfosAdministratives infosAdmin = infosAdministrativesService.create(employeDTO.getInfosAdministratives());
            EmergencyContact emergencyContact = emergencyContactService.create(employeDTO.getEmergencyContact());
            Nationalite nationalite = nationaliteService.getNationaliteById(employeDTO.getNationalite().getId()).get();
            Sexe sexe = sexeService.getSexeById(employeDTO.getSexe().getId()); 

            // Affectation à l'employé
            // employe.setInfosProfessionnelles(infosPro);
            employe.setInfosAdministratives(infosAdmin);
            employe.setEmergencyContact(emergencyContact);
            // employe.setCreatedAt(LocalDateTime.now());
            employe.setNationalite(nationalite);
            employe.setSexe(sexe);

            // System.out.println("emp infos incomplètes : ");
            // System.out.println("infoPro");

            // Sauvegarde finale de l'employé
            employe = create(employe);
            
            employeDTO.setEmploye(employe);// 
            System.out.println("idEmp : " + employeDTO.getEmploye().getId());// historiquePosteService.save(employeDTO.getHistoriquePoste());
            
            Employe emp_inserted = getById(employeDTO.getEmploye().getId()).get();
            InfosProfessionnelles infosPro = employeDTO.getInfosProfessionnelles();
            infosPro.setEmploye(employeDTO.getEmploye()); 
            System.out.println("infoPro : "+ infosPro.getDepartement().getId());
            System.out.println("emp dans pro : " + infosPro.getEmploye().getId());
            // infosPro.setEmploye(employe); 
            infosPro = infosProfessionnellesService.create(infosPro);
        } catch (Exception e) {
            // Log détaillé de l'erreur
            System.err.println("Erreur lors de l'insertion intégrale de l'employé : " + e.getMessage());
            e.printStackTrace();
            // Relancer l'exception pour rollback
            throw e;
        }
    }

    // public List<Employe> getAllManagers(){
        
    // }
}
