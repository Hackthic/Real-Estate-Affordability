import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LazyBackground = ({ children }: { children: React.ReactNode }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/imagec.webp"; // Use optimized webp if available
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div
      className="relative w-full h-full overflow-hidden z-0"
      style={{
        backgroundImage: "url('/imagec.webp')",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Solid color overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: imageLoaded ? 0 : 1 }}
        transition={{ ease: "easeInOut" }}
        className="absolute inset-0 bg-[#08C2FF] z-10"
      />

      {/* Your content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
};

export default LazyBackground;
