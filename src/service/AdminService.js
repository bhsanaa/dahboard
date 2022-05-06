import axios from "axios";

export const getAdmin = async(fields) => {
    const res = await axios.post("http://localhost:5000/admin", fields);
    if (res.data.err)
        return {
            status: "err",
            msg: res.data.err,
        };
    return res.data;
};