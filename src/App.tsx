
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SortingPage } from './pages/SortingPage';
import { TreePage } from './pages/TreePage';
import { Layout } from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SortingPage />} />
          <Route path="/tree" element={<TreePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
