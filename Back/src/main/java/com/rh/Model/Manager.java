package com.rh.Model;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

public class Manager {
    @Id
    @Column(name = "id", length = 50)
    private String id;

    @ManyToOne
    @JoinColumn(name = "id_departement", referencedColumnName = "id")
    private Departement Departement;

    @ManyToOne
    @JoinColumn(name = "id_employe", referencedColumnName = "id")
    private Employe employe;

    @Column(name = "description")
    String description;
   
   public String getId() {
    return id;
   }
   public void setId(String id) {
    this.id = id;
   }
   public String getDescription() {
    return description;
   }
   public void setDescription(String description) {
    this.description = description;
   }
   public Departement getDepartement() {
    return Departement;
   }
   public void setDepartement(Departement departement) {
    Departement = departement;
   }
   public Employe getEmploye() {
    return employe;
   }
   public void setEmploye(Employe employe) {
    this.employe = employe;
   }
   
   

    
}
