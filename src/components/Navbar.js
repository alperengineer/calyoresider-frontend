import React from 'react';
import { NavLink } from 'react-router-dom';
// Standart HTML etiketleri yerine react-bootstrap bileşenlerini import ediyoruz
import { Navbar, Container, Nav } from 'react-bootstrap';

const CustomNavbar = () => { // Bileşen adını Navbar ile çakışmaması için CustomNavbar yaptık
    return (
        <header>
            {/* Navbar bileşenini ve expand="lg" özelliğini kullanıyoruz */}
            {/* expand="lg" => Large (geniş) ekranlarda menü açılsın, daha küçüklerde daralsın */}
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    {/* NavLink'i Navbar.Brand içine alarak marka/logo kısmını oluşturuyoruz */}
                    <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
                        <img
                            src="/logo.png"
                            alt="Dernek Logosu"
                            className="me-2 img-fluid"
                            style={{ maxHeight: '60px' }}
                        />
                        <div>
                            <div className="fw-bold fs-4">Çal Yöresi</div>
                            <div className="fw-bold fs-5">Yardımlaşma ve Dayanışma Derneği</div>
                        </div>
                    </Navbar.Brand>
                    {/* Bu bileşen, üç çizgili butonu otomatik olarak oluşturur */}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    {/* Bu bileşen, daraltılabilir menü içeriğini sarmalar */}
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            {/* Menü linklerini Nav.Link olarak güncelliyoruz */}
                            <Nav.Link as={NavLink} to="/">Ana Sayfa</Nav.Link>
                            <Nav.Link as={NavLink} to="/hakkimizda">Hakkımızda</Nav.Link>
                            <Nav.Link as={NavLink} to="/haberler">Haberler</Nav.Link>
                            <Nav.Link as={NavLink} to="/etkinlikler">Etkinlikler</Nav.Link>
                            <Nav.Link as={NavLink} to="/iletisim">İletişim</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default CustomNavbar;