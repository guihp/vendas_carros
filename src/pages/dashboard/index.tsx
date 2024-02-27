import { useEffect, useState, useContext } from "react";
import Container from "../../components/container";
import HeaderDashboard from "../../components/painel";
import { FiTrash2 } from "react-icons/fi"

import { collection, query, getDocs, where, doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../../services/firebase";
import { Link } from "react-router-dom";
import { ref, deleteObject } from "firebase/storage";
import { AuthContext } from "../../context/AuthContext";

interface CarsProps {
    id: string;
    name: string;
    year: string;
    uid: string;
    price: string | number;
    city: string;
    km: string;
    images: CarImagesProps[];
}

interface CarImagesProps {
    name: string;
    uid: string;
    url: string;
}

const Dashboard = () => {
    const [loadImages, setLoadImages] = useState<String[]>([])
    const [ cars, setCars ] = useState<CarsProps[]>([])
    const { user } = useContext(AuthContext)

    useEffect(() => {

        function loadCars() {
            if(!user?.uid){
                return;
            }
            const carRef = collection(db, "cars");
            const queryRef = query(carRef, where('uid','==', user.uid))

            getDocs(queryRef).then((snaps) => {
                let listcars = [] as CarsProps[]

                snaps.forEach( doc => {
                    listcars.push({
                        id: doc.id,
                        name: doc.data().name,
                        year: doc.data().year,
                        km: doc.data().km,
                        price: doc.data().price,
                        city: doc.data().city,
                        images: doc.data().imagens,
                        uid: doc.data().uid,
                    })
                })

                setCars(listcars)

            })

        }

        loadCars()


    }, [user])

    const handleloading = (id: string) => {
        setLoadImages((allimages) => [...allimages, id])
    }

    const handleDelete =  async (car: CarsProps) => {

        const itemCar = car;

        const docRef = doc(db, "cars", itemCar.id)
        await deleteDoc(docRef)

        itemCar.images.map( async(image) => {
            const imagePath = `images/${image.uid}/${image.name}`
            const imageRef = ref(storage, imagePath)

           try {
            await deleteObject(imageRef)
            setCars(cars.filter(car => car.id !== itemCar.id))
           } catch (error) {
                console.log('ERRO AO EXCLUIR: ', error);
                
           }    
        })

        setCars(cars.filter(car => car.id !== itemCar.id))
    }

    return ( 

        <Container>
            <HeaderDashboard />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                {cars.map( car => (
                    <Link key={car.id} to={`/carro/${car.id}`}>
                        <section className="w-full bg-white rounded-lg relative">

                            <div className="w-full h-72 rounded-lg bg-slate-200"
                                style={{ display: loadImages.includes(car.id) ? 'none' : 'block' }}
                            >

                            </div>
                            <button className="absolute bg-white w-14 h-14 rounded-full cursor-pointer flex justify-center items-center right-2 top-2"
                            onClick={() => handleDelete(car)}>
                                <FiTrash2 size={24} color="#000"/>
                            </button>
                            <img 
                                className="w-full rounded-lg mb-2 max-h-70"
                                src={car.images[0].url} 
                                alt="Civic" 
                                onLoad={() => handleloading(car.id)}
                                style={{ display: loadImages.includes(car.id) ? 'block' : 'none' }}
                            />
                
                
                                <p className="font-bold mt-1 mb-2 px-2"> {car.name} </p>
                
                                <div className="flex flex-col px-2">
                
                                    <span className="font-medium mb-6 opacity-75"> Ano {car.year} | {car.km} </span>
                
                                    <strong className="text-black font-medium"> R$ {car.price} </strong>
                
                                </div>
                
                                <div className="w-full h-px bg-slate-200 my-2"></div>
                
                                <div className="px-2 pb-2">
                                    <span className="font-medium opacity-75">
                                        {car.city}
                                    </span>
                                </div>
                        </section>                        
                    </Link>
                ))

                }

            </div>
        </Container>

     );
}
 
export default Dashboard;