import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';

const Toast = () => {
  const { toastMessage } = useShop();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-ebony text-white px-5 py-3.5 rounded-full shadow-floating border border-rose-antique/30 glass-panel-dark max-w-md"
        >
          <div className="w-8 h-8 rounded-full bg-rose-antique/20 flex items-center justify-center text-blush flex-shrink-0">
            <FiCheckCircle className="text-lg" />
          </div>
          <p className="text-xs sm:text-sm font-sans font-medium tracking-wide text-champagne-light">
            {toastMessage}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
