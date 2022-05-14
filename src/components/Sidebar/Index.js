import useUser from "../../hooks/useUser";
import User from "./User";
import Suggestions from "./Suggestions";


export default function Index() {
    const {
        user: {docId, fullName, username, userId, following}
    } = useUser();
    console.log('user: ', docId, fullName, username, userId, following)
    return (
        <div className='p-4'>
            <User username={username} fullName={fullName}/>
            <Suggestions userId={userId} following={following} loggedInUserDocId={docId}/>
        </div>
    );
}