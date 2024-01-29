import { useEffect, useState } from "react";
import { axiosLocal } from "../../hooks/useAxiosLocal";
import { Link } from "react-router-dom";

const Favorite = () => {
const [favorites, setFavorites] = useState([])
console.log(favorites);
  useEffect(() => {
    axiosLocal
      .get("/favorite")
      .then((res) => {
        setFavorites(res?.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  return (
	<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-3 md:px-6 xl:px-16 pt-5 pb-12 bg-slate-100 h-screen">
      {favorites.map((favorite, i) => (
        <div key={i}>
          <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
              <img src={favorite?.image} alt="blog" className="w-full h-[250px]" />
            </figure>
            <div className="card-body">
            <h2 className="card-title">
                {favorite?.title?.length > 35 ? (
                  <p>{favorite?.title.slice(0, 30)}</p>
                ) : (
                  <p>{favorite?.title}</p>
                )}{" "}
              </h2>
              <h3>
                {favorite?.description.length > 150 ? (
                  <p>{favorite?.description.slice(0, 150)}...</p>
                ) : (
                  <p>{favorite?.description}</p>
                )}{" "}
              </h3>

              <div className="">
                <Link to={`/blog_details/${favorite?.id}`}>
                  <button className="btn w-full">View Details</button>
                </Link>

              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
};

export default Favorite;
