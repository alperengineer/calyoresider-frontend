import React, { useState, useEffect } from 'react';
import { getTumHaberler, createHaber, updateHaber, deleteHaber } from '../../services/api';
import { Button, Table, Modal, Form, Alert } from 'react-bootstrap';

const ManageHaberlerPage = () => {
    const [haberler, setHaberler] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentHaber, setCurrentHaber] = useState({ id: null, baslik: '', icerik: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        loadHaberler();
    }, []);

    const loadHaberler = async () => {
        try {
            setError('');
            const response = await getTumHaberler();
            setHaberler(response.data);
        } catch (err) {
            setError('Haberler yüklenirken bir hata oluştu.');
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setCurrentHaber({ id: null, baslik: '', icerik: '' });
    };

    const handleShow = (haber = { id: null, baslik: '', icerik: '' }) => {
        setCurrentHaber(haber);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bu haberi silmek istediğinizden emin misiniz?')) {
            try {
                setError('');
                await deleteHaber(id);
                loadHaberler();
            } catch (err) {
                setError('Haber silinirken bir hata oluştu.');
            }
        }
    };

    const handleSave = async () => {
        try {
            setError('');
            if (currentHaber.id) {
                await updateHaber(currentHaber.id, currentHaber);
            } else {
                await createHaber(currentHaber);
            }
            loadHaberler();
            handleClose();
        } catch (err) {
            setError('Haber kaydedilirken bir hata oluştu.');
        }
    };

    const handleChange = (e) => {
        setCurrentHaber({ ...currentHaber, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Haber Yönetimi</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button onClick={() => handleShow()} className="mb-3">Yeni Haber Ekle</Button>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Başlık</th>
                        <th style={{ width: '150px' }}>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {haberler.map(haber => (
                        <tr key={haber.id}>
                            <td>{haber.baslik}</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => handleShow(haber)}>Düzenle</Button>{' '}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(haber.id)}>Sil</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{currentHaber.id ? 'Haberi Düzenle' : 'Yeni Haber Ekle'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Başlık</Form.Label>
                            <Form.Control type="text" name="baslik" value={currentHaber.baslik} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>İçerik</Form.Label>
                            <Form.Control as="textarea" rows={10} name="icerik" value={currentHaber.icerik} onChange={handleChange} />
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

export default ManageHaberlerPage;