import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { API_LINK } from "../../cfg";
function AddPost() {
    const [state, setState] = useState({ images: [], title: '', about: '', video: '' });
    const [load, setLoad] = useState(false);
    function Submit() {
        const { images, title, about, video } = state;
        if (images.length < 1) {
            toast.error("Rasm tanlang!");
        } else if (!title || !about) {
            toast.error("Qatorlarni to'ldiring!")
        } else {
            setLoad(true);
            const form = new FormData();
            form.append('title', title);
            form.append('about', about);
            form.append('video', video);
            [...images].forEach(imgs => {
                form.append('images', imgs);
            });
            axios.post(`${API_LINK}/post/add`, form, {
                headers: {
                    'x-auth-token': `Bearer ${localStorage.getItem('access_token')}`
                }
            }).then(res => {
                const { success, message } = res.data;
                setLoad(false);
                if (!success) {
                    toast.error(message);
                } else {
                    toast.success(message);
                    setState({ images: [], title: '', about: '', video: '' });
                }
            }).catch(err => {
                console.log(err);
                setLoad(false);
                toast.error("Xatolik! Qayta urunib ko'ring!")
            })
        }
    }
    return (
        <div className="flex items-center justify-center flex-col w-full min-h-[80vh]">
            <div className="flex items-center justify-between w-[1000px] bg-white rounded-[4px] shadow-[0_2px_20px] shadow-[#34234f2b] tablet:flex-col tablet:w-[95%] p-[10px]">
                <div className="flex items-center justify-center w-[30%] tablet:w-full">
                    <label className="cursor-pointer w-[200px] h-[200px] rounded-full shadow-lg flex items-center justify-center">
                        <i className="fas fa-camera text-[50px] text-[#13306f85]"></i>
                        <input disabled={load} type="file" accept="image/*" multiple className="hidden" onChange={e => { e.target.files.length > 5 ? toast.warning("Rasmlar ko'pi bilan 5 ta bo'lishi mumkin!") : setState({ ...state, images: e.target.files }) }} />
                    </label>
                </div>
                <div className="flex items-center justify-start flex-col w-[75%] min-h-[500px] p-[10px] tablet:w-full">
                    <div className="h-[150px] w-full flex items-center justify-start overflow-x-scroll phone:w-full">
                        {state.images.length > 0 ?
                            [...state.images].map((img, key) => {
                                return (
                                    <div key={key} className="flex items-center justify-center overflow-hidden w-[200px] h-[200px]">
                                        <img src={URL.createObjectURL(img)} alt={'Rasm'} className="" />
                                    </div>
                                );
                            })
                            : null
                        }
                    </div>
                    <div className="flex items-center justify-center w-[90%] relative m-[5px]">
                        <input disabled={load} type="text" className="form-control pr-8" placeholder="Post nomi" onChange={e => setState({ ...state, title: e.target.value })} />
                        <i className="fas fa-list absolute right-[10px]"></i>
                    </div>
                    <div className="flex items-center justify-center w-[90%] relative m-[5px]">
                        <textarea disabled={load} rows={10} className="form-control" placeholder="Batafsil..." onChange={e => setState({ ...state, about: e.target.value })} />
                    </div>
                    <div className="flex items-center justify-center w-[90%] relative m-[5px]">
                        <input disabled={load} type="text" className="form-control pr-8" placeholder="Yuotube video linki | Ixtiyoriy" onChange={e => setState({ ...state, video: e.target.value })} />
                        <i className="fab fa-youtube absolute right-[10px]"></i>
                    </div>
                    <div className="flex items-center justify-center w-[90%] relative m-[5px]">
                        <button disabled={load} className="btn btn-primary w-[200px]" onClick={Submit}>Joylash</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddPost;