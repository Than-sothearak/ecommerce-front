import Header from "@/components/Header";
import { useRouter } from "next/router";

export default function SongletProductPage() {
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
         {productInfo.map(p => (
          <div key={p._id}>

            <h1>p.title</h1>
          </div>
         ))}
        </>     
    );
  }
  