import Image from "next/image";
import Logo from '../../../public/Tech100px.png'
import CategoriesList from "./categoriesList";
import TagsList from "./tagsList";

export default function Footer(){

    return(
        <div className="w-full flex flex-col mt-10">
            <div className="flex justify-around mb-10">
                <CategoriesList/>
                <TagsList/>
            </div>
            <div className="flex flex-col items-center">
                <Image
                alt="Logo"
                className="rounded-md mb-2"
                src={Logo}
                width={100}
                height={100}
                />
                <p>2025, DEVlearn. Todos os direitos reservados.</p>
            </div>
        </div>
    )
}