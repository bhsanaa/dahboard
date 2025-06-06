import axios from "axios";

export const signIn = async(values) => {
    const res = await axios.post("http://localhost:5000/signin", values);
    return res;
};

export const updateAccountBackend = async(values) => {
    const res = await axios.put("http://localhost:5000/settings", values);
    return res;
};

export const requestCompanyResetPassword = async(email) => {
    const { data } = await axios.post(
        "http://localhost:5000/resetPasswordRequest", { email }
    );
    if (data.err) {
        return { status: "error", msg: data.err };
    } else {
        return {
            status: "success",
            msg: "Email Sent Successfully",
            token: data,
        };
    }
};

export const companyPasswordReset = async(fields) => {
    const { data } = await axios.post(
        "http://localhost:5000/passwordReset",
        fields
    );
    if (data.err) {
        return { status: "error", msg: data.err };
    } else {
        return {
            status: "success",
            msg: "Password Reset Successfully",
            token: data,
        };
    }
};

export const getUserById = async(id) => {
    const res = await axios.get("http://localhost:5000/user/" + id);
    return res.data.user;
};

export const addUsers = async(fields) => {
    const res = await axios.post("http://localhost:5000/user/add", fields);
    return { err: res.data.err };
};

export const deleteUser = async(id) => {
    const res = await axios.delete("http://localhost:5000/user/delete/" + id);
    return res;
};

export const updateUser = async(id, fields) => {
    const res = await axios.put(
        "http://localhost:5000/user/update/" + id,
        fields
    );
    return res;
};

export const getAllUsers = async(fields) => {
    const res = await axios.get("http://localhost:5000/user");
    return res.data.users;
};

export const resetPasswordFunc = async(password, id, token) => {
    const res = await axios.get("http://localhost:5000/passwordReset", {
        password,
        userId: id,
        token,
    });

    return res.data.status;
};