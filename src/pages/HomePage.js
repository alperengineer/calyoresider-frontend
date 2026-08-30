import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSonHaberler, getYaklasanEtkinlikler, getAyarlar, getTumYayinlar, getTumBolgeYayinlari } from '../services/api';
import { Card, Button, Row, Col, Modal } from 'react-bootstrap';
import './HomePage.css'; // Yeni CSS'imizi bağladık

const HomePage = () => {
    const [haberler, setHaberler] = useState([]);
    const [etkinlikler, setEtkinlikler] = useState([]);
    const [ayarlar, setAyarlar] = useState({});
    const [yayinlar, setYayinlar] = useState([]);
    const [bolgeYayinlari, setBolgeYayinlari] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDuyuru, setShowDuyuru] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [haberlerRes, etkinliklerRes, ayarlarRes, yayinlarRes, bolgeYayinlariRes] = await Promise.all([
                    getSonHaberler(),
                    getYaklasanEtkinlikler(),
                    getAyarlar(),
                    getTumYayinlar(),
                    getTumBolgeYayinlari()
                ]);

                setHaberler(haberlerRes.data);
                setEtkinlikler(etkinliklerRes.data);
                setAyarlar(ayarlarRes.data);
                setYayinlar(yayinlarRes.data);
                setBolgeYayinlari(bolgeYayinlariRes.data);

                if (ayarlarRes.data.bursDuyuruAktif && !sessionStorage.getItem('duyuruGosterildi')) {
                    setShowDuyuru(true);
                }
            } catch (error) {
                console.error("Veri alınırken hata oluştu:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const stripHtml = (html) => {
        if (!html) return "";
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    const handleCloseDuyuru = () => {
        setShowDuyuru(false);
        sessionStorage.setItem('duyuruGosterildi', 'true');
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Yükleniyor...</span>
                </div>
            </div>
        );
    }

    const YayinKarti = ({ yayin }) => (
        <Card key={yayin.id} className="mb-4 custom-card">
            <Row className="g-0 h-100">
                <Col md={3} className="yayin-img-container">
                    {yayin.kapakResmiDosyaAdi ?
                        <Card.Img src={`${process.env.REACT_APP_API_URL}/uploads/${yayin.kapakResmiDosyaAdi}`} alt={yayin.baslik} style={{ objectFit: 'contain', width: '100%', maxHeight: '220px' }} />
                        :
                        <div className="text-secondary d-flex align-items-center justify-content-center w-100">
                            <i className="fas fa-book fa-3x opacity-50"></i>
                        </div>
                    }
                </Col>
                <Col md={9}>
                    <Card.Body className="d-flex flex-column h-100 p-4">
                        <div className="flex-grow-1">
                            <Card.Title as="h3">{yayin.baslik}</Card.Title>
                            <Card.Subtitle className="mb-3 text-secondary fw-semibold">
                                <i className="fas fa-user-edit me-2"></i>{yayin.yazar}
                            </Card.Subtitle>
                            <Card.Text className="mt-2">{yayin.aciklama}</Card.Text>
                        </div>
                        {yayin.okunabilirMi && yayin.okumaKlasoru ? (
                            <div className="mt-3 text-md-end">
                                <Link to={`/oku/${yayin.okumaKlasoru}`} className="btn btn-primary rounded-pill px-4 shadow-sm">
                                    <i className="fas fa-book-reader me-2"></i>Kitabı Oku
                                </Link>
                            </div>
                        ) : null}
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );

    return (
        <div className="page-container">
            {/* Duyuru Modalı (Daha yuvarlak hatlar ve gölgeler) */}
            <Modal show={showDuyuru} onHide={handleCloseDuyuru} centered size="lg" contentClassName="border-0 shadow-lg rounded-4">
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold text-primary">{ayarlar.bursDuyuruBaslik || 'Duyuru'}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center px-4">
                    {ayarlar.bursDuyuruResim && (
                        <img
                            src={`${process.env.REACT_APP_API_URL}/uploads/${ayarlar.bursDuyuruResim}`}
                            alt="Duyuru Görseli"
                            className="img-fluid mb-4 rounded-3 shadow-sm"
                            style={{ maxHeight: '400px' }}
                        />
                    )}
                    <h4 className="fw-medium text-dark">{ayarlar.bursDuyuruMetin}</h4>
                </Modal.Body>
                <Modal.Footer className="border-0 pt-0 pb-4 pe-4">
                    <Button variant="light" onClick={handleCloseDuyuru} className="rounded-pill px-4">Kapat</Button>
                    <Link to="/burs-basvuru" className="btn btn-primary rounded-pill px-4 shadow-sm" onClick={handleCloseDuyuru}>Başvuru Bilgisi Al</Link>
                </Modal.Footer>
            </Modal>

            {/* Yeni Şık Hero Section */}
            <div className="hero-section">
                <h1>{ayarlar.jumbotronBaslik}</h1>
                <p>{ayarlar.jumbotronMetin}</p>
                <Link className="btn btn-light btn-lg rounded-pill px-5 fw-bold text-primary shadow-sm" to="/hakkimizda">
                    Daha Fazla Bilgi
                </Link>
            </div>

            <Row className="mb-5">
                <Col md={8} className="mb-4 mb-md-0 haberler-sutunu">
                    <h2 className="section-title">Son Haberler</h2>
                    {haberler.length > 0 ? haberler.map(haber => (
                        <Card className="mb-4 custom-card" key={haber.id}>
                            <Card.Body className="p-4">
                                <Card.Title className="mb-3">{haber.baslik}</Card.Title>
                                <Card.Text>{stripHtml(haber.icerik).substring(0, 180)}...</Card.Text>
                                <div className="mt-3">
                                    <Button as={Link} to={`/haberler/${haber.id}`} variant="outline-primary" size="sm" className="rounded-pill px-3 fw-medium">
                                        Devamını Oku <i className="fas fa-arrow-right ms-1"></i>
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    )) : <p className="text-muted">Henüz yayınlanmış bir haber bulunmamaktadır.</p>}
                </Col>

                <Col md={4}>
                    <h2 className="section-title">Yaklaşan Etkinlikler</h2>
                    {etkinlikler.length > 0 ? etkinlikler.map(etkinlik => (
                        <Card className="mb-4 custom-card" key={etkinlik.id}>
                            <Card.Body className="p-4">
                                <Card.Title className="fs-5">{etkinlik.baslik}</Card.Title>
                                <hr className="text-muted opacity-25" />
                                <div className="d-flex align-items-center mb-2 text-muted small">
                                    <i className="far fa-calendar-alt me-2 text-primary"></i>
                                    <span>{new Date(etkinlik.etkinlikTarihi).toLocaleString('tr-TR')}</span>
                                </div>
                                {etkinlik.konum && (
                                    <div className="d-flex align-items-center text-muted small mb-3">
                                        <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                                        <span>{etkinlik.konum}</span>
                                    </div>
                                )}
                                <Button as={Link} to={`/etkinlikler/${etkinlik.id}`} variant="primary" size="sm" className="w-100 rounded-pill shadow-sm">
                                    Detayları Gör
                                </Button>
                            </Card.Body>
                        </Card>
                    )) : <p className="text-muted">Henüz planlanmış bir etkinlik bulunmamaktadır.</p>}
                </Col>
            </Row>

            <div className="yayinlar-bolumu mb-5 pt-4">
                <h2 className="section-title text-center">Yayınlarımız</h2>
                <div className="mt-4">
                    {yayinlar.length > 0 ? yayinlar.map(yayin => (
                        <YayinKarti key={yayin.id} yayin={yayin} />
                    )) : <p className="text-center text-muted">Henüz bir yayın bulunmamaktadır.</p>}
                </div>
            </div>

            <div className="bolge-yayinlari-bolumu mb-4 pt-4">
                <h2 className="section-title text-center">Çal Yöresi Yayınları</h2>
                <div className="mt-4">
                    {bolgeYayinlari.length > 0 ? bolgeYayinlari.map(yayin => (
                        <YayinKarti key={yayin.id} yayin={yayin} />
                    )) : <p className="text-center text-muted">Henüz bir bölge yayını bulunmamaktadır.</p>}
                </div>
            </div>
        </div>
    );
};

export default HomePage;