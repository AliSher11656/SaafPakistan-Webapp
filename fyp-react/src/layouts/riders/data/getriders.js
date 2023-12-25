import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { Table, Spinner } from "react-bootstrap";
import { db } from "../../../firebase";
import MDButton from "components/MDButton";
import "../../../examples/Tables/DataTable/table-style.css";

function Riders({ searchTerm, setSearchTerm }) {
  const [riders, setRiders] = useState([]); // State to store fetched riders
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRidersData = async () => {
      try {
        const riderCollectionRef = collection(db, "rider");
        const querySnapshot = await getDocs(riderCollectionRef);

        const ridersData = [];
        for (const docSnap of querySnapshot.docs) {
          const rider = docSnap.data();
          const riderId = docSnap.id;

          const areaRef = rider.area;
          let area = null;

          if (areaRef) {
            const areaDoc = await getDoc(areaRef);
            area = areaDoc.data();
          }

          const riderObject = {
            id: riderId,
            name: rider.name,
            email: rider.email,
            idCard: rider.idCard,
            area: area ? area.location : "",
            phone: rider.phone,
            vehicleNumber: rider.vehicleNumber,
            address: rider.address,
          };
          ridersData.push(riderObject);
        }

        setRiders(ridersData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching riders: ", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchRidersData();
  }, []);

  const filteredRiders = riders.filter((rider) => {
    const searchTermLower = searchTerm.toLowerCase();

    return (
      (rider.name && rider.name.toLowerCase().includes(searchTermLower)) ||
      (rider.email && rider.email.toLowerCase().includes(searchTermLower)) ||
      rider.phone.toString().includes(searchTerm) ||
      (rider.area && rider.area.toLowerCase().includes(searchTermLower)) ||
      rider.idCard.toString().includes(searchTerm) ||
      (rider.vehicleNumber &&
        rider.vehicleNumber.toLowerCase().includes(searchTermLower)) ||
      (rider.address && rider.address.toLowerCase().includes(searchTermLower))
    );
  });

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "rider", id));

      const updatedRiders = riders.filter((rider) => rider.id !== id);
      setRiders(updatedRiders);
    } catch (error) {
      console.error("Error deleting rider: ", error);
    }
  };

  if (loading) {
    return (
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
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <Table striped bordered hover className="custom-table">
        <thead>
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">Phone</th>
            <th className="table-header">Email</th>
            <th className="table-header">Address</th>
            <th className="table-header">Assigned Area</th>
            <th className="table-header">Id Card Number</th>
            <th className="table-header">Vehicle Number</th>
            <th className="table-header"></th>
          </tr>
        </thead>
        <tbody>
          {filteredRiders.map((rider) => (
            <tr key={rider.id} className="table-row">
              <td className="table-cell">{rider.name}</td>
              <td className="table-cell">{rider.phone}</td>
              <td className="table-cell">{rider.email}</td>
              <td className="table-cell">{rider.address}</td>
              <td className="table-cell">{rider.area}</td>
              <td className="table-cell">{rider.idCard}</td>
              <td className="table-cell">{rider.vehicleNumber}</td>
              <td className="table-cell">
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
    </div>
  );
}

export default Riders;
