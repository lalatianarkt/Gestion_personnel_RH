package com.rh.manage.Model;

import jakarta.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Table(name = "employe")
public class Employe {

    @Id
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "nom", length = 100, nullable = false)
    private String nom;

    @Column(name = "prenom", length = 250, nullable = false)
    private String prenom;

    @Column(name = "sexe", length = 1, nullable = false)
    private String sexe;

    @Column(name = "date_naissance", nullable = false)
    private Date dateNaissance;

    @Column(name = "telephone", length = 12, nullable = false)
    private String telephone;

    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @Column(name = "adresse", length = 255, nullable = false)
    private String adresse;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "modified_at")
    private LocalDateTime modifiedAt;

    @Column(name = "nom_mere", length = 255)
    private String nomMere;

    @Column(name = "nom_pere", length = 255)
    private String nomPere;

    // 🔗 Relation OneToOne : emergency_contact
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_emergency_contact", referencedColumnName = "id", nullable = false)
    private EmergencyContact emergencyContact;

    // 🔗 Relation OneToOne : infos_professionnelles
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_info_pro", referencedColumnName = "id", nullable = false)
    private InfosProfessionnelles infosProfessionnelles;

    // 🔗 Relation OneToOne : infos_administratives
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_info_admin", referencedColumnName = "id", nullable = false)
    private InfosAdministratives infosAdministratives;

    // 🔨 Constructeurs
    public Employe() {}

    public Employe(String id, String nom, String prenom, String sexe, Date dateNaissance,
                   String telephone, String email, String adresse, LocalDateTime createdAt,
                   EmergencyContact emergencyContact,
                   InfosProfessionnelles infosProfessionnelles,
                   InfosAdministratives infosAdministratives) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.sexe = sexe;
        this.dateNaissance = dateNaissance;
        this.telephone = telephone;
        this.email = email;
        this.adresse = adresse;
        this.createdAt = createdAt;
        this.emergencyContact = emergencyContact;
        this.infosProfessionnelles = infosProfessionnelles;
        this.infosAdministratives = infosAdministratives;
    }

    // 🧱 Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getSexe() { return sexe; }
    public void setSexe(String sexe) { this.sexe = sexe; }

    public Date getDateNaissance() { return dateNaissance; }
    public void setDateNaissance(Date dateNaissance) { this.dateNaissance = dateNaissance; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getModifiedAt() { return modifiedAt; }
    public void setModifiedAt(LocalDateTime modifiedAt) { this.modifiedAt = modifiedAt; }

    public String getNomMere() { return nomMere; }
    public void setNomMere(String nomMere) { this.nomMere = nomMere; }

    public String getNomPere() { return nomPere; }
    public void setNomPere(String nomPere) { this.nomPere = nomPere; }

    public EmergencyContact getEmergencyContact() { return emergencyContact; }
    public void setEmergencyContact(EmergencyContact emergencyContact) { this.emergencyContact = emergencyContact; }

    public InfosProfessionnelles getInfosProfessionnelles() { return infosProfessionnelles; }
    public void setInfosProfessionnelles(InfosProfessionnelles infosProfessionnelles) { this.infosProfessionnelles = infosProfessionnelles; }

    public InfosAdministratives getInfosAdministratives() { return infosAdministratives; }
    public void setInfosAdministratives(InfosAdministratives infosAdministratives) { this.infosAdministratives = infosAdministratives; }

    // 🔁 Méthodes utilitaires
    @Override
    public String toString() {
        return "Employe{" +
                "id='" + id + '\'' +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", sexe='" + sexe + '\'' +
                ", dateNaissance=" + dateNaissance +
                ", telephone='" + telephone + '\'' +
                ", email='" + email + '\'' +
                ", adresse='" + adresse + '\'' +
                ", createdAt=" + createdAt +
                ", modifiedAt=" + modifiedAt +
                ", nomMere='" + nomMere + '\'' +
                ", nomPere='" + nomPere + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Employe)) return false;
        Employe employe = (Employe) o;
        return id != null && id.equals(employe.id);
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    // ⏰ Auto timestamps
    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.modifiedAt = LocalDateTime.now();
    }
}
