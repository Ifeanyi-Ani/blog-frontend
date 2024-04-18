import { createContext, useState } from "react";

export const ContextData = createContext<any | null>(null);
const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toggleCreateModal, setToggleCreateModal] = useState<boolean>(false);

  const dataValue = {
    toggleCreateModal,
    setToggleCreateModal,
  };
  return (
    <ContextData.Provider value={dataValue}>{children}</ContextData.Provider>
  );
};
export default ContextProvider;
