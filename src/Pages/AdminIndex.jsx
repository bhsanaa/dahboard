import {Button, Typography} from "@mui/material";
import React from "react";
import AddUserModal from "../Admin/AddUserModal";
import UsersTable from "../Admin/UserList";

export const AdminIndex = () => {
  return (
    <div>
      <UsersTable />
    </div>
  );
};
