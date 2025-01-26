import React from 'react'
import { useNavigate } from "react-router-dom"

export default function ExerciseScreen() {
    const navigate = useNavigate()

    function goToRestScreen() {
        navigate("/RestScreen")
    }

    return (
        <main className="bg-sky-900 px-4 py-6 flex items-center justify-center min-h-screen w-full">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-xl h-[90vh] overflow-hidden flex flex-col">
                {/* Header Section */}
                <header className="border-b pb-4 mb-4">
                    <h1 className="text-4xl font-semibold text-sky-900 text-center" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>Push Day</h1>
                </header>

                {/* Content Section */}
                <section className="flex flex-col items-center justify-center text-sky-900 space-y-12 h-full bg-knight bg-center bg-cover relative">
                    <div className="absolute inset-0 bg-black opacity-10 z-0"></div> {/* Overlay */}
                    <h2 className="text-2xl font-medium z-10">Exercise 1: Bench Press</h2>
                    <h2 className="text-2xl font-medium z-10">Set 1 of 3</h2>
                    <div className="flex items-center space-x-2 z-10">
                        <h2 className="text-2xl font-medium z-10">Weight:</h2>
                        <input
                            type="number"
                            defaultValue="225"
                            className="text-2xl font-medium text-sky-900 border-b-2 border-sky-900 p-1 max-w-20 focus:outline-none focus:ring-2 focus:ring-sky-900 z-10"
                        />
                    </div>
                    <div className="flex items-center space-x-2 z-10">
                        <h2 className="text-2xl font-medium z-10">Rest:</h2>
                        <input
                            type="number"
                            defaultValue="1"
                            className="text-2xl font-medium text-sky-900 border-b-2 border-sky-900 p-1 max-w-12 focus:outline-none focus:ring-2 focus:ring-sky-900 z-10"
                        />
                        <p>m</p>
                        <input
                            type="number"
                            defaultValue="30"
                            className="text-2xl font-medium text-sky-900 border-b-2 border-sky-900 p-1 max-w-16 focus:outline-none focus:ring-2 focus:ring-sky-900 z-10"
                        />
                        <p>s</p>
                    </div>
                    <button 
                        onClick={() => goToRestScreen()}
                        className="mt-6 py-2 px-6 bg-sky-900 text-white text-lg font-semibold rounded-md hover:bg-sky-800 transition-colors z-10"
                    >
                        Begin Rest
                    </button>
                </section>
            </div>
        </main>
    )
}
