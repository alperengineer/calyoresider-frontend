import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEtkinlikDetay } from '../services/api';
import { Row, Col, Spinner } from 'react-bootstrap';
import './DetailPages.css'; // Ortak CSS'imizi bağladık

const EtkinlikDetayPage = () => {
    const [etkinlik, setEtkinlik] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        getEtkinlikDetay(id)
            .then(response => {
                setEtkinlik(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Etkinlik detayı alınamadı:", error);
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

    if (!etkinlik) {
        return <div className="text-center mt-5">Etkinlik bulunamadı.</div>;
    }

    return (
        <div className="page-container">
            <Row>
                <Col lg={9} xl={8} className="mx-auto">

                    <div className="mb-4">
                        <Link to="/etkinlikler" className="text-decoration-none text-muted fw-medium back-link">
                            <i className="fas fa-arrow-left me-2"></i> Etkinliklere Dön
                        </Link>
                    </div>

                    <div className="article-wrapper">
                        <h1 className="article-title">{etkinlik.baslik}</h1>

                        <div className="article-meta">
                            <span>
                                <i className="far fa-calendar-check"></i>
                                {new Date(etkinlik.etkinlikTarihi).toLocaleString('tr-TR', { dateStyle: 'long', timeStyle: 'short' })}
                            </span>
                            {etkinlik.konum && (
                                <span>
                                    <i className="fas fa-map-marker-alt"></i>
                                    {etkinlik.konum}
                                </span>
                            )}
                        </div>

                        <div
                            className="article-content"
                            // style={{ overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word', maxWidth: '100%' }}
                            dangerouslySetInnerHTML={{ __html: etkinlik.icerik }}
                        />
                    </div>

                </Col>
            </Row>
        </div>
    );
};

export default EtkinlikDetayPage;