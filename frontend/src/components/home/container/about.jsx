import Image from "next/image";
import Setup from '../../../../public/my-setup.jpeg'
import { useSelector } from "react-redux";

export default function About({ id }) {

    const language = useSelector((state) => state.language.language);

    return (
        <div id={id} className="grid grid-cols-2 gap-4">
            {/* Coluna do texto */}
            <div className="flex flex-col justify-center items-center">
                <div className="w-2/3 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        { language === "pt" ? 'Sobre mim' : 'About'}
                    </h2>
                    <p className="text-lg mb-4">
                        {
                            language === "pt" ? 'Olá, tudo bem? Meu nome é Cleverson, sou o fundador da DEVlearn. Tenho 22 anos, sou mineiro e estudante de tecnologia, atualmente cursando Engenharia de Software pela PUC-Minas. Meu primeiro contato com o universo da programação aconteceu em 2016, quando comecei a explorar o mundo da TI por pura curiosidade após comprar meu primeiro computador. Três anos depois, segui um caminho acadêmico diferente e optei por cursar Odontologia. No entanto, logo percebi que era a área da tecnologia que realmente me cativava. Decidi trancar o curso de Odontologia e focar nos estudos de TI, até que ingressei na faculdade de Engenharia de Software. Desde então, venho me especializando e compartilhando conhecimento aqui no blog. Afinal, existe maneira melhor de aprender do que ensinar?. O blog surgiu como uma iniciativa para enriquecer meu portfólio pessoal e, ao mesmo tempo, ajudar colegas e aspirantes da área de tecnologia. Aqui você encontrará dicas, ferramentas e guias práticos para tornar sua jornada de aprendizado mais simples e eficiente.' 
                            :
                            'Hello, how are you? My name is Cleverson, and I am the founder of DEVlearn. I am 22 years old, from Minas Gerais, and a technology student currently pursuing a degree in Software Engineering at PUC-Minas. My first contact with the programming world happened in 2016, when I started exploring the IT field out of pure curiosity after buying my first computer. Three years later, I took a different academic path and chose to study Dentistry. However, I soon realized that technology was my true passion. I decided to drop out of Dentistry and focus on IT studies until I eventually enrolled in the Software Engineering program. Since then, I have been specializing and sharing knowledge here on the blog. After all, is there a better way to learn than by teaching? The blog was created as an initiative to enrich my personal portfolio and, at the same time, help colleagues and aspiring professionals in the technology field. Here, you will find tips, tools, and practical guides to make your learning journey simpler and more efficient.'
                        }
                    </p>
                    <h3 className="text-xl font-semibold">
                        Cleverson Resende
                    </h3>
                </div>
            </div>

            {/* Coluna da imagem */}
            <div className="w-ful">
                <Image 
                    src={Setup} 
                    alt="setup" 
                    className="w-full h-auto"
                />
            </div>
        </div>
    );
}