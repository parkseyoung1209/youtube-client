import { useState} from "react";
import { useAuth } from "../contexts/AuthContext";
import { useDispatch } from "react-redux";
import { createComment , removeComment, modifyComment} from "../store/commentSlice";


const Comment = ({comment, videoCode}) => {
    const dispatch = useDispatch();
    const {id} = useAuth();
    const [newReply, setNewReply] = useState({
        commentCode : 0,
        commentText : "",
        videoCode : videoCode,
        id : id,
        parentCode : 0
      });
      const [isEdit, setIsEdit] = useState(false);
      const addReply = () => {
        dispatch(createComment(newReply));
        setNewReply({...newReply, commentText : "", parentCode : 0});
      }
      const deleteComments = (commentCode) => {
        dispatch(removeComment({
            videoCode,
            commentCode
        }))
      }
      const edit = (commentId, commentText) => {
        if(id === commentId) {
            setIsEdit(true);
            setNewReply({...newReply, commentText});
        }
      }
      const editCancle = () => {
        setIsEdit(false);
        setNewReply({...newReply, commentText: "", commentCode : 0});
      }
      const editSubmit = () => {
        dispatch(modifyComment(newReply));
        editCancle();
      }
    return (
        <div className="comment-content">
                <h4>{comment.id}</h4>
                {isEdit ? (
                    <>
                    <input type="text"
                        value={newReply.commentText}
                        onChange={(e) => 
                            setNewReply({...newReply, 
                                commentText : e.target.value,
                                commentCode : comment.commentCode
                            })
                        }
                    />
                    <div className="edit-content">
                        <button onClick={editCancle}>취소</button>
                        <button onClick={editSubmit}>수정</button>
                    </div>
                    </>
                ) : (
                    <p onClick={() => edit(comment.id, comment.commentText)}>{comment.commentText}</p>
                )}
                <button
                  onClick={() =>
                    setNewReply({
                      ...newReply,
                      parentCode: comment.commentCode,
                    })
                  }
                >
                  답글
                </button>
                {id === comment.id && 
                    <button
                        onClick={() => deleteComments(comment.commentCode)}
                    >삭제</button>
                }
                {newReply.parentCode === comment.commentCode && (
                  <>
                    <input
                      type="text"
                      placeholder="답글 추가.."
                      value={newReply.commentText}
                      onChange={(e) =>
                        setNewReply({
                          ...newReply,
                          commentText: e.target.value,
                        })
                      }
                    />
                    <div className="reply-add-status">
                      <button
                        onClick={() =>
                          setNewReply({
                            ...newReply,
                            commentText: "",
                            parentCode: 0,
                          })
                        }
                      >
                        취소
                      </button>
                      <button onClick={addReply}>답글</button>
                    </div>
                  </>
                )}
                {comment?.replies?.map((reply) => (
                    <Comment comment={reply} videoCode={videoCode}
                    key={reply.commentCode}
                    />
                ))}
              </div>
    );
};

export default Comment;