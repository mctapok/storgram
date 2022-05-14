import {useParams, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUserByUsername} from "../services/useFirebase";
import * as ROUTES from "../constants/routes";
import Header from "../components/Header";
import UserProfile from '../components/profile'



export default function Profile() {
    const {profile} = useParams();
    const [user, setUser] = useState(null);
    const history = useHistory()


    useEffect(() => {
        async function checkUserExists() {
            const [user] = await getUserByUsername(profile);
            if (user?.userId) {
              setUser(user);
            } else {
              history.push(ROUTES.NOT_FOUND);
            }            
          }
          checkUserExists();
    }, [profile, history]);

    return user?.username ?  (
        <div>
            <Header/>
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={user}/>
            </div>
        </div>
    ) : null
}