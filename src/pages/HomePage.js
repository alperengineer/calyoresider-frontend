import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSonHaberler, getYaklasanEtkinlikler, getAyarlar, getTumYayinlar } from '../services/api';
import { Card, Button, Row, Col } from 'react-bootstrap';

const HomePage = () => {
    const [haberler, setHaberler] = useState([]);
    const [etkinlikler, setEtkinlikler] = useState([]);
    const [ayarlar, setAyarlar] = useState({});
    const [yayinlar, setYayinlar] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [haberlerRes, etkinliklerRes, ayarlarRes, yayinlarRes] = await Promise.all([
                    getSonHaberler(),
                    getYaklasanEtkinlikler(),
                    getAyarlar(),
                    getTumYayinlar()
                ]);

                setHaberler(haberlerRes.data);
                setEtkinlikler(etkinliklerRes.data);
                setAyarlar(ayarlarRes.data);
                setYayinlar(yayinlarRes.data);

            } catch (error) {
                console.error("Veri alınırken hata oluştu:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    const jumbotronStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/arkaplan.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white'
    };

    const handleSatinAlClick = (yayin) => {
        alert(`"${yayin.baslik}" adlı yayını satın alma işlemi henüz aktif değildir. Yakında hizmetinizde olacaktır.`);
    };

    return (
        <div>
            <div className="p-5 mb-4 bg-light rounded-3" style={jumbotronStyle}>
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">{ayarlar.jumbotronBaslik}</h1>
                    <p className="col-md-8 fs-4">{ayarlar.jumbotronMetin}</p>
                    <Link className="btn btn-primary btn-lg" to="/hakkimizda">Daha Fazla Bilgi</Link>
                </div>
            </div>

            <Row>
                <Col md={8}>
                    <h2>Son Haberler</h2>
                    {haberler.length > 0 ? haberler.map(haber => (
                        <Card className="mb-3" key={haber.id}>
                            <Card.Body>
                                <Card.Title>{haber.baslik}</Card.Title>
                                <Card.Text>{haber.icerik.substring(0, 150)}...</Card.Text>
                                <Button as={Link} to={`/haberler/${haber.id}`} variant="outline-primary" size="sm">Devamını Oku</Button>
                            </Card.Body>
                        </Card>
                    )) : <p>Henüz yayınlanmış bir haber bulunmamaktadır.</p>}
                </Col>
                <Col md={4}>
                    <h2>Yaklaşan Etkinlikler</h2>
                    {etkinlikler.length > 0 ? etkinlikler.map(etkinlik => (
                        <Card className="mb-3" key={etkinlik.id}>
                            <Card.Body>
                                <Card.Title>{etkinlik.baslik}</Card.Title>
                                <Card.Text className="text-muted">Tarih: {new Date(etkinlik.etkinlikTarihi).toLocaleString('tr-TR')}</Card.Text>
                                {etkinlik.konum && <p className="text-muted">Konum: {etkinlik.konum}</p>}
                                <Button as={Link} to={`/etkinlikler/${etkinlik.id}`} variant="outline-primary" size="sm">Detayları Gör</Button>
                            </Card.Body>
                        </Card>
                    )) : <p>Henüz planlanmış bir etkinlik bulunmamaktadır.</p>}
                </Col>
            </Row>

            <hr className="my-5" />

            {/* YAYINLAR BÖLÜMÜ - DÜZENLENMİŞ TASARIM */}
            <div className="yayinlar-bolumu">
                <h2 className="text-center mb-4">Yayınlarımız</h2>
                <div className="yayinlar-listesi">
                    {yayinlar.length > 0 ? yayinlar.map(yayin => (
                        <Card key={yayin.id} className="mb-3">
                            <Row className="g-0">
                                <Col md={4}>
                                    {yayin.kapakResmiDosyaAdi ?
                                        <Card.Img
                                            src={`/uploads/${yayin.kapakResmiDosyaAdi}`}
                                            alt={yayin.baslik}
                                            // 'contain' ile resmin tamamı görünür, 'cover' ile kırpılır.
                                            // Yüksekliği kaldırarak resmin doğal en-boy oranını korumasını sağlıyoruz.
                                            style={{ objectFit: 'contain', width: '100%', maxHeight: '300px' }}
                                        />
                                        :
                                        <div className="bg-light text-secondary d-flex align-items-center justify-content-center" style={{ minHeight: '200px', width: '100%' }}>
                                            <span>Resim Yok</span>
                                        </div>
                                    }
                                </Col>
                                <Col md={8}>
                                    <Card.Body className="d-flex flex-column h-100 p-4">
                                        {/* Metin içeriğini bir div içine alıyoruz */}
                                        <div className="flex-grow-1">
                                            <Card.Title as="h3">{yayin.baslik}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{yayin.yazar}</Card.Subtitle>
                                            <Card.Text className="mt-3">{yayin.aciklama}</Card.Text>
                                        </div>
                                        {/* Butonları sağa yaslamak için yeni bir div ve flexbox sınıfları ekliyoruz */}
                                        <div className="d-flex justify-content-end align-items-center mt-3">
                                            <Button variant="secondary" size="sm" className="me-2" disabled>Önizleme Yakında</Button>
                                            <Button variant="success" size="sm" onClick={() => handleSatinAlClick(yayin)}>Satın Al ({yayin.fiyat} TL)</Button>
                                        </div>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    )) : <p className="text-center">Henüz bir yayın bulunmamaktadır.</p>}
                </div>
            </div>
        </div>
    );
};

export default HomePage;