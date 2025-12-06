import React, {useState, useEffect} from "react";
import axios from "axios";
function About() {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        // Folosim AXIOS pentru a cere date de la serverul nostru (portul 5000)
        axios.get('http://localhost:5000/api/about')
            .then(response => {
                setInfo(response.data);
            })
            .catch(error => {
                console.error("Eroare la conectarea cu backend-ul:", error);
            });
    }, []);
    return (
        <div style={{padding: '20px', textAlign: 'center'}}>
            <h1>Despre Noi</h1>
            {info ? (
                <div style={{border: '1px solid #ccc', padding: '10px', marginTop: '20px'}}>
                    <h2>{info.title}</h2>
                    <p>{info.description}</p>
                    <p>Contact: {info.contact}</p>
                </div>
            ) : (
                <p>Se încarcă datele din backend...</p>
            )}
        </div>
    );
}
export default About;