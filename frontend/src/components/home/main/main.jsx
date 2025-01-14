
import { ImageMain } from "./sideImage";
import { Slogan } from "./slogan";

export function Main(){
    return(
        <div className="grid grid-cols-2 w-full">
            <div className="flex items-center justify-center ">
                <Slogan />
            </div>
            <div className="flex items-center justify-center ">
                <ImageMain />
            </div>
        </div>
    )
}