import React from 'react';
import styles from './ReasoningPanel.module.css';

interface ReasoningPanelProps {
  target?: string;
  reasoning?: string;
  confidence?: number;
}

export default function ReasoningPanel({ 
  target = "Varanasi Sector — Anomaly SIG-0941", 
  reasoning = "Anomaly detected due to sudden variance in water turbidity (Δ+15%) coupled with localized vessel congregation. Cross-referencing with weather data suggests low-probability of natural cause. Likely unauthorized sand mining or discharge event.",
  confidence = 94
}: ReasoningPanelProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <span className={styles.title}>AI Reasoning Engine</span>
      </div>
      
      <div className={styles.content}>
        <div className={styles.target}>{target}</div>
        <p className={styles.reasoning}>{reasoning}</p>
        
        <div className={styles.footer}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Confidence</span>
            <span className={styles.statValue}>{confidence}%</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Trace ID</span>
            <span className={styles.statValue}>TRC-8829-X</span>
          </div>
        </div>
      </div>
      
      <div className={styles.actions}>
        <button className={styles.actionBtn}>Deploy Onsite Unit</button>
        <button className={styles.secondaryBtn}>Dismiss Signal</button>
      </div>
    </div>
  );
}
