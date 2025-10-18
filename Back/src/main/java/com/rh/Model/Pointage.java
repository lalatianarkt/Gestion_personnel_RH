package com.rh.Model;

import java.sql.Date;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class Pointage {
//     CREATE TABLE Pointage(
//    id VARCHAR(50) ,
//    heure_arrivee TIME NOT NULL,
//    heure_depart TIME NOT NULL,
//    heure_journaliere TIME,
//    date_du_jour DATE NOT NULL,
//    id_1 VARCHAR(50)  NOT NULL,
//    PRIMARY KEY(id),
//    FOREIGN KEY(id_1) REFERENCES Employe(id)
// );
    @Id
    @Column(name = "id", length = 50)
    private String id;

    @ManyToOne
    @JoinColumn(name = "id_employe", referencedColumnName = "id")
    private Employe employe;
    

    LocalDateTime heureArrivee;
    LocalDateTime heureDepart; 
    String heure_journaliere; 
    Date date_du_jour;
    // Employe employe; 

}
