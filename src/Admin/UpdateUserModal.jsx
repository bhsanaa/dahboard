import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {IconButton, TextField} from "@mui/material";
import {addUsers, getUserById, updateUser} from "../service/authService";
import {useAppContext} from "../provider/AppProvider";
import jwt_decode from "jwt-decode";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UpdateUserModal({setPageData, pageData, id}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [values, setValues] = React.useState({});

  React.useEffect(() => {
    getUserById(id).then((res) => {
      setValues({
        username: res.username,
        email: res.email,
        title: res.title,
        departement: res.departement,
        password: res.password,
        confirm: res.password,
      });
    });
  }, [open]);

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  const updateUserFunc = (e) => {
    updateUser(id, values);
    const res = pageData.filter((el) => el._id !== id);
    setPageData([...res, {_id: id, ...values}]);
  };

  return (
    <div>
      <IconButton
        sx={{bgcolor: "#d00331"}}
        style={{marginLeft: "10px"}}
        aria-label="delete"
        onClick={handleOpen}>
        <SystemUpdateAltIcon sx={{color: "#ffff"}} />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography textAlign={"center"} variant="h5">
            Update User
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="username"
            label="Username"
            id="password"
            onChange={onChange}
            value={values.username}
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            id="password"
            onChange={onChange}
            value={values.email}
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="title"
            label="Title"
            id="password"
            onChange={onChange}
            value={values.title}
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="departement"
            label="Departement"
            id="password"
            onChange={onChange}
            value={values.departement}
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            onChange={onChange}
            value={values.password}
            autoComplete="current-password"
            type="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm"
            label="Confirm Password"
            id="password"
            onChange={onChange}
            value={values.confirm}
            autoComplete="current-password"
            type="password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
            onClick={updateUserFunc}
            style={{backgroundColor: "#dd0031"}}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
