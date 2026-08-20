import React, { useState, useEffect } from 'react';
import { getAyarlar, postIletisimFormu } from '../services/api';
import { Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import './IletisimPage.css'; // Yeni CSS'imizi bağladık

const IletisimPage = () => {
    const [ayarlar, setAyarlar] = useState({});
    const [formData, setFormData] = useState({ adSoyad: '', email: '', konu: '', mesaj: '' });
    const [mesaj, setMesaj] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false); // Form gönderilirken butonun kilitlenmesi için

    useEffect(() => {
        getAyarlar()
            .then(response => {
                setAyarlar(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("İletişim bilgileri alınamadı:", error);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await postIletisimFormu(formData);
            setMesaj({ text: response.data, type: 'success' });
            setFormData({ adSoyad: '', email: '', konu: '', mesaj: '' }); // Formu temizle
        } catch (error) {
            setMesaj({ text: 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.', type: 'danger' });
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <div className="page-container contact-wrapper">
            <div className="page-header text-center mb-5">
                <h1 className="fw-bold">İletişim</h1>
                <div className="title-divider mx-auto"></div>
                <p className="text-muted mt-3 fs-5">Soru, görüş veya önerileriniz için bizimle iletişime geçebilirsiniz.</p>
            </div>

            <Row className="gy-5">
                {/* Sol Taraf - İletişim Bilgileri Kutucukları */}
                <Col lg={5} className="pe-lg-5">
                    <h3 className="fw-bold mb-4" style={{ color: 'var(--primary-color)' }}>Bize Ulaşın</h3>

                    <div className="contact-info-item">
                        <div className="contact-icon">
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <div className="contact-text">
                            <h5>Adres</h5>
                            <p>{ayarlar.adres || 'Adres bilgisi güncelleniyor...'}</p>
                        </div>
                    </div>

                    <div className="contact-info-item">
                        <div className="contact-icon">
                            <i className="fas fa-phone-alt"></i>
                        </div>
                        <div className="contact-text">
                            <h5>Telefon</h5>
                            <p>{ayarlar.telefon || 'Telefon bilgisi güncelleniyor...'}</p>
                        </div>
                    </div>

                    <div className="contact-info-item">
                        <div className="contact-icon">
                            <i className="fas fa-envelope"></i>
                        </div>
                        <div className="contact-text">
                            <h5>E-posta</h5>
                            <p>{ayarlar.email || 'E-posta bilgisi güncelleniyor...'}</p>
                        </div>
                    </div>
                </Col>

                {/* Sağ Taraf - İletişim Formu */}
                <Col lg={7}>
                    <Card className="contact-form-card p-4 p-md-5">
                        <Card.Body>
                            <h3 className="fw-bold mb-4 text-center" style={{ color: 'var(--text-dark)' }}>Mesaj Gönderin</h3>

                            {mesaj && (
                                <Alert variant={mesaj.type} className="rounded-3 shadow-sm" onClose={() => setMesaj('')} dismissible>
                                    <i className={`fas ${mesaj.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
                                    {mesaj.text}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Adınız Soyadınız</Form.Label>
                                            <Form.Control type="text" name="adSoyad" value={formData.adSoyad} onChange={handleChange} required placeholder="Örn: Ahmet Yılmaz" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-4">
                                            <Form.Label>E-posta Adresiniz</Form.Label>
                                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Örn: ornek@mail.com" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-4">
                                    <Form.Label>Konu</Form.Label>
                                    <Form.Control type="text" name="konu" value={formData.konu} onChange={handleChange} required placeholder="Mesajınızın konusu nedir?" />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Mesajınız</Form.Label>
                                    <Form.Control as="textarea" name="mesaj" rows="5" value={formData.mesaj} onChange={handleChange} required placeholder="Mesajınızı buraya yazın..." />
                                </Form.Group>

                                <div className="text-end mt-4">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        className="rounded-pill px-5 shadow-sm"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" /> Gönderiliyor...</>
                                        ) : (
                                            <><i className="fas fa-paper-plane me-2"></i> Mesajı Gönder</>
                                        )}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default IletisimPage;