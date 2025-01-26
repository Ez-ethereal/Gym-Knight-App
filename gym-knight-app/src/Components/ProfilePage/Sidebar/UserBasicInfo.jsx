import ProfilePicture from "/src/Components/ProfilePage/Sidebar/ProfilePicture.jsx"

export default function UserBasicInfo() {
    return (
        <div className="flex flex-col items-center justify-center">
            <ProfilePicture src="/src/assets/knight.jpg" size="w-32 h-32" />
            <h1 className="mt-6 font-semibold text-sky-900 tracking-wide uppercase whitespace-nowrap"
                style={{ fontSize: "clamp(0.8rem, 1.2vw, 3rem)" }}>
                Eric Zhou
            </h1>
        </div>

    )

}