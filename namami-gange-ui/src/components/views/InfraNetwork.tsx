import React from 'react';
import styles from './View.module.css';

const infraStats = [
  { label: 'Total Ports', value: '40', color: 'blue' },
  { label: 'IWT Terminals', value: '20', color: 'teal' },
  { label: 'Logistics Parks', value: '10', color: 'orange' },
  { label: 'Major Corridors', value: '7', color: 'green' },
];

export default function InfraNetwork() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Infrastructure Network View</h1>
          <p className={styles.subtitle}>Ports · IWT Terminals · Logistics Parks · Hub Connectivity</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.primaryBtn}>Export Network Map</button>
        </div>
      </div>



      <div className={styles.infoGrid} style={{ gridTemplateColumns: '1fr 300px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className={styles.mapLarge} style={{ height: '450px' }}>
            <div className={styles.placeholderMap}>
              <svg viewBox="0 0 540 360" style={{ width: '100%', height: '100%' }}>
                <rect width="540" height="360" fill="transparent" />
                {/* Rail corridors */}
                <path d="M 60 50 L 135 80 L 220 90 L 285 100 L 360 110 L 420 130 L 480 150" fill="none" stroke="rgba(136,153,170,0.3)" strokeWidth="2" />
                <path d="M 80 280 L 140 250 L 200 230 L 270 210 L 340 200 L 400 195 L 460 200" fill="none" stroke="rgba(136,153,170,0.3)" strokeWidth="2" />
                {/* Waterways */}
                <path d="M 55 90 Q 120 82 180 88 Q 240 92 300 96 Q 350 100 395 105 Q 430 110 465 118" fill="none" stroke="var(--river-blue)" strokeWidth="2.5" strokeDasharray="6,4" opacity="0.6" />
                
                {/* Markers */}
                <circle cx="85" cy="250" r="12" fill="rgba(30,136,229,0.2)" stroke="var(--river-blue)" strokeWidth="1.5" />
                <circle cx="85" cy="250" r="4" fill="var(--river-blue)" />
                
                <circle cx="455" cy="210" r="10" fill="rgba(30,136,229,0.2)" stroke="var(--river-blue)" strokeWidth="1.5" />
                <circle cx="455" cy="210" r="4" fill="var(--river-blue)" />
                
                <circle cx="310" cy="98" r="8" fill="rgba(20,184,166,0.2)" stroke="var(--teal)" strokeWidth="1.5" />
                <circle cx="310" cy="98" r="3" fill="var(--teal)" />
              </svg>
              <div className={styles.mapLabel}>NETWORK TOPOLOGY VIEW</div>
            </div>
          </div>

          <div className={styles.statsRow} style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
            {infraStats.map((stat, i) => (
              <div key={i} className={styles.listCard} style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '28px', 
                  fontWeight: '800', 
                  color: `var(--${stat.color === 'blue' ? 'river-blue' : stat.color === 'teal' ? 'teal' : stat.color === 'orange' ? 'alert-orange' : 'eco-green'})`,
                  fontFamily: 'var(--font-display)'
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {stat.label}
                </div>
              </div>
            ))}
            <div className={styles.listCard} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>High</div>
              <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', marginTop: '4px', letterSpacing: '0.05em' }}>Network Density</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className={styles.listCard}>
            <div className={styles.cardTitle}>Infrastructure Layers</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Ports', color: 'var(--river-blue)', active: true },
                { label: 'IWT Terminals', color: 'var(--teal)', active: true },
                { label: 'Logistics Parks', color: 'var(--alert-orange)', active: true },
                { label: 'Railways', color: '#8899AA', active: true },
                { label: 'National Highways', color: '#556677', active: true },
                { label: 'Major Roads', color: '#334455', active: true },
                { label: 'Waterways', color: 'var(--river-blue)', active: true },
              ].map((layer, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: layer.color }}></div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{layer.label}</span>
                  </div>
                  <div style={{ 
                    width: '32px', 
                    height: '16px', 
                    borderRadius: '8px', 
                    backgroundColor: layer.active ? 'var(--teal-dim)' : 'var(--navy-4)',
                    position: 'relative',
                    cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <div style={{ 
                      position: 'absolute', 
                      width: '12px', 
                      height: '12px', 
                      backgroundColor: 'white', 
                      borderRadius: '50%', 
                      top: '1px', 
                      left: layer.active ? '17px' : '1px',
                      transition: 'left 0.2s'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.listCard} style={{ background: 'rgba(20,184,166,0.05)', borderColor: 'rgba(20,184,166,0.2)' }}>
            <div className={styles.cardTitle} style={{ color: 'var(--teal)' }}>Network Health</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>94.2%</div>
            <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px' }}>All corridors operational</div>
          </div>
        </div>
      </div>
    </div>
  );
}
