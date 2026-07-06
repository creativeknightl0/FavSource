import { useNavigate } from "react-router-dom"
import FirstPage from "./pages/FirstPage";
import FavActressPage from "./pages/FavActressPage";

function App() {
  const navigate = useNavigate();

  const startFunc = () => {
    navigate('/favActress/1');
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Favourite Actresses</h1>
      <button className="p-2 bg-white rounded-lg text-black cursor-pointer" onClick={startFunc}>Start</button>
    </div>
  )
}

export default App
