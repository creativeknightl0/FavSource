import { Routes, Route } from "react-router-dom";
import FirstPage from "./pages/FirstPage";
import FavActressPage from "./pages/FavActressPage";
import NewActressAdd from "./pages/NewActressAdd";
import EditExistingActress from "./pages/EditExistingActress";
import AllActressesPage from "./pages/AllActressesPage";
import NewActressAddPage from "./pages/NewActressAddPage";
import ParticularActressPage from "./pages/ParticularActressPage";
import EditParticularActressPage from "./pages/EditParticularActressPage";
import AllNotesPage from './pages/AllNotesPage';

function App() {

  return (
    <Routes>
      {/* v1 with fake data */}
      <Route path="/actress" element={<FirstPage />}/>
      <Route path="/actress/:id" element={<FavActressPage />} />
      <Route path="/actress/new" element={<NewActressAdd />} />
      <Route path="/actress/:id/edit" element={<EditExistingActress />} />

      {/* v2 with real data inside the mongodb and with RESTful api callings - phase 1 for the FavSource */}
      <Route path="/actresses" element={<AllActressesPage />} />
      <Route path="/actresses/new" element={<NewActressAddPage />} />
      <Route path="/actresses/:id" element={<ParticularActressPage />} />
      <Route path="/actresses/:id/edit" element={<EditParticularActressPage />} />

      {/* v3 solving notes saving issue with a CRUD - phase 2 for the FavSource */}
      <Route path="/notes" element={<AllNotesPage />} />
    </Routes>
  )
}

export default App
