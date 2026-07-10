import { Routes, Route } from "react-router-dom";
import FirstPage from "./pages/FirstPage";
import FavActressPage from "./pages/FavActressPage";
import NewActressAdd from "./pages/NewActressAdd";

function App() {

  return (
    <Routes>
      <Route path="/" element={<FirstPage />}/>
      <Route path="/actress/:id" element={<FavActressPage />} />
      <Route path="/actress/new" element={<NewActressAdd />} />
    </Routes>
  )
}

export default App
