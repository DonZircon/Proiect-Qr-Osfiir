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
  const formatTime = (seconds) => {
    if (!seconds) return "-";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">
        🛡️ Panou Control <span className="text-blue-600">Admin</span>
      </h1>

      <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b">
                <tr>
                    <th className="px-6 py-4">Utilizator</th>
                    <th className="px-6 py-4">Eveniment</th>
                    <th className="px-6 py-4">Data & Ora</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Durată</th>
                    <th className="px-6 py-4 text-center">Acțiuni</th>
                </tr>
            </thead>
            <tbody>
                {usersList.map((user) => (
                    <tr key={user.id} className="bg-white border-b hover:bg-gray-50 transition duration-150">
                        
                        <td className="px-6 py-4 font-bold text-gray-800">
                            {user.userEmail}
                        </td>

                        <td className="px-6 py-4 text-gray-600 font-medium">
                            {user.eventName || "General"}
                        </td>

                        <td className="px-6 py-4">
                            {user.createdAt?.toDate().toLocaleDateString('ro-RO')} <br/>
                            <span className="text-xs text-gray-400">
                                {user.createdAt?.toDate().toLocaleTimeString('ro-RO')}
                            </span>
                        </td>

                        <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                user.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 
                                user.status === 'completed' ? 'bg-blue-100 text-blue-700 border-blue-200' : 
                                'bg-yellow-100 text-yellow-700 border-yellow-200'
                            }`}>
                                {user.status.toUpperCase()}
                            </span>
                        </td>

                        <td className="px-6 py-4 font-bold text-gray-700">
                            {user.status === 'completed' ? formatTime(user.duration) : 
                             user.status === 'active' ? <span className="animate-pulse text-green-500">● În curs...</span> : 
                             "-"}
                        </td>

                        <td className="px-6 py-4 text-center">
                            {user.status === 'pending' && (
                                <button 
                                    onClick={() => handleScanStart(user.id)}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-md text-xs font-bold transition"
                                >
                                    START
                                </button>
                            )}

                            {user.status === 'active' && (
                                <button 
                                    onClick={() => handleStop(user.id, user.startTime)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md text-xs font-bold animate-pulse"
                                >
                                    STOP
                                </button>
                            )}

                            {user.status === 'completed' && (
                                <span className="text-gray-400 text-xs italic">Finalizat</span>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        
        {usersList.length === 0 && (
            <div className="p-10 text-center text-gray-400 italic">
                Niciun participant înregistrat momentan.
            </div>
        )}
      </div>
    </div>
  );
}

export default AdminDash;