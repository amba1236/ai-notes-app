// Main app routes wrapped with the global Layout component.
import { Route, Routes } from 'react-router-dom';

import CreateNote from './pages/CreateNotePage';
import Favorites from './pages/FavoritesNotesPage';
import Home from './pages/HomePage';
import Layout from './components/layout/Layout';
import NoteDetails from './pages/EditNotePage';
import TagsPage from './pages/TagsNotesPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<CreateNote />} />
        <Route path='/note/:id' element={<NoteDetails />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/tags' element={<TagsPage />} />
      </Routes>
    </Layout>
  );
}
