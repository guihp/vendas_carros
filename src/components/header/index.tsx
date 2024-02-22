import { useContext } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg'
import { FiUser, FiLogIn } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';


const Header = () => {
    const { signed, loadingAuth } = useContext(AuthContext)


    return ( 
        <div className='w-full flex items-center justify-center h-16 bg-white drop-shadow mb-4'>
            <header className='flex w-full max-w-7xl items-center justify-between px-4 mx-auto'>
                <Link to="/">
                    <img src={logo} alt="logo site"/>
                </Link>


                {!loadingAuth && signed && (
                    <Link to="/dashboard" >
                        <div className='border-2 rounded-full p-1 border-gray-900'> 
                            <FiUser size={22} color='#000'/>
                        </div>
                    </Link>
                )}

                {!loadingAuth && !signed && (
                    <Link to="/login">
                        <FiLogIn size={24} color='#000'/>
                    </Link>
                )}

            </header>

        </div>
     );
}
 
export default Header;