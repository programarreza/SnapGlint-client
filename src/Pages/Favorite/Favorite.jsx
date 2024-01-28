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
	<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mx-16 mt-5">
      {favorites.map((favorite, i) => (
        <div key={i}>
          <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
              <img src={favorite?.image} alt="blog" className="w-full h-[250px]" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{favorite?.title}</h2>
              <p>
                {favorite?.description.length > 150 ? (
                  <p>{favorite?.description.slice(0, 150)}</p>
                ) : (
                  <p>{favorite?.description}</p>
                )}{" "}
              </p>

              <div className="flex justify-between">
                <Link to={`/blog_details/${favorite?.id}`}>
                  <button className="btn">View Details</button>
                </Link>

                {/* <button onClick={() => handleFavorite(blog)} className="btn">
                  Favorite
                </button> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
};

export default Favorite;
