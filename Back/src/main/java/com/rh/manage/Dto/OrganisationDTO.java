package com.rh.manage.Dto;
import java.util.List;

import com.rh.manage.Model.Departement;
import com.rh.manage.Model.ManagerEmploye;
import com.rh.manage.Model.PosteEmploye;

public class OrganisationDTO {
    private Departement departement;
    private List<ManagerEmploye> les_employes_manager;
    private List<PosteEmploye> les_posteEmploye; 

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
    public List<PosteEmploye> getLes_posteEmploye() {
        return les_posteEmploye;
    }
    public void setLes_posteEmploye(List<PosteEmploye> les_posteEmploye) {
        this.les_posteEmploye = les_posteEmploye;
    }
    

    
}

