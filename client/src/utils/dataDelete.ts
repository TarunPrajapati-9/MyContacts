import axios from "axios";

export async function deleteContact(id: string) {
  console.log(id);
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("No token found");
  }

  const { data } = await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/api/contacts/${id}`,
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
