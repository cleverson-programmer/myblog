import Image from "next/image"
import Code from "../../../../public/code.png"

export function ImageMain(){

    return(
        <div className="w-[80%] h-[600px] overflow-hidden rounded-lg">
            <Image
            src={Code}
            alt="DEVlearn logotipo do site"
            className="w-full h-full object-cover rounded-lg"
            />
        </div>
    )
}