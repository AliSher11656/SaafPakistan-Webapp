import React, { useEffect, useState, useContext } from "react";
import { Table, Spinner } from "react-bootstrap";
import MDButton from "components/MDButton";
import "../../../examples/Tables/DataTable/table-style.css";
import * as apiService from "../../api-service";
import { AuthContext } from "../../../context/AuthContext";

function Riders({ searchTerm, setSearchTerm }) {
  const [riders, setRiders] = useState([]); // State to store fetched riders
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.getIdToken) {
      (async () => {
        const userIdToken = await user.getIdToken();
        try {
          const fetchedData = await apiService.getRidersData({
            userIdToken,
          });
          // console.log("Fetched data:", fetchedData);
          setRiders(fetchedData);
          setLoading(false);
        } catch (error) {
          setError("Error fetching riders: " + error.message);
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
      await apiService.deleteRider({ userIdToken, id });
      const updatedRiders = riders.filter((rider) => rider.id !== id);
      setRiders(updatedRiders);
    } catch (error) {
      console.error("Error deleting rider: ", error);
    }
  };

  const filteredRiders = riders.filter((rider) =>
    Object.values(rider)
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
            height: "200px", // Adjust height as needed
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
              <th className="table-header">Email</th>
              <th className="table-header">ID Card</th>
              <th className="table-header">Area</th>
              <th className="table-header">Phone</th>
              <th className="table-header">Vehicle Number</th>
              <th className="table-header">Address</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRiders.map((rider) => (
              <tr key={rider.id} className="table-row">
                <td className="table-cell">{rider.name}</td>
                <td className="table-cell">{rider.email}</td>
                <td className="table-cell">{rider.idCard}</td>
                <td className="table-cell">{rider.area}</td>
                <td className="table-cell">{rider.phone}</td>
                <td className="table-cell">{rider.vehicleNumber}</td>
                <td className="table-cell">{rider.address}</td>
                <td>
                  <MDButton
                    variant="gradient"
                    color="dark"
                    fullWidth
                    type="delete"
                    onClick={() => handleDelete(rider.id)}
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

export default Riders;
