import axios from "axios";

const CLOUD_FUNCTIONS_ORIGIN = "http://localhost:4000";
// const CLOUD_FUNCTIONS_ORIGIN = "https://saafpakistan.live";

const apiUrl = `${CLOUD_FUNCTIONS_ORIGIN}`;
//////////////////////////////////////////// Dashboard  /////////////////////////////////////////////////////////////

// export async function getOrders({ userIdToken }) {
//   const url = `${apiUrl}/admin/dashboard`;
//   const res = await axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${userIdToken}`,
//     },
//   });
//   // console.log("res == ", res.data);
//   return res.data;
// }

export async function getStats({ userIdToken }) {
  const url = `${apiUrl}/admin/dashboard`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

////////////////////////////////////////////   Warehouse Managers    //////////////////////////////////////////////

export async function getWarehouseManagerData({ userIdToken }) {
  const url = `${apiUrl}/warehouseManager`;
  // console.log(`userIdToken: ${userIdToken}`);
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

export async function deleteWarehouseManager({ userIdToken, id }) {
  const url = `${apiUrl}/warehouseManager/${id}`;
  const res = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

export async function updatedWarehouseManager({ userIdToken, id, data }) {
  const url = `${apiUrl}/warehouseManager/${id}`;
  const res = await axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

/////////////////////////////////////////////  MObile Users   /////////////////////////////////////////////////////////////

export async function getMobileUsersData({ userIdToken }) {
  const url = `${apiUrl}/users`;
  // console.log(`userIdToken: ${userIdToken}`);
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

export async function deleteMobileUser({ userIdToken, id }) {
  const url = `${apiUrl}/users/${id}`;
  const res = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

export async function updatedMobileUser({ userIdToken, id, data }) {
  const url = `${apiUrl}/users/${id}`;
  const res = await axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

export async function getUserOrders({ userIdToken, id }) {
  const url = `${apiUrl}/users/${id}`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

////////////////////////////////////////////  Orders  //////////////////////////////////////////////////////////////

export async function deleteOrder({ userIdToken, id, deleteId }) {
  const url = `${apiUrl}/users/${id}/${deleteId}`;
  const res = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

////////////////////////////////////////////  Riders  //////////////////////////////////////////////////////////////

export async function getRidersData({ userIdToken }) {
  const url = `${apiUrl}/rider`;
  // console.log(`userIdToken: ${userIdToken}`);
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

export async function deleteRider({ userIdToken, id }) {
  const url = `${apiUrl}/rider/${id}`;
  const res = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

export async function updateRider({ userIdToken, id, data }) {
  const url = `${apiUrl}/rider/${id}`;
  const res = await axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

////////////////////////////////////////////  signUp    //////////////////////////////////////////////////////////////

export async function signup({ userIdToken, data }) {
  console.log("data == ", data);
  const url = `${apiUrl}/signup`;
  const res = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

////////////////////////////////////////////  Areas    //////////////////////////////////////////////////////////////
export async function getAreasData({ userIdToken }) {
  const url = `${apiUrl}/signup`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

export async function getareasData({ userIdToken }) {
  const url = `${apiUrl}/areas`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

export async function deleteArea({ userIdToken, id }) {
  const url = `${apiUrl}/areas/${id}`;
  const res = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

export async function updatedArea({ userIdToken, id, data }) {
  const url = `${apiUrl}/areas/${id}`;
  const res = await axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

export async function createArea({ userIdToken, data }) {
  const url = `${apiUrl}/areas`;
  const res = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}
//////////////////////////////////////////////  Recyclables  //////////////////////////////////////////////////////////

export async function getRecyclablesData({ userIdToken }) {
  const url = `${apiUrl}/recyclables`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

export async function deleteRecyclable({ userIdToken, id }) {
  const url = `${apiUrl}/recyclables/${id}`;
  const res = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

export async function updatedRecyclable({ userIdToken, id, data }) {
  const url = `${apiUrl}/recyclables/${id}`;
  const res = await axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

export async function createRecyclable({ userIdToken, data }) {
  const url = `${apiUrl}/recyclables`;
  const res = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

//////////////////////////////////////////////    Login  ////////////////////////////////////////////////////////////

export async function login({ email, password }) {
  const url = `${apiUrl}/login`;
  const res = await axios.post(url, { email, password });
  // console.log("res == ", res.data);
  return res.data;
}
