import { motion } from "framer-motion";

export function FadeInSlideUpWrapper({
  children,
  viewPosition,
  duration,
  delay,
  width,
  height,
}: {
  children: React.ReactNode;
  viewPosition?: string;
  duration?: number;
  delay?: number;
  width?: string;
  height?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      style={{
        maxWidth: "100%",
        width: width ?? "auto",
        height: height ?? "auto",
        alignContent: "center",
      }}
      transition={{
        duration: duration ?? 0.25,
        delay: delay ?? 0,
      }}
      viewport={{ once: true, margin: viewPosition ?? "0px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
