import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase'; 
import './home.css';

function Home() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://qr-osfiir-backend.onrender.com/api/home')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Eroare la conectarea cu backend-ul:", error);
      });
  }, []);
  const handleInscriere = (link, title) => {
    if (auth.currentUser) {
      navigate(link, { state: { eventName: title } });
    } else {
      alert("Trebuie să fii autentificat pentru a te înscrie la eveniment!");
      navigate('/login');
    }
  };

  const events = [
    {
      id: 1,
      title: "Workshop Robotică",
      description: "Participă la workshopul nostru de robotică și descoperă cum să construiești propriul robot!",
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjTPJ3mrdxu9RQlhyPQhyQGTyGKovZjSzxUkdgwH4stjQjBasYOy_GUf0_bZI044s97AN_so79Cc85SGhdqq4kBTL_prsSzZKg3KTym7z30oHZK-gaoDFUKxIkcMx9Gxfr4DNroBkyyguY0K5NKT9wXuKrBelEB9q0jZMPepAVKX9-6h3uf4juJnKxAcjI/w640-h427/6.jpg",
      buttonText: "Înscrie-te",
      buttonLink: "/event-qr"
    },
    {
      id: 2,
      title: "Hackathon 2024",
      description: "24 de ore de programare intensă, provocări interesante și premii valoroase.",
      image: "https://www.industriambiente.com/media/uploads/noticias/HACKATHON_(1).jpg",
      buttonText: "Înscrie-te",
      buttonLink: "/event-qr"
    },
    {
      id: 3,
      title: "Conferință Tech",
      description: "Speakeri de top din industrie vor prezenta cele mai noi tehnologii și tendințe.",
      image: "https://i0.wp.com/thegadgetist.ro/wp-content/uploads/2020/09/evenimente-conferinte.jpg?resize=600%2C454&ssl=1",
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
                  
                  <button 
                    className="event-button"
                    onClick={() => handleInscriere(event.buttonLink, event.title)} 
                  >
                    {event.buttonText}
                  </button>

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