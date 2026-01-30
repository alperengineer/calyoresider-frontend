// src/pages/BookReaderPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookPages } from '../services/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Virtual, Zoom, Keyboard } from 'swiper/modules';
import { Spinner, Alert, Button } from 'react-bootstrap';

// Swiper Stilleri
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/virtual';
import 'swiper/css/zoom';

const BookReaderPage = () => {
    const { folderName } = useParams(); // URL'deki klasör adını alır
    const navigate = useNavigate();
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const response = await getBookPages(folderName);
                setPages(response.data.pages);
            } catch (err) {
                console.error(err);
                setError('Kitap yüklenirken bir sorun oluştu veya içerik bulunamadı.');
            } finally {
                setLoading(false);
            }
        };
        fetchPages();
    }, [folderName]);

    // Sağ tıklamayı engelle
    const handleContextMenu = (e) => e.preventDefault();

    if (loading) return <div className="vh-100 d-flex justify-content-center align-items-center"><Spinner animation="border" variant="light" /></div>;
    if (error) return <div className="vh-100 d-flex justify-content-center align-items-center"><Alert variant="danger">{error} <Button variant="outline-danger" size="sm" onClick={() => navigate(-1)}>Geri Dön</Button></Alert></div>;

    return (
        <div style={{ height: '100vh', backgroundColor: '#212529', position: 'relative' }} onContextMenu={handleContextMenu}>
            {/* Kapat Butonu */}
            <Button
                variant="light"
                className="position-absolute top-0 end-0 m-3"
                style={{ zIndex: 1000 }}
                onClick={() => navigate(-1)}
            >
                <i className="fas fa-times"></i> Kapat
            </Button>

            <Swiper
                modules={[Navigation, Pagination, Virtual, Zoom, Keyboard]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={true}
                pagination={{ type: 'fraction', color: '#fff' }}
                virtual={true}
                zoom={true}
                keyboard={{ enabled: true }}
                style={{ width: '100%', height: '100%', '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff' }}
            >
                {pages.map((imgUrl, index) => (
                    <SwiperSlide key={imgUrl} virtualIndex={index}>
                        <div className="swiper-zoom-container">
                            <img src={imgUrl} alt={`Sayfa ${index + 1}`} style={{ maxHeight: '100vh', maxWidth: '100%', objectFit: 'contain' }} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BookReaderPage;