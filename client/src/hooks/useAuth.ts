import { useEffect, useState } from "react";
import { isAuthenticated } from "../utils/authentication";

export function useAuth() {
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    setAuth(isAuthenticated());
  }, []);

  return { auth, setAuth };
}
