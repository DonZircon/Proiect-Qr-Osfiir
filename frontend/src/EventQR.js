import React, { useEffect, useState } from 'react';
import { db, auth } from './firebase';
import { doc, onSnapshot, addDoc, collection } from "firebase/firestore";
import { QRCodeCanvas } from 'qrcode.react'; 
import { useNavigate, useLocation } from 'react-router-dom';

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

  if (!participationId) return <div className="p-10 text-center font-bold text-lg">Se generează biletul...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-sm w-full">
        <h3 className="text-gray-500 text-sm mb-2 uppercase tracking-wide">
            {location.state?.eventName || "Eveniment"}
        </h3>
        {status === 'pending' && (
            <>
                <h2 className="text-xl font-bold mb-4">Arată codul la intrare</h2>
                <div className="flex justify-center mb-4 border-4 border-gray-800 p-2 rounded-lg inline-block">
                    <QRCodeCanvas value={participationId} size={200} />
                </div>
                <p className="text-xs bg-gray-200 p-1 rounded font-mono mb-4">ID: {participationId.slice(0,6)}...</p>
                <p className="text-blue-500 animate-pulse font-semibold">Așteptăm validarea...</p>
            </>
        )}
        {status === 'active' && (
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-500">
                <h1 className="text-3xl font-bold text-green-600 mb-2">✅ AI INTRAT!</h1>
                <p className="text-green-800 font-medium">Cronometrul a pornit.</p>
                <div className="mt-4 text-4xl animate-bounce">⏳</div>
            </div>
        )}
        {status === 'completed' && (
            <div>
                <h1 className="text-2xl font-bold text-blue-700 mb-4">🏁 Finalizat</h1>
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <p className="text-gray-600 mb-1">Timp participare:</p>
                    <span className="text-4xl font-bold text-gray-800">{duration} s</span>
                </div>
                <button 
                    onClick={goHome}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full font-bold shadow-lg transition-transform transform hover:scale-105"
                >
                    Înapoi Acasă
                </button>
            </div>
        )}

      </div>
    </div>
  );
}

export default EventQR;