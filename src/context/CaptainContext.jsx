import { createContext, useState } from "react";

export const CaptainDataContext=createContext();

const CaptainContext = ({children}) => {

    const [captain,setCaptain]=useState({
        id:'',
        fullname: {
            firstname:'',
            lastname:''
        },
        email:'',
        vehicle: {
            color:'',
            plate:'',
            capacity:'',
            vehicleType:''
        },
    })

    return (
        <CaptainDataContext.Provider value={{ captain,setCaptain }}>
            {children}
        </CaptainDataContext.Provider>
    )
}

export default CaptainContext;