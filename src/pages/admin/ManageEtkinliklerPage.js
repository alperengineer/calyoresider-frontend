import React, { useState, useEffect } from 'react';
import { getTumEtkinlikler, createEtkinlik, updateEtkinlik, deleteEtkinlik } from '../../services/api';
import { Button, Table, Modal, Form, Alert } from 'react-bootstrap';

const ManageEtkinliklerPage = () => {
    const [etkinlikler, setEtkinlikler] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentEtkinlik, setCurrentEtkinlik] = useState({ id: null, baslik: '', icerik: '', konum: '', etkinlikTarihi: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        loadEtkinlikler();
    }, []);

    const loadEtkinlikler = async () => {
        try {
            setError('');
            const response = await getTumEtkinlikler();
            setEtkinlikler(response.data);
        } catch (err) {
            setError('Etkinlikler yüklenirken bir hata oluştu.');
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setCurrentEtkinlik({ id: null, baslik: '', icerik: '', konum: '', etkinlikTarihi: '' });
    };

    const handleShow = (etkinlik = { id: null, baslik: '', icerik: '', konum: '', etkinlikTarihi: '' }) => {
        const formattedEtkinlik = {
            ...etkinlik,
            etkinlikTarihi: etkinlik.etkinlikTarihi ? new Date(etkinlik.etkinlikTarihi).toISOString().slice(0, 16) : ''
        };
        setCurrentEtkinlik(formattedEtkinlik);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bu etkinliği silmek istediğinizden emin misiniz?')) {
            try {
                setError('');
                await deleteEtkinlik(id);
                loadEtkinlikler();
            } catch (err) {
                setError('Etkinlik silinirken bir hata oluştu.');
            }
        }
    };

    const handleSave = async () => {
        try {
            setError('');
            const dataToSave = {
                ...currentEtkinlik,
                etkinlikTarihi: new Date(currentEtkinlik.etkinlikTarihi).toISOString()
            };

            if (currentEtkinlik.id) {
                await updateEtkinlik(currentEtkinlik.id, dataToSave);
            } else {
                await createEtkinlik(dataToSave);
            }
            loadEtkinlikler();
            handleClose();
        } catch (err) {
            setError('Etkinlik kaydedilirken bir hata oluştu.');
        }
    };

    const handleChange = (e) => {
        setCurrentEtkinlik({ ...currentEtkinlik, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Etkinlik Yönetimi</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button onClick={() => handleShow()} className="mb-3">Yeni Etkinlik Ekle</Button>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Başlık</th>
                        <th>Tarih</th>
                        <th>Konum</th>
                        <th style={{ width: '150px' }}>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {etkinlikler.map(etkinlik => (
                        <tr key={etkinlik.id}>
                            <td>{etkinlik.baslik}</td>
                            <td>{new Date(etkinlik.etkinlikTarihi).toLocaleString('tr-TR')}</td>
                            <td>{etkinlik.konum}</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => handleShow(etkinlik)}>Düzenle</Button>{' '}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(etkinlik.id)}>Sil</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{currentEtkinlik.id ? 'Etkinliği Düzenle' : 'Yeni Etkinlik Ekle'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Başlık</Form.Label>
                            <Form.Control type="text" name="baslik" value={currentEtkinlik.baslik} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>İçerik</Form.Label>
                            <Form.Control as="textarea" rows={5} name="icerik" value={currentEtkinlik.icerik} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Konum</Form.Label>
                            <Form.Control type="text" name="konum" value={currentEtkinlik.konum} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Etkinlik Tarihi</Form.Label>
                            <Form.Control type="datetime-local" name="etkinlikTarihi" value={currentEtkinlik.etkinlikTarihi} onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>İptal</Button>
                    <Button variant="primary" onClick={handleSave}>Kaydet</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageEtkinliklerPage;