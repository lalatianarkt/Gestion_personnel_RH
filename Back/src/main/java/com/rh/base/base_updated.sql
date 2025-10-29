CREATE TABLE emergency_contact(
   id VARCHAR(50) ,
   contact VARCHAR(50) ,
   email VARCHAR(50) ,
   adresse VARCHAR(50) ,
   created_at TIMESTAMP NOT NULL,
   modified_at TIMESTAMP,
   PRIMARY KEY(id)
);

CREATE TABLE infos_Professionnelles(
   id VARCHAR(50) ,
   matricule VARCHAR(50)  NOT NULL,
   date_embauche DATE NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(matricule)
);

CREATE TABLE infos_Administratives(
   id VARCHAR(50) ,
   num_cnaps VARCHAR(50)  NOT NULL,
   cin VARCHAR(20)  NOT NULL,
   nombre_enfants INTEGER,
   situation_familiale VARCHAR(50) ,
   PRIMARY KEY(id),
   UNIQUE(cin)
);

CREATE TABLE Employe(
   id VARCHAR(50) ,
   nom VARCHAR(100)  NOT NULL,
   prenom VARCHAR(250)  NOT NULL,
   date_naissance DATE NOT NULL,
   telephone VARCHAR(12)  NOT NULL,
   email VARCHAR(100)  NOT NULL,
   adresse VARCHAR(255)  NOT NULL,
   created_at TIMESTAMP NOT NULL,
   modified_at TIMESTAMP,
   nom_mere VARCHAR(255) ,
   nom_pere VARCHAR(255) ,
   id_emergency_contact VARCHAR(50)  NOT NULL,
   id_info_pro VARCHAR(50)  NOT NULL,
   id_info_admin VARCHAR(50)  NOT NULL,
   id_sexe VARCHAR(50)  NOT NULL,
   id_nationalite VARCHAR(50) not NULL,
   FOREIGN KEY(id_sexe) REFERENCES sexe(id),
   PRIMARY KEY(id),
   FOREIGN KEY(id_nationalite) REFERENCES nationalite(id),
   FOREIGN KEY(id_emergency_contact) REFERENCES emergency_contact(id),
   FOREIGN KEY( id_info_pro) REFERENCES infos_Professionnelles(id),
   FOREIGN KEY(id_info_admin) REFERENCES infos_Administratives(id)
);

CREATE TABLE sexe(
   id SERIAL,
   sexe VARCHAR(50)  NOT NULL,
   code VARCHAR(1) ,
   PRIMARY KEY(id)
);

CREATE TABLE type_user(
   id SERIAL,
   type VARCHAR(50)  NOT NULL,
   created_at TIMESTAMP NOT NULL,
   modified_at TIMESTAMP,
   PRIMARY KEY(id)
);

CREATE TABLE Users(
   id VARCHAR(50) ,
   email VARCHAR(150)  NOT NULL,
   password VARCHAR(150)  NOT NULL,
   created_at TIMESTAMP NOT NULL,
   modified_at TIMESTAMP,
   id_type_user INTEGER NOT NULL,
   id_employe VARCHAR(50)  NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(email),
   FOREIGN KEY(id_type_user) REFERENCES type_user(id), --type ohatra hoe admin, ...
   FOREIGN KEY(id_employe) REFERENCES Employe(id)
);

ALTER TABLE Users
ADD COLUMN statut INTEGER DEFAULT 0;

CREATE TABLE type_user(
   id SERIAL,
   type VARCHAR(50)  NOT NULL,
   created_at TIMESTAMP NOT NULL,
   modified_at TIMESTAMP,
   PRIMARY KEY(id)
);

CREATE TABLE Token(
   id SERIAL,
   token_genere VARCHAR(255)  NOT NULL,
   type VARCHAR(150) ,
   created_at TIMESTAMP NOT NULL,
   expires_at TIMESTAMP,
   is_active INTEGER,
   id_user VARCHAR(50)  NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_user) REFERENCES Users(id)
);

CREATE TABLE Type_document(
   id VARCHAR(50) ,
   intitule VARCHAR(50)  NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE Document_employe(
   id VARCHAR(50) ,
   nom_fichier VARCHAR(100)  NOT NULL,
   chemin_fichier VARCHAR(150)  NOT NULL,
   date_upload TIMESTAMP NOT NULL,
   date_modified TIMESTAMP,
   id_type_document VARCHAR(50) ,
   id_employe VARCHAR(50)  NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_type_document) REFERENCES Type_document(id),
   FOREIGN KEY(id_employe) REFERENCES Employe(id)
);  

CREATE TABLE Poste(
   id VARCHAR(50) ,
   nom VARCHAR(100)  NOT NULL,
   description VARCHAR(255) ,
   created_at TIMESTAMP,
   modified_at TIMESTAMP,
   PRIMARY KEY(id)
);

CREATE TABLE Poste_employe(
   id VARCHAR(50) ,
   date_debut DATE NOT NULL,
   date_fin DATE,
   id_poste VARCHAR(50)  NOT NULL,
   id_employe VARCHAR(50)  NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_poste) REFERENCES Poste(id),
   FOREIGN KEY(id_employe) REFERENCES Employe(id)
);

CREATE TABLE Type_contrat(
   id VARCHAR(50) ,
   intitule VARCHAR(50)  NOT NULL,
   description VARCHAR(255) ,
   PRIMARY KEY(id)
);

CREATE TABLE Contrat(
   id VARCHAR(50) ,
   date_debut DATE NOT NULL,
   date_fin DATE,
   duree INTEGER,
   id_poste VARCHAR(50)  NOT NULL,
   id_type_contrat VARCHAR(50)  NOT NULL,
   id_employe VARCHAR(50)  NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_poste) REFERENCES Poste(id),
   FOREIGN KEY(id_type_contrat) REFERENCES Type_contrat(id),
   FOREIGN KEY(id_employe) REFERENCES Employe(id)
);

CREATE TABLE situation_familiale(
   id SERIAL,
   type VARCHAR(50)  NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE Type_departement(
   id VARCHAR(50) ,
   intitule VARCHAR(150)  NOT NULL,
   created_at DATE NOT NULL,
   modified_at DATE,
   PRIMARY KEY(id)
);

CREATE TABLE Departement(
   id VARCHAR(50) ,
   nom VARCHAR(50)  NOT NULL,
   description VARCHAR(100) ,
   created_at TIMESTAMP NOT NULL,
   modified_at TIMESTAMP,
   nb_employe INTEGER NOT NULL,
   id_type_departement VARCHAR(50)  NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_type_departement) REFERENCES Type_departement(id)
); 

CREATE TABLE departement_employe(
   id VARCHAR(50) ,
   created_at TIMESTAMP NOT NULL,
   modified_at TIMESTAMP,
   id_employe VARCHAR(50)  NOT NULL,
   id_departement VARCHAR(50)  NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_employe) REFERENCES Employe(id),
   FOREIGN KEY(id_departement) REFERENCES Departement(id)
);

CREATE TABLE nationalite(
   id SERIAL,
   nationalite VARCHAR(150)  NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE Manager(
   id VARCHAR(50) ,
   description VARCHAR(250) ,
   id_departement VARCHAR(50)  NOT NULL,
   id_employe VARCHAR(50)  NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_departement) REFERENCES Departement(id),
   FOREIGN KEY(id_employe) REFERENCES Employe(id)
);

CREATE TABLE manager_employe(
   id SERIAL,
   date_fin DATE,
   date_debut DATE,
   id_manager VARCHAR(50)  NOT NULL,
   id_employe VARCHAR(50)  NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_manager) REFERENCES Manager(id),
   FOREIGN KEY(id_employe) REFERENCES Employe(id)
);
