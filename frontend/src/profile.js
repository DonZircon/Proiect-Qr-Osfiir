import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import './profile.css';
export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Se încarcă profilul...</p>
      </div>
    );
  }

  return (
    <div className='container-profile'>
      <div className="profile-card">
        <div className="avatar" id="avatar">I</div>
         <div className="info-section">
            <div className="info-item">
                <div className="info-label">Email</div>
                <div className="info-value" id="emailDisplay">{user.email}</div>
            </div>
            <div className="info-item">
                <div className="info-label">Status</div>
                <div className="info-value" id="statusDisplay">Activ</div>
            </div>
        </div>
      </div>
    </div>
    
  );
}