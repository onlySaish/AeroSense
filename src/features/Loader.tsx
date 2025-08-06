import { motion } from "framer-motion";
import { selectStatus } from "./auth/authSlice";
import { useAppSelector } from "../hooks";

const Loader = () => {
    const status1 = useAppSelector(selectStatus);

    const status = status1;

    if (status != "loading") {
      return null;
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-transparent p-6 rounded-2xl shadow-xl flex flex-col items-center"
      >
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </motion.div>
    </div>
  );
};

export default Loader;
