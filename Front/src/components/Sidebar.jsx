// import React from "react";
// import { Link } from "react-router-dom"; // facultatif si tu veux de la navigation interne

// export default function Sidebar() {
//   return (
//     <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
//       {/* // <aside className="main-sidebar sidebar-dark-primary elevation-4 bg-body-secondary"> */}

//       {/* Sidebar Brand */}
//       <div className="sidebar-brand">
//         <Link to="/" className="brand-link logo-switch">
//           <img
//             src="/assets/img/AdminLTELogo.png"
//             alt="AdminLTE Small Logo"
//             className="brand-image-xl logo-xs opacity-75 shadow"
//           />
//           <img
//             src="/assets/img/AdminLTEFullLogo.png"
//             alt="AdminLTE Large Logo"
//             className="brand-image-xs logo-xl opacity-75"
//           />
//         </Link>
//       </div>

//       {/* Sidebar Wrapper */}
//       <div className="sidebar-wrapper">
//         <nav className="mt-2">
//           <ul
//             className="nav sidebar-menu flex-column"
//             data-lte-toggle="treeview"
//             role="menu"
//             data-accordion="false"
//           >
//             {/* Header */}
//             <li className="nav-header">Navigation principale</li>

//             {/* Dashboard */}
//             <li className="nav-item menu-open">
//               <a href="#" className="nav-link active">
//                 <i className="nav-icon bi bi-speedometer"></i>
//                 <p>
//                   Tableau de bord
//                   <i className="nav-arrow bi bi-chevron-right"></i>
//                 </p>
//               </a>
//               <ul className="nav nav-treeview">
//                 <li className="nav-item">
//                   <a href="/dashboard/v1" className="nav-link active">
//                     <i className="nav-icon bi bi-circle"></i>
//                     <p>Dashboard v1</p>
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a href="/dashboard/v2" className="nav-link">
//                     <i className="nav-icon bi bi-circle"></i>
//                     <p>Dashboard v2</p>
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a href="/dashboard/v3" className="nav-link">
//                     <i className="nav-icon bi bi-circle"></i>
//                     <p>Dashboard v3</p>
//                   </a>
//                 </li>
//               </ul>
//             </li>

//             {/* Theme Generator */}
//             <li className="nav-item">
//               <a href="/generate/theme" className="nav-link">
//                 <i className="nav-icon bi bi-palette"></i>
//                 <p>Générateur de thème</p>
//               </a>
//             </li>

//             {/* Widgets */}
//             <li className="nav-item">
//               <a href="#" className="nav-link">
//                 <i className="nav-icon bi bi-box-seam-fill"></i>
//                 <p>
//                   Widgets
//                   <i className="nav-arrow bi bi-chevron-right"></i>
//                 </p>
//               </a>
//               <ul className="nav nav-treeview">
//                 <li className="nav-item">
//                   <a href="/widgets/small-box" className="nav-link">
//                     <i className="nav-icon bi bi-circle"></i>
//                     <p>Small Box</p>
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a href="/widgets/info-box" className="nav-link">
//                     <i className="nav-icon bi bi-circle"></i>
//                     <p>Info Box</p>
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a href="/widgets/cards" className="nav-link">
//                     <i className="nav-icon bi bi-circle"></i>
//                     <p>Cards</p>
//                   </a>
//                 </li>
//               </ul>
//             </li>

//             {/* Tu peux ajouter d'autres menus ici */}
//           </ul>
//         </nav>
//       </div>
//     </aside>
//   );
// }


// src/components/Sidebar.jsx
// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSidebar } from "./SidebarContext";

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const [openSections, setOpenSections] = useState({
    dashboard: true,
    widgets: false,
    forms: false,
    tables: false,
    admin: false,
    products: false,
    orders: false,
    customers: false,
    reports: false,
    settings: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <>
      {/* Overlay pour mobile */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}
      
      <aside className={`app-sidebar bg-body-secondary shadow ${isSidebarOpen ? 'sidebar-open' : ''}`} data-bs-theme="dark">
        {/* Brand fixe en haut */}
        <div className="sidebar-brand">
          <Link to="/" className="brand-link logo-switch">
            <img
              src="/assets/img/AdminLTELogo.png"
              alt="AdminLTE Small Logo"
              className="brand-image-xl logo-xs opacity-75 shadow"
            />
            <img
              src="/assets/img/AdminLTEFullLogo.png"
              alt="AdminLTE Large Logo"
              className="brand-image-xs logo-xl opacity-75"
            />
          </Link>
        </div>

        {/* Contenu scrollable */}
        <div className="sidebar-wrapper">
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              
              <li className="nav-header">NAVIGATION PRINCIPALE</li>
              {/* Fiches Employés */}
              <li className={`nav-item ${openSections.dashboard ? 'menu-open' : ''}`}>
                <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); toggleSection('dashboard'); }}>
                  <i className="nav-icon bi bi-speedometer"></i>
                  <p>
                    Employés
                    <i className={`nav-arrow bi ${openSections.dashboard ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
                  </p>
                </a>
                <ul className="nav nav-treeview" style={{ display: openSections.dashboard ? 'block' : 'none' }}>
                  <li className="nav-item">
                    <Link to="/dashboard/v1" className="nav-link">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>Fiches Employés</p>
                    </Link>
                  </li>
                </ul>
              </li>


              {/* Dashboard Section */}
              <li className={`nav-item ${openSections.dashboard ? 'menu-open' : ''}`}>
                <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); toggleSection('dashboard'); }}>
                  <i className="nav-icon bi bi-speedometer"></i>
                  <p>
                    Tableau de bord
                    <i className={`nav-arrow bi ${openSections.dashboard ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
                  </p>
                </a>
                <ul className="nav nav-treeview" style={{ display: openSections.dashboard ? 'block' : 'none' }}>
                  <li className="nav-item">
                    <Link to="/dashboard/v1" className="nav-link">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>Dashboard v1</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard/v2" className="nav-link">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>Dashboard v2</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard/v3" className="nav-link">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>Dashboard v3</p>
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Widgets Section */}
              <li className={`nav-item ${openSections.widgets ? 'menu-open' : ''}`}>
                <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); toggleSection('widgets'); }}>
                  <i className="nav-icon bi bi-box-seam-fill"></i>
                  <p>
                    Widgets
                    <i className={`nav-arrow bi ${openSections.widgets ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
                  </p>
                </a>
                <ul className="nav nav-treeview" style={{ display: openSections.widgets ? 'block' : 'none' }}>
                  <li className="nav-item">
                    <Link to="/widgets/small-box" className="nav-link">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>Small Box</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/widgets/info-box" className="nav-link">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>Info Box</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/widgets/cards" className="nav-link">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>Cards</p>
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Forms Section */}
              <li className={`nav-item ${openSections.forms ? 'menu-open' : ''}`}>
                <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); toggleSection('forms'); }}>
                  <i className="nav-icon bi bi-input-cursor-text"></i>
                  <p>
                    Formulaires
                    <i className={`nav-arrow bi ${openSections.forms ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
                  </p>
                </a>
                <ul className="nav nav-treeview" style={{ display: openSections.forms ? 'block' : 'none' }}>
                  <li className="nav-item">
                    <Link to="/forms/general" className="nav-link">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>Formulaires généraux</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/forms/advanced" className="nav-link">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>Formulaires avancés</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/forms/validation" className="nav-link">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>Validation</p>
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Tables Section */}
              <li className={`nav-item ${openSections.tables ? 'menu-open' : ''}`}>
                <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); toggleSection('tables'); }}>
                  <i className="nav-icon bi bi-table"></i>
                  <p>
                    Tables
                    <i className={`nav-arrow bi ${openSections.tables ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
                  </p>
                </a>
                <ul className="nav nav-treeview" style={{ display: openSections.tables ? 'block' : 'none' }}>
                  <li className="nav-item">
                    <Link to="/tables/simple" className="nav-link">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>Tables simples</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/tables/data" className="nav-link">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>DataTables</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/tables/jsgrid" className="nav-link">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>jsGrid</p>
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Products Section */}
              <li className={`nav-item ${openSections.products ? 'menu-open' : ''}`}>
                <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); toggleSection('products'); }}>
                  <i className="nav-icon bi bi-cart"></i>
                  <p>
                    Produits
                    <i className={`nav-arrow bi ${openSections.products ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
                  </p>
                </a>
                <ul className="nav nav-treeview" style={{ display: openSections.products ? 'block' : 'none' }}>
                  <li className="nav-item">
                    <Link to="/products/list" className="nav-link">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>Liste des produits</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/products/add" className="nav-link">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>Ajouter un produit</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/products/categories" className="nav-link">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>Catégories</p>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-header">ADMINISTRATION</li>

              {/* Administration Section */}
              <li className={`nav-item ${openSections.admin ? 'menu-open' : ''}`}>
                <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); toggleSection('admin'); }}>
                  <i className="nav-icon bi bi-gear"></i>
                  <p>
                    Paramètres
                    <i className={`nav-arrow bi ${openSections.admin ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
                  </p>
                </a>
                <ul className="nav nav-treeview" style={{ display: openSections.admin ? 'block' : 'none' }}>
                  <li className="nav-item">
                    <Link to="/admin/users" className="nav-link">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>Gestion des utilisateurs</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/roles" className="nav-link">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>Rôles et permissions</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/system" className="nav-link">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>Configuration système</p>
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Additional items to ensure scrolling */}
              <li className="nav-item">
                <Link to="/reports" className="nav-link">
                  <i className="nav-icon bi bi-graph-up"></i>
                  <p>Rapports</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/analytics" className="nav-link">
                  <i className="nav-icon bi bi-bar-chart"></i>
                  <p>Analytiques</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/calendar" className="nav-link">
                  <i className="nav-icon bi bi-calendar"></i>
                  <p>Calendrier</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/mailbox" className="nav-link">
                  <i className="nav-icon bi bi-envelope"></i>
                  <p>Boîte mail</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/chat" className="nav-link">
                  <i className="nav-icon bi bi-chat"></i>
                  <p>Chat</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/files" className="nav-link">
                  <i className="nav-icon bi bi-folder"></i>
                  <p>Fichiers</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/gallery" className="nav-link">
                  <i className="nav-icon bi bi-images"></i>
                  <p>Galerie</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/help" className="nav-link">
                  <i className="nav-icon bi bi-question-circle"></i>
                  <p>Aide</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/support" className="nav-link">
                  <i className="nav-icon bi bi-headset"></i>
                  <p>Support</p>
                </Link>
              </li>

            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}