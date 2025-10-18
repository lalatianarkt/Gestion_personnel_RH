package com.rh.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import java.sql.Date;

@Entity
@Table(name = "contrat")
public class Contrat {

    @Id
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "date_debut", nullable = false)
    private Date dateDebut;

    @Column(name = "date_fin")
    private Date dateFin;

    @Column(name = "duree")
    private Integer duree;

    // Clés étrangères
    @ManyToOne
    @JoinColumn(name = "id_poste", referencedColumnName = "id")
    private Poste idPoste;

    @ManyToOne
    @JoinColumn(name = "id_contrat", referencedColumnName = "id")
    private TypeContrat idTypeContrat;

    @ManyToOne
    @JoinColumn(name = "id_employe", referencedColumnName = "id")
    private Employe idEmploye;

    // Constructeur par défaut
    public Contrat() {}

    // Constructeur avec paramètres
    public Contrat(String id, Date dateDebut, Date dateFin, Integer duree,
                   Poste idPoste, TypeContrat idTypeContrat, Employe idEmploye) {
        this.id = id;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.duree = duree;
        this.idPoste = idPoste;
        this.idTypeContrat = idTypeContrat;
        this.idEmploye = idEmploye;
    }

    // Getters et setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public Integer getDuree() {
        return duree;
    }

    public void setDuree(Integer duree) {
        this.duree = duree;
    }

    public Poste getIdPoste() {
        return idPoste;
    }

    public void setIdPoste(Poste idPoste) {
        this.idPoste = idPoste;
    }

    public TypeContrat getIdTypeContrat() {
        return idTypeContrat;
    }

    public void setIdTypeContrat(TypeContrat idTypeContrat) {
        this.idTypeContrat = idTypeContrat;
    }

    public Employe getIdEmploye() {
        return idEmploye;
    }

    public void setIdEmploye(Employe idEmploye) {
        this.idEmploye = idEmploye;
    }

    @Override
    public String toString() {
        return "Contrat{" +
                "id='" + id + '\'' +
                ", dateDebut=" + dateDebut +
                ", dateFin=" + dateFin +
                ", duree=" + duree +
                ", idPoste=" + idPoste +
                ", idTypeContrat=" + idTypeContrat +
                ", idEmploye=" + idEmploye +
                '}';
    }
}
