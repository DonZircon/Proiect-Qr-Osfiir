import React, {useState, useEffect} from "react";
import axios from "axios";
import './about.css';

function About() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('https://qr-osfiir-backend.onrender.com/api/about')
            .then(response => {
                setLoading(false);
            })
            .catch(error => {
                console.error("Eroare la conectarea cu backend-ul:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="about-wrapper">
            <div className="about-container">
                <h1 className="about-title">Despre Noi</h1>
                
                {loading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p className="loading-text">Se încarcă datele...</p>
                    </div>
                ) : (
                    <div className="about-content">
                        {/* Contact Information Section */}
                        <div className="contact-section">
                            <h2 className="section-title">Contactează-ne</h2>
                            <div className="contact-grid">
                                <div className="contact-card">
                                    <div className="contact-icon-large">📧</div>
                                    <h3>Email</h3>
                                    <a href="mailto:contact@osfiir.ro" className="contact-link">
                                        contact@osfiir.ro
                                    </a>
                                </div>

                                <div className="contact-card">
                                    <div className="contact-icon-large">📞</div>
                                    <h3>Telefon</h3>
                                    <a href="tel:+40123456789" className="contact-link">
                                        +40 123 456 789
                                    </a>
                                </div>

                                <div className="contact-card">
                                    <div className="contact-icon-large">📍</div>
                                    <h3>Adresă</h3>
                                    <p className="contact-text">
                                        Splaiul Independenţei nr. 313<br />
                                        Sector 6, București<br/>
                                        România
                                    </p>
                                </div>

                                <div className="contact-card">
                                    <div className="contact-icon-large">🕒</div>
                                    <h3>Program</h3>
                                    <p className="contact-text">
                                        Luni - Vineri<br />
                                        9:00 - 17:00
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Google Maps Section */}
                        <div className="map-section">
                            <h2 className="section-title">Locația Noastră</h2>
                            <div className="map-container">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.8219416346477!2d26.10252431572868!3d44.43910990712804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff4770adb5b7%3A0x58147f185db0ca19!2sBucharest%2C%20Romania!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="OSFIIR Location"
                                    className="google-map"
                                ></iframe>
                            </div>
                        </div>

                        {/* Social Media Section */}
                        <div className="social-section">
                            <h2 className="section-title">Urmărește-ne</h2>
                            <div className="social-links-large">
                                <a href="https://www.facebook.com/share/1Ce5x2sf5s/" target="_blank" rel="noopener noreferrer" className="social-card">
                                    <span className="social-icon">📘</span>
                                    <span className="social-name">Facebook</span>
                                </a>
                                <a href="https://www.instagram.com/osfiir?igsh=cGd4MXQ2dnk0d3gw" target="_blank" rel="noopener noreferrer" className="social-card">
                                    <span className="social-icon">📷</span>
                                    <span className="social-name">Instagram</span>
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-card">
                                    <span className="social-icon">💼</span>
                                    <span className="social-name">LinkedIn</span>
                                </a>
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-card">
                                    <span className="social-icon">💻</span>
                                    <span className="social-name">GitHub</span>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default About;