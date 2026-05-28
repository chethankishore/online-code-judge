import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  useEffect(() => {
    refreshUser()
      .then((user) => {
        if (user?.profileComplete) {
          toast.success('Welcome back! 👋');
          navigate('/dashboard');
        } else {
          navigate('/complete-profile'); // new Google users
        }
      })
      .catch(() => {
        navigate('/login?error=oauth_failed');
      });
  }, [navigate, refreshUser]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.spinner}></div>
        <h1 style={styles.title}>Authenticating</h1>
        <p style={styles.subtitle}>Please wait while we securely sign you in...</p>
        <div style={styles.codeBlock}>Initializing OAuth session...</div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Fira Code', monospace", padding: '20px' },
  card: { width: '100%', maxWidth: '420px', background: '#111', border: '1px solid #222', borderRadius: '24px', padding: '50px 40px', textAlign: 'center' },
  spinner: { width: '70px', height: '70px', border: '5px solid #1f1f1f', borderTop: '5px solid #00ff88', borderRadius: '50%', margin: '0 auto 30px', animation: 'spin 1s linear infinite' },
  title: { color: '#fff', fontSize: '32px', marginBottom: '12px', fontWeight: 700 },
  subtitle: { color: '#777', fontSize: '15px', lineHeight: 1.7, marginBottom: '30px' },
  codeBlock: { background: '#181818', border: '1px solid #2a2a2a', padding: '14px', borderRadius: '12px', color: '#00ff88', fontSize: '14px' },
};