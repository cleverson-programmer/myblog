import { Logotype } from "./logotype";
import { Menu } from "./menu";
import { Navbar } from "./navbar";

export function Header(){
    return(
        <header className="w-[100%]  flex justify-between items-center">
            <div>
                <Logotype/>
            </div>
            <div>
                <Navbar/>
            </div>
            <div>
                <Menu/>
            </div>
        </header>
    )
}