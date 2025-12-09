import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Hai vasile odata cu css ala</h1>
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