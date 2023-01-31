import { useDispatch } from "react-redux";
import axios from "axios";
import { unauthenticateUser } from "../../redux/slices/authSlice";
import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";

const Logout = () => {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const { logoutUser } = useContext(UserContext);

  const logout = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/auth/logout");
      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
      logoutUser();
      setSuccess(data.message);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <div style={{ color: "green", margin: "10px 0" }}>{success}</div>
      <button onClick={() => logout()} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
};

export default Logout;