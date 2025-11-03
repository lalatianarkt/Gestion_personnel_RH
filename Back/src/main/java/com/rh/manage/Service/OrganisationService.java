package com.rh.manage.Service;

import com.rh.manage.Dto.EmployeDTO;
import com.rh.manage.Dto.OrganisationDTO;
import com.rh.manage.Model.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrganisationService {

    @Autowired
    private DepartementService departementService;

    @Autowired
    private ManagerService managerService;

    @Autowired
    private ManagerEmployeService managerEmployeService;

    // getAllDepartement => List<Departement> les_departements 
        // foreach(Departement dep : les_departements){
        //     Manager manager_de_ce_departement = managerService.getManagerParDepartement();
        //     List<ManagerEmploye> les_manager_employés = managerEmployeService.getEmployeParManager(manager_de_ce_departement).;
        // }                                            
    public List<OrganisationDTO> getAllOrganisation() {
        try {
            List<OrganisationDTO> les_organisations = new ArrayList<>();
            List<Departement> les_departements = departementService.getAllDepartements();

            for (Departement departement : les_departements) {
                OrganisationDTO organisationDTO = new OrganisationDTO();

                // Récupération du manager du département
                Manager manager = managerService.getManagerParDepartement(departement.getId());
                List<ManagerEmploye> les_employes_manager = new ArrayList<>();
                if(manager != null){
                    les_employes_manager = managerEmployeService.getEmployeParManager(manager.getId());
                }

                organisationDTO.setDepartement(departement);
                organisationDTO.setLes_employes_manager(les_employes_manager);
                les_organisations.add(organisationDTO);
            }

            return les_organisations;

        } catch (Exception e) {
            // Log complet de l'erreur
            System.err.println("Erreur lors de la récupération de l'organisation : " + e.getMessage());
            e.printStackTrace();

            // Relancer l'exception pour que le contrôleur la gère
            throw new RuntimeException("Impossible de récupérer les organisations : " + e.getMessage(), e);
        }
    }


}

