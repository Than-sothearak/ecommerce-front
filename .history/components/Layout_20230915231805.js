import Center from "./Center";
import Footer from "./Footer";
import Header from "./Header";
import NextTopLoader from "nextjs-toploader";
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Center>
      <NextTopLoader 
      color="#2299DD"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={true}
      easing="ease"
      speed={200}
      shadow="0 0 10px #2299DD,0 0 5px #2299DD"
      />
      </Center>
      <main>{children}</main>
      <Footer />
    </>
  );
}
