import Header from "@/components/Header";
import SinglePage from "@/components/SinglePage";
import { useRouter } from "next/router";

export default function SingleProductPage() {
    const [productInfo, setProductInfo] = useState(null);
   const router = useRouter();
    const { id } = router.query;
  
    useEffect(() => {
      if (!id) {
        return;
      }
      axios.get("/api/product?id=" + id).then((res) => {
        setProductInfo(res.data);
      });
    }, [id]);
    return (
      
        <>
         <Header />
         {productInfo && <SinglePage {...productInfo}/>}
        </>     
    );
  }
  