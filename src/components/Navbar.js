import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './Navbar.css'; // Yeni stil dosyamızı çağırıyoruz

const CustomNavbar = () => {
    return (
        <header className="sticky-top">
            <Navbar bg="white" expand="lg" className="custom-navbar py-3 shadow-sm">
                <Container>
                    <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center brand-logo">
                        <img
                            src="/logo.png"
                            alt="Dernek Logosu"
                            className="me-3"
                        />
                        <div className="brand-text">
                            <h1 className="mb-0">Çal Yöresi</h1>
                            <span className="text-muted">Yardımlaşma ve Dayanışma Derneği</span>
                        </div>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0 shadow-none" />

                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto fw-medium nav-links">
                            <Nav.Link as={NavLink} to="/" exact="true">Ana Sayfa</Nav.Link>
                            <Nav.Link as={NavLink} to="/hakkimizda">Hakkımızda</Nav.Link>
                            <Nav.Link as={NavLink} to="/haberler">Haberler</Nav.Link>
                            <Nav.Link as={NavLink} to="/etkinlikler">Etkinlikler</Nav.Link>
                            <Nav.Link as={NavLink} to="/iletisim" className="btn-iletisim ms-lg-3">İletişim</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default CustomNavbar;