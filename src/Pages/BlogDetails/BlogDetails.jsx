import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosLocal from "../../hooks/useAxiosLocal";

const BlogDetails = () => {
  const { id } = useParams();
  const axiosLocal = useAxiosLocal();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    axiosLocal
      .get(`/blogs_details/${id}`)
      .then((res) => setBlog(res?.data))
      .catch((err) => {
        console.log(err);
      });
  }, [axiosLocal, id]);


  return (
    <div className="w-full px-44 mx-auto">
      <div className="card card-compact bg-base-100 shadow-xl">
        <figure>
          <img src={blog[0]?.image} alt="blog" className="w-full h-[400px]" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{blog[0]?.title}</h2>
          <p>{blog[0]?.description}</p>
          <div className="card-actions justify-end">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;