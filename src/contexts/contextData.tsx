import { createContext, useEffect, useState } from "react";

export const ContextData = createContext<any | null>(null);
const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState();

  const profile = localStorage.getItem("currentUser");

  useEffect(() => {
    if (profile) {
      const user = JSON.parse(profile);

      setCurrentUser(user.currentUser);
    }
  }, [profile]);
  const dataValue = {
    currentUser,
  };
  return (
    <ContextData.Provider value={dataValue}>{children}</ContextData.Provider>
  );
};
export default ContextProvider;
