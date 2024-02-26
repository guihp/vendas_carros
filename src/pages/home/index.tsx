import { useEffect, useState } from "react";
import Container from "../../components/container";
import { IoSearch } from "react-icons/io5"
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../services/firebase";
import { Link } from "react-router-dom";

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

const Home = () => {

    const [ cars, setCars ] = useState<CarsProps[]>([])


    useEffect(() => {

        function loadCars() {
            const carRef = collection(db, "cars");
            const queryRef = query(carRef, orderBy('created', 'desc'))

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


    }, [])

    return ( 
        <Container>
            <section className="bg-white p-4 rounded-full w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
                <input type="text" placeholder="Digite o nome do carro " className="w-full border-2 rounded-full h-9 px-3 outline-none"/>
                <button aria-label="Buscar" className="bg-red-500 h-9 px-8 rounded-full text-white font-medium">
                    <IoSearch  size={24} color='#fff'/>
                </button>
            </section>

            <h1 className="font-bold text-center mt-6 text-2xl mb-4">
                Carros novos e usados em Balsas e Região 
            </h1>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                {cars.map( car => (
                    <Link key={car.id} to={`/carro/${car.id}`}>
                        <section className="w-full bg-white rounded-lg">
                            <img 
                                className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                                src={car.images[0].url} 
                                alt="Civic" />
                
                
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
 
export default Home;