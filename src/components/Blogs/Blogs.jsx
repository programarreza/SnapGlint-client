import { useEffect, useState } from "react";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import { Link } from "react-router-dom";

const Blogs = () => {
  const axiosLocal = useAxiosLocal();
  const [blogs, setBlogs] = useState([]);

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

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mx-16 mt-5">
      {blogs.map((blog, i) => (
        <div key={i}>
          <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
              <img src={blog?.image} alt="blog" className="w-full h-[250px]" />
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

              <Link to={`/blog_details/${blog?.id}`}>
                <button className="btn">View Details</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
