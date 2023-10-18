import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    async function registerSubmit(e: any) {
        e.preventDefault()
        try {
            await axios.post('/register', {
                name,
                email,
                password,
            })
            alert('Registration successful. Now you can login')
        } catch (e) {
            alert('Registration failed. Please try again later')
        }
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-60">
                <h1 className="text-center text-4xl mb-5">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerSubmit}>
                    <input type="text"
                        placeholder="Nguyen Van A"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <input type="email"
                        placeholder="abc@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <input type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <button className="primary">Register</button>
                    <div className="text-center p-1 text-gray-500">
                        Already a member? <Link to={'/login'} className="text-black underline">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}