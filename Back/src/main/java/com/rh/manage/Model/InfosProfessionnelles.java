package com.rh.manage.Model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

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

    // 🔹 Constructeur par défaut
    public InfosProfessionnelles() {
        this.dateEmbauche = LocalDate.now();
        this.id = generateCustomId(dateEmbauche);
        this.matricule = generateMatricule(this.id, this.dateEmbauche);
    }

    // 🔹 Constructeur avec paramètres
    public InfosProfessionnelles(LocalDate dateEmbauche) {
        this.dateEmbauche = dateEmbauche;
        this.id = generateCustomId(dateEmbauche);
        this.matricule = generateMatricule(this.id, dateEmbauche);
    }

    // === Génération personnalisée ===

    // ✅ ID du type : PROF-20250315-abc123
    private String generateCustomId(LocalDate dateEmbauche) {
        String datePart = (dateEmbauche != null)
                ? dateEmbauche.format(DateTimeFormatter.BASIC_ISO_DATE)
                : LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE);
        String shortUuid = UUID.randomUUID().toString().substring(0, 6);
        return "PROF-" + datePart + "-" + shortUuid;
    }

    // ✅ Matricule du type : MAT-20250315-abc123
    private String generateMatricule(String id, LocalDate dateEmbauche) {
        if (dateEmbauche == null) dateEmbauche = LocalDate.now();
        String datePart = dateEmbauche.format(DateTimeFormatter.BASIC_ISO_DATE);
        String suffix = (id != null && id.length() >= 6)
                ? id.substring(id.length() - 6)
                : UUID.randomUUID().toString().substring(0, 6);
        return "MAT-" + datePart + "-" + suffix;
    }

    // === Getters / Setters ===

    public String getId() { return id; }

    public void setId(String id) {
        this.id = id;
        if (this.dateEmbauche != null) {
            this.matricule = generateMatricule(id, this.dateEmbauche);
        }
    }

    public String getMatricule() { return matricule; }

    public void setMatricule(String matricule) { this.matricule = matricule; }

    public LocalDate getDateEmbauche() { return dateEmbauche; }

    public void setDateEmbauche(LocalDate dateEmbauche) {
        this.dateEmbauche = dateEmbauche;
        this.id = generateCustomId(dateEmbauche);
        this.matricule = generateMatricule(this.id, dateEmbauche);
    }

    @Override
    public String toString() {
        return "InfosProfessionnelles{" +
                "id='" + id + '\'' +
                ", matricule='" + matricule + '\'' +
                ", dateEmbauche=" + dateEmbauche +
                '}';
    }
}
