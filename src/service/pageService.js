import axios from "axios";

export const getAllPageNames = async() => {
    const res = await axios.get("http://localhost:5000/");
    const pageNames = res.data.page.map((el) => el.name);
    return pageNames;
};

export const getAllEventNames = async() => {
    const res = await axios.get("http://localhost:5000/");
    const pageObj = res.data.page[0];
    const eventnames = [];
    for (let i = 0; i < Object.keys(pageObj).length; i++) {
        let obj = Object.keys(pageObj)[i];
        if (obj.toUpperCase().includes("EVENT")) {
            let formatedTitle = obj.charAt(0).toUpperCase() + obj.slice(1);
            let posOfEvent = obj.toUpperCase().indexOf("EVENT");
            eventnames.push(formatedTitle.slice(0, posOfEvent) + " Event");
        }
    }

    return eventnames;
};
export const getViewsChartData = async() => {
    const res = await axios.get("http://localhost:5000/");
    const chartData = res.data.page.map((elem) => {
        return {
            name: elem.name,
            views: elem.views,
        };
    });
    return chartData;
};

export const getTimeChartData = async() => {
    const res = await axios.get("http://localhost:5000/");
    const chartData = res.data.page.map((elem) => {
        return {
            name: elem.name,
            time: elem.time,
        };
    });
    return chartData;
};