import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ChapterPage } from './pages/ChapterPage';

export default function App() {
  return (
    <BrowserRouter basename="/The-Age-of-Emergent-Intelligence">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chapter/:id" element={<ChapterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
