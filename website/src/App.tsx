import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ReaderLayout } from './components/reader/ReaderLayout';
import { HomePage } from './pages/HomePage';
import { SupportPage } from './pages/SupportPage';
import { ChapterReaderPage, ChapterRedirect } from './pages/ChapterReaderPage';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/support" element={<SupportPage />} />
        </Route>
        <Route element={<ReaderLayout />}>
          <Route path="/chapter/:id" element={<ChapterRedirect />} />
          <Route path="/chapter/:id/p/:page" element={<ChapterReaderPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
