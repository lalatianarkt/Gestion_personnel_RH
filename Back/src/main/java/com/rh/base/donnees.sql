-- -----------------------------
-- emergency_contact
-- -----------------------------
INSERT INTO emergency_contact (contact, email, adresse, created_at)
VALUES
('Marie RAZAFINDRAKOTO', 'marie.contact@email.com', 'Antananarivo'),
('Jean RAKOTONDRABE', 'jean.contact@email.com', 'Fianarantsoa'),
('Lala RABEMANANJARA', 'lala.contact@email.com', 'Toamasina');

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
('Admin'),
('Manager'),
('Employe');

-- -----------------------------
-- Token
-- -----------------------------
-- On ne mettra pas de token lié à un User pour le moment
-- Exemple de token générique (sera rélié après inscription)
-- INSERT INTO Token (token_genere, type, created_at, is_active, id_user)
-- VALUES
-- ('TOKEN001', 'Test', 1, 'USR001'), -- juste un exemple
-- ('TOKEN002', 'Test', 1, 'USR002');

INSERT INTO Employe (nom, prenom, sexe, date_naissance, telephone, email, adresse,
                     created_at, id_emergency_contact, id_info_pro, id_info_admin)
VALUES
('Rabarijaona', 'Sanda', 'F', '1992-11-30', '0345678901', 'sandakwl25@gmail.com', 'Toamasina',
 NOW(), 'EC003', 'IP005', 'IA004');


INSERT INTO emergency_contact (contact, email, adresse, created_at)
VALUES
('Lala RABEMANANJARA', 'lala.contact@email.com', 'Toamasina');

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
('cv_andry_rakoto.pdf', '/documents/emp001/cv.pdf', 'TYP001', 'EMP001'),
('contrat_andry_rakoto.pdf', '/documents/emp001/contrat.pdf', 'TYP002', 'EMP001'),
('diplome_andry_rakoto.pdf', '/documents/emp001/diplome.pdf', 'TYP003', 'EMP001'),
('photo_andry_rakoto.jpg', '/documents/emp001/photo.jpg', 'TYP007', 'EMP001');

-- Documents pour Hery Ratsimba (EMP002)
INSERT INTO document_employe (nom_fichier, chemin_fichier, date_upload, id_type_document, id_employe) VALUES
('cv_hery_ratsimba.pdf', '/documents/emp002/cv.pdf', 'TYP001', 'EMP002'),
('contrat_hery_ratsimba.pdf', '/documents/emp002/contrat.pdf', 'TYP002', 'EMP002'),
('cin_hery_ratsimba.pdf', '/documents/emp002/cin.pdf', 'TYP008', 'EMP002'),
('bulletin_paie_hery_janv.pdf', '/documents/emp002/bulletin_janv.pdf', 'TYP005', 'EMP002');

-- Documents pour Lalao Rabarijaona (EMP003)
INSERT INTO document_employe (nom_fichier, chemin_fichier, date_upload, id_type_document, id_employe) VALUES
('cv_lalao_rabarijaona.pdf', '/documents/emp003/cv.pdf', 'TYP001', 'EMP003'),
('contrat_lalao_rabarijaona.pdf', '/documents/emp003/contrat.pdf', 'TYP002', 'EMP003'),
('livret_famille_lalao.pdf', '/documents/emp003/livret_famille.pdf', 'TYP009', 'EMP003'),
('certificat_medical_lalao.pdf', '/documents/emp003/certificat_medical.pdf', 'TYP006', 'EMP003');

-- Documents pour Sanda Rabarijaona (EMP006)
INSERT INTO document_employe (nom_fichier, chemin_fichier, date_upload, id_type_document, id_employe) VALUES
('cv_sanda_rabarijaona.pdf', '/documents/emp006/cv.pdf', 'TYP001', 'EMP006'),
('contrat_sanda_rabarijaona.pdf', '/documents/emp006/contrat.pdf', 'TYP002', 'EMP006'),
('diplome_sanda_rabarijaona.pdf', '/documents/emp006/diplome.pdf', 'TYP003', 'EMP006'),
('attestation_travail_sanda.pdf', '/documents/emp006/attestation_travail.pdf', 'TYP004', 'EMP006'),
('secu_sanda.pdf', '/documents/emp006/secu.pdf', 'TYP010', 'EMP006');

-- Documents supplémentaires sans type spécifique (id_type_document NULL)
INSERT INTO document_employe (nom_fichier, chemin_fichier, date_upload, id_employe) VALUES
('autre_document_andry.pdf', '/documents/emp001/autre.pdf', 'EMP001'),
('recommandation_hery.pdf', '/documents/emp002/recommandation.pdf', 'EMP002');


-- Insertion des données pour la table sexe
INSERT INTO sexe (sexe, code) VALUES 
('Masculin', 'M'),
('Féminin', 'F'),
('Non binaire', 'N'),
('Autre', 'A'),
('Non spécifié', 'X');

-- Insertion des postes (sans ID - adaptés au contexte malgache)
INSERT INTO Poste (nom, description, created_at) VALUES
-- Postes Ressources Humaines (regroupés pour contexte malgache)
('Responsable RH Polyvalent', 'Gestion complète RH : recrutement, paie, formation, administration du personnel'),
('Assistant RH Polyvalent', 'Support RH général : recrutement, paie, dossier personnel, formalités administratives'),
('Gestionnaire de Paie et Administration', 'Gestion paie + formalités administratives + déclarations sociales'),
('Chargé de Recrutement et Formation', 'Recrutement + organisation formations + suivi carrières'),

-- Postes Direction et Management
('Directeur Général', 'Direction générale entreprise - PME/PMI malgache'),
('Directeur Administratif et Financier', 'DAF : Gestion admin, finance, RH, juridique - TPE/PME'),
('Responsable d''Agence', 'Management agence : commercial, opérations, équipe'),
('Chef de Service Polyvalent', 'Encadrement équipe + gestion opérationnelle service'),

-- Postes Informatique (adaptés contexte local)
('Informaticien Polyvalent', 'Support technique + développement + maintenance réseau + assistance utilisateurs'),
('Développeur Full-Stack', 'Développement applications web + mobile - Startup/ESN malgache'),
('Technicien Maintenance Informatique', 'Maintenance parc informatique + support technique'),
('Responsable Systèmes et Réseaux', 'Gestion infrastructure IT + téléphonie + sécurité'),

-- Postes Commercial et Marketing
('Commercial Terrain', 'Prospection + vente + relation client + suivi commandes'),
('Responsable Commercial', 'Management équipe commerciale + stratégie vente'),
('Chargé Marketing et Communication', 'Marketing + communication + réseaux sociaux + événementiel'),
('Télévendeur', 'Vente téléphonique + prospection + fidélisation clients'),

-- Postes Comptabilité et Finance
('Comptable Unique', 'Comptabilité générale + analytique + paie + déclarations fiscales'),
('Gestionnaire Financier', 'Trésorerie + comptabilité + relation banque'),
('Assistant Comptable', 'Saisie comptable + facturation + relance clients'),
('Caissier', 'Gestion caisse + encaissement + facturation'),

-- Postes Production et Logistique
('Responsable Production', 'Management production + qualité + planning équipe'),
('Agent de Production Polyvalent', 'Production + contrôle qualité + maintenance préventive'),
('Chauffeur-Livreur', 'Conduite + livraison + gestion stock véhicule'),
('Magasinier', 'Gestion stock + préparation commandes + inventaire'),

-- Postes Services Généraux
('Agent d''Entretien', 'Nettoyage locaux + maintenance légère + courrier'),
('Gardien', 'Surveillance + accueil + sécurité site'),
('Secrétaire Polyvalente', 'Secrétariat + standard + accueil + administration'),
('Cuisinier', 'Préparation repas personnel - Cantine entreprise'),

-- Postes Spécialisés (grandes entreprises)
('Ingénieur en BTP', 'Conception + suivi chantier + management équipe technique'),
('Architecte', 'Conception plans + suivi travaux + relation client'),
('Infirmier d''Entreprise', 'Soins + prévention + santé au travail'),
('Formateur Consultant', 'Animation formations + conseil entreprises'),

-- Postes Secteur Tourisme et Hôtellerie
('Réceptionniste Hôtel', 'Accueil clients + réservations + facturation'),
('Guide Touristiques', 'Accompagnement touristes + animation visites'),
('Responsable Restauration', 'Gestion restaurant + équipe + approvisionnement'),
('Agent de Voyage', 'Conseil voyages + réservations + vente séjours'),

-- Postes Secteur Agricole et Agroalimentaire
('Technicien Agricole', 'Conseil techniques agricoles + suivi cultures'),
('Responsable Exploitation Agricole', 'Management exploitation + commercialisation produits'),
('Contrôleur Qualité Agroalimentaire', 'Contrôle qualité produits + normes sanitaires'),
('Commercial Produits Agricoles', 'Vente produits agricoles + relation clients export'),

-- Postes Secteur Textile et Artisanat
('Ouvrier Textile', 'Confection vêtements + contrôle qualité'),
('Artisan', 'Création produits artisanaux + vente'),
('Responsable Atelier', 'Management atelier production + qualité'),
('Designer Produit', 'Conception produits + développement collections');

-- Insertion des types de contrats courants à Madagascar (sans ID)
-- Types de contrats essentiels (sans ID et sans accents)
INSERT INTO Type_contrat (intitule, description) VALUES
('CDI', 'Contrat a duree indeterminee - Emploi permanent'),
('CDD', 'Contrat a duree determinee - Emploi temporaire'),
('Stage', 'Contrat de stage professionnel'),
('Alternance', 'Contrat en alternance ecole-entreprise'),
('Interim', 'Mission temporaire via agence d''interim'),
('Temps partiel', 'Horaires de travail reduits'),
('Consultant', 'Prestation de service independante'),
('Projet', 'Contrat pour projet specifique'),
('Essai', 'Periode d''essai en debut de contrat'),
('Saisonnier', 'Travail saisonnier ou periodique');

INSERT INTO situation_familiale (type)
VALUES 
('Célibataire'),
('Marié(e)'),
('Divorcé(e)'),
('Veuf(ve)'),
('Union libre'),
('Séparé(e)');

INSERT INTO Type_departement (intitule, created_at, modified_at)
VALUES
('Ressources Humaines', CURRENT_DATE, NULL),
('Commercial et Marketing', CURRENT_DATE, NULL),
('Informatique et SI', CURRENT_DATE, NULL),
('Comptabilite et Finance', CURRENT_DATE, NULL),
('Technique et Logistique', CURRENT_DATE, NULL);

INSERT INTO departement (description, nom, nb_employe, id_departement, created_at, modified_at)
VALUES
('Gere le recrutement, les contrats et la paie du personnel', 'Ressources Humaines', 12, 'TDEP1', NOW(), NULL),
('Supervise les ventes, la publicite et les relations clients', 'Ventes et Marketing', 18, 'TDEP2', NOW(), NULL),
('Developpe et maintient les logiciels et systemes informatiques', 'Developpement Informatique', 25, 'TDEP3', NOW(), NULL),
('S occupe de la comptabilite, des budgets et des audits', 'Comptabilite Generale', 10, 'TDEP4', NOW(), NULL),
('Assure la maintenance des equipements et la logistique interne', 'Maintenance et Logistique', 8, 'TDEP5', NOW(), NULL);

INSERT INTO nationalite (nationalite) VALUES
('Malagasy'),
('Sud Africaine'),
('Algerienne'),
('Anglaise'),
('Americaine'),
('Allemande'),
('Argentine'),
('Australienne'),
('Autrichienne'),
('Belge'),
('Beninoise'),
('Bresilienne'),
('Britannique'),
('Burkinabe'),
('Burundaise'),
('Cambodgienne'),
('Canadienne'),
('Chilienne'),
('Chinoise'),
('Colombienne'),
('Comorienne'),
('Congolaise'),
('Coreenne'),
('Croate'),
('Danoise'),
('Djiboutienne'),
('Egyptienne'),
('Espagnole'),
('Estonienne'),
('Ethiopienne'),
('Finlandaise'),
('Francaise'),
('Gabonaise'),
('Ghanenne'),
('Grecque'),
('Guineenne'),
('Haïtienne'),
('Hongroise'),
('Indienne'),
('Indonesienne'),
('Irlandaise'),
('Israélienne'),
('Italienne'),
('Ivoirienne'),
('Jamaicaine'),
('Japonaise'),
('Kenyane'),
('Libanaise'),
('Malaisienne'),
('Malienne'),
('Marocaine'),
('Mauricienne'),
('Mexicaine'),
('Mozambicaine'),
('Nepalaise'),
('Nigerienne'),
('Norvegienne'),
('Pakistanaise'),
('Peruvienne'),
('Philippine'),
('Polonaise'),
('Portugaise'),
('Roumaine'),
('Russe'),
('Rwandaise'),
('Senegalaise'),
('Suedeoise'),
('Suisse'),
('Tanzanienne'),
('Togolaise'),
('Tunisienne'),
('Turque'),
('Ukrainienne'),
('Vietnamienne'),
('Zambienne'),
('Zimbabweenne');



-- ///////////////////////
select * from users;
                    id                    |        email         |                           password                           |         created_at         | modified_at | id_type_user | id_employe | statut
------------------------------------------+----------------------+--------------------------------------------------------------+----------------------------+-------------+--------------+------------+--------
 USR-77e8b326-c520-4de3-a18b-9d9bedf02997 | sandakwl25@gmail.com | $2a$10$ybx7rjm9z.8j9qwyzq1osea8bSyd9o95hC3nP2ryu/Yn6PXoVZK1y | 2025-10-21 12:27:11.856358 |             |            1 | EMP006     |      0
(1 ligne)