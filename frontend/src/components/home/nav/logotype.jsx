import Image from "next/image"
import logotype from '../../../../public/Tech100px.png'

export function Logotype() {

    return(
        <div>
            <Image 
                width={100}
                height={100}  
                src={logotype} 
                alt="DEVlearn logotipo do site"
                className="rounded-lg object-cover shadow-lg"
                />
        </div>
    )
}