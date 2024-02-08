import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import "./Count.css";

export default function Count({target}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, target, {
      duration: 2,
    });

    return () => {
      animation.stop();
    };
  }, [count]);

  return (
    <motion.h1>
          {rounded}
    </motion.h1>
  );
}
