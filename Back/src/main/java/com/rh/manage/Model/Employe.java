package com.rh.manage.Model;

import jakarta.persistence.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

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

    @Column(name = "date_naissance", nullable = false)
    private LocalDate dateNaissance;

    @Column(name = "lieu_naissance", nullable = false)
    private String lieuNaissance;

    @Column(name = "matricule", length = 50, nullable = false, unique = true)
    private String matricule;

    @Column(name = "telephone", length = 12, nullable = false)
    private String telephone;

    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @Column(name = "adresse", length = 255, nullable = false)
    private String adresse;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "modified_at")
    private LocalDateTime modifiedAt;

    @Column(name = "nom_mere", length = 255)
    private String nomMere;

    @Column(name = "nom_pere", length = 255)
    private String nomPere;

    // === Relations ===
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_emergency_contact", referencedColumnName = "id", nullable = false)
    private EmergencyContact emergencyContact;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_info_admin", referencedColumnName = "id", nullable = false)
    private InfosAdministratives infosAdministratives;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_sexe", referencedColumnName = "id", nullable = false)
    private Sexe sexe;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_nationalite", referencedColumnName = "id", nullable = false)
    private Nationalite nationalite;

    // === Constructeurs ===
    public Employe() {
        // Ne rien générer ici pour éviter les conflits avec JPA
    }

    public Employe(String nom, String prenom, LocalDate dateNaissance, String telephone,
                    String email, String adresse, String nomMere, String nomPere, 
                    Nationalite nationalite, 
                    Sexe sexe, 
                    InfosAdministratives infosAdministratives, 
                    String matricule,
                    EmergencyContact emergencyContact) {
        this.nom = nom;
        this.prenom = prenom;
        this.dateNaissance = dateNaissance;
        this.telephone = telephone;
        this.email = email;
        this.adresse = adresse;
        this.nomMere = nomMere;
        this.nomPere = nomPere;
        this.nationalite = nationalite;
        this.sexe = sexe;
        this.infosAdministratives = infosAdministratives;
        this.matricule = matricule;
        this.emergencyContact = emergencyContact;
    }

    // === Méthode PrePersist pour initialiser ID, matricule et createdAt ===
    @PrePersist
    public void prePersist() {
        if (this.id == null) {
            this.id = generateCustomId(LocalDate.now());
        }
        if (this.matricule == null) {
            this.matricule = generateMatricule();
        }
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    // ✅ Génération d'un ID du type EMP-20251029-ABC123
    private String generateCustomId(LocalDate date) {
        String datePart = date != null
                ? date.format(DateTimeFormatter.ofPattern("yyyyMMdd"))
                : LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String randomPart = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        return "EMP-" + datePart + "-" + randomPart;
    }

    // ✅ Génération d'un matricule du type : MAT-2025-0001
    private String generateMatricule() {
        String annee = String.valueOf(Year.now().getValue());
        
        // Générer un numéro séquentiel (dans un cas réel, vous devriez récupérer le dernier numéro de la base)
        String sequence = generateSequenceNumber();
        
        return "MAT-" + annee + "-" + sequence;
    }

    // ✅ Génération du numéro séquentiel (à adapter selon votre logique métier)
    private String generateSequenceNumber() {
        // Pour une implémentation simple, on utilise un UUID court
        // Dans une application réelle, vous devriez récupérer le dernier numéro de la base de données
        String shortUuid = UUID.randomUUID().toString().substring(0, 4).toUpperCase();
        
        // Alternative : utiliser un timestamp pour avoir un numéro plus court
        // String timestampPart = String.valueOf(System.currentTimeMillis()).substring(7, 11);
        
        return shortUuid;
        
        // Alternative avec un vrai séquentiel (nécessite un service dédié) :
        // return String.format("%04d", getNextSequenceNumber());
    }

    /*
    // Méthode pour récupérer le prochain numéro séquentiel depuis la base
    private synchronized Long getNextSequenceNumber() {
        // Implémentation avec un service ou repository pour gérer les séquences
        // Example: return sequenceService.getNextValue("employee_sequence");
        return 1L; // À implémenter selon votre architecture
    }
    */

    // === Getters / Setters ===
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public LocalDate getDateNaissance() { return dateNaissance; }
    public void setDateNaissance(LocalDate dateNaissance) { this.dateNaissance = dateNaissance; }

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

    public InfosAdministratives getInfosAdministratives() { return infosAdministratives; }
    public void setInfosAdministratives(InfosAdministratives infosAdministratives) { this.infosAdministratives = infosAdministratives; }

    public Sexe getSexe() { return sexe; }
    public void setSexe(Sexe sexe) { this.sexe = sexe; }

    public Nationalite getNationalite() { return nationalite; }
    public void setNationalite(Nationalite nationalite) { this.nationalite = nationalite; }

    public String getLieuNaissance() {
        return lieuNaissance;
    }

    public void setLieuNaissance(String lieuNaissance) {
        this.lieuNaissance = lieuNaissance;
    }

    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    @Override
    public String toString() {
        return "Employe{" +
                "id='" + id + '\'' +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", matricule='" + matricule + '\'' +
                ", dateNaissance=" + dateNaissance +
                ", email='" + email + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}