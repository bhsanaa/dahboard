import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Button, Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {useAppContext} from "../provider/AppProvider";
import SendIcon from "@mui/icons-material/Send";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
export const EventsChoicePage = () => {
  const {page} = useParams();
  const {events, setEvents} = useAppContext();

  useEffect(() => {
    setEvents({
      filter: {
        isActive: false,
        data: {
          table: false,
          chart: false,
        },
      },
      group: {
        isActive: false,
        data: {
          table: false,
          chart: false,
        },
      },
      search: {
        isActive: false,
        data: {
          tableAccount: false,
          tableHeader: false,
          chart: false,
        },
      },
      select: {
        isActive: false,
        data: {
          table: false,
          chart: false,
        },
      },
      sort: {
        isActive: false,
        data: {
          table: false,
          chart: false,
        },
      },
      pin: {
        isActive: false,
        data: {
          table: false,
          chart: false,
        },
      },
      agg: {
        isActive: false,
        data: {
          table: false,
          chart: false,
        },
      },
    });
  }, []);

  return (
    <div>
      <Grid
        container
        spacing={3}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Grid
          item
          xs={12}
          md={8}
          lg={9}
          style={{marginLeft: "10px", textAlign: "left"}}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
            elevation={6}>
            <Grid
              item
              container
              xs={12}
              style={{
                backgroundColor: "#fbfbfb",
                margin: "10px 0",
                padding: "10px 100px",
                boxShadow: "0 0 2px black",
              }}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#d00331",
                      }}
                      onChange={() => {
                        setEvents({
                          ...events,
                          filter: {
                            ...events.filter,
                            isActive: !events.filter.isActive,
                          },
                        });
                      }}
                    />
                  }
                  label="Filter Event"
                />
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0 60px",
                }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#d00331",
                      }}
                      disabled={!events.filter.isActive}
                      onChange={() => {
                        setEvents({
                          ...events,
                          filter: {
                            ...events.filter,
                            data: {
                              ...events.filter.data,
                              chart: !events.filter.data.chart,
                            },
                          },
                        });
                      }}
                    />
                  }
                  label="Chart"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#d00331",
                      }}
                      disabled={!events.filter.isActive}
                      onChange={() => {
                        setEvents({
                          ...events,
                          filter: {
                            ...events.filter,
                            data: {
                              ...events.filter.data,
                              table: !events.filter.data.table,
                            },
                          },
                        });
                      }}
                    />
                  }
                  label="Table "
                />
              </Grid>
            </Grid>

            <Grid
              item
              container
              xs={12}
              style={{
                backgroundColor: "#fbfbfb",
                margin: "10px 0",
                padding: "10px 100px",
                boxShadow: "0 0 2px black",
              }}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#d00331",
                      }}
                      onChange={() => {
                        setEvents({
                          ...events,
                          group: {
                            ...events.group,
                            isActive: !events.group.isActive,
                          },
                        });
                      }}
                    />
                  }
                  label="Group Event"
                />
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0 60px",
                }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#d00331",
                      }}
                      disabled={!events.group.isActive}
                      onChange={() => {
                        setEvents({
                          ...events,
                          group: {
                            ...events.group,
                            data: {
                              ...events.group.data,
                              chart: !events.group.data.chart,
                            },
                          },
                        });
                      }}
                    />
                  }
                  label="Chart"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#d00331",
                      }}
                      disabled={!events.group.isActive}
                      onChange={() => {
                        setEvents({
                          ...events,
                          group: {
                            ...events.group,
                            data: {
                              ...events.group.data,
                              table: !events.group.data.table,
                            },
                          },
                        });
                      }}
                    />
                  }
                  label="Table "
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              style={{
                backgroundColor: "#fbfbfb",
                margin: "10px 0",
                padding: "10px 100px",
                boxShadow: "0 0 2px black",
              }}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#d00331",
                      }}
                      onChange={() => {
                        setEvents({
                          ...events,
                          search: {
                            ...events.search,
                            isActive: !events.search.isActive,
                          },
                        });
                      }}
                    />
                  }
                  label="Search Event"
                />
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0 60px",
                }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#d00331",
                      }}
                      disabled={!events.search.isActive}
                      onChange={() => {
                        setEvents({
                          ...events,
                          search: {
                            ...events.search,
                            data: {
                              ...events.search.data,
                              tableAccount: !events.search.data.tableAccount,
                            },
                          },
                        });
                      }}
                    />
                  }
                  label="Account Table"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#d00331",
                      }}
                      disabled={!events.search.isActive}
                      onChange={() => {
                        setEvents({
                          ...events,
                          search: {
                            ...events.search,
                            data: {
                              ...events.search.data,
                              tableHeader: !events.search.data.tableHeader,
                            },
                          },
                        });
                      }}
                    />
                  }
                  label="Header Name Table"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#d00331",
                      }}
                      disabled={!events.search.isActive}
                      onChange={() => {
                        setEvents({
                          ...events,
                          search: {
                            ...events.search,
                            data: {
                              ...events.search.data,
                              chart: !events.search.data.chart,
                            },
                          },
                        });
                      }}
                    />
                  }
                  label="Chart "
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              style={{
                backgroundColor: "#fbfbfb",
                margin: "10px 0",
                padding: "10px 100px",
                boxShadow: "0 0 2px black",
              }}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#d00331",
                      }}
                      onChange={() => {
                        setEvents({
                          ...events,
                          select: {
                            ...events.select,
                            isActive: !events.select.isActive,
                          },
                        });
                      }}
                    />
                  }
                  label="Select Event"
                />
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0 60px",
                }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#d00331",
                      }}
                      disabled={!events.select.isActive}
                      onChange={() => {
                        setEvents({
                          ...events,
                          select: {
                            ...events.select,
                            data: {
                              ...events.select.data,
                              chart: !events.select.data.chart,
                            },
                          },
                        });
                      }}
                    />
                  }
                  label="Chart"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#d00331",
                      }}
                      disabled={!events.select.isActive}
                      onChange={() => {
                        setEvents({
                          ...events,
                          select: {
                            ...events.select,
                            data: {
                              ...events.select.data,
                              table: !events.select.data.table,
                            },
                          },
                        });
                      }}
                    />
                  }
                  label="Table "
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              style={{
                backgroundColor: "#fbfbfb",
                margin: "10px 0",
                padding: "10px 100px",
                boxShadow: "0 0 2px black",
              }}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#d00331",
                      }}
                      onChange={() => {
                        setEvents({
                          ...events,
                          sort: {
                            ...events.sort,
                            isActive: !events.sort.isActive,
                          },
                        });
                      }}
                    />
                  }
                  label="Sort Event"
                />
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0 60px",
                }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#d00331",
                      }}
                      disabled={!events.sort.isActive}
                      onChange={() => {
                        setEvents({
                          ...events,
                          sort: {
                            ...events.sort,
                            data: {
                              ...events.sort.data,
                              chart: !events.sort.data.chart,
                            },
                          },
                        });
                      }}
                    />
                  }
                  label="Chart"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#d00331",
                      }}
                      disabled={!events.sort.isActive}
                      onChange={() => {
                        setEvents({
                          ...events,
                          sort: {
                            ...events.sort,
                            data: {
                              ...events.sort.data,
                              table: !events.sort.data.table,
                            },
                          },
                        });
                      }}
                    />
                  }
                  label="Table "
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              style={{
                backgroundColor: "#fbfbfb",
                margin: "10px 0",
                padding: "10px 100px",
                boxShadow: "0 0 2px black",
              }}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#d00331",
                      }}
                      onChange={() => {
                        setEvents({
                          ...events,
                          pin: {
                            ...events.pin,
                            isActive: !events.pin.isActive,
                          },
                        });
                      }}
                    />
                  }
                  label="Pin Event"
                />
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0 60px",
                }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#d00331",
                      }}
                      disabled={!events.pin.isActive}
                      onChange={() => {
                        setEvents({
                          ...events,
                          pin: {
                            ...events.pin,
                            data: {
                              ...events.pin.data,
                              chart: !events.pin.data.chart,
                            },
                          },
                        });
                      }}
                    />
                  }
                  label="Chart"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#d00331",
                      }}
                      disabled={!events.pin.isActive}
                      onChange={() => {
                        setEvents({
                          ...events,
                          pin: {
                            ...events.pin,
                            data: {
                              ...events.pin.data,
                              table: !events.pin.data.table,
                            },
                          },
                        });
                      }}
                    />
                  }
                  label="Table "
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              style={{
                backgroundColor: "#fbfbfb",
                margin: "10px 0",
                padding: "10px 100px",
                boxShadow: "0 0 2px black",
              }}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#d00331",
                      }}
                      onChange={() => {
                        setEvents({
                          ...events,
                          agg: {
                            ...events.agg,
                            isActive: !events.agg.isActive,
                          },
                        });
                      }}
                    />
                  }
                  label="Aggregation Event"
                />
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  padding: "0 60px",

                  display: "flex",
                  flexDirection: "column",
                }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#d00331",
                      }}
                      disabled={!events.agg.isActive}
                      onChange={() => {
                        setEvents({
                          ...events,
                          agg: {
                            ...events.agg,
                            data: {
                              ...events.agg.data,
                              chart: !events.agg.data.chart,
                            },
                          },
                        });
                      }}
                    />
                  }
                  label="Chart"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#d00331",
                      }}
                      disabled={!events.agg.isActive}
                      onChange={() => {
                        setEvents({
                          ...events,
                          agg: {
                            ...events.agg,
                            data: {
                              ...events.agg.data,
                              table: !events.agg.data.table,
                            },
                          },
                        });
                      }}
                    />
                  }
                  label="Table "
                />
              </Grid>
            </Grid>
            <Link
              to={"/" + page + "/event"}
              style={{
                color: "inherit",
                textDecoration: "none",
                textAlign: "center",
              }}>
              <Button
                style={{backgroundColor: "#d00331"}}
                variant="contained"
                endIcon={<ArrowForwardIosIcon />}>
                Events Page
              </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
