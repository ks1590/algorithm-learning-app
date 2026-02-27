import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from './components/Layout';
import { BinaryFloatingPointPage } from './pages/math/BinaryFloatingPointPage';
import { BitManipulationPage } from './pages/math/BitManipulationPage';
import { FactorialPage } from './pages/math/FactorialPage';
import { MathPage } from './pages/MathPage';
import { SearchPage } from './pages/SearchPage';
import { SortingPage } from './pages/SortingPage';
import { HammingDistancePage } from './pages/string/HammingDistancePage';
import { StringPage } from './pages/StringPage';
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
          <Route path="/string" element={<StringPage />} />
          <Route path="/string/hamming-distance" element={<HammingDistancePage />} />
          <Route path="/math" element={<MathPage />} />
          <Route path="/math/binary-floating-point" element={<BinaryFloatingPointPage />} />
          <Route path="/math/bit-manipulation" element={<BitManipulationPage />} />
          <Route path="/math/factorial" element={<FactorialPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
