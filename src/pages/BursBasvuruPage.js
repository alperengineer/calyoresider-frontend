import React, { useState } from 'react';
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ilIlceData from '../data/city.json';
import { postBursBasvuru } from '../services/api';

const BursBasvuruPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ad: '', soyad: '', tcKimlik: '', dogumTarihi: '', babaAdi: '', anaAdi: '',
        nufusIl: '', nufusIlce: '', nufusKoy: '',
        okulAdi: '', fakulte: '', bolum: '', sinif: '', ogrenciNo: '',
        babaHayatta: 'Evet', anneHayatta: 'Evet', anneBabaBirlikte: 'Evet',
        anneCalisma: 'Çalışmıyor', babaCalisma: 'Çalışmıyor', sgk: 'Yok',
        gecimeKatkidaBulunanlar: '', aylikGelir: '', sahipOlunanlar: '',
        kardesSayisi: '', egitimdekiKardesSayisi: '', kalinacakYer: '',
        baskaBursVarMi: 'Yok', baskaBursMiktari: '',
        referans1: '', referans2: '', referans3: '',
        taahhutOnay: false, kvkkOnay: false
    });

    const [files, setFiles] = useState({ ogrenciBelgesi: null, nufusOrnegi: null });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    // Form alanları değiştikçe state'i güncelleyen standart fonksiyon
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let finalValue = type === 'checkbox' ? checked : value;

        if (name === 'tcKimlik' || name === 'ogrenciNo') {
            finalValue = value.replace(/[^0-9]/g, '');
        }

        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleIlChange = (e) => {
        setFormData(prev => ({
            ...prev,
            nufusIl: e.target.value,
            nufusIlce: ''
        }));
    };

    // Seçilen İle ait ilçeleri bulma mantığı
    const selectedIlData = ilIlceData.find(il => il.label === formData.nufusIl);
    const ilcelerListesi = selectedIlData ? selectedIlData.districts : [];

    const handleFileChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        setFiles(prev => ({ ...prev, [name]: selectedFiles[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const formPayload = new FormData();
            Object.keys(formData).forEach(key => formPayload.append(key, formData[key]));
            if (files.ogrenciBelgesi) formPayload.append('ogrenciBelgesi', files.ogrenciBelgesi);
            if (files.nufusOrnegi) formPayload.append('nufusOrnegi', files.nufusOrnegi);

            await postBursBasvuru(formPayload);

            setIsSubmitting(false);
            setSubmitStatus('success');

        } catch (error) {
            console.error("Başvuru gönderilirken hata oluştu:", error);
            setIsSubmitting(false);

            if (error.response && error.response.status === 409) {
                alert(error.response.data.message);
            } else {
                alert("Başvurunuz gönderilirken bir hata oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyiniz.");
            }
            setSubmitStatus('error');
        }
    };
    if (submitStatus === 'success') {
        return (
            <div className="page-container fade-in">
                <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                    <Card className="custom-card shadow-sm border-0 p-5 text-center" style={{ maxWidth: '600px' }}>
                        <Card.Body>
                            <i className="fas fa-check-circle fa-5x text-success mb-4"></i>
                            <h2 className="fw-bold mb-3">Başvurunuz Alındı!</h2>
                            <p className="text-muted fs-5">Burs başvurunuz derneğimize başarıyla iletilmiştir. Değerlendirme süreci sonrasında sizinle iletişime geçilecektir.</p>
                            <Button variant="primary" className="rounded-pill mt-3 px-4" onClick={() => navigate('/')}>
                                Ana Sayfaya Dön
                            </Button>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }

    return (
        <div className="page-container fade-in">
            <Container className="py-4">
                <Card className="custom-card shadow-sm border-0 p-4 p-md-5 mx-auto" style={{ maxWidth: '900px' }}>
                    <Card.Body>
                        <div className="text-center mb-5">
                            <i className="fas fa-graduation-cap fa-3x text-primary mb-3"></i>
                            <h2 className="fw-bold text-primary">Öğrenci Bilgi ve Burs Başvuru Formu</h2>
                            <p className="text-muted mt-2">1 Ekim - 1 Kasım başvuru dönemine aittir.</p>
                        </div>

                        <Form onSubmit={handleSubmit}>

                            {/* --- 1. KİŞİSEL BİLGİLER --- */}
                            <h4 className="section-title mb-4">1. Kişisel Bilgiler</h4>
                            <Row className="g-3 mb-5">
                                <Col md={6}><Form.Group><Form.Label>Ad</Form.Label><Form.Control type="text" name="ad" required onChange={handleChange} /></Form.Group></Col>
                                <Col md={6}><Form.Group><Form.Label>Soyad</Form.Label><Form.Control type="text" name="soyad" required onChange={handleChange} /></Form.Group></Col>
                                <Col md={6}><Form.Group><Form.Label>TC Kimlik No</Form.Label><Form.Control
                                    type="text"
                                    maxLength="11"
                                    name="tcKimlik"
                                    value={formData.tcKimlik}
                                    required
                                    onChange={handleChange}
                                /></Form.Group></Col>
                                <Col md={6}><Form.Group><Form.Label>Doğum Tarihi</Form.Label><Form.Control type="date" name="dogumTarihi" required onChange={handleChange} /></Form.Group></Col>
                                <Col md={6}><Form.Group><Form.Label>Baba Adı</Form.Label><Form.Control type="text" name="babaAdi" required onChange={handleChange} /></Form.Group></Col>
                                <Col md={6}><Form.Group><Form.Label>Ana Adı</Form.Label><Form.Control type="text" name="anaAdi" required onChange={handleChange} /></Form.Group></Col>

                                {/* YENİ EKLENEN İL-İLÇE-KÖY ALANI */}
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Nüfusa Kayıtlı İl</Form.Label>
                                        <Form.Select name="nufusIl" value={formData.nufusIl} onChange={handleIlChange} required>
                                            <option value="">İl Seçiniz...</option>
                                            {ilIlceData.map(il => (
                                                <option key={il.value} value={il.label}>{il.label}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Nüfusa Kayıtlı İlçe</Form.Label>
                                        <Form.Select name="nufusIlce" value={formData.nufusIlce} onChange={handleChange} required disabled={!formData.nufusIl}>
                                            <option value="">İlçe Seçiniz...</option>
                                            {ilcelerListesi.map(ilce => (
                                                <option key={ilce.value} value={ilce.label}>{ilce.label}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Köy/Mahalle</Form.Label>
                                        <Form.Control type="text" name="nufusKoy" placeholder="Örn: Aktepe Mah." required onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* --- 2. EĞİTİM BİLGİLERİ --- */}
                            <h4 className="section-title mb-4">2. Eğitim Bilgileri</h4>
                            <Row className="g-3 mb-5">
                                <Col md={6}><Form.Group><Form.Label>Öğrenim Görülen Okul</Form.Label><Form.Control type="text" name="okulAdi" required onChange={handleChange} /></Form.Group></Col>
                                <Col md={6}><Form.Group><Form.Label>Fakülte / Enstitü / MYO</Form.Label><Form.Control type="text" name="fakulte" required onChange={handleChange} /></Form.Group></Col>
                                <Col md={4}><Form.Group><Form.Label>Bölüm / Program</Form.Label><Form.Control type="text" name="bolum" required onChange={handleChange} /></Form.Group></Col>
                                <Col md={4}><Form.Group><Form.Label>Sınıf</Form.Label><Form.Control type="text" name="sinif" required onChange={handleChange} /></Form.Group></Col>
                                <Col md={4}><Form.Group><Form.Label>Öğrenci No</Form.Label><Form.Control
                                    type="text"
                                    name="ogrenciNo"
                                    value={formData.ogrenciNo}
                                    required
                                    onChange={handleChange}
                                /></Form.Group></Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Başka Kurumdan Alınan Burs</Form.Label>
                                        <Form.Select name="baskaBursVarMi" onChange={handleChange}><option>Yok</option><option>Var</option></Form.Select>
                                    </Form.Group>
                                </Col>
                                {formData.baskaBursVarMi === 'Var' && (
                                    <Col md={6}>
                                        <Form.Group><Form.Label>Varsa Türü ve Miktarı</Form.Label><Form.Control type="text" name="baskaBursMiktari" placeholder="Örn: KYK Bursu - 2000 TL" onChange={handleChange} /></Form.Group>
                                    </Col>
                                )}
                            </Row>

                            {/* --- 3. AİLE VE SOSYO-EKONOMİK DURUM --- */}
                            <h4 className="section-title mb-4">3. Aile ve Ekonomik Durum</h4>
                            <Row className="g-3 mb-4">
                                <Col md={4}><Form.Group><Form.Label>Babanız Hayatta mı?</Form.Label><Form.Select name="babaHayatta" onChange={handleChange}><option>Evet</option><option>Hayır</option></Form.Select></Form.Group></Col>
                                <Col md={4}><Form.Group><Form.Label>Anneniz Hayatta mı?</Form.Label><Form.Select name="anneHayatta" onChange={handleChange}><option>Evet</option><option>Hayır</option></Form.Select></Form.Group></Col>
                                <Col md={4}><Form.Group><Form.Label>Anne Baba Birlikte mi?</Form.Label><Form.Select name="anneBabaBirlikte" onChange={handleChange}><option>Birlikte</option><option>Ayrı</option></Form.Select></Form.Group></Col>
                                <Col md={6}><Form.Group><Form.Label>Baba Çalışma Durumu</Form.Label><Form.Select name="babaCalisma" onChange={handleChange}><option>Çalışmıyor</option><option>Çalışıyor</option><option>Emekli</option></Form.Select></Form.Group></Col>
                                <Col md={6}><Form.Group><Form.Label>Anne Çalışma Durumu</Form.Label><Form.Select name="anneCalisma" onChange={handleChange}><option>Çalışmıyor</option><option>Çalışıyor</option><option>Emekli</option></Form.Select></Form.Group></Col>
                                <Col md={6}><Form.Group><Form.Label>Ailenin Bağlı Olduğu SGK</Form.Label><Form.Select name="sgk" onChange={handleChange}><option>Yok</option><option>SSK</option><option>Bağ-Kur</option><option>Emekli Sandığı</option></Form.Select></Form.Group></Col>
                                <Col md={6}><Form.Group><Form.Label>Aile Aylık Ort. Geliri (TL)</Form.Label><Form.Control type="number" name="aylikGelir" required onChange={handleChange} /></Form.Group></Col>
                                <Col md={12}><Form.Group><Form.Label>Sahip Olunanlar (Arsa, Araba, Ev, Kirada Daire vb.)</Form.Label><Form.Control type="text" name="sahipOlunanlar" placeholder="Örn: 1 Ev, 1 Araba" onChange={handleChange} /></Form.Group></Col>
                                <Col md={6}><Form.Group><Form.Label>Siz Hariç Kardeş Sayısı</Form.Label><Form.Control type="number" name="kardesSayisi" required onChange={handleChange} /></Form.Group></Col>
                                <Col md={6}><Form.Group><Form.Label>Eğitimdeki Kardeş Sayısı</Form.Label><Form.Control type="number" name="egitimdekiKardesSayisi" required onChange={handleChange} /></Form.Group></Col>
                                <Col md={12}><Form.Group><Form.Label>Bu Dönem Kalacağınız Yer</Form.Label><Form.Control type="text" name="kalinacakYer" placeholder="Örn: KYK Yurdu, Aile Yanı, Öğrenci Evi" required onChange={handleChange} /></Form.Group></Col>
                            </Row>

                            {/* --- 4. REFERANSLAR --- */}
                            <h4 className="section-title mb-4 mt-5">4. Referanslar</h4>
                            <p className="text-muted small mb-3">Lütfen 3 adet referansınızın İsim, Soyisim ve Cep numaralarını yazınız.</p>
                            <Row className="g-3 mb-5">
                                <Col md={4}><Form.Control type="text" name="referans1" placeholder="1. Referans Ad - Tel" required onChange={handleChange} /></Col>
                                <Col md={4}><Form.Control type="text" name="referans2" placeholder="2. Referans Ad - Tel" required onChange={handleChange} /></Col>
                                <Col md={4}><Form.Control type="text" name="referans3" placeholder="3. Referans Ad - Tel" required onChange={handleChange} /></Col>
                            </Row>

                            {/* --- 5. EKLER VE BELGELER --- */}
                            <h4 className="section-title mb-4">5. Ekler</h4>
                            <Row className="g-4 mb-5">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="fw-medium text-dark"><i className="fas fa-file-pdf text-danger me-2"></i>Öğrenci Belgesi Yükle</Form.Label>
                                        <Form.Control type="file" name="ogrenciBelgesi" accept=".pdf,.jpg,.jpeg,.png" required onChange={handleFileChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="fw-medium text-dark"><i className="fas fa-id-card text-primary me-2"></i>Nüfus Kayıt Örneği Yükle</Form.Label>
                                        <Form.Control type="file" name="nufusOrnegi" accept=".pdf,.jpg,.jpeg,.png" required onChange={handleFileChange} />
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* --- 6. ONAY VE GÖNDERİM --- */}
                            <div className="p-4 rounded-3 mb-4" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        name="taahhutOnay"
                                        required
                                        checked={formData.taahhutOnay}
                                        onChange={handleChange}
                                        label={<span className="fw-medium" style={{ fontSize: '0.95rem' }}>BU FORMDA VERDİĞİM TÜM BİLGİLER DOĞRUDUR. İSTENİLEN TAKDİRDE BURS VEREN MAKAMA İLETİLMEK ÜZERE GEREKLİ BELGELERİ SAĞLAYACAĞIM. YAPILACAK İNCELEMELER SONUCU YANLIŞ VEYA EKSİK BİLGİ ÇIKMASI DURUMUNDA ORTAYA ÇIKACAK SORUMLULUĞU ÜSTLENİYORUM.</span>}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check
                                        type="checkbox"
                                        name="kvkkOnay"
                                        required
                                        checked={formData.kvkkOnay}
                                        onChange={handleChange}
                                        label={<span className="text-muted" style={{ fontSize: '0.9rem' }}>Kişisel verilerimin KVKK kapsamında işlenmesini ve saklanmasını onaylıyorum.</span>}
                                    />
                                </Form.Group>
                            </div>

                            <div className="text-center mt-4">
                                <Button type="submit" variant="primary" size="lg" className="rounded-pill px-5 shadow-sm w-100 w-md-auto" disabled={isSubmitting}>
                                    {isSubmitting ? <><i className="fas fa-spinner fa-spin me-2"></i> Başvuru Gönderiliyor...</> : <><i className="fas fa-paper-plane me-2"></i> Başvuruyu Tamamla</>}
                                </Button>
                            </div>

                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default BursBasvuruPage;