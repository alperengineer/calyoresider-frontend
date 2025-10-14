import React, { useState, useEffect } from 'react';
import { getAyarlar } from '../services/api';

const HakkimizdaPage = () => {
    const [ayarlar, setAyarlar] = useState({});

    useEffect(() => {
        getAyarlar()
            .then(response => setAyarlar(response.data))
            .catch(error => console.error("Hakkımızda verisi alınamadı:", error));
    }, []);

    return (
        <div className="row">
            <div className="col-md-8">
                <h1>{ayarlar.hakkimizdaBaslik}</h1>
                <hr />
                {/* HTML içeriğini güvenli bir şekilde render etmek için */}
                <div dangerouslySetInnerHTML={{ __html: ayarlar.hakkimizdaIcerik }} />
            </div>
            <div className="col-md-4">
                <div className="card">
                    <div className="card-header">
                        Yönetim Kurulu
                    </div>
                    <ul className="list-group list-group-flush">
                        {ayarlar.yonetimKurulu && ayarlar.yonetimKurulu.map((uye, index) => (
                            <li key={index} className="list-group-item">{uye}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HakkimizdaPage;