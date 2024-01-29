import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { axiosLocal } from "../../hooks/useAxiosLocal";

// eslint-disable-next-line react/prop-types
const Comments = ({ id }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState();

  useEffect(() => {
    axiosLocal
      .get(`/comments/${id}`)
      .then((res) => {
        console.log(32, res.data);
        setComments(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleComment = async (blogId) => {
    try {
      console.log(blogId);
      const commentInfo = {
        blogId: blogId,
        name: user?.name,
        email: user?.email,
        message: newComment,
        image: user?.image,
      };
      const res = await axiosLocal.post("/comment", commentInfo);
      if (res?.data?.insertId > 0) {
        setNewComment("");
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* message  */}
      <div>
        <h2 className="mb-2">Comments ( {comments?.length} )</h2>

        <div className="w-full mt-4">
          <textarea
            className="w-full border rounded-md p-4"
            onChange={(e) => setNewComment(e.target.value)}
            id="comment"
            placeholder="Comment Now"
            required
            rows={2}
          />
        </div>
        {newComment?.length < 1 ? (
          ""
        ) : (
          <button
            onClick={() => handleComment(id)}
            className="bg-[#006ce1] text-white px-3 py-1 rounded-md ml-1"
          >
            Post
          </button>
        )}

        <div className="shadow-2xl">
          {comments?.map((comment, i) => (
            <div key={i} className="p-4 mb-4">
              {/* user profile */}
              <div className="flex gap-2 mt-4 py-2">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={comment?.image} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{comment?.name}</h3>
                </div>
              </div>

              {/* user comment */}
              <div>
                <p className="py-2 font-medium">{comment?.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
