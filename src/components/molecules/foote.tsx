import { Facebook, Instagram, Linkedin, X, Youtube } from "lucide-react";
import Logo from "../atoms/logo";
import Container from "../atoms/container";
import { Typography } from "../atoms/typography";

/* Lucid Icons maybe it's not a good idea */
const socialMedias = [
  {
    name: "Facebook",
    icon: Facebook,
  },
  {
    name: "Instagram",
    icon: Instagram,
  },
  {
    name: "X",
    icon: X,
  },
  {
    name: "Linkedin",
    icon: Linkedin,
  },
  {
    name: "YouTube",
    icon: Youtube,
  },
];

const infos = [
  {
    name: "Política de Privacidade",
    href: "#",
  },
  {
    name: "Termos de Serviço",
    href: "#",
  },
  {
    name: "Configurações de Cookies",
    href: "#",
  },
];

const Footer = () => {
  return (
    <footer className="flex justify-center py-10 sm:py-20 px-6">
      <Container className="grid gap-10 ">
        <div className="flex flex-col justify-between sm:flex-row items-center gap-10 w-full ">
          <Logo />
          <ul className="flex gap-4">
            {socialMedias.map((socialMedia) => {
              const Icon = socialMedia.icon;
              return (
                <li key={socialMedia.name}>
                  <Icon size={30} />
                </li>
              );
            })}
          </ul>
        </div>
        <span className="w-[95%] h-[1px] mx-auto bg-black dark:bg-white" />
        <div className="flex justify-center items-center flex-col-reverse md:flex-row gap-6">
          <Typography variant="small" className="underline">
            ©{new Date().getFullYear()} Todos direitos reservados
          </Typography>
          <ul className="flex flex-col items-center md:flex-row gap-4">
            {infos.map((info) => (
              <li key={info.name}>
                <a href={info.href}>
                  <Typography
                    variant="small"
                    className="hover:underline hover:underline-offset-4"
                  >
                    {info.name}
                  </Typography>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
