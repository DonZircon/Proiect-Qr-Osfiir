import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // <--- 1. IMPORTĂ ASTA
import './home.css';

function Home() {
  const [data, setData] = useState(null);
  const navigate = useNavigate(); // <--- 2. ACTIVEAZĂ NAVIGAREA

  useEffect(() => {
    axios.get('https://qr-osfiir-backend.onrender.com/api/home')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Eroare la conectarea cu backend-ul:", error);
      });
  }, []);

  const events = [
    {
      id: 1,
      title: "Workshop Robotică",
      description: "Participă la workshopul nostru de robotică și descoperă cum să construiești propriul robot!",
      image: "https://tse1.mm.bing.net/th/id/OIP.Px-XJtp-OFWJ5FpJZ4uBTAHaEK?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
      buttonText: "Înscrie-te",
      buttonLink: "/event-qr"
    },
    {
      id: 2,
      title: "Hackathon 2024",
      description: "24 de ore de programare intensă, provocări interesante și premii valoroase.",
      image: "https://tse2.mm.bing.net/th/id/OIP.3h-ofYSOedxao0E6ru9NcQHaFN?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
      buttonText: "Înscrie-te",
      buttonLink: "/event-qr"
    },
    {
      id: 3,
      title: "Conferință Tech",
      description: "Speakeri de top din industrie vor prezenta cele mai noi tehnologii și tendințe.",
      image: "https://via.placeholder.com/400x300",
      buttonText: "Înscrie-te",
      buttonLink: "/event-qr"
    }
  ];

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <h1 className="home-title">
          {data ? data.title : "Te asteptam alaturi de noi!"}
        </h1>
        <p className="home-description">
          Te invităm să explorezi evenimentele noastre recente și să descoperi oportunitățile de implicare în comunitatea noastră.
        </p>
      
        <div className="events-section">
          <h2 className="events-heading">Evenimentele Noastre</h2>
          <div className="events-grid">
            {events.map(event => (
              <div key={event.id} className="event-card">
                <img src={event.image} alt={event.title} className="event-image" />
                <div className="event-content">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  
                  {/* --- AICI ERA PROBLEMA --- */}
                  <button 
                    className="event-button"
                    onClick={() => navigate(event.buttonLink)} 
                  >
                    {event.buttonText}
                  </button>
                  {/* ------------------------- */}

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;