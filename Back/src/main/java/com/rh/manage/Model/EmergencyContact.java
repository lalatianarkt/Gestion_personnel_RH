package com.rh.manage.Model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "emergency_contact")
public class EmergencyContact {

    @Id
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "contact", length = 50)
    private String contact;

    @Column(name = "email", length = 50)
    private String email;

    @Column(name = "adresse", length = 50)
    private String adresse;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "modified_at")
    private LocalDateTime modifiedAt;

    // Relation bidirectionnelle avec Employe (optionnelle)
    @OneToOne(mappedBy = "emergencyContact", fetch = FetchType.LAZY)
    private Employe employe;

    // Constructeurs
    public EmergencyContact() {
        // Constructeur par défaut requis par JPA
    }

    public EmergencyContact(String id, String contact, String email, String adresse, LocalDateTime createdAt) {
        this.id = id;
        this.contact = contact;
        this.email = email;
        this.adresse = adresse;
        this.createdAt = createdAt;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getModifiedAt() {
        return modifiedAt;
    }

    public void setModifiedAt(LocalDateTime modifiedAt) {
        this.modifiedAt = modifiedAt;
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
                ", createdAt=" + createdAt +
                ", modifiedAt=" + modifiedAt +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EmergencyContact)) return false;
        EmergencyContact that = (EmergencyContact) o;
        return id != null && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}
