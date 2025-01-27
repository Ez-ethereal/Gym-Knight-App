import React from "react"
import { useNavigate } from 'react-router-dom'

export default function SignUp() {

    const navigate = useNavigate()
    const [info, setInfo] = React.useState({ firstName: '', lastName: '', email: '', password: '' });
    const [error, setError] = React.useState('');

    function changeInfo(event) {
        const { name, value } = event.currentTarget;
        setInfo((prevInfo) => {
            return { ...prevInfo, [name]: value };
        });
    }

    async function handleSubmit() {
        // Your form submission logic here
        try {
            const body = info
            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            const data = await response.json()
            if (response.ok) {
                alert('Account successfully created!')
                setTimeout(() => (navigate("/")), 1000)
            } else {
                setError(data.error)
            }
        } catch (error) {
            console.error("Error during signup:", error.message)
            setError('An error occurred. Please try again.')
        }
    }

    return (
        <div className="bg-sky-900 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col items-center">
                <h2 className="text-3xl text-center mb-6 text-sky-900">Create an account</h2>
                <form action={handleSubmit} className="w-full flex flex-col items-center justify-center space-y-4">
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        aria-label="firstName"
                        placeholder="First Name"
                        value={info.firstName}
                        onChange={changeInfo}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        aria-label="lastName"
                        placeholder="Last Name"
                        value={info.lastName}
                        onChange={changeInfo}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        aria-label="email"
                        placeholder="Email"
                        value={info.email}
                        onChange={changeInfo}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        aria-label="password"
                        placeholder="Password"
                        value={info.password}
                        onChange={changeInfo}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                    <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4">
                        Create Account
                    </button>
                </form>
                <button onClick={() => navigate("/")} className="text-sm text-center text-cyan-600 mt-2">
                    I already have an account
                </button>
            </div>
        </div>
    );
}
