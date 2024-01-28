import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "../../Utils/Utils";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import useAuth from "../../hooks/useAuth";

const AddBlog = () => {
  const { user } = useAuth();
  const axiosLocal = useAxiosLocal();
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const image = data.image[0];
      const imageData = await imageUpload(image);

      // create user entry in the database
      const blogInfo = {
        userId: user?.userId,
        title: data.title,
        description: data.description,
        image: imageData?.data?.display_url,
      };
      console.log(blogInfo);

      const response = await axiosLocal.post("/add_blog", blogInfo);
      if (response.data.insertId > 0) {
        reset();
        toast.success("Blog Added successfully");
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
                className="card-body px-16"
              >
                <h2 className="text-center text-3xl font-bold mt-5">
                  Add Blog
                </h2>
                <div className="flex items-center">
                  <div className="form-control">
                    <label className="label"></label>
                    <input
                      type="text"
                      {...register("title", { required: true })}
                      placeholder="Title"
                      className="input input-bordered h-10 mr-5"
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
                      id="image"
                      accept="image/*"
                      className="border py-1 rounded-md"
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label"></label>
                  <input
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
                    Add Now
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

export default AddBlog;
