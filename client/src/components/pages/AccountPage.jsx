import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";
import { CgTrees, CgTree } from "react-icons/cg";
import axios from "axios";
import MyTrails from "./MyTrails";

export default function AccountPage() {
    const { isReady, user, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);

    // assign subpage value of params
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = "profile";
    }

    async function logout() {
        await axios.post("/logout");
        setUser(null);
        setRedirect("/");
    }

    if (!isReady) {
        return "Loading .........";
    }
    if (isReady && !user && !redirect) {
        return <Navigate to={"/login"} />;
    }

    /* linkClasses() {} <---- create base styles and assign additional style if the conditions meet
then assign as classname in Tags */
    function linkClasses(type = null) {
        let classes = "p-2 px-6 inline-flex gap-1 items-center rounded-full";
        if (type === subpage) {
            classes += " bg-primary text-white";
        } else {
            classes += " bg-slate-200";
        }
        return classes;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div>
            <nav className="w-full flex justify-center mt-8 mb-8 gap-2">
                <Link className={linkClasses("profile")} to={"/account"}>
                    <HiOutlineUser />
                    My Profile
                </Link>
                <Link
                    className={linkClasses("allTrails")}
                    to={"/account/allTrails"}>
                    <CgTrees />
                    All Trails
                </Link>
                <Link
                    className={linkClasses("myTrails")}
                    to={"/account/myTrails"}>
                    <CgTree />
                    My Trails
                </Link>
            </nav>
            {subpage === "profile" && (
                <div className="text-center text-slate-700 max-w-lg mx-auto">
                    Logged in as {user.username} ({user.email})<br />
                    <button onClick={logout} className="primary max-w-xs">
                        logout
                    </button>
                </div>
            )}
            {subpage === "myTrails" && <MyTrails />}
        </div>
    );
}
