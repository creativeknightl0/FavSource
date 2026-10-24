import { Routes, Route } from "react-router-dom";
import FirstPage from "./pages/FirstPage";
import FavActressPage from "./pages/FavActressPage";
import NewActressAdd from "./pages/NewActressAdd";
import EditExistingActress from "./pages/EditExistingActress";
import AllActressesPage from "./pages/AllActressesPage";
import NewActressAddPage from "./pages/NewActressAddPage";
import ParticularActressPage from "./pages/ParticularActressPage";

function App() {

  return (
    <Routes>
      {/* v1 with fake data */}
      <Route path="/actress" element={<FirstPage />}/>
      <Route path="/actress/:id" element={<FavActressPage />} />
      <Route path="/actress/new" element={<NewActressAdd />} />
      <Route path="/actress/:id/edit" element={<EditExistingActress />} />

      {/* v2 with real data inside the mongodb and with RESTful api callings */}
      <Route path="/actresses" element={<AllActressesPage />} />
      <Route path="/actresses/new" element={<NewActressAddPage />} />
      <Route path="/actresses/:id" element={<ParticularActressPage />} />
    </Routes>
  )
}

export default App
