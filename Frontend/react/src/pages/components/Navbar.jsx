// import {Search} from 'lucide-react';

export default function Navbar({setSearchInp}) {
    return (
        <div className="bg-blue-200 h-14 flex items-center p-4 justify-between">
            <div>
                FavSource
            </div>
            <div className="h-8 w-64 bg-white flex items-center rounded-lg">
                {/* <Search /> */}
                <input type="text" name="" id="" placeholder="Search..." className="h-8 w-60 m-2 border-none focus:outline-none" onChange={e => setSearchInp(e.target.value)} />
            </div>
            <div>
                Profile
            </div>
        </div>
    )
}