import { createContext } from "react";

// token context
export const TokenContext = createContext({ storedToken: {}, IsAdmin: {}, setStoredToken: () => {}, setIsAdmin: () => {}});