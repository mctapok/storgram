import {useState} from "react";
import PropTypes from "prop-types";
import {formatDistance} from "date-fns";
import {Link} from 'react-router-dom';
import AddComment from "./AddComment";


export default function Comments({docId, comments: allComments, posted, commentInput}) {
    const [comments, setComments] = useState(allComments);

    return (
        <>
            <div key={docId} className='p-4 pt-1 pb-4'>
                {!comments && (
                    <p  className='text-sm text-gray-500 mb-1'>пока нет комментариев</p>
                )}
                <p className='text-gray-500 text-sm  pt-3'>комментарии:</p>
                {comments.length >= 3 && (
                    <p  className='text-sm text-gray-400 mb-1 cursor-pointer'>
                        Посмотреть все комментарии
                    </p>
                )}
                {comments.slice(0, 3).map((item) => (
                    <>
                        <p key={`${item.comment} - ${item.displayName}`} className='mb-1'>
                            <Link to={`/p/${item.displayName}`}>
                                <span className='mr-1 font-bold'>{item.displayName}</span>
                            </Link>
                            <span className='mr-1'>{item.comment}</span>
                        </p>
                    </>
                ))}
                <p  className='text-xs text-gray-400 mt-2'>{formatDistance(posted, new Date())} ago</p>
            </div>
            <AddComment docId = {docId} comments={comments} setComments={setComments} commentInput={commentInput}/>
        </>
    );
}

Comments.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    posted: PropTypes.number.isRequired,
    commentInput: PropTypes.object.isRequired
}