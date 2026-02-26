import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from './components/Layout';
import { BinaryFloatingPointPage } from './pages/BinaryFloatingPointPage';
import { BitManipulationPage } from './pages/BitManipulationPage';
import { MathPage } from './pages/MathPage';
import { SearchPage } from './pages/SearchPage';
import { SortingPage } from './pages/SortingPage';
import { TopPage } from './pages/TopPage';
import { TreePage } from './pages/TreePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<TopPage />} />
          <Route path="/sorting" element={<SortingPage />} />
          <Route path="/tree" element={<TreePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/math" element={<MathPage />} />
          <Route path="/binary-floating-point" element={<BinaryFloatingPointPage />} />
          <Route path="/bit-manipulation" element={<BitManipulationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
