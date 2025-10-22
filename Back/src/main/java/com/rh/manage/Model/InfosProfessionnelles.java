package com.rh.manage.Model;

import jakarta.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "infos_professionnelles")
public class InfosProfessionnelles {
    
    @Id
    @Column(name = "id", length = 50)
    private String id;
    
    @Column(name = "matricule", length = 50, unique = true, nullable = false)
    private String matricule;
    
    @Column(name = "date_embauche", nullable = false)
    private Date dateEmbauche;
    
    // Relation bidirectionnelle avec Employe (optionnel)
    @OneToOne(mappedBy = "infosProfessionnelles", fetch = FetchType.LAZY)
    private Employe employe;
    
    // Constructeurs
    public InfosProfessionnelles() {
        // Constructeur par défaut requis par JPA
    }
    
    public InfosProfessionnelles(String id, String matricule, Date dateEmbauche) {
        this.id = id;
        this.matricule = matricule;
        this.dateEmbauche = dateEmbauche;
    }
    
    // Getters et Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getMatricule() {
        return matricule;
    }
    
    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }
    
    public Date getDateEmbauche() {
        return dateEmbauche;
    }
    
    public void setDateEmbauche(Date dateEmbauche) {
        this.dateEmbauche = dateEmbauche;
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
        return "InfosProfessionnelles{" +
                "id='" + id + '\'' +
                ", matricule='" + matricule + '\'' +
                ", dateEmbauche=" + dateEmbauche +
                '}';
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        InfosProfessionnelles that = (InfosProfessionnelles) o;
        
        return id.equals(that.id);
    }
    
    @Override
    public int hashCode() {
        return id.hashCode();
    }
}