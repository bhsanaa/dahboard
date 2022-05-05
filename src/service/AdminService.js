import axios from "axios";

export const getAdmin = async(fields) => {
    const res = await axios.post("http://localhost:5000/admin", fields);
    console.log("admin", res);
    return res.data.admins;
};