import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { ShoppingCart, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { CartContext } from "./CartContext";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Button from "./Button";
import { primary } from "@/lib/colors";

const Featured = ({ products, autoPlayInterval = 5000 }) => {
  const items = [
    products[products.length - 1], // Clone of last
    ...products,
    products[0], // Clone of first
  ];

  const { addProduct } = useContext(CartContext);

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false); // NEW: State for auto-loop control
  const timerRef = useRef(null);
  const { data: session } = useSession();
  const getActiveDot = () => {
    if (currentIndex === 0) return products.length - 1;
    if (currentIndex === items.length - 1) return 0;
    return currentIndex - 1;
  };

  const handleClick = (id, title) => {
    if (!session) {
      signIn();
      return;
    }
    addProduct(id, title);
  };
  // Logic to handle the infinite loop jump
  useEffect(() => {
    if (currentIndex === items.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 500);
    }

    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(items.length - 2);
      }, 500);
    }
  }, [currentIndex, items.length]);

  const next = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const prev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const jumpToDot = (index) => {
    setIsTransitioning(true);
    setCurrentIndex(index + 1);
  };

  // --- NEW: AUTO LOOP EFFECT ---
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        next();
      }, autoPlayInterval);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next, isPaused, autoPlayInterval]);

  const styles = {
    container: {
      position: "relative",
      width: "100%",
      maxWidth: "1200px",

      margin: "0 auto",
      backgroundColor: "#1e272e",
      overflow: "hidden",
      border: "1px solid rgba(59, 130, 246, 0.2)",
      fontFamily: "sans-serif",
    },
    track: {
      display: "flex",
      transform: `translateX(-${currentIndex * 100}%)`,
      transition: isTransitioning
        ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
        : "none",
    },
    slide: {
      minWidth: "100%",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      padding: "60px",
      boxSizing: "border-box",
    },
    imageSection: {
      flex: "1 1 400px",
      display: "flex",
      justifyContent: "center",
      position: "relative",
    },
    productImg: {
      width: "100%",
      maxWidth: "380px",
      borderRadius: "12px",
      zIndex: 2,
    },
    contentSection: { flex: "1 1 400px", color: "white", paddingLeft: "40px" },
    title: {
    fontSize: "clamp(1.5rem, 2vw, 3rem)", // min 1.5rem, preferred 2vw, max 3rem
    margin: "0 0 15px 0",
    fontWeight: 800,
  },
    price: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#3b82f6",
      marginBottom: "30px",
    },
    btnPrimary: {
      border:  "1px solid #3b82f6",
      backgroundColor: "transparent",
      color: "white",
      padding: "14px 28px",
      hover: {
        backgroundColor: `${primary}`,
      },
      fontSize: "14px",
      borderRadius: "10px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    navBtn: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgba(255,255,255,0.05)",
      border: "none",
      color: "white",
      padding: "15px",
      borderRadius: "50%",
      cursor: "pointer",
      zIndex: 10,
      backdropFilter: "blur(5px)",
    },
    pagination: {
      position: "absolute",
      bottom: "25px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: "12px",
      zIndex: 10,
    },
    dot: {
      height: "8px",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
  };

  return (
    <div
      style={styles.container}
      // NEW: Stop auto-loop when user mouse is over the slide
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button style={{ ...styles.navBtn, left: "20px" }} onClick={prev}>
        <ChevronLeft />
      </button>
      <button style={{ ...styles.navBtn, right: "20px" }} onClick={next}>
        <ChevronRight />
      </button>

      <div style={styles.track}>
        {items.map((product, index) => (
          <div key={`${product.id}-${index}`} style={styles.slide}>
            <div style={styles.imageSection}>
              <Image
                width={500}
                height={500}
                src={product.images[0]}
                alt={product.title}
                style={styles.productImg}
              />
            </div>
            <div style={styles.contentSection}>
              <span
                style={{
                  color: "#60a5fa",
                  fontSize: "12px",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                }}
              >
                GAMING PERFORMANCE
              </span>
              <h2 style={styles.title}>{product.title}</h2>
              <div style={styles.price}>${product.price}</div>
              <div style={{ display: "flex", gap: "10px" }}>
                <Button onClick={() => handleClick(product._id, product.title)}>
                  <p type="button">Add to cart</p>
                </Button>
                <Link
                  href={`/store/${product._id}`}
                  style={{ ...styles.btnPrimary}}
                >
                  <Eye size={18} /> Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.pagination}>
        {products.map((_, i) => {
          const isActive = i === getActiveDot();
          return (
            <div
              key={i}
              onClick={() => jumpToDot(i)}
              style={{
                ...styles.dot,
                width: isActive ? "30px" : "8px",
                backgroundColor: isActive ? "#3b82f6" : "#475569",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Featured;
