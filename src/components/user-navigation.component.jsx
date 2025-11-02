import { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { removeFromSession } from "../common/session";

const UserNavigationPanel = () => {

    const { userAuth: { username }, setUserAuth } = useContext(UserContext);

    const signOutUser = () => {
        removeFromSession("user");
        setUserAuth({ access_token: null })
    }

    return (
        <AnimationWrapper 
            className="absolute right-0 z-50"
            transition={{ duration: 0.3 }}
        >
            <div className="bg-white shadow-lg rounded-lg border border-grey w-60 p-4 duration-300 ease-in-out">

                <Link to="/editor" className="flex gap-3 items-center hover:bg-black/75 hover:text-white rounded-md p-3 transition duration-75 md:hidden">
                    <i className="fi fi-rr-file-edit text-lg"></i>
                    <p className="font-semibold text-md">Write</p>
                </Link> 
                
                <Link to={`/user/${username}`} className="flex gap-3 items-center hover:bg-black/75 hover:text-white rounded-md p-3 transition duration-75">
                    <i className="fi fi-rr-user text-lg"></i>
                    <p className="font-semibold text-md">Profile</p>
                </Link>

                <Link to="/dashboard/blogs" className="flex gap-3 items-center hover:bg-black/75 hover:text-white rounded-md p-3 transition duration-75">
                    <i className="fi fi-rr-dashboard text-lg"></i>
                    <p className="font-semibold text-md">Dashboard</p>
                </Link>

                <Link to="/settings/edit-profile" className="flex gap-3 items-center hover:bg-black/75 hover:text-white rounded-md p-3 transition duration-75">
                    <i className="fi fi-rr-settings text-lg"></i>
                    <p className="font-semibold text-md">Settings</p>
                </Link>

                <div className="my-4 border-t border-grey"></div>

                <button 
                    className="w-full flex gap-3 items-center hover:bg-red hover:text-white rounded-md p-3 transition duration-75"
                    onClick={signOutUser}
                >
                    <i className="fi fi-rr-exit text-lg"></i>
                    <div>
                        <p className="text-sm">@{username}</p>
                    </div>
                </button>
            </div>
        </AnimationWrapper>
    );
}

export default UserNavigationPanel;
