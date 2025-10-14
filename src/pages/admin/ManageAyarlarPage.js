import React, { useState, useEffect } from 'react';
import { getAyarlar, updateAyarlar } from '../../services/api';
import { Button, Form, Alert, Card, Row, Col } from 'react-bootstrap';

const ManageAyarlarPage = () => {
    const [ayarlar, setAyarlar] = useState({});
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        loadAyarlar();
    }, []);

    const loadAyarlar = async () => {
        try {
            setError('');
            const response = await getAyarlar();
            setAyarlar(response.data);
        } catch (err) {
            setError('Ayarlar yüklenirken bir hata oluştu.');
        }
    };

    const handleSave = async () => {
        setMessage('');
        setError('');
        try {
            await updateAyarlar(ayarlar);
            setMessage('Ayarlar başarıyla güncellendi!');
        } catch (err) {
            setError('Ayarlar güncellenirken bir hata oluştu.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAyarlar({ ...ayarlar, [name]: value });
    };

    const handleYonetimChange = (e) => {
        const yonetimKuruluArray = e.target.value.split('\n');
        setAyarlar({ ...ayarlar, yonetimKurulu: yonetimKuruluArray });
    }

    return (
        <div>
            <h2>Site Ayarları Yönetimi</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}

            <Form>
                <Card className="mb-3">
                    <Card.Header>Ana Sayfa Ayarları</Card.Header>
                    <Card.Body>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Jumbotron Başlık</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" name="jumbotronBaslik" value={ayarlar.jumbotronBaslik || ''} onChange={handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Jumbotron Metin</Form.Label>
                            <Col sm={9}>
                                <Form.Control as="textarea" rows={3} name="jumbotronMetin" value={ayarlar.jumbotronMetin || ''} onChange={handleChange} />
                            </Col>
                        </Form.Group>
                    </Card.Body>
                </Card>

                <Card className="mb-3">
                    <Card.Header>Hakkımızda Sayfası</Card.Header>
                    <Card.Body>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Sayfa Başlığı</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" name="hakkimizdaBaslik" value={ayarlar.hakkimizdaBaslik || ''} onChange={handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Sayfa İçeriği (HTML destekler)</Form.Label>
                            <Col sm={9}>
                                <Form.Control as="textarea" rows={5} name="hakkimizdaIcerik" value={ayarlar.hakkimizdaIcerik || ''} onChange={handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Yönetim Kurulu (Her satıra bir üye)</Form.Label>
                            <Col sm={9}>
                                <Form.Control as="textarea" rows={10} name="yonetimKurulu" value={Array.isArray(ayarlar.yonetimKurulu) ? ayarlar.yonetimKurulu.join('\n') : ''} onChange={handleYonetimChange} />
                            </Col>
                        </Form.Group>
                    </Card.Body>
                </Card>

                <Card className="mb-3">
                    <Card.Header>İletişim Bilgileri</Card.Header>
                    <Card.Body>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Adres</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" name="adres" value={ayarlar.adres || ''} onChange={handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Telefon</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" name="telefon" value={ayarlar.telefon || ''} onChange={handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>E-posta</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="email" name="email" value={ayarlar.email || ''} onChange={handleChange} />
                            </Col>
                        </Form.Group>
                    </Card.Body>
                </Card>

                <Button variant="primary" onClick={handleSave} className="mb-3">Ayarları Kaydet</Button>
            </Form>
        </div>
    );
};

export default ManageAyarlarPage;