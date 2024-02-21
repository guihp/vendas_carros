import Container from "../../components/container";
import { IoSearch } from "react-icons/io5"

const Home = () => {
    return ( 
        <Container>
            <section className="bg-white p-4 rounded-full w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
                <input type="text" placeholder="Digiteo nome do carro " className="w-full border-2 rounded-full h-9 px-3 outline-none"/>
                <button aria-label="Buscar" className="bg-red-500 h-9 px-8 rounded-full text-white font-medium">
                    <IoSearch  size={24} color='#fff'/>
                </button>
            </section>

            <h1 className="font-bold text-center mt-6 text-2xl mb-4">
                Carros novos e usados em Balsas e Região 
            </h1>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                <section className="w-full bg-white rounded-lg">
                    <img 
                    className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                    src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202402/20240203/honda-civic-2.0-16v-flexone-exl-4p-cvt-wmimagem11122302566.jpg?s=fill&w=552&h=414&q=60" 
                    alt="Civic" />


                    <p className="font-bold mt-1 mb-2 px-2">HONDA CIVIC</p>

                    <div className="flex flex-col px-2">

                        <span className="font-medium mb-6 opacity-75">Ano 2016/2016 | 55.566 km</span>

                        <strong className="text-black font-medium">R$ 105.000</strong>

                    </div>

                    <div className="w-full h-px bg-slate-200 my-2"></div>

                    <div className="px-2 pb-2">
                        <span className="font-medium opacity-75">
                            São Raimundo Das Mangabeiras - MA
                        </span>
                    </div>
                </section>

                <section className="w-full bg-white rounded-lg">
                    <img 
                    className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                    src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202402/20240203/honda-civic-2.0-16v-flexone-exl-4p-cvt-wmimagem11122302566.jpg?s=fill&w=552&h=414&q=60" 
                    alt="Civic" />


                    <p className="font-bold mt-1 mb-2 px-2">HONDA CIVIC</p>

                    <div className="flex flex-col px-2">

                        <span className="font-medium mb-6 opacity-75">Ano 2016/2016 | 55.566 km</span>

                        <strong className="text-black font-medium">R$ 105.000</strong>

                    </div>

                    <div className="w-full h-px bg-slate-200 my-2"></div>

                    <div className="px-2 pb-2">
                        <span className="font-medium opacity-75">
                            São Raimundo Das Mangabeiras - MA
                        </span>
                    </div>
                </section>


                <section className="w-full bg-white rounded-lg">
                    <img 
                    className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                    src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202402/20240203/honda-civic-2.0-16v-flexone-exl-4p-cvt-wmimagem11122302566.jpg?s=fill&w=552&h=414&q=60" 
                    alt="Civic" />


                    <p className="font-bold mt-1 mb-2 px-2">HONDA CIVIC</p>

                    <div className="flex flex-col px-2">

                        <span className="font-medium mb-6 opacity-75">Ano 2016/2016 | 55.566 km</span>

                        <strong className="text-black font-medium">R$ 105.000</strong>

                    </div>

                    <div className="w-full h-px bg-slate-200 my-2"></div>

                    <div className="px-2 pb-2">
                        <span className="font-medium opacity-75">
                            São Raimundo Das Mangabeiras - MA
                        </span>
                    </div>
                </section>


                <section className="w-full bg-white rounded-lg">
                    <img 
                    className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                    src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202402/20240203/honda-civic-2.0-16v-flexone-exl-4p-cvt-wmimagem11122302566.jpg?s=fill&w=552&h=414&q=60" 
                    alt="Civic" />


                    <p className="font-bold mt-1 mb-2 px-2">HONDA CIVIC</p>

                    <div className="flex flex-col px-2">

                        <span className="font-medium mb-6 opacity-75">Ano 2016/2016 | 55.566 km</span>

                        <strong className="text-black font-medium">R$ 105.000</strong>

                    </div>

                    <div className="w-full h-px bg-slate-200 my-2"></div>

                    <div className="px-2 pb-2">
                        <span className="font-medium opacity-75">
                            São Raimundo Das Mangabeiras - MA
                        </span>
                    </div>
                </section>

            </div>

        </Container>
     );
}
 
export default Home;