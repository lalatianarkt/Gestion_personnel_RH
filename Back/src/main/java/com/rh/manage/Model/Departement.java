package com.rh.manage.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import java.sql.Timestamp;

@Entity
@Table(name = "departement")
public class Departement {

    @Id
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "nom", length = 50, nullable = false)
    private String nom;

    @Column(name = "description", length = 100)
    private String description;

    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

    @Column(name = "modified_at")
    private Timestamp modifiedAt;

    @Column(name = "nb_employe", nullable = false)
    private Integer nbEmploye;

    // Clé étrangère vers TypeDepartement
    @ManyToOne
    @JoinColumn(name = "id_departement", referencedColumnName = "id")
    private TypeDepartement idTypeDepartement;

    // Constructeur par défaut
    public Departement() {}

    // Constructeur avec paramètres
    public Departement(String id, String nom, String description, Timestamp createdAt, Timestamp modifiedAt,
                       Integer nbEmploye, TypeDepartement idTypeDepartement) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.nbEmploye = nbEmploye;
        this.idTypeDepartement = idTypeDepartement;
    }

    // Getters et setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getModifiedAt() {
        return modifiedAt;
    }

    public void setModifiedAt(Timestamp modifiedAt) {
        this.modifiedAt = modifiedAt;
    }

    public Integer getNbEmploye() {
        return nbEmploye;
    }

    public void setNbEmploye(Integer nbEmploye) {
        this.nbEmploye = nbEmploye;
    }

    public TypeDepartement getIdTypeDepartement() {
        return idTypeDepartement;
    }

    public void setIdTypeDepartement(TypeDepartement idTypeDepartement) {
        this.idTypeDepartement = idTypeDepartement;
    }

    @Override
    public String toString() {
        return "Departement{" +
                "id='" + id + '\'' +
                ", nom='" + nom + '\'' +
                ", description='" + description + '\'' +
                ", createdAt=" + createdAt +
                ", modifiedAt=" + modifiedAt +
                ", nbEmploye=" + nbEmploye +
                ", idTypeDepartement=" + idTypeDepartement +
                '}';
    }
}
