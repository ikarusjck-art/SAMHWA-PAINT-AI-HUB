import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Guide from './pages/Guide';
import Templates from './pages/Templates';
import Archive from './pages/Archive';
import Support from './pages/Support';
import SmartWork from './pages/SmartWork';
import Gallery from './pages/Gallery';
import LabAssistant from './pages/LabAssistant';
import Admin from './pages/Admin';
import { AuthProvider } from './contexts/AuthContext';
import { SiteProvider } from './contexts/SiteContext';
import { DataProvider } from './contexts/DataContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <SiteProvider>
        <DataProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/lab" element={<LabAssistant />} />
                <Route path="/guide" element={<Guide />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/archive" element={<Archive />} />
                <Route path="/support" element={<Support />} />
                <Route path="/smart-work" element={<SmartWork />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </Layout>
          </Router>
        </DataProvider>
      </SiteProvider>
    </AuthProvider>
  );
};

export default App;