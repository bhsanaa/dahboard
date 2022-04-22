import axios from "axios";

export const signIn = async(values) => {
    const res = await axios.post("http://localhost:5000/signin", values);
    return res;
    console.log(res);
};