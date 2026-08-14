import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheckCircle } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';

const SizeGuideModal = () => {
  const { sizeGuideOpen, setSizeGuideOpen } = useShop();

  if (!sizeGuideOpen) return null;

  const sizeChart = [
    { size: 'XS', chest: '32"', waist: '26"', hip: '36"', shoulder: '14"' },
    { size: 'S', chest: '34"', waist: '28"', hip: '38"', shoulder: '14.5"' },
    { size: 'M', chest: '36"', waist: '30"', hip: '40"', shoulder: '15"' },
    { size: 'L', chest: '38"', waist: '32"', hip: '42"', shoulder: '15.5"' },
    { size: 'XL', chest: '40"', waist: '34"', hip: '44"', shoulder: '16"' },
    { size: 'XXL', chest: '42"', waist: '36"', hip: '46"', shoulder: '16.5"' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSizeGuideOpen(false)}
          className="fixed inset-0 bg-ebony/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-offwhite rounded-3xl shadow-floating border border-bisque/80 p-6 sm:p-8 z-10 my-auto"
        >
          <button
            onClick={() => setSizeGuideOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full text-ebony hover:text-rose-antique transition-colors"
          >
            <FiX className="text-xl" />
          </button>

          <div className="mb-6 border-b border-bisque/50 pb-4">
            <span className="text-xs font-sans font-bold text-rose-antique uppercase tracking-widest">
              Estilo Boutique Fit Guide
            </span>
            <h2 className="font-serif text-2xl font-bold text-ebony mt-1">
              Women's Ethnic Size Chart
            </h2>
            <p className="text-xs text-ebony/70 font-sans mt-1">
              All measurements are in inches. Standard boutique body measurements for Kurtis, Anarkalis & Blouses.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left font-sans text-xs">
              <thead>
                <tr className="bg-champagne-light text-ebony border-b border-bisque">
                  <th className="py-3 px-4 font-bold uppercase tracking-wider">Size</th>
                  <th className="py-3 px-4 font-bold uppercase tracking-wider">Bust / Chest</th>
                  <th className="py-3 px-4 font-bold uppercase tracking-wider">Waist</th>
                  <th className="py-3 px-4 font-bold uppercase tracking-wider">Hip</th>
                  <th className="py-3 px-4 font-bold uppercase tracking-wider">Shoulder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bisque/30">
                {sizeChart.map((row) => (
                  <tr key={row.size} className="hover:bg-white/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-rose-antique">{row.size}</td>
                    <td className="py-3 px-4 text-ebony/80">{row.chest}</td>
                    <td className="py-3 px-4 text-ebony/80">{row.waist}</td>
                    <td className="py-3 px-4 text-ebony/80">{row.hip}</td>
                    <td className="py-3 px-4 text-ebony/80">{row.shoulder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Measuring Tips */}
          <div className="bg-champagne-light/50 p-4 rounded-2xl border border-bisque/50 space-y-2 text-xs font-sans text-ebony/80">
            <div className="flex items-center gap-2 font-bold text-ebony">
              <FiCheckCircle className="text-thyme" /> Measuring Advice:
            </div>
            <p className="leading-relaxed">
              <strong>Bust:</strong> Measure around the fullest part of your chest. <br />
              <strong>Waist:</strong> Measure around your natural waistline (narrowest part). <br />
              <strong>Note:</strong> If you are between sizes, we recommend selecting the larger size for a comfortable custom boutique fit. Free alterations are available at our physical store!
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SizeGuideModal;
