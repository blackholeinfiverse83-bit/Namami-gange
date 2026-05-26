'use client';

import React, { useState } from 'react';
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
import MapContainer from '@/components/map/MapContainer';
import SignalList from '@/components/shared/SignalList';
import styles from './page.module.css';

export default function Home() {
  const [activeTab, setActiveTab] = useState('global');

  const renderContent = () => {
    switch (activeTab) {
      case 'global':
        return (
          <div className={styles.dashboard}>
            <div className={styles.header}>
              <div>
                <h1 className={styles.title}>Global Operations Dashboard</h1>
                <p className={styles.subtitle}>Realtime Strategic Intelligence & Geospatial Awareness</p>
              </div>
              <div className={styles.actions}>
                <button className={styles.primaryBtn}>Export Intelligence Report</button>
              </div>
            </div>

            <div className={styles.gridStats}>
              <IntelligenceCard title="Active Signals" value="128" delta="-12%" deltaType="down" color="blue" />
              <IntelligenceCard title="Critical Alerts" value="23" delta="+12%" deltaType="up" color="red" />
              <IntelligenceCard title="Monitored Locations" value="1,247" delta="+8" deltaType="up" color="teal" />
              <IntelligenceCard title="Data Sources" value="56" delta="Active" color="green" />
            </div>

            <div className={styles.mainGrid}>
              <div className={styles.mapContainer}>
                <MapContainer type="global" />
              </div>
              
              <div className={styles.sidePanel}>
                <div className={styles.panelHeader}>LATEST SIGNALS</div>
                <div className={styles.signalListWrapper}>
                  <SignalList />
                </div>
                <button className={styles.secondaryBtn} onClick={() => setActiveTab('signals')} style={{ width: '100%', marginTop: '12px' }}>
                  View All Signals
                </button>
              </div>
            </div>
          </div>
        );
      case 'basin':
        return <BasinIntelligence />;
      case 'location':
        return <LocationIntel />;
      case 'simulation':
        return <ScenarioSimulation />;
      case 'signals':
        return <RealtimeSignals />;
      case 'infra':
        return <InfraNetwork />;
      case 'collab':
        return <Collaboration />;
      case 'governance':
        return <GovernanceView />;
      case 'datasets':
        return <DatasetSources />;
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
