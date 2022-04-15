import axios from "axios";

export const getAllPages = async() => {
    const res = await axios.get("http://localhost:5000/");
    return res.data.page;
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
    console.log("getViewsChartData", chartData);

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

export const getDayViewsChartData = async() => {
    const queryRes = await axios.get("http://localhost:5000/sessions");
    const res = queryRes.data.res.map((el) => {
        return { name: el._id, views: el.obj.length };
    });
    return res;
};

export const getDayTimeChartData = async() => {
    const queryRes = await axios.get("http://localhost:5000/sessions");
    const res = queryRes.data.res.map((el) => {
        const timeEachSession = el.obj.map((pageSession) => {
            return (
                new Date(pageSession.endDate).getTime() -
                new Date(pageSession.startDate).getTime()
            );
        });
        const sumWithInitial = timeEachSession.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );
        return { name: el._id, time: sumWithInitial };
    });
    return res;
};

export const getHomePage = async() => {
    const queryRes = await axios.get("http://localhost:5000/home");
    return queryRes.data.newArray;
};

export const getFullPageData = async(id) => {
    const queryRes = await axios.get("http://localhost:5000/" + id);
    return queryRes.data.page;
};