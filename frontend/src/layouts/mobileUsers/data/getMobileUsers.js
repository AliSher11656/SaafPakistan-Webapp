import React, { useEffect, useState, useContext } from "react";
import { Table, Spinner } from "react-bootstrap";
import MDButton from "components/MDButton";
import "../../../examples/Tables/DataTable/table-style.css";
import * as apiService from "../../api-service";
import { AuthContext } from "../../../context/AuthContext";
import MDBox from "components/MDBox";
import { Icon } from "@mui/material";
import PropTypes from "prop-types";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@mui/system/styled";
import { green } from "@mui/material/colors";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "35em",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 1, mb: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function MobileUsers({ searchTerm, setSearchTerm }) {
  const [mobileUsers, setMobileUsers] = useState([]);
  const [selectedMobileUser, setSelectedMobileUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [error2, setError2] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const { user } = useContext(AuthContext);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [mobileUserModal, setMobileUserModal] = useState(false);
  const mobileUserModalOpen = () => setMobileUserModal(true);
  const mobileUserModalClose = () => {
    setMobileUserModal(false);
    setLoading(false);
    setError2("");
  };

  const deleteAlertOpen = () => setDeleteAlert(true);
  const deleteAlertClose = () => setDeleteAlert(false);

  useEffect(() => {
    if (user && user.getIdToken) {
      (async () => {
        const userIdToken = await user.getIdToken();
        try {
          const fetchedData = await apiService.getMobileUsersData({
            userIdToken,
          });
          setMobileUsers(fetchedData);
          setLoading(false);
        } catch (error) {
          setError("Error fetching mobile users: " + error.message);
          setLoading(false);
        }
      })();
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (!user || !user.getIdToken) {
      return;
    }
    const userIdToken = await user.getIdToken();
    try {
      await apiService.deleteMobileUser({ userIdToken, id });
      const updatedMobileUsers = mobileUsers.filter(
        (mobileUser) => mobileUser.id !== id
      );
      setMobileUsers(updatedMobileUsers);
    } catch (error) {
      console.error("Error deleting mobile user: ", error);
    }
  };

  const onUpdateMobileUser = async (e) => {
    e.preventDefault();
    if (!user || !user.getIdToken) {
      return;
    }
    const userIdToken = await user.getIdToken();
    try {
      await apiService.updatedMobileUser({
        userIdToken,
        id: selectedMobileUser.id,
        data: selectedMobileUser,
      });
      const updatedMobileUsers = mobileUsers.map((mobileUser) =>
        mobileUser.id === selectedMobileUser.id
          ? selectedMobileUser
          : mobileUser
      );
      setMobileUsers(updatedMobileUsers);
      mobileUserModalClose();
    } catch (error) {
      setError2("Error updating mobile user: " + error.message);
    }
  };

  const filteredMobileUsers = mobileUsers.filter((mobileUser) =>
    Object.values(mobileUser)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Dialog
        open={deleteAlert}
        onClose={deleteAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MDButton
            variant="text"
            color={"dark"}
            onClick={() => {
              setDeleteId(null);
              deleteAlertClose();
            }}
          >
            Cancel
          </MDButton>
          <MDButton
            variant="text"
            color="error"
            sx={{ color: "error.main" }}
            onClick={() => {
              handleDelete(deleteId);
              deleteAlertClose();
            }}
          >
            Delete
          </MDButton>
        </DialogActions>
      </Dialog>
      <BootstrapDialog
        onClose={mobileUserModalClose}
        aria-labelledby="customized-dialog-title"
        open={mobileUserModal}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={mobileUserModalClose}
        >
          <Typography
            variant="h3"
            color="secondary.main"
            sx={{ pt: 1, textAlign: "center" }}
          >
            Edit Mobile User
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 2,
                maxWidth: "100%",
                display: "flex",
                direction: "column",
                justifyContent: "center",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Name"
              type="text"
              color="secondary"
              required
              value={selectedMobileUser.name}
              onChange={(e) =>
                setSelectedMobileUser({
                  ...selectedMobileUser,
                  name: e.target.value,
                })
              }
            />
            <TextField
              label="Phone"
              type="tel"
              color="secondary"
              required
              value={selectedMobileUser.phone}
              onChange={(e) =>
                setSelectedMobileUser({
                  ...selectedMobileUser,
                  phone: e.target.value,
                })
              }
            />
            <TextField
              label="Email"
              type="email"
              color="secondary"
              required
              value={selectedMobileUser.email}
              onChange={(e) =>
                setSelectedMobileUser({
                  ...selectedMobileUser,
                  email: e.target.value,
                })
              }
            />
            <TextField
              label="Address"
              type="text"
              color="secondary"
              required
              value={selectedMobileUser.address}
              onChange={(e) =>
                setSelectedMobileUser({
                  ...selectedMobileUser,
                  address: e.target.value,
                })
              }
            />
            <TextField
              label="Area"
              type="text"
              color="secondary"
              required
              value={selectedMobileUser.area}
              onChange={(e) =>
                setSelectedMobileUser({
                  ...selectedMobileUser,
                  area: e.target.value,
                })
              }
            />
            <TextField
              label="Account Type"
              type="text"
              color="secondary"
              required
              value={selectedMobileUser.accountType}
              onChange={(e) =>
                setSelectedMobileUser({
                  ...selectedMobileUser,
                  accountType: e.target.value,
                })
              }
            />
            {error === "" ? null : (
              <Typography variant="h6" color="error">
                {error2}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          {loading ? (
            <CircularProgress
              size={30}
              sx={{
                color: green[500],
              }}
            />
          ) : (
            <MDButton
              variant="contained"
              color="info"
              type="submit"
              onClick={onUpdateMobileUser}
            >
              Update
            </MDButton>
          )}
        </DialogActions>
      </BootstrapDialog>{" "}
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <Spinner
            animation="border"
            role="status"
            style={{ width: "100px", height: "100px" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th className="table-header">Name</th>
              <th className="table-header">Phone</th>
              <th className="table-header">Email</th>
              <th className="table-header">Address</th>
              <th className="table-header">Area</th>
              <th className="table-header">Account Type</th>
              <th className="table-header"></th>
            </tr>
          </thead>
          <tbody>
            {filteredMobileUsers.map((mobileUser) => (
              <tr key={mobileUser.id} className="table-row">
                <td className="table-cell">{mobileUser.name}</td>
                <td className="table-cell">{mobileUser.phone}</td>
                <td className="table-cell">{mobileUser.email}</td>
                <td className="table-cell">{mobileUser.address}</td>
                <td className="table-cell">{mobileUser.area}</td>
                <td className="table-cell">{mobileUser.accountType}</td>
                <td className="table-cell">
                  <MDBox
                    display="flex"
                    alignItems="center"
                    mt={{ xs: 2, sm: 0 }}
                    ml={{ xs: -1.5, sm: 0 }}
                  >
                    <MDBox mr={1}>
                      <MDButton
                        variant="text"
                        color="error"
                        onClick={() => {
                          deleteAlertOpen();
                          setDeleteId(mobileUser.id);
                        }}
                      >
                        <Icon>delete</Icon>&nbsp;delete
                      </MDButton>
                    </MDBox>
                    <MDButton
                      variant="text"
                      color={"dark"}
                      onClick={() => {
                        setSelectedMobileUser(mobileUser);
                        mobileUserModalOpen();
                      }}
                    >
                      <Icon>edit</Icon>&nbsp;edit
                    </MDButton>
                  </MDBox>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default MobileUsers;
