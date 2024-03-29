import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import Comments from "../../components/Comments/Comments";

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
      // eslint-disable-next-line no-dupe-keys
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
    <div className="w-full px-2 md:px-6 lg:px-16 xl:px-44 mx-auto bg-slate-100">
      <div className="card card-compact bg-base-100 rounded-t-lg">
        <figure>
          <img src={blog[0]?.image} alt="blog" className="w-full h-[250px] md:h-[400px]" />
        </figure>
        <div className="card-body">
          <div className="flex items-center justify-between">
            <h2 className="card-title">{blog[0]?.title}</h2>
            <div className="card-actions justify-end">
              <button
                onClick={() => handleDelete(blog[0]?.id)}
                className="btn btn-sm"
              >
                Delete
              </button>
              <Link to={`/blog_update/${blog[0]?.id}`} className="btn btn-sm">
                Update
              </Link>
            </div>
          </div>

          <p>{blog[0]?.description}</p>

          {/* Comments  */}
          <div>
            <Comments id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
