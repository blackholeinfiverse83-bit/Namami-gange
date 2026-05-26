import React from 'react';
import styles from './View.module.css';

export default function LocationIntel() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Location Intelligence · Varanasi</h1>
          <p className={styles.subtitle}>Strategic inland port hub candidate · NW-1 Corridor</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.primaryBtn}>Export Location Report</button>
        </div>
      </div>

      <div className={styles.basinGrid}>
        <div className={styles.mapLarge} style={{ height: '100%', minHeight: '650px' }}>
          <div className={styles.placeholderMap} style={{ backgroundImage: 'radial-gradient(ellipse at center, #0f172a 0%, #050a14 100%)' }}>
             <svg viewBox="0 0 500 500" style={{ width: '100%', height: '100%', opacity: 0.8 }}>
                {/* Simulated Varanasi river map */}
                <path d="M 0 100 Q 150 150 200 300 T 400 500" fill="none" stroke="var(--river-blue)" strokeWidth="12" opacity="0.3" />
                <path d="M 0 100 Q 150 150 200 300 T 400 500" fill="none" stroke="var(--river-light)" strokeWidth="2" />
                <circle cx="200" cy="300" r="16" fill="rgba(255,179,0,0.2)" stroke="#FFB300" strokeWidth="2" className={styles.mapRipple} />
                <circle cx="200" cy="300" r="5" fill="#FFB300" />
                <path d="M 200 300 L 280 230 L 360 260" fill="none" stroke="rgba(76,175,80,0.6)" strokeWidth="2" strokeDasharray="4,4" />
                <circle cx="360" cy="260" r="6" fill="#4CAF50" />
                <text x="225" y="295" fill="#FFB300" fontSize="12" fontWeight="bold" fontFamily="var(--font-mono)">VARANASI HUB</text>
                <text x="375" y="265" fill="#4CAF50" fontSize="10" fontFamily="var(--font-mono)">IWT TERMINAL</text>
             </svg>
             <div className={styles.mapLabel} style={{ position: 'absolute', bottom: '20px', left: '20px' }}>SATELLITE & TRACE OVERLAY</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className={styles.listCard}>
            <div className={styles.cardTitle} style={{ marginBottom: '8px' }}>Suitability Score</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ position: 'relative', width: '60px', height: '60px' }}>
                <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(76,175,80,0.1)" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--eco-green)" strokeWidth="3" strokeDasharray="82, 100" />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--eco-green)' }}>82</div>
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--eco-green)' }}>High Potential</div>
              </div>
            </div>
          </div>

          <div className={styles.listCard}>
            <div className={styles.cardTitle}>Key Factors</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Water Quality', val: 'Good', fill: '72%', color: 'var(--eco-green)' },
                { label: 'Connectivity', val: 'High', fill: '88%', color: 'var(--river-blue)' },
                { label: 'Infrastructure', val: 'Moderate', fill: '55%', color: 'var(--amber)' },
                { label: 'Environmental Risk', val: 'Low', fill: '25%', color: 'var(--eco-green)' },
                { label: 'Economic Potential', val: 'High', fill: '90%', color: 'var(--river-blue)' },
              ].map((factor, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{factor.label}</span>
                    <span style={{ color: factor.color }}>{factor.val}</span>
                  </div>
                  <div style={{ height: '4px', backgroundColor: 'var(--navy-4)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: factor.fill, height: '100%', backgroundColor: factor.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.listCard}>
            <div className={styles.cardTitle}>Infrastructure Nearby</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: 'IWT Terminal', val: '2.3 km' },
                { label: 'Railway Station', val: '3.1 km' },
                { label: 'Logistics Park', val: '12.8 km' }
              ].map((asset, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: 'var(--text-dim)' }}>{asset.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{asset.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.listCard}>
            <div className={styles.cardTitle}>Environmental Sensitivity</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Flow', val: 'Moderate', fill: '50%', color: 'var(--amber)' },
                { label: 'Siltation', val: 'High', fill: '80%', color: 'var(--alert-orange)' },
                { label: 'Biodiversity', val: 'Low', fill: '20%', color: 'var(--eco-green)' },
              ].map((factor, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{factor.label}</span>
                    <span style={{ color: factor.color }}>{factor.val}</span>
                  </div>
                  <div style={{ height: '4px', backgroundColor: 'var(--navy-4)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: factor.fill, height: '100%', backgroundColor: factor.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.listCard}>
            <div className={styles.cardTitle}>Sources & Trace</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: 'var(--text-dim)' }}>Tracer ID</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>ND-120-2026-0408</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: 'var(--text-dim)' }}>Confidence</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>89%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: 'var(--text-dim)' }}>Last Updated</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>2 hr ago</span>
              </div>
            </div>
            <button className={styles.primaryBtn} style={{ width: '100%' }}>View Full Reasoning</button>
          </div>
        </div>
      </div>
    </div>
  );
}
