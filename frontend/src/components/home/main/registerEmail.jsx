import { RiSendPlane2Line } from "react-icons/ri";
import { useSelector } from "react-redux";

export function BoxEmail (){
    const language = useSelector((state) => state.language.language);

    return(
        <div>
            <div className="w-[450px] border border-solid border-[#2E2D78] rounded-lg mt-10 p-2 py-4">
                <h2 className="font-medium text-xl">
                { language === "pt" ? 'Junte-se a nós!': 'Join us!'}
                </h2>
                <p className="font-normal mt-4">{ language === "pt" ? 'Envie seu email e receba novos conteúdos': 'Send your email and receive new content'}</p>

                <div className="flex items-center gap-4 mt-4">
                    <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder={ language === "pt" ? "Digite seu email" : "Enter your email"}
                    className="w-80 pl-2 text-black py-2 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <RiSendPlane2Line
                    className=" cursor-pointer"
                    fontSize={30}/>
                </div>
            </div>
        </div>
    )
}