import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTumHaberler } from '../services/api';

const HaberlerPage = () => {
    const [haberler, setHaberler] = useState([]);

    useEffect(() => {
        getTumHaberler()
            .then(response => setHaberler(response.data))
            .catch(error => console.error("Haberler alınamadı:", error));
    }, []);

    return (
        <div>
            <h1>Haberler</h1>
            <hr />
            {haberler.length > 0 ? haberler.map(haber => (
                <div className="card mb-3" key={haber.id}>
                    <div className="card-body">
                        <h5 className="card-title">{haber.baslik}</h5>
                        <p className="card-text text-muted">Yayınlanma Tarihi: {new Date(haber.yayinTarihi).toLocaleDateString('tr-TR')}</p>
                        <p className="card-text">{haber.icerik.substring(0, 250)}...</p>
                        <Link to={`/haberler/${haber.id}`} className="btn btn-primary">Devamını Oku</Link>
                    </div>
                </div>
            )) : <p>Henüz yayınlanmış bir haber bulunmamaktadır.</p>}
        </div>
    );
};

export default HaberlerPage;