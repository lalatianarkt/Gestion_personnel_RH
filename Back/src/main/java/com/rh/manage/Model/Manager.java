package com.rh.manage.Model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "manager")
public class Manager {

    @Id
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "date_debut", nullable = false)
    private LocalDate dateDebut;

    @Column(name = "date_fin")
    private LocalDate dateFin;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "modified_at")
    private LocalDateTime modifiedAt;

    // === RELATION AVEC EMPLOYE ===
    @ManyToOne
    @JoinColumn(name = "id_employe", nullable = false)
    private Employe employe;

    // === CONSTRUCTEURS ===

    public Manager() {
        // Constructeur par défaut pour JPA
    }

    public Manager(LocalDate dateDebut, Employe employe) {
        this.dateDebut = dateDebut;
        this.employe = employe;
        this.dateFin = null; // Management actuel par défaut
    }

    public Manager(LocalDate dateDebut, LocalDate dateFin, Employe employe) {
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.employe = employe;
    }

    // === MÉTHODE PREPERSIST POUR GÉNÉRER L'ID ===
    @PrePersist
    public void prePersist() {
        if (this.id == null) {
            this.id = generateCustomId();
        }
    }

    // === GÉNÉRATION D'IDENTIFIANT ===
    private String generateCustomId() {
        String timestamp = String.valueOf(System.currentTimeMillis());
        String random = String.valueOf((int) (Math.random() * 1000));
        return "MGR-" + timestamp + "-" + random;
    }

    // === GETTERS / SETTERS ===

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
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

    // === MÉTHODES UTILES ===

    public boolean isActif() {
        return this.dateFin == null;
    }

    public Long getDureeManagement() {
        if (this.dateDebut == null) {
            return 0L;
        }
        LocalDate fin = this.dateFin != null ? this.dateFin : LocalDate.now();
        return java.time.temporal.ChronoUnit.DAYS.between(this.dateDebut, fin);
    }

    @Override
    public String toString() {
        return "Manager{" +
                "id='" + id + '\'' +
                ", dateDebut=" + dateDebut +
                ", dateFin=" + dateFin +
                ", employe=" + (employe != null ? employe.getNom() + " " + employe.getPrenom() : "null") +
                ", actif=" + isActif() +
                '}';
    }
}