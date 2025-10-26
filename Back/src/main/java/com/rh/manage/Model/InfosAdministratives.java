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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_situation_familiale", referencedColumnName = "id")
    private SituationFamiliale situationFamiliale;

    // 🔨 Constructeur par défaut
    public InfosAdministratives() {}

    // 🔨 Constructeur avec paramètres
    public InfosAdministratives(String id, String numCnaps, String cin, Integer nombreEnfants, SituationFamiliale situationFamiliale) {
        this.id = id;
        this.numCnaps = numCnaps;
        this.cin = cin;
        this.nombreEnfants = nombreEnfants;
        this.situationFamiliale = situationFamiliale;
    }

    // ⚙️ Getters et Setters
    public String getId() { 
        return id; 
    }

    public void setId(String id) { 
        this.id = id; 
    }

    public String getNumCnaps() { 
        return numCnaps; 
    }

    public void setNumCnaps(String numCnaps) { 
        this.numCnaps = numCnaps; 
    }

    public String getCin() { 
        return cin; 
    }

    public void setCin(String cin) { 
        this.cin = cin; 
    }

    public Integer getNombreEnfants() { 
        return nombreEnfants; 
    }

    public void setNombreEnfants(Integer nombreEnfants) { 
        this.nombreEnfants = nombreEnfants; 
    }

    public SituationFamiliale getSituationFamiliale() { 
        return situationFamiliale; 
    }

    public void setSituationFamiliale(SituationFamiliale situationFamiliale) { 
        this.situationFamiliale = situationFamiliale; 
    }

    @Override
    public String toString() {
        return "InfosAdministratives{" +
                "id='" + id + '\'' +
                ", numCnaps='" + numCnaps + '\'' +
                ", cin='" + cin + '\'' +
                ", nombreEnfants=" + nombreEnfants +
                ", situationFamiliale=" + (situationFamiliale != null ? situationFamiliale.getType() : "null") +
                '}';
    }
}
