import React, { useState, useEffect } from 'react';
import { getAyarlar } from '../services/api';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import './HakkimizdaPage.css'; // Yeni CSS'imizi bağladık

const HakkimizdaPage = () => {
    const [ayarlar, setAyarlar] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAyarlar()
            .then(response => {
                setAyarlar(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Hakkımızda verisi alınamadı:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <div className="page-container fade-in">
            <div className="page-header text-center">
                <h1 className="fw-bold">{ayarlar.hakkimizdaBaslik}</h1>
                <div className="title-divider mx-auto"></div>
            </div>

            <Row className="gy-4">
                <Col lg={8}>
                    {/* İçerik Kartı */}
                    <Card className="custom-card h-100 p-4 border-0 shadow-sm">
                        <Card.Body>
                            <div
                                className="hakkimizda-icerik"
                                dangerouslySetInnerHTML={{ __html: ayarlar.hakkimizdaIcerik }}
                            />
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={4}>
                    {/* Yönetim Kurulu Kartı */}
                    <Card className="custom-card border-0 shadow-sm overflow-hidden">
                        <Card.Header className="bg-primary text-center py-3 border-0">
                            <h4 className="mb-0 fw-semibold text-white" style={{ color: 'white' }}>
                                <i className="fas fa-users me-2 text-white"></i>Yönetim Kurulu
                            </h4>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <ul className="list-group list-group-flush yonetim-listesi">
                                {ayarlar.yonetimKurulu && ayarlar.yonetimKurulu.map((uye, index) => (
                                    <li key={index} className="list-group-item d-flex align-items-center py-3 px-4 border-bottom">
                                        <div className="avatar-circle bg-light text-primary me-3">
                                            <i className="fas fa-user-tie"></i>
                                        </div>
                                        <span className="fw-medium text-dark">{uye}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default HakkimizdaPage;