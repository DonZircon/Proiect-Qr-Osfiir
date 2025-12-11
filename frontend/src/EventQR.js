import React, { useEffect, useState } from 'react';
import { db, auth } from './firebase';
import { doc, onSnapshot, addDoc, collection } from "firebase/firestore";
import { QRCodeCanvas } from 'qrcode.react'; 
import { useNavigate, useLocation } from 'react-router-dom';
import './eventQR.css';

function EventQR() {
  const [participationId, setParticipationId] = useState(null);
  const [status, setStatus] = useState('loading'); 
  const [duration, setDuration] = useState(0);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const createParticipation = async () => {
        if (!auth.currentUser) return;
        const eventNameFromHome = location.state?.eventName || "Eveniment General";

        try {
            const docRef = await addDoc(collection(db, "participations"), {
                userId: auth.currentUser.uid,
                userEmail: auth.currentUser.email,
                eventName: eventNameFromHome,
                status: 'pending', 
                createdAt: new Date()
            });
            setParticipationId(docRef.id);
            const unsubscribe = onSnapshot(doc(db, "participations", docRef.id), (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setStatus(data.status);
                    if (data.duration) setDuration(data.duration);
                }
            });

            return () => unsubscribe();
        } catch (error) {
            console.error("Eroare la creare:", error);
        }
    };

    createParticipation();
  }, [location.state]);

  const goHome = () => navigate('/');

  if (!participationId) {
    return (
      <div className="event-qr-wrapper">
        <div className="loading-container">
          <p>Se generează biletul...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="event-qr-wrapper">
      <div className="event-qr-content">
        
        <h3 className="event-name">{location.state?.eventName || "Eveniment"}</h3>

        {status === 'pending' && (
          <>
            <h2 className="qr-title">Arată codul la intrare</h2>
            
            <div className="qr-code-container">
              <QRCodeCanvas value={participationId} size={250} level="H" />
            </div>

            <p className="qr-id">ID: {participationId.slice(0, 8)}...</p>
            <p className="status-text">Așteptăm validarea...</p>
          </>
        )}

        {status === 'active' && (
          <>
            <h1 className="status-title success">✅ AI INTRAT!</h1>
            <p className="status-message">Cronometrul a pornit.</p>
          </>
        )}

        {status === 'completed' && (
          <>
            <h1 className="status-title">🏁 Finalizat</h1>
            <div className="duration-box">
              <p>Timp participare:</p>
              <span className="duration-time">{duration} s</span>
            </div>
            <button onClick={goHome} className="home-button">
              Înapoi Acasă
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default EventQR;