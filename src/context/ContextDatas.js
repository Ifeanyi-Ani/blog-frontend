import { useState, createContext } from "react";

export const ContextData = createContext()
function DataProvider(props) {
  const [isLogged, setisLogged] = useState(false)

  const dataValue = { isLogged, setisLogged }
  return (
    <ContextData.Provider value={dataValue}>
      {props.children}
    </ContextData.Provider>
  )
}
export default DataProvider;