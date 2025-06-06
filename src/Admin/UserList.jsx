import * as React from "react";
import PropTypes from "prop-types";
import {alpha} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import {visuallyHidden} from "@mui/utils";
import {deleteUser, getAllUsers, updateUser} from "../service/authService";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import UpdateUserModal from "./UpdateUserModal";
import AddUserModal from "./AddUserModal";
import MenuListComposition from "./UserEdit";
import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  return (
    <TableHead
      style={{
        alignContent: "center",
        backgroundColor: "#f6f6f6",
        textColor: "white",
        fontSize: 14,
      }}>
      <TableRow>
        <TableCell style={{fontWeight: "bold"}}>Id</TableCell>
        <TableCell style={{fontWeight: "bold"}}>Username</TableCell>
        <TableCell style={{fontWeight: "bold"}}>Email</TableCell>
        <TableCell style={{fontWeight: "bold"}}>Title</TableCell>
        <TableCell style={{fontWeight: "bold"}}>Departement</TableCell>
        <TableCell style={{fontWeight: "bold"}}>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const {numSelected} = props;

  return (
    <Toolbar
      sx={{
        pl: {sm: 2},
        pr: {xs: 1, sm: 1},
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}></Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function UsersTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [pageData, setPageData] = React.useState([]);
  const [serverData, setServerData] = React.useState();

  React.useEffect(() => {
    getAllUsers().then((res) => {
      setPageData(res);
      setServerData(res);
    });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pageData.length) : 0;

  const deleteUserFunc = (id) => {
    deleteUser(id);
    const newData = pageData.filter((el) => el._id !== id);
    setPageData(newData);
  };

  const filterAssets = (searchTerm) => {
    if (searchTerm.length === 0) {
      setPageData(serverData);
      return;
    }
    const filterdAssets = pageData.filter((asset) =>
      asset.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setPageData(filterdAssets);
  };

  return (
    <Box style={{marginBottom: "20px"}}>
      <Box sx={{width: "100%"}}>
        <Paper elevation={5} style={{paddingBottom: "70px"}}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
              height: "90%",
              margin: "auto",
            }}>
            <Typography
              style={{
                padding: "5px",
                marginTop: "30px",
                color: "#d00331",
              }}
              component="h1"
              variant="h5">
              Users List :{" "}
            </Typography>
            <AddUserModal setPageData={setPageData} pageData={pageData} />
          </div>
          <Paper
            sx={{width: "90%", padding: "10px"}}
            style={{margin: "auto", marginTop: "30px"}}
            elevation={3}>
            <TextField
              id="outlined-basic"
              label="Search By Name"
              variant="filled"
              sx={{width: "100%", margin: "20px 0"}}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              color="secondary"
              onChange={(e) => {
                filterAssets(e.target.value);
              }}
            />

            <TableContainer
              style={{
                width: "100%",
                height: "100%",
                marginTop: "20px",
                marginBottom: "20px",
              }}>
              <Table
                sx={{minWidth: "750"}}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}>
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                  {pageData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          style={{width: "100%", margin: "auto"}}
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row._id}>
                          <TableCell
                            padding="checkbox"
                            style={{paddingLeft: "20px"}}>
                            {index}
                          </TableCell>
                          <TableCell>{row.username}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.title}</TableCell>
                          <TableCell>{row.departement}</TableCell>
                          <TableCell style={{zIndex: 0}}>
                            <div
                              style={{
                                width: "25px",
                                height: "25px",
                              }}>
                              <MenuListComposition
                                id={row._id}
                                setPageData={setPageData}
                                pageData={pageData}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 73 * emptyRows,
                      }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              style={{
                width: "80%",
                margin: "auto",
              }}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={pageData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Paper>
      </Box>
    </Box>
  );
}
