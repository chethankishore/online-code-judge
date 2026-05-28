import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';

const AuthContext = createContext();

const PUBLIC_ROUTES = ['/', '/login', '/register', '/oauth-success'];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const hasFetched = useRef(false); // ✅ prevents double-fetch from StrictMode

  const location = useLocation();

  useEffect(() => {
    // Skip on public routes
    if (PUBLIC_ROUTES.includes(location.pathname)) {
      setLoading(false);
      setInitialCheckDone(true);
      return;
    }

    // Skip if already fetched (StrictMode double-invoke guard)
    if (hasFetched.current) return;
    hasFetched.current = true;

    api.get('/auth/profile')
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => {
        setLoading(false);
        setInitialCheckDone(true);
      });
  }, [location.pathname]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    setUser(res.data.user);
    return res.data;
  };

  const register = async (username, email, password, firstName, lastName) => {
    const res = await api.post('/auth/register', { username, email, password, firstName, lastName });
    setUser(res.data.user);
    return res.data;
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const res = await api.get('/auth/profile');
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, initialCheckDone, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
// // import { createContext, useContext, useState, useEffect } from 'react';
// // import api from '../api/axios';

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     api.get('/auth/profile')
// //       .then(res => setUser(res.data.user))
// //       .catch(() => setUser(null))
// //       .finally(() => setLoading(false));
// //   }, []);

// //   const login = async (email, password) => {
// //     const res = await api.post('/auth/login', { email, password });
// //     setUser(res.data.user);
// //     return res.data;
// //   };

// //   const register = async (username, email, password, firstName, lastName) => {
// //     const res = await api.post('/auth/register', { username, email, password, firstName, lastName });
// //     setUser(res.data.user);
// //     return res.data;
// //   };

// //   const logout = async () => {
// //     await api.post('/auth/logout');
// //     setUser(null);
// //   };

// //   const refreshUser = async () => {
// //     try {
// //       const res = await api.get('/auth/profile');
// //       setUser(res.data.user);
// //     } catch (err) {
// //       setUser(null);
// //     }
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);
// // import { createContext, useContext, useState, useEffect } from 'react';
// // import api from '../api/axios';

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [initialCheckDone, setInitialCheckDone] = useState(false); // ✅ ADD THIS

// //   useEffect(() => {
// //     api.get('/auth/profile')
// //       .then(res => setUser(res.data.user))
// //       .catch(() => setUser(null))   // ✅ silently fail — no toast here
// //       .finally(() => {
// //         setLoading(false);
// //         setInitialCheckDone(true);  // ✅ mark initial check done
// //       });
// //   }, []);

// //   const login = async (email, password) => {
// //     const res = await api.post('/auth/login', { email, password });
// //     setUser(res.data.user);
// //     return res.data;
// //   };

// //   const register = async (username, email, password, firstName, lastName) => {
// //     const res = await api.post('/auth/register', { username, email, password, firstName, lastName });
// //     setUser(res.data.user);
// //     return res.data;
// //   };

// //   const logout = async () => {
// //     await api.post('/auth/logout');
// //     setUser(null);
// //   };

// //   const refreshUser = async () => {
// //     try {
// //       const res = await api.get('/auth/profile');
// //       setUser(res.data.user);
// //     } catch (err) {
// //       setUser(null);
// //     }
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, loading, initialCheckDone, login, register, logout, refreshUser }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);
// // import { createContext, useContext, useState, useEffect } from 'react';
// // import api from '../api/axios';

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     api.get('/auth/profile')
// //       .then(res => setUser(res.data.user))
// //       .catch(() => setUser(null))
// //       .finally(() => setLoading(false));
// //   }, []);

// //   const login = async (email, password) => {
// //     const res = await api.post('/auth/login', { email, password });
// //     setUser(res.data.user);
// //     return res.data;
// //   };

// //   const register = async (username, email, password, firstName, lastName) => {
// //     const res = await api.post('/auth/register', { username, email, password, firstName, lastName });
// //     setUser(res.data.user);
// //     return res.data;
// //   };

// //   const logout = async () => {
// //     await api.post('/auth/logout');
// //     setUser(null);
// //   };

// //   const refreshUser = async () => {
// //     try {
// //       const res = await api.get('/auth/profile');
// //       setUser(res.data.user);
// //     } catch (err) {
// //       setUser(null);
// //     }
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);
// import { createContext, useContext, useState, useEffect } from 'react';
// import api from '../api/axios';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [initialCheckDone, setInitialCheckDone] = useState(false); // ✅ ADD THIS

//   useEffect(() => {
//     api.get('/auth/profile')
//       .then(res => setUser(res.data.user))
//       .catch(() => setUser(null))   // ✅ silently fail — no toast here
//       .finally(() => {
//         setLoading(false);
//         setInitialCheckDone(true);  // ✅ mark initial check done
//       });
//   }, []);

//   const login = async (email, password) => {
//     const res = await api.post('/auth/login', { email, password });
//     setUser(res.data.user);
//     return res.data;
//   };

//   const register = async (username, email, password, firstName, lastName) => {
//     const res = await api.post('/auth/register', { username, email, password, firstName, lastName });
//     setUser(res.data.user);
//     return res.data;
//   };

//   const logout = async () => {
//     await api.post('/auth/logout');
//     setUser(null);
//   };

//   const refreshUser = async () => {
//     try {
//       const res = await api.get('/auth/profile');
//       setUser(res.data.user);
//     } catch (err) {
//       setUser(null);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, initialCheckDone, login, register, logout, refreshUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);