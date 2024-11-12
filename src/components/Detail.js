import "../assets/detail.css";
import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { initState, videoReducer, fetchVideo, fetchVideos } from "../reducers/videoReducer";
import { useAuth } from "../contexts/AuthContext";
import { useDispatch,useSelector } from "react-redux";
import { subscribe,unsubscribe,subCount,fetchSub } from "../store/subscribeSlice";
import { createComment, viewAllComments} from "../store/commentSlice";
import { useState } from "react";
import Comment from "./Comment";

const Detail = () => {
  const {videoCode} = useParams();
  const {token,id} = useAuth();
  const [isComment, setIsComment] = useState(false);
  const [newComment, setNewComment] = useState({
    commentText : "",
    videoCode : videoCode,
    id : id
  });

  // 리듀서 방식
  // 실제 프로젝트에서는 하나로 통일
  const [state, videoDispatch] = useReducer(videoReducer, initState);
  const {video, videos} = state;
  // 리덕스 툴킷 방식
  const dispatch = useDispatch();
  const isSub = useSelector((state) => state.subscribe.isSub);
  const count = useSelector((state) => state.subscribe.count);
  const sub = useSelector((state) => state.subscribe.sub);
  const comments = useSelector((state) => state.comment.comments);

  const handleSub = () => {
    if(isSub) {
      // 구독취소
      dispatch(unsubscribe(sub.subCode));
    } else {
      // 구독
      dispatch(subscribe({channelCode : video?.channel.channelCode}));
    }
  };

  const addComment = () => {
    dispatch(createComment(newComment));
    setIsComment(false);
    setNewComment({...newComment, commentText : ""});
  };

  

  useEffect(() => {
    fetchVideo(videoDispatch, videoCode);
    fetchVideos(videoDispatch, 1, "");
    dispatch(viewAllComments(videoCode));
  }, []);

  useEffect(() => {
    if(video != null) {
      dispatch(subCount(video?.channel.channelCode));
    }
    if (token != null) {
      dispatch(fetchSub(video?.channel.channelCode));
    }
  }, [token, video]);

  return (
    <main className="detail">
      <div className="video-detail">
        <video controls src={video?.videoUrl}></video>
        <h2>{video?.videoTitle}</h2>
        <div className="video-detail-desc">
          <div className="detail-desc-left">
            <img src={video?.channel.channelImg} />
            <div className="channel-desc">
              <h3>{video?.channel.channelName}</h3>
              <p>구독자 {count}명</p>
            </div>
            <button onClick={handleSub}>{isSub ? "구독중" : "구독"}</button>
          </div>
        </div>
        <div className="video-detail-info">{video?.videoDesc}</div>
        <div className="comment">
          <input
            className="comment-add"
            type="text"
            placeholder="댓글 추가.."
            value={newComment.commentText}
            onChange={(e) =>
              setNewComment({ ...newComment, commentText: e.target.value })
            }
            onClick={() => setIsComment(true)}
          />
          {isComment && (
            <div className="comment-add-status">
              <button onClick={() => setIsComment(false)}>취소</button>
              <button onClick={addComment}>댓글</button>
            </div>
          )}
          <div className="comment-list">
            {comments?.map((comment) => (
              <Comment comment={comment} videoCode={videoCode} 
              key={comment.commentCode}/>
            ))}
          </div>
        </div>
      </div>
      <div className="video-list">
        {videos.map((video) => (
          <a
            href={`/video/${video.videoCode}`}
            className="video-list-card"
            key={video.videoCode}
          >
            <img src={video.videoImg} />
            <div className="video-list-desc">
              <h4>{video.videoTitle}</h4>
              <p>{video.channel.channelName}</p>
              <p className="video-meta">조회수 {video.videoCount}회</p>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
};
export default Detail;
