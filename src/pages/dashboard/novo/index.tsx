import Container from "../../../components/container";
import HeaderDashboard from "../../../components/painel";
import { FiUpload } from "react-icons/fi"
const NovoCarro = () => {
    return ( 
        <Container>
            <HeaderDashboard />

            <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
                <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
                    <div className="absolute cursor-pointer">
                        <FiUpload size={30} color="black" />
                    </div>
                    <div className="cursor-pointer">
                        <input type="file" accept="image/*" className="opacity-0 cursor-pointer"/>
                    </div>
                </button>
            </div>

            <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">

            </div>
        </Container>
     );
}
 
export default NovoCarro;