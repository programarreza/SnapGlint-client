import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const NavbarLinks = () => {
  const {user} = useAuth()
  return (
    <div className="flex flex-col  md:flex-row gap-4 font-semibold text-lg ">
      {user ? <><NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "text-[#006ce1]  border-b" : ""
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/add_blog"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "text-[#006ce1]  border-b" : ""
        }
      >
        Add Blog
      </NavLink>
      <NavLink
        to="/favorite"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "text-[#006ce1]  border-b" : ""
        }
      >
        Favorite
      </NavLink></>: <><NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "text-[#006ce1]  border-b" : ""
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/login"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "text-[#006ce1]  border-b" : ""
        }
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "text-[#006ce1] border-b" : ""
        }
      >
        Register
      </NavLink>
      
      </>}
      
    </div>
  );
};

export default NavbarLinks;
