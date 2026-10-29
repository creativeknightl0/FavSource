import Navbar from './components/Navbar';

export default function AllNotesPage() {
    return (
        <div className='grid'>
            <Navbar />
            <h2>GET /notes - to show all the saved notes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                <div className="border w-64 h-64 rounded-xl flex justify-center items-center bg-yellow-200">
                    1
                </div>
                <div className="border w-64 h-64 rounded-xl flex justify-center items-center bg-yellow-200">
                    1
                </div>
                <div className="border w-64 h-64 rounded-xl flex justify-center items-center bg-yellow-200">
                    1
                </div>
                <div className="border w-64 h-64 rounded-xl flex justify-center items-center bg-yellow-200">
                    1
                </div>
                <div className="border w-64 h-64 rounded-xl flex justify-center items-center bg-yellow-200">
                    1
                </div>
                <div className="border w-64 h-64 rounded-xl flex justify-center items-center bg-yellow-200">
                    1
                </div>
                <div className="border w-64 h-64 rounded-xl flex justify-center items-center bg-yellow-200">
                    1
                </div>
                <div className="border w-64 h-64 rounded-xl flex justify-center items-center bg-yellow-200">
                    1
                </div>
            </div>
        </div>
    )
}