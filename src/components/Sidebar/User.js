import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import {DEFAULT_IMAGE_PATH} from "../../constants/paths";

export default function User({username, fullName}) {
    return !username || !fullName ? (
        <Skeleton count={1} height={61}/>
    ) : (
        <Link to={`/p/${username}`} className='flex mb-6 items-center'>
            <div className='flex items-center justify-between col-span-1'>
                <img className='rounded-full w-16 h-16 flex mr-3' src={`/images/avatars/${username}.jpg`} alt="user avatar"
                     onError={(e) => {
                         e.target.src = DEFAULT_IMAGE_PATH;
                     }}/>
            </div>
            <div className=''>
                <p className="font-bold text-sm">{username}</p>
                <p className="text-sm">{fullName}</p>
            </div>
        </Link>
    );
}

User.propTypes = {
    username: PropTypes.string,
    fullName: PropTypes.string
};