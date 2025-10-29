import React from "react";
import { Routes, Route } from "react-router-dom";
import HeaderRH from "../RH/Employe/Header/HeaderRH";
import Employees from "../RH/Employe/FicheEmploye/Employees";
import EmployeeInfo from "../RH/Employe/FicheEmploye/EmployeeInfo";
import EmployeeDocuments from "../RH/Employe/FicheEmploye/EmployeeDocuments";
import AddEmployee from "../RH/Employe/FicheEmploye/AddEmployee";
import ArchivedEmployees from "../RH/Employe/FicheEmploye/ArchivedEmployees";
// import AssignEmployee from "../RH/Employe/Organisation_Hierarchie/AssignEmployee";
import AssignEmployee from "../RH/Employe/Organisation_Hierarchie/AssingEmployee";
import DepartmentsManagers from "../RH/Employe/Organisation_Hierarchie/DepartmentsManagers";
import OrgChart from "../RH/Employe/Organisation_Hierarchie/OrgChart";
import CalendrierPresence from "../RH/Employe/Presence/Calendrier_presence";
import PointageManuel from "../RH/Employe/Presence/Pointage";
import StatistiquesMensuellesPresence from "../RH/Employe/Presence/StatistiquesMensuellesPresence";
import HeuresTravaillees from "../RH/Employe/Presence/HeuresTravaillees";
import HistoriquePointage from "../RH/Employe/Presence/HistoriquePointage";
import GestionRetards from "../RH/Employe/Presence/GestionRetards";
import StatistiquesPresence from "../RH/Employe/Presence/StatistiquesPresence";
import ConfigurationPresence from "../RH/Employe/Presence/ConfigurationPresence";
import Competences from "../RH/Employe/Competences_formations/Competences";
import PlanningFormations from "../RH/Employe/Competences_formations/PlanningFormations";
import SyntheseCarriere from "../RH/Employe/Mouvements/SyntheseCarriere";
import HistoriqueMouvements from "../RH/Employe/Mouvements/HistoriqueMouvements";
import InventaireMouvements from "../RH/Employe/Mouvements/InventaireMouvements";
import ArchivesMouvements from "../RH/Employe/Mouvements/ArchivesMouvements";
import Inscription from "../inscription_user/Inscription";
import AddManager from "../RH/Employe/Organisation_Hierarchie/AddManager";

const RouterRH = () => {
    return (
        <Routes>
            <Route path="" element={<HeaderRH />}>
                <Route path="employees" element={<Employees />} />
                <Route path="employees/:id/personnel" element={< EmployeeInfo />} />
                <Route path="employees/:id/documents" element={<EmployeeDocuments />} />
                <Route path="employees/add" element={<AddEmployee />} />
                <Route path="employees/archives" element={<ArchivedEmployees />} />
                {/* <Route path="employees/inscription" element={<Inscription />} /> */}
                <Route path="organisation/assignEmp" element={<AssignEmployee />} />
                <Route path="organisation/addManager" element={<AddManager />}/>
                <Route path="organisation/department" element={<DepartmentsManagers />} />
                <Route path="organisation/hierarchie" element={<OrgChart />} />
                <Route path="presence/calendrier" element={<CalendrierPresence />} />
                <Route path="presence/pointage" element={<PointageManuel />} />
                <Route path="presence/statMensuel" element={<StatistiquesMensuellesPresence />} />
                <Route path="presence/calendrier_presence_v1" element={<CalendrierPresence />} />
                <Route path="presence/heure_travaillee" element={<HeuresTravaillees />} />
                <Route path="presence/historiquePointage" element={<HistoriquePointage />} />
                <Route path="presence/retard" element={<GestionRetards/>} />
                <Route path="presence/stat" element={<StatistiquesPresence />} />
                <Route path="presence/conf" element={<ConfigurationPresence />} />
                <Route path="competence/comp" element={<Competences />} />
                <Route path="competence/planningFormations" element={<PlanningFormations />} />
                <Route path="mouvement/synthese" element={<SyntheseCarriere />} />
                <Route path="mouvement/historique" element={<HistoriqueMouvements />} />
                <Route path="mouvement/inventaire" element={<InventaireMouvements />} />
                <Route path="mouvement/archive" element={<ArchivesMouvements />} />
                
            </Route>
        </Routes>
    );
}

export default RouterRH;
