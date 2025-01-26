import { nanoid } from "nanoid"

export default function Workout(props) {
    function convertTime(time) {
        const minutes = Math.floor(time / 60)
        const seconds = time - (minutes * 60)
        return ((minutes == 1 ? `${minutes} minute` : `${minutes} minutes`) + (seconds !== 0 ? `${seconds} seconds` : ''))
    }

    const exercises = props.exercises.map(exercise => (
            <div key={nanoid()} className="flex mb-4 justify-between">
                <h2 className="text-left text-base font-semibold text-sky-900">{exercise.name}</h2>
                <p className="">
                    {
                        `${exercise.sets} x
                        ${exercise.reps ? exercise.reps : convertTime(exercise.duration)}`
                    }
                </p>
            </div>
        )
    )

    return (
        <>
            <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg h-full w-full place-self-center">
                <h1 className="text-2xl font-semibold text-sky-900 mb-4">{props.name}</h1>
                <div className="w-full">
                    {exercises}
                </div>
                <div className="flex justify-center space-x-6 mt-6">
                    <button
                        className="flex items-center justify-center w-20 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover: bg-green-600 trasition duration-200 ease-in-out"
                        onClick={() => props.triggerPopup("edit", props.index, props.name, props.exercises)}
                    >
                        Edit
                    </button>
                    <button
                        className="flex items-center justify-center w-20 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover: bg-red-600 trasition duration-200 ease-in-out"
                        onClick={() => props.deleteWorkouts(props.index)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </>
    )
}