package com.rh.manage.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import java.sql.Date;

@Entity
@Table(name = "historique_poste")
public class HistoriquePoste {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "id_poste", length = 150)
    private String idPoste;

    @Column(name = "id_employe", length = 255)
    private String idEmploye;

    @Column(name = "date_debut")
    private Date dateDebut;

    @Column(name = "date_fin")
    private Date dateFin;

    // Constructeur par défaut
    public HistoriquePoste() {}

    // Constructeur avec paramètres
    public HistoriquePoste(Long id, String idPoste, String idEmploye, Date dateDebut, Date dateFin) {
        this.id = id;
        this.idPoste = idPoste;
        this.idEmploye = idEmploye;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
    }

    // Getters et setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdPoste() {
        return idPoste;
    }

    public void setIdPoste(String idPoste) {
        this.idPoste = idPoste;
    }

    public String getIdEmploye() {
        return idEmploye;
    }

    public void setIdEmploye(String idEmploye) {
        this.idEmploye = idEmploye;
    }

    public Date getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(Date dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Date getDateFin() {
        return dateFin;
    }

    public void setDateFin(Date dateFin) {
        this.dateFin = dateFin;
    }

    @Override
    public String toString() {
        return "HistoriquePoste{" +
                "id=" + id +
                ", idPoste='" + idPoste + '\'' +
                ", idEmploye='" + idEmploye + '\'' +
                ", dateDebut=" + dateDebut +
                ", dateFin=" + dateFin +
                '}';
    }
}
