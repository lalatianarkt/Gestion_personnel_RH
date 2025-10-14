package com.rh.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "infos_administratives")
public class InfosAdministratives {
    
    @Id
    @Column(name = "id", length = 50)
    private String id;
    
    @Column(name = "num_cnaps", length = 50, unique = true)
    private String numCnaps;
    
    @Column(name = "cin", length = 20, unique = true, nullable = false)
    private String cin;
    
    @Column(name = "nombre_enfants")
    private Integer nombreEnfants;
    
    @Column(name = "situation_familiale", length = 50)
    private String situationFamiliale;
    
    // Relation bidirectionnelle avec Employe (optionnel)
    @OneToOne(mappedBy = "infosAdministratives", fetch = FetchType.LAZY)
    private Employe employe;
    
    // Constructeurs
    public InfosAdministratives() {
        // Constructeur par défaut requis par JPA
    }
    
    public InfosAdministratives(String id, String cin) {
        this.id = id;
        this.cin = cin;
    }
    
    public InfosAdministratives(String id, String numCnaps, String cin, Integer nombreEnfants, String situationFamiliale) {
        this.id = id;
        this.numCnaps = numCnaps;
        this.cin = cin;
        this.nombreEnfants = nombreEnfants;
        this.situationFamiliale = situationFamiliale;
    }
    
    // Getters et Setters
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
    
    public String getSituationFamiliale() {
        return situationFamiliale;
    }
    
    public void setSituationFamiliale(String situationFamiliale) {
        this.situationFamiliale = situationFamiliale;
    }
    
    public Employe getEmploye() {
        return employe;
    }
    
    public void setEmploye(Employe employe) {
        this.employe = employe;
    }
    
    // Méthodes utilitaires
    @Override
    public String toString() {
        return "InfosAdministratives{" +
                "id='" + id + '\'' +
                ", numCnaps='" + numCnaps + '\'' +
                ", cin='" + cin + '\'' +
                ", nombreEnfants=" + nombreEnfants +
                ", situationFamiliale='" + situationFamiliale + '\'' +
                '}';
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        InfosAdministratives that = (InfosAdministratives) o;
        
        return id.equals(that.id);
    }
    
    @Override
    public int hashCode() {
        return id.hashCode();
    }
}