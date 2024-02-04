import React, { useEffect, useState, useContext } from "react";
import { Table, Spinner } from "react-bootstrap";
import MDButton from "components/MDButton";
import "../../../examples/Tables/DataTable/table-style.css";
import * as apiService from "../../api-service";
import { AuthContext } from "../../../context/AuthContext";

function MobileUsers({ searchTerm, setSearchTerm }) {
  const [mobileUsers, setMobileUsers] = useState([]); // State to store fetched mobileUsers
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.getIdToken) {
      (async () => {
        const userIdToken = await user.getIdToken();
        try {
          const fetchedData = await apiService.getMobileUsersData({
            userIdToken,
          });
          // console.log("Fetched data:", fetchedData);
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

  const filteredMobileUsers = mobileUsers.filter((mobileUser) =>
    Object.values(mobileUser)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
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
            <span>Loading...</span>
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
                  <MDButton
                    variant="gradient"
                    color="dark"
                    fullWidth
                    type="delete"
                    onClick={() => handleDelete(mobileUser.id)}
                  >
                    Delete
                  </MDButton>
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
