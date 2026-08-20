import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="py-4 mt-auto" style={{ backgroundColor: 'var(--footer-bg)', color: '#cbd5e1' }}>
            <Container>
                <Row className="align-items-center">
                    <Col md={8} className="text-center text-md-start mb-3 mb-md-0">
                        <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-2">

                            <h5 className="mb-0 text-white fw-bold">Çal Yöresi Yardımlaşma ve Dayanışma Derneği</h5>
                        </div>
                        <p className="small mb-0 opacity-75">
                            &copy; 2024 Çal Yöresi Yardımlaşma ve Dayanışma Derneği. Tüm Hakları Saklıdır.
                        </p>
                    </Col>

                    <Col md={4} className="text-center text-md-end">
                        <div className="d-flex justify-content-center justify-content-md-end gap-3">
                            <a href="https://www.facebook.com/profile.php?id=61572683393632" className="text-white text-decoration-none" target="_blank" rel="noopener noreferrer" style={{ transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                <i className="fab fa-facebook fa-lg"></i>
                            </a>
                            <a href="https://x.com/CalYoresiDer" className="text-white text-decoration-none" target="_blank" rel="noopener noreferrer" style={{ transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                <i className="fab fa-twitter fa-lg"></i>
                            </a>
                            <a href="https://www.instagram.com/calyoresidernegi/" className="text-white text-decoration-none" target="_blank" rel="noopener noreferrer" style={{ transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                <i className="fab fa-instagram fa-lg"></i>
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;