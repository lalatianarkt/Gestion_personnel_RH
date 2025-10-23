package com.rh.manage.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "infos_administratives")
public class InfosAdministratives {
    @Id
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "num_cnaps", length = 50, nullable = false)
    private String numCnaps;

    @Column(name = "cin", length = 20, nullable = false, unique = true)
    private String cin;

    @Column(name = "nombre_enfants")
    private Integer nombreEnfants;

    @Column(name = "situation_familiale", length = 50)
    private String situationFamiliale;

    // Constructeurs
    public InfosAdministratives() {}

    public InfosAdministratives(String id, String numCnaps, String cin, Integer nombreEnfants, String situationFamiliale) {
        this.id = id;
        this.numCnaps = numCnaps;
        this.cin = cin;
        this.nombreEnfants = nombreEnfants;
        this.situationFamiliale = situationFamiliale;
    }

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNumCnaps() { return numCnaps; }
    public void setNumCnaps(String numCnaps) { this.numCnaps = numCnaps; }

    public String getCin() { return cin; }
    public void setCin(String cin) { this.cin = cin; }

    public Integer getNombreEnfants() { return nombreEnfants; }
    public void setNombreEnfants(Integer nombreEnfants) { this.nombreEnfants = nombreEnfants; }

    public String getSituationFamiliale() { return situationFamiliale; }
    public void setSituationFamiliale(String situationFamiliale) { this.situationFamiliale = situationFamiliale; }
}
