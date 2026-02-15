
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SortingPage } from './pages/SortingPage';
import { TreePage } from './pages/TreePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SortingPage />} />
        <Route path="/tree" element={<TreePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
