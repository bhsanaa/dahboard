import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {TextField} from "@mui/material";
import {addUsers} from "../service/authService";

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

export default function AddUserModal({setPageData, pageData}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [values, setValues] = React.useState({
    username: "",
    email: "",
    title: "",
    departement: "",
    password: "",
    confirm: "",
  });

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  const addUserFunc = async (e) => {
    const res = await addUsers(values);
    console.log("res added", res);
    setPageData([...pageData, res]);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="outlined"
        style={{
          marginTop: "30px",
          backgroundColor: "#d00331",
          Textcolor: "#d00331",
          color: "white",
          borderColor: "white",
        }}>
        Add User
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography textAlign={"center"} variant="h5">
            Add User
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="username"
            label="Username"
            id="password"
            onChange={onChange}
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
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm"
            label="Confirm Password"
            id="password"
            onChange={onChange}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
            onClick={addUserFunc}
            style={{backgroundColor: "#dd0031"}}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
