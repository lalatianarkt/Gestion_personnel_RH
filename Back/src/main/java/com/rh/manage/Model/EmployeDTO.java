package com.rh.manage.Model;

public class EmployeDTO {
    private Employe employe;
    private EmergencyContact emergencyContact;
    private InfosAdministratives infosAdministratives;
    private InfosProfessionnelles infosProfessionnelles;

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
    
}
