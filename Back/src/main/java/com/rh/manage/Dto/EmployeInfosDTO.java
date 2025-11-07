package com.rh.manage.Dto;

import com.rh.manage.Model.Employe;
import com.rh.manage.Model.InfosProfessionnelles;

public class EmployeInfosDTO {
    private Employe employe;
    private InfosProfessionnelles infosProfessionnelles;
    
    // Constructeurs
    public EmployeInfosDTO() {}
    
    public EmployeInfosDTO(Employe employe, InfosProfessionnelles infosProfessionnelles) {
        this.employe = employe;
        this.infosProfessionnelles = infosProfessionnelles;
    }
    
    // Getters et Setters
    public Employe getEmploye() { return employe; }
    public void setEmploye(Employe employe) { this.employe = employe; }
    
    public InfosProfessionnelles getInfosProfessionnelles() { return infosProfessionnelles; }
    public void setInfosProfessionnelles(InfosProfessionnelles infosProfessionnelles) { 
        this.infosProfessionnelles = infosProfessionnelles; 
    }
}