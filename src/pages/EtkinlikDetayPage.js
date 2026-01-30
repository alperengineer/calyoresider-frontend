import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEtkinlikDetay } from '../services/api';

const EtkinlikDetayPage = () => {
    const [etkinlik, setEtkinlik] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getEtkinlikDetay(id)
            .then(response => setEtkinlik(response.data))
            .catch(error => console.error("Etkinlik detayı alınamadı:", error));
    }, [id]);

    if (!etkinlik) return <div>Yükleniyor...</div>;

    return (
        <div className="row">
            <div className="col-md-10">
                <h1>{etkinlik.baslik}</h1>
                <p className="text-muted">Tarih: {new Date(etkinlik.etkinlikTarihi).toLocaleString('tr-TR')}</p>
                {etkinlik.konum && <p className="text-muted">Konum: {etkinlik.konum}</p>}
                <hr />
                <div
                    className="etkinlik-icerik"
                    dangerouslySetInnerHTML={{ __html: etkinlik.icerik }}
                />
                <hr />
                <Link to="/etkinlikler" className="btn btn-secondary">&laquo; Tüm Etkinliklere Geri Dön</Link>
            </div>
        </div>
    );
};

export default EtkinlikDetayPage;