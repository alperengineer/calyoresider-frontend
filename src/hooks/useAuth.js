import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../services/api'; // api.js'teki login ile çakışmaması için yeniden adlandırdık

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Sayfa yenilendiğinde token'ın hala geçerli olup olmadığını kontrol edebiliriz
    // (Bu kısım daha ileri seviye bir özellik olarak eklenebilir)

    const login = async (username, password) => {
        try {
            const response = await apiLogin({ username, password });

            // ### KRİTİK DÜZELTME BURADA ###
            // Backend 'token' gönderiyor, 'jwt' değil.
            const newToken = response.data.token;

            if (newToken) {
                setToken(newToken);
                localStorage.setItem('token', newToken);
                navigate('/admin/dashboard');
            } else {
                // Beklenmedik bir durum, token gelmediyse hata fırlat
                throw new Error("Token alınamadı.");
            }

        } catch (error) {
            console.error("Giriş başarısız:", error);
            throw error; // Hatanın LoginPage'de yakalanabilmesi için tekrar fırlatıyoruz
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        navigate('/login');
    };

    const value = { token, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};