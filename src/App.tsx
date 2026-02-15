
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SortingPage } from './pages/SortingPage';
import { TreePage } from './pages/TreePage';
import { SearchPage } from './pages/SearchPage';
import { Layout } from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SortingPage />} />
          <Route path="/tree" element={<TreePage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
