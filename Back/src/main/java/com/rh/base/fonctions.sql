-- -----------------------------
-- Employe
-- -----------------------------
CREATE OR REPLACE FUNCTION generate_employe_id()
RETURNS TRIGGER AS $$
DECLARE
    seq_value INT;
BEGIN
    seq_value := nextval('seq_employe');
    NEW.id := 'EMP' || LPAD(seq_value::TEXT, 3, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS before_insert_employe ON Employe;
CREATE TRIGGER before_insert_employe
BEFORE INSERT ON Employe
FOR EACH ROW
WHEN (NEW.id IS NULL)
EXECUTE PROCEDURE generate_employe_id();

-- -----------------------------
-- InfosAdministratives
-- -----------------------------
CREATE OR REPLACE FUNCTION generate_infos_admin_id()
RETURNS TRIGGER AS $$
DECLARE
    seq_value INT;
BEGIN
    seq_value := nextval('seq_infos_administratives');
    NEW.id := 'IA' || LPAD(seq_value::TEXT, 3, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS before_insert_infos_admin ON infos_Administratives;
CREATE TRIGGER before_insert_infos_admin
BEFORE INSERT ON infos_Administratives
FOR EACH ROW
WHEN (NEW.id IS NULL)
EXECUTE PROCEDURE generate_infos_admin_id();

-- -----------------------------
-- InfosProfessionnelles
-- -----------------------------
CREATE OR REPLACE FUNCTION generate_infos_pro_id()
RETURNS TRIGGER AS $$
DECLARE
    seq_value INT;
BEGIN
    seq_value := nextval('seq_infos_professionnelles');
    NEW.id := 'IP' || LPAD(seq_value::TEXT, 3, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS before_insert_infos_pro ON infos_Professionnelles;
CREATE TRIGGER before_insert_infos_pro
BEFORE INSERT ON infos_Professionnelles
FOR EACH ROW
WHEN (NEW.id IS NULL)
EXECUTE PROCEDURE generate_infos_pro_id();

-- -----------------------------
-- EmergencyContact
-- -----------------------------
CREATE OR REPLACE FUNCTION generate_emergency_id()
RETURNS TRIGGER AS $$
DECLARE
    seq_value INT;
BEGIN
    seq_value := nextval('seq_emergency_contact');
    NEW.id := 'EC' || LPAD(seq_value::TEXT, 3, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS before_insert_emergency ON emergency_contact;
CREATE TRIGGER before_insert_emergency
BEFORE INSERT ON emergency_contact
FOR EACH ROW
WHEN (NEW.id IS NULL)
EXECUTE PROCEDURE generate_emergency_id();

-- -----------------------------
-- Users
-- -----------------------------
CREATE OR REPLACE FUNCTION generate_user_id()
RETURNS TRIGGER AS $$
DECLARE
    seq_value INT;
BEGIN
    seq_value := nextval('seq_users');
    NEW.id := 'USR' || LPAD(seq_value::TEXT, 3, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS before_insert_user ON Users;
CREATE TRIGGER before_insert_user
BEFORE INSERT ON Users
FOR EACH ROW
WHEN (NEW.id IS NULL)
EXECUTE PROCEDURE generate_user_id();
