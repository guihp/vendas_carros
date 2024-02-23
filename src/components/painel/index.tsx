import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";



const HeaderDashboard = () => {

    const handleLogout = async () => {
        await signOut(auth);
    }

    return ( 
        <div className="flex gap-3 bg-red-500 rounded-full w-full max-w items-center px-4 text-white h-10 mb-4">
            <Link to='/dashboard' >
                Dashboard
            </Link>
            
            <Link to='/dashboard/novo' >
                novo carro
            </Link>

            <button className="ml-auto" onClick={handleLogout}>
                Sair da conta
            </button>

        </div>
     );
}
 
export default HeaderDashboard;