import axios from "axios";

export async function getUser() {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("No token found");
  }

  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/current`,
    {
      headers: {
        "x-api-key": import.meta.env.VITE_HEADER_SECRET,
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log(data);
  return data;
}

export async function getContacts() {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("No token found");
  }

  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/contacts`,
    {
      headers: {
        "x-api-key": import.meta.env.VITE_HEADER_SECRET,
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //   console.log(data);
  return data;
}
