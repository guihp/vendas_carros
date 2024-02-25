
import { ChangeEvent, useContext, useState } from "react";
import Container from "../../../components/container";
import Input from "../../../components/input";
import HeaderDashboard from "../../../components/painel";
import { FiUpload, FiTrash } from "react-icons/fi"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/AuthContext";
import { v4 as uuidV4 } from 'uuid'
import { storage, db } from "../../../services/firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { addDoc, collection } from "firebase/firestore";
const schema = z.object({
    name: z.string().min(1, 'O campo nome é obrigatório'),
    model: z.string().min(1, 'O Modelo do carroé obrigatório'),
    year: z.string().min(1, 'O Ano do carro é obrigatório'),
    km: z.string().min(1, 'O KM do carro é obrigatório'),
    price: z.string().min(1, 'O preço do carro é obrigatório'),
    city: z.string().min(1, 'A cidade é obrigatória'),
    whatsaap: z.string().min(1, 'O telefone é obrigatório').refine((value) => /^(\d{10,12})$/.test(value), {
        message: 'Numero de telefone invalido'
    }),
    description: z.string().min(1, 'A descrição é obrigatória')
})

type FormData =z.infer<typeof schema>

interface ImageItemProps {
    uid: string;
    name: string;
    previewUrl: string;
    url: string;
}

interface ImageItemProps {
    uid: string;
    name: string;
    previewUrl: string;
    url: string;
}

const NovoCarro = () => {
    const { user, } = useContext(AuthContext)
    const { user, } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange'
    })

    const [carImages, setCarImages] = useState<ImageItemProps[]>([])

    const [carImages, setCarImages] = useState<ImageItemProps[]>([])

    const onSubmit = (data :FormData) => { 
        if(carImages.length === 0) {
            alert("Envie alguma imagem do carro!")
        }

        const carListImages = carImages.map( car => {
            return{
                uid: car.uid,
                name: car.name,
                url: car.url
            }
        })

        addDoc(collection(db, "cars"), {
            name: data.name,
            model: data.model,
            whatsaap: data.whatsaap,
            city: data.city,
            year: data.year,
            km: data.km,
            price: data.price,
            description: data.description,
            created: new Date(),
            owner: user?.name,
            uid: user?.uid,
            imagens: carListImages
        })
        .then(() => {
            reset()
            setCarImages([])
            console.log('Cadastrado com sucesso');
        })
        .catch( (err) => {
            console.log('ERRO AO CADASTRAR NO BANCO:  ' + err)
        } )

    }

    const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files[0]) {
            const image = event.target.files[0]
            if(image.type === 'image/jpeg' || image.type === 'image/png') {
                await handleUpload(image)
            }else {
                alert('envie uma imagem no formato png ou jpeg ')
                return;
            }
            
        }
    }

    async function handleUpload(image: File) {
        if(!user?.uid) {
            return;
        }

        const currentUid = user?.uid;
        const uidImage = uuidV4();

        const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`)
        
        uploadBytes(uploadRef, image)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downdloadUrl) => {
                const imageItem = {
                    name: uidImage,
                    uid: currentUid,
                    previewUrl: URL.createObjectURL(image),
                    url: downdloadUrl
                }

                setCarImages((todasImagens) => [...todasImagens, imageItem])
            })
        })
    }

   async function handleDeleteImage (item: ImageItemProps) {
        const imagePath = `images/${item.uid}/${item.name}`

        const imageRef = ref(storage, imagePath)

        try {
            await deleteObject(imageRef)
            setCarImages(carImages.filter((car) => car.url !== item.url))
        } catch (error) {
            console.log('Error ao Deletar')
        }
    }

    return ( 
        <Container>
            <HeaderDashboard />

            <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
                <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
                    <div className="absolute cursor-pointer">
                        <FiUpload size={30} color="black" />
                    </div>
                    <div className="cursor-pointer">
                        <input type="file" accept="image/*" className="opacity-0 cursor-pointer" onChange={handleFile}/>
                        <input type="file" accept="image/*" className="opacity-0 cursor-pointer" onChange={handleFile}/>
                    </div>
                </button>

                {carImages.map( item => (
                    <div key={item.name} className="w-full h-32 flex items-center justify-center relative">
                        <button className="absolute" onClick={() => handleDeleteImage(item)}>
                            <FiTrash size={28} color="red" /> 
                        </button>
                        <img src={item.previewUrl} alt="foto de um carro" className="rounded-lg w-full h-32 object-cover" />
                    </div>
                ))}

                {carImages.map( item => (
                    <div key={item.name} className="w-full h-32 flex items-center justify-center relative">
                        <button className="absolute" onClick={() => handleDeleteImage(item)}>
                            <FiTrash size={28} color="red" /> 
                        </button>
                        <img src={item.previewUrl} alt="foto de um carro" className="rounded-lg w-full h-32 object-cover" />
                    </div>
                ))}
            </div>

            <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
                <form action="" className="w-full" onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-3">
                        <p className="mb-2 font-medium">Nome do carro</p>
                        <Input 
                            type="text" 
                            placeholder="Ex: Gol 1.6..." 
                            name="name" 
                            error={errors.name?.message} 
                            register={register} 
                        />
                    </div>

                    <div className="mb-3">
                        <p className="mb-2 font-medium">Modelo do carro</p>
                        <Input 
                            type="text" 
                            placeholder="Ex: 1.6 Manual, Gasolina..." 
                            name="model" 
                            error={errors.model?.message} 
                            register={register} 
                        />
                    </div>
                    
                    <div className="flex w-full mb-3 flex-row items-center gap-4">

                        <div className="w-full">
                            <p className="mb-2 font-medium">Ano do carro</p>
                            <Input 
                                type="text" 
                                placeholder="Ex: 2012/2013" 
                                name="year" 
                                error={errors.year?.message} 
                                register={register} 
                            />
                        </div>

                        <div className="w-full">
                            <p className="mb-2 font-medium">KM rodados</p>
                            <Input 
                                type="text" 
                                placeholder="Ex: 250.580 km" 
                                name="km" 
                                error={errors.km?.message} 
                                register={register} 
                            />
                        </div>

                    </div>    
                    
                    <div className="flex w-full mb-3 flex-row items-center gap-4">

                        <div className="w-full">
                            <p className="mb-2 font-medium">Whatsaap/Telefone</p>
                            <Input 
                                type="text" 
                                placeholder="Ex: (99) 9 9999-9999" 
                                name="whatsaap" 
                                error={errors.whatsaap?.message} 
                                register={register} 
                            />
                        </div>

                        <div className="w-full">
                            <p className="mb-2 font-medium">Cidade</p>
                            <Input 
                                type="text" 
                                placeholder="Ex: Balsas - MA" 
                                name="city" 
                                error={errors.city?.message} 
                                register={register} 
                            />
                        </div>

                    </div>    

                    <div className="mb-3">
                        <p className="mb-2 font-medium">Preço</p>
                        <Input 
                            type="text" 
                            placeholder="Ex: 27.000" 
                            name="price" 
                            error={errors.price?.message} 
                            register={register} 
                        />
                    </div>

                    <div className="mb-3">
                        <p className="mb-2 font-medium">Descrição</p>
                        <textarea className="border-2 w-full rounded-lg h-24 px-2"
                            {...register('description')}
                            name="description"
                            id="description"
                            placeholder="Digite a descrição completa sobre o carro!"
                        />
                        {errors.description && <p className="mb-1 text-red-500">{errors.description?.message}</p> }
                    </div>

                    <button type="submit" className="w-full h-10 rounded-md bg-red-500 text-white font-medium">
                        Cadastrar Carro
                    </button>

                </form>
            </div>
        </Container>
     );
}
 
export default NovoCarro;