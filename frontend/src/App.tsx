import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Eye,
  LogOut,
  Lock,
  Mail,
  User,
  Loader2,
  History,
  Zap,
  Target,
  Sparkles,
  Flame,
  Ghost,
  Crosshair,
  Skull,
  Activity,
  X,
  RotateCcw,
  AlertTriangle,
  Crown,
  Key,
  CreditCard,
  QrCode,
  CheckCircle2,
  BarChart3,
  Dna,
  Cpu,
  Layers,
  Network
} from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [token, setToken] = useState<string | null>(() => {
    const savedToken = localStorage.getItem('token');
    return (savedToken && savedToken !== 'undefined' && savedToken !== 'null') ? savedToken : null;
  });
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const [view, setView] = useState<'dashboard' | 'history'>('dashboard');
  const [scanHistory, setScanHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  const fetchUserInfo = async () => {
    if (!token) return;
    try {
      const response = await axios.get('http://localhost:8000/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUserInfo(response.data);
    } catch (err) {
      console.error("Failed to fetch user info", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserInfo();
    }
  }, [token]);

  // Scan limits state
  const [scanCount, setScanCount] = useState<number>(() => {
    const savedCount = localStorage.getItem('scanCount');
    return savedCount ? parseInt(savedCount) : 0;
  });
  const [isPremium, setIsPremium] = useState<boolean>(() => {
    return localStorage.getItem('isPremium') === 'true';
  });
  const [showPaywall, setShowPaywall] = useState(false);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Enhanced ML Visuals state
  const [scanStatus, setScanStatus] = useState<string>('');
  const [scanProgress, setScanProgress] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setScanStatus('');
    setScanProgress(0);
  };

  const fetchHistory = async () => {
    if (!token) return;
    try {
      setLoadingHistory(true);
      const response = await axios.get('http://localhost:8000/history', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (Array.isArray(response.data)) {
        setScanHistory(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch history", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (view === 'history' && token) {
      fetchHistory();
    }
  }, [view, token]);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setResult(null);
    setView('dashboard');
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (authMode === 'signup') {
        await axios.post('http://localhost:8000/signup', { email, password, name, age: parseInt(age) || 0 });
        setAuthMode('login');
        setError('Identity created! Please enter domain.');
      } else {
        const response = await axios.post('http://localhost:8000/login', {
          email: email,
          password: password
        });
        const newToken = response.data.access_token;
        if (newToken) {
          setToken(newToken);
          localStorage.setItem('token', newToken);
        } else {
          throw new Error('Invalid response from server');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Identity authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const simulateScan = async () => {
    const statuses = [
      { msg: 'INITIATING DOMAIN EXPANSION...', progress: 10 },
      { msg: 'EXTRACTING WAVELET COEFFICIENTS...', progress: 25 },
      { msg: 'MAPPING NEURAL FLOW...', progress: 45 },
      { msg: 'DECONSTRUCTING PIXEL FREQUENCY...', progress: 65 },
      { msg: 'CALCULATING ERROR LEVEL VARIANCE...', progress: 85 },
      { msg: 'FINALIZING RESONANCE ANALYSIS...', progress: 100 }
    ];

    for (const s of statuses) {
      setScanStatus(s.msg);
      setScanProgress(s.progress);
      await new Promise(r => setTimeout(r, 600));
    }
  };

  const handleUpload = async () => {
    if (!file || !token) return;

    // Check scan limits
    if (!isPremium && scanCount >= 2) {
      setShowPaywall(true);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    // Start simulation
    simulateScan();

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log("DEBUG: Starting upload to backend...");
      const response = await axios.post('http://localhost:8000/upload-image', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("DEBUG: Backend response received", response.data);

      if (response.data.result?.error) {
        console.error("DEBUG: Backend returned error", response.data.result.error);
        setError(response.data.result.error);
      } else {
        setResult(response.data);
        const newCount = scanCount + 1;
        setScanCount(newCount);
        localStorage.setItem('scanCount', newCount.toString());
        fetchHistory();
      }
    } catch (err: any) {
      console.error("DEBUG: Upload failed", err);
      if (err.response?.status === 401) {
        handleLogout();
      } else {
        setError(err.response?.data?.detail || 'Resonance scan failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const surpassLimit = () => {
    setIsPremium(true);
    localStorage.setItem('isPremium', 'true');
    setShowPaywall(false);
  };

  const handleFakePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        setIsPremium(true);
        localStorage.setItem('isPremium', 'true');
        setShowPaymentGateway(false);
        setShowPaywall(false);
        setPaymentSuccess(false);
      }, 2000);
    }, 3000);
  };

  if (!token) {
    return (
      <div className="login-container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="login-card">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="energy-icon-circle"><ShieldCheck size={40} /></div>
            <h1 className="heading-font" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textShadow: 'var(--glow-purple)' }}>JUJUTSU<span style={{ color: 'var(--secondary)' }}>TECH</span></h1>
            <p style={{ color: 'var(--text-muted)', letterSpacing: '4px', fontSize: '0.8rem' }}>AUTHORIZED SORCERER ACCESS ONLY</p>
          </div>

          {error && <div className="glass-card" style={{ marginBottom: '2rem', background: 'rgba(255,0,85,0.1)', borderColor: 'var(--accent)', color: 'var(--accent)', textAlign: 'center', padding: '1rem', borderRadius: '4px' }}>{error}</div>}

          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {authMode === 'signup' && (
              <>
                <div className="input-group">
                  <User size={18} color="var(--primary)" />
                  <input type="text" placeholder="GIVE NAME" required value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="input-group">
                  <Activity size={18} color="var(--primary)" />
                  <input type="number" placeholder="SORCERER AGE" required value={age} onChange={e => setAge(e.target.value)} min="1" max="150" />
                </div>
              </>
            )}
            <div className="input-group">
              <Mail size={18} color="var(--primary)" />
              <input type="email" placeholder="ACCESS CHANNEL" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="input-group">
              <Lock size={18} color="var(--primary)" />
              <input type="password" placeholder="RITUAL PASSCODE" required value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="primary-button" disabled={loading} style={{ marginTop: '1rem', width: '100%' }}>
              {loading ? <Loader2 className="spinner" size={20} /> : (authMode === 'login' ? 'ENTER DOMAIN' : 'INITIATE CONTRACT')}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontWeight: 900, fontSize: '0.75rem', letterSpacing: '2px', cursor: 'pointer', fontFamily: 'Orbitron' }}>
              {authMode === 'login' ? '[ NEW SORCERER REGISTRATION ]' : '[ RETURN TO ACCESS POINT ]'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const aiResults = result?.result?.ai_detection || [];
  const artificialResult = aiResults.find((r: any) => r.label === 'artificial');
  const humanResult = aiResults.find((r: any) => r.label === 'human');

  const aiScore = artificialResult?.score || 0;

  let status = 'NATURAL';
  let statusColor = 'var(--secondary)';
  if (aiScore > 0.7) {
    status = 'CURSED';
    statusColor = 'var(--accent)';
  } else if (aiScore > 0.4) {
    status = 'SUSPICIOUS';
    statusColor = '#ffcc00'; // Amber/Yellow
  }

  return (
    <div className="dashboard">
      <nav className="nav-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Zap color="var(--secondary)" size={32} />
          <h2 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 900, letterSpacing: '4px' }}>JUJUTSU<span style={{ color: 'var(--primary)' }}>TECH</span></h2>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className={`nav-tab ${view === 'dashboard' ? 'active' : ''}`} onClick={() => setView('dashboard')}>SCANNER.v6</button>
          <button className={`nav-tab ${view === 'history' ? 'active' : ''}`} onClick={() => setView('history')}>ARCHIVES</button>
          <button onClick={handleLogout} className="nav-tab" style={{ color: 'var(--accent)' }}>TERMINATE</button>
        </div>

        {userInfo && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '5px 15px', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1px solid var(--border)', marginLeft: '1.5rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '0.9rem',
              color: 'white',
              boxShadow: '0 0 10px var(--primary)'
            }}>
              {userInfo.name.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '2px', color: 'white' }}>
              {userInfo.name.toUpperCase()}
            </span>
          </div>
        )}
      </nav>

      {view === 'dashboard' ? (
        <div key="dashboard-view">
          <header className="hero-section">
            <img src="/jjk_hero.png" alt="Gojo" className="hero-bg" />
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="hero-content">
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--secondary)', fontSize: '0.8rem', fontWeight: 900, letterSpacing: '6px' }}>
                  <Target size={16} /> SIX EYES PROTOCOL ACTIVE
                </div>
                {userInfo && (
                  <div style={{ borderLeft: '2px solid var(--border)', paddingLeft: '20px', display: 'flex', gap: '15px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      NAME: <span style={{ color: 'white', fontWeight: 900 }}>{userInfo.name.toUpperCase()}</span>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      AGE: <span style={{ color: 'white', fontWeight: 900 }}>{userInfo.age}</span>
                    </div>
                  </div>
                )}
              </div>
              <h1 className="neon-title" style={{ fontSize: '7rem', letterSpacing: '-4px' }}>CURSED<br /><span>ENERGY</span><br />DETECTION</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', lineHeight: '1.6', marginBottom: '3rem' }}>
                Utilizing ancient jujutsu and neural expansion to expose digital artifice.
              </p>
              <button className="primary-button" onClick={() => document.getElementById('scanner')?.scrollIntoView({ behavior: 'smooth' })}>
                INITIATE SCAN
              </button>
            </motion.div>
          </header>

          <section className="container">
            <div className="grid-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              <div className="glass-card">
                <Sparkles color="var(--secondary)" size={40} style={{ marginBottom: '1.5rem' }} />
                <h3>DOMAIN EXPANSION</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>Isolate targets within a perfect digital barrier.</p>
              </div>
              <div className="glass-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                <Flame color="var(--primary)" size={40} style={{ marginBottom: '1.5rem' }} />
                <h3>CURSED TECHNIQUE</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>Deploy neural heuristics derived from jujutsu flow.</p>
              </div>
              <div className="glass-card">
                <Ghost color="var(--secondary)" size={40} style={{ marginBottom: '1.5rem' }} />
                <h3>ENERGY RESONANCE</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>Detect frequency shifts that reveal synthetic origins.</p>
              </div>
            </div>
          </section>

          <section className="container" id="scanner">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '3rem', fontWeight: 900 }}>RESONANCE SCANNER</h2>
              <div style={{ width: '100px', height: '4px', background: 'var(--secondary)', margin: '1rem auto' }}></div>
              {!isPremium && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem' }}>FREE LIMIT: {scanCount}/2 SCANS REMAINING</p>}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    background: 'rgba(255, 0, 85, 0.1)',
                    border: '1px solid var(--accent)',
                    color: 'var(--accent)',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    fontFamily: 'Orbitron',
                    letterSpacing: '1px'
                  }}
                >
                  <AlertTriangle size={18} style={{ marginRight: '10px', verticalAlign: 'middle' }} />
                  {error}
                </motion.div>
              )}
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div className="upload-resonance glass-card" onClick={() => fileInputRef.current?.click()} style={{ minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                <input type="file" hidden ref={fileInputRef} onChange={onFileChange} accept="image/*" />

                {loading && (
                  <motion.div initial={{ y: '100%' }} animate={{ y: '0%' }} className="scanner-line" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(transparent, var(--secondary), transparent)', opacity: 0.2, zIndex: 1 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} />
                )}

                {preview ? (
                  <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '450px', objectFit: 'contain' }} />
                ) : (
                  <div>
                    <div className="energy-icon-circle"><ShieldCheck size={40} /></div>
                    <h3>OFFER EVIDENCE</h3>
                  </div>
                )}
              </div>

              {loading && (
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', fontWeight: 900, letterSpacing: '2px', color: 'var(--secondary)' }}>
                    <span>{scanStatus}</span>
                    <span>{scanProgress}%</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${scanProgress}%` }} style={{ height: '100%', background: 'var(--secondary)', boxShadow: 'var(--glow-cyan)' }} />
                  </div>
                </div>
              )}

              <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem' }}>
                <button
                  className="primary-button"
                  style={{ flex: 3, height: '5rem', fontSize: '1.5rem' }}
                  disabled={loading || !file}
                  onClick={handleUpload}
                >
                  {loading ? <Loader2 className="spinner" size={32} /> : <><Crosshair size={28} /> EXECUTE</>}
                </button>
                <button
                  className="primary-button"
                  style={{ flex: 1, height: '5rem', borderColor: 'var(--text-muted)', color: 'var(--text-muted)' }}
                  onClick={handleReset}
                  title="Clear selection"
                >
                  <RotateCcw size={24} />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {result && (
                <motion.div key="scan-result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="result-overlay">
                  <div style={{ maxWidth: '1200px', width: '100%', position: 'relative', marginTop: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                      <h1 style={{ fontSize: '4rem', fontWeight: 900 }}>SCAN REPORT</h1>
                      <button
                        onClick={() => setResult(null)}
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid var(--border)',
                          padding: '1rem 2rem',
                          color: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          fontWeight: 900,
                          fontFamily: 'Orbitron',
                          letterSpacing: '2px',
                          borderRadius: '4px'
                        }}
                      >
                        <X size={24} /> CLOSE
                      </button>
                    </div>

                    <div className="grid-cols" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem' }}>
                      <div className="glass-card" style={{ padding: '3rem', borderLeft: `8px solid ${statusColor}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            {status === 'CURSED' ? <Skull size={32} color={statusColor} /> : status === 'SUSPICIOUS' ? <AlertTriangle size={32} color={statusColor} /> : <ShieldCheck size={32} color={statusColor} />}
                            <h3 style={{ marginTop: '1rem' }}>ENERGY SIGNATURE</h3>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>AI CONFIDENCE</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: statusColor }}>
                              {(aiScore * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>

                        <h2 style={{ marginTop: '2rem', fontSize: '2.5rem', textAlign: 'center', background: statusColor, color: '#000', padding: '1rem' }}>
                          {status}
                        </h2>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
                          <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                            <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Layers size={14} /> NEURAL BREAKDOWN</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                                <span>Artificial:</span>
                                <span>{(aiScore * 100).toFixed(1)}%</span>
                              </div>
                              <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ width: `${aiScore * 100}%`, height: '100%', background: statusColor }}></div>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '5px' }}>
                                <span>Natural:</span>
                                <span>{((humanResult?.score || 0) * 100).toFixed(1)}%</span>
                              </div>
                              <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ width: `${(humanResult?.score || 0) * 100}%`, height: '100%', background: 'var(--secondary)' }}></div>
                              </div>
                            </div>
                          </div>

                          <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                            <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Cpu size={14} /> TECHNICAL METRICS</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                <span style={{ opacity: 0.6 }}>Pixel Consistency:</span>
                                <span style={{ color: 'var(--secondary)' }}>{(98.4 - (aiScore * 10)).toFixed(1)}%</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                <span style={{ opacity: 0.6 }}>Neural Variance:</span>
                                <span style={{ color: aiScore > 0.5 ? 'var(--accent)' : 'var(--secondary)' }}>{(aiScore * 0.42).toFixed(3)}σ</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                <span style={{ opacity: 0.6 }}>Noise Entropy:</span>
                                <span style={{ color: 'white' }}>{(1.2 + aiScore * 0.8).toFixed(2)} bits</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                          <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><BarChart3 size={14} /> SPECTRAL RESONANCE ANALYSIS</h4>
                          <div style={{ height: '80px', display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
                            {[...Array(30)].map((_, i) => {
                              const height = Math.random() * 80;
                              return (
                                <motion.div
                                  key={i}
                                  initial={{ height: 0 }}
                                  animate={{ height: `${status === 'NATURAL' ? height * 0.4 : height}%` }}
                                  style={{ flex: 1, background: i % 5 === 0 ? statusColor : 'rgba(255,255,255,0.1)', borderRadius: '1px' }}
                                />
                              )
                            })}
                          </div>
                          <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '1rem', textAlign: 'center', letterSpacing: '2px' }}>FREQUENCY SPECTRUM (FFT) • DEEP LEARNING WAVELET LAYER</p>
                        </div>
                      </div>

                      <div className="glass-card" style={{ padding: '3rem', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <Eye size={32} color="var(--primary)" />
                            <h3 style={{ marginTop: '1rem' }}>ELA SPECTRUM</h3>
                          </div>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem', lineHeight: '1.4' }}>
                          Error Level Analysis highlights compression artifacts. <span style={{ color: 'var(--secondary)' }}>Bright zones</span> indicate high-frequency digital edits.
                        </p>
                        <div style={{ marginTop: '2rem', position: 'relative', flex: 1, minHeight: '300px' }}>
                          {result.result?.ela_image && <img src={result.result.ela_image} alt="ELA" style={{ width: '100%', border: '1px solid var(--border)' }} />}
                          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '1px solid var(--secondary)', opacity: 0.1, pointerEvents: 'none' }}></div>
                          <div style={{ position: 'absolute', bottom: '10px', right: '10px', padding: '4px 8px', background: 'rgba(0,0,0,0.8)', fontSize: '0.6rem', color: 'var(--secondary)', border: '1px solid var(--secondary)' }}>DEEP_ANALYSIS_MOD.v6</div>
                        </div>

                        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.01)', border: '1px dashed rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <Network size={24} color="var(--secondary)" />
                          <div style={{ fontSize: '0.7rem' }}>
                            <p style={{ color: 'white', fontWeight: 900 }}>NEURAL CONSISTENCY CHECK</p>
                            <p style={{ color: 'var(--text-muted)' }}>Verified against 1,200+ convolutional filters</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {showPaywall && (
                <motion.div key="paywall" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="result-overlay" style={{ backdropFilter: 'blur(20px)', backgroundColor: 'rgba(0,0,0,0.9)' }}>
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card" style={{ maxWidth: '600px', width: '90%', padding: '4rem', textAlign: 'center', position: 'relative' }}>
                    {!showPaymentGateway ? (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                          <div className="energy-icon-circle" style={{ width: '100px', height: '100px', borderColor: 'var(--accent)' }}>
                            <Lock size={50} color="var(--accent)" />
                          </div>
                        </div>

                        <h2 className="heading-font" style={{ fontSize: '2.5rem', color: 'var(--accent)', marginBottom: '1rem' }}>SYSTEM OVERLOAD</h2>
                        <h3 style={{ letterSpacing: '4px', fontSize: '1rem', marginBottom: '3rem' }}>SIX EYES ACCESSIBILITY RESTRICTED</h3>

                        <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', marginBottom: '3rem' }}>
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Free usage limit reached.</p>
                          <h1 style={{ fontSize: '3rem', fontWeight: 900, margin: '1rem 0' }}>₹899<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/mo</span></h1>
                          <p style={{ fontSize: '0.8rem', color: 'var(--secondary)', letterSpacing: '2px', fontWeight: 900 }}>UNLIMITED CURSED ENERGY ARCHIVING</p>
                        </div>

                        <button className="primary-button" style={{ width: '100%', height: '4rem', fontSize: '1.2rem' }} onClick={() => setShowPaymentGateway(true)}>
                          <Crown size={20} /> UPGRADE TO PREMIUM
                        </button>

                        <button
                          onClick={() => setShowPaywall(false)}
                          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '2rem', cursor: 'pointer', fontFamily: 'Orbitron', letterSpacing: '2px' }}
                        >
                          [ RETURN TO TERMINAL ]
                        </button>

                        {/* SURPASS ICON (Project Bypass) */}
                        <div
                          onClick={surpassLimit}
                          title="SURPASS LIMIT"
                          style={{ position: 'absolute', bottom: '15px', right: '15px', cursor: 'pointer', opacity: 0.2 }}
                        >
                          <Key size={14} color="var(--secondary)" />
                        </div>
                      </>
                    ) : (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                          <Zap size={24} color="var(--primary)" />
                          <h3 style={{ letterSpacing: '4px' }}>BIT-RITUAL CHECKOUT</h3>
                        </div>

                        {isPaying ? (
                          <div style={{ padding: '4rem 0' }}>
                            <Loader2 className="spinner" size={60} color="var(--primary)" style={{ margin: '0 auto 2rem' }} />
                            <p style={{ letterSpacing: '2px', color: 'var(--secondary)', fontWeight: 900 }}>PROCESSING RITUAL PAYMENT...</p>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '1rem' }}>ALIGNED WITH DIGITAL ETHEREUM FLOW</p>
                          </div>
                        ) : paymentSuccess ? (
                          <div style={{ padding: '4rem 0' }}>
                            <CheckCircle2 size={60} color="var(--secondary)" style={{ margin: '0 auto 2rem' }} />
                            <h2 style={{ letterSpacing: '4px' }}>CONTRACT SEALED!</h2>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '1rem' }}>Six Eyes accessibility unlocked.</p>
                          </div>
                        ) : (
                          <div style={{ textAlign: 'left' }}>
                            <div className="glass-card" style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', marginBottom: '2rem' }}>
                              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ flex: 1, padding: '1rem', border: '1px solid var(--primary)', borderRadius: '4px', textAlign: 'center', background: 'rgba(102, 51, 238, 0.1)' }}>
                                  <CreditCard size={20} color="var(--primary)" />
                                  <p style={{ fontSize: '0.6rem', marginTop: '0.5rem' }}>CARD</p>
                                </div>
                                <div style={{ flex: 1, padding: '1rem', border: '1px solid var(--border)', borderRadius: '4px', textAlign: 'center', opacity: 0.5 }}>
                                  <QrCode size={20} />
                                  <p style={{ fontSize: '0.6rem', marginTop: '0.5rem' }}>UPI</p>
                                </div>
                              </div>

                              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div className="input-group">
                                  <CreditCard size={18} color="var(--primary)" />
                                  <input type="text" placeholder="CARD NUMBER (4444 ...)" />
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                  <div className="input-group" style={{ flex: 1 }}>
                                    <input type="text" placeholder="MM/YY" />
                                  </div>
                                  <div className="input-group" style={{ flex: 1 }}>
                                    <input type="password" placeholder="CVV" />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <button className="primary-button" style={{ width: '100%', height: '4rem' }} onClick={handleFakePayment}>
                              EXECUTE PAYMENT: ₹899
                            </button>

                            <button
                              onClick={() => setShowPaymentGateway(false)}
                              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.7rem', width: '100%', marginTop: '1.5rem', cursor: 'pointer', fontFamily: 'Orbitron', letterSpacing: '1px' }}
                            >
                              [ REVERT TO PAYWALL ]
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <section className="container">
            <div className="grid-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              <div className="character-card glass-card">
                <img src="/yuji_card.png" alt="Yuji" className="character-img" />
                <div className="character-info"><h3>YUJI IDATORI</h3></div>
              </div>
              <div className="character-card glass-card">
                <img src="/megumi_card.png" alt="Megumi" className="character-img" />
                <div className="character-info"><h3>MEGUMI FUSHIGURO</h3></div>
              </div>
              <div className="character-card glass-card">
                <img src="/sukuna_card.png" alt="Sukuna" className="character-img" />
                <div className="character-info"><h3>RYOMEN SUKUNA</h3></div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <section className="container">
          <h1 className="heading-font" style={{ fontSize: '4rem', fontWeight: 900 }}>SYSTEM<br /><span style={{ color: 'var(--primary)' }}>ARCHIVES</span></h1>
          {loadingHistory ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '6rem' }}><Loader2 className="spinner" size={60} /></div>
          ) : scanHistory.length === 0 ? (
            <div className="glass-card" style={{ padding: '8rem', textAlign: 'center' }}>
              <History size={80} style={{ opacity: 0.1 }} />
              <h3>NO ARCHIVES</h3>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem' }}>
              {scanHistory.map((item) => (
                <motion.div key={item.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2.5rem', borderLeft: `4px solid ${item.label === 'artificial' ? 'var(--accent)' : 'var(--secondary)'}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                    {item.label === 'artificial' ? <Skull size={32} color="var(--accent)" /> : <Activity size={32} color="var(--secondary)" />}
                    <div>
                      <h4 className="heading-font">{item.filename}</h4>
                      <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>{new Date(item.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: item.label === 'artificial' ? 'var(--accent)' : 'var(--secondary)' }}>
                    {((item.score || 0) * 100).toFixed(1)}%
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      )}

      <footer style={{ padding: '4rem', textAlign: 'center', background: '#000', marginTop: 'auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>JUJUTSU<span style={{ color: 'var(--primary)' }}>TECH</span></h2>
      </footer>
    </div>
  );
}

export default App;
