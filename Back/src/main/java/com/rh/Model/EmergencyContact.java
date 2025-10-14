package com.rh.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "emergency_contact")
public class EmergencyContact {
    
    @Id
    @Column(name = "id", length = 50)
    private String id;
    
    @Column(name = "contact", length = 100, nullable = false)
    private String contact;
    
    @Column(name = "email", length = 100)
    private String email;
    
    @Column(name = "adresse", length = 255)
    private String adresse;
    
    // Relation bidirectionnelle avec Employe (optionnel)
    @OneToOne(mappedBy = "emergencyContact", fetch = FetchType.LAZY)
    private Employe employe;
    
    // Constructeurs
    public EmergencyContact() {
        // Constructeur par défaut requis par JPA
    }
    
    public EmergencyContact(String id, String contact, String email, String adresse) {
        this.id = id;
        this.contact = contact;
        this.email = email;
        this.adresse = adresse;
    }
    
    public EmergencyContact(String id, String contact) {
        this.id = id;
        this.contact = contact;
    }
    
    // Getters et Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getContact() {
        return contact;
    }
    
    public void setContact(String contact) {
        this.contact = contact;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getAdresse() {
        return adresse;
    }
    
    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }
    
    public Employe getEmploye() {
        return employe;
    }
    
    public void setEmploye(Employe employe) {
        this.employe = employe;
    }
    
    // Méthodes utilitaires
    @Override
    public String toString() {
        return "EmergencyContact{" +
                "id='" + id + '\'' +
                ", contact='" + contact + '\'' +
                ", email='" + email + '\'' +
                ", adresse='" + adresse + '\'' +
                '}';
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        EmergencyContact that = (EmergencyContact) o;
        
        return id.equals(that.id);
    }
    
    @Override
    public int hashCode() {
        return id.hashCode();
    }
}