import React, { useEffect, useState } from 'react';
import { db, auth } from './firebase';
import { doc, onSnapshot, addDoc, collection } from "firebase/firestore";
import { QRCodeCanvas } from 'qrcode.react'; // Asigură-te că ai instalat: npm install qrcode.react
import { useNavigate } from 'react-router-dom';

function EventQR() {
  const [participationId, setParticipationId] = useState(null);
  const [status, setStatus] = useState('loading'); // pending, active, completed
  const [duration, setDuration] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const createParticipation = async () => {
        if (!auth.currentUser) return;

        // 1. Creăm o intrare nouă în baza de date când intrăm pe pagină
        // Asta rezolvă punctul 6: de fiecare dată e un eveniment nou.
        try {
            const docRef = await addDoc(collection(db, "participations"), {
                userId: auth.currentUser.uid,
                userEmail: auth.currentUser.email,
                status: 'pending', // Așteaptă scanarea
                createdAt: new Date()
            });
            setParticipationId(docRef.id);

            // 2. Pornim ASCULTĂTORUL pe acest document specific
            // Aici e magia: Când adminul schimbă ceva, funcția asta rulează singură!
            const unsubscribe = onSnapshot(doc(db, "participations", docRef.id), (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setStatus(data.status);
                    if (data.duration) setDuration(data.duration);
                }
            });

            return () => unsubscribe(); // Curățenie la ieșire
        } catch (error) {
            console.error("Eroare la creare:", error);
        }
    };

    createParticipation();
  }, []);

  // Funcție pentru a merge acasă
  const goHome = () => navigate('/');

  if (!participationId) return <div className="p-10 text-center">Se generează codul...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-sm w-full">
        
        {/* STAREA 1: AȘTEPTARE (Pending) */}
        {status === 'pending' && (
            <>
                <h2 className="text-xl font-bold mb-4">Arată acest cod la intrare</h2>
                <div className="flex justify-center mb-4">
                    {/* Codul QR conține ID-ul documentului ca Adminul să știe ce să caute */}
                    <QRCodeCanvas value={participationId} size={200} />
                </div>
                <p className="text-gray-500 animate-pulse">Așteptăm scanarea de către Admin...</p>
            </>
        )}

        {/* STAREA 2: ACTIV (Ai intrat) */}
        {status === 'active' && (
            <div className="bg-green-100 p-6 rounded-lg border-2 border-green-500">
                <h1 className="text-3xl font-bold text-green-700 mb-2">✅ AI INTRAT!</h1>
                <p className="text-green-800">Evenimentul este în desfășurare.</p>
                <div className="mt-4 text-4xl animate-bounce">⏳</div>
            </div>
        )}

        {/* STAREA 3: FINALIZAT (Stop) */}
        {status === 'completed' && (
            <div>
                <h1 className="text-2xl font-bold text-blue-700 mb-4">🏁 Eveniment Finalizat</h1>
                <p className="text-lg mb-6">
                    Ai participat timp de: <br/>
                    <span className="text-3xl font-bold text-black">{duration} secunde</span>
                </p>
                <button 
                    onClick={goHome}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full font-bold"
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