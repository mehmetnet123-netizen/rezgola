import { HashRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Home } from '@/pages/Home';
import { BusinessDetail } from '@/pages/BusinessDetail';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/business/:id" element={<BusinessDetail />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </HashRouter>
  );
}

export default App;
