import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_LINK } from "../../cfg";

function GetPosts({ search }) {
    const [state, setState] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [del, setDel] = useState({ show: false, title: '', id: '' });
    const [refresh, setRefresh] = useState(false);
    const [edit, setEdit] = useState({ show: false });
    useEffect(() => {
        axios(`${API_LINK}/post/getall`).then(res => {
            const { success, data } = res.data;
            if (success) {
                setState(data);
                setIsLoad(true);
            }
        });
    }, [refresh]);
    function DeletePost() {
        axios.delete(`${API_LINK}/post/remove/${del.id}`, {
            headers: {
                'x-auth-token': `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => {
            setDel({ show: false });
            const { success, message } = res.data;
            if (!success) {
                toast.error(message);
            } else {
                toast.success(message);
                setRefresh(!refresh);
            }
        }).catch(err => {
            console.log(err);
            toast.error("Xatolik! Qayta urunib ko'ring!");
            setDel({ show: false });
        });
    }
    function editPost() {
        const { postId, title, about, video } = edit.post;
        const { imgs } = edit;
        if (!imgs) {
            axios.put(`${API_LINK}/post/edit/${postId}`, { title, about, video: !video ? 'undefined' : video }, {
                headers: {
                    'x-auth-token': `Bearer ${localStorage.getItem('access_token')}`
                }
            }).then(res => {
                const { success, message } = res.data;
                if (!success) {
                    toast.error(message);
                } else {
                    toast.success(message);
                    setRefresh(!refresh);
                }
            }).catch(err => {
                console.log(err);
                toast.error('Xatolik! Qayta urunib ko\'ring!');
            });
        } else {
            const form = new FormData();
            form.append('title', title);
            form.append('about', about);
            form.append('video', video);
            [...imgs].forEach(img => {
                form.append('images', img);
            });
            axios.put(`${API_LINK}/post/edit/${postId}`, form, {
                headers: {
                    'x-auth-token': `Bearer ${localStorage.getItem('access_token')}`
                }
            }).then(res => {
                const { success, message } = res.data;
                if (!success) {
                    toast.error(message);
                } else {
                    toast.success(message);
                    setRefresh(!refresh);
                }
            }).catch(err => {
                console.log(err);
                toast.error('Xatolik! Qayta urunib ko\'ring!');
            });
        }
    }
    if (!isLoad) {
        return (
            <div className="flex items-center justify-start flex-col w-full h-[90vh]">
                <h1>KUTING...</h1>
            </div>
        );
    } else {
        return (
            <div className="flex items-center justify-start flex-col w-full">
                {!search ?
                    <div className="grid grid-cols-3 gap-[30px] tablet2:grid-cols-2 phone:grid-cols-1">
                        {state.map((post, key) => {
                            return (
                                <div className="flex items-center justify-start flex-col w-[300px] h-[400px] rounded-[4px] shadow-lg bg-white overflow-hidden relative" key={key}>
                                    <div className="flex items-center justify-center overflow-hidden w-full h-[200px]">
                                        <img src={post.images[0]} alt="rasm" className="h-[200px]"/>
                                    </div>
                                    <div className="w-full px-[10px]">
                                        <h1 className="text-[20px]">{post.title.slice(0, 20)}...</h1>
                                        <p className="my-[10px]">{post.date}</p>
                                        <p>{post.about.slice(0, 65)}...</p>
                                        <div className="flex items-center justify-around absolute bottom-[10px] w-full right-0">
                                            <button className="btn btn-danger" onClick={() => { setDel({ show: true, title: post.title, id: post.postId }) }}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                            <button className="btn btn-success" onClick={() => { setEdit({ show: true, post }) }}>
                                                <i className="fas fa-pencil"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div> :
                    <div className="grid grid-cols-3 gap-[30px] tablet2:grid-cols-2 phone:grid-cols-1">
                        {state.map((post, key) => {
                            return (
                                post.title.toLowerCase().includes(search.toLowerCase()) || post.about.toLowerCase().includes(search.toLowerCase()) || post.video.toLowerCase().includes(search.toLowerCase()) ?
                                    <div className="flex items-center justify-start flex-col w-[300px] h-[400px] rounded-[4px] shadow-lg bg-white overflow-hidden relative" key={key}>
                                        <div className="flex items-center justify-center overflow-hidden w-full h-[200px]">
                                            <img src={post.images[0]} alt="rasm" className="h-[200px] w-full"/>
                                        </div>
                                        <div className="w-full px-[10px]">
                                            <h1 className="text-[20px]">{post.title.slice(0, 20)}...</h1>
                                            <p className="my-[10px]">{post.date}</p>
                                            <p>{post.about.slice(0, 65)}...</p>
                                            <div className="flex items-center justify-around absolute bottom-[10px] w-full right-0">
                                                <button className="btn btn-danger" onClick={() => { setDel({ show: true, title: post.title, id: post.postId }) }}>
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                                <button className="btn btn-success" onClick={() => { setEdit({ show: true, post }) }}>
                                                    <i className="fas fa-pencil"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div> : null
                            )
                        })}
                    </div>
                }
                {del.show ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            {del.title} - O'chirilsinmi?
                                        </h3>
                                    </div>
                                    <div className="relative p-6 flex-auto">
                                        <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                            <i className="fas fa-circle-info"></i>
                                            Diqqat po'st o'chirilgach u qayta tiklanmaydi!
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-gray-700 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setDel({ show: false })}
                                        >
                                            O'chirilmasin
                                        </button>
                                        <button
                                            className="bg-red-700 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => { setDel({ ...del, show: false }); DeletePost() }}
                                        >
                                            O'chirilsin
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
                {edit.show ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative my-6 mx-auto w-[50%] tablet2:w-[90%]">
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            O'zgartirish
                                        </h3>
                                    </div>
                                    {/* FORMA */}
                                    <div className="relative p-6 flex-auto">
                                        <div className="flex items-center justify-start w-auto tablet:w-full overflow-x-scroll h-[200px]">
                                            <div>
                                                <label className="cursor-pointer w-[100px] h-[100px] rounded-full shadow-lg flex items-center justify-center">
                                                    <i className="fas fa-camera text-[50px] text-[#13306f85]"></i>
                                                    <input type="file" accept="image/*" multiple className="hidden" onChange={e => { e.target.files.length > 5 ? toast.warning("Rasmlar ko'pi bilan 5 ta bo'lishi mumkin!") : setEdit({ ...edit, imgs: e.target.files }) }} />
                                                </label>
                                            </div>
                                            {!edit.imgs ?
                                                edit.post.images.map((imgs, key) => {
                                                    return (
                                                        <img src={imgs} alt={key} key={key} width={200} className="mx-[10px]" />
                                                    )
                                                }) :
                                                [...edit.imgs].map((imgs, key) => {
                                                    return (
                                                        <img src={URL.createObjectURL(imgs)} alt={key} key={key} width={200} className="mx-[10px]" />
                                                    );
                                                })
                                            }
                                        </div>
                                        <div className="flex items-center justify-center w-[90%] relative m-[5px]">
                                            <input type="text" className="form-control pr-8" placeholder="Post nomi" value={edit.post.title} onChange={e => setEdit({ ...edit, post: { ...edit.post, title: e.target.value } })} />
                                            <i className="fas fa-list absolute right-[10px]"></i>
                                        </div>
                                        <div className="flex items-center justify-center w-[90%] relative m-[5px]">
                                            <textarea rows={10} className="form-control" placeholder="Batafsil..." value={edit.post.about} onChange={e => setEdit({ ...edit, post: { ...edit.post, about: e.target.value } })} />
                                        </div>
                                        <div className="flex items-center justify-center w-[90%] relative m-[5px]">
                                            <input type="text" className="form-control pr-8" placeholder="Yuotube video linki | Ixtiyoriy" value={edit.post.video} onChange={e => setEdit({ ...edit, post: { ...edit.post, video: e.target.value } })} />
                                            <i className="fab fa-youtube absolute right-[10px]"></i>
                                        </div>
                                    </div>
                                    {/*  */}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-gray-700 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setEdit({ show: false })}
                                        >
                                            Bekor qilish
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => { setEdit({ ...edit, show: false }); editPost() }}
                                        >
                                            Saqlash
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </div>
        )
    }
}

export default GetPosts;