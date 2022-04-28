import axios from "axios";
export const signIn = async(values) => {
    const res = await axios.post("http://localhost:5000/signin", values);
    return res;
};

export const updateAccountBackend = async(values) => {
    const res = await axios.put("http://localhost:5000/settings", values);
    return res;
};