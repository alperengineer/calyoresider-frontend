import React, { useState, useEffect } from 'react';
import { getTumYayinlar, createYayin, updateYayin, deleteYayin, uploadFile } from '../../services/api';
import { Button, Table, Modal, Form, Alert, Spinner } from 'react-bootstrap';

const ManageYayinlarPage = () => {
    const [yayinlar, setYayinlar] = useState([]);
    const [showModal, setShowModal] = useState(false);
    // State'i tüm alanları içerecek şekilde güncelliyoruz
    const [currentYayin, setCurrentYayin] = useState({ id: null, baslik: '', yazar: '', aciklama: '', urunTipi: 'Kitap', fiyat: 0, kapakResmiDosyaAdi: '' });
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadYayinlar();
    }, []);

    const loadYayinlar = async () => {
        try {
            setError('');
            const response = await getTumYayinlar();
            setYayinlar(response.data);
        } catch (err) {
            setError('Yayınlar yüklenirken bir hata oluştu.');
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setCurrentYayin({ id: null, baslik: '', yazar: '', aciklama: '', urunTipi: 'Kitap', fiyat: 0, kapakResmiDosyaAdi: '' });
        setSelectedFile(null);
    };

    const handleShow = (yayin = { id: null, baslik: '', yazar: '', aciklama: '', urunTipi: 'Kitap', fiyat: 0, kapakResmiDosyaAdi: '' }) => {
        setCurrentYayin(yayin);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bu yayını silmek istediğinizden emin misiniz?')) {
            try {
                setError('');
                await deleteYayin(id);
                loadYayinlar();
            } catch (err) {
                setError('Yayın silinirken bir hata oluştu.');
            }
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSave = async () => {
        try {
            setError('');
            let yayinToSave = { ...currentYayin };

            // Eğer yeni bir dosya seçildiyse, önce onu yükle
            if (selectedFile) {
                setIsUploading(true);
                const response = await uploadFile(selectedFile);
                // Dönen dosya adını kaydedilecek yayına ekle
                yayinToSave.kapakResmiDosyaAdi = response.data.filename;
                setIsUploading(false);
            }

            // Son olarak, tüm veriyi (metin alanları + yeni resim adı) kaydet
            if (yayinToSave.id) {
                await updateYayin(yayinToSave.id, yayinToSave);
            } else {
                await createYayin(yayinToSave);
            }
            loadYayinlar();
            handleClose();
        } catch (err) {
            setError('Yayın kaydedilirken bir hata oluştu.');
            setIsUploading(false);
        }
    };

    const handleChange = (e) => {
        setCurrentYayin({ ...currentYayin, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Yayın Yönetimi</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button onClick={() => handleShow()} className="mb-3">Yeni Yayın Ekle</Button>

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
                            <td>
                                {yayin.kapakResmiDosyaAdi &&
                                    <img src={`/uploads/${yayin.kapakResmiDosyaAdi}`} alt={yayin.baslik} style={{ width: '50px', height: 'auto' }} />
                                }
                            </td>
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
                    <Modal.Title>{currentYayin.id ? 'Yayını Düzenle' : 'Yeni Yayın Ekle'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* TÜM METİN ALANLARI BURADA */}
                        <Form.Group>
                            <Form.Label>Başlık</Form.Label>
                            <Form.Control type="text" name="baslik" value={currentYayin.baslik} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Yazar</Form.Label>
                            <Form.Control type="text" name="yazar" value={currentYayin.yazar} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Açıklama</Form.Label>
                            <Form.Control as="textarea" rows={3} name="aciklama" value={currentYayin.aciklama} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Ürün Tipi</Form.Label>
                            <Form.Select name="urunTipi" value={currentYayin.urunTipi} onChange={handleChange}>
                                <option>Kitap</option>
                                <option>Dergi</option>
                                <option>Makale</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Fiyat (TL)</Form.Label>
                            <Form.Control type="number" name="fiyat" value={currentYayin.fiyat} onChange={handleChange} />
                        </Form.Group>

                        {/* FOTOĞRAF YÜKLEME ALANI */}
                        <Form.Group className="mt-3">
                            <Form.Label>Kapak Fotoğrafı</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} />
                            {currentYayin.kapakResmiDosyaAdi && !selectedFile &&
                                <small className="d-block mt-1">Mevcut resim: {currentYayin.kapakResmiDosyaAdi}</small>
                            }
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={isUploading}>İptal</Button>
                    <Button variant="primary" onClick={handleSave} disabled={isUploading}>
                        {isUploading ? <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Yükleniyor...</> : 'Kaydet'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageYayinlarPage;