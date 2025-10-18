import React from 'react';
// BrowserRouter buradan kaldırıldı, artık index.js'te
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { AuthProvider, useAuth } from './hooks/useAuth';

import CustomNavbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HakkimizdaPage from './pages/HakkimizdaPage';
import HaberlerPage from './pages/HaberlerPage';
import HaberDetayPage from './pages/HaberDetayPage';
import EtkinliklerPage from './pages/EtkinliklerPage';
import EtkinlikDetayPage from './pages/EtkinlikDetayPage';
import IletisimPage from './pages/IletisimPage';
import LoginPage from './pages/LoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ManageHaberlerPage from './pages/admin/ManageHaberlerPage';
import ManageEtkinliklerPage from './pages/admin/ManageEtkinliklerPage';
import ManageAyarlarPage from './pages/admin/ManageAyarlarPage';
import ManageYayinlarPage from './pages/admin/ManageYayinlarPage';
import ManageBolgeYayinlariPage from './pages/admin/ManageBolgeYayinlariPage';

const PrivateRoute = () => {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/login" />;
};

const PublicLayout = () => (
  <div className="d-flex flex-column min-vh-100">
    <CustomNavbar /> {/* Değişti */}
    <main className="flex-grow-1">
      <div className="container mt-4">
        <Outlet />
      </div>
    </main>
    <Footer />
  </div>
);


function App() {
  // index.js'in App'i sarmalaması için AppWrapper yerine doğrudan App'i kullanıyoruz.
  return (
    <AuthProvider>
      <Routes>
        {/* Public Rotalar */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="hakkimizda" element={<HakkimizdaPage />} />
          <Route path="haberler" element={<HaberlerPage />} />
          <Route path="haberler/:id" element={<HaberDetayPage />} />
          <Route path="etkinlikler" element={<EtkinliklerPage />} />
          <Route path="etkinlikler/:id" element={<EtkinlikDetayPage />} />
          <Route path="iletisim" element={<IletisimPage />} />
        </Route>

        {/* Auth ve Admin Rotaları */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<PrivateRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="haberler" element={<ManageHaberlerPage />} />
            <Route path="etkinlikler" element={<ManageEtkinliklerPage />} />
            <Route path="ayarlar" element={<ManageAyarlarPage />} />
            <Route path="yayinlar" element={<ManageYayinlarPage />} />
            <Route path="bolge-yayinlari" element={<ManageBolgeYayinlariPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;