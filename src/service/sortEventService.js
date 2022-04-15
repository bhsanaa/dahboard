import axios from "axios";

export const getSortEvent = async(page) => {
    const res = await axios.get("http://localhost:5000/" + page + "sortEvents");
    const elem = res.data.map((el) => {
        console.log("cc", el);
    });
    return elem;
};