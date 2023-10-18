import axios from "axios"
import { useContext, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { UserContext } from "~/UserContext"
import PlacesPage from "./PlacesPage"
import AccountNav from "./AccountNav"

export default function ProfilePage() {
    const { user, setUser, ready } = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)

    async function logout() {
        await axios.post('/logout',)
        setRedirect(true)
        setUser(null)
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    if (!ready) {
        return 'Loading...'
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />
    }
    let { subpage } = useParams()
    if (subpage === undefined) {
        subpage = 'profile'
    }

    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="max-w-lg mx-auto text-center">
                    Logged in as {user.name} ({user.email}) <br />
                    <button className="primary max-w-sm mt-2" onClick={logout}>Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    )
}