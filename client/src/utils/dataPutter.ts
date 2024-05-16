import axios from "axios";
import { Contact } from "../components/ContactCard";

export async function updateContact(id: string, params: Contact) {
  console.log(id);
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("No token found");
  }

  const { data } = await axios.put(
    `${import.meta.env.VITE_BACKEND_URL}/api/contacts/${id}`,
    params,
    {
      headers: {
        "x-api-key": import.meta.env.VITE_HEADER_SECRET,
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(data);
  return data;
}
