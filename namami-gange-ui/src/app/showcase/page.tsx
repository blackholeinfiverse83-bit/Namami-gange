'use client';

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import CommandCenter from '@/components/views/CommandCenter';
import styles from '../page.module.css';

export default function ShowcasePage() {
  return (
    <main className={styles.main}>
      <Sidebar activeTab="global" onTabChange={() => {}} />
      <Topbar />
      <div className={styles.content}>
        <CommandCenter showcaseMode={true} />
      </div>
    </main>
  );
}
