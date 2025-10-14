import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHaberDetay } from '../services/api';

const HaberDetayPage = () => {
    const [haber, setHaber] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getHaberDetay(id)
            .then(response => setHaber(response.data))
            .catch(error => console.error("Haber detayı alınamadı:", error));
    }, [id]);

    if (!haber) return <div>Yükleniyor...</div>;

    return (
        <div className="row">
            <div className="col-md-10">
                <h1>{haber.baslik}</h1>
                <p className="text-muted">Yayınlanma Tarihi: {new Date(haber.yayinTarihi).toLocaleString('tr-TR')}</p>
                <hr />
                <div className="haber-icerik" style={{ whiteSpace: 'pre-wrap' }}>
                    {haber.icerik}
                </div>
                <hr />
                <Link to="/haberler" className="btn btn-secondary">&laquo; Tüm Haberlere Geri Dön</Link>
            </div>
        </div>
    );
};

export default HaberDetayPage;