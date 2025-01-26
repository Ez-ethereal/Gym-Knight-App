export default function ProfilePicture(props) {
    return (
        <div className={`${props.size} border-4 border-sky-900 shadow-lg hover:scale-105 rounded-full overflow-hidden`}>
            <img src={props.src} alt="User Profile Picture" className="object-cover w-full h-full" />
        </div>
    )
}
