package com.rh.Model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "poste")
public class Poste {
    
    @Id
    @Column(name = "id", length = 50)
    private String id;
    
    @Column(name = "nom", length = 100, nullable = false)
    private String nom;
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "modified_at")
    private LocalDateTime modifiedAt;
    
    // Relation avec les employés (OneToMany)
    @OneToMany(mappedBy = "poste", fetch = FetchType.LAZY)
    private java.util.List<Employe> employes;
    
    // Constructeurs
    public Poste() {
        // Constructeur par défaut requis par JPA
    }
    
    public Poste(String id, String nom) {
        this.id = id;
        this.nom = nom;
    }
    
    public Poste(String id, String nom, String description) {
        this.id = id;
        this.nom = nom;
        this.description = description;
    }
    
    // Getters et Setters
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
    
    public java.util.List<Employe> getEmployes() {
        return employes;
    }
    
    public void setEmployes(java.util.List<Employe> employes) {
        this.employes = employes;
    }
    
    // Méthodes de callback JPA
    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        this.modifiedAt = LocalDateTime.now();
    }
    
    // Méthodes utilitaires
    @Override
    public String toString() {
        return "Poste{" +
                "id='" + id + '\'' +
                ", nom='" + nom + '\'' +
                ", description='" + description + '\'' +
                ", createdAt=" + createdAt +
                ", modifiedAt=" + modifiedAt +
                '}';
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        Poste poste = (Poste) o;
        
        return id.equals(poste.id);
    }
    
    @Override
    public int hashCode() {
        return id.hashCode();
    }
}