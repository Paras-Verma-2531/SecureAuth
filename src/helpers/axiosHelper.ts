import axios from "axios";
const axiosConfig=axios.create(
    {
        baseURL:"/api/users"
    }
)
export default axiosConfig