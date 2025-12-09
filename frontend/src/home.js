import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';
function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('https://qr-osfiir-backend.onrender.com/api/home')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Eroare la conectarea cu backend-ul:", error);
      });
  }, []);

 return (
    <div className="home-container">
      <h1 className="home-title">
        {data ? data.title : "Se încarcă..."}
      </h1>
      <p className="home-description">
        Hai vasile violeaza acest prioect cu css
      </p>
    </div>
  );
}

export default Home;