import { FaLinkedin, FaWhatsapp, FaGithub } from "react-icons/fa";
import Instagram from '../../../../public/instagram.png'
import Gmail from '../../../../public/gmail.png'
import Image from "next/image";

export default function Contact({ id }) {
    return (
        <div id={id} className="w-full mt-10">
            <div className="flex justify-around">
                <a 
                    className="cursor-pointer"
                    href="https://www.linkedin.com/in/cleverson-resende/"
                    target="_blank">
                    <FaLinkedin 
                        fontSize={40}
                        color="rgba(10, 102, 194, 1)"
                    />
                </a>
                <a 
                    href="https://wa.me/5533999373400"
                    target="_blank">
                    <FaWhatsapp 
                        fontSize={40}
                        color="rgba(37, 211, 102, 1)"
                    />
                </a>
                <a 
                    href="https://github.com/cleverson-programmer"
                    target="_blank">
                    <FaGithub
                        fontSize={40}
                        color="rgba(0, 0, 0, 1)"
                    />
                </a>
                <a 
                    href="https://www.instagram.com/cleverson_priv/"
                    target="_blank">
                    <Image 
                        src={Instagram} 
                        alt="instagram" 
                        width={40}
                    />
                </a>
                <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=cleverson.github@gmail.com&su=Contato%20via%20Site&body=Olá,%20gostaria%20de%20entrar%20em%20contato."
                    target="_blank">
                    <Image 
                        src={Gmail} 
                        alt="gmail" 
                        width={40}
                    />
                </a>
            </div>
        </div>
    );
}