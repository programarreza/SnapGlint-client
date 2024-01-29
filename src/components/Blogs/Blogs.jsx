import { useEffect, useState } from "react";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Blogs = () => {
  const axiosLocal = useAxiosLocal();
  const [blogs, setBlogs] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axiosLocal
      .get("/blogs")
      .then((res) => {
        setBlogs(res?.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, [axiosLocal]);

  const handleFavorite = async (blog) => {
    try {
      console.log({ blog });

      const response = await axiosLocal.post("/favorite", blog);
      if (response.data.insertId > 0) {
        toast.success("Favorited successfully");
      } else {
        toast.error("Already Added");
      }
      console.log(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mx-16 mt-5">
      {blogs.map((blog, i) => (
        <div key={i}>
          <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
              <img src={blog?.image} alt="blog" className="w-full h-[200px]" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{blog?.title}</h2>
              <p>
                {blog?.description.length > 150 ? (
                  <p>{blog?.description.slice(0, 150)}</p>
                ) : (
                  <p>{blog?.description}</p>
                )}{" "}
              </p>

              <div className="flex justify-between">
                <Link to={`/blog_details/${blog?.id}`}>
                  <button className="btn btn-sm">View Details</button>
                </Link>
                {user ? (
                  <button onClick={() => handleFavorite(blog)} className="btn btn-sm">
                    Favorite
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
