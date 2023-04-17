import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { API_LINK } from "../../cfg";

function Auth({refresh, setRefresh}) {
    const [state, setState] = useState({ login: '', password: '', save: false });
    const [load, setLoad] = useState(false);
    function Submit(){
        setLoad(true);
        axios.post(`${API_LINK}/auth/signin`,state).then(res=>{
            setLoad(false);
            const {success, message, token} = res.data;
            if(!success){
                toast.error(message);
            }else{
                toast.success(message);
                localStorage.setItem('access_token', token);
                setTimeout(()=>{
                    setRefresh(!refresh);
                },1500);
            }
        }).catch(err=>{
            console.log(err);
            setLoad(false);
            toast.error("Xatolik! Qayta urunib ko'ring!");
        });
    }
    return (
        <div className="flex items-center justify-center
        w-full h-[100vh]">
            <div className="flex items-center justify-center flex-col h-[500px] w-[500px] rounded-[4px] bg-white shadow-[0_2px_7px] shadow-[#0066ff37] p-[2%] phone:w-[95%]">
                <h1 className="text-[30px]">KIRISH</h1>
                <div className="flex items-center justify-center w-full relative my-[10px]">
                    <input type="text" value={state.login} placeholder="Login" className="form-control pr-[30px] pl-[10px]" onChange={e => setState({ ...state, login: e.target.value })} />
                    <i className="fas fa-user absolute right-[10px] text-[#137d97]"></i>
                </div>
                <div className="flex items-center justify-center w-full relative my-[10px]">
                    <input type="text" value={state.password} placeholder="Parol" className="form-control pr-[30px] pl-[10px]" onChange={e => setState({ ...state, password: e.target.value })} />
                    <i className="fas fa-lock absolute right-[10px] text-[#137d97]"></i>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="check" value={state.save} onChange={e=>setState({...state, save: e.target.checked})}/>
                    <label className="form-check-label" htmlFor="check">
                        Eslab qol
                    </label>
                </div>
                <div className="flex items-center justify-center w-full relative my-[10px]">
                    <button className="btn btn-primary w-[200px]" disabled={load} onClick={Submit}>{!load?"KIRISH":"KUTING..."}</button>
                </div>
            </div>
        </div>
    );
}

export default Auth;