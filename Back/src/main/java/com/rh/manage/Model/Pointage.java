package com.rh.manage.Model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "Pointage")
public class Pointage {

    @Id
    private String id;

    @Column(name = "heure_arrivee", nullable = false)
    private LocalTime heureArrivee;

    @Column(name = "heure_depart")
    private LocalTime heureDepart;

    @Column(name = "heure_journaliere")
    private LocalTime heureJournaliere;

    @Column(name = "date_du_jour", nullable = false)
    private LocalDate dateDuJour;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "modified_at")
    private LocalDateTime modifiedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_employe", nullable = false)
    private Employe employe;

    // Génération automatique de l'ID avant insertion
    @PrePersist
    public void prePersist() {
        if (this.id == null || this.id.isEmpty()) {
            this.id = "POINT-" + UUID.randomUUID().toString();
        }
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public LocalTime getHeureArrivee() { return heureArrivee; }
    public void setHeureArrivee(LocalTime heureArrivee) { this.heureArrivee = heureArrivee; }

    public LocalTime getHeureDepart() { return heureDepart; }
    public void setHeureDepart(LocalTime heureDepart) { this.heureDepart = heureDepart; }

    public LocalTime getHeureJournaliere() { return heureJournaliere; }
    public void setHeureJournaliere(LocalTime heureJournaliere) { this.heureJournaliere = heureJournaliere; }

    public LocalDate getDateDuJour() { return dateDuJour; }
    public void setDateDuJour(LocalDate dateDuJour) { this.dateDuJour = dateDuJour; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getModifiedAt() { return modifiedAt; }
    public void setModifiedAt(LocalDateTime modifiedAt) { this.modifiedAt = modifiedAt; }

    public Employe getEmploye() { return employe; }
    public void setEmploye(Employe employe) { this.employe = employe; }
}
