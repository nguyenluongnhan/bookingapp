import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "~/UserContext.tsx";

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const { setUser } = useContext(UserContext)

    async function LoginSubmit(e: any) {
        e.preventDefault()
        try {
            const { data } = await axios.post('/login', { email, password })
            setUser(data)
            alert('Login successfull')
            setRedirect(true)
        } catch (e) {
            alert('Login failed')
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-60">
                <h1 className="text-center text-4xl mb-5">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={LoginSubmit}>
                    <input type="email"
                        placeholder="abc@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <button className="primary">Login</button>
                    <div className="text-center p-1 text-gray-500">
                        Don't have an account yet? <Link to={'/register'} className="text-black underline">Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}