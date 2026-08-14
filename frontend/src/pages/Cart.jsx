import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiShoppingBag, FiArrowRight, FiTruck, FiTag } from 'react-icons/fi';
import { BsShieldCheck } from 'react-icons/bs';
import { useShop } from '../context/ShopContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartSubtotal, freeShippingThreshold, showToast, setIsCheckoutOpen } = useShop();

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'BOUTIQUE10') {
      setAppliedDiscount(Math.round(cartSubtotal * 0.10));
      showToast('10% Discount Code applied!');
    } else {
      showToast('Invalid promo code. Use BOUTIQUE10');
    }
  };

  const finalShipping = cartSubtotal >= freeShippingThreshold || cart.length === 0 ? 0 : 199;
  const finalTotal = Math.max(0, cartSubtotal - appliedDiscount + finalShipping);

  return (
    <div className="pb-16 sm:pb-24 pt-4 sm:pt-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-10 text-center">
        <span className="text-xs font-sans font-bold text-rose-antique uppercase tracking-[0.3em]">
          Review & Checkout
        </span>
        <h1 className="font-serif text-2xl sm:text-5xl font-bold text-ebony mt-2">
          Your Shopping Bag
        </h1>
        <p className="text-xs font-sans text-ebony/60 mt-2">
          {cart.reduce((sum, item) => sum + item.quantity, 0)} item{cart.length === 1 ? '' : 's'} in your bag
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
            
            {/* Cart Items Column */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${index}`}
                  className="bg-white p-3 sm:p-6 rounded-2xl sm:rounded-3xl border border-bisque/60 shadow-sm flex flex-col sm:flex-row items-center gap-3 sm:gap-6"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 sm:w-24 sm:h-32 object-cover object-top rounded-xl sm:rounded-2xl flex-shrink-0"
                  />

                  <div className="flex-1 space-y-2 text-center sm:text-left w-full">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-rose-antique">
                      {item.product.category}
                    </span>
                    <h3 className="font-serif text-sm sm:text-lg font-bold text-ebony">
                      {item.product.name}
                    </h3>
                    <div className="text-xs font-sans text-ebony/60 space-x-3">
                      <span>Color: <strong>{item.selectedColor}</strong></span>
                      <span>|</span>
                      <span>Size: <strong>{item.selectedSize}</strong></span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity control */}
                      <div className="flex items-center border border-bisque rounded-full px-3 py-1 bg-offwhite">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                          className="text-xs font-bold px-2 hover:text-rose-antique"
                        >
                          -
                        </button>
                        <span className="text-xs font-sans font-bold px-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                          className="text-xs font-bold px-2 hover:text-rose-antique"
                        >
                          +
                        </button>
                      </div>

                      {/* Price & Remove */}
                      <div className="flex items-center gap-4">
                        <span className="font-serif text-lg font-bold text-ebony">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                          className="text-ebony/40 hover:text-rose-antique transition-colors p-2"
                        >
                          <FiTrash2 className="text-base" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-bisque/60 shadow-floating space-y-6">
                <h3 className="font-serif text-xl font-bold text-ebony border-b border-bisque pb-3 uppercase tracking-wider">
                  Order Summary
                </h3>

                {/* Promo form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <FiTag className="absolute left-3 top-3 text-ebony/40 text-xs" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo Code (BOUTIQUE10)"
                      className="w-full pl-8 pr-3 py-2.5 bg-offwhite border border-bisque rounded-full text-xs font-sans uppercase focus:outline-none focus:border-rose-antique"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-rose-antique hover:bg-rose-deep text-white text-xs font-sans font-bold uppercase tracking-wider rounded-full transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {/* Cost Breakdown */}
                <div className="space-y-3 text-xs font-sans text-ebony/80 pt-2 border-t border-bisque/30">
                  <div className="flex justify-between">
                    <span>Bag Subtotal</span>
                    <span className="font-bold">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-rose-antique font-bold">
                      <span>Promo Discount</span>
                      <span>-₹{appliedDiscount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping Charges</span>
                    <span>{finalShipping === 0 ? <span className="text-thyme font-bold">FREE</span> : `₹${finalShipping}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-ebony pt-3 border-t border-bisque">
                    <span>Total Amount</span>
                    <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-ebony hover:bg-rose-deep text-white font-sans text-xs font-bold uppercase tracking-widest py-4 rounded-full flex items-center justify-center gap-2 shadow-floating transition-all hover:scale-[1.02]"
                >
                  Proceed to Checkout <FiArrowRight />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] font-sans text-ebony/60 text-center">
                  <BsShieldCheck className="text-thyme text-base" />
                  <span>100% Encrypted Transactions & Authenticity Guaranteed</span>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-bisque/50 max-w-md mx-auto p-8 space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-champagne flex items-center justify-center text-rose-antique text-2xl mx-auto">
              <FiShoppingBag />
            </div>
            <h3 className="font-serif text-xl font-bold text-ebony">Your Bag is Empty</h3>
            <p className="text-xs font-sans text-ebony/60">
              Explore our handcrafted designer kurtis, sarees, and boutique outfits.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-ebony text-white font-sans text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-rose-deep transition-colors"
            >
              Start Shopping <FiArrowRight />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
