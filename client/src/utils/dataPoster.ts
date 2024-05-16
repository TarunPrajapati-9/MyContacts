import axios from "axios";

interface RegisterUser {
  email: string;
  username: string;
  password: string;
}

export async function registerUser(params: RegisterUser) {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
    params,
    {
      headers: {
        "x-api-key": import.meta.env.VITE_HEADER_SECRET,
      },
    }
  );
  // console.log(data);
  return data;
}

interface LoginUser {
  email: string;
  password: string;
}
export async function loginUser(params: LoginUser) {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
    params,
    {
      headers: {
        "x-api-key": import.meta.env.VITE_HEADER_SECRET,
      },
    }
  );
  // console.log(data);
  return data;
}
