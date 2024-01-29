import toast from "react-hot-toast";
import { imageUpload } from "../../Utils/Utils";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import { useEffect, useState } from "react";

const Blog_update = () => {
  const { id } = useParams();
  const axiosLocal = useAxiosLocal();
  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    axiosLocal
      .get(`/blogs_details/${id}`)
      .then((res) => setBlog(res?.data))
      .catch((err) => {
        console.log(err);
      });
  }, [axiosLocal, id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const image = data.image[0];
      const imageData = await imageUpload(image);

      // create user entry in the database
      const blogInfo = {
        title: data.title,
        description: data.description,
        image: imageData?.data?.display_url,
      };

      const response = await axiosLocal.put(`/blog_update/${id}`, blogInfo);
      if (response.data) {
        toast.success("Blog Update successfully");
        navigate("/");
      }
      console.log(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div>
      <div className="w-full min-h-screen flex bg-cover bg-center">
        <div className="hero">
          <div className="hero-content flex flex-col md:flex-row  rounded-xl justify-between">
            <div className="card w-1/1  flex-shrink-0 shadow-2xl">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body md:px-16"
              >
                <h2 className="text-center text-3xl font-bold mt-5">
                  Update Blog
                </h2>
                <div className="grid  md:grid-cols-2 gap-3 items-center">
                  <div className="form-control">
                    <label className="label"></label>
                    <input
                      type="text"
                      defaultValue={blog[0]?.title}
                      {...register("title", { required: true })}
                      placeholder="Title"
                      className="input input-bordered h-10"
                    />
                    {errors.name && (
                      <span className="text-[#006ce1]">Title is required</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="image" className="block mb-0 text-sm">
                      Upload Blog Image:
                    </label>
                    <input
                      {...register("image", { required: true })}
                      required
                      type="file"
                      defaultValue={blog[0]?.image}
                      id="image"
                      accept="image/*"
                      className="border py-1 rounded-md"
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label"></label>
                  <input
                    defaultValue={blog[0]?.description}
                    type="text"
                    {...register("description", { required: true })}
                    placeholder="Description"
                    className="input input-bordered h-24"
                  />
                  {errors.email && (
                    <span className="text-[#006ce1]">
                      Description is required
                    </span>
                  )}
                </div>

                <div className="form-control mt-2">
                  <button
                    type="submit"
                    className="btn bg-[#61adff] hover:bg-[#006ce1] text-white  "
                  >
                    Update Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog_update;
