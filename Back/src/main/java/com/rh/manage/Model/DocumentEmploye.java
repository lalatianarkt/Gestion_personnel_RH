package com.rh.manage.Model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "document_employe")
public class DocumentEmploye {
    @Id
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "nom_fichier", length = 100, nullable = false)
    private String nomFichier;

    @Column(name = "chemin_fichier", length = 150, nullable = false)
    private String cheminFichier;

    @CreationTimestamp
    @Column(name = "date_upload", nullable = false, updatable = false)
    private LocalDateTime dateUpload;

    @UpdateTimestamp
    @Column(name = "date_modified")
    private LocalDateTime dateModified;

    // Relations avec les noms exacts des colonnes de la base
    @ManyToOne
    @JoinColumn(name = "id_type_document") // nullable = true selon votre schéma
    private TypeDocument typeDocument;

    @ManyToOne
    @JoinColumn(name = "id_employe") // nullable = true selon votre schéma
    private Employe employe;

    // Constructeurs
    public DocumentEmploye() {}

    public DocumentEmploye(String id, String nomFichier, String cheminFichier) {
        this.id = id;
        this.nomFichier = nomFichier;
        this.cheminFichier = cheminFichier;
    }

    public DocumentEmploye(String id, String nomFichier, String cheminFichier, TypeDocument typeDocument, Employe employe) {
        this.id = id;
        this.nomFichier = nomFichier;
        this.cheminFichier = cheminFichier;
        this.typeDocument = typeDocument;
        this.employe = employe;
    }

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNomFichier() { return nomFichier; }
    public void setNomFichier(String nomFichier) { this.nomFichier = nomFichier; }

    public String getCheminFichier() { return cheminFichier; }
    public void setCheminFichier(String cheminFichier) { this.cheminFichier = cheminFichier; }

    public LocalDateTime getDateUpload() { return dateUpload; }
    public void setDateUpload(LocalDateTime dateUpload) { this.dateUpload = dateUpload; }

    public LocalDateTime getDateModified() { return dateModified; }
    public void setDateModified(LocalDateTime dateModified) { this.dateModified = dateModified; }

    public TypeDocument getTypeDocument() { return typeDocument; }
    public void setTypeDocument(TypeDocument typeDocument) { this.typeDocument = typeDocument; }

    public Employe getEmploye() { return employe; }
    public void setEmploye(Employe employe) { this.employe = employe; }

    @Override
    public String toString() {
        return "DocumentEmploye{" +
                "id='" + id + '\'' +
                ", nomFichier='" + nomFichier + '\'' +
                ", cheminFichier='" + cheminFichier + '\'' +
                ", dateUpload=" + dateUpload +
                ", dateModified=" + dateModified +
                '}';
    }
}

