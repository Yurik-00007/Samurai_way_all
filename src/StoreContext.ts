import React from "react";
import {store} from "./redux/redux-store";

export const StoreContext = React.createContext(null)


/*
    <StoreContext.Provider value={ props.store }>
    {props.children}
    </StoreContext.Provider>
*/
