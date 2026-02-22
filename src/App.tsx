import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SortingPage } from './pages/SortingPage';
import { TreePage } from './pages/TreePage';
import { SearchPage } from './pages/SearchPage';
import { Layout } from './components/Layout';
import { BinaryFloatingPointPage } from './pages/BinaryFloatingPointPage';
import { MathPage } from './pages/MathPage';

import { TopPage } from './pages/TopPage';

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
