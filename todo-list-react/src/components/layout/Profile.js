import { Header } from "./Header";
import icon from "../../icons/newIcon.png";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Profile = () => {
    const authContext = useContext(AuthContext);
    console.log(authContext.user);
    return (
        <div>
            <Header textColor="greenText" icon={icon} />
            <h1>This is profile</h1>
        </div>
    );
}