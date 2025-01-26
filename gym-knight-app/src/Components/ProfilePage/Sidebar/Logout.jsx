export default function LogoutButton(props) {
    return(
        <button onClick={props.logout} className="w-full py-2 bg-purple-900 text-white rounded-lg hover:bg-purple-600">Logout</button>
    )
}