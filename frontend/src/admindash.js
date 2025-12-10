import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";

function AdminDash() {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "participations"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsersList(users);
    });

    return () => unsubscribe();
  }, []);

  const handleScanStart = async (id) => {
    const userRef = doc(db, "participations", id);
    await updateDoc(userRef, {
        status: 'active',
        startTime: new Date()
    });
  };
  const handleStop = async (id, startTime) => {
    const userRef = doc(db, "participations", id);
    const endTime = new Date();
    const start = startTime.toDate(); 
    const diffSeconds = Math.floor((endTime - start) / 1000);

    await updateDoc(userRef, {
        status: 'completed',
        endTime: endTime,
        duration: diffSeconds
    });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">🛡️ Panou Control Eveniment</h1>

      <div className="grid gap-4 max-w-4xl mx-auto">
        {usersList.map(user => (
          <div key={user.id} className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center border-l-4 border-blue-500">

            <div>
                <p className="font-bold text-lg">{user.userEmail}</p>
                <p className="text-sm text-gray-500">Status: 
                    <span className={`ml-2 font-bold ${
                        user.status === 'active' ? 'text-green-600' : 
                        user.status === 'completed' ? 'text-blue-600' : 'text-yellow-600'
                    }`}>
                        {user.status.toUpperCase()}
                    </span>
                </p>
            </div>

            <div>
                {user.status === 'pending' && (
                    <button 
                        onClick={() => handleScanStart(user.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow font-bold"
                    >
                        SCANNEAZĂ (Start)
                    </button>
                )}
                {user.status === 'active' && (
                    <button 
                        onClick={() => handleStop(user.id, user.startTime)}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded shadow font-bold animate-pulse"
                    >
                        STOP
                    </button>
                )}
                {user.status === 'completed' && (
                    <div className="text-center bg-gray-100 p-2 rounded">
                        <p className="text-xs text-gray-500">Timp total</p>
                        <p className="font-bold text-xl">{user.duration}s</p>
                    </div>
                )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDash;