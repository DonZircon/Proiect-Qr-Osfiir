import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import './admindash.css';

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
  const getStatusClass = (status) => {
      switch(status) {
          case 'active': return 'status-active';
          case 'completed': return 'status-completed';
          default: return 'status-pending';
      }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">
       Panou Control Admin
      </h1>

      <div className="table-wrapper">
        <table className="admin-table">
            <thead className="table-head">
                <tr>
                    <th className="table-header-cell">Utilizator</th>
                    <th className="table-header-cell">Eveniment</th>
                    <th className="table-header-cell">Data & Ora</th>
                    <th className="table-header-cell">Status</th>
                    <th className="table-header-cell">Durată</th>
                    <th className="table-header-cell" style={{textAlign: 'center'}}>Acțiuni</th>
                </tr>
            </thead>
            <tbody>
                {usersList.map((user) => (
                    <tr key={user.id} className="table-row">
                        
                        <td className="table-cell user-email">
                            {user.userEmail}
                        </td>

                        <td className="table-cell event-name">
                            {user.eventName || "General"}
                        </td>

                        <td className="table-cell">
                            <span className="date-text">{user.createdAt?.toDate().toLocaleDateString('ro-RO')}</span>
                            <span className="time-text">
                                {user.createdAt?.toDate().toLocaleTimeString('ro-RO')}
                            </span>
                        </td>

                        <td className="table-cell">
                            <span className={`status-badge ${getStatusClass(user.status)}`}>
                                {user.status.toUpperCase()}
                            </span>
                        </td>

                        <td className="table-cell duration-text">
                            {user.status === 'completed' ? formatTime(user.duration) : 
                             user.status === 'active' ? <span className="pulse-text">● În curs...</span> : 
                             "-"}
                        </td>

                        <td className="table-cell" style={{textAlign: 'center'}}>
                            {user.status === 'pending' && (
                                <button 
                                    onClick={() => handleScanStart(user.id)}
                                    className="btn btn-start"
                                >
                                    START
                                </button>
                            )}

                            {user.status === 'active' && (
                                <button 
                                    onClick={() => handleStop(user.id, user.startTime)}
                                    className="btn btn-stop pulse-btn"
                                >
                                    STOP
                                </button>
                            )}

                            {user.status === 'completed' && (
                                <span className="text-completed">Finalizat</span>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        
        {usersList.length === 0 && (
            <div className="empty-state">
                Niciun participant înregistrat momentan.
            </div>
        )}
      </div>
    </div>
  );
}

export default AdminDash;