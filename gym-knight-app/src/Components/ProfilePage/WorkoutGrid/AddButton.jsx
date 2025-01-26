import React from "react"

export default function AddButton(props) {
    return(
        <button onClick={() => props.triggerPopup("new", "none", "My New Workout", [])} className="w-1/2 h-1/2">
            <img src="/src/assets/addbutton.png" />
        </button>
    )
}