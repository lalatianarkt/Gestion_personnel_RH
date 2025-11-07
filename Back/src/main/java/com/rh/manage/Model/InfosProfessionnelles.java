package com.rh.manage.Model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Entity
@Table(name = "infos_professionnelles")
public class InfosProfessionnelles {

    @Id
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "date_embauche", nullable = false)
    private LocalDate dateEmbauche;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "modified_at")
    private LocalDateTime modifiedAt;

    // === RELATIONS ===
    
    @ManyToOne
    @JoinColumn(name = "id_manager")
    private Manager manager;

    @ManyToOne
    @JoinColumn(name = "id_departement")
    private Departement departement;

    @ManyToOne
    @JoinColumn(name = "id_poste", nullable = false)
    private Poste poste;

    @ManyToOne
    @JoinColumn(name = "id_type_contrat", nullable = false)
    private TypeContrat typeContrat;

    // ✅ CORRECTION : PAS DE CASCADE pour ManyToOne
    @ManyToOne
    @JoinColumn(name = "id_employe", nullable = false)
    private Employe employe;

    // === CONSTRUCTEURS ===

    public InfosProfessionnelles() {
        // Constructeur par défaut pour JPA
    }

    public InfosProfessionnelles(LocalDate dateEmbauche, Employe employe, Poste poste, TypeContrat typeContrat, Departement departement, Manager manager) {
        this.dateEmbauche = dateEmbauche;
        this.employe = employe;
        this.poste = poste;
        this.typeContrat = typeContrat;
        this.departement = departement;
        this.manager = manager;
    }

    // === MÉTHODE PREPERSIST ===
    
    @PrePersist
    public void prePersist() {
        if (this.id == null) {
            this.id = generateCustomId();
        }
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    // === GÉNÉRATION D'IDENTIFIANT ===

    private String generateCustomId() {
        String datePart = LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE);
        String shortUuid = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        return "IP-" + datePart + "-" + shortUuid;
    }

    // === GETTERS / SETTERS ===
    // (inchangés)

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public LocalDate getDateEmbauche() { return dateEmbauche; }
    public void setDateEmbauche(LocalDate dateEmbauche) { this.dateEmbauche = dateEmbauche; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getModifiedAt() { return modifiedAt; }
    public void setModifiedAt(LocalDateTime modifiedAt) { this.modifiedAt = modifiedAt; }

    public Manager getManager() { return manager; }
    public void setManager(Manager manager) { this.manager = manager; }

    public Departement getDepartement() { return departement; }
    public void setDepartement(Departement departement) { this.departement = departement; }

    public Poste getPoste() { return poste; }
    public void setPoste(Poste poste) { this.poste = poste; }

    public TypeContrat getTypeContrat() { return typeContrat; }
    public void setTypeContrat(TypeContrat typeContrat) { this.typeContrat = typeContrat; }

    public Employe getEmploye() { return employe; }
    public void setEmploye(Employe employe) { this.employe = employe; }

    @Override
    public String toString() {
        return "InfosProfessionnelles{" +
                "id='" + id + '\'' +
                ", dateEmbauche=" + dateEmbauche +
                ", employe=" + (employe != null ? employe.getId() : "null") +
                '}';
    }
}