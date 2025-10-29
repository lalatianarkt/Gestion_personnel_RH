package com.rh.manage.Model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Entity
@Table(name = "departement_employe")
public class DepartementEmploye {

    @Id
    @Column(name = "id", length = 50)
    private String id;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "modified_at")
    private LocalDateTime modifiedAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_employe", referencedColumnName = "id", nullable = false)
    private Employe employe;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_departement", referencedColumnName = "id", nullable = false)
    private Departement departement;

    // === Constructeurs ===
    public DepartementEmploye() {
        this.id = generateCustomId();
    }

    public DepartementEmploye(Employe employe, Departement departement) {
        this.id = generateCustomId();
        this.employe = employe;
        this.departement = departement;
    }

    // 🔹 Génération d’un ID lisible : DEPT-YYYYMMDD-XXXXXX
    private String generateCustomId() {
        String datePart = LocalDateTime.now().format(DateTimeFormatter.BASIC_ISO_DATE);
        String shortUuid = UUID.randomUUID().toString().substring(0, 6);
        return "DEPT-" + datePart + "-" + shortUuid;
    }

    // === Getters / Setters ===
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getModifiedAt() { return modifiedAt; }
    public void setModifiedAt(LocalDateTime modifiedAt) { this.modifiedAt = modifiedAt; }

    public Employe getEmploye() { return employe; }
    public void setEmploye(Employe employe) { this.employe = employe; }

    public Departement getDepartement() { return departement; }
    public void setDepartement(Departement departement) { this.departement = departement; }
}
