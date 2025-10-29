package com.rh.manage.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rh.manage.Dto.EmployeDTO;
import com.rh.manage.Model.Departement;
import com.rh.manage.Model.DepartementEmploye;
import com.rh.manage.Model.EmergencyContact;
import com.rh.manage.Model.Employe;
import com.rh.manage.Model.InfosAdministratives;
import com.rh.manage.Model.InfosProfessionnelles;
import com.rh.manage.Model.Nationalite;
import com.rh.manage.Model.Poste;
import com.rh.manage.Model.PosteEmploye;
import com.rh.manage.Model.Sexe;
import com.rh.manage.Repository.EmployeRepository;

import java.sql.Connection;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeService {

    @Autowired
    private InfosProfessionnellesService infosProfessionnellesService;

    @Autowired
    private EmployeRepository employeRepository;

    @Autowired 
    private DepartementService departementService;

    @Autowired 
    private DepartementEmployeService departementEmployeService;

    @Autowired 
    private PosteService posteService;

    @Autowired 
    private PosteEmployeService posteEmployeService;

    @Autowired
    private InfosAdministrativesService infosAdministrativesService;

    @Autowired 
    private EmergencyContactService emergencyContactService;

    @Autowired
    private NationaliteService nationaliteService;

    @Autowired
    private SexeService sexeService;

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

    @Transactional
    public void insertionIntegraleEmploye(EmployeDTO employeDTO) {
        try {

            // System.out.println("right here +++++++++++++++++++++++++++++++++++++++++++++++++++++");
            // System.out.println(employeDTO);
            Employe employe = employeDTO.getEmploye();
            // System.out.println("emp : " + employe.getNomMere());
            // System.out.println("infosPro : " + employeDTO.getInfosProfessionnelles().getMatricule());
            // System.out.println("infosAdmin : " + employeDTO.getInfosAdministratives().getSituationFamiliale().getType());
            // System.out.println("departement : " + employeDTO.getDepartement().getId());
            // System.out.println("emergency contact : " + employeDTO.getEmergencyContact().getAdresse());
            // System.out.println();
            // Création des informations professionnelles, administratives et du contact d'urgence
            InfosProfessionnelles infosPro = infosProfessionnellesService.create(employeDTO.getInfosProfessionnelles());
            InfosAdministratives infosAdmin = infosAdministrativesService.create(employeDTO.getInfosAdministratives());
            EmergencyContact emergencyContact = emergencyContactService.create(employeDTO.getEmergencyContact());
            Nationalite nationalite = nationaliteService.getNationaliteById(employeDTO.getNationalite().getId()).get();
            Sexe sexe = sexeService.getSexeById(employeDTO.getSexe().getId());

            // Affectation à l'employé
            employe.setInfosProfessionnelles(infosPro);
            employe.setInfosAdministratives(infosAdmin);
            employe.setEmergencyContact(emergencyContact);
            // employe.setCreatedAt(LocalDateTime.now());
            employe.setNationalite(nationalite);
            employe.setSexe(sexe);

            System.out.println("emp infos incomplètes : ");
            System.out.println("infoPro");

            // Sauvegarde finale de l'employé
            employe = create(employe);

            // Récupération du département
            Optional<Departement> departementOpt = departementService.getDepartementById(
                    employeDTO.getDepartement().getId()
            );
            if (departementOpt.isEmpty()) {
                throw new IllegalArgumentException("Département non trouvé avec l'ID : " +
                                                employeDTO.getDepartement().getId());
            }
            Departement departement = departementOpt.get();            

            // Création de la relation employé-département
            DepartementEmploye departementEmploye = new DepartementEmploye();
            // departementEmploye.setCreatedAt(LocalDateTime.now());
            departementEmploye.setDepartement(departement);
            departementEmploye.setEmploye(employe);
            departementEmployeService.save(departementEmploye);

            // Création de la relation employé-poste
            Optional<Poste> posteOpt = posteService.getPosteById(employeDTO.getPoste().getId());
            if (posteOpt.isEmpty()) {
                throw new IllegalArgumentException("Poste non trouvé avec l'ID : " +
                                                employeDTO.getPoste().getId());
            } 
            PosteEmploye posteEmploye = new PosteEmploye();
            posteEmploye.setEmploye(employe);
            posteEmploye.setPoste(posteOpt.get());
            posteEmploye.setDateDebut(employeDTO.getPosteEmploye().getDateDebut());
            posteEmploye.setDateFin(employeDTO.getPosteEmploye().getDateFin());
            posteEmployeService.save(posteEmploye);

            

        } catch (Exception e) {
            // Log détaillé de l'erreur
            System.err.println("Erreur lors de l'insertion intégrale de l'employé : " + e.getMessage());
            e.printStackTrace();
            // Relancer l'exception pour rollback
            throw e;
        }
    }
}
