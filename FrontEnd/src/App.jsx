import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaArmas from './pages/ListaArmas';
import ArmaForm from './pages/ArmaForm';
import ListaBuilds from './pages/ListaBuilds';
import BuildForm from './pages/BuildForm';
import ListaEquipamentos from './pages/ListaEquipamentos';
import EquipamentoForm from './pages/EquipamentoForm';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Armas */}
        <Route path="/armas" element={<ListaArmas />} />
        <Route path="/armas/novo" element={<ArmaForm />} />
        <Route path="/armas/editar/:id" element={<ArmaForm />} />

        {/* Builds */}
        <Route path="/builds" element={<ListaBuilds />} />
        <Route path="/builds/novo" element={<BuildForm />} />
        <Route path="/builds/editar/:id" element={<BuildForm />} />

        {/* Equipamentos */}
        <Route path="/equipamentos" element={<ListaEquipamentos />} />
        <Route path="/equipamentos/novo" element={<EquipamentoForm />} />
        <Route path="/equipamentos/editar/:id" element={<EquipamentoForm />} />
      </Routes>
    </Router>
  );
};

export default App;