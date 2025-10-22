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
