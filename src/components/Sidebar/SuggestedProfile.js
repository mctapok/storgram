import PropTypes from "prop-types";
import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {getUserByUserId, updateFollowedUserFollowers, updateLoggedInUserFollowing} from "../../services/useFirebase";
import LoggedInUserContext from "../../context/LoggedInUser";


export default function SuggestedProfile({profileDocId, username, profileId, userId, loggedInUserDocId}) {
    const [followed, setFollowed] = useState(false);

    const handleFollowUser = async () => {
        setFollowed(true);
        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false)
        await updateFollowedUserFollowers(profileDocId, userId, false)
    }

    return (
        <div>
            {!followed &&
            <div className='flex flex-row items-center align-items justify-between'>
                <div className='flex items-center justify-between'>
                    <img
                        className="rounded-full w-8 flex mr-3"
                        src={`/images/avatars/${username}.jpg`}
                        alt=""
                        onError={(e) => {
                            e.target.src = `/images/avatars/default.png`;
                        }}
                    />
                    <Link to={`/p/${username}`}>
                        <p className="font-bold text-sm">{username}</p>
                    </Link>
                </div>
                <button
                    className="text-xs font-bold text-purple-500"
                    type="button"
                    onClick={handleFollowUser}
                >
                    Follow
                </button>
            </div>
            }
            {followed && null}
        </div>
    );
}

SuggestedProfile.prototype = {
    profileDocId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    loggedInUserDocId: PropTypes.string.isRequired
}