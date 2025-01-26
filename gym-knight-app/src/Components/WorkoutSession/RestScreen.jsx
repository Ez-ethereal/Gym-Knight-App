import React from 'react'
import Timer from '/src/Components/WorkoutSession/Timer.jsx'

export default function RestScreen() {
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
                    <h1 className="text-4xl font-semibold z-10">Rest</h1>
                    <Timer />
                    <button className="mt-6 py-2 px-6 bg-sky-900 text-white text-lg font-semibold rounded-md hover:bg-sky-800 transition-colors z-10">
                        End Rest
                    </button>
                </section>
            </div>
        </main>
    )
}