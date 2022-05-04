import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Button, Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {useAppContext} from "../provider/AppProvider";

export const EventsChoicePage = () => {
  const {page} = useParams();
  const {events, setEvents} = useAppContext();

  useEffect(() => {
    setEvents({
      filter: {
        isActive: true,
        data: {
          table: true,
          chart: true,
        },
      },
      group: {
        isActive: true,
        data: {
          table: true,
          chart: true,
        },
      },
      search: {
        isActive: true,
        data: {
          tableAccount: true,
          tableHeader: true,
          chart: true,
        },
      },
      select: {
        isActive: true,
        data: {
          table: true,
          chart: true,
        },
      },
      sort: {
        isActive: true,
        data: {
          table: true,
          chart: true,
        },
      },
      pin: {
        isActive: true,
        data: {
          table: true,
          chart: true,
        },
      },
      agg: {
        isActive: true,
        data: {
          table: true,
          chart: true,
        },
      },
    });
  }, []);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={8}
          lg={12}
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
                backgroundColor: "#ececec",
                margin: "10px 0",
                padding: "10px",
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
                }}>
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
                backgroundColor: "#ececec",
                margin: "10px 0",
                padding: "10px",
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
                }}>
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
                backgroundColor: "#ececec",
                padding: "10px",
                margin: "10px 0",
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
                }}>
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
                      onChange={() => {
                        setEvents({
                          ...events,
                          search: {
                            ...events.search,
                            data: {
                              ...events.search.data,
                              table: !events.search.data.table,
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
                backgroundColor: "#ececec",
                padding: "10px",
                margin: "10px 0",
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
                }}>
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
                backgroundColor: "#ececec",
                padding: "10px",
                margin: "10px 0",
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
                }}>
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
                backgroundColor: "#ececec",
                padding: "10px",
                margin: "10px 0",
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
                }}>
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
                backgroundColor: "#ececec",
                padding: "10px",
                margin: "10px 0",
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
                  display: "flex",
                  flexDirection: "column",
                }}>
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
              <Button style={{backgroundColor: "#d00331"}} variant="contained">
                Events Page
              </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
