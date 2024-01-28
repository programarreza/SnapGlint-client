import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosLocal from "../../hooks/useAxiosLocal";

const BlogDetails = () => {
  const { id } = useParams();
  const axiosLocal = useAxiosLocal();
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosLocal
      .get(`/blogs_details/${id}`)
      .then((res) => setBlog(res?.data))
      .catch((err) => {
        console.log(err);
      });
  }, [axiosLocal, id]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      customClass: "swal-wide",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      customClass: {
        popup: "w-[300px]",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosLocal
          .delete(`/blog_delete/${id}`)
          .then((res) => {
            if (res.data.affectedRows > 0) {
              navigate("/");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

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
            <button onClick={() => handleDelete(blog[0]?.id)} className="btn">
              Delete
            </button>
            <Link to={`/blog_update/${blog[0]?.id}`} className="btn ">
              Update
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
