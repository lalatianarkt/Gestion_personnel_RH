package com.rh.manage.Dto;

import com.rh.manage.Model.Departement;
import com.rh.manage.Model.EmergencyContact;
import com.rh.manage.Model.Employe;
import com.rh.manage.Model.HistoriquePoste;
import com.rh.manage.Model.InfosAdministratives;
import com.rh.manage.Model.InfosProfessionnelles;
import com.rh.manage.Model.Nationalite;
import com.rh.manage.Model.Poste;
import com.rh.manage.Model.PosteEmploye;
import com.rh.manage.Model.Sexe;

public class EmployeDTO {
    private Employe employe;
    private EmergencyContact emergencyContact;
    private InfosAdministratives infosAdministratives;
    private InfosProfessionnelles infosProfessionnelles;
    // private HistoriquePoste historiquePoste; 
    private Nationalite nationalite;
    private Sexe sexe;

    public Sexe getSexe() {
        return sexe;
    }
    public void setSexe(Sexe sexe) {
        this.sexe = sexe;
    }
    public Nationalite getNationalite() {
        return nationalite;
    }
    public void setNationalite(Nationalite nationalite) {
        this.nationalite = nationalite;
    }
    public Employe getEmploye() {
        return employe;
    }
    public void setEmploye(Employe employe) {
        this.employe = employe;
    }
    public InfosAdministratives getInfosAdministratives() {
        return infosAdministratives;
    }
    public void setInfosAdministratives(InfosAdministratives infosAdministratives) {
        this.infosAdministratives = infosAdministratives;
    }
    public InfosProfessionnelles getInfosProfessionnelles() {
        return infosProfessionnelles;
    }
    public void setInfosProfessionnelles(InfosProfessionnelles infosProfessionnelles) {
        this.infosProfessionnelles = infosProfessionnelles;
    }
    public EmergencyContact getEmergencyContact() {
        return emergencyContact;
    }
    public void setEmergencyContact(EmergencyContact emergencyContact) {
        this.emergencyContact = emergencyContact;
    }
    // public HistoriquePoste getHistoriquePoste() {
    //     return historiquePoste;
    // }
    // public void setHistoriquePoste(HistoriquePoste historiquePoste) {
    //     this.historiquePoste = historiquePoste;
    // }
    
    
}
