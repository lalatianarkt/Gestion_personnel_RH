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
   sexe VARCHAR(1)  NOT NULL,
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
   PRIMARY KEY(id),
   FOREIGN KEY(id_emergency_contact) REFERENCES emergency_contact(id),
   FOREIGN KEY( id_info_pro) REFERENCES infos_Professionnelles(id),
   FOREIGN KEY(id_info_admin) REFERENCES infos_Administratives(id)
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

