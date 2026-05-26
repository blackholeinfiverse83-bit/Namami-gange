import React from 'react';
import styles from './SignalList.module.css';

interface Signal {
  id: string;
  time: string;
  text: string;
  severity: 'low' | 'medium' | 'high';
}

const signals: Signal[] = [
  { id: 'SIG-1042', time: '10 min ago', text: 'High Turbidity Detected (Ganga River, Patna)', severity: 'high' },
  { id: 'SIG-1043', time: '25 min ago', text: 'Industrial Discharge Detected (Yamuna River, Delhi)', severity: 'medium' },
  { id: 'SIG-1044', time: '45 min ago', text: 'Flood Risk Increase (Damodar River, Lucknow)', severity: 'high' },
  { id: 'SIG-1045', time: '1 hr ago', text: 'Low Dissolved Oxygen (Kosi River, Bihar)', severity: 'medium' },
  { id: 'SIG-1046', time: '2 hr ago', text: 'Illegal Sand Mining Detected (Son River, Bihar)', severity: 'high' },
];

export default function SignalList() {
  return (
    <div className={styles.container}>
      {signals.map((signal) => (
        <div key={signal.id} className={styles.item}>
          <div className={`${styles.indicator} ${styles[signal.severity]}`}></div>
          <div className={styles.content}>
            <div className={styles.header}>
              <span className={styles.id}>{signal.id}</span>
              <span className={styles.time}>{signal.time}</span>
            </div>
            <div className={styles.text}>{signal.text}</div>
            <div className={styles.confidence}>
              <div className={styles.confBar} style={{ width: signal.severity === 'high' ? '98%' : '85%' }}></div>
              <span className={styles.confLabel}>Confidence: {signal.severity === 'high' ? '98%' : '85%'}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
