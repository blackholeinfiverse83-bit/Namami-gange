'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import IntelligenceCard from '@/components/shared/IntelligenceCard';
import BasinIntelligence from '@/components/views/BasinIntelligence';
import ScenarioSimulation from '@/components/views/ScenarioSimulation';
import RealtimeSignals from '@/components/views/RealtimeSignals';
import LocationIntel from '@/components/views/LocationIntel';
import Collaboration from '@/components/views/Collaboration';
import InfraNetwork from '@/components/views/InfraNetwork';
import DatasetSources from '@/components/views/DatasetSources';
import GovernanceView from '@/components/views/GovernanceView';
import FederationTopology from '@/components/shared/FederationTopology';
import ReplayConsole from '@/components/shared/ReplayConsole';
import MapCard from '@/components/shared/MapCard';
import TelemetryCard from '@/components/shared/TelemetryCard';
import AlertCard from '@/components/shared/AlertCard';
import CommandCenter from '@/components/views/CommandCenter';
import styles from './page.module.css';

interface SuitabilityLocation {
  id: string;
  name: string;
  score: number;
  level: 'HIGH' | 'MEDIUM' | 'LOW';
  factors: { label: string; val: string; fill: string; color: string }[];
  constraints: { label: string; val: string; fill: string; color: string }[];
  infrastructure: string[];
  explanation: string;
  tracerId: string;
  confidence: number;
  lat: string;
  lng: string;
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

export default function Home() {
  const [activeTab, setActiveTab] = useState('global');

  // CENTRAL SIMULATOR STATE
  const [isSimulating, setIsSimulating] = useState(true);
  const [activeStep, setActiveStep] = useState(0); // 0: Ingestion, 1: Validation, 2: Replay, 3: Persistence, 4: Federation
  const [currentBlock, setCurrentBlock] = useState(1240);
  const [corrIdNumber, setCorrIdNumber] = useState(9941);
  const [latencyMs, setLatencyMs] = useState(6);
  const [validationBreach, setValidationBreach] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState('varanasi');
  
  // Dynamic logs
  const [replayLogs, setReplayLogs] = useState<ReplayLog[]>([
    { timestamp: '15:14:02', corrId: 'CORR-2026-0528-9941X', block: 1240, status: 'VERIFIED', message: 'Ingestion schema contract match on Varanasi-seaplane' },
    { timestamp: '15:13:48', corrId: 'CORR-2026-0528-9940Y', block: 1239, status: 'COMPATIBLE', message: 'Backward compatibility validated for Patna terminal payload' },
    { timestamp: '15:13:30', corrId: 'CORR-2026-0528-9939Z', block: 1238, status: 'VERIFIED', message: 'State synchronization check matched (0ms deviation)' }
  ]);

  const [recoveryEvents, setRecoveryEvents] = useState<RecoveryEvent[]>([
    { id: 'REC-082', time: '15:08:12', type: 'DRAFT_RECONCILE', status: 'RESOLVED', corrId: 'CORR-2026-0528-9912A', detail: 'Patna depth variance (Δ-0.4m) resolved via automatic weir sync.' },
    { id: 'REC-081', time: '14:52:45', type: 'SCHEMA_ALIGN', status: 'RESOLVED', corrId: 'CORR-2026-0528-9889B', detail: 'JSON payload mismatch on Kanpur sensor cluster corrected via back-version mapping.' }
  ]);

  // Dynamic values of suitability locations
  const [suitabilityLocations, setSuitabilityLocations] = useState<Record<string, SuitabilityLocation>>({
    varanasi: {
      id: 'varanasi',
      name: 'Varanasi Corridor NW-1',
      score: 82,
      level: 'HIGH',
      factors: [
        { label: 'Water Quality (BOD)', val: 'Good (2.1 mg/L)', fill: '82%', color: 'var(--eco-green)' },
        { label: 'Navigational Draft', val: 'Optimal (3.2m)', fill: '88%', color: 'var(--river-blue)' },
        { label: 'Intermodal Connectivity', val: 'Excellent', fill: '90%', color: 'var(--teal)' },
        { label: 'Economic Potential', val: 'Very High', fill: '85%', color: 'var(--river-blue)' }
      ],
      constraints: [
        { label: 'Siltation Risk', val: 'Low-Mod (32%)', fill: '32%', color: 'var(--eco-green)' },
        { label: 'Flow Volatility', val: 'Moderate', fill: '45%', color: 'var(--amber)' },
        { label: 'Habitat Sensitivity', val: 'Protected Zone', fill: '70%', color: 'var(--alert-red)' }
      ],
      infrastructure: ['Inland Waterway Terminal', 'Railway Link Corridor', 'Multimodal Freight hub'],
      explanation: 'Varanasi features high suitability as an intermodal inland port due to reliable river depth (NW-1 corridor draft > 3m), ready rail alignment, and low siltation risk compared to eastern sections. Eco-constraints are moderate due to dolphin sanctuaries nearby.',
      tracerId: 'TRC-VNS-2026-X88',
      confidence: 94,
      lat: '25.3176° N',
      lng: '82.9739° E'
    },
    patna: {
      id: 'patna',
      name: 'Patna Terminal NW-1',
      score: 74,
      level: 'MEDIUM',
      factors: [
        { label: 'Water Quality (BOD)', val: 'Mod (3.4 mg/L)', fill: '68%', color: 'var(--amber)' },
        { label: 'Navigational Draft', val: 'Adequate (2.6m)', fill: '72%', color: 'var(--river-blue)' },
        { label: 'Intermodal Connectivity', val: 'Good', fill: '75%', color: 'var(--teal)' },
        { label: 'Economic Potential', val: 'High', fill: '80%', color: 'var(--river-blue)' }
      ],
      constraints: [
        { label: 'Siltation Risk', val: 'High (78%)', fill: '78%', color: 'var(--alert-red)' },
        { label: 'Flow Volatility', val: 'High Seasonal', fill: '65%', color: 'var(--amber)' },
        { label: 'Habitat Sensitivity', val: 'Low Risk', fill: '25%', color: 'var(--eco-green)' }
      ],
      infrastructure: ['IWAI Jetty Terminal', 'National Highway-31 connector'],
      explanation: 'Patna provides robust economic throughput but is limited by heavy seasonal siltation (siltation risk 78%), requiring regular dredging to maintain a safe 2.5m draft. Economic connectivity via NH-31 is excellent.',
      tracerId: 'TRC-PAT-2026-Y41',
      confidence: 89,
      lat: '25.6112° N',
      lng: '85.1444° E'
    },
    kolkata: {
      id: 'kolkata',
      name: 'Haldia-Kolkata Port Grid',
      score: 88,
      level: 'HIGH',
      factors: [
        { label: 'Water Quality (BOD)', val: 'Good (2.5 mg/L)', fill: '80%', color: 'var(--eco-green)' },
        { label: 'Navigational Draft', val: 'High Draft (4.8m)', fill: '95%', color: 'var(--river-blue)' },
        { label: 'Intermodal Connectivity', val: 'Supreme', fill: '98%', color: 'var(--teal)' },
        { label: 'Economic Potential', val: 'Supreme', fill: '96%', color: 'var(--eco-green)' }
      ],
      constraints: [
        { label: 'Siltation Risk', val: 'Moderate (52%)', fill: '52%', color: 'var(--amber)' },
        { label: 'Flow Volatility', val: 'Tidal (Complex)', fill: '58%', color: 'var(--amber)' },
        { label: 'Habitat Sensitivity', val: 'Mangrove Zone', fill: '85%', color: 'var(--alert-red)' }
      ],
      infrastructure: ['Seaplane Terminal Hub', 'International Cargo Port', 'Railway Junction Network'],
      explanation: 'The Haldia-Kolkata sector has supreme suitability for large-scale maritime freight and logistics integration, maintaining a 4.5m+ draft due to marine tides. Tidal fluctuations require active sync with navigation tables.',
      tracerId: 'TRC-KOL-2026-Z02',
      confidence: 96,
      lat: '22.5726° N',
      lng: '88.3639° E'
    },
    kanpur: {
      id: 'kanpur',
      name: 'Kanpur Industrial Reach',
      score: 38,
      level: 'LOW',
      factors: [
        { label: 'Water Quality (BOD)', val: 'Critical (8.4 mg/L)', fill: '25%', color: 'var(--alert-red)' },
        { label: 'Navigational Draft', val: 'Low (1.4m)', fill: '35%', color: 'var(--alert-red)' },
        { label: 'Intermodal Connectivity', val: 'Moderate', fill: '50%', color: 'var(--amber)' },
        { label: 'Economic Potential', val: 'High', fill: '78%', color: 'var(--river-blue)' }
      ],
      constraints: [
        { label: 'Siltation Risk', val: 'High (82%)', fill: '82%', color: 'var(--alert-red)' },
        { label: 'Flow Volatility', val: 'Critical Lows', fill: '85%', color: 'var(--alert-red)' },
        { label: 'Habitat Sensitivity', val: 'Moderate', fill: '40%', color: 'var(--amber)' }
      ],
      infrastructure: ['Local Jetties', 'Industrial Rail spur'],
      explanation: 'Kanpur stretch is currently classified as Low Suitability due to severe organic pollution (BOD 8.4 mg/L) and extreme siltation coupled with shallow drafts (1.4m average). Major dredging and ecological rehabilitation are mandated before cargo operations.',
      tracerId: 'TRC-KAN-2026-A12',
      confidence: 82,
      lat: '26.4499° N',
      lng: '80.3319° E'
    },
    prayagraj: {
      id: 'prayagraj',
      name: 'Prayagraj Sangam Confluence',
      score: 65,
      level: 'MEDIUM',
      factors: [
        { label: 'Water Quality (BOD)', val: 'Mod (2.8 mg/L)', fill: '75%', color: 'var(--eco-green)' },
        { label: 'Navigational Draft', val: 'Varying (2.1m)', fill: '58%', color: 'var(--amber)' },
        { label: 'Intermodal Connectivity', val: 'Moderate', fill: '60%', color: 'var(--amber)' },
        { label: 'Economic Potential', val: 'Moderate', fill: '65%', color: 'var(--river-blue)' }
      ],
      constraints: [
        { label: 'Siltation Risk', val: 'High (70%)', fill: '70%', color: 'var(--alert-red)' },
        { label: 'Flow Volatility', val: 'High Seasonal', fill: '75%', color: 'var(--alert-red)' },
        { label: 'Habitat Sensitivity', val: 'Religious Confluence', fill: '90%', color: 'var(--alert-red)' }
      ],
      infrastructure: ['Passenger River Terminal', 'National Highway corridor'],
      explanation: 'Prayagraj suitability is graded Medium. Highly variable river flows during summers affect navigation drafts. The Sangam area possesses supreme cultural-religious sensitivity, limiting heavy industrial infrastructure development.',
      tracerId: 'TRC-PRY-2026-M09',
      confidence: 88,
      lat: '25.4358° N',
      lng: '81.8463° E'
    }
  });

  // Dynamic simulation engine loops in background
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      // 1. Advance steps
      setActiveStep((prev) => (prev + 1) % 5);

      // 2. Fluctuated latency
      setLatencyMs((prev) => {
        const offset = Math.floor(Math.random() * 5) - 2;
        const next = prev + offset;
        return next < 3 ? 4 : next > 18 ? 16 : next;
      });

      // 3. Telemetry updates on the selected location
      setSuitabilityLocations((prev) => {
        const copy = { ...prev };
        const loc = copy[selectedLocationId];
        if (loc) {
          // Subtle fluctuations in factors (like draft or quality) to simulate realtime stream
          const indexToMutate = Math.floor(Math.random() * loc.factors.length);
          const f = { ...loc.factors[indexToMutate] };
          if (f.label.includes('Draft')) {
            const currentDraft = parseFloat(f.val.match(/[\d.]+/)?.[0] || '3.0');
            const diff = (Math.random() * 0.2 - 0.1);
            const nextDraft = Math.max(1.0, Math.min(6.0, currentDraft + diff)).toFixed(1);
            f.val = `${nextDraft}m`;
            loc.factors[indexToMutate] = f;
          }
        }
        return copy;
      });

      // 4. If step transitions to block sync, increment block and add log
      setActiveStep((step) => {
        if (step === 3) { // Persistence layer sync
          setCurrentBlock((b) => {
            const nextBlock = b + 1;
            setCorrIdNumber((c) => {
              const nextCorr = c + 1;
              const nextCorrId = `CORR-2026-0528-${nextCorr}${validationBreach ? 'ERR' : 'X'}`;
              
              // Prepend audit log
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
                return [newLog, ...prevLogs.slice(0, 14)];
              });

              if (validationBreach) {
                // Prepend active recovery event
                setRecoveryEvents((prevEvents) => [
                  {
                    id: `REC-${Math.floor(Math.random()*900)+100}`,
                    time: new Date().toLocaleTimeString('en-US', { hour12: false }),
                    type: 'SCHEMA_FALLBACK',
                    status: 'ACTIVE',
                    corrId: nextCorrId,
                    detail: `Anomalous schema structure on Block #${nextBlock}. Initiated fallback reconciliation buffer.`
                  },
                  ...prevEvents
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

  const activeLocData = suitabilityLocations[selectedLocationId] || suitabilityLocations.varanasi;

  const renderContent = () => {
    switch (activeTab) {
      case 'global':
        return (
          <CommandCenter showcaseMode={false} />
        );
      case 'basin':
        return (
          <BasinIntelligence 
            selectedLocationId={selectedLocationId}
            onLocationSelect={setSelectedLocationId}
            validationBreach={validationBreach}
            suitabilityLocations={suitabilityLocations}
          />
        );
      case 'location':
        return (
          <LocationIntel 
            selectedLocationId={selectedLocationId}
            activeLocation={activeLocData}
          />
        );
      case 'simulation':
        return (
          <ScenarioSimulation 
            selectedLocationId={selectedLocationId}
            activeLocation={activeLocData}
            onLocationSelect={setSelectedLocationId}
          />
        );
      case 'signals':
        return (
          <RealtimeSignals 
            replayLogs={replayLogs}
            validationBreach={validationBreach}
            selectedLocationId={selectedLocationId}
            suitabilityLocations={suitabilityLocations}
            onLocationSelect={setSelectedLocationId}
          />
        );
      case 'infra':
        return (
          <InfraNetwork 
            selectedLocationId={selectedLocationId}
            activeLocation={activeLocData}
            validationBreach={validationBreach}
          />
        );
      case 'collab':
        return (
          <Collaboration 
            recoveryEvents={recoveryEvents}
            onResolve={handleManualRecoveryResolve}
            validationBreach={validationBreach}
          />
        );
      case 'governance':
        return (
          <GovernanceView 
            selectedLocationId={selectedLocationId}
            validationBreach={validationBreach}
            currentBlock={currentBlock}
            onLocationSelect={setSelectedLocationId}
          />
        );
      case 'datasets':
        return (
          <DatasetSources 
            latencyMs={latencyMs}
            currentBlock={currentBlock}
            validationBreach={validationBreach}
          />
        );
      default:
        return (
          <div className={styles.placeholder}>
            <h2 className={styles.title}>{activeTab.toUpperCase()} View</h2>
            <p>Intelligence surface initialization in progress...</p>
          </div>
        );
    }
  };

  return (
    <main className={styles.main}>
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <Topbar />
      <div className={styles.content}>
        {renderContent()}
      </div>
    </main>
  );
}
