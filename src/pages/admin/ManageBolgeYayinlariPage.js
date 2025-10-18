import React, { useState, useEffect } from 'react';
// API fonksiyonlarını yenileriyle değiştiriyoruz
import { getTumBolgeYayinlari, createBolgeYayin, updateBolgeYayin, deleteBolgeYayin, uploadFile } from '../../services/api';
import { Button, Table, Modal, Form, Alert, Spinner } from 'react-bootstrap';

const ManageBolgeYayinlariPage = () => {
    const [yayinlar, setYayinlar] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentYayin, setCurrentYayin] = useState({ id: null, baslik: '', yazar: '', aciklama: '', fiyat: 0, kapakResmiDosyaAdi: '' });
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadYayinlar();
    }, []);

    const loadYayinlar = async () => {
        try {
            setError('');
            const response = await getTumBolgeYayinlari(); // Değişti
            setYayinlar(response.data);
        } catch (err) {
            setError('Bölge yayınları yüklenirken bir hata oluştu.'); // Değişti
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setCurrentYayin({ id: null, baslik: '', yazar: '', aciklama: '', fiyat: 0, kapakResmiDosyaAdi: '' });
        setSelectedFile(null);
    };

    const handleShow = (yayin = { id: null, baslik: '', yazar: '', aciklama: '', fiyat: 0, kapakResmiDosyaAdi: '' }) => {
        setCurrentYayin(yayin);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bu bölge yayınını silmek istediğinizden emin misiniz?')) { // Değişti
            try {
                setError('');
                await deleteBolgeYayin(id); // Değişti
                loadYayinlar();
            } catch (err) {
                setError('Bölge yayını silinirken bir hata oluştu.'); // Değişti
            }
        }
    };

    const handleSave = async () => {
        try {
            setError('');
            let yayinToSave = { ...currentYayin };

            if (selectedFile) {
                setIsUploading(true);
                const response = await uploadFile(selectedFile);
                yayinToSave.kapakResmiDosyaAdi = response.data.filename;
                setIsUploading(false);
            }

            if (yayinToSave.id) {
                await updateBolgeYayin(yayinToSave.id, yayinToSave); // Değişti
            } else {
                await createBolgeYayin(yayinToSave); // Değişti
            }
            loadYayinlar();
            handleClose();
        } catch (err) {
            setError('Bölge yayını kaydedilirken bir hata oluştu.'); // Değişti
            setIsUploading(false);
        }
    };

    const handleChange = (e) => {
        setCurrentYayin({ ...currentYayin, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    return (
        <div>
            <h2>Bölge Yayınları Yönetimi</h2>
            {/* Geri kalan JSX kodu ManageYayinlarPage ile aynı, sadece başlıklar ve mesajlar değişti */}
            {error && <Alert variant="danger">{error}</Alert>}
            <Button onClick={() => handleShow()} className="mb-3">Yeni Bölge Yayını Ekle</Button>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Kapak</th>
                        <th>Başlık</th>
                        <th>Yazar</th>
                        <th>Fiyat</th>
                        <th style={{ width: '150px' }}>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {yayinlar.map(yayin => (
                        <tr key={yayin.id}>
                            <td>{yayin.kapakResmiDosyaAdi && <img src={`/uploads/${yayin.kapakResmiDosyaAdi}`} alt={yayin.baslik} style={{ width: '50px', height: 'auto' }} />}</td>
                            <td>{yayin.baslik}</td>
                            <td>{yayin.yazar}</td>
                            <td>{yayin.fiyat} TL</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => handleShow(yayin)}>Düzenle</Button>{' '}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(yayin.id)}>Sil</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{currentYayin.id ? 'Bölge Yayınını Düzenle' : 'Yeni Bölge Yayını Ekle'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Form alanları, urunTipi hariç aynı */}
                        <Form.Group><Form.Label>Başlık</Form.Label><Form.Control type="text" name="baslik" value={currentYayin.baslik} onChange={handleChange} /></Form.Group>
                        <Form.Group className="mt-3"><Form.Label>Yazar</Form.Label><Form.Control type="text" name="yazar" value={currentYayin.yazar} onChange={handleChange} /></Form.Group>
                        <Form.Group className="mt-3"><Form.Label>Açıklama</Form.Label><Form.Control as="textarea" rows={3} name="aciklama" value={currentYayin.aciklama} onChange={handleChange} /></Form.Group>
                        <Form.Group className="mt-3"><Form.Label>Fiyat (TL)</Form.Label><Form.Control type="number" name="fiyat" value={currentYayin.fiyat} onChange={handleChange} /></Form.Group>
                        <Form.Group className="mt-3"><Form.Label>Kapak Fotoğrafı</Form.Label><Form.Control type="file" onChange={handleFileChange} />{currentYayin.kapakResmiDosyaAdi && !selectedFile && <small className="d-block mt-1">Mevcut resim: {currentYayin.kapakResmiDosyaAdi}</small>}</Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={isUploading}>İptal</Button>
                    <Button variant="primary" onClick={handleSave} disabled={isUploading}>{isUploading ? 'Yükleniyor...' : 'Kaydet'}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageBolgeYayinlariPage;