import { useState, useEffect } from "react";
import Container from "../../components/container";
import { FaWhatsapp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getDoc, doc, } from "firebase/firestore";
import { db } from "../../services/firebase";
import { Swiper, SwiperSlide } from 'swiper/react'

interface CarsProps {
    id: string;
    name: string;
    year: string;
    uid: string;
    price: string | number;
    city: string;
    km: string;
    images: CarImagesProps[];
    description: string;
    model: string;
    owner: string;
    whatsaap: string;
    created: string;
}

interface CarImagesProps {
    name: string;
    uid: string;
    url: string;
}

const Detalhes = () => {

    const [car, setCar] = useState<CarsProps>()
    const { id } = useParams() 
    const [slider, setSlider] = useState<number>(2)

    useEffect(() => {
        async function load(){
            if(!id){
                return;
            }

            const docRef = doc(db, 'cars', id)
            getDoc(docRef)
            .then((snaps) => {
                setCar({
                    id: snaps.id,
                    name: snaps.data()?.name,
                    year: snaps.data()?.year,
                    city: snaps.data()?.city,
                    model: snaps.data()?.model,
                    uid: snaps.data()?.uid,
                    description: snaps.data()?.description,
                    created: snaps.data()?.created,
                    whatsaap: snaps.data()?.whatsaap,
                    price: snaps.data()?.price,
                    km: snaps.data()?.km,
                    owner: snaps.data()?.owner,
                    images: snaps.data()?.imagens
                })
            })
        }

        load()

    }, [id])


        useEffect(() => {

            const handleRisived = () => {
                if (window.innerWidth < 720) {
                    setSlider(1)
                } else {
                    setSlider(2)
                }
            }

            handleRisived()

            window.addEventListener('resize', handleRisived)
            
            return() => {
                window.removeEventListener('resize', handleRisived)
            }

        }, [])

    return ( 

        <Container>

            <Swiper 
                slidesPerView={slider}
                pagination={{ clickable: true }}
                navigation
            >
                {car?.images.map( cadaimage => (
                    <SwiperSlide key={cadaimage.name}>
                        <img src={cadaimage.url} alt="imagem de carro" className="w-full h-96 object-cover"/>
                    </SwiperSlide>
                ))}

            </Swiper>

            { car && (
                <div className="w-full bg-white rounded-lg p-6 my-4">
                    <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
                        <h1 className="font-bold text-3xl text-black">
                            {car?.name}
                        </h1>
                        <h1 className="font-bold text-3xl text-black">
                            {car?.price}
                        </h1>
                    </div>
                    <p className="">
                        {car?.model}
                    </p>

                    <div className="flex w-full gap-3 my-4">

                        <div className="flex flex-col gap-4">
                            <div>
                                <p>cidade</p>
                                <strong>
                                    {car?.city}
                                </strong>
                            </div>
                            <div>
                                <p>Ano</p>
                                <strong>
                                    {car?.year}
                                </strong>
                            </div>                                                
                        </div>

                        <div className="flex flex-col gap-4">
                            <div>
                                <p>KM</p>
                                <strong>
                                    {car?.km}
                                </strong>
                            </div>                                            
                        </div>

                    </div>

                    <strong>Descrição</strong>
                    <p className="mb-4">
                        {car?.description}
                    </p>

                    <strong>Telefone / Whatsaap</strong>
                    <p>
                        {car?.whatsaap}
                    </p>

                    <a href="#" className="bg-green-500 w-full text-white flex rounded-lg items-center justify-center gap-2 my-6 h-11 text-xl font-medium cursor-pointer">
                        Conversar com o vendedor 
                        <FaWhatsapp size={24} color="#fff"/>
                    </a>

                </div>
            )}
        </Container>

     );
}
 
export default Detalhes;