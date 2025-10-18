import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL + '/api',
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Auth
export const login = (credentials) => apiClient.post('/auth/login', credentials);

// Public API
export const getSonHaberler = () => apiClient.get('/haberler/son-haberler');
export const getTumHaberler = () => apiClient.get('/haberler');
export const getHaberDetay = (id) => apiClient.get(`/haberler/${id}`);
export const getYaklasanEtkinlikler = () => apiClient.get('/etkinlikler/yaklasan');
export const getTumEtkinlikler = () => apiClient.get('/etkinlikler');
export const getEtkinlikDetay = (id) => apiClient.get(`/etkinlikler/${id}`);
export const getAyarlar = () => apiClient.get('/ayarlar');
export const postIletisimFormu = (formData) => apiClient.post('/iletisim', formData);
export const getTumYayinlar = () => apiClient.get('/yayinlar');
export const getTumBolgeYayinlari = () => apiClient.get('/bolge-yayinlari');
export const createBolgeYayin = (yayin) => apiClient.post('/bolge-yayinlari', yayin);
export const updateBolgeYayin = (id, yayin) => apiClient.put(`/bolge-yayinlari/${id}`, yayin);
export const deleteBolgeYayin = (id) => apiClient.delete(`/bolge-yayinlari/${id}`);

// Admin API - Haberler
export const createHaber = (haber) => apiClient.post('/admin/haberler', haber);
export const updateHaber = (id, haber) => apiClient.put(`/admin/haberler/${id}`, haber);
export const deleteHaber = (id) => apiClient.delete(`/admin/haberler/${id}`);

// Admin API - Etkinlikler
export const createEtkinlik = (etkinlik) => apiClient.post('/admin/etkinlikler', etkinlik);
export const updateEtkinlik = (id, etkinlik) => apiClient.put(`/admin/etkinlikler/${id}`, etkinlik);
export const deleteEtkinlik = (id) => apiClient.delete(`/admin/etkinlikler/${id}`);

// Admin API - Yayınlar (YENİ)
export const createYayin = (yayin) => apiClient.post('/admin/yayinlar', yayin);
export const updateYayin = (id, yayin) => apiClient.put(`/admin/yayinlar/${id}`, yayin);
export const deleteYayin = (id) => apiClient.delete(`/admin/yayinlar/${id}`);

export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/files/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

// Admin API - Ayarlar
export const updateAyarlar = (ayarlar) => apiClient.put('/admin/ayarlar', ayarlar);