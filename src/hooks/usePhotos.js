import {useState, useEffect, useContext} from "react";
import UserContext from "../context/user";
import {getPhotos, getUserByUserId} from "../services/useFirebase";

export default function usePhotos(){
    const [photos, setPhotos] = useState(null);
    const {
        user: {uid: userId = ''}
    } = useContext(UserContext);

    useEffect(() => {
        async function getTimelinePhotos(){
            const [{following}] = await getUserByUserId(userId);

            if(following.length > 0){
                const followedUserPhotos = await getPhotos(userId, following);
                //sort last shows first
                followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
                setPhotos(followedUserPhotos)
            }
        }
        getTimelinePhotos();
    },[userId])

    return { photos }
}