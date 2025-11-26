"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function InnerPage() {
  return (
    <div className="relative flex h-screen items-center justify-center bg-[#23062E] text-white overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ y: 0, scale: 1 }}
        animate={{ y: -230, scale: 0.1 }} 
        transition={{
          duration: 1.8,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/logo1.svg"
          alt="Logo"
          width={800}
          height={800}
          className="drop-shadow-lg"
          priority
        />
      </motion.div>

    </div>
  );
}
