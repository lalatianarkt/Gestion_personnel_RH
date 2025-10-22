package com.rh.manage.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Table(name = "type_document")
public class TypeDocument {

    @Id
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "intitule", length = 50, nullable = false)
    private String intitule;

    // Constructeur par défaut
    public TypeDocument() {}

    // Constructeur avec paramètres
    public TypeDocument(String id, String intitule) {
        this.id = id;
        this.intitule = intitule;
    }

    // Getters et setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIntitule() {
        return intitule;
    }

    public void setIntitule(String intitule) {
        this.intitule = intitule;
    }

    @Override
    public String toString() {
        return "TypeDocument{" +
                "id='" + id + '\'' +
                ", intitule='" + intitule + '\'' +
                '}';
    }
}
