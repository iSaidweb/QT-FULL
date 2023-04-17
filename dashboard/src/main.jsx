import Auth from "./components/auth/auth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { API_LINK } from "./cfg";
import Navbar from "./components/navbar/navbar";
import { Route, Routes } from "react-router-dom";
import AddPost from "./pages/addpost/addpost";
import GetPosts from "./pages/getposts/getposts";
function Main() {
    const [refresh, setRefresh] = useState(false);
    const [auth, setAuth] = useState(false);
    const [search, setSearch ] = useState("");
    useEffect(() => {
        axios(`${API_LINK}/auth/check`, {
            headers: {
                'x-auth-token': `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => {
            const { success } = res.data;
            if (success) {
                setAuth(true);
            }
        })
    }, [refresh]);
    if (!auth) {
        return (
            <>
                <Auth refresh={refresh} setRefresh={setRefresh} />
                <ToastContainer autoClose={1500} position="top-center" closeButton={false} />
            </>
        );
    }else{
        return(
            <>
                <Navbar setSearch={setSearch}/>
                <Routes>
                    <Route path="/addpost" element={<AddPost/>}/>
                    <Route path="/posts" element={<GetPosts search={search}/>}/>
                    <Route path="*" element={<GetPosts search={search}/>}/>
                </Routes>
                <ToastContainer autoClose={1500} position="top-center" closeButton={false} />
            </>
        )
    }
}

export default Main;