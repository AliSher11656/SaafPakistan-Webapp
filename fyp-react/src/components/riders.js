import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { firestore } from "../config/firebase-config";
import { Table, Spinner } from "react-bootstrap";

function Riders() {
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

          // Fetch reference data separately (assuming 'areaRef' is the reference field)
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

        console.log("Rider Data:", ridersData);
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
        {riders.map((rider) => (
          <tr key={rider.id}>
            <td>{rider.firstName}</td>
            <td>{rider.lastName}</td>
            <td>{rider.phone}</td>
            <td>{rider.email}</td>
            <td>{rider.address}</td>
            <td>{rider.area}</td>
            <td>{rider.idCard}</td>
            <td>{rider.vehicleNumber}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Riders;
