package com.rh.manage.Model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "poste_employe")
public class PosteEmploye {
    @Id
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "date_debut", nullable = false)
    private LocalDate dateDebut;

    @Column(name = "date_fin", nullable = false)
    private LocalDate dateFin;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_poste", referencedColumnName = "id", nullable = false)
    private Poste poste;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_employe", referencedColumnName = "id", nullable = false)
    private Employe employe;

    // Constructeurs
    public PosteEmploye() {}

    public PosteEmploye(String id, LocalDate dateDebut, LocalDate dateFin) {
        this.id = id;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
    }

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public LocalDate getDateDebut() { return dateDebut; }
    public void setDateDebut(LocalDate dateDebut) { this.dateDebut = dateDebut; }

    public LocalDate getDateFin() { return dateFin; }
    public void setDateFin(LocalDate dateFin) { this.dateFin = dateFin; }

    public Poste getPoste() { return poste; }
    public void setPoste(Poste poste) { this.poste = poste; }

    public Employe getEmploye() { return employe; }
    public void setEmploye(Employe employe) { this.employe = employe; }
}
