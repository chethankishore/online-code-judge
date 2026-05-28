import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function SubmissionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const res = await api.get(`/submissions/${id}`);
        setSubmission(res.data.submission);
      } catch (err) {
        console.error(err);
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchSubmission();
  }, [id]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) return <div style={styles.loading}>Loading submission...</div>;
  if (!submission) return <div style={styles.loading}>Not found</div>;

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <span style={styles.logo}>{'</>'} CodeJudge</span>
        <div style={styles.navRight}>
          <button onClick={() => navigate('/problems')} style={styles.navBtn}>Problems</button>
          <button onClick={() => navigate('/dashboard')} style={styles.navBtn}>Dashboard</button>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </nav>

      <div style={styles.main}>
        <h1 style={styles.title}>Submission Details</h1>
        <div style={styles.info}>
          <p><strong>Problem:</strong> {submission.problemId?.title}</p>
          <p><strong>Language:</strong> {submission.language}</p>
          <p><strong>Status:</strong> <span style={{ color: submission.status === 'Accepted' ? '#00ff88' : '#ff4444' }}>{submission.status}</span></p>
          <p><strong>Execution Time:</strong> {submission.executionTime} ms</p>
          <p><strong>Submitted at:</strong> {new Date(submission.submittedAt).toLocaleString()}</p>
        </div>

        <h3>Test Results</h3>
        {submission.testResults?.map((tc, i) => (
          <div key={i} style={{ ...styles.testCase, borderColor: tc.passed ? '#00ff8833' : '#ff444433' }}>
            <div><strong>Test Case {i+1}</strong> {tc.passed ? '✅' : '❌'}</div>
            <div><strong>Got:</strong> <pre>{tc.output || '(empty)'}</pre></div>
            <div><strong>Expected:</strong> <pre>{tc.expectedOutput || '(empty)'}</pre></div>
            {tc.error && <div><strong>Error:</strong> <pre style={{ color: '#ff6666' }}>{tc.error}</pre></div>}
          </div>
        ))}

        <h3>Your Code</h3>
        <pre style={styles.code}>{submission.code}</pre>

        <button onClick={() => navigate(-1)} style={styles.backBtn}>← Back</button>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Fira Code', monospace" },
  nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', borderBottom: '1px solid #1a1a1a', background: '#0d0d0d' },
  logo: { color: '#00ff88', fontSize: '18px', fontWeight: 700 },
  navRight: { display: 'flex', gap: '12px' },
  navBtn: { background: 'transparent', border: '1px solid #222', color: '#aaa', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer' },
  logoutBtn: { background: 'transparent', border: '1px solid #ff444433', color: '#ff4444', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer' },
  main: { maxWidth: '900px', margin: '0 auto', padding: '40px 24px' },
  title: { color: '#fff', fontSize: '28px', marginBottom: '24px' },
  info: { background: '#111', padding: '16px', borderRadius: '8px', marginBottom: '24px', color: '#aaa' },
  testCase: { border: '1px solid', borderRadius: '8px', padding: '12px', marginBottom: '12px', background: '#111' },
  code: { background: '#1a1a1a', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '13px', color: '#d4d4d4' },
  backBtn: { background: '#00ff8822', border: '1px solid #00ff8844', color: '#00ff88', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', marginTop: '24px' },
  loading: { textAlign: 'center', padding: '60px', color: '#aaa' },
};