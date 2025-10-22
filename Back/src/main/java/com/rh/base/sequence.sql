-- ========================================
-- 1️⃣ SEQUENCES
-- ========================================

CREATE SEQUENCE seq_emergency_contact START 1;
CREATE SEQUENCE seq_infos_professionnelles START 1;
CREATE SEQUENCE seq_infos_administratives START 1;
CREATE SEQUENCE seq_employe START 1;
CREATE SEQUENCE seq_users START 1;
CREATE SEQUENCE seq_token START 1;

-- type_user a déjà SERIAL, donc pas besoin de séquence externe