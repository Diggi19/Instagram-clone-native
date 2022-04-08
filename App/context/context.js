import { createContext, useContext } from "react";

export const appContext = createContext()


const appProvider = ({children})=>{
    const[isUser,setisUser]=React.useState(true)

    return(
        <appContext.Provider
          value={{
            setisUser,
            isUser
          }}  
        >
            {children}
        </appContext.Provider>
    )
}





export default appProvider