package com.rh.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import java.sql.Timestamp;

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

    @Column(name = "date_upload", nullable = false)
    private Timestamp dateUpload;

    @Column(name = "date_modified")
    private Timestamp dateModified;

    // Clés étrangères
    @ManyToOne
    @JoinColumn(name = "id_type_document", referencedColumnName = "id")
    private TypeDocument idTypeDocument;

    @ManyToOne
    @JoinColumn(name = "id_employe", referencedColumnName = "id")
    private Employe idEmploye;

    // Constructeur par défaut
    public DocumentEmploye() {}

    // Constructeur avec paramètres
    public DocumentEmploye(String id, String nomFichier, String cheminFichier, Timestamp dateUpload,
                           Timestamp dateModified, TypeDocument idTypeDocument, Employe idEmploye) {
        this.id = id;
        this.nomFichier = nomFichier;
        this.cheminFichier = cheminFichier;
        this.dateUpload = dateUpload;
        this.dateModified = dateModified;
        this.idTypeDocument = idTypeDocument;
        this.idEmploye = idEmploye;
    }

    // Getters et setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNomFichier() {
        return nomFichier;
    }

    public void setNomFichier(String nomFichier) {
        this.nomFichier = nomFichier;
    }

    public String getCheminFichier() {
        return cheminFichier;
    }

    public void setCheminFichier(String cheminFichier) {
        this.cheminFichier = cheminFichier;
    }

    public Timestamp getDateUpload() {
        return dateUpload;
    }

    public void setDateUpload(Timestamp dateUpload) {
        this.dateUpload = dateUpload;
    }

    public Timestamp getDateModified() {
        return dateModified;
    }

    public void setDateModified(Timestamp dateModified) {
        this.dateModified = dateModified;
    }

    public TypeDocument getIdTypeDocument() {
        return idTypeDocument;
    }

    public void setIdTypeDocument(TypeDocument idTypeDocument) {
        this.idTypeDocument = idTypeDocument;
    }

    public Employe getIdEmploye() {
        return idEmploye;
    }

    public void setIdEmploye(Employe idEmploye) {
        this.idEmploye = idEmploye;
    }

    @Override
    public String toString() {
        return "DocumentEmploye{" +
                "id='" + id + '\'' +
                ", nomFichier='" + nomFichier + '\'' +
                ", cheminFichier='" + cheminFichier + '\'' +
                ", dateUpload=" + dateUpload +
                ", dateModified=" + dateModified +
                ", idTypeDocument=" + idTypeDocument +
                ", idEmploye=" + idEmploye +
                '}';
    }
}
