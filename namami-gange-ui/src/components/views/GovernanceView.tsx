import React from 'react';
import styles from './View.module.css';

export default function GovernanceView() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>CM / Governance Intelligence View</h1>
          <p className={styles.subtitle}>Executive strategic overview · High-level intelligence synthesis</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.primaryBtn}>Share with Secretariat</button>
        </div>
      </div>

      <div className={styles.statsRow} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className={styles.listCard} style={{ borderTop: '2px solid var(--eco-green)' }}>
          <div className={styles.cardTitle}>Top Opportunity Zones</div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--eco-green)' }}>12</div>
          <div style={{ fontSize: '10px', color: 'var(--text-dim)', marginTop: '4px' }}>Varanasi, Patna corridors</div>
        </div>
        <div className={styles.listCard} style={{ borderTop: '2px solid var(--alert-orange)' }}>
          <div className={styles.cardTitle}>High-Risk Regions</div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--alert-orange)' }}>18</div>
          <div style={{ fontSize: '10px', color: 'var(--text-dim)', marginTop: '4px' }}>Flood + pollution zones</div>
        </div>
        <div className={styles.listCard} style={{ borderTop: '2px solid var(--alert-red)' }}>
          <div className={styles.cardTitle}>Critical Alerts</div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--alert-red)' }}>23</div>
          <div style={{ fontSize: '10px', color: 'var(--text-dim)', marginTop: '4px' }}>Requires immediate action</div>
        </div>
        <div className={styles.listCard} style={{ borderTop: '2px solid var(--river-blue)' }}>
          <div className={styles.cardTitle}>Investment Potential</div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--river-blue)' }}>₹2.4T</div>
          <div style={{ fontSize: '10px', color: 'var(--text-dim)', marginTop: '4px' }}>Estimated infra value</div>
        </div>
      </div>

      <div className={styles.infoGrid} style={{ gridTemplateColumns: '1fr 320px', marginBottom: '16px' }}>
        <div className={styles.mapLarge} style={{ height: '400px' }}>
          <div className={styles.placeholderMap} style={{ background: 'radial-gradient(ellipse at 40% 50%, #0a2540 0%, #051020 70%)' }}>
             <svg viewBox="0 0 560 300" style={{ width: '100%', height: '100%' }}>
                <rect width="560" height="300" fill="transparent" />
                {/* India Outline */}
                <path d="M 100 25 Q 180 18 250 26 Q 310 22 360 32 Q 395 42 405 60 Q 412 78 405 95 Q 395 112 380 125 Q 360 138 335 148 Q 308 156 280 158 Q 252 158 228 152 Q 200 144 178 132 Q 155 118 138 100 Q 122 82 112 62 Q 102 44 100 30 Z" fill="rgba(13,27,46,0.6)" stroke="rgba(30,136,229,0.2)" strokeWidth="0.8" />
                
                {/* Opportunity Zones */}
                <ellipse cx="200" cy="68" rx="28" ry="20" fill="rgba(76,175,80,0.15)" stroke="rgba(76,175,80,0.5)" strokeWidth="1" />
                <ellipse cx="290" cy="72" rx="22" ry="16" fill="rgba(76,175,80,0.15)" stroke="rgba(76,175,80,0.5)" strokeWidth="1" />
                <ellipse cx="335" cy="80" rx="18" ry="14" fill="rgba(76,175,80,0.1)" stroke="rgba(76,175,80,0.4)" strokeWidth="1" />
                
                {/* Risk Zones */}
                <ellipse cx="155" cy="80" rx="20" ry="14" fill="rgba(229,57,53,0.1)" stroke="rgba(229,57,53,0.3)" strokeWidth="0.8" strokeDasharray="3,3" />
                <ellipse cx="258" cy="75" rx="16" ry="12" fill="rgba(255,104,0,0.1)" stroke="rgba(255,104,0,0.3)" strokeWidth="0.8" strokeDasharray="3,3" />
                
                {/* Waterway main */}
                <path d="M 118 68 Q 155 64 195 67 Q 230 70 265 74 Q 298 77 325 82 Q 348 86 368 90" fill="none" stroke="#1E88E5" strokeWidth="2" opacity="0.6" />
                
                {/* Key city markers */}
                <circle cx="200" cy="68" r="5" fill="#4CAF50" opacity="0.9" />
                <circle cx="290" cy="72" r="5" fill="#4CAF50" opacity="0.9" />
                <circle cx="335" cy="80" r="4" fill="#4CAF50" opacity="0.9" />
                <circle cx="258" cy="75" r="4" fill="#FF6800" opacity="0.8" />
                <circle cx="155" cy="80" r="4" fill="#E53935" opacity="0.8" />

                <text x="200" y="58" fontSize="7" fill="#A5D6A7" fontFamily="Space Mono" textAnchor="middle">VARANASI</text>
                <text x="290" y="62" fontSize="7" fill="#A5D6A7" fontFamily="Space Mono" textAnchor="middle">PATNA</text>
                <text x="335" y="70" fontSize="7" fill="#A5D6A7" fontFamily="Space Mono" textAnchor="middle">KOLKATA</text>
             </svg>
             <div className={styles.mapLabel}>STRATEGIC INTELLIGENCE MAP</div>
          </div>
        </div>

        <div className={styles.listCard}>
          <div className={styles.cardTitle}>Strategic Insights</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { title: 'Varanasi Corridor', desc: 'Multimodal terminal convergence · ₹340B', color: 'var(--eco-green)' },
              { title: 'NW-1 Development', desc: 'Allahabad–Haldia stretch · 14 terminals', color: 'var(--river-blue)' },
              { title: 'Brahmaputra Belt', desc: 'Northeast connectivity gap · 8 projects', color: 'var(--river-blue)' },
            ].map((insight, i) => (
              <div key={i} className={styles.govInsight} style={{ borderLeftColor: insight.color }}>
                <div className={styles.giTitle}>{insight.title}</div>
                <div className={styles.giDesc}>{insight.desc}</div>
              </div>
            ))}
          </div>
          
          <hr className={styles.divider} />
          
          <div>
             <div className={styles.cardTitle} style={{ fontSize: '10px' }}>Focus Areas</div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: 'var(--alert-orange)' }}>●</span> Pollution Control — Kanpur to Patna stretch</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: 'var(--river-blue)' }}>●</span> NW-1 Infrastructure — 14 terminal upgrades</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: 'var(--eco-green)' }}>●</span> Logistics Connectivity — Last-mile to hinterland</div>
             </div>
          </div>
        </div>
      </div>

      <div className={styles.grid3}>
        <div className={styles.listCard}>
          <div className={styles.cardTitle}>Economic Corridors</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { name: 'Ganga Economic Corridor', status: 'Active', color: 'Green' },
              { name: 'Eastern Freight Corridor', status: 'Phase 2', color: 'Blue' },
              { name: 'Brahmaputra Connectivity', status: 'Planned', color: 'Orange' },
              { name: 'NE Waterway Grid', status: 'Study', color: 'Gray' },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{c.name}</span>
                <span className={`${styles.chip} ${styles['chip' + c.color]}`}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.listCard}>
          <div className={styles.cardTitle}>Environmental Risk Regions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { name: 'Kanpur–Allahabad', status: 'Critical', val: '88%', color: 'var(--alert-red)' },
              { name: 'Delhi NCR Stretch', status: 'High', val: '72%', color: 'var(--alert-orange)' },
              { name: 'Brahmaputra Delta', status: 'Moderate', val: '52%', color: 'var(--amber)' },
              { name: 'Godavari Basin', status: 'Low', val: '22%', color: 'var(--eco-green)' },
            ].map((r, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{r.name}</span>
                  <span style={{ fontSize: '10px', color: r.color }}>{r.status}</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: r.val, backgroundColor: r.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.listCard}>
          <div className={styles.cardTitle}>Connectivity Gaps</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { title: 'Last-mile to Hinterland', desc: '34 districts underserved', color: 'var(--alert-red)' },
              { title: 'Intermodal Transfer Points', desc: '12 gaps identified on NW-1', color: 'var(--alert-orange)' },
              { title: 'NE Waterway Coverage', desc: 'Only 3 of 7 routes navigable', color: 'var(--amber)' },
              { title: 'Real-time Data Gaps', desc: '28 stations offline', color: 'var(--river-blue)' },
            ].map((gap, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <div className={styles.dot} style={{ backgroundColor: gap.color, marginTop: '4px' }}></div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-primary)', fontWeight: '600' }}>{gap.title}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-dim)' }}>{gap.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
