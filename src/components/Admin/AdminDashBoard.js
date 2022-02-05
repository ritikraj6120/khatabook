import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import {
  Context as AdminContext,
  Provider as AdminProvider,
} from "../../context/AdminContext";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AdminNavBar from "./AdminNavbar";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const OutlinedCard = (props) => {
  const {deleteuser} = useContext(AdminContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    deleteuser(Cookies,e.target.value);
    window.location.reload();
  };
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {props.username}
            </Typography>
            <Typography variant="h5" component="div">
              {props.firstName + " " + props.lastName}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              name
            </Typography>
            <Typography variant="body2">
              {props.email}
              <br />
              age={props.age}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" value={props.username} onClick={handleSubmit}>
              Delete User
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
};

const AdminDashboard = () => {
  const { state, fetchUserList, deleteuser } = useContext(AdminContext);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchUserList(Cookies);
  }, []);

  useEffect(() => {
    setUserList(state.userList);
  }, [state]);

  return (
    <div>
      <AdminNavBar />
      <h1>Admin Dashboard</h1>
      <p>You are logged in as admin</p>
      <p>Users Count:- {userList.length}</p>
      <ul>
        {userList.map((user) => {
          // return <li key={user.id}>{user.firstName + " " + user.lastName}</li>;
          return <OutlinedCard key={user.id} {...user} />;
        })}
      </ul>
    </div>
  );
};

export default () => {
  return (
    <AdminProvider>
      <AdminDashboard />
    </AdminProvider>
  );
};
