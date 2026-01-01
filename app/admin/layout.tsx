"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // Simple check to identify if we are on the login page to avoid rendering sidebar there (though middleware handles redirect, layout wraps everything in the group)
  // Actually, login page should probably be in a separate layout group group, but for simplicity:
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const menuItems = [
    { name: 'Dashboard', icon: 'fa-chart-pie', href: '/admin' },
    { name: 'Teachers', icon: 'fa-chalkboard-teacher', href: '/admin/teachers' },
    { name: 'Gallery', icon: 'fa-images', href: '/admin/gallery' },
    { name: 'Notices', icon: 'fa-bullhorn', href: '/admin/notices' },
    { name: 'Settings', icon: 'fa-cog', href: '/admin/settings' },
  ];

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <motion.aside 
        className={`admin-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}
        initial={false}
        animate={{ width: isSidebarOpen ? 250 : 80 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="sidebar-header">
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.h2 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
              >
                Admin Panel
              </motion.h2>
            )}
          </AnimatePresence>
          <button onClick={toggleSidebar} className="toggle-btn">
            <i className={`fa ${isSidebarOpen ? 'fa-angle-left' : 'fa-angle-right'}`}></i>
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.href} className={pathname === item.href ? 'active' : ''}>
                <Link href={item.href} title={item.name}>
                  <i className={`fas ${item.icon}`}></i>
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn">
             <i className="fas fa-sign-out-alt"></i>
             {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
           <div className="breadcrumbs">
              Admin / {pathname.split('/').pop()}
           </div>
           <div className="user-profile">
              <div className="avatar">A</div>
              <span>Admin User</span>
           </div>
        </header>
        <div className="content-wrapper">
          {children}
        </div>
      </main>

      <style jsx global>{`
        :root {
          --admin-bg: #f4f7fe;
          --admin-sidebar-bg: #ffffff;
          --admin-text: #2b3674;
          --admin-active: #4318ff;
          --glass-border: rgba(255, 255, 255, 0.2);
        }

        .dark {
          --admin-bg: #0b1437;
          --admin-sidebar-bg: #111c44;
          --admin-text: #ffffff;
        }

        .admin-container {
          display: flex;
          min-height: 100vh;
          background: var(--admin-bg);
          color: var(--admin-text);
          font-family: 'DM Sans', sans-serif;
        }

        .admin-sidebar {
          background: var(--admin-sidebar-bg);
          height: 100vh;
          position: sticky;
          top: 0;
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(0,0,0,0.05);
          overflow: hidden;
          z-index: 100;
        }

        .sidebar-header {
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
        }

        .sidebar-header h2 {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          white-space: nowrap;
          color: var(--admin-active);
        }

        .toggle-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--admin-text);
          font-size: 18px;
        }

        .sidebar-nav {
          flex: 1;
          padding: 20px 0;
        }

        .sidebar-nav ul {
          list-style: none;
          padding: 0;
        }

        .sidebar-nav li {
          margin-bottom: 8px;
          position: relative;
        }

        .sidebar-nav li a {
          display: flex;
          align-items: center;
          padding: 12px 24px;
          color: #a3aed0;
          text-decoration: none;
          transition: all 0.3s;
          font-weight: 500;
          white-space: nowrap;
          gap: 12px;
        }

        .sidebar-nav li.active a,
        .sidebar-nav li a:hover {
          color: var(--admin-active);
          background: rgba(67, 24, 255, 0.05);
          border-right: 3px solid var(--admin-active);
        }

        .sidebar-nav li i {
          width: 20px;
          text-align: center;
        }

        .sidebar-footer {
          padding: 20px;
          border-top: 1px solid rgba(0,0,0,0.05);
        }

        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          border: none;
          background: #ffe5e5;
          color: #d32f2f;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          justify-content: center;
        }

        .admin-main {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .admin-header {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          background: rgba(255,255,255,0.5);
          backdrop-filter: blur(10px);
        }

        .breadcrumbs {
          font-weight: 500;
          text-transform: capitalize;
        }

        .content-wrapper {
          padding: 30px;
          flex: 1;
          overflow-y: auto;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .avatar {
          width: 36px;
          height: 36px;
          background: var(--admin-active);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
