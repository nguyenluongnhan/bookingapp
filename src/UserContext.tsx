import axios from "axios";
import React, { useEffect, useState } from "react";

export const UserContext = React.createContext<any>({})

export function UserContextProvider({ children }: { children: any }) {
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)
    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }: { data: any }) => {
                setUser(data)
                setReady(true)
            })
        }
    }, [])
    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    )
}