// // import React from 'react';
// // import Header from './Header';
// // import Sidebar from './Sidebar';
// // import { Outlet } from 'react-router-dom';
// // import { SidebarProvider, useSidebar } from '../../../../components/SidebarContext';

// // const LayoutContent = () => {
// //   const { isSidebarOpen } = useSidebar();

// //   return (
// //     <div className="min-h-screen flex">
// //       <Sidebar />
// //       {/* Contenu principal avec gestion correcte de l'espace */}
// //       <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'ml-0'}`}>
// //         <Header />
// //         {/* Container pour le contenu avec padding et largeur appropriée */}
// //         <div className="flex-1 p-6 overflow-auto">
// //           <div className="w-full max-w-full"> {/* Conteneur pour limiter la largeur si nécessaire */}
// //             <Outlet />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const HeaderRH = () => {
// //   return (
// //     <SidebarProvider>
// //       <LayoutContent />
// //     </SidebarProvider>
// //   );
// // };

// // export default HeaderRH;

// import React from 'react';
// import Header from './Header';
// import Sidebar from './Sidebar';
// import { Outlet } from 'react-router-dom';
// import { SidebarProvider, useSidebar } from '../../../../components/SidebarContext';

// const LayoutContent = () => {
//   const { isSidebarOpen } = useSidebar();

//   return (
//     <div className="min-h-screen flex">
//       {/* Sidebar avec largeur fixe */}
//       <div
//         className={`transition-all duration-300 ${
//           isSidebarOpen ? 'w-64' : 'w-20'
//         } bg-gray-800 text-white flex-shrink-0`}
//       >
//         <Sidebar />
//       </div>

//       {/* Contenu principal */}
//       <div className="flex-1 flex flex-col bg-gray-50">
//         <Header />
//         <main className="flex-1 p-6 overflow-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// const HeaderRH = () => (
//   <SidebarProvider>
//     <LayoutContent />
//   </SidebarProvider>
// );

// export default HeaderRH;

import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, useSidebar } from '../../../../components/SidebarContext';

const LayoutContent = () => {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-100 flex relative overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64' : 'w-16'
        }`}
        style={{ zIndex: 1040 }}
      >
        <Sidebar />
      </div>

      {/* Contenu principal */}
      <div
        className={`flex flex-col flex-1 transition-[margin] duration-300 ease-in-out`}
        style={{
          marginLeft: isSidebarOpen ? '16rem' : '4rem', // correspond à w-64 et w-16
        }}
      >
        <Header />
        <main className="flex-1 p-6 mt-[60px] overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const HeaderRH = () => (
  <SidebarProvider>
    <LayoutContent />
  </SidebarProvider>
);

export default HeaderRH;


