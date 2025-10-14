import React, { useState, useEffect } from 'react';
import { getAyarlar, postIletisimFormu } from '../services/api';

const IletisimPage = () => {
    const [ayarlar, setAyarlar] = useState({});
    const [formData, setFormData] = useState({ adSoyad: '', email: '', konu: '', mesaj: '' });
    const [mesaj, setMesaj] = useState('');

    useEffect(() => {
        getAyarlar()
            .then(response => setAyarlar(response.data))
            .catch(error => console.error("İletişim bilgileri alınamadı:", error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await postIletisimFormu(formData);
            setMesaj(response.data);
            setFormData({ adSoyad: '', email: '', konu: '', mesaj: '' }); // Formu temizle
        } catch (error) {
            setMesaj('Mesaj gönderilirken bir hata oluştu.');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>İletişim</h1>
            <hr />
            {mesaj && <div className="alert alert-success">{mesaj}</div>}
            <div className="row">
                <div className="col-md-8">
                    <p>Bizimle iletişime geçmek için aşağıdaki formu doldurabilirsiniz.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="adSoyad" className="form-label">Adınız Soyadınız</label>
                            <input type="text" className="form-control" id="adSoyad" name="adSoyad" value={formData.adSoyad} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">E-posta Adresiniz</label>
                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="konu" className="form-label">Konu</label>
                            <input type="text" className="form-control" id="konu" name="konu" value={formData.konu} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mesaj" className="form-label">Mesajınız</label>
                            <textarea className="form-control" id="mesaj" name="mesaj" rows="5" value={formData.mesaj} onChange={handleChange} required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Mesajı Gönder</button>
                    </form>
                </div>
                <div className="col-md-4">
                    <h2>İletişim Bilgileri</h2>
                    <p><strong>Adres:</strong> {ayarlar.adres}</p>
                    <p><strong>Telefon:</strong> {ayarlar.telefon}</p>
                    <p><strong>E-posta:</strong> {ayarlar.email}</p>
                </div>
            </div>
        </div>
    );
};

export default IletisimPage;