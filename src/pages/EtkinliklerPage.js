import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTumEtkinlikler } from '../services/api';

const EtkinliklerPage = () => {
    const [etkinlikler, setEtkinlikler] = useState([]);

    useEffect(() => {
        getTumEtkinlikler()
            .then(response => setEtkinlikler(response.data))
            .catch(error => console.error("Etkinlikler alınamadı:", error));
    }, []);

    return (
        <div>
            <h1>Etkinlikler</h1>
            <hr />
            {etkinlikler.length > 0 ? etkinlikler.map(etkinlik => (
                <div className="card mb-3" key={etkinlik.id}>
                    <div className="card-body">
                        <h5 className="card-title">{etkinlik.baslik}</h5>
                        <p className="card-text text-muted">Tarih: {new Date(etkinlik.etkinlikTarihi).toLocaleString('tr-TR')}</p>
                        {etkinlik.konum && <p className="card-text text-muted">Konum: {etkinlik.konum}</p>}
                        <p className="card-text">{etkinlik.icerik.substring(0, 250)}...</p>
                        <Link to={`/etkinlikler/${etkinlik.id}`} className="btn btn-primary">Detayları Gör</Link>
                    </div>
                </div>
            )) : <p>Henüz planlanmış bir etkinlik bulunmamaktadır.</p>}
        </div>
    );
};

export default EtkinliklerPage;