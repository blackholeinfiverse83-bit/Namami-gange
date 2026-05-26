import React from 'react';
import styles from './View.module.css';
import SignalList from '../shared/SignalList';
import ReasoningPanel from '../shared/ReasoningPanel';
import MapContainer from '../map/MapContainer';

export default function RealtimeSignals() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Realtime Signal Center</h1>
          <p className={styles.subtitle}>Unified Event Stream, Telemetry & AI Synthesis</p>
        </div>
      </div>

      <div className={styles.signalsGrid}>
        <div className={styles.signalsListSide}>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '16px', borderBottom: '1px solid var(--border)' }}>
            <button style={{ background: 'none', border: 'none', borderBottom: '2px solid var(--river-blue)', color: 'var(--river-blue)', paddingBottom: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>All Events</button>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', paddingBottom: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Alerts</button>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', paddingBottom: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Anomalies</button>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', paddingBottom: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Observations</button>
          </div>
          <SignalList />
        </div>
        
        <div className={styles.signalsDetailSide}>
          <div className={styles.mapSmall}>
            <MapContainer type="basin" />
          </div>
          <ReasoningPanel />
          
          <div className={styles.listCard} style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 className={styles.cardTitle} style={{ margin: 0 }}>Event Timeline (Last 24 Hours)</h3>
            </div>
            <div style={{ position: 'relative', height: '140px', width: '100%' }}>
              <svg viewBox="0 0 400 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                {/* Axes */}
                <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <line x1="40" y1="0" x2="40" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="120" y1="0" x2="120" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="200" y1="0" x2="200" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="280" y1="0" x2="280" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="360" y1="0" x2="360" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="2,2" />
                
                {/* Labels */}
                <text x="40" y="95" fill="var(--text-dim)" fontSize="9" textAnchor="middle" fontFamily="var(--font-mono)">00:00</text>
                <text x="120" y="95" fill="var(--text-dim)" fontSize="9" textAnchor="middle" fontFamily="var(--font-mono)">06:00</text>
                <text x="200" y="95" fill="var(--text-dim)" fontSize="9" textAnchor="middle" fontFamily="var(--font-mono)">12:00</text>
                <text x="280" y="95" fill="var(--text-dim)" fontSize="9" textAnchor="middle" fontFamily="var(--font-mono)">18:00</text>
                <text x="360" y="95" fill="var(--text-dim)" fontSize="9" textAnchor="middle" fontFamily="var(--font-mono)">24:00</text>

                {/* Line chart */}
                <path d="M 0 70 Q 20 60 40 40 T 80 50 T 120 20 T 160 30 T 200 10 T 240 40 T 280 20 T 320 50 T 360 40 T 400 60" fill="none" stroke="var(--river-blue)" strokeWidth="2.5" />
                
                {/* Area fill */}
                <path d="M 0 70 Q 20 60 40 40 T 80 50 T 120 20 T 160 30 T 200 10 T 240 40 T 280 20 T 320 50 T 360 40 T 400 60 L 400 80 L 0 80 Z" fill="rgba(30,136,229,0.1)" />

                {/* Data points */}
                <circle cx="40" cy="40" r="3.5" fill="var(--river-blue)" />
                <circle cx="120" cy="20" r="3.5" fill="var(--river-blue)" />
                <circle cx="200" cy="10" r="4.5" fill="var(--alert-red)" className={styles.mapRipple} />
                <circle cx="200" cy="10" r="3.5" fill="var(--alert-red)" />
                <circle cx="280" cy="20" r="3.5" fill="var(--alert-orange)" />
                <circle cx="360" cy="40" r="3.5" fill="var(--river-blue)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
