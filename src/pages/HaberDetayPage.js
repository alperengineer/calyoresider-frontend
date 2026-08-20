import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHaberDetay } from '../services/api';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import './DetailPages.css'; // Ortak CSS'imizi bağladık

const HaberDetayPage = () => {
    const [haber, setHaber] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        getHaberDetay(id)
            .then(response => {
                setHaber(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Haber detayı alınamadı:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (!haber) {
        return <div className="text-center mt-5">Haber bulunamadı.</div>;
    }

    return (
        <div className="page-container">
            <Row>
                {/* Okuma alanı ortalanır (mx-auto) ve gereksiz genişlemesi önlenir (lg=8) */}
                <Col lg={9} xl={8} className="mx-auto">

                    <div className="mb-4">
                        <Link to="/haberler" className="text-decoration-none text-muted fw-medium back-link">
                            <i className="fas fa-arrow-left me-2"></i> Haberlere Dön
                        </Link>
                    </div>

                    <div className="article-wrapper">
                        <h1 className="article-title">{haber.baslik}</h1>

                        <div className="article-meta">
                            <span>
                                <i className="far fa-calendar-alt"></i>
                                {new Date(haber.yayinTarihi).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                            <span>
                                <i className="fas fa-newspaper"></i> Basın & Duyuru
                            </span>
                        </div>

                        <div
                            className="article-content"
                            // style={{ overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word', maxWidth: '100%' }}
                            dangerouslySetInnerHTML={{ __html: haber.icerik }}
                        />
                    </div>

                </Col>
            </Row>
        </div>
    );
};

export default HaberDetayPage;