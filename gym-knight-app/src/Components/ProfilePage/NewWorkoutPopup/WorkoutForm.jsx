import React from 'react'
import { nanoid } from 'nanoid'

export default function WorkoutForm(props) {
    const [title, setTitle] = React.useState(props.workoutName)
    const [workouts, setWorkouts] = React.useState(props.workoutExercises);
    const workoutRefs = React.useRef([]);
    const titleRef = React.useRef(null)

    function changeTitle(e) {
        const { value } = e.target
        setTitle(value)
    }

    function addWorkout() {
        setWorkouts((prevWorkouts) => [
          ...prevWorkouts,
          { id: nanoid(), name: '', reps: '', sets: '', rest:'60', duration: null}
        ])
      }


    function handleWorkoutChange(e, index) {
        const { name, value } = e.target;
        const updatedWorkouts = workouts.map((workout, i) =>
          i === index ? { ...workout, [name]: value, key: i } : workout
        );
        setWorkouts(updatedWorkouts);
    };

    return (
            <form
                action={() => {
                    props.editWorkouts({name: title, exercises: workouts}, props.index)
                    props.close()
                    }
                } 
                className="flex flex-col items-center justify-center"
            >
                <h1 className="text-2xl font-semibold text-sky-900 mb-4">
                    <div className="flex justify-center">
                        <input
                            ref={titleRef}
                            name="title"
                            value={title}
                            type="text"
                            onChange={(e) => changeTitle(e)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    titleRef.current.blur()
                                }
                            }}
                            className="w-auto text-center"
                        />
                    </div>
                </h1>
                {workouts.map((workout, index) => {
                    
                    if (!workoutRefs.current[index]) {
                        workoutRefs.current[index] = {exercise: null, sets: null, reps: null};
                    }

                    return (
                        <div key={nanoid()} className="flex space-x-4">
                            <input
                                ref={(el) => workoutRefs.current[index].exercise = el} // Assign the ref for exercise
                                type="text"
                                name="name"
                                value={workout.name}
                                placeholder="Exercise"
                                onChange={(e) => handleWorkoutChange(e, index)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        workoutRefs.current[index].exercise.blur()
                                    }
                                }}
                                className="mb-2 p-2 border border-gray-300 rounded"
                            />
                            <input
                                ref={(el) => workoutRefs.current[index].sets = el}
                                type="number"
                                name="sets"
                                value={workout.sets}
                                placeholder="Sets"
                                onChange={(e) => handleWorkoutChange(e, index)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        workoutRefs.current[index].sets.blur()
                                    }
                                }}
                                className="mb-2 p-2 border border-gray-300 rounded"
                            />
                            <input
                                ref={(el) => workoutRefs.current[index].reps = el}
                                type="number"
                                name="reps"
                                value={workout.reps}
                                placeholder="Reps"
                                onChange={(e) => handleWorkoutChange(e, index)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        workoutRefs.current[index].reps.blur()
                                    }
                                }}
                                className="mb-2 p-2 border border-gray-300 rounded"
                            />
                        </div>
                )})}

                <div className="flex items-center justify-center space-x-4">
                    <button
                        type="button"
                        onClick={addWorkout}
                        className="mt-4 bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        Add Exercise +
                    </button>

                    <button
                        type="submit"
                        className="mt-4 bg-sky-900 text-white py-2 px-6 rounded-lg hover:bg-sky-600 transition duration-300"
                    >
                        Save Workout
                    </button>
                </div>
            </form>
        )
}