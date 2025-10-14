import React from "react";
import { Routes, Route } from "react-router-dom";
import HeaderRH from "../RH/Employe/Header/HeaderRH";
import Employees from "../RH/Employe/FicheEmploye/Employees";
import EmployeeInfo from "../RH/Employe/FicheEmploye/EmployeeInfo";
import EmployeeDocuments from "../RH/Employe/FicheEmploye/EmployeeDocuments";
import AddEmployee from "../RH/Employe/FicheEmploye/AddEmployee";
import ArchivedEmployees from "../RH/Employe/FicheEmploye/ArchivedEmployees";
import AssignEmployee from "../RH/Employe/Organisation_Hierarchie/AssignEmployee";
import DepartmentsManagers from "../RH/Employe/Organisation_Hierarchie/DepartmentsManagers";
import OrgChart from "../RH/Employe/Organisation_Hierarchie/OrgChart";
import CalendrierPresence from "../RH/Employe/Presence/Calendrier_presence";
import PointageManuel from "../RH/Employe/Presence/Pointage";

const RouterRH = () => {
    return (
        <Routes>
            <Route path="" element={<HeaderRH />}>
                <Route path="employees" element={<Employees />} />
                <Route path="employees/:id/personnel" element={< EmployeeInfo />} />
                <Route path="employees/:id/documents" element={<EmployeeDocuments />} />
                <Route path="employees/add" element={<AddEmployee />} />
                <Route path="employees/archives" element={<ArchivedEmployees />} />
                <Route path="organisation/assignEmp" element={<AssignEmployee />} />
                <Route path="organisation/department" element={<DepartmentsManagers />} />
                <Route path="organisation/hierarchie" element={<OrgChart />} />
                <Route path="presence/calendrier" element={<CalendrierPresence />} />
                <Route path="presence/pointage" element={<PointageManuel />} />
            </Route>
        </Routes>
    );
}

export default RouterRH;
