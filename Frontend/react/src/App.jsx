import { Routes, Route } from "react-router-dom";
import FirstPage from "./pages/FirstPage";
import FavActressPage from "./pages/FavActressPage";

function App() {

  return (
    <Routes>
      <Route path="/" element={<FirstPage />}/>
      <Route path="/actress/:id" element={<FavActressPage />} />
    </Routes>
  )
}

export default App
