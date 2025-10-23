-- -----------------------------
-- emergency_contact
-- -----------------------------
INSERT INTO emergency_contact (contact, email, adresse, created_at)
VALUES
('Marie RAZAFINDRAKOTO', 'marie.contact@email.com', 'Antananarivo', NOW()),
('Jean RAKOTONDRABE', 'jean.contact@email.com', 'Fianarantsoa', NOW()),
('Lala RABEMANANJARA', 'lala.contact@email.com', 'Toamasina', NOW());

-- -----------------------------
-- infos_Professionnelles
-- -----------------------------
INSERT INTO infos_Professionnelles (matricule, date_embauche)
VALUES
('MAT001', '2020-01-15'),
('MAT002', '2019-06-20'),
('MAT003', '2021-03-05');

-- -----------------------------
-- infos_Administratives
-- -----------------------------
INSERT INTO infos_Administratives (num_cnaps, cin, nombre_enfants, situation_familiale)
VALUES
('CNAPS001', 'CIN123456', 2, 'Marié(e)'),
('CNAPS002', 'CIN234567', 0, 'Célibataire'),
('CNAPS003', 'CIN345678', 1, 'Marié(e)');

-- -----------------------------
-- Employe
-- -----------------------------
-- On suppose que les IDs des autres tables sont déjà générés via triggers
-- et que le premier emergency_contact, infos_pro, infos_admin ont été insérés.
INSERT INTO Employe (nom, prenom, sexe, date_naissance, telephone, email, adresse,
                     created_at, id_emergency_contact, id_info_pro, id_info_admin)
VALUES
('Rakoto', 'Andry', 'M', '1990-05-12', '0341234567', 'andry.rakoto@email.com', 'Antananarivo',
 NOW(), 'EC001', 'IP001', 'IA001'),
('Ratsimba', 'Hery', 'M', '1985-08-22', '0349876543', 'hery.ratsimba@email.com', 'Fianarantsoa',
 NOW(), 'EC002', 'IP002', 'IA002'),
('Rabarijaona', 'Lalao', 'F', '1992-11-30', '0345678901', 'lalao.rabarijaona@email.com', 'Toamasina',
 NOW(), 'EC003', 'IP003', 'IA003');



-- -----------------------------
-- type_user
-- -----------------------------
INSERT INTO type_user (type, created_at)
VALUES
('Admin', NOW()),
('Manager', NOW()),
('Employe', NOW());

-- -----------------------------
-- Token
-- -----------------------------
-- On ne mettra pas de token lié à un User pour le moment
-- Exemple de token générique (sera rélié après inscription)
-- INSERT INTO Token (token_genere, type, created_at, is_active, id_user)
-- VALUES
-- ('TOKEN001', 'Test', NOW(), 1, 'USR001'), -- juste un exemple
-- ('TOKEN002', 'Test', NOW(), 1, 'USR002');

INSERT INTO Employe (nom, prenom, sexe, date_naissance, telephone, email, adresse,
                     created_at, id_emergency_contact, id_info_pro, id_info_admin)
VALUES
('Rabarijaona', 'Sanda', 'F', '1992-11-30', '0345678901', 'sandakwl25@gmail.com', 'Toamasina',
 NOW(), 'EC003', 'IP005', 'IA004');


INSERT INTO emergency_contact (contact, email, adresse, created_at)
VALUES
('Lala RABEMANANJARA', 'lala.contact@email.com', 'Toamasina', NOW());

-- -----------------------------
-- infos_Professionnelles
-- -----------------------------
INSERT INTO infos_Professionnelles (matricule, date_embauche)
VALUES
('MAT004', '2022-03-05');

-- -----------------------------
-- infos_Administratives
-- -----------------------------
INSERT INTO infos_Administratives (num_cnaps, cin, nombre_enfants, situation_familiale)
VALUES
('CNAPS004', 'CIN345679', 1, 'Marié(e)');

-- -----------------------------
-- Type_document (sans ID)
-- -----------------------------
INSERT INTO type_document (intitule) VALUES
('CV'),
('Contrat'),
('Diplôme'),
('Attestation de travail'),
('Bulletin de paie'),
('Certificat médical'),
('Photo d''identité'),
('Carte d''identité'),
('Livret de famille'),
('Attestation de sécurité sociale');

-- -----------------------------
-- Document_employe (sans ID)
-- -----------------------------
-- Documents pour Andry Rakoto (EMP001)
INSERT INTO document_employe (nom_fichier, chemin_fichier, date_upload, id_type_document, id_employe) VALUES
('cv_andry_rakoto.pdf', '/documents/emp001/cv.pdf', NOW(), 'TYP001', 'EMP001'),
('contrat_andry_rakoto.pdf', '/documents/emp001/contrat.pdf', NOW(), 'TYP002', 'EMP001'),
('diplome_andry_rakoto.pdf', '/documents/emp001/diplome.pdf', NOW(), 'TYP003', 'EMP001'),
('photo_andry_rakoto.jpg', '/documents/emp001/photo.jpg', NOW(), 'TYP007', 'EMP001');

-- Documents pour Hery Ratsimba (EMP002)
INSERT INTO document_employe (nom_fichier, chemin_fichier, date_upload, id_type_document, id_employe) VALUES
('cv_hery_ratsimba.pdf', '/documents/emp002/cv.pdf', NOW(), 'TYP001', 'EMP002'),
('contrat_hery_ratsimba.pdf', '/documents/emp002/contrat.pdf', NOW(), 'TYP002', 'EMP002'),
('cin_hery_ratsimba.pdf', '/documents/emp002/cin.pdf', NOW(), 'TYP008', 'EMP002'),
('bulletin_paie_hery_janv.pdf', '/documents/emp002/bulletin_janv.pdf', NOW(), 'TYP005', 'EMP002');

-- Documents pour Lalao Rabarijaona (EMP003)
INSERT INTO document_employe (nom_fichier, chemin_fichier, date_upload, id_type_document, id_employe) VALUES
('cv_lalao_rabarijaona.pdf', '/documents/emp003/cv.pdf', NOW(), 'TYP001', 'EMP003'),
('contrat_lalao_rabarijaona.pdf', '/documents/emp003/contrat.pdf', NOW(), 'TYP002', 'EMP003'),
('livret_famille_lalao.pdf', '/documents/emp003/livret_famille.pdf', NOW(), 'TYP009', 'EMP003'),
('certificat_medical_lalao.pdf', '/documents/emp003/certificat_medical.pdf', NOW(), 'TYP006', 'EMP003');

-- Documents pour Sanda Rabarijaona (EMP006)
INSERT INTO document_employe (nom_fichier, chemin_fichier, date_upload, id_type_document, id_employe) VALUES
('cv_sanda_rabarijaona.pdf', '/documents/emp006/cv.pdf', NOW(), 'TYP001', 'EMP006'),
('contrat_sanda_rabarijaona.pdf', '/documents/emp006/contrat.pdf', NOW(), 'TYP002', 'EMP006'),
('diplome_sanda_rabarijaona.pdf', '/documents/emp006/diplome.pdf', NOW(), 'TYP003', 'EMP006'),
('attestation_travail_sanda.pdf', '/documents/emp006/attestation_travail.pdf', NOW(), 'TYP004', 'EMP006'),
('secu_sanda.pdf', '/documents/emp006/secu.pdf', NOW(), 'TYP010', 'EMP006');

-- Documents supplémentaires sans type spécifique (id_type_document NULL)
INSERT INTO document_employe (nom_fichier, chemin_fichier, date_upload, id_employe) VALUES
('autre_document_andry.pdf', '/documents/emp001/autre.pdf', NOW(), 'EMP001'),
('recommandation_hery.pdf', '/documents/emp002/recommandation.pdf', NOW(), 'EMP002');


-- Insertion des données pour la table sexe
INSERT INTO sexe (sexe, code) VALUES 
('Masculin', 'M'),
('Féminin', 'F'),
('Non binaire', 'N'),
('Autre', 'A'),
('Non spécifié', 'X');

-- ///////////////////////
select * from users;
                    id                    |        email         |                           password                           |         created_at         | modified_at | id_type_user | id_employe | statut
------------------------------------------+----------------------+--------------------------------------------------------------+----------------------------+-------------+--------------+------------+--------
 USR-77e8b326-c520-4de3-a18b-9d9bedf02997 | sandakwl25@gmail.com | $2a$10$ybx7rjm9z.8j9qwyzq1osea8bSyd9o95hC3nP2ryu/Yn6PXoVZK1y | 2025-10-21 12:27:11.856358 |             |            1 | EMP006     |      0
(1 ligne)