import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Navbar({setSearch}) {
    const navigate = useNavigate();
    const [fix, setFix] = useState(false);
    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
            if (!fix) {
                setFix(true)
            }
        } else {
            setFix(false)
        }
    })
    return (
        <nav className="flex w-full h-[70px] mb-5">
            <div className={`w-full h-70px bg-white rounded-b-lg flex items-center justify-between px-[2%] ${!fix ? 'relative' : 'fixed top-0 left-0 shadow-[0_10px_30px] shadow-[#26474930] h-[50px] z-[999]'}`}>
                <div className={`flex items-center justify-between w-[30%] relative phone:absolute phone:translate-y-[55px] phone:w-full phone:left-0 ${fix ? 'phone:hidden' : ''}`}>
                    <input type="text" onChange={e=>setSearch(e.target.value)} className="form-control" placeholder="Qidirish: Nomi..." />
                    <i className="fas fa-search absolute right-[10px]" />
                </div>
                <div className="flex w-[50%] items-center justify-end phone:w-full phone:justify-between">
                    <Link to={'/posts'} className="mr-[10px] underline">
                        Barcha postlar
                    </Link>
                    <button className="btn btn-success relative flex items-center justify-center" onClick={() => navigate('/addpost')}>
                        <i className="fas fa-circle-plus mr-[10px] phone:text-[20px]"></i>
                        Qo'shish
                    </button>
                </div>
            </div>
            <div className="flex items-center justify-center fixed bottom-0 right-0 z-40 h-[55px] w-[150px] bg-white shadow-lg rounded-[100px_0_0_0]">
                <button className="btn btn-danger absolute right-[20px]" onClick={()=>{localStorage.removeItem('access_token'); window.location.reload()}}>
                    Chiqish
                </button>
            </div>
        </nav>
    );
}

export default Navbar;