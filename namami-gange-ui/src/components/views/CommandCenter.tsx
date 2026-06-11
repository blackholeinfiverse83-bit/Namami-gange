'use client';

import React, { useState, useEffect } from 'react';
import styles from './CommandCenter.module.css';
import MapCard from '../shared/MapCard';
import FederationTopology from '../shared/FederationTopology';
import SignalList from '../shared/SignalList';

interface CommandCenterProps {
  showcaseMode?: boolean;
}

interface Dataset {
  name: string;
  owner: string;
  category: string;
  coverage: string;
  updated: string;
  contribution: string;
  confidence: string;
  product: string;
}

interface ReplayLog {
  timestamp: string;
  corrId: string;
  block: number;
  status: 'VERIFIED' | 'COMPATIBLE' | 'BREACH' | 'REPLAYING';
  message: string;
}

interface RecoveryEvent {
  id: string;
  time: string;
  type: string;
  status: 'RESOLVED' | 'ACTIVE';
  corrId: string;
  detail: string;
}

// Curated Datasets for Phase 3 (Mandatory)
const curatedDatasets: Dataset[] = [
  {
    name: 'IWAI Depth Survey',
    owner: 'IWAI',
    category: 'Navigability',
    coverage: 'National Waterway 1',
    updated: 'Real-time',
    contribution: 'Depth Availability',
    confidence: 'High',
    product: 'Bathymetry API'
  },
  {
    name: 'ISRO Bhuvan Satellite Imagery',
    owner: 'ISRO',
    category: 'Geospatial',
    coverage: 'Ganga Basin-wide',
    updated: '6 Hours Ago',
    contribution: 'Siltation Mapping',
    confidence: 'High',
    product: 'Sentinel-2 Multispectral'
  },
  {
    name: 'CWC River Gauge Network',
    owner: 'CWC',
    category: 'Hydrology',
    coverage: 'Prayagraj to Farakka',
    updated: 'Real-time',
    contribution: 'Flow Rate & Velocity',
    confidence: 'Critical',
    product: 'Telematic Gauge Sensor Grid'
  },
  {
    name: 'MoPSW Inland Vessels API',
    owner: 'MoPSW',
    category: 'Logistics',
    coverage: 'NW-1 Corridor',
    updated: '5ms Delay',
    contribution: 'Vessel AIS Tracking',
    confidence: 'High',
    product: 'AIS Stream API'
  },
  {
    name: 'UP PCB Sensor Registry',
    owner: 'UP PCB',
    category: 'Environmental Compliance',
    coverage: 'Kanpur & Varanasi Reach',
    updated: 'Real-time',
    contribution: 'BOD & Dissolved Oxygen levels',
    confidence: 'High',
    product: 'Chemical Telemetry API'
  }
];

export default function CommandCenter({ showcaseMode = false }: CommandCenterProps) {
  // STATE DEFINITIONS
  const [selectedLocationId, setSelectedLocationId] = useState('varanasi');
  const [isSimulating, setIsSimulating] = useState(!showcaseMode);
  const [activeStep, setActiveStep] = useState(0);
  const [currentBlock, setCurrentBlock] = useState(1240);
  const [corrIdNumber, setCorrIdNumber] = useState(9941);
  const [latencyMs, setLatencyMs] = useState(6);
  const [validationBreach, setValidationBreach] = useState(false);
  const [systemTime, setSystemTime] = useState('');

  // Graceful degradation state for testing Phase 7
  const [payloadData, setPayloadData] = useState<any>(null);
  const [isFeedConnected, setIsFeedConnected] = useState(true);

  // Replay timeline
  const [replayLogs, setReplayLogs] = useState<ReplayLog[]>([
    { timestamp: '15:14:02', corrId: 'CORR-2026-0528-9941X', block: 1240, status: 'VERIFIED', message: 'Ingestion schema contract match on Varanasi-seaplane' },
    { timestamp: '15:13:48', corrId: 'CORR-2026-0528-9940Y', block: 1239, status: 'COMPATIBLE', message: 'Backward compatibility validated for Patna terminal payload' },
    { timestamp: '15:13:30', corrId: 'CORR-2026-0528-9939Z', block: 1238, status: 'VERIFIED', message: 'State synchronization check matched (0ms deviation)' }
  ]);

  // Recovery events
  const [recoveryEvents, setRecoveryEvents] = useState<RecoveryEvent[]>([
    { id: 'REC-082', time: '15:08:12', type: 'DRAFT_RECONCILE', status: 'RESOLVED', corrId: 'CORR-2026-0528-9912A', detail: 'Patna depth variance (Δ-0.4m) resolved via automatic weir sync.' },
    { id: 'REC-081', time: '14:52:45', type: 'SCHEMA_ALIGN', status: 'RESOLVED', corrId: 'CORR-2026-0528-9889B', detail: 'JSON payload mismatch on Kanpur sensor cluster corrected via back-version mapping.' }
  ]);

  // Dynamic values of suitability locations
  const suitabilityLocations: Record<string, any> = {
    varanasi: {
      name: 'Varanasi Corridor NW-1',
      score: 82,
      level: 'HIGH',
      lat: '25.3176° N',
      lng: '82.9739° E',
      draft: '3.2m',
      bod: '2.1 mg/L',
      confidence: 94,
      owner: 'A. Shastri (IWAI Regional Command)',
      recommendation: 'Optimal draft. Authorized for seaplane scheduling and modal transshipment.',
      directive: 'DEPLOY SEAPLANE FLIGHT PATROL',
      risk: 'Low Siltation Risk (32%)'
    },
    patna: {
      name: 'Patna Terminal NW-1',
      score: 74,
      level: 'MEDIUM',
      lat: '25.6112° N',
      lng: '85.1444° E',
      draft: '2.6m',
      bod: '3.4 mg/L',
      confidence: 89,
      owner: 'S. K. Sinha (IWAI Dredging Ops)',
      recommendation: 'Accelerate dredging cycles near Jetty 2 due to silt accumulation trends.',
      directive: 'ACTIVATE EMERGENCY SILTATION DREDGE',
      risk: 'High Siltation Risk (78%)'
    },
    kolkata: {
      name: 'Haldia-Kolkata Port Grid',
      score: 88,
      level: 'HIGH',
      lat: '22.5726° N',
      lng: '88.3639° E',
      draft: '4.8m',
      bod: '2.5 mg/L',
      confidence: 96,
      owner: 'Capt. M. Bannerjee (Kolkata Port Authority)',
      recommendation: 'Coordinate deep draft vessels with upcoming high-tide windows.',
      directive: 'SYNCHRONIZE DEEP DRAFT TIDAL MATRIX',
      risk: 'Protected Mangrove Zone'
    },
    kanpur: {
      name: 'Kanpur Industrial Reach',
      score: 38,
      level: 'LOW',
      lat: '26.4499° N',
      lng: '80.3319° E',
      draft: '1.4m',
      bod: '8.4 mg/L',
      confidence: 82,
      owner: 'Dr. N. Gavane (UPPCB Monitoring Division)',
      recommendation: 'Critical depth and pollution breach. Divert deep-draft shipping; mandate compliance audits.',
      directive: 'ENFORCE INDUSTRIAL COMPLIANCE LIMITS',
      risk: 'Critical Organic Effluents (BOD 8.4)'
    },
    prayagraj: {
      name: 'Prayagraj Sangam Confluence',
      score: 65,
      level: 'MEDIUM',
      lat: '25.4358° N',
      lng: '81.8463° E',
      draft: '2.1m',
      bod: '2.8 mg/L',
      confidence: 88,
      owner: 'R. Tripathi (CWC Hydrology Unit)',
      recommendation: 'Monitor confluence draft fluctuations; adjust weir release gates upstream.',
      directive: 'SYNC CONFLUENCE WEIR RELEASE GATES',
      risk: 'Religious Confluence Zones'
    }
  };

  const activeLocData = suitabilityLocations[selectedLocationId] || suitabilityLocations.varanasi;

  // Consume RUNTIME_OBSERVABILITY_PAYLOAD.json
  useEffect(() => {
    if (!isFeedConnected) {
      setPayloadData(null); // Simulate disconnected feeds
      return;
    }
    fetch('/RUNTIME_OBSERVABILITY_PAYLOAD.json')
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => {
        setPayloadData(data);
      })
      .catch(err => {
        console.warn('API connection failed. Fallback to offline data.', err);
        // Fallback structure to maintain layout logic
        setPayloadData({
          systemHealth: 'SECURE (FALLBACK BUFFER)',
          nodeStatus: 'DEGRADED RUNTIME',
          federationStatus: 'OFFLINE CACHE',
          replayStatus: 'LOCAL CHAIN',
          messageThroughput: '0.0k msg/s',
          validationSuccess: '100%',
          persistenceSuccess: '100%',
          locationSyncStatus: 'Disconnected (0ms Sync)',
          correlationIds: ['CORR-FALLBACK-001X'],
          nodes: [
            { id: 'ingest', label: 'Ingestion Broker', status: 'offline', metric: '0 msg/s' },
            { id: 'valid', label: 'Schema Contract', status: 'offline', metric: 'Offline' },
            { id: 'replay', label: 'Replay Core', status: 'offline', metric: 'Offline' },
            { id: 'persist', label: 'Persistence Store', status: 'offline', metric: 'Offline' },
            { id: 'federate', label: 'Federation Matrix', status: 'offline', metric: 'Offline' }
          ]
        });
      });
  }, [isFeedConnected]);

  // Update dynamic time
  useEffect(() => {
    setSystemTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    const timeInterval = setInterval(() => {
      setSystemTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  // Central Tick Simulation Loop
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);

      setLatencyMs((prev) => {
        const offset = Math.floor(Math.random() * 5) - 2;
        const next = prev + offset;
        return next < 3 ? 4 : next > 18 ? 14 : next;
      });

      setActiveStep((step) => {
        if (step === 3) {
          setCurrentBlock((b) => {
            const nextBlock = b + 1;
            setCorrIdNumber((c) => {
              const nextCorr = c + 1;
              const nextCorrId = `CORR-2026-0528-${nextCorr}${validationBreach ? 'ERR' : 'X'}`;
              
              setReplayLogs((prevLogs) => {
                const newLog: ReplayLog = validationBreach 
                  ? {
                      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
                      corrId: nextCorrId,
                      block: nextBlock,
                      status: 'BREACH',
                      message: `CRITICAL: Contract schema breach detected on ${selectedLocationId.toUpperCase()} telemetry node.`
                    }
                  : {
                      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
                      corrId: nextCorrId,
                      block: nextBlock,
                      status: 'VERIFIED',
                      message: `Deterministic replay validated successfully for block #${nextBlock}.`
                    };
                return [newLog, ...prevLogs.slice(0, 10)];
              });

              if (validationBreach) {
                setRecoveryEvents((prevEvents) => [
                  {
                    id: `REC-${Math.floor(Math.random() * 900) + 100}`,
                    time: new Date().toLocaleTimeString('en-US', { hour12: false }),
                    type: 'SCHEMA_FALLBACK',
                    status: 'ACTIVE',
                    corrId: nextCorrId,
                    detail: `Anomalous schema structure on Block #${nextBlock}. Initiated fallback reconciliation buffer.`
                  },
                  ...prevEvents.slice(0, 5)
                ]);
              }

              return nextCorr;
            });
            return nextBlock;
          });
        }
        return step;
      });

    }, 3000);

    return () => clearInterval(interval);
  }, [isSimulating, selectedLocationId, validationBreach]);

  const toggleBreachSimulation = () => {
    setValidationBreach((v) => !v);
  };

  const handleManualRecoveryResolve = (id: string) => {
    setRecoveryEvents((prev) => 
      prev.map(evt => evt.id === id ? { ...evt, status: 'RESOLVED' } : evt)
    );
  };

  // Safe variables for rendering
  const systemHealth = payloadData?.systemHealth || (validationBreach ? 'ANOMALOUS' : 'SECURE');
  const nodeStatusText = payloadData?.nodeStatus || 'DETERMINISTIC';
  const correlationIdsList = payloadData?.correlationIds || [`CORR-2026-0528-${corrIdNumber}${validationBreach ? 'ERR' : 'X'}`];
  
  return (
    <div className={styles.container}>
      {/* ZONE 1: TOP STATUS BAR */}
      <div className={styles.card} style={{ padding: '8px 12px', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: systemHealth.includes('ANOMALOUS') ? 'var(--alert-red)' : 'var(--eco-green)', animation: 'pulse 1.5s infinite' }}></div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '12px', letterSpacing: '0.05em' }}>
            NAMAMI GANGE · OPERATIONAL INTELLIGENCE COMMAND CENTER
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
          <div>
            <span style={{ color: 'var(--text-dim)' }}>LOCATION: </span>
            <select 
              value={selectedLocationId} 
              onChange={(e) => setSelectedLocationId(e.target.value)}
              style={{ background: 'var(--surface-2)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '11px', padding: '2px 6px', outline: 'none', cursor: 'pointer' }}
            >
              <option value="varanasi">Varanasi NW-1</option>
              <option value="patna">Patna Terminal</option>
              <option value="kolkata">Kolkata Hub</option>
              <option value="kanpur">Kanpur Reach</option>
              <option value="prayagraj">Prayagraj Sangam</option>
            </select>
          </div>

          <div>
            <span style={{ color: 'var(--text-dim)' }}>STATE: </span>
            <span style={{ color: systemHealth.includes('ANOMALOUS') ? 'var(--alert-red)' : 'var(--teal)' }}>
              {validationBreach ? 'ANOMALOUS BREACH ⚠' : 'DETERMINISTIC SYNC'}
            </span>
          </div>

          <div>
            <span style={{ color: 'var(--text-dim)' }}>TIME: </span>
            <span style={{ color: 'var(--text-secondary)' }}>{systemTime || '15:14:02'} UTC</span>
          </div>
        </div>
      </div>

      {/* THREE COLUMN GRID */}
      <div className={styles.mainGrid}>
        
        {/* LEFT COLUMN: OBSERVABILITY, CONTROLS, AND PRIORITY CONDITIONS */}
        <div className={styles.column}>
          {/* ZONE 8: OBSERVABILITY ZONE */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Observability Topology</span>
              <span className={styles.cardSubtitle}>Latency: {latencyMs}ms</span>
            </div>
            
            <FederationTopology 
              activeStep={activeStep} 
              latencyMs={latencyMs}
              nodes={payloadData?.nodes || [
                { id: 'ingest', label: 'Ingestion Broker', status: 'active', metric: '4.8k msg/s' },
                { id: 'valid', label: 'Schema Contract', status: validationBreach ? 'error' : 'processing', metric: validationBreach ? 'MISMATCH' : '100% Match' },
                { id: 'replay', label: 'Replay Core', status: validationBreach ? 'recovering' : 'active', metric: '1.2x Speed' },
                { id: 'persist', label: 'Persistence Store', status: 'active', metric: '4ms Delay' },
                { id: 'federate', label: 'Federation Matrix', status: validationBreach ? 'recovering' : 'active', metric: validationBreach ? '92.4% Sync' : '99.9% Sync' }
              ]}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '4px 6px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                <div style={{ color: 'var(--text-dim)' }}>THROUGHPUT</div>
                <div style={{ fontWeight: 'bold', color: 'var(--river-light)', marginTop: '2px' }}>
                  {payloadData?.messageThroughput || '4.8k msg/s'}
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '4px 6px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                <div style={{ color: 'var(--text-dim)' }}>VALIDATION SUCCESS</div>
                <div style={{ fontWeight: 'bold', color: validationBreach ? 'var(--alert-red)' : 'var(--teal)', marginTop: '2px' }}>
                  {validationBreach ? '91.8%' : (payloadData?.validationSuccess || '100.0%')}
                </div>
              </div>
            </div>
          </div>

          {/* ZONE 3: PRIORITY CONDITIONS ZONE & RECOVERY CONTROLS */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Priority Conditions & Constraints</span>
              <span className={styles.cardSubtitle}>Active Alerts</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ borderLeft: '2.5px solid var(--alert-red)', background: 'rgba(239, 68, 68, 0.04)', padding: '6px 8px', borderRadius: '4px' }}>
                <div style={{ fontSize: '10.5px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                  {validationBreach ? 'SCHEMA COMPATIBILITY MISMATCH' : 'ECOLOGICAL SPEED THRESHOLD'}
                </div>
                <p style={{ fontSize: '9.5px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.3' }}>
                  {validationBreach 
                    ? 'Uttar Pradesh PCB node failed active schema contract check. Processing fallback buffer.' 
                    : 'Sanctuary buffer restrictions active. Heavy freight vessel speed limited to 8 knots.'}
                </p>
              </div>

              {selectedLocationId === 'kanpur' && (
                <div style={{ borderLeft: '2.5px solid var(--amber)', background: 'rgba(245, 158, 11, 0.04)', padding: '6px 8px', borderRadius: '4px' }}>
                  <div style={{ fontSize: '10.5px', fontWeight: 'bold', color: 'var(--text-primary)' }}>CRITICAL DEPTH DEVIATION (Δ-1.6m)</div>
                  <p style={{ fontSize: '9.5px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.3' }}>
                    Industrial dredging deficit. Average channel depth 1.4m. Diverting multimodal vessel flows.
                  </p>
                </div>
              )}
            </div>

            {/* Simulation controls - Hidden in showcase mode */}
            {!showcaseMode && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
                <span className={styles.cardSubtitle} style={{ textTransform: 'uppercase' }}>Simulation Harness</span>
                <div className={styles.controlsRow}>
                  <button 
                    className={`${styles.controlBtn} ${isSimulating ? styles.pauseBtn : styles.playBtn}`}
                    onClick={() => setIsSimulating(!isSimulating)}
                  >
                    {isSimulating ? '⏸ PAUSE TICK' : '▶ START TICK'}
                  </button>
                  <button 
                    className={`${styles.controlBtn} ${validationBreach ? styles.clearBtn : styles.breachBtn}`}
                    onClick={toggleBreachSimulation}
                  >
                    {validationBreach ? '✓ CLEAR BREACH' : '⚡ TRIGGER BREACH'}
                  </button>
                </div>

                {/* Hardening switches */}
                <div style={{ display: 'flex', gap: '8px', fontSize: '9.5px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={isFeedConnected} 
                      onChange={() => setIsFeedConnected(c => !c)} 
                    />
                    FEED CONNECTED
                  </label>
                  <span style={{ color: isFeedConnected ? 'var(--eco-green)' : 'var(--alert-red)' }}>
                    [{isFeedConnected ? 'LIVE' : 'DISCONNECTED'}]
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CENTER COLUMN: GEOSPATIAL MAP & DATASET INTELLIGENCE */}
        <div className={styles.column}>
          {/* ZONE 2: LIVE STATE ZONE (MAP) */}
          <div className={styles.card} style={{ padding: '10px' }}>
            <MapCard 
              selectedMarkerId={selectedLocationId}
              onMarkerSelect={setSelectedLocationId}
              activeLayers={['waterways', 'seaplanes', 'logistics']}
              activeLocationCoords={{ lat: activeLocData.lat, lng: activeLocData.lng }}
            />
          </div>

          {/* ZONE 6: DATASET INTELLIGENCE ZONE (MANDATORY) */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Dataset Intelligence Registry</span>
              <span className={styles.cardSubtitle} style={{ color: 'var(--teal)' }}>Active: {curatedDatasets.length} / Trust: 98%</span>
            </div>

            <div className={styles.datasetGrid}>
              {curatedDatasets.map((ds, idx) => (
                <div key={idx} className={styles.datasetItem}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{ds.name}</span>
                    <span className={`${styles.payloadBadge} ${styles.payloadOPERATIONAL_SIGNAL}`} style={{ fontSize: '8.5px', padding: '1px 4px' }}>
                      {ds.owner}
                    </span>
                  </div>
                  
                  <div className={styles.datasetMetaRow}>
                    <div>
                      <span className={styles.metaLabel}>Category:</span> {ds.category}
                    </div>
                    <div>
                      <span className={styles.metaLabel}>Coverage:</span> {ds.coverage}
                    </div>
                    <div>
                      <span className={styles.metaLabel}>Confidence:</span> 
                      <span style={{ color: ds.confidence === 'Critical' ? 'var(--alert-red)' : 'var(--teal)', fontWeight: 'bold' }}> {ds.confidence}</span>
                    </div>
                  </div>

                  <div className={styles.datasetMetaRow} style={{ marginTop: '2px', borderTop: '1px solid rgba(255,255,255,0.02)', paddingTop: '2px' }}>
                    <div style={{ gridColumn: 'span 2' }}>
                      <span className={styles.metaLabel}>Contribution:</span> {ds.contribution}
                    </div>
                    <div>
                      <span className={styles.metaLabel}>Product:</span> {ds.product}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SUITABILITY TELEMETRY, RECOMMENDATIONS, TIMELINE */}
        <div className={styles.column}>
          {/* ZONE 2: TELEMETRY ZONE & ZONE 7: OWNERSHIP ZONE */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>River Telemetry & Suitability</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span className={`${styles.payloadBadge} ${styles.payloadLIVE_STATE}`}>{activeLocData.level}</span>
                <span className={`${styles.payloadBadge} ${styles.payloadCONFIDENCE_EVOLUTION}`}>{activeLocData.score}% Score</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '5px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                <div style={{ color: 'var(--text-dim)' }}>CHANNEL DRAFT</div>
                <div style={{ fontSize: '11.5px', fontWeight: 'bold', color: 'var(--river-light)', marginTop: '2px' }}>{activeLocData.draft}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '5px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                <div style={{ color: 'var(--text-dim)' }}>WATER QUALITY (BOD)</div>
                <div style={{ fontSize: '11.5px', fontWeight: 'bold', color: parseFloat(activeLocData.bod) > 5 ? 'var(--alert-red)' : 'var(--eco-green)', marginTop: '2px' }}>{activeLocData.bod}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '5px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                <div style={{ color: 'var(--text-dim)' }}>CONFIDENCE</div>
                <div style={{ fontSize: '11.5px', fontWeight: 'bold', color: 'var(--teal)', marginTop: '2px' }}>{activeLocData.confidence}%</div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '8px', fontSize: '11px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>
                <span>HUMAN OWNERSHIP ZONE</span>
                <span style={{ color: 'var(--river-light)' }}>IWAI Lead</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '14px' }}>👤</span>
                <div>
                  <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{activeLocData.owner.split('(')[0].trim()}</div>
                  <div style={{ fontSize: '9.5px', color: 'var(--text-secondary)' }}>{activeLocData.owner.substring(activeLocData.owner.indexOf('(') + 1, activeLocData.owner.indexOf(')'))}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ZONE 4: RECOMMENDATIONS ZONE */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Recommended Action Directive</span>
              <span className={`${styles.payloadBadge} ${styles.payloadRECOMMENDED_ACTION}`}>DECISION ASSIST</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ background: 'rgba(20, 184, 166, 0.03)', border: '1px solid rgba(20, 184, 166, 0.15)', borderRadius: '6px', padding: '10px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--teal)', fontWeight: 'bold' }}>
                  DIRECTIVE: {activeLocData.directive}
                </div>
                <p style={{ fontSize: '11.5px', color: 'var(--text-primary)', marginTop: '4px', lineHeight: '1.4' }}>
                  {activeLocData.recommendation}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginTop: '8px', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '4px' }}>
                  <span>Impact: +14% Suitability</span>
                  <span>Risk Level: Normal</span>
                </div>
              </div>
            </div>
          </div>

          {/* ZONE 9: HISTORICAL TIMELINE ZONE & ZONE 5: SIGNALS ZONE */}
          <div className={styles.card} style={{ flexGrow: 1, minHeight: 0 }}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Historical Replay Chain</span>
              <span className={styles.cardSubtitle}>Block height: #{currentBlock}</span>
            </div>

            <div className={styles.timelineScroll}>
              {replayLogs.map((log, index) => (
                <div 
                  key={index} 
                  className={`${styles.timelineItem} ${log.status === 'BREACH' ? styles.timelineItemError : ''}`}
                >
                  <span className={styles.timelineTime}>{log.timestamp}</span>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 'bold', color: log.status === 'BREACH' ? 'var(--alert-red)' : 'var(--teal)' }}>
                        {log.corrId.split('-').pop()}
                      </span>
                      <span style={{ color: 'var(--text-dim)' }}>#{log.block}</span>
                    </div>
                    <div className={styles.timelineText}>{log.message}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* BOTTOM PANEL: ZONE 3: NETWORK RECOVERY & AUDIT SURFACE */}
      <div className={styles.card} style={{ flexShrink: 0, padding: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
          <span style={{ fontSize: '9px', fontWeight: 'bold', letterSpacing: '0.08em', color: 'var(--text-secondary)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            System Event Recovery Ledger
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', color: validationBreach ? 'var(--alert-red)' : 'var(--teal)' }}>
            {validationBreach ? '⚠ 1 SCHEMA ANOMALY REQUIRE RECONCILIATION' : '✓ persistent state: secure'}
          </span>
        </div>

        <div className={styles.recoveryList}>
          {recoveryEvents.map((evt) => (
            <div 
              key={evt.id} 
              className={`${styles.recoveryCard} ${evt.status === 'ACTIVE' ? styles.recoveryCardActive : ''}`}
            >
              <div className={styles.recoveryHeader}>
                <span className={styles.recoveryTitle}>{evt.type}</span>
                <span className={`${styles.recoveryStatus} ${evt.status === 'ACTIVE' ? styles.statusActive : styles.statusResolved}`}>
                  {evt.status}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '10.5px', lineHeight: '1.3' }}>
                {evt.detail}
              </p>
              <div className={styles.recoveryFooter}>
                <span>Corr ID: {evt.corrId}</span>
                <span>Time: {evt.time}</span>
                {evt.status === 'ACTIVE' && (
                  <button 
                    className={styles.reconcileBtn}
                    onClick={() => handleManualRecoveryResolve(evt.id)}
                  >
                    RESOLVE BREACH
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
