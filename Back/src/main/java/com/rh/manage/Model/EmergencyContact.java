package com.rh.manage.Model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

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

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "modified_at")
    private LocalDateTime modifiedAt;

    // 🔹 Constructeur par défaut avec génération automatique d’ID lisible
    public EmergencyContact() {
        this.id = generateCustomId();
    }

    // 🔹 Constructeur avec paramètres
    public EmergencyContact(String contact, String email, String adresse) {
        this.id = generateCustomId();
        this.contact = contact;
        this.email = email;
        this.adresse = adresse;
    }

    // 🔹 Génération d’un ID du type EC-YYYYMMDD-XXXXXX
    private String generateCustomId() {
        String datePart = LocalDateTime.now().format(DateTimeFormatter.BASIC_ISO_DATE); // ex: 20251028
        String shortUuid = UUID.randomUUID().toString().substring(0, 6);
        return "EC-" + datePart + "-" + shortUuid;
    }

    // ⚙️ Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getModifiedAt() { return modifiedAt; }
    public void setModifiedAt(LocalDateTime modifiedAt) { this.modifiedAt = modifiedAt; }

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
}
