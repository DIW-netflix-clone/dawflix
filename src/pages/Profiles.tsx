import Logo from "@/components/Logo";
import PerfilGrid from "@/components/profiles/perfilGrid";
import Carousel from "@/components/carrousel/carousel";
import UserGrid from "@/components/profiles/pruebaGrid";

const Home = () => {
  const imagesList = [
    { src: 'https://placehold.co/64', title: 'Título 1' },
    { src: 'https://placehold.co/64', title: 'Título 2' },
    { src: 'https://placehold.co/64', title: 'Título 3' },
    { src: 'https://placehold.co/64', title: 'Título 4' },
    { src: 'https://placehold.co/64', title: 'Título 5' },
    { src: 'https://placehold.co/64', title: 'Título 6' },
  ];
  return (
    <>
      <Logo />
      <UserGrid/>
      {/* <PerfilGrid/> */}
      {/* <Carousel images={imagesList}/> */}
    </>
  );
};

export default Home;
