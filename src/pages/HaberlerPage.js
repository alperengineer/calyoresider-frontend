import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTumHaberler } from '../services/api';
import { Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import './ListPages.css'; // Yeni CSS'imizi bağladık

const HaberlerPage = () => {
    const [haberler, setHaberler] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTumHaberler()
            .then(response => {
                setHaberler(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Haberler alınamadı:", error);
                setLoading(false);
            });
    }, []);

    // HTML etiketlerini ve özel karakterleri temizleyen fonksiyon
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
                <h1 className="fw-bold">Haberler</h1>
                <div className="title-divider mx-auto"></div>
                <p className="text-muted mt-3 fs-5">Derneğimizden son gelişmeler ve duyurular</p>
            </div>

            <Row className="gy-4">
                {haberler.length > 0 ? haberler.map(haber => (
                    <Col lg={4} md={6} key={haber.id}>
                        <Card className="news-card">
                            <Card.Body>
                                <div className="news-date-badge">
                                    <i className="far fa-calendar-alt me-2"></i>
                                    {new Date(haber.yayinTarihi).toLocaleDateString('tr-TR')}
                                </div>
                                <Card.Title>{haber.baslik}</Card.Title>
                                <Card.Text>
                                    {stripHtml(haber.icerik).substring(0, 150)}...
                                </Card.Text>
                                <Button as={Link} to={`/haberler/${haber.id}`} variant="outline-primary" className="read-more-btn rounded-pill fw-medium">
                                    Devamını Oku <i className="fas fa-arrow-right ms-1"></i>
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )) : (
                    <Col>
                        <p className="text-center text-muted">Henüz yayınlanmış bir haber bulunmamaktadır.</p>
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default HaberlerPage;