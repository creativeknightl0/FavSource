import { useNavigate } from "react-router-dom";

function FirstPage() {
    const navigate = useNavigate();

    const startFunc = () => {
        navigate('/actress/1');
    }

    return (
        <div className="flex flex-col justify-center items-center">
          <h1>Favourite Actresses</h1>
          <button className="p-2 rounded bg-black text-white cursor-pointer" onClick={startFunc}>Start</button>
        </div>
    );
}

export default FirstPage;