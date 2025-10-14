import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button, Nav } from 'react-bootstrap';

const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse vh-100">
                    <div className="position-sticky pt-3">
                        <Nav.Item>
                            <NavLink className="nav-link" to="/admin/dashboard">
                                Kontrol Paneli
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink className="nav-link" to="/admin/haberler">
                                Haberleri Yönet
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink className="nav-link" to="/admin/etkinlikler">
                                Etkinlikleri Yönet
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink className="nav-link" to="/admin/ayarlar">
                                Site Ayarları
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink className="nav-link" to="/admin/yayinlar">
                                Yayınları Yönet
                            </NavLink>
                        </Nav.Item>
                        <hr />
                        <Nav.Item>
                            <Button variant="outline-danger" size="sm" className="ms-3" onClick={handleLogout}>Çıkış Yap</Button>
                        </Nav.Item>
                    </div>
                </Nav>

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="pt-3 pb-2 mb-3 border-bottom">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};
export default AdminLayout;