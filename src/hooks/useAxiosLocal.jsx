import axios from "axios";

export const axiosLocal = axios.create({
  baseURL: "https://snapglint.onrender.com",
});
const useAxiosLocal = () => {
  return axiosLocal;
};

export default useAxiosLocal;