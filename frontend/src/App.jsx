// // import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// // import { Toaster } from 'react-hot-toast';
// // import { AuthProvider } from './context/AuthContext';
// // import ProtectedRoute from './components/ProtectedRoute';
// // import Login from './pages/Login';
// // import Register from './pages/Register';
// // import OAuthSuccess from './pages/OAuthSuccess';
// // import Dashboard from './pages/Dashboard';
// // import Problems from './pages/Problems';
// // import ProblemDetail from './pages/ProblemDetail';
// // import CompleteProfile from './pages/CompleteProfile';
// // import SubmissionDetail from './pages/SubmissionDetail';
// // import Leaderboard from './pages/Leaderboard';  // ← add this import

// // export default function App() {
// //   return (
// //     <BrowserRouter>
// //       <AuthProvider>
// //         <Toaster position="top-right" toastOptions={{ style: { background: '#111', color: '#fff', border: '1px solid #222' } }} />
// //         <Routes>
// //           <Route path="/" element={<Navigate to="/login" />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/register" element={<Register />} />
// //           <Route path="/oauth-success" element={<OAuthSuccess />} />

// //           {/* Protected routes */}
// //           <Route element={<ProtectedRoute />}>
// //             <Route path="/complete-profile" element={<CompleteProfile />} />
// //             <Route path="/problems" element={<Problems />} />
// //             <Route path="/problems/:id" element={<ProblemDetail />} />
// //             <Route path="/dashboard" element={<Dashboard />} />
// //             <Route path="/leaderboard" element={<Leaderboard />} />
// //             <Route path="/submissions/:id" element={<SubmissionDetail />} />
// //           </Route>
// //         </Routes>
// //       </AuthProvider>
// //     </BrowserRouter>
// //   );
// // }

// // import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// // import { Toaster } from 'react-hot-toast';
// // import { AuthProvider } from './context/AuthContext';
// // import ProtectedRoute from './components/ProtectedRoute';
// // import Login from './pages/Login';
// // import Register from './pages/Register';
// // import OAuthSuccess from './pages/OAuthSuccess';
// // import Dashboard from './pages/Dashboard';
// // import Problems from './pages/Problems';
// // import ProblemDetail from './pages/ProblemDetail';
// // import CompleteProfile from './pages/CompleteProfile';
// // import SubmissionDetail from './pages/SubmissionDetail';
// // import Leaderboard from './pages/Leaderboard';
// //  // add this import

// // // Inside <Routes>, add:

// // export default function App() {
// //   return (
// //     <BrowserRouter>
// //       <AuthProvider>
// //         <Toaster position="top-right" toastOptions={{ style: { background: '#111', color: '#fff', border: '1px solid #222' } }} />
// //         <Routes>
// //   <Route path="/" element={<Navigate to="/login" />} />
// //   <Route path="/login" element={<Login />} />
// //   <Route path="/register" element={<Register />} />
// //   <Route path="/complete-profile" element={<CompleteProfile />} />
// //   <Route path="/oauth-success" element={<OAuthSuccess />} />
// //   <Route path="/complete-profile" element={<ProtectedRoute><CompleteProfile /></ProtectedRoute>} />  {/* ADD THIS */}
// //   <Route path="/problems" element={<ProtectedRoute><Problems /></ProtectedRoute>} />
// //   <Route path="/problems/:id" element={<ProtectedRoute><ProblemDetail /></ProtectedRoute>} />
// //   <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
// //   <Route path="/submissions/:id" element={<SubmissionDetail />} />
// //   <Route path="/leaderboard" element={<Leaderboard />} />  
// // </Routes>
// //        </AuthProvider>
// //    </BrowserRouter>
// //   );
// // }


// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import OAuthSuccess from './pages/OAuthSuccess';
// import Dashboard from './pages/Dashboard';
// import Problems from './pages/Problems';
// import ProblemDetail from './pages/ProblemDetail';
// import CompleteProfile from './pages/CompleteProfile';
// import SubmissionDetail from './pages/SubmissionDetail';
// import Leaderboard from './pages/Leaderboard';   // ✅ IMPORTANT

// export default function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <Toaster position="top-right" toastOptions={{ style: { background: '#111', color: '#fff', border: '1px solid #222' } }} />
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/oauth-success" element={<OAuthSuccess />} />

//           {/* Protected routes */}
//           <Route element={<ProtectedRoute />}>
//             <Route path="/complete-profile" element={<CompleteProfile />} />
//             <Route path="/problems" element={<Problems />} />
//             <Route path="/problems/:id" element={<ProblemDetail />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/leaderboard" element={<Leaderboard />} />   {/* ✅ ADDED */}
//             <Route path="/submissions/:id" element={<SubmissionDetail />} />
//           </Route>
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import OAuthSuccess from './pages/OAuthSuccess';
import Dashboard from './pages/Dashboard';
import Problems from './pages/Problems';
import ProblemDetail from './pages/ProblemDetail';
import CompleteProfile from './pages/CompleteProfile';
import SubmissionDetail from './pages/SubmissionDetail';
import Leaderboard from './pages/Leaderboard';
import LandingPage from "./pages/LandingPage";
import SolvedProblems from './pages/SolvedProblems'; // ✅ ADD THIS

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{ style: { background: '#111', color: '#fff', border: '1px solid #222' } }} />
        <Routes>
          <Route path="/" element={<LandingPage />} />         {/* ✅ LANDING PAGE */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/problems/:id" element={<ProblemDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/submissions/:id" element={<SubmissionDetail />} />
            <Route path="/solved-problems" element={<SolvedProblems />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}