import { ForkRight } from "@mui/icons-material";
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
            value: elem.views,
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

export const getDayViewsChartData = async() => {
    const queryRes = await axios.get("http://localhost:5000/sessions");
    const res = queryRes.data.res.map((el) => {
        return { name: el._id, views: el.obj.length };
    });
    return res;
};

export const getDayTimeChartData = async() => {
    const queryRes = await axios.get("http://localhost:5000/sessions");
    let res = queryRes.data.res.map((el) => {
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
    res = res.sort((e1, e2) => (e1.name > e2.name ? 1 : -1));
    return res;
};

export const getHomePage = async() => {
    const queryRes = await axios.get("http://localhost:5000/home");
    console.log("sana ", queryRes.data.newArray);
    return queryRes.data.newArray;
};

export const getFullPageData = async(id) => {
    const queryRes = await axios.get("http://localhost:5000/" + id);
    return queryRes.data.page;
};

const reduceArray = (tab, field) => {
    return tab.reduce((group, tx) => {
        const value = tx[field];
        if (!group[value]) group[value] = [];
        group[value].push(tx);
        return group;
    }, {});
};

export const getFilterEventTableData = async(id) => {
    const queryRes = await axios.get("http://localhost:5000/" + id);
    const filter = queryRes.data.page.filterEvent;
    const checkFilter = queryRes.data.page.checkfilterEvent;

    let filterAll = [];

    filter.map((el) => {
        filterAll.push({
            headerName: el.headerName,
            type: "Search",

            ToolbarOpen: el.ToolbarOpen ? "open" : "closed",
        });
    });

    checkFilter.map((el) => {
        filterAll.push({
            headerName: el.headerName,
            type: "Check",
            ToolbarOpen: el.ToolbarOpen ? "open" : "closed",
        });
    });
    const filterGroupedByHeaderName = reduceArray(filter, "headerName");
    const filterGrouped = Object.keys(filterGroupedByHeaderName).map((key) => {
        const filterGroupedByToolbar = reduceArray(
            filterGroupedByHeaderName[key],
            "ToolbarOpen"
        );
        const formatedTab = Object.keys(filterGroupedByToolbar).map((toolbar) => {
            return {
                headerName: key,
                toolbar: toolbar,
                type: "Search",
                nb: filterGroupedByToolbar[toolbar].length,
            };
        });
        return formatedTab;
    });

    const checkFilterGroupedByHeaderName = reduceArray(checkFilter, "headerName");
    const checkFilterGrouped = Object.keys(checkFilterGroupedByHeaderName).map(
        (key) => {
            const filterGroupedByToolbar = reduceArray(
                checkFilterGroupedByHeaderName[key],
                "ToolbarOpen"
            );
            const formatedTab = Object.keys(filterGroupedByToolbar).map((toolbar) => {
                return {
                    headerName: key,
                    toolbar: toolbar,
                    type: "Check",
                    nb: filterGroupedByToolbar[toolbar].length,
                };
            });
            return formatedTab;
        }
    );

    const resArray = [];
    const aggreateFilter = [...filterGrouped, ...checkFilterGrouped];
    aggreateFilter.map((el) => el.map((sana) => resArray.push(sana)));
    return resArray;
};

export const getGroupEventTableData = async(id) => {
    const queryRes = await axios.get("http://localhost:5000/" + id);
    const group = queryRes.data.page.groupEvent;

    const GroupEventGroupedByHeaderName = reduceArray(group, "headerName");
    const Grouped = Object.keys(GroupEventGroupedByHeaderName).map((key) => {
        const GroupEventGroupedByToolbar = reduceArray(
            GroupEventGroupedByHeaderName[key],
            "ToolbarOpen"
        );
        const formatedTab = Object.keys(GroupEventGroupedByToolbar).map(
            (toolbar) => {
                return {
                    headerName: key,
                    toolbar: toolbar === "true" ? "open" : "closed",
                    nb: GroupEventGroupedByToolbar[toolbar].length,
                };
            }
        );
        return formatedTab;
    });

    const resArray = [];
    const aggreateFilter = [...Grouped];
    aggreateFilter.map((el) => el.map((sana) => resArray.push(sana)));
    return resArray;
};

export const getGroupPieChartData = async(id) => {
    const data = await getGroupEventTableData(id);
    const total = data.reduce(
        (previousValue, currentValue) => previousValue + currentValue.nb,
        0
    );
    return data.map((el) => {
        return {
            name: el.toolbar === "closed" ? "side bar closed" : "side bar opened",
            value: (el.nb / total) * 100,
        };
    });
};

export const getSearchTableData = async(id) => {
    const queryData = await getFullPageData(id);

    const data = reduceArray(queryData.searchEvent, "nb");
    const resData = Object.keys(data).map((key) => {
        return {
            nb: key,
            nbOccurs: data[key].length,
        };
    });
    return resData;
};

export const getFilterSearchTableData = async(id) => {
    const queryData = await getFullPageData(id);
    const data = reduceArray(queryData.FilterSearchEvent, "nb");
    const resData = Object.keys(data).map((key) => {
        return {
            nb: key,
            nbOccurs: data[key].length,
        };
    });
    return resData;
};

export const getSelectPieChartData = async(id) => {
    const queryData = await getFullPageData(id);
    const data = reduceArray(queryData.selectEvent, "event");
    let nbTotal = 0;
    const resData = Object.keys(data).map((key) => {
        nbTotal += data[key].length;
        return {
            nb: key,
            nbOccurs: data[key].length,
        };
    });

    const finalData = resData.map((el) => {
        return {
            name: el.nb,
            value: (el.nbOccurs / nbTotal) * 100,
        };
    });
    return finalData;
};

export const getSelectBarChartData = async(id) => {
    const queryData = await getFullPageData(id);
    const data = reduceArray(queryData.selectEvent, "event");
    const resData = Object.keys(data).map((key) => {
        return {
            name: key,
            nb: data[key].length,
        };
    });
    return resData;
};
export const getSortPieChartData = async(id) => {
    const queryData = await getFullPageData(id);
    const data = reduceArray(queryData.sortEvent, "sort");
    let nbTotal = 0;
    const resData = Object.keys(data).map((key) => {
        nbTotal += data[key].length;
        return {
            nb: key,
            nbOccurs: data[key].length,
        };
    });

    const finalData = resData.map((el) => {
        return {
            name: el.nb,
            value: (el.nbOccurs / nbTotal) * 100,
        };
    });
    return finalData;
};

export const getSortData = async(id) => {
    const queryData = await getFullPageData(id);
    const data = reduceArray(queryData.sortEvent, "name");

    const resData = Object.keys(data).map((key) => {
        return {
            name: key,
            array: data[key],
        };
    });

    let finalArray = [];
    resData.map((el) => {
        let data = reduceArray(el.array, "sort");
        data = Object.keys(data).map((key) => {
            finalArray.push({
                field: el.name,
                name: key,
                array: data[key].length,
            });
        });
    });
    return finalArray;
};

export const getAggBarChartData = async(id) => {
    const queryData = await getFullPageData(id);
    const data = reduceArray(queryData.aggEvent, "aggFunc");
    const resData = Object.keys(data).map((key) => {
        return {
            name: key,
            nb: data[key].length,
        };
    });
    return resData;
};

export const getAggTableData = async(id) => {
    const queryData = await getFullPageData(id);
    const data = reduceArray(queryData.aggEvent, "headerName");

    const resData = Object.keys(data).map((key) => {
        return {
            name: key,
            array: data[key],
        };
    });

    let finalArray = [];
    resData.map((el) => {
        let data = reduceArray(el.array, "aggFunc");
        data = Object.keys(data).map((key) => {
            finalArray.push({
                field: el.name,
                name: key,
                array: data[key].length,
            });
        });
    });
    return finalArray;
};

export const getPinPieChartData = async(id) => {
    const queryData = await getFullPageData(id);
    const data = reduceArray(queryData.PinnedEvent, "pinned");
    let totalNb = 0;
    let resData = Object.keys(data).map((key) => {
        totalNb += data[key].length;
        return {
            name: key,
            value: data[key].length,
        };
    });
    resData = resData.map((el) => {
        return {
            ...el,
            value: (el.value / totalNb) * 100,
        };
    });

    return resData;
};

export const getPinTableData = async(id) => {
    const queryData = await getFullPageData(id);
    const data = reduceArray(queryData.PinnedEvent, "name");
    console.log("data ", data);
    const resData = Object.keys(data).map((key) => {
        return {
            name: key,
            array: data[key],
        };
    });

    let finalArray = [];
    resData.map((el) => {
        let data = reduceArray(el.array, "pinned");
        data = Object.keys(data).map((key) => {
            finalArray.push({
                field: el.name,
                name: key,
                array: data[key].length,
            });
        });
    });
    return finalArray;
};

export const getSessionTimeChartData = async(id) => {
    const queryRes = await axios.get("http://localhost:5000/sessions/" + id);
    let res = queryRes.data.res.map((el) => {
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
    res = res.sort((e1, e2) => (e1.name > e2.name ? 1 : -1));

    return res;
};

export const getDayViewsPageChartData = async(id) => {
    const queryRes = await axios.get("http://localhost:5000/sessions/" + id);
    const res = queryRes.data.res.map((el) => {
        return { name: el._id, views: el.obj.length };
    });
    return res;
};

export const getinfoPage = async(id) => {
    const queryRes = await axios.get("http://localhost:5000/info/" + id);
    console.log("queryRes ", queryRes.data.newArray);
    return queryRes.data.newArray;
};