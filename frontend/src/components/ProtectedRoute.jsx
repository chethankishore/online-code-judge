// // ✅ Fixed ProtectedRoute.jsx
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// export default function ProtectedRoute() {
//   const { user, loading } = useAuth();

//   if (loading) return <div style={{ minHeight: '100vh', background: '#0a0a0a' }} />;

//   return user ? <Outlet /> : <Navigate to="/login" />;
// }


import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  // ✅ Wait for auth check to complete before deciding
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#333',
        fontFamily: 'Fira Code, monospace',
        fontSize: 14,
      }}>
        {/* Silent loading — no text needed, just blocks redirect */}
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}