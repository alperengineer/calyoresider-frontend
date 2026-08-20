import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTumEtkinlikler } from '../services/api';
import { Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import './ListPages.css'; // Ortak CSS'imizi bağladık

const EtkinliklerPage = () => {
    const [etkinlikler, setEtkinlikler] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTumEtkinlikler()
            .then(response => {
                setEtkinlikler(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Etkinlikler alınamadı:", error);
                setLoading(false);
            });
    }, []);

    const stripHtml = (html) => {
        if (!html) return "";
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

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
                <h1 className="fw-bold">Etkinlikler</h1>
                <div className="title-divider mx-auto"></div>
                <p className="text-muted mt-3 fs-5">Planlanan güncel etkinliklerimiz ve organizasyonlarımız</p>
            </div>

            <Row className="gy-4">
                {etkinlikler.length > 0 ? etkinlikler.map(etkinlik => (
                    <Col lg={4} md={6} key={etkinlik.id}>
                        <Card className="news-card">
                            <Card.Body>
                                <div className="news-date-badge">
                                    <i className="far fa-calendar-check me-2"></i>
                                    {new Date(etkinlik.etkinlikTarihi).toLocaleString('tr-TR', { dateStyle: 'long', timeStyle: 'short' })}
                                </div>
                                <Card.Title>{etkinlik.baslik}</Card.Title>

                                {etkinlik.konum && (
                                    <div className="text-muted small mb-3 fw-medium">
                                        <i className="fas fa-map-marker-alt text-primary me-2"></i>
                                        {etkinlik.konum}
                                    </div>
                                )}

                                <Card.Text>
                                    {stripHtml(etkinlik.icerik).substring(0, 150)}...
                                </Card.Text>

                                <Button as={Link} to={`/etkinlikler/${etkinlik.id}`} variant="primary" className="read-more-btn rounded-pill fw-medium w-100 shadow-sm">
                                    Detayları Gör
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )) : (
                    <Col>
                        <p className="text-center text-muted">Henüz planlanmış bir etkinlik bulunmamaktadır.</p>
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default EtkinliklerPage;