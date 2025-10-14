import React from 'react';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 bg-dark text-white">
            <div className="container-fluid d-flex justify-content-between align-items-center px-4">
                <p className="mb-0" style={{ textAlign: 'left' }}>
                    &copy; 2025 Çal Yöresi Yardımlaşma ve Dayanışma Derneği. Tüm Hakları Saklıdır.
                </p>
                <div className="social-icons">
                    <a href="https://www.facebook.com/profile.php?id=61572683393632" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook fa-2x"></i>
                    </a>
                    <a href="https://x.com/CalYoresiDer" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter fa-2x"></i>
                    </a>
                    <a href="https://www.instagram.com/calyoresidernegi/" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram fa-2x"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;