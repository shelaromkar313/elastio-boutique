import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2, FiShoppingBag, FiArrowRight, FiTruck, FiTag } from 'react-icons/fi';
import { BsShieldCheck } from 'react-icons/bs';
import { useShop } from '../context/ShopContext';

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    freeShippingThreshold,
    freeShippingProgress,
    showToast,
    setIsCheckoutOpen
  } = useShop();

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  if (!isCartOpen) return null;

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'BOUTIQUE10') {
      setAppliedDiscount(Math.round(cartSubtotal * 0.10));
      showToast('10% Promo Code "BOUTIQUE10" applied successfully!');
    } else {
      showToast('Invalid promo code. Try using BOUTIQUE10');
    }
  };

  const finalShipping = cartSubtotal >= freeShippingThreshold || cart.length === 0 ? 0 : 199;
  const finalTotal = Math.max(0, cartSubtotal - appliedDiscount + finalShipping);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-ebony/70 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-screen max-w-md bg-offwhite shadow-2xl flex flex-col justify-between"
          >
            
            {/* Header */}
            <div className="p-6 border-b border-bisque/60 bg-champagne-light/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiShoppingBag className="text-rose-antique text-xl" />
                <h2 className="font-serif text-xl font-bold text-ebony">Your Shopping Bag</h2>
                <span className="text-xs font-sans font-bold bg-ebony text-white px-2 py-0.5 rounded-full ml-1">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-ebony hover:text-rose-antique transition-colors rounded-full"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-bisque/20 px-6 py-3 border-b border-bisque/40 text-xs font-sans">
              <div className="flex items-center justify-between text-ebony font-medium mb-1.5">
                <span className="flex items-center gap-1.5">
                  <FiTruck className="text-thyme text-sm" />
                  {remainingForFreeShipping === 0
                    ? '🎉 You unlocked FREE Express Shipping!'
                    : `Add ₹${remainingForFreeShipping.toLocaleString('en-IN')} more for FREE Express Shipping`}
                </span>
                <span className="font-bold text-thyme">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-bisque/60 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-thyme h-full transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${index}`}
                    className="flex gap-4 p-3 bg-white rounded-2xl border border-bisque/50 shadow-sm relative group"
                  >
                    {/* Item Thumbnail */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover rounded-xl flex-shrink-0"
                    />

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm font-bold text-ebony truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                            className="text-ebony/40 hover:text-rose-antique transition-colors p-1"
                            title="Remove item"
                          >
                            <FiTrash2 className="text-sm" />
                          </button>
                        </div>
                        <div className="text-[11px] font-sans text-ebony/60 space-x-2 mt-0.5">
                          <span>Color: <strong>{item.selectedColor}</strong></span>
                          <span>|</span>
                          <span>Size: <strong>{item.selectedSize}</strong></span>
                        </div>
                      </div>

                      {/* Quantity & Unit Price */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-bisque rounded-full px-2 py-0.5 bg-offwhite">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedColor,
                                item.selectedSize,
                                item.quantity - 1
                              )
                            }
                            className="text-xs font-bold px-1.5 hover:text-rose-antique"
                          >
                            -
                          </button>
                          <span className="text-xs font-sans font-bold px-2">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedColor,
                                item.selectedSize,
                                item.quantity + 1
                              )
                            }
                            className="text-xs font-bold px-1.5 hover:text-rose-antique"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-serif text-sm font-bold text-ebony">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-champagne flex items-center justify-center text-rose-antique text-2xl mx-auto">
                    <FiShoppingBag />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-ebony">Your Bag is Empty</h3>
                  <p className="text-xs font-sans text-ebony/60 max-w-xs mx-auto">
                    Explore our handcrafted designer kurtis, sarees, and boutique co-ord sets to start styling.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="inline-block bg-ebony text-white font-sans text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-rose-deep transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-bisque/60 bg-white space-y-4 shadow-lg">
                
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <FiTag className="absolute left-3 top-3 text-ebony/40 text-xs" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo Code (BOUTIQUE10)"
                      className="w-full pl-8 pr-3 py-2 bg-offwhite border border-bisque rounded-full text-xs font-sans uppercase focus:outline-none focus:border-rose-antique"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-antique hover:bg-rose-deep text-white text-xs font-sans font-bold uppercase tracking-wider rounded-full transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {/* Calculation breakdown */}
                <div className="space-y-1.5 text-xs font-sans text-ebony/80 pt-2 border-t border-bisque/30">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-rose-antique font-bold">
                      <span>Discount (BOUTIQUE10)</span>
                      <span>-₹{appliedDiscount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span>{finalShipping === 0 ? <span className="text-thyme font-bold">FREE</span> : `₹${finalShipping}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-serif font-bold text-ebony pt-2 border-t border-bisque/50">
                    <span>Total Amount</span>
                    <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-ebony hover:bg-rose-deep text-white font-sans text-xs font-bold uppercase tracking-widest py-3.5 rounded-full flex items-center justify-center gap-2 shadow-floating transition-all hover:scale-[1.02]"
                >
                  Proceed to Secure Checkout <FiArrowRight />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] font-sans text-ebony/60">
                  <BsShieldCheck className="text-thyme text-sm" />
                  <span>100% Encrypted Payment & Authenticity Guaranteed</span>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default CartDrawer;
