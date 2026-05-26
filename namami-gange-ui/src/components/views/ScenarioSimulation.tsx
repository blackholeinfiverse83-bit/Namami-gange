import React from 'react';
import styles from './View.module.css';
import MapContainer from '../map/MapContainer';
import SimulationControls from '../shared/SimulationControls';
import IntelligenceCard from '../shared/IntelligenceCard';

export default function ScenarioSimulation() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Scenario Simulation Engine</h1>
          <p className={styles.subtitle}>Predictive Modeling & "What-If" Analysis for Basin Development</p>
        </div>
      </div>

      <div className={styles.simulationGrid}>
        <div className={styles.controlsSide}>
          <SimulationControls />
        </div>
        
        <div className={styles.visualSide}>
          <div className={styles.comparisonGrid}>
            <div className={styles.compareItem}>
              <div className={styles.compareLabel}>Baseline (Scenario A)</div>
              <div className={styles.miniMap}>
                <MapContainer type="basin" />
              </div>
            </div>
            <div className={styles.compareItem}>
              <div className={styles.compareLabel}>Projected (Scenario B)</div>
              <div className={styles.miniMap}>
                <MapContainer type="basin" />
              </div>
            </div>
          </div>

          <div className={styles.deltaAnalysis}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 className={styles.analysisTitle} style={{ margin: 0 }}>Comparison Summary</h3>
            </div>
            <div className={styles.statsRow} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <IntelligenceCard title="Average Suitability" value="+18%" delta="" color="teal" />
              <IntelligenceCard title="High Risk Area" value="-12%" delta="" color="red" />
              <IntelligenceCard title="Economic Potential" value="+27%" delta="" color="green" />
              <IntelligenceCard title="Connectivity Gain" value="+9%" delta="" color="blue" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
