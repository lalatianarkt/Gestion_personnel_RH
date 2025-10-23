package com.rh.manage.Model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "infos_professionnelles")
public class InfosProfessionnelles {
    @Id
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "matricule", length = 50, nullable = false, unique = true)
    private String matricule;

    @Column(name = "date_embauche", nullable = false)
    private LocalDate dateEmbauche;

    // Constructeurs
    public InfosProfessionnelles() {}

    public InfosProfessionnelles(String id, String matricule, LocalDate dateEmbauche) {
        this.id = id;
        this.matricule = matricule;
        this.dateEmbauche = dateEmbauche;
    }

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getMatricule() { return matricule; }
    public void setMatricule(String matricule) { this.matricule = matricule; }

    public LocalDate getDateEmbauche() { return dateEmbauche; }
    public void setDateEmbauche(LocalDate dateEmbauche) { this.dateEmbauche = dateEmbauche; }
}
