import React from 'react';
import UserBasicInfo from '/src/Components/ProfilePage/Sidebar/UserBasicInfo';
import LogoutButton from '/src/Components/ProfilePage/Sidebar/Logout';
import Workout from '/src/Components/ProfilePage/WorkoutGrid/UserWorkout';
import workoutsFile from '/src/Components/workouts.js'
import BeginWorkout from '/src/Components/ProfilePage/Sidebar/BeginWorkout.jsx'
import ViewStats from '/src/Components/ProfilePage/Sidebar/ViewStats.jsx'
import Popup from "/src/Components/ProfilePage/NewWorkoutPopup/AddWorkoutPopup.jsx"
import AddButton from "/src/Components/ProfilePage/WorkoutGrid/AddButton.jsx"
import { useNavigate } from "react-router-dom"
import { nanoid } from "nanoid";

export default function ProfilePage(props) {

  React.useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("/me", {
          method: ""
        })
      } catch (error) {
        
      }
    }
  })

  const [workouts, setWorkouts] = React.useState(workoutsFile)
  const [buttonPopup, setButtonPopup] = React.useState(false)
  const [showPopup, setShowPopup] = React.useState(false)
  const [popupType, setPopupType] = React.useState("")
  const [selectedWorkout, setSelectedWorkout] = React.useState(null)
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = React.useState("none")

  const navigate = useNavigate()

  function triggerPopup(type, index, workoutName, workoutExercises) {
    setPopupType(type)
    setSelectedWorkout({name: workoutName, exercises: workoutExercises})
    setSelectedWorkoutIndex(index)
    setButtonPopup(true)
    setTimeout(() => setShowPopup(true))
  }

  function closePopup() {
    setShowPopup(false)
    setTimeout(() => setButtonPopup(false), 300)
    setPopupType("")
    setTimeout(() => setSelectedWorkout(null), 300)
  }

  function editWorkouts(workout, index) {
    if (index === "none") {
      setWorkouts(prevWorkout => [...prevWorkout, workout])
    } else {
        setWorkouts(prevWorkout => {return (
          prevWorkout.map((wkt, ind) => {
          return ind === index ?  workout : wkt
        })
      )})
    }
  }

  function deleteWorkouts(index) {
    setWorkouts(prevWorkout => {return (
      prevWorkout.filter((wkt, ind) => ind !== index)
    )})
  }

  function goToExerciseScreen() {
    navigate("/ExerciseScreen")
  }

  const workoutComps = workouts.map((workout, index) => 
    <Workout 
      key={nanoid()}
      index={index}
      name={workout.name}
      exercises={workout.exercises} 
      triggerPopup={triggerPopup}
      deleteWorkouts={deleteWorkouts}
    />
  )
  const emptySpaces = 6 - workoutComps.length


  const adds = Array.from({ length: emptySpaces }, () => (
    <AddButton triggerPopup={triggerPopup} key={nanoid()}/>
  ))

  return (
    <div className="flex min-h-screen bg-sky-900">
      {/* Sidebar */}
      <div className="w-1/6 min-w-44 p-6 bg-white flex flex-col justify-between align-center">
        {/* User Basic Info */}
        <div className="flex flex-col gap-8">
          <UserBasicInfo />
          <BeginWorkout />
          <ViewStats />
        </div>

        {/* Logout Button */}
        <div className="mt-6">
          <LogoutButton logout={props.logout}/>
        </div>
      </div>

      {/* Main Content */}
  
      
      <div className="flex-1 p-6 overflow-scroll">
        {/* Grid of Workouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full h-full place-items-center">
            {workoutComps}
            {adds}
        </div>
      </div>
      {selectedWorkout &&
        <Popup startWorkout={() => goToExerciseScreen()} type={popupType} index={selectedWorkoutIndex} workoutName={selectedWorkout.name} workoutExercises={selectedWorkout.exercises} editWorkouts={editWorkouts} openStatus={buttonPopup} showPopup={showPopup} close={closePopup} />
      }
    </div>
  )
}

