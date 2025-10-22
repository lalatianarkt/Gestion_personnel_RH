// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";
// import Greet from "./components/Greet";

// // CSS
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'admin-lte/dist/css/adminlte.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// // JS
// import 'admin-lte/dist/js/adminlte.min.js';

// function App() {
//   return (
//     <div className="wrapper">

//       {/* <Greet name="Bruce" />
//       <Greet name="Alice" />
//       <Greet name="Karl" /> */}
//       {/* Header */}
//       <Header />

//       {/* Sidebar */}
//       <Sidebar />

//       {/* Content Wrapper */}
//       {/* <div className="content-wrapper"> */}
//         {/* Main content */}
//         {/* <div className="content p-3">
//           <h1>Dashboard</h1>
//           <p>Contenu principal ici</p>
//         </div> */}
//       {/* </div> */}

//       {/* Footer (optionnel) */}
//       {/* <footer className="main-footer text-center">
//         <strong>Copyright © 2025 <a href="#">SmartDev</a>.</strong> Tous droits réservés.
//       </footer> */}
//     </div>
//   );
// }

// export default App;

// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ Import du routeur
import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";
import Greet from "./components/Greet";
// import Employees from "./pages/employee/FicheEmploye/Employees";
// import EmployeeInfo from "./pages/employee/FicheEmploye/EmployeeInfo";
// import EmployeeDocuments from "./pages/employee/FicheEmploye/EmployeeDocuments";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "admin-lte/dist/css/adminlte.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// JS
// import "admin-lte/dist/js/adminlte.min.js";

import React, { useState } from "react";
// import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";

// src/App.jsx

import { SidebarProvider, useSidebar } from "./components/SidebarContext";

// import Header from './components/Header';
// import Sidebar from './components/Sidebar';
import './App.css'; // Pour les styles CSS
import LoginPage from "./pages/Authentification/RH/Login";
import RouterRH from "./pages/router/RH";
import Inscription from "./pages/inscription_user/Inscription";

// function App() {
//   return (
//     <SidebarProvider>
//       <div className="wrapper">
//         <Header />
//         <Sidebar />
        
//         {/* Content Wrapper avec gestion du state sidebar */}
//         <ContentWrapper />
        
//         {/* Footer si nécessaire */}
//         <footer className="main-footer">
//           <div className="float-end d-none d-sm-inline">
//             Version 1.0.0
//           </div>
//           <strong>Copyright &copy; 2024 Your Company.</strong> All rights reserved.
//         </footer>
//       </div>
//     </SidebarProvider>
//   );
// }

function MainContent() {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
      <Header />
      <div className="content-wrapper">
        <div className="content">
          <div className="container-fluid">
            {/* REMPLACEZ LE CONTENU STATIQUE PAR LES ROUTES */}
            <Routes>
              <Route path="/" element={
                <>
                  <h1>Bienvenue dans votre application</h1>
                  <p>Contenu principal de l'application</p>
                  <div style={{ height: '2000px', background: 'linear-gradient(180deg, #f8f9fa, #e9ecef)' }}>
                    <p>Contenu défilable pour tester</p>
                  </div>
                </>
              } /> 
              <Route path="/greet" element={<Greet />} />
              <Route path="/" element={<div>Page d'accueil</div>} />
              
              {/* <Route path="/employees" element={<Employees />} />
              <Route path="/employee/:employeeId/info" element={<EmployeeInfo />} />
              <Route path="/employee/:employeeId/documents" element={<EmployeeDocuments />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/employee/:employeeId/info" element={<EmployeeInfo />} />
              <Route path="/employee/:employeeId/documents" element={<EmployeeDocuments />} /> */}
              <Route path="/dashboard/v1" element={<div>Dashboard Version 1</div>} />
              <Route path="/dashboard/v2" element={<div>Dashboard Version 2</div>} />
              <Route path="/dashboard/v3" element={<div>Dashboard Version 3</div>} />
              <Route path="/generate/theme" element={<div>Générateur de thème</div>} />
              <Route path="/widgets/small-box" element={<div>Small Box Widgets</div>} />
              <Route path="/widgets/info-box" element={<div>Info Box Widgets</div>} />
              <Route path="/widgets/cards" element={<div>Cards Widgets</div>} />
              {/* Ajoutez toutes vos autres routes ici */}
            </Routes>
          </div>
        </div>
      </div>
      
      <footer className="main-footer">
        <div className="float-end d-none d-sm-inline">
          Version 1.0.0
        </div>
        <strong>Copyright &copy; 2024 Your Company.</strong> All rights reserved.
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<LoginPage/>} />
        {/* <Route path="/dashboard-RH" element={<RouterRH />} /> */}
        <Route path="/dashboard-RH/*" element={<RouterRH />} />
        <Route path="/inscription" element={<Inscription />} />
        {/* <Route path="/*" element={<RouterRH />} /> */}
      </Routes>
      {/* <SidebarProvider>
         <div className="app-container">
           <MainContent />
         </div>
      </SidebarProvider> */}
      {/* <SidebarProvider>
        <div className="app-container">
          <Sidebar />
          <MainContent />
        </div>
      </SidebarProvider> */}
    </BrowserRouter>
  );
}

export default App;







