import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Folosim AXIOS pentru a cere date de la serverul nostru (portul 5000)
    axios.get('http://localhost:5000/api/home')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Eroare la conectarea cu backend-ul:", error);
      });
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Pagina Home</h1>
      {data ? (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
            <h2>{data.title}</h2>
            <p>{data.message}</p>
        </div>
      ) : (
        <p>Se încarcă datele din backend...</p>
      )}
    </div>
  );
}

export default Home;