// // // import { useState, useEffect, useRef } from 'react';
// // // import { useParams, useNavigate } from 'react-router-dom';
// // // import api from '../api/axios';
// // // import { useAuth } from '../context/AuthContext';
// // // import toast from 'react-hot-toast';

// // // const starterTemplates = {
// // //   javascript: `// Write your solution here\nfunction solution() {\n  \n}`,
// // //   python: `# Write your solution here\ndef solution():\n    pass`,
// // //   cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n  // Write your solution here\n  return 0;\n}`,
// // //   java: `import java.util.*;\npublic class Solution {\n  public static void main(String[] args) {\n    // Write your solution here\n  }\n}`,
// // // };

// // // const isStarterCode = (code, problem) => {
// // //   const stripped = code.replace(/\s/g, '');
// // //   const genericMatch = Object.values(starterTemplates).some(
// // //     (t) => t.replace(/\s/g, '') === stripped
// // //   );
// // //   if (genericMatch) return true;
// // //   if (problem?.starterCode) {
// // //     const problemMatch = Object.values(problem.starterCode).some(
// // //       (t) => t && t.replace(/\s/g, '') === stripped
// // //     );
// // //     if (problemMatch) return true;
// // //   }
// // //   return false;
// // // };

// // // const difficultyColor = (d) => {
// // //   if (d === 'Easy') return '#00ff88';
// // //   if (d === 'Medium') return '#ffaa00';
// // //   return '#ff4444';
// // // };

// // // const verdictColor = (v) =>
// // //   v === 'Accepted' ? '#00ff88' : v === 'Error' ? '#ff8800' : '#ff4444';

// // // export default function ProblemDetail() {
// // //   const { id } = useParams();
// // //   const navigate = useNavigate();
// // //   const { user } = useAuth();
// // //   const textareaRef = useRef(null);

// // //   const [problem, setProblem] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [code, setCode] = useState(starterTemplates.javascript);
// // //   const [language, setLanguage] = useState('javascript');
// // //   const [running, setRunning] = useState(false);
// // //   const [submitting, setSubmitting] = useState(false);
// // //   const [result, setResult] = useState(null);
// // //   const [activeTab, setActiveTab] = useState('description');
// // //   const [activeResultTab, setActiveResultTab] = useState('testcases');

// // //   useEffect(() => {
// // //     fetchProblem();
// // //   }, [id]);

// // //   const fetchProblem = async () => {
// // //     try {
// // //       const res = await api.get(`/problems/${id}`);
// // //       const p = res.data.problem;
// // //       setProblem(p);
// // //       const starter = p.starterCode?.[language] || starterTemplates[language];
// // //       setCode(starter);
// // //     } catch (err) {
// // //       toast.error('Failed to load problem');
// // //       navigate('/problems');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleLanguageChange = (lang) => {
// // //     setLanguage(lang);
// // //     const starter = problem?.starterCode?.[lang] || starterTemplates[lang];
// // //     setCode(starter);
// // //     setResult(null);
// // //   };

// // //   const formatInput = (input) => {
// // //     if (!input) return '';
// // //     if (input.includes('[') || input.includes(',')) {
// // //       return input.replace(/[\[\]]/g, '').replace(/,/g, ' ').trim();
// // //     }
// // //     return input;
// // //   };

// // //   const callLambda = async ({ testCases }) => {
// // //     const formattedTestCases = testCases.map(tc => ({
// // //       id: tc.id,
// // //       input: formatInput(tc.input),
// // //       expected: tc.expected,
// // //     }));
    
// // //     const res = await api.post('/submissions/run', {
// // //       language,
// // //       code,
// // //       input: problem?.sampleInput || '',
// // //       testCases: formattedTestCases,
// // //     });
// // //     return res.data;
// // //   };

// // //   const handleRun = async () => {
// // //     if (!code.trim()) return toast.error('Write some code first');
// // //     if (isStarterCode(code, problem)) return toast.error('Please write your solution before running');

// // //     setRunning(true);
// // //     setResult(null);
// // //     setActiveResultTab('testcases');

// // //     try {
// // //       const data = await callLambda({
// // //         testCases: [
// // //           {
// // //             id: 'tc1',
// // //             input: problem?.sampleInput || '',
// // //             expected: problem?.sampleOutput || '',
// // //           },
// // //         ],
// // //       });

// // //       const testResults = data.results || [];
// // //       const fixedResults = testResults.map(tc => ({
// // //         passed: tc.passed === true,
// // //         input: tc.input,
// // //         output: tc.actual || tc.output,
// // //         expected: tc.expected,
// // //         error: tc.stderr || tc.error,
// // //         runtime: tc.executionTime,
// // //       }));
      
// // //       const allPassed = fixedResults.length > 0 && fixedResults.every(tc => tc.passed === true);
      
// // //       setResult({ 
// // //         verdict: allPassed ? 'Accepted' : 'Wrong Answer',
// // //         results: fixedResults,
// // //         runtime: data.totalExecutionTime,
// // //         mode: 'run'
// // //       });

// // //       if (allPassed) {
// // //         toast.success('Sample test passed! 🎉');
// // //       } else {
// // //         toast.error('Wrong Answer');
// // //       }
// // //     } catch (err) {
// // //       toast.error('Execution failed');
// // //       setResult({ verdict: 'Error', error: err.message, mode: 'run' });
// // //     } finally {
// // //       setRunning(false);
// // //     }
// // //   };

// // //   const handleSubmit = async () => {
// // //     if (!code.trim()) return toast.error('Write some code first');
// // //     if (isStarterCode(code, problem)) return toast.error('Please write your solution before submitting');

// // //     setSubmitting(true);
// // //     setResult(null);
// // //     setActiveResultTab('testcases');

// // //     try {
// // //       let testCases = [];
      
// // //       if (problem?.testCases && problem.testCases.length > 0) {
// // //         testCases = problem.testCases.map((tc, i) => ({
// // //           id: tc.id || `tc${i + 1}`,
// // //           input: tc.input,
// // //           expected: tc.expected,
// // //         }));
// // //       } else {
// // //         testCases = [{
// // //           id: 'tc1',
// // //           input: problem?.sampleInput || '',
// // //           expected: problem?.sampleOutput || '',
// // //         }];
// // //       }

// // //       const data = await callLambda({ testCases });
      
// // //       const testResults = data.results || [];
// // //       const fixedResults = testResults.map(tc => {
// // //         const actualNormalized = (tc.actual || '').replace(/\s/g, '');
// // //         const expectedNormalized = (tc.expected || '').replace(/\s/g, '');
// // //         const passed = actualNormalized === expectedNormalized;
        
// // //         return {
// // //           passed: passed,
// // //           input: tc.input,
// // //           output: tc.actual || tc.output,
// // //           expected: tc.expected,
// // //           error: tc.stderr || tc.error,
// // //           runtime: tc.executionTime,
// // //         };
// // //       });
      
// // //       const testsPassed = fixedResults.filter(r => r.passed).length;
// // //       const allPassed = testsPassed === fixedResults.length;
      
// // //       const normalized = {
// // //         verdict: allPassed ? 'Accepted' : 'Wrong Answer',
// // //         results: fixedResults,
// // //         runtime: data.totalExecutionTime,
// // //         mode: 'submit',
// // //         testsPassed: testsPassed,
// // //         totalTests: fixedResults.length,
// // //       };
      
// // //       setResult(normalized);

// // //       // Save submission
// // //       try {
// // //         await api.post('/submissions', {
// // //           problemId: id,
// // //           language,
// // //           code,
// // //           verdict: normalized.verdict,
// // //           executionTime: normalized.runtime || 0,
// // //           testResults: normalized.results.map(tc => ({
// // //             passed: tc.passed,
// // //             output: tc.output || '',
// // //             expectedOutput: tc.expected || '',
// // //             executionTime: tc.runtime || 0,
// // //           })),
// // //         });
// // //       } catch (saveErr) {
// // //         console.error('Failed to save submission:', saveErr.message);
// // //       }

// // //       if (allPassed) {
// // //         toast.success(`All ${testsPassed}/${fixedResults.length} test cases passed! 🎉`);
// // //       } else {
// // //         toast.info(`${testsPassed}/${fixedResults.length} test cases passed`);
// // //       }
// // //     } catch (err) {
// // //       toast.error('Submission failed');
// // //       setResult({ verdict: 'Error', error: err.message, mode: 'submit' });
// // //     } finally {
// // //       setSubmitting(false);
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div style={styles.loadingScreen}>
// // //         <div style={styles.loadingSpinner} />
// // //         <span style={{ color: '#00ff88' }}>Loading problem...</span>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div style={styles.container}>
// // //       <nav style={styles.nav}>
// // //         <span style={styles.backBtn} onClick={() => navigate('/problems')}>← Problems</span>
// // //         <span style={styles.problemTitle}>{problem?.title}</span>
// // //         <span style={{ color: difficultyColor(problem?.difficulty) }}>{problem?.difficulty}</span>
// // //       </nav>

// // //       <div style={styles.layout}>
// // //         <div style={styles.leftPanel}>
// // //           <div style={styles.tabs}>
// // //             {['description', 'examples'].map((tab) => (
// // //               <button key={tab} onClick={() => setActiveTab(tab)} style={{ ...styles.tab, color: activeTab === tab ? '#00ff88' : '#555' }}>
// // //                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
// // //               </button>
// // //             ))}
// // //           </div>
// // //           <div style={styles.panelContent}>
// // //             {activeTab === 'description' && (
// // //               <>
// // //                 <div style={styles.tags}>
// // //                   {problem?.tags?.map((tag) => <span key={tag} style={styles.tag}>{tag}</span>)}
// // //                   <span style={styles.points}>🏆 {problem?.points} pts</span>
// // //                 </div>
// // //                 <p style={styles.description}>{problem?.description}</p>
// // //                 {problem?.constraints && <pre style={styles.pre}>{problem?.constraints}</pre>}
// // //               </>
// // //             )}
// // //             {activeTab === 'examples' && (
// // //               <div>
// // //                 <h3>Sample Input</h3>
// // //                 <pre style={styles.pre}>{problem?.sampleInput}</pre>
// // //                 <h3>Sample Output</h3>
// // //                 <pre style={styles.pre}>{problem?.sampleOutput}</pre>
// // //                 {problem?.explanation && <p>{problem?.explanation}</p>}
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>

// // //         <div style={styles.rightPanel}>
// // //           <div style={styles.editorHeader}>
// // //             <div style={styles.langBtns}>
// // //               {Object.keys(starterTemplates).map((lang) => (
// // //                 <button key={lang} onClick={() => handleLanguageChange(lang)} style={{ ...styles.langBtn, background: language === lang ? '#00ff8822' : 'transparent' }}>
// // //                   {lang}
// // //                 </button>
// // //               ))}
// // //             </div>
// // //             <div style={{ display: 'flex', gap: '8px' }}>
// // //               <button onClick={handleRun} disabled={running || submitting} style={styles.runBtn}>
// // //                 {running ? 'Running...' : 'Run'}
// // //               </button>
// // //               <button onClick={handleSubmit} disabled={running || submitting} style={styles.submitBtn}>
// // //                 {submitting ? 'Submitting...' : 'Submit'}
// // //               </button>
// // //             </div>
// // //           </div>

// // //           <textarea
// // //             ref={textareaRef}
// // //             value={code}
// // //             onChange={(e) => setCode(e.target.value)}
// // //             style={{
// // //               width: '100%',
// // //               height: result ? '45vh' : '60vh',
// // //               background: '#1e1e1e',
// // //               color: '#d4d4d4',
// // //               fontFamily: 'Fira Code, monospace',
// // //               fontSize: '14px',
// // //               padding: '16px',
// // //               border: 'none',
// // //               outline: 'none',
// // //               resize: 'vertical',
// // //             }}
// // //             spellCheck={false}
// // //           />

// // //           {result && (
// // //             <div style={styles.resultPanel}>
// // //               <div style={{ color: result.verdict === 'Accepted' ? '#00ff88' : '#ff4444' }}>
// // //                 {result.verdict} {result.mode === 'submit' && `(${result.testsPassed}/${result.totalTests} tests passed)`}
// // //               </div>
// // //               {result.results?.map((tc, i) => (
// // //                 <div key={i} style={{ border: `1px solid ${tc.passed ? '#00ff8833' : '#ff444433'}`, padding: '10px', marginTop: '8px' }}>
// // //                   <div>Case {i + 1}: {tc.passed ? '✅' : '❌'}</div>
// // //                   {tc.input && <div>Input: {tc.input}</div>}
// // //                   <div>Got: {tc.output}</div>
// // //                   {!tc.passed && <div>Expected: {tc.expected}</div>}
// // //                   {tc.error && <div style={{ color: '#ff6666' }}>Error: {tc.error}</div>}
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // const styles = {
// // //   loadingScreen: { minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' },
// // //   loadingSpinner: { width: '36px', height: '36px', border: '3px solid #1a1a1a', borderTop: '3px solid #00ff88', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
// // //   container: { minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Fira Code', monospace" },
// // //   nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', borderBottom: '1px solid #1a1a1a' },
// // //   backBtn: { color: '#00ff88', cursor: 'pointer' },
// // //   problemTitle: { color: '#fff' },
// // //   layout: { display: 'flex', height: 'calc(100vh - 53px)' },
// // //   leftPanel: { width: '40%', borderRight: '1px solid #1a1a1a', overflow: 'auto' },
// // //   rightPanel: { flex: 1, display: 'flex', flexDirection: 'column' },
// // //   tabs: { display: 'flex', borderBottom: '1px solid #1a1a1a', padding: '0 20px' },
// // //   tab: { background: 'transparent', border: 'none', padding: '12px 16px', cursor: 'pointer', fontSize: '13px' },
// // //   panelContent: { padding: '20px', overflow: 'auto' },
// // //   tags: { display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' },
// // //   tag: { background: '#1a1a1a', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', color: '#666' },
// // //   points: { color: '#ffaa00' },
// // //   description: { color: '#aaa', lineHeight: 1.8 },
// // //   pre: { background: '#111', padding: '12px', borderRadius: '8px', color: '#aaa', overflow: 'auto' },
// // //   editorHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid #1a1a1a' },
// // //   langBtns: { display: 'flex', gap: '6px' },
// // //   langBtn: { padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' },
// // //   runBtn: { background: 'transparent', color: '#00ff88', border: '1px solid #00ff8844', padding: '7px 18px', borderRadius: '8px', cursor: 'pointer' },
// // //   submitBtn: { background: '#00ff88', color: '#000', border: 'none', padding: '8px 18px', borderRadius: '8px', cursor: 'pointer' },
// // //   resultPanel: { background: '#0a0a0a', padding: '14px 16px', maxHeight: '260px', overflow: 'auto' },
// // // };
// // import { useState, useEffect, useRef } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import api from '../api/axios';
// // import { useAuth } from '../context/AuthContext';
// // import toast from 'react-hot-toast';
// // import TierLocked from '../components/TierLocked';

// // const starterTemplates = {
// //   javascript: `// Write your solution here\nfunction solution() {\n  \n}`,
// //   python: `# Write your solution here\ndef solution():\n    pass`,
// //   cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n  // Write your solution here\n  return 0;\n}`,
// //   java: `import java.util.*;\npublic class Solution {\n  public static void main(String[] args) {\n    // Write your solution here\n  }\n}`,
// // };

// // const isStarterCode = (code, problem) => {
// //   const stripped = code.replace(/\s/g, '');
// //   const genericMatch = Object.values(starterTemplates).some(
// //     (t) => t.replace(/\s/g, '') === stripped
// //   );
// //   if (genericMatch) return true;
// //   if (problem?.starterCode) {
// //     const problemMatch = Object.values(problem.starterCode).some(
// //       (t) => t && t.replace(/\s/g, '') === stripped
// //     );
// //     if (problemMatch) return true;
// //   }
// //   return false;
// // };

// // const difficultyColor = (d) => {
// //   if (d === 'Easy') return '#00ff88';
// //   if (d === 'Medium') return '#ffaa00';
// //   return '#ff4444';
// // };

// // const verdictColor = (v) =>
// //   v === 'Accepted' ? '#00ff88' : v === 'Error' ? '#ff8800' : '#ff4444';

// // export default function ProblemDetail() {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const { user } = useAuth();
// //   const textareaRef = useRef(null);

// //   const [problem, setProblem] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [code, setCode] = useState(starterTemplates.javascript);
// //   const [language, setLanguage] = useState('javascript');
// //   const [running, setRunning] = useState(false);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [result, setResult] = useState(null);
// //   const [activeTab, setActiveTab] = useState('description');
// //   const [activeResultTab, setActiveResultTab] = useState('testcases');
  
// //   // Lock state
// //   const [isLocked, setIsLocked] = useState(false);
// //   const [lockedDifficulty, setLockedDifficulty] = useState('');

// //   useEffect(() => {
// //     fetchProblem();
// //   }, [id]);

// //   const fetchProblem = async () => {
// //     try {
// //       const res = await api.get(`/problems/${id}`);
// //       const p = res.data.problem;
      
// //       // Check if user can access this difficulty
// //       if (!user?.unlockedTiers?.includes(p.difficulty)) {
// //         setIsLocked(true);
// //         setLockedDifficulty(p.difficulty);
// //         return;
// //       }
      
// //       setProblem(p);
// //       const starter = p.starterCode?.[language] || starterTemplates[language];
// //       setCode(starter);
// //     } catch (err) {
// //       if (err.response?.status === 403) {
// //         // Backend returned forbidden (tier locked)
// //         setIsLocked(true);
// //         setLockedDifficulty(err.response?.data?.difficulty || 'this difficulty');
// //       } else {
// //         toast.error('Failed to load problem');
// //         navigate('/problems');
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleLanguageChange = (lang) => {
// //     setLanguage(lang);
// //     const starter = problem?.starterCode?.[lang] || starterTemplates[lang];
// //     setCode(starter);
// //     setResult(null);
// //   };

// //   const formatInput = (input) => {
// //     if (!input) return '';
// //     if (input.includes('[') || input.includes(',')) {
// //       return input.replace(/[\[\]]/g, '').replace(/,/g, ' ').trim();
// //     }
// //     return input;
// //   };

// //   const callLambda = async ({ testCases }) => {
// //     const formattedTestCases = testCases.map(tc => ({
// //       id: tc.id,
// //       input: formatInput(tc.input),
// //       expected: tc.expected,
// //     }));
    
// //     const res = await api.post('/submissions/run', {
// //       language,
// //       code,
// //       input: problem?.sampleInput || '',
// //       testCases: formattedTestCases,
// //     });
// //     return res.data;
// //   };

// //   const handleRun = async () => {
// //     if (!code.trim()) return toast.error('Write some code first');
// //     if (isStarterCode(code, problem)) return toast.error('Please write your solution before running');

// //     setRunning(true);
// //     setResult(null);
// //     setActiveResultTab('testcases');

// //     try {
// //       const data = await callLambda({
// //         testCases: [
// //           {
// //             id: 'tc1',
// //             input: problem?.sampleInput || '',
// //             expected: problem?.sampleOutput || '',
// //           },
// //         ],
// //       });

// //       const testResults = data.results || [];
// //       const fixedResults = testResults.map(tc => ({
// //         passed: tc.passed === true,
// //         input: tc.input,
// //         output: tc.actual || tc.output,
// //         expected: tc.expected,
// //         error: tc.stderr || tc.error,
// //         runtime: tc.executionTime,
// //       }));
      
// //       const allPassed = fixedResults.length > 0 && fixedResults.every(tc => tc.passed === true);
      
// //       setResult({ 
// //         verdict: allPassed ? 'Accepted' : 'Wrong Answer',
// //         results: fixedResults,
// //         runtime: data.totalExecutionTime,
// //         mode: 'run'
// //       });

// //       if (allPassed) {
// //         toast.success('Sample test passed! 🎉');
// //       } else {
// //         toast.error('Wrong Answer');
// //       }
// //     } catch (err) {
// //       toast.error('Execution failed');
// //       setResult({ verdict: 'Error', error: err.message, mode: 'run' });
// //     } finally {
// //       setRunning(false);
// //     }
// //   };

// //   const handleSubmit = async () => {
// //     if (!code.trim()) return toast.error('Write some code first');
// //     if (isStarterCode(code, problem)) return toast.error('Please write your solution before submitting');

// //     setSubmitting(true);
// //     setResult(null);
// //     setActiveResultTab('testcases');

// //     try {
// //       let testCases = [];
      
// //       if (problem?.testCases && problem.testCases.length > 0) {
// //         testCases = problem.testCases.map((tc, i) => ({
// //           id: tc.id || `tc${i + 1}`,
// //           input: tc.input,
// //           expected: tc.expected,
// //         }));
// //       } else {
// //         testCases = [{
// //           id: 'tc1',
// //           input: problem?.sampleInput || '',
// //           expected: problem?.sampleOutput || '',
// //         }];
// //       }

// //       const data = await callLambda({ testCases });
      
// //       const testResults = data.results || [];
// //       const fixedResults = testResults.map(tc => {
// //         const actualNormalized = (tc.actual || '').replace(/\s/g, '');
// //         const expectedNormalized = (tc.expected || '').replace(/\s/g, '');
// //         const passed = actualNormalized === expectedNormalized;
        
// //         return {
// //           passed: passed,
// //           input: tc.input,
// //           output: tc.actual || tc.output,
// //           expected: tc.expected,
// //           error: tc.stderr || tc.error,
// //           runtime: tc.executionTime,
// //         };
// //       });
      
// //       const testsPassed = fixedResults.filter(r => r.passed).length;
// //       const allPassed = testsPassed === fixedResults.length;
      
// //       const normalized = {
// //         verdict: allPassed ? 'Accepted' : 'Wrong Answer',
// //         results: fixedResults,
// //         runtime: data.totalExecutionTime,
// //         mode: 'submit',
// //         testsPassed: testsPassed,
// //         totalTests: fixedResults.length,
// //       };
      
// //       setResult(normalized);

// //       // Save submission
// //       try {
// //         await api.post('/submissions', {
// //           problemId: id,
// //           language,
// //           code,
// //           verdict: normalized.verdict,
// //           executionTime: normalized.runtime || 0,
// //           testResults: normalized.results.map(tc => ({
// //             passed: tc.passed,
// //             output: tc.output || '',
// //             expectedOutput: tc.expected || '',
// //             executionTime: tc.runtime || 0,
// //           })),
// //         });
// //       } catch (saveErr) {
// //         console.error('Failed to save submission:', saveErr.message);
// //       }

// //       if (allPassed) {
// //         toast.success(`All ${testsPassed}/${fixedResults.length} test cases passed! 🎉`);
// //       } else {
// //         toast.info(`${testsPassed}/${fixedResults.length} test cases passed`);
// //       }
// //     } catch (err) {
// //       toast.error('Submission failed');
// //       setResult({ verdict: 'Error', error: err.message, mode: 'submit' });
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div style={styles.loadingScreen}>
// //         <div style={styles.loadingSpinner} />
// //         <span style={{ color: '#00ff88' }}>Loading problem...</span>
// //       </div>
// //     );
// //   }

// //   if (isLocked) {
// //     const requiredTier = lockedDifficulty === 'Medium' ? 'Easy' : 'Medium';
// //     return <TierLocked difficulty={lockedDifficulty} requiredTier={requiredTier} />;
// //   }

// //   return (
// //     <div style={styles.container}>
// //       <nav style={styles.nav}>
// //         <span style={styles.backBtn} onClick={() => navigate('/problems')}>← Problems</span>
// //         <span style={styles.problemTitle}>{problem?.title}</span>
// //         <span style={{ color: difficultyColor(problem?.difficulty) }}>{problem?.difficulty}</span>
// //       </nav>

// //       <div style={styles.layout}>
// //         <div style={styles.leftPanel}>
// //           <div style={styles.tabs}>
// //             {['description', 'examples'].map((tab) => (
// //               <button key={tab} onClick={() => setActiveTab(tab)} style={{ ...styles.tab, color: activeTab === tab ? '#00ff88' : '#555' }}>
// //                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
// //               </button>
// //             ))}
// //           </div>
// //           <div style={styles.panelContent}>
// //             {activeTab === 'description' && (
// //               <>
// //                 <div style={styles.tags}>
// //                   {problem?.tags?.map((tag) => <span key={tag} style={styles.tag}>{tag}</span>)}
// //                   <span style={styles.points}>🏆 {problem?.points} pts</span>
// //                 </div>
// //                 <p style={styles.description}>{problem?.description}</p>
// //                 {problem?.constraints && <pre style={styles.pre}>{problem?.constraints}</pre>}
// //               </>
// //             )}
// //             {activeTab === 'examples' && (
// //               <div>
// //                 <h3>Sample Input</h3>
// //                 <pre style={styles.pre}>{problem?.sampleInput}</pre>
// //                 <h3>Sample Output</h3>
// //                 <pre style={styles.pre}>{problem?.sampleOutput}</pre>
// //                 {problem?.explanation && <p>{problem?.explanation}</p>}
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         <div style={styles.rightPanel}>
// //           <div style={styles.editorHeader}>
// //             <div style={styles.langBtns}>
// //               {Object.keys(starterTemplates).map((lang) => (
// //                 <button key={lang} onClick={() => handleLanguageChange(lang)} style={{ ...styles.langBtn, background: language === lang ? '#00ff8822' : 'transparent' }}>
// //                   {lang}
// //                 </button>
// //               ))}
// //             </div>
// //             <div style={{ display: 'flex', gap: '8px' }}>
// //               <button onClick={handleRun} disabled={running || submitting} style={styles.runBtn}>
// //                 {running ? 'Running...' : 'Run'}
// //               </button>
// //               <button onClick={handleSubmit} disabled={running || submitting} style={styles.submitBtn}>
// //                 {submitting ? 'Submitting...' : 'Submit'}
// //               </button>
// //             </div>
// //           </div>

// //           <textarea
// //             ref={textareaRef}
// //             value={code}
// //             onChange={(e) => setCode(e.target.value)}
// //             style={{
// //               width: '100%',
// //               height: result ? '45vh' : '60vh',
// //               background: '#1e1e1e',
// //               color: '#d4d4d4',
// //               fontFamily: 'Fira Code, monospace',
// //               fontSize: '14px',
// //               padding: '16px',
// //               border: 'none',
// //               outline: 'none',
// //               resize: 'vertical',
// //             }}
// //             spellCheck={false}
// //           />

// //           {result && (
// //             <div style={styles.resultPanel}>
// //               <div style={{ color: result.verdict === 'Accepted' ? '#00ff88' : '#ff4444' }}>
// //                 {result.verdict} {result.mode === 'submit' && `(${result.testsPassed}/${result.totalTests} tests passed)`}
// //               </div>
// //               {result.results?.map((tc, i) => (
// //                 <div key={i} style={{ border: `1px solid ${tc.passed ? '#00ff8833' : '#ff444433'}`, padding: '10px', marginTop: '8px' }}>
// //                   <div>Case {i + 1}: {tc.passed ? '✅' : '❌'}</div>
// //                   {tc.input && <div>Input: {tc.input}</div>}
// //                   <div>Got: {tc.output}</div>
// //                   {!tc.passed && <div>Expected: {tc.expected}</div>}
// //                   {tc.error && <div style={{ color: '#ff6666' }}>Error: {tc.error}</div>}
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // const styles = {
// //   loadingScreen: { minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' },
// //   loadingSpinner: { width: '36px', height: '36px', border: '3px solid #1a1a1a', borderTop: '3px solid #00ff88', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
// //   container: { minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Fira Code', monospace" },
// //   nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', borderBottom: '1px solid #1a1a1a' },
// //   backBtn: { color: '#00ff88', cursor: 'pointer' },
// //   problemTitle: { color: '#fff' },
// //   layout: { display: 'flex', height: 'calc(100vh - 53px)' },
// //   leftPanel: { width: '40%', borderRight: '1px solid #1a1a1a', overflow: 'auto' },
// //   rightPanel: { flex: 1, display: 'flex', flexDirection: 'column' },
// //   tabs: { display: 'flex', borderBottom: '1px solid #1a1a1a', padding: '0 20px' },
// //   tab: { background: 'transparent', border: 'none', padding: '12px 16px', cursor: 'pointer', fontSize: '13px' },
// //   panelContent: { padding: '20px', overflow: 'auto' },
// //   tags: { display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' },
// //   tag: { background: '#1a1a1a', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', color: '#666' },
// //   points: { color: '#ffaa00' },
// //   description: { color: '#aaa', lineHeight: 1.8 },
// //   pre: { background: '#111', padding: '12px', borderRadius: '8px', color: '#aaa', overflow: 'auto' },
// //   editorHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid #1a1a1a' },
// //   langBtns: { display: 'flex', gap: '6px' },
// //   langBtn: { padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' },
// //   runBtn: { background: 'transparent', color: '#00ff88', border: '1px solid #00ff8844', padding: '7px 18px', borderRadius: '8px', cursor: 'pointer' },
// //   submitBtn: { background: '#00ff88', color: '#000', border: 'none', padding: '8px 18px', borderRadius: '8px', cursor: 'pointer' },
// //   resultPanel: { background: '#0a0a0a', padding: '14px 16px', maxHeight: '260px', overflow: 'auto' },
// // };

// // frontend/src/pages/ProblemDetail.jsx
// import { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import api from '../api/axios';
// import { useAuth } from '../context/AuthContext';
// import toast from 'react-hot-toast';
// import TierLocked from '../components/TierLocked';

// // ------------------------------
// // Blood Canvas & Cursed Lines
// // ------------------------------
// function BloodCanvas() {
//   const ref = useRef(null);
//   useEffect(() => {
//     const canvas = ref.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
//     resize();
//     window.addEventListener('resize', resize);

//     const drips = Array.from({ length: 35 }, () => ({
//       x: Math.random() * window.innerWidth,
//       y: -Math.random() * 300,
//       speed: 0.3 + Math.random() * 1.4,
//       width: 1.5 + Math.random() * 5,
//       length: 50 + Math.random() * 160,
//       alpha: 0.3 + Math.random() * 0.7,
//       splat: false, splatR: 0,
//       splatMax: 5 + Math.random() * 15,
//     }));
//     const embers = Array.from({ length: 150 }, () => ({
//       x: Math.random() * window.innerWidth,
//       y: Math.random() * window.innerHeight,
//       r: 0.5 + Math.random() * 3,
//       vx: (Math.random() - 0.5) * 0.7,
//       vy: -(0.2 + Math.random() * 1),
//       alpha: Math.random(),
//       type: Math.random() > 0.65 ? 'blue' : 'red',
//     }));
//     const stains = Array.from({ length: 10 }, () => ({
//       x: Math.random() * window.innerWidth,
//       y: Math.random() * window.innerHeight,
//       r: 80 + Math.random() * 200,
//       alpha: 0.02 + Math.random() * 0.06,
//     }));
//     let frame;
//     function draw() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       stains.forEach(s => {
//         ctx.beginPath();
//         ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(100,0,0,${s.alpha})`;
//         ctx.fill();
//       });
//       drips.forEach(d => {
//         if (!d.splat) {
//           const grad = ctx.createLinearGradient(d.x, d.y, d.x, d.y + d.length);
//           grad.addColorStop(0, `rgba(180,0,0,${d.alpha})`);
//           grad.addColorStop(0.6, `rgba(120,0,0,${d.alpha * 0.8})`);
//           grad.addColorStop(1, `rgba(80,0,0,0)`);
//           ctx.beginPath();
//           ctx.moveTo(d.x - d.width / 2, d.y);
//           ctx.quadraticCurveTo(d.x + d.width * 0.8, d.y + d.length * 0.5, d.x, d.y + d.length);
//           ctx.lineWidth = d.width;
//           ctx.strokeStyle = grad;
//           ctx.stroke();
//           ctx.beginPath();
//           ctx.arc(d.x, d.y + d.length, d.width * 1.8, 0, Math.PI * 2);
//           ctx.fillStyle = `rgba(140,0,0,${d.alpha * 0.5})`;
//           ctx.fill();
//           d.y += d.speed;
//           if (d.y + d.length > canvas.height) d.splat = true;
//         } else {
//           d.splatR += 0.6;
//           ctx.beginPath();
//           ctx.arc(d.x, canvas.height - 2, d.splatR, 0, Math.PI * 2);
//           ctx.fillStyle = `rgba(100,0,0,${0.4 * (1 - d.splatR / d.splatMax)})`;
//           ctx.fill();
//           if (d.splatR >= d.splatMax) {
//             d.y = -Math.random() * 300;
//             d.x = Math.random() * canvas.width;
//             d.splat = false; d.splatR = 0;
//             d.speed = 0.3 + Math.random() * 1.4;
//           }
//         }
//       });
//       embers.forEach(e => {
//         ctx.beginPath();
//         ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
//         ctx.fillStyle = e.type === 'red'
//           ? `rgba(255,${30 + Math.floor(e.alpha * 50)},0,${e.alpha * 0.7})`
//           : `rgba(0,${80 + Math.floor(e.alpha * 80)},${180 + Math.floor(e.alpha * 75)},${e.alpha * 0.45})`;
//         ctx.fill();
//         e.x += e.vx; e.y += e.vy; e.alpha -= 0.003;
//         if (e.y < 0 || e.alpha <= 0) {
//           e.y = canvas.height + 10;
//           e.x = Math.random() * canvas.width;
//           e.alpha = 0.3 + Math.random() * 0.7;
//         }
//       });
//       frame = requestAnimationFrame(draw);
//     }
//     draw();
//     return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); };
//   }, []);
//   return <canvas ref={ref} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
// }

// function CursedLines() {
//   const ref = useRef(null);
//   useEffect(() => {
//     const canvas = ref.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     const lines = Array.from({ length: 7 }, () => ({
//       x: Math.random() * window.innerWidth,
//       y: Math.random() * window.innerHeight,
//       angle: Math.random() * Math.PI * 2,
//       speed: 0.006 + Math.random() * 0.01,
//       len: 120 + Math.random() * 350,
//       alpha: 0, dir: 1,
//       col: Math.random() > 0.5 ? '0,100,220' : '170,0,0',
//     }));
//     let frame;
//     function draw() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       lines.forEach(l => {
//         l.alpha += 0.007 * l.dir;
//         if (l.alpha >= 0.5) l.dir = -1;
//         if (l.alpha <= 0) {
//           l.dir = 1;
//           l.x = Math.random() * canvas.width;
//           l.y = Math.random() * canvas.height;
//           l.angle = Math.random() * Math.PI * 2;
//           l.len = 120 + Math.random() * 350;
//         }
//         l.angle += l.speed;
//         const x2 = l.x + Math.cos(l.angle) * l.len;
//         const y2 = l.y + Math.sin(l.angle) * l.len;
//         const g = ctx.createLinearGradient(l.x, l.y, x2, y2);
//         g.addColorStop(0, `rgba(${l.col},0)`);
//         g.addColorStop(0.5, `rgba(${l.col},${l.alpha})`);
//         g.addColorStop(1, `rgba(${l.col},0)`);
//         ctx.beginPath(); ctx.moveTo(l.x, l.y); ctx.lineTo(x2, y2);
//         ctx.strokeStyle = g; ctx.lineWidth = 1.5; ctx.stroke();
//       });
//       frame = requestAnimationFrame(draw);
//     }
//     draw();
//     return () => cancelAnimationFrame(frame);
//   }, []);
//   return <canvas ref={ref} style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }} />;
// }
// // ---------------------------------------------------------------

// const starterTemplates = {
//   javascript: `// Write your solution here\nfunction solution() {\n  \n}`,
//   python: `# Write your solution here\ndef solution():\n    pass`,
//   cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n  // Write your solution here\n  return 0;\n}`,
//   java: `import java.util.*;\npublic class Solution {\n  public static void main(String[] args) {\n    // Write your solution here\n  }\n}`,
// };

// const isStarterCode = (code, problem) => {
//   const stripped = code.replace(/\s/g, '');
//   const genericMatch = Object.values(starterTemplates).some(
//     (t) => t.replace(/\s/g, '') === stripped
//   );
//   if (genericMatch) return true;
//   if (problem?.starterCode) {
//     const problemMatch = Object.values(problem.starterCode).some(
//       (t) => t && t.replace(/\s/g, '') === stripped
//     );
//     if (problemMatch) return true;
//   }
//   return false;
// };

// const difficultyColor = (d) => {
//   if (d === 'Easy') return '#00ff88';
//   if (d === 'Medium') return '#ffaa00';
//   return '#ff4444';
// };

// const verdictColor = (v) =>
//   v === 'Accepted' ? '#00ff88' : v === 'Error' ? '#ff8800' : '#ff4444';

// export default function ProblemDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const textareaRef = useRef(null);

//   const [problem, setProblem] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [code, setCode] = useState(starterTemplates.javascript);
//   const [language, setLanguage] = useState('javascript');
//   const [running, setRunning] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [result, setResult] = useState(null);
//   const [activeTab, setActiveTab] = useState('description');
//   const [activeResultTab, setActiveResultTab] = useState('testcases');
//   const [mouse, setMouse] = useState({ x: 0, y: 0 });
  
//   const [isLocked, setIsLocked] = useState(false);
//   const [lockedDifficulty, setLockedDifficulty] = useState('');

//   useEffect(() => {
//     fetchProblem();
//   }, [id]);

//   const fetchProblem = async () => {
//     try {
//       const res = await api.get(`/problems/${id}`);
//       const p = res.data.problem;
      
//       if (!user?.unlockedTiers?.includes(p.difficulty)) {
//         setIsLocked(true);
//         setLockedDifficulty(p.difficulty);
//         return;
//       }
      
//       setProblem(p);
//       const starter = p.starterCode?.[language] || starterTemplates[language];
//       setCode(starter);
//     } catch (err) {
//       if (err.response?.status === 403) {
//         setIsLocked(true);
//         setLockedDifficulty(err.response?.data?.difficulty || 'this difficulty');
//       } else {
//         toast.error('Failed to load problem');
//         navigate('/problems');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLanguageChange = (lang) => {
//     setLanguage(lang);
//     const starter = problem?.starterCode?.[lang] || starterTemplates[lang];
//     setCode(starter);
//     setResult(null);
//   };

//   const formatInput = (input) => {
//     if (!input) return '';
//     if (input.includes('[') || input.includes(',')) {
//       return input.replace(/[\[\]]/g, '').replace(/,/g, ' ').trim();
//     }
//     return input;
//   };

//   const callLambda = async ({ testCases }) => {
//     const formattedTestCases = testCases.map(tc => ({
//       id: tc.id,
//       input: formatInput(tc.input),
//       expected: tc.expected,
//     }));
//     const res = await api.post('/submissions/run', {
//       language,
//       code,
//       input: problem?.sampleInput || '',
//       testCases: formattedTestCases,
//     });
//     return res.data;
//   };

//   const handleRun = async () => {
//     if (!code.trim()) return toast.error('Write some code first');
//     if (isStarterCode(code, problem)) return toast.error('Please write your solution before running');

//     setRunning(true);
//     setResult(null);
//     setActiveResultTab('testcases');

//     try {
//       const data = await callLambda({
//         testCases: [
//           {
//             id: 'tc1',
//             input: problem?.sampleInput || '',
//             expected: problem?.sampleOutput || '',
//           },
//         ],
//       });

//       const testResults = data.results || [];
//       const fixedResults = testResults.map(tc => ({
//         passed: tc.passed === true,
//         input: tc.input,
//         output: tc.actual || tc.output,
//         expected: tc.expected,
//         error: tc.stderr || tc.error,
//         runtime: tc.executionTime,
//       }));
      
//       const allPassed = fixedResults.length > 0 && fixedResults.every(tc => tc.passed === true);
      
//       setResult({ 
//         verdict: allPassed ? 'Accepted' : 'Wrong Answer',
//         results: fixedResults,
//         runtime: data.totalExecutionTime,
//         mode: 'run'
//       });

//       if (allPassed) toast.success('Sample test passed! 🎉');
//       else toast.error('Wrong Answer');
//     } catch (err) {
//       toast.error('Execution failed');
//       setResult({ verdict: 'Error', error: err.message, mode: 'run' });
//     } finally {
//       setRunning(false);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!code.trim()) return toast.error('Write some code first');
//     if (isStarterCode(code, problem)) return toast.error('Please write your solution before submitting');

//     setSubmitting(true);
//     setResult(null);
//     setActiveResultTab('testcases');

//     try {
//       let testCases = [];
//       if (problem?.testCases && problem.testCases.length > 0) {
//         testCases = problem.testCases.map((tc, i) => ({
//           id: tc.id || `tc${i + 1}`,
//           input: tc.input,
//           expected: tc.expected,
//         }));
//       } else {
//         testCases = [{
//           id: 'tc1',
//           input: problem?.sampleInput || '',
//           expected: problem?.sampleOutput || '',
//         }];
//       }

//       const data = await callLambda({ testCases });
      
//       const testResults = data.results || [];
//       const fixedResults = testResults.map(tc => {
//         const actualNormalized = (tc.actual || '').replace(/\s/g, '');
//         const expectedNormalized = (tc.expected || '').replace(/\s/g, '');
//         const passed = actualNormalized === expectedNormalized;
//         return {
//           passed: passed,
//           input: tc.input,
//           output: tc.actual || tc.output,
//           expected: tc.expected,
//           error: tc.stderr || tc.error,
//           runtime: tc.executionTime,
//         };
//       });
      
//       const testsPassed = fixedResults.filter(r => r.passed).length;
//       const allPassed = testsPassed === fixedResults.length;
      
//       const normalized = {
//         verdict: allPassed ? 'Accepted' : 'Wrong Answer',
//         results: fixedResults,
//         runtime: data.totalExecutionTime,
//         mode: 'submit',
//         testsPassed: testsPassed,
//         totalTests: fixedResults.length,
//       };
      
//       setResult(normalized);

//       try {
//         await api.post('/submissions', {
//           problemId: id,
//           language,
//           code,
//           verdict: normalized.verdict,
//           executionTime: normalized.runtime || 0,
//           testResults: normalized.results.map(tc => ({
//             passed: tc.passed,
//             output: tc.output || '',
//             expectedOutput: tc.expected || '',
//             executionTime: tc.runtime || 0,
//           })),
//         });
//       } catch (saveErr) {
//         console.error('Failed to save submission:', saveErr.message);
//       }

//       if (allPassed) toast.success(`All ${testsPassed}/${fixedResults.length} test cases passed! 🎉`);
//       else toast.info(`${testsPassed}/${fixedResults.length} test cases passed`);
//     } catch (err) {
//       toast.error('Submission failed');
//       setResult({ verdict: 'Error', error: err.message, mode: 'submit' });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const onMouse = (e) => setMouse({ x: e.clientX, y: e.clientY });

//   if (loading) {
//     return (
//       <div style={styles.loadingScreen}>
//         <div style={styles.loadingSpinner} />
//         <span style={{ color: '#ff4444' }}>Loading cursed domain...</span>
//       </div>
//     );
//   }

//   if (isLocked) {
//     const requiredTier = lockedDifficulty === 'Medium' ? 'Easy' : 'Medium';
//     return <TierLocked difficulty={lockedDifficulty} requiredTier={requiredTier} />;
//   }

//   return (
//     <>
//       <BloodCanvas />
//       <CursedLines />
//       <div style={{
//         position: 'fixed',
//         left: mouse.x - 180, top: mouse.y - 180,
//         width: 360, height: 360, borderRadius: '50%',
//         background: 'radial-gradient(circle, #ff00000e 0%, transparent 70%)',
//         pointerEvents: 'none', zIndex: 2,
//         transition: 'left 0.08s, top 0.08s',
//       }} />
//       <div onMouseMove={onMouse} style={styles.container}>
//         {/* Scanlines */}
//         <div style={{
//           position: 'fixed', inset: 0, zIndex: 4, pointerEvents: 'none',
//           background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,#00000008 3px,#00000008 4px)',
//         }} />
//         <div style={{
//           position: 'fixed', left: 0, right: 0, height: 2,
//           background: 'linear-gradient(to right,transparent,#ff00001a,transparent)',
//           zIndex: 4, pointerEvents: 'none',
//           animation: 'scanDown 9s linear infinite',
//         }} />
//         <style>{`
//           @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cinzel+Decorative:wght@700;900&family=Fira+Code:wght@300;400;600&display=swap');
//           @keyframes scanDown { from{transform:translateY(-100%)} to{transform:translateY(100vh)} }
//           @keyframes bloodPulse { 0%,100%{box-shadow:0 0 20px #ff000066} 50%{box-shadow:0 0 60px #ff0000cc} }
//           @keyframes glitchX { 0%,100%{transform:translateX(0)} 8%{transform:translateX(-2px)} 16%{transform:translateX(2px)} 24%{transform:translateX(0)} }
//         `}</style>

//         <nav style={styles.nav}>
//           <span style={styles.backBtn} onClick={() => navigate('/problems')}>← Hall of Problems</span>
//           <span style={styles.problemTitle}>{problem?.title}</span>
//           <span style={{ color: difficultyColor(problem?.difficulty) }}>{problem?.difficulty}</span>
//         </nav>

//         <div style={styles.layout}>
//           <div style={styles.leftPanel}>
//             <div style={styles.tabs}>
//               {['description', 'examples'].map((tab) => (
//                 <button key={tab} onClick={() => setActiveTab(tab)} style={{ ...styles.tab, color: activeTab === tab ? '#ff4444' : '#884444' }}>
//                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </button>
//               ))}
//             </div>
//             <div style={styles.panelContent}>
//               {activeTab === 'description' && (
//                 <>
//                   <div style={styles.tags}>
//                     {problem?.tags?.map((tag) => <span key={tag} style={styles.tag}>{tag}</span>)}
//                     <span style={styles.points}>🏆 {problem?.points} cursed energy</span>
//                   </div>
//                   <p style={styles.description}>{problem?.description}</p>
//                   {problem?.constraints && <pre style={styles.pre}>{problem?.constraints}</pre>}
//                 </>
//               )}
//               {activeTab === 'examples' && (
//                 <div>
//                   <h3 style={{ color: '#ff8888' }}>Sample Input</h3>
//                   <pre style={styles.pre}>{problem?.sampleInput}</pre>
//                   <h3 style={{ color: '#ff8888' }}>Sample Output</h3>
//                   <pre style={styles.pre}>{problem?.sampleOutput}</pre>
//                   {problem?.explanation && <p style={{ color: '#aaa' }}>{problem?.explanation}</p>}
//                 </div>
//               )}
//             </div>
//           </div>

//           <div style={styles.rightPanel}>
//             <div style={styles.editorHeader}>
//               <div style={styles.langBtns}>
//                 {Object.keys(starterTemplates).map((lang) => (
//                   <button key={lang} onClick={() => handleLanguageChange(lang)} style={{ ...styles.langBtn, background: language === lang ? '#ff000022' : 'transparent', color: language === lang ? '#ff6666' : '#ff8888' }}>
//                     {lang}
//                   </button>
//                 ))}
//               </div>
//               <div style={{ display: 'flex', gap: '8px' }}>
//                 <button onClick={handleRun} disabled={running || submitting} style={styles.runBtn}>
//                   {running ? 'Summoning...' : 'Run'}
//                 </button>
//                 <button onClick={handleSubmit} disabled={running || submitting} style={styles.submitBtn}>
//                   {submitting ? 'Sealing...' : 'Submit'}
//                 </button>
//               </div>
//             </div>

//             <textarea
//               ref={textareaRef}
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//               style={{
//                 width: '100%',
//                 height: result ? '45vh' : '60vh',
//                 background: '#1a0000',
//                 color: '#ffdddd',
//                 fontFamily: "'Fira Code', monospace",
//                 fontSize: '14px',
//                 padding: '16px',
//                 border: '1px solid #8b0000',
//                 outline: 'none',
//                 resize: 'vertical',
//               }}
//               spellCheck={false}
//             />

//             {result && (
//               <div style={styles.resultPanel}>
//                 <div style={{ color: result.verdict === 'Accepted' ? '#00ff88' : '#ff4444' }}>
//                   {result.verdict} {result.mode === 'submit' && `(${result.testsPassed}/${result.totalTests} trials passed)`}
//                 </div>
//                 {result.results?.map((tc, i) => (
//                   <div key={i} style={{ border: `1px solid ${tc.passed ? '#00ff8833' : '#ff444433'}`, padding: '10px', marginTop: '8px', background: '#0a0000' }}>
//                     <div>Case {i + 1}: {tc.passed ? '✅' : '❌'}</div>
//                     {tc.input && <div>Input: {tc.input}</div>}
//                     <div>Got: {tc.output}</div>
//                     {!tc.passed && <div>Expected: {tc.expected}</div>}
//                     {tc.error && <div style={{ color: '#ff6666' }}>Error: {tc.error}</div>}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         <div style={{
//           textAlign: 'center', marginTop: 24, paddingBottom: 24,
//           color: '#8b000033', fontSize: 12, letterSpacing: '0.4em', fontFamily: 'serif',
//         }}>
//           ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ
//         </div>
//       </div>
//     </>
//   );
// }

// const styles = {
//   loadingScreen: {
//     minHeight: '100vh',
//     background: '#030000',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '16px',
//     fontFamily: "'Cinzel Decorative', serif",
//   },
//   loadingSpinner: {
//     width: '36px',
//     height: '36px',
//     border: '3px solid #1a0000',
//     borderTop: '3px solid #ff0000',
//     borderRadius: '50%',
//     animation: 'spin 0.8s linear infinite',
//   },
//   container: {
//     minHeight: '100vh',
//     background: '#030000',
//     fontFamily: "'Cinzel', serif",
//     color: '#fff',
//     position: 'relative',
//     zIndex: 3,
//   },
//   nav: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: '16px 32px',
//     background: 'linear-gradient(to bottom, #06000099, transparent)',
//     borderBottom: '1px solid #8b000020',
//     position: 'relative',
//     zIndex: 10,
//   },
//   backBtn: {
//     color: '#ff6666',
//     cursor: 'pointer',
//     letterSpacing: '0.1em',
//     transition: 'color 0.2s',
//   },
//   problemTitle: {
//     color: '#fff',
//     fontSize: '18px',
//     fontFamily: "'Cinzel Decorative', serif",
//   },
//   layout: {
//     display: 'flex',
//     height: 'calc(100vh - 70px)',
//   },
//   leftPanel: {
//     width: '40%',
//     borderRight: '1px solid #8b000033',
//     overflow: 'auto',
//     background: '#0a0000aa',
//   },
//   rightPanel: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     background: '#0a0000aa',
//   },
//   tabs: {
//     display: 'flex',
//     borderBottom: '1px solid #8b000033',
//     padding: '0 20px',
//   },
//   tab: {
//     background: 'transparent',
//     border: 'none',
//     padding: '12px 16px',
//     cursor: 'pointer',
//     fontSize: '13px',
//     fontFamily: "'Cinzel', serif",
//     letterSpacing: '0.1em',
//   },
//   panelContent: {
//     padding: '20px',
//     overflow: 'auto',
//   },
//   tags: {
//     display: 'flex',
//     gap: '8px',
//     flexWrap: 'wrap',
//     marginBottom: '16px',
//   },
//   tag: {
//     background: '#1a0000',
//     border: '1px solid #8b0000',
//     padding: '3px 10px',
//     borderRadius: '20px',
//     fontSize: '11px',
//     color: '#ff8888',
//   },
//   points: {
//     color: '#ffaa00',
//     marginLeft: 'auto',
//   },
//   description: {
//     color: '#ddbbbb',
//     lineHeight: 1.8,
//   },
//   pre: {
//     background: '#1a0000',
//     padding: '12px',
//     borderRadius: '8px',
//     color: '#ffcccc',
//     overflow: 'auto',
//     fontFamily: "'Fira Code', monospace",
//     fontSize: '13px',
//     border: '1px solid #8b000033',
//   },
//   editorHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: '10px 16px',
//     borderBottom: '1px solid #8b000033',
//     background: '#0a0000aa',
//   },
//   langBtns: {
//     display: 'flex',
//     gap: '6px',
//   },
//   langBtn: {
//     padding: '5px 12px',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     fontSize: '12px',
//     fontFamily: "'Cinzel', serif",
//     border: '1px solid #8b000066',
//     transition: 'all 0.2s',
//   },
//   runBtn: {
//     background: 'transparent',
//     color: '#ff8888',
//     border: '1px solid #ff000066',
//     padding: '7px 18px',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontFamily: "'Cinzel Decorative', serif",
//     letterSpacing: '0.1em',
//   },
//   submitBtn: {
//     background: 'linear-gradient(135deg, #6b0000, #cc0000)',
//     color: '#fff',
//     border: 'none',
//     padding: '8px 18px',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontFamily: "'Cinzel Decorative', serif",
//     letterSpacing: '0.1em',
//     boxShadow: '0 0 10px #ff000044',
//   },
//   resultPanel: {
//     background: '#0a0000',
//     padding: '14px 16px',
//     maxHeight: '260px',
//     overflow: 'auto',
//     borderTop: '1px solid #8b000033',
//   },
// };

// // add keyframe spin
// const spinStyle = document.createElement('style');
// spinStyle.textContent = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
// document.head.appendChild(spinStyle);
// frontend/src/pages/ProblemDetail.jsx
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import TierLocked from '../components/TierLocked';
import GojoDomain from '../components/GojoDomain';
import PrisonRealm from '../components/PrisonRealm';
import SukunaDomain from '../components/SukunaDomain';
import Editor from '@monaco-editor/react';

// ------------------------------
// Blood Canvas & Cursed Lines
// ------------------------------
function BloodCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const drips = Array.from({ length: 35 }, () => ({
      x: Math.random() * window.innerWidth,
      y: -Math.random() * 300,
      speed: 0.3 + Math.random() * 1.4,
      width: 1.5 + Math.random() * 5,
      length: 50 + Math.random() * 160,
      alpha: 0.3 + Math.random() * 0.7,
      splat: false, splatR: 0,
      splatMax: 5 + Math.random() * 15,
    }));
    const embers = Array.from({ length: 150 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 0.5 + Math.random() * 3,
      vx: (Math.random() - 0.5) * 0.7,
      vy: -(0.2 + Math.random() * 1),
      alpha: Math.random(),
      type: Math.random() > 0.65 ? 'blue' : 'red',
    }));
    const stains = Array.from({ length: 10 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 80 + Math.random() * 200,
      alpha: 0.02 + Math.random() * 0.06,
    }));
    let frame;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stains.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,0,0,${s.alpha})`;
        ctx.fill();
      });
      drips.forEach(d => {
        if (!d.splat) {
          const grad = ctx.createLinearGradient(d.x, d.y, d.x, d.y + d.length);
          grad.addColorStop(0, `rgba(180,0,0,${d.alpha})`);
          grad.addColorStop(0.6, `rgba(120,0,0,${d.alpha * 0.8})`);
          grad.addColorStop(1, `rgba(80,0,0,0)`);
          ctx.beginPath();
          ctx.moveTo(d.x - d.width / 2, d.y);
          ctx.quadraticCurveTo(d.x + d.width * 0.8, d.y + d.length * 0.5, d.x, d.y + d.length);
          ctx.lineWidth = d.width;
          ctx.strokeStyle = grad;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(d.x, d.y + d.length, d.width * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(140,0,0,${d.alpha * 0.5})`;
          ctx.fill();
          d.y += d.speed;
          if (d.y + d.length > canvas.height) d.splat = true;
        } else {
          d.splatR += 0.6;
          ctx.beginPath();
          ctx.arc(d.x, canvas.height - 2, d.splatR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100,0,0,${0.4 * (1 - d.splatR / d.splatMax)})`;
          ctx.fill();
          if (d.splatR >= d.splatMax) {
            d.y = -Math.random() * 300;
            d.x = Math.random() * canvas.width;
            d.splat = false; d.splatR = 0;
            d.speed = 0.3 + Math.random() * 1.4;
          }
        }
      });
      embers.forEach(e => {
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fillStyle = e.type === 'red'
          ? `rgba(255,${30 + Math.floor(e.alpha * 50)},0,${e.alpha * 0.7})`
          : `rgba(0,${80 + Math.floor(e.alpha * 80)},${180 + Math.floor(e.alpha * 75)},${e.alpha * 0.45})`;
        ctx.fill();
        e.x += e.vx; e.y += e.vy; e.alpha -= 0.003;
        if (e.y < 0 || e.alpha <= 0) {
          e.y = canvas.height + 10;
          e.x = Math.random() * canvas.width;
          e.alpha = 0.3 + Math.random() * 0.7;
        }
      });
      frame = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

function CursedLines() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const lines = Array.from({ length: 7 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      angle: Math.random() * Math.PI * 2,
      speed: 0.006 + Math.random() * 0.01,
      len: 120 + Math.random() * 350,
      alpha: 0, dir: 1,
      col: Math.random() > 0.5 ? '0,100,220' : '170,0,0',
    }));
    let frame;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      lines.forEach(l => {
        l.alpha += 0.007 * l.dir;
        if (l.alpha >= 0.5) l.dir = -1;
        if (l.alpha <= 0) {
          l.dir = 1;
          l.x = Math.random() * canvas.width;
          l.y = Math.random() * canvas.height;
          l.angle = Math.random() * Math.PI * 2;
          l.len = 120 + Math.random() * 350;
        }
        l.angle += l.speed;
        const x2 = l.x + Math.cos(l.angle) * l.len;
        const y2 = l.y + Math.sin(l.angle) * l.len;
        const g = ctx.createLinearGradient(l.x, l.y, x2, y2);
        g.addColorStop(0, `rgba(${l.col},0)`);
        g.addColorStop(0.5, `rgba(${l.col},${l.alpha})`);
        g.addColorStop(1, `rgba(${l.col},0)`);
        ctx.beginPath(); ctx.moveTo(l.x, l.y); ctx.lineTo(x2, y2);
        ctx.strokeStyle = g; ctx.lineWidth = 1.5; ctx.stroke();
      });
      frame = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={ref} style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }} />;
}
// ---------------------------------------------------------------

const starterTemplates = {
  javascript: `// Write your solution here\nfunction solution() {\n  \n}`,
  python: `# Write your solution here\ndef solution():\n    pass`,
  cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n  // Write your solution here\n  return 0;\n}`,
  java: `import java.util.*;\npublic class Solution {\n  public static void main(String[] args) {\n    // Write your solution here\n  }\n}`,
};

const isStarterCode = (code, problem) => {
  const stripped = code.replace(/\s/g, '');
  const genericMatch = Object.values(starterTemplates).some(
    (t) => t.replace(/\s/g, '') === stripped
  );
  if (genericMatch) return true;
  if (problem?.starterCode) {
    const problemMatch = Object.values(problem.starterCode).some(
      (t) => t && t.replace(/\s/g, '') === stripped
    );
    if (problemMatch) return true;
  }
  return false;
};

const difficultyColor = (d) => {
  if (d === 'Easy') return '#00ff88';
  if (d === 'Medium') return '#ffaa00';
  return '#ff4444';
};

export default function ProblemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const textareaRef = useRef(null);

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState(starterTemplates.javascript);
  const [language, setLanguage] = useState('javascript');
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [activeResultTab, setActiveResultTab] = useState('testcases');
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isLocked, setIsLocked] = useState(false);
  const [lockedDifficulty, setLockedDifficulty] = useState('');
  const [showSukuna, setShowSukuna] = useState(true);
  const [showGojo, setShowGojo] = useState(false);
  const [showPrisonRealm, setShowPrisonRealm] = useState(false);
  const [pendingSuccessData, setPendingSuccessData] = useState(null);
  const [pendingFailureData, setPendingFailureData] = useState(null);

  useEffect(() => {
    fetchProblem();
  }, [id]);

  const fetchProblem = async () => {
    try {
      const res = await api.get(`/problems/${id}`);
      const p = res.data.problem;
      if (!user?.unlockedTiers?.includes(p.difficulty)) {
        setIsLocked(true);
        setLockedDifficulty(p.difficulty);
        setShowSukuna(false);
        return;
      }
      setProblem(p);
      const starter = p.starterCode?.[language] || starterTemplates[language];
      setCode(starter);
    } catch (err) {
      if (err.response?.status === 403) {
        setIsLocked(true);
        setLockedDifficulty(err.response?.data?.difficulty || 'this difficulty');
      } else {
        toast.error('Failed to load problem');
        navigate('/problems');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    const starter = problem?.starterCode?.[lang] || starterTemplates[lang];
    setCode(starter);
    setResult(null);
  };

  const formatInput = (input) => {
    if (!input) return '';
    const strInput = typeof input !== 'string' ? String(input) : input;
    
    // If the input consists purely of bracket characters, do NOT format/strip them!
    if (/^[()\[\]{}]+$/.test(strInput.trim())) {
      return strInput;
    }
    
    if (strInput.includes('[') || strInput.includes(',')) {
      if (strInput.trim().startsWith('[') && strInput.trim().endsWith(']')) {
        return strInput.replace(/[\[\]]/g, '').replace(/,/g, ' ').trim();
      }
    }
    return strInput;
  };

  const callLambda = async ({ testCases }) => {
    const formattedTestCases = testCases.map(tc => ({
      id: tc.id,
      input: formatInput(tc.input),
      expected: tc.expected,
    }));
    const res = await api.post('/submissions/run', {
      language,
      code,
      input: problem?.sampleInput || '',
      testCases: formattedTestCases,
    });
    return res.data;
  };

  const handleRun = async () => {
    if (!code.trim()) return toast.error('Write some code first');
    if (isStarterCode(code, problem)) return toast.error('Please write your solution before running');

    setRunning(true);
    setResult(null);
    setActiveResultTab('testcases');

    try {
      const data = await callLambda({
        testCases: [
          { id: 'tc1', input: problem?.sampleInput || '', expected: problem?.sampleOutput || '' },
        ],
      });
      const testResults = data.results || [];
      const fixedResults = testResults.map(tc => ({
        passed: tc.passed === true,
        input: tc.input,
        output: tc.actual || tc.output,
        expected: tc.expected,
        error: tc.stderr || tc.error,
        runtime: tc.executionTime,
      }));
      const allPassed = fixedResults.length > 0 && fixedResults.every(tc => tc.passed === true);
      setResult({ verdict: allPassed ? 'Accepted' : 'Wrong Answer', results: fixedResults, runtime: data.totalExecutionTime, mode: 'run' });
      if (allPassed) {
        toast.success('Sample test passed! 🎉');
      } else {
        setPendingFailureData({ testsPassed: 0, totalTests: 1 });
        setShowPrisonRealm(true);
      }
    } catch (err) {
      toast.error('Execution failed');
      setResult({ verdict: 'Error', error: err.message, mode: 'run' });
    } finally {
      setRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) return toast.error('Write some code first');
    if (isStarterCode(code, problem)) return toast.error('Please write your solution before submitting');

    setSubmitting(true);
    setResult(null);
    setActiveResultTab('testcases');

    try {
      let testCases = [];
      if (problem?.testCases?.length > 0) {
        testCases = problem.testCases.map((tc, i) => ({
          id: tc.id || `tc${i+1}`,
          input: tc.input,
          expected: tc.expected,
        }));
      } else {
        testCases = [{ id: 'tc1', input: problem?.sampleInput || '', expected: problem?.sampleOutput || '' }];
      }

      const data = await callLambda({ testCases });
      const testResults = data.results || [];
      const fixedResults = testResults.map(tc => {
        return {
          passed: tc.passed === true,
          input: tc.input,
          output: tc.actual || tc.output,
          expected: tc.expected,
          error: tc.stderr || tc.error,
          runtime: tc.executionTime,
        };
      });
      const testsPassed = fixedResults.filter(r => r.passed).length;
      const allPassed = testsPassed === fixedResults.length;
      const normalized = {
        verdict: allPassed ? 'Accepted' : 'Wrong Answer',
        results: fixedResults,
        runtime: data.totalExecutionTime,
        mode: 'submit',
        testsPassed,
        totalTests: fixedResults.length,
      };
      setResult(normalized);

      // Save submission
      try {
        await api.post('/submissions', {
          problemId: id,
          language,
          code,
          verdict: normalized.verdict,
          executionTime: normalized.runtime || 0,
          testResults: normalized.results.map(tc => ({
            passed: tc.passed,
            output: tc.output || '',
            expectedOutput: tc.expected || '',
            executionTime: tc.runtime || 0,
          })),
        });
      } catch (saveErr) { console.error('Failed to save submission:', saveErr.message); }

      if (allPassed) {
        setPendingSuccessData({ testsPassed, totalTests: fixedResults.length });
        setShowGojo(true);
      } else {
        setPendingFailureData({ testsPassed, totalTests: fixedResults.length });
        setShowPrisonRealm(true);
      }
    } catch (err) {
      toast.error('Submission failed');
      setResult({ verdict: 'Error', error: err.message, mode: 'submit' });
    } finally {
      setSubmitting(false);
    }
  };

  const onGojoComplete = () => {
    setShowGojo(false);
    if (pendingSuccessData) {
      toast.success(`All ${pendingSuccessData.testsPassed}/${pendingSuccessData.totalTests} test cases passed! 🎉`);
      refreshUser?.();
      setPendingSuccessData(null);
    }
  };

  const onSukunaComplete = () => {
    setShowSukuna(false);
  };

  const onPrisonRealmComplete = () => {
    setShowPrisonRealm(false);
    if (pendingFailureData) {
      toast.error('Wrong Answer - Code Sealed in the Prison Realm 🔒', {
        style: { background: '#1a0000', color: '#ff4444' }
      });
      setPendingFailureData(null);
    }
  };

  const onMouse = (e) => setMouse({ x: e.clientX, y: e.clientY });

  if (loading) {
    return (
      <div style={styles.loadingScreen}>
        <div style={styles.loadingSpinner} />
        <span style={{ color: '#ff4444' }}>Loading cursed domain...</span>
      </div>
    );
  }

  if (isLocked) {
    const requiredTier = lockedDifficulty === 'Medium' ? 'Easy' : 'Medium';
    return <TierLocked difficulty={lockedDifficulty} requiredTier={requiredTier} />;
  }

  return (
    <>
      {showSukuna && <SukunaDomain onComplete={onSukunaComplete} problemTitle={problem?.title} />}
      {showGojo && <GojoDomain onComplete={onGojoComplete} problemTitle={problem?.title} />}
      {showPrisonRealm && (
        <PrisonRealm 
          onComplete={onPrisonRealmComplete} 
          testsPassed={pendingFailureData?.testsPassed} 
          totalTests={pendingFailureData?.totalTests} 
        />
      )}
      <BloodCanvas />
      <CursedLines />
      <div style={{
        position: 'fixed', left: mouse.x - 180, top: mouse.y - 180,
        width: 360, height: 360, borderRadius: '50%',
        background: 'radial-gradient(circle, #ff00000e 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 2,
        transition: 'left 0.08s, top 0.08s',
      }} />
      <div onMouseMove={onMouse} style={styles.container}>
        <div style={{
          position: 'fixed', inset: 0, zIndex: 4, pointerEvents: 'none',
          background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,#00000008 3px,#00000008 4px)',
        }} />
        <div style={{
          position: 'fixed', left: 0, right: 0, height: 2,
          background: 'linear-gradient(to right,transparent,#ff00001a,transparent)',
          zIndex: 4, pointerEvents: 'none',
          animation: 'scanDown 9s linear infinite',
        }} />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cinzel+Decorative:wght@700;900&family=Fira+Code:wght@300;400;600&display=swap');
          @keyframes scanDown { from{transform:translateY(-100%)} to{transform:translateY(100vh)} }
          @keyframes bloodPulse { 0%,100%{box-shadow:0 0 20px #ff000066} 50%{box-shadow:0 0 60px #ff0000cc} }
          @keyframes glitchX { 0%,100%{transform:translateX(0)} 8%{transform:translateX(-2px)} 16%{transform:translateX(2px)} 24%{transform:translateX(0)} }
        `}</style>

        <nav style={styles.nav}>
          <span style={styles.backBtn} onClick={() => navigate('/problems')}>← Hall of Problems</span>
          <span style={styles.problemTitle}>{problem?.title}</span>
          <span style={{ color: difficultyColor(problem?.difficulty) }}>{problem?.difficulty}</span>
        </nav>

        <div style={styles.layout}>
          <div style={styles.leftPanel}>
            <div style={styles.tabs}>
              {['description', 'examples'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{ ...styles.tab, color: activeTab === tab ? '#ff4444' : '#884444' }}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div style={styles.panelContent}>
              {activeTab === 'description' && (
                <>
                  <div style={styles.tags}>
                    {problem?.tags?.map((tag) => <span key={tag} style={styles.tag}>{tag}</span>)}
                    <span style={styles.points}>🏆 {problem?.points} cursed energy</span>
                  </div>
                  <p style={styles.description}>{problem?.description}</p>
                  {problem?.constraints && <pre style={styles.pre}>{problem?.constraints}</pre>}
                </>
              )}
              {activeTab === 'examples' && (
                <div>
                  <h3 style={{ color: '#ff8888' }}>Sample Input</h3>
                  <pre style={styles.pre}>{problem?.sampleInput}</pre>
                  <h3 style={{ color: '#ff8888' }}>Sample Output</h3>
                  <pre style={styles.pre}>{problem?.sampleOutput}</pre>
                  {problem?.explanation && <p style={{ color: '#aaa' }}>{problem?.explanation}</p>}
                </div>
              )}
            </div>
          </div>

          <div style={styles.rightPanel}>
            <div style={styles.editorHeader}>
              <div style={styles.langBtns}>
                {Object.keys(starterTemplates).map((lang) => (
                  <button key={lang} onClick={() => handleLanguageChange(lang)} style={{ ...styles.langBtn, background: language === lang ? '#ff000022' : 'transparent', color: language === lang ? '#ff6666' : '#ff8888' }}>
                    {lang}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={handleRun} disabled={running || submitting} style={styles.runBtn}>
                  {running ? 'Summoning...' : 'Run'}
                </button>
                <button onClick={handleSubmit} disabled={running || submitting} style={styles.submitBtn}>
                  {submitting ? 'Sealing...' : 'Submit'}
                </button>
              </div>
            </div>

            <div style={{
              width: '100%',
              height: result ? '45vh' : '60vh',
              border: '1px solid #8b0000',
              overflow: 'hidden',
              background: '#030000',
            }}>
              <Editor
                height="100%"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={(val) => setCode(val || '')}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  lineNumbers: 'on',
                  fontFamily: "'Fira Code', monospace",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>

            {result && (
              <div style={styles.resultPanel}>
                <div style={{ color: result.verdict === 'Accepted' ? '#00ff88' : '#ff4444' }}>
                  {result.verdict} {result.mode === 'submit' && `(${result.testsPassed}/${result.totalTests} trials passed)`}
                </div>
                {result.results?.map((tc, i) => (
                  <div key={i} style={{ border: `1px solid ${tc.passed ? '#00ff8833' : '#ff444433'}`, padding: '10px', marginTop: '8px', background: '#0a0000' }}>
                    <div>Case {i + 1}: {tc.passed ? '✅' : '❌'}</div>
                    {tc.input && <div>Input: {tc.input}</div>}
                    <div>Got: {tc.output}</div>
                    {!tc.passed && <div>Expected: {tc.expected}</div>}
                    {tc.error && <div style={{ color: '#ff6666' }}>Error: {tc.error}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{
          textAlign: 'center', marginTop: 24, paddingBottom: 24,
          color: '#8b000033', fontSize: 12, letterSpacing: '0.4em', fontFamily: 'serif',
        }}>
          ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ
        </div>
      </div>
    </>
  );
}

const styles = {
  loadingScreen: {
    minHeight: '100vh',
    background: '#030000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    fontFamily: "'Cinzel Decorative', serif",
  },
  loadingSpinner: {
    width: '36px',
    height: '36px',
    border: '3px solid #1a0000',
    borderTop: '3px solid #ff0000',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  container: {
    minHeight: '100vh',
    background: '#030000',
    fontFamily: "'Cinzel', serif",
    color: '#fff',
    position: 'relative',
    zIndex: 3,
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 32px',
    background: 'linear-gradient(to bottom, #06000099, transparent)',
    borderBottom: '1px solid #8b000020',
    position: 'relative',
    zIndex: 10,
  },
  backBtn: {
    color: '#ff6666',
    cursor: 'pointer',
    letterSpacing: '0.1em',
    transition: 'color 0.2s',
  },
  problemTitle: {
    color: '#fff',
    fontSize: '18px',
    fontFamily: "'Cinzel Decorative', serif",
  },
  layout: {
    display: 'flex',
    height: 'calc(100vh - 70px)',
  },
  leftPanel: {
    width: '40%',
    borderRight: '1px solid #8b000033',
    overflow: 'auto',
    background: '#0a0000aa',
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: '#0a0000aa',
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid #8b000033',
    padding: '0 20px',
  },
  tab: {
    background: 'transparent',
    border: 'none',
    padding: '12px 16px',
    cursor: 'pointer',
    fontSize: '13px',
    fontFamily: "'Cinzel', serif",
    letterSpacing: '0.1em',
  },
  panelContent: {
    padding: '20px',
    overflow: 'auto',
  },
  tags: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '16px',
  },
  tag: {
    background: '#1a0000',
    border: '1px solid #8b0000',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    color: '#ff8888',
  },
  points: {
    color: '#ffaa00',
    marginLeft: 'auto',
  },
  description: {
    color: '#ddbbbb',
    lineHeight: 1.8,
  },
  pre: {
    background: '#1a0000',
    padding: '12px',
    borderRadius: '8px',
    color: '#ffcccc',
    overflow: 'auto',
    fontFamily: "'Fira Code', monospace",
    fontSize: '13px',
    border: '1px solid #8b000033',
  },
  editorHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 16px',
    borderBottom: '1px solid #8b000033',
    background: '#0a0000aa',
  },
  langBtns: {
    display: 'flex',
    gap: '6px',
  },
  langBtn: {
    padding: '5px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontFamily: "'Cinzel', serif",
    border: '1px solid #8b000066',
    transition: 'all 0.2s',
  },
  runBtn: {
    background: 'transparent',
    color: '#ff8888',
    border: '1px solid #ff000066',
    padding: '7px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: "'Cinzel Decorative', serif",
    letterSpacing: '0.1em',
  },
  submitBtn: {
    background: 'linear-gradient(135deg, #6b0000, #cc0000)',
    color: '#fff',
    border: 'none',
    padding: '8px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: "'Cinzel Decorative', serif",
    letterSpacing: '0.1em',
    boxShadow: '0 0 10px #ff000044',
  },
  resultPanel: {
    background: '#0a0000',
    padding: '14px 16px',
    maxHeight: '260px',
    overflow: 'auto',
    borderTop: '1px solid #8b000033',
  },
};

// add keyframe spin
const spinStyle = document.createElement('style');
spinStyle.textContent = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
document.head.appendChild(spinStyle);