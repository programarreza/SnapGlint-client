import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const DropDown = () => {
  const {user, logout} = useAuth()
  const [isShow, setIsShow] = useState(false);
  
  return (
    <>
      <div className="dropdown dropdown-end">
        <label
          onClick={() => setIsShow(!isShow)}
          className="btn btn-ghost btn-circle avatar "
        >
          <div className="w-10 rounded-full ">
            {user ? (
              <img alt="user profile" src={user?.image} />
            ) : (
              <img
                alt="user profile"
                src="https://i.postimg.cc/7PS6bh1w/profile.png"
              />
            )}
          </div>
        </label>
      </div>
      {isShow && user ? (
        <ul
          className="menu  absolute menu-sm dropdown-content  mt-36 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a className="justify-between">{user?.name}</a>
          </li>

          <li>
            <p onClick={logout}>Log Out</p>
          </li>
        </ul>
      ) : (
        ""
      )}
    </>
  );
};

export default DropDown;
