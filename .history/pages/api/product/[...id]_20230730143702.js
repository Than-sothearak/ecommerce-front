import Header from "@/components/Header";
import SinglePage from "@/components/SinglePage";
import { useRouter } from "next/router";

export default function SongletProductPage() {
    const [productInfo, setProductInfo] = useState(null);
   const router = useRouter();
    const { id } = router.query;
  
    useEffect(() => {
      if (!id) {
        return;
      }
      axios.get("/api/products?id=" + id).then((res) => {
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
  