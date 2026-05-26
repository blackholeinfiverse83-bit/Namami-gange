import React from 'react';
import styles from './View.module.css';
import IntelligenceCard from '../shared/IntelligenceCard';

export default function BasinIntelligence() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Ganga Basin Intelligence</h1>
          <p className={styles.subtitle}>Detailed River System, Infrastructure & Environmental Metrics</p>
        </div>
      </div>

      <div className={styles.basinGrid}>
        <div className={styles.mapLarge} style={{ height: '650px' }}>
        <div className={styles.placeholderMap} style={{ background: '#040e1c' }}>
          <svg viewBox="0 0 600 460" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
              <rect width="600" height="460" fill="transparent" />
              {/* Basin region highlighted */}
              <path
                  d="M 130 60 Q 160 55 200 65 Q 240 58 280 62 Q 320 56 360 68 Q 390 72 415 85 Q 420 100 415 118 Q 408 130 400 145 Q 390 158 375 168 Q 358 175 338 180 Q 316 184 294 182 Q 272 180 252 175 Q 230 168 210 158 Q 190 148 172 135 Q 155 122 142 105 Q 132 88 130 72 Z"
                  fill="rgba(30,136,229,0.07)" stroke="rgba(30,136,229,0.2)" strokeWidth="1"
                  strokeDasharray="4,4" />

              {/* Main Ganga with suitability coloring */}
              <path
                  d="M 128 92 Q 155 88 185 90 Q 210 92 235 94 Q 258 96 280 100 Q 302 103 322 108 Q 340 112 358 116 Q 372 120 385 125"
                  fill="none" stroke="#1E88E5" strokeWidth="3.5" strokeLinecap="round" />

              {/* Tributaries */}
              <path d="M 195 58 Q 200 72 205 86 Q 210 96 215 106 Q 218 115 218 125 Q 216 138 212 148 Q 208 158 203 168" fill="none" stroke="#42A5F5" strokeWidth="2" opacity="0.7" />
              <path d="M 270 58 Q 275 72 278 86 Q 280 98 278 112 Q 275 124 272 136" fill="none" stroke="#42A5F5" strokeWidth="2" opacity="0.6" />
              <path d="M 318 140 Q 312 152 305 162 Q 298 172 290 182" fill="none" stroke="#42A5F5" strokeWidth="1.5" opacity="0.5" />

              {/* Monitoring stations */}
              <circle cx="185" cy="90" r="7" fill="rgba(76,175,80,0.2)" stroke="#4CAF50" strokeWidth="1.5" />
              <circle cx="185" cy="90" r="3" fill="#4CAF50" />
              <circle cx="322" cy="108" r="7" fill="rgba(76,175,80,0.2)" stroke="#4CAF50" strokeWidth="1.5" />
              <circle cx="322" cy="108" r="3" fill="#4CAF50" />

              <circle cx="235" cy="94" r="7" fill="rgba(255,179,0,0.2)" stroke="#FFB300" strokeWidth="1.5" />
              <circle cx="235" cy="94" r="3" fill="#FFB300" />
              <circle cx="280" cy="100" r="7" fill="rgba(255,179,0,0.2)" stroke="#FFB300" strokeWidth="1.5" />
              <circle cx="280" cy="100" r="3" fill="#FFB300" />

              <circle cx="260" cy="97" r="9" fill="rgba(229,57,53,0.2)" stroke="#E53935" strokeWidth="1.5" className={styles.mapRipple} />
              <circle cx="260" cy="97" r="4" fill="#E53935" />

              {/* Ports & Jetties */}
              <rect x="190" y="96" width="6" height="6" rx="1" fill="#42A5F5" opacity="0.8" transform="rotate(45,193,99)" />
              <rect x="298" y="104" width="6" height="6" rx="1" fill="#42A5F5" opacity="0.8" transform="rotate(45,301,107)" />

              {/* Barrages */}
              <rect x="168" y="88" width="8" height="4" rx="1" fill="#FFB300" opacity="0.9" />
              <rect x="310" y="104" width="8" height="4" rx="1" fill="#FFB300" opacity="0.9" />

              {/* Eco zones */}
              <ellipse cx="215" cy="155" rx="28" ry="20" fill="rgba(76,175,80,0.08)" stroke="rgba(76,175,80,0.4)" strokeWidth="0.8" strokeDasharray="3,3" />
              <ellipse cx="350" cy="140" rx="22" ry="16" fill="rgba(76,175,80,0.08)" stroke="rgba(76,175,80,0.4)" strokeWidth="0.8" strokeDasharray="3,3" />

              {/* Labels */}
              <text x="170" y="82" fontSize="7" fill="#90CAF9" fontFamily="Space Mono">HARIDWAR</text>
              <text x="185" y="105" fontSize="7" fill="#90CAF9" fontFamily="Space Mono">PRAYAGRAJ</text>
              <text x="255" y="108" fontSize="7" fill="#E57373" fontFamily="Space Mono">KANPUR ⚠</text>
              <text x="296" y="100" fontSize="7" fill="#90CAF9" fontFamily="Space Mono">VARANASI</text>
              <text x="318" y="120" fontSize="7" fill="#90CAF9" fontFamily="Space Mono">PATNA</text>
              <text x="358" y="125" fontSize="7" fill="#90CAF9" fontFamily="Space Mono">KOLKATA</text>

              {/* Suitability Legend */}
              <rect x="430" y="50" width="140" height="50" rx="4" fill="rgba(8,18,32,0.8)" stroke="rgba(255,255,255,0.06)" />
              <text x="445" y="65" fontSize="8" fill="#8899AA" fontFamily="Inter" fontWeight="600">SUITABILITY</text>
              <defs>
                  <linearGradient id="suitGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#E53935" />
                      <stop offset="50%" stopColor="#FFB300" />
                      <stop offset="100%" stopColor="#4CAF50" />
                  </linearGradient>
              </defs>
              <rect x="445" y="72" width="110" height="6" rx="2" fill="url(#suitGrad)" />
              <text x="445" y="90" fontSize="7" fill="#556070" fontFamily="Inter">Low</text>
              <text x="555" y="90" fontSize="7" fill="#4CAF50" fontFamily="Inter" textAnchor="end">High</text>
          </svg>
          <p className={styles.mapLabel}>RIVER BASIN MAPPING ENGINE — ACTIVE</p>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className={styles.listCard}>
          <div className={styles.cardTitle}>Ganga Basin Overview</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-dim)' }}>Length</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>2,525 km</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-dim)' }}>States</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>5</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-dim)' }}>Districts</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>113</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-dim)' }}>Population</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>~43 Cr</span>
            </div>
          </div>
        </div>

        <div className={styles.listCard}>
          <div className={styles.cardTitle}>Layer Controls</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { label: 'River Network', icon: '〰️', active: true },
              { label: 'Monitoring Stations', icon: '📡', active: true },
              { label: 'Barrages & Dams', icon: '🚧', active: true },
              { label: 'IWT Terminals', icon: '⚓', active: true },
              { label: 'Ports & Jetties', icon: '🚢', active: true },
              { label: 'Logistics Parks', icon: '🏭', active: true },
              { label: 'Environmental Zones', icon: '🌿', active: true },
              { label: 'Suitability Heatmap', icon: '🔥', active: true },
            ].map((layer, i) => (
              <div key={i} className={styles.layerToggle}>
                <div className={styles.layerLabel}>
                  <span style={{ width: '16px', textAlign: 'center' }}>{layer.icon}</span>
                  <span>{layer.label}</span>
                </div>
                <div className={styles.toggleSwitch} style={{ backgroundColor: layer.active ? 'var(--teal)' : 'var(--navy-4)', borderColor: layer.active ? 'transparent' : 'rgba(255,255,255,0.1)' }}>
                  <div className={styles.toggleKnob} style={{ left: layer.active ? '17px' : '1px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

