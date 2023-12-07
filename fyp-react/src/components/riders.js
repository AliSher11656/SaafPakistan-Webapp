import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { Table, Spinner, Form, Button } from "react-bootstrap";
import { firestore } from "../config/firebase-config";

function Riders({ searchTerm, setSearchTerm }) {
  const [riders, setRiders] = useState([]); // State to store fetched riders
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRidersData = async () => {
      try {
        const riderCollectionRef = collection(firestore, "Riders");
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
            firstName: rider.firstName,
            lastName: rider.lastName,
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRiders = riders.filter((rider) => {
    const searchTermLower = searchTerm.toLowerCase();

    return (
    
      (rider.firstName &&
        rider.firstName.toLowerCase().includes(searchTermLower)) ||
      (rider.lastName &&
        rider.lastName.toLowerCase().includes(searchTermLower)) ||
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
      await deleteDoc(doc(firestore, "Riders", id));

      const updatedRiders = riders.filter((rider) => rider.id !== id);
      setRiders(updatedRiders);
    } catch (error) {
      console.error("Error deleting rider: ", error);
    }
  };

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        Loading...
      </Spinner>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Assigned Area</th>
            <th>Id Card Number</th>
            <th>Vehicle Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredRiders.map((rider) => (
            <tr key={rider.id}>
              <td>{rider.firstName}</td>
              <td>{rider.lastName}</td>
              <td>{rider.phone}</td>
              <td>{rider.email}</td>
              <td>{rider.address}</td>
              <td>{rider.area}</td>
              <td>{rider.idCard}</td>
              <td>{rider.vehicleNumber}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(rider.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Riders;
