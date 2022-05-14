import FirebaseContext from "../../context/firebase";
import {useContext, useState} from "react";
import PropTypes from "prop-types";
import UserContext from "../../context/user";


export default function AddComment({docId, comments, setComments, commentInput}) {
    const [comment, setComment] = useState('');
    const {firebase, FieldValue} = useContext(FirebaseContext);
    const {user: {displayName}} = useContext(UserContext);

    const handleSubmitComment = (event) => {
        event.preventDefault();
        setComments([...comments, ,{displayName, comment}]);
        setComment('');

        return firebase
            .firestore()
            .collection('photos')
            .doc(docId)
            .update({
                comments: FieldValue.arrayUnion({displayName, comment})
            });
    }


    return (
        <div className="border-t border-gray-300">
            <form className="flex justify-between pl-0 pr-5"
                  method="POST"
                  onSubmit={(event) => comment.length >= 1 ? handleSubmitComment(event)
                      : event.preventDefault()}
            >
                <input aria-label="добавить комментарий"
                       autoComplete="off"
                       className="text-sm text-gray-400 w-full mr-3 p-3"
                       name="add-comment"
                       placeholder="добавить комментарий..."
                       value={comment}
                       onChange={({target}) => setComment(target.value)}
                       ref={commentInput}
                />
                <button className={`text-sm font-bold text-purple-500 ${!comment && 'opacity-30'}`}
                        type="button"
                        disabled={comment.length < 1}
                        onClick={handleSubmitComment}
                >
                    добавить
                </button>
            </form>
        </div>
    );
}

AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    commentInput: PropTypes.object
}