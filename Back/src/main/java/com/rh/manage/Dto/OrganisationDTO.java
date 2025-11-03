package com.rh.manage.Dto;
import java.util.List;

import com.rh.manage.Model.Departement;
import com.rh.manage.Model.ManagerEmploye;

public class OrganisationDTO {
    private Departement departement;
    private List<ManagerEmploye> les_employes_manager;
    
    public Departement getDepartement() {
        return departement;
    }
    public void setDepartement(Departement departement) {
        this.departement = departement;
    }
    public List<ManagerEmploye> getLes_employes_manager() {
        return les_employes_manager;
    }
    public void setLes_employes_manager(List<ManagerEmploye> les_employes_manager) {
        this.les_employes_manager = les_employes_manager;
    }

    
}

