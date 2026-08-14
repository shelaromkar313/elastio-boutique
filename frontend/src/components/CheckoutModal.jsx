import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, 
  FiLock, 
  FiCreditCard, 
  FiSmartphone, 
  FiHome, 
  FiCheckCircle, 
  FiShield, 
  FiTruck, 
  FiArrowRight, 
  FiCheck,
  FiZap,
  FiPrinter,
  FiClock
} from 'react-icons/fi';
import { BsQrCodeScan, BsShieldCheck } from 'react-icons/bs';
import { useShop } from '../context/ShopContext';

const CheckoutModal = () => {
  const {
    cart,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartSubtotal,
    freeShippingThreshold
  } = useShop();

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'cod' | 'emi'
  const [step, setStep] = useState('checkout'); // 'checkout' | 'processing' | 'success'
  
  // Shipping Form State
  const [shippingInfo, setShippingInfo] = useState({
    fullName: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    phone: '+91 98765 43210',
    address: 'Flat 402, Highline Luxury Towers, Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500033'
  });

  // Card Form State
  const [cardData, setCardData] = useState({
    number: '4532 8912 3456 7890',
    holder: 'ANANYA SHARMA',
    expiry: '08/29',
    cvv: '888'
  });
  const [isCvvFocused, setIsCvvFocused] = useState(false);

  // UPI State
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');
  const [upiId, setUpiId] = useState('ananya@okicici');
  const [timerSeconds, setTimerSeconds] = useState(120);

  // Netbanking State
  const [selectedBank, setSelectedBank] = useState('hdfc');

  // COD State
  const [otpCode, setOtpCode] = useState(['4', '8', '2', '9']);

  // Completed Order Details state (persisted when cart is cleared)
  const [completedOrderDetails, setCompletedOrderDetails] = useState(null);

  // Final Calculations
  const finalShipping = cartSubtotal >= freeShippingThreshold || cart.length === 0 ? 0 : 199;
  const finalTotal = cartSubtotal + finalShipping;

  // Reset state on modal open
  useEffect(() => {
    if (isCheckoutOpen && step === 'checkout') {
      // Keep checkout step initial
    }
  }, [isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  // Handle Order Submission & Fake Payment Gateway Processing
  const handleProcessPayment = (e) => {
    e?.preventDefault();

    // Freeze completed order details before cart is cleared
    const orderSummary = {
      total: finalTotal,
      items: [...cart],
      orderId: 'EST-2026-' + Math.floor(10000 + Math.random() * 90000)
    };
    setCompletedOrderDetails(orderSummary);

    setStep('processing');

    // Simulate Fake Payment Gateway Processing Delay (2.8 seconds)
    setTimeout(() => {
      setStep('success');
      clearCart();
    }, 2800);
  };

  // Helper for Card Brand Detection
  const getCardBrand = (num) => {
    const clean = num.replace(/\s+/g, '');
    if (clean.startsWith('4')) return 'VISA';
    if (clean.startsWith('5')) return 'MASTERCARD';
    if (clean.startsWith('3')) return 'AMEX';
    return 'RU PAY';
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center p-3 sm:p-6">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => step !== 'processing' && setIsCheckoutOpen(false)}
          className="fixed inset-0 bg-ebony/80 backdrop-blur-md"
        />

        {/* Main Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-offwhite shadow-2xl rounded-3xl border border-bisque/80 overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]"
        >
          
          {/* Top Bar Header */}
          <div className="bg-ebony text-white px-6 py-4 flex items-center justify-between border-b border-white/10 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blush/20 text-blush flex items-center justify-center text-sm font-bold border border-blush/40">
                <FiLock />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold tracking-wide">Estilo Wear Express Checkout</h3>
                <span className="text-[10px] font-sans text-champagne/70 uppercase tracking-widest flex items-center gap-1">
                  <FiShield className="text-thyme-light text-xs" /> 256-Bit SSL Encrypted Test Mode
                </span>
              </div>
            </div>

            {step !== 'processing' && (
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
              >
                <FiX className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* ────────────────── STEP 1: CHECKOUT & PAYMENT SELECTION ────────────────── */}
          {step === 'checkout' && (
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Delivery & Payment Methods (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Demo Notification Banner */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-center gap-3 text-amber-900 text-xs font-sans">
                  <FiZap className="text-amber-600 text-lg flex-shrink-0 animate-bounce" />
                  <div>
                    <strong className="font-bold">Test Payment Gateway:</strong> No real money will be charged. Choose any payment method below to test instant order completion!
                  </div>
                </div>

                {/* 1. Shipping Address Summary */}
                <div className="bg-white p-5 rounded-2xl border border-bisque/60 shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-bisque/30 pb-2">
                    <h4 className="font-serif text-sm font-bold text-ebony flex items-center gap-2">
                      <FiHome className="text-rose-antique" /> Delivery Address
                    </h4>
                    <span className="text-[10px] font-sans text-thyme font-bold uppercase bg-thyme-light/20 px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-sans text-ebony/80">
                    <div>
                      <span className="text-[10px] text-ebony/50 block">Name & Contact</span>
                      <strong className="text-ebony block">{shippingInfo.fullName}</strong>
                      <span>{shippingInfo.phone}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-ebony/50 block">Shipping Location</span>
                      <p className="line-clamp-2">{shippingInfo.address}, {shippingInfo.city} - {shippingInfo.pincode}</p>
                    </div>
                  </div>
                </div>

                {/* 2. Payment Method Selector */}
                <div className="bg-white p-5 rounded-2xl border border-bisque/60 shadow-sm space-y-4">
                  <h4 className="font-serif text-base font-bold text-ebony flex items-center gap-2 border-b border-bisque/40 pb-2">
                    <FiCreditCard className="text-rose-antique" /> Select Payment Method
                  </h4>

                  {/* Payment Tabs Navigation */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    <button
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-2.5 rounded-xl border text-center font-sans text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                        paymentMethod === 'upi'
                          ? 'border-ebony bg-ebony text-white shadow-md'
                          : 'border-bisque/60 bg-offwhite text-ebony/70 hover:border-ebony/40'
                      }`}
                    >
                      <BsQrCodeScan className="text-lg" />
                      <span>UPI / QR</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border text-center font-sans text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                        paymentMethod === 'card'
                          ? 'border-ebony bg-ebony text-white shadow-md'
                          : 'border-bisque/60 bg-offwhite text-ebony/70 hover:border-ebony/40'
                      }`}
                    >
                      <FiCreditCard className="text-lg" />
                      <span>Cards</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`p-2.5 rounded-xl border text-center font-sans text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                        paymentMethod === 'netbanking'
                          ? 'border-ebony bg-ebony text-white shadow-md'
                          : 'border-bisque/60 bg-offwhite text-ebony/70 hover:border-ebony/40'
                      }`}
                    >
                      <FiSmartphone className="text-lg" />
                      <span>NetBanking</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2.5 rounded-xl border text-center font-sans text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                        paymentMethod === 'cod'
                          ? 'border-ebony bg-ebony text-white shadow-md'
                          : 'border-bisque/60 bg-offwhite text-ebony/70 hover:border-ebony/40'
                      }`}
                    >
                      <FiTruck className="text-lg" />
                      <span>Cash / COD</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('emi')}
                      className={`p-2.5 rounded-xl border text-center font-sans text-xs font-bold transition-all flex flex-col items-center gap-1 col-span-2 sm:col-span-1 ${
                        paymentMethod === 'emi'
                          ? 'border-ebony bg-ebony text-white shadow-md'
                          : 'border-bisque/60 bg-offwhite text-ebony/70 hover:border-ebony/40'
                      }`}
                    >
                      <FiClock className="text-lg" />
                      <span>EMI / PayLater</span>
                    </button>
                  </div>

                  {/* ──────────────── Ticker Content per Payment Method ──────────────── */}
                  
                  {/* TAB 1: UPI & QR CODE */}
                  {paymentMethod === 'upi' && (
                    <div className="space-y-4 pt-2">
                      <div className="p-4 rounded-2xl bg-offwhite border border-bisque/50 flex flex-col sm:flex-row items-center gap-4">
                        
                        {/* Dynamic Fake QR Code */}
                        <div className="bg-white p-3 rounded-2xl border border-ebony/10 shadow-md flex flex-col items-center shrink-0">
                          <svg width="110" height="110" viewBox="0 0 100 100" fill="none">
                            <rect width="100" height="100" fill="white" />
                            {/* QR Outer Frames */}
                            <rect x="5" y="5" width="30" height="30" fill="#1A1818" />
                            <rect x="9" y="9" width="22" height="22" fill="white" />
                            <rect x="13" y="13" width="14" height="14" fill="#1A1818" />
                            
                            <rect x="65" y="5" width="30" height="30" fill="#1A1818" />
                            <rect x="69" y="9" width="22" height="22" fill="white" />
                            <rect x="73" y="13" width="14" height="14" fill="#1A1818" />

                            <rect x="5" y="65" width="30" height="30" fill="#1A1818" />
                            <rect x="9" y="69" width="22" height="22" fill="white" />
                            <rect x="13" y="73" width="14" height="14" fill="#1A1818" />

                            {/* QR Data Pattern Grid */}
                            <rect x="42" y="10" width="8" height="8" fill="#C87D87" />
                            <rect x="52" y="18" width="6" height="6" fill="#1A1818" />
                            <rect x="40" y="30" width="12" height="12" fill="#1A1818" />
                            <rect x="10" y="42" width="16" height="8" fill="#1A1818" />
                            <rect x="60" y="42" width="24" height="6" fill="#C87D87" />
                            <rect x="45" y="60" width="10" height="10" fill="#1A1818" />
                            <rect x="65" y="65" width="12" height="12" fill="#1A1818" />
                            <rect x="80" y="80" width="12" height="12" fill="#C87D87" />
                            <rect x="55" y="80" width="8" height="12" fill="#1A1818" />
                          </svg>
                          <span className="text-[9px] font-sans font-bold text-rose-antique uppercase tracking-widest mt-1">
                            Scan with Any UPI App
                          </span>
                        </div>

                        <div className="space-y-3 flex-1 text-center sm:text-left">
                          <div>
                            <span className="text-[10px] font-sans font-bold uppercase text-ebony/50 tracking-wider">Instant UPI Payment</span>
                            <h5 className="font-serif text-sm font-bold text-ebony">Pay using GPay, PhonePe, Paytm, or BHIM</h5>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[11px] font-sans text-ebony/70 block">Enter your VPA / UPI ID:</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                className="flex-1 px-3 py-2 bg-white border border-bisque rounded-xl text-xs font-sans focus:outline-none focus:border-rose-antique"
                                placeholder="name@upi"
                              />
                              <span className="bg-thyme-light/20 text-thyme text-[10px] font-bold px-2.5 py-2 rounded-xl flex items-center gap-1">
                                <FiCheck /> Verified
                              </span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* TAB 2: CREDIT / DEBIT CARD */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 pt-2">
                      
                      {/* Interactive 3D Card Graphic */}
                      <div className="relative w-full h-44 rounded-2xl p-5 text-white shadow-xl bg-gradient-to-br from-ebony via-neutral-900 to-rose-deep overflow-hidden flex flex-col justify-between transition-transform duration-500">
                        <div className="flex items-center justify-between">
                          <span className="font-brand-title text-xs tracking-[0.25em] font-bold text-champagne">
                            ESTILO BOUTIQUE CARD
                          </span>
                          <span className="font-sans text-xs font-extrabold tracking-widest bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">
                            {getCardBrand(cardData.number)}
                          </span>
                        </div>

                        {!isCvvFocused ? (
                          <>
                            <div className="space-y-1">
                              <span className="text-[9px] font-sans text-white/50 uppercase tracking-widest block">Card Number</span>
                              <p className="font-mono text-lg tracking-[0.2em] font-bold text-white drop-shadow">
                                {cardData.number || '•••• •••• •••• ••••'}
                              </p>
                            </div>

                            <div className="flex items-center justify-between text-xs font-sans uppercase">
                              <div>
                                <span className="text-[8px] text-white/50 block">Card Holder</span>
                                <span className="font-bold tracking-wider">{cardData.holder || 'YOUR NAME'}</span>
                              </div>
                              <div>
                                <span className="text-[8px] text-white/50 block">Expires</span>
                                <span className="font-bold tracking-wider">{cardData.expiry || 'MM/YY'}</span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="my-auto space-y-2 bg-black/40 p-3 rounded-xl backdrop-blur-sm">
                            <div className="w-full h-8 bg-black/80 rounded" />
                            <div className="flex items-center justify-end gap-2">
                              <span className="text-[10px] text-white/70">CVV:</span>
                              <span className="font-mono text-sm font-bold bg-white text-ebony px-2 py-0.5 rounded">
                                {cardData.cvv || '•••'}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Card Form Inputs */}
                      <div className="grid grid-cols-2 gap-3 text-xs font-sans">
                        <div className="col-span-2">
                          <label className="text-[11px] text-ebony/70 block mb-1 font-medium">Card Number</label>
                          <input
                            type="text"
                            maxLength="19"
                            value={cardData.number}
                            onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                            className="w-full px-3 py-2 bg-offwhite border border-bisque rounded-xl focus:outline-none focus:border-rose-antique font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-ebony/70 block mb-1 font-medium">Expiry Date</label>
                          <input
                            type="text"
                            maxLength="5"
                            value={cardData.expiry}
                            onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                            className="w-full px-3 py-2 bg-offwhite border border-bisque rounded-xl focus:outline-none focus:border-rose-antique font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-ebony/70 block mb-1 font-medium">CVV Code</label>
                          <input
                            type="password"
                            maxLength="4"
                            value={cardData.cvv}
                            onFocus={() => setIsCvvFocused(true)}
                            onBlur={() => setIsCvvFocused(false)}
                            onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                            className="w-full px-3 py-2 bg-offwhite border border-bisque rounded-xl focus:outline-none focus:border-rose-antique font-mono"
                          />
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB 3: NETBANKING */}
                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-3 pt-2">
                      <span className="text-xs font-sans text-ebony/70 block">Select your Preferred Indian Bank:</span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-sans font-bold">
                        {[
                          { id: 'hdfc', name: 'HDFC Bank' },
                          { id: 'icici', name: 'ICICI Bank' },
                          { id: 'sbi', name: 'State Bank of India' },
                          { id: 'axis', name: 'Axis Bank' },
                          { id: 'kotak', name: 'Kotak Bank' },
                          { id: 'pnb', name: 'Punjab National' }
                        ].map((bank) => (
                          <button
                            key={bank.id}
                            type="button"
                            onClick={() => setSelectedBank(bank.id)}
                            className={`p-3 rounded-xl border text-center transition-all flex items-center justify-between ${
                              selectedBank === bank.id
                                ? 'border-rose-antique bg-rose-antique/10 text-rose-deep font-bold shadow-sm'
                                : 'border-bisque/60 bg-offwhite text-ebony/80 hover:bg-white'
                            }`}
                          >
                            <span>{bank.name}</span>
                            {selectedBank === bank.id && <FiCheck className="text-rose-antique" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: CASH ON DELIVERY */}
                  {paymentMethod === 'cod' && (
                    <div className="p-4 rounded-2xl bg-offwhite border border-bisque/50 space-y-3">
                      <div className="flex items-center gap-3 text-xs font-sans text-ebony">
                        <FiTruck className="text-thyme text-xl shrink-0" />
                        <div>
                          <strong className="font-bold text-sm block">Pay Cash at Your Doorstep</strong>
                          <span className="text-ebony/60">Pay ₹{finalTotal.toLocaleString('en-IN')} in cash upon delivery to your address.</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-bisque/40 flex items-center justify-between text-xs">
                        <span className="text-ebony/70">OTP Verification Code:</span>
                        <div className="flex gap-1.5 font-mono font-bold text-ebony">
                          {otpCode.map((digit, idx) => (
                            <span key={idx} className="w-7 h-8 rounded-lg bg-white border border-bisque flex items-center justify-center shadow-sm">
                              {digit}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: EMI / PAYLATER */}
                  {paymentMethod === 'emi' && (
                    <div className="p-4 rounded-2xl bg-offwhite border border-bisque/50 space-y-3 text-xs font-sans">
                      <div className="flex justify-between items-center border-b border-bisque/40 pb-2">
                        <span className="font-bold text-ebony">Zero-Cost 3-Month EMI Option</span>
                        <span className="text-[10px] font-bold text-thyme bg-thyme-light/20 px-2 py-0.5 rounded-full">0% Interest</span>
                      </div>
                      <div className="space-y-1.5 text-ebony/80">
                        <div className="flex justify-between">
                          <span>Monthly Instalment:</span>
                          <strong className="font-serif font-bold text-ebony">₹{Math.round(finalTotal / 3).toLocaleString('en-IN')} / month</strong>
                        </div>
                        <div className="flex justify-between text-[11px] text-ebony/60">
                          <span>Tenure:</span>
                          <span>3 Months (Simpl / ZestMoney)</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

              </div>

              {/* Right Column: Order Summary (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="bg-white p-6 rounded-2xl border border-bisque/70 shadow-md space-y-4">
                  <h4 className="font-serif text-base font-bold text-ebony uppercase tracking-wider border-b border-bisque pb-3">
                    Order Summary ({cart.length} Item{cart.length === 1 ? '' : 's'})
                  </h4>

                  {/* Cart Items Preview */}
                  <div className="max-h-48 overflow-y-auto space-y-3 pr-1">
                    {cart.map((item, index) => (
                      <div key={index} className="flex gap-3 items-center">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-14 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0 text-xs font-sans">
                          <h5 className="font-serif font-bold text-ebony truncate">{item.product.name}</h5>
                          <span className="text-[10px] text-ebony/60">Qty: {item.quantity} | Size: {item.selectedSize}</span>
                        </div>
                        <span className="font-serif font-bold text-xs text-ebony">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="space-y-2 text-xs font-sans text-ebony/80 pt-3 border-t border-bisque/40">
                    <div className="flex justify-between">
                      <span>Bag Subtotal</span>
                      <span className="font-bold">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Express Shipping</span>
                      <span>{finalShipping === 0 ? <span className="text-thyme font-bold">FREE</span> : `₹${finalShipping}`}</span>
                    </div>
                    <div className="flex justify-between text-base font-serif font-bold text-ebony pt-3 border-t border-bisque">
                      <span>Total Payable</span>
                      <span className="text-rose-deep">₹{finalTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Final Submit Button */}
                  <button
                    onClick={handleProcessPayment}
                    className="w-full bg-ebony hover:bg-rose-deep text-white font-sans text-xs font-bold uppercase tracking-widest py-4 rounded-full flex items-center justify-center gap-2 shadow-floating transition-all hover:scale-[1.02] mt-4"
                  >
                    Complete Test Order (₹{finalTotal.toLocaleString('en-IN')}) <FiArrowRight />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-sans text-ebony/60 text-center pt-1">
                    <BsShieldCheck className="text-thyme text-base" />
                    <span>Instant Order Approval • Test Mode Active</span>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ────────────────── STEP 2: PAYMENT PROCESSING SIMULATION ────────────────── */}
          {step === 'processing' && (
            <div className="p-12 text-center space-y-6 my-auto">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-bisque border-t-rose-antique animate-spin" />
                <BsShieldCheck className="text-3xl text-rose-antique animate-pulse" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-ebony">Processing Secure Payment...</h3>
                <p className="text-xs font-sans text-ebony/60">Communicating with Estilo Test Payment Gateway. Please do not close or refresh.</p>
              </div>

              <div className="max-w-xs mx-auto space-y-2 text-[11px] font-sans text-ebony/70 bg-white p-3 rounded-2xl border border-bisque">
                <div className="flex items-center justify-between">
                  <span>Merchant:</span>
                  <strong className="font-bold text-ebony">Estilo Wear Couture</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Amount:</span>
                  <strong className="font-bold text-rose-antique">₹{(completedOrderDetails?.total || finalTotal).toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Mode:</span>
                  <span className="uppercase font-bold">{paymentMethod} Test Gateway</span>
                </div>
              </div>
            </div>
          )}

          {/* ────────────────── STEP 3: ORDER SUCCESS RECEIPT ────────────────── */}
          {step === 'success' && (
            <div className="p-8 text-center space-y-6 overflow-y-auto">
              
              {/* Success Badge */}
              <div className="w-16 h-16 bg-thyme-light/20 text-thyme rounded-full flex items-center justify-center text-3xl mx-auto shadow-md border border-thyme/30">
                <FiCheckCircle />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-sans font-bold text-thyme uppercase tracking-widest">Order Confirmed!</span>
                <h2 className="font-serif text-3xl font-bold text-ebony">Thank You for Your Order</h2>
                <p className="text-xs font-sans text-ebony/60 max-w-md mx-auto">
                  Your test order has been successfully processed! We have dispatched your confirmation to <strong>{shippingInfo.email}</strong>.
                </p>
              </div>

              {/* Order Receipt Card */}
              <div className="bg-white p-6 rounded-2xl border border-bisque/80 max-w-lg mx-auto shadow-sm space-y-4 text-left font-sans text-xs">
                
                <div className="flex justify-between items-center border-b border-bisque pb-3">
                  <div>
                    <span className="text-[10px] text-ebony/50 block">ORDER ID</span>
                    <strong className="font-mono text-sm font-bold text-ebony">{completedOrderDetails?.orderId || 'EST-2026-89412'}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-ebony/50 block">ESTIMATED DELIVERY</span>
                    <strong className="text-sm font-bold text-thyme">3 - 4 Business Days</strong>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-ebony/60 uppercase tracking-wider block">Delivering To</span>
                  <div className="text-ebony/80">
                    <strong className="text-ebony block">{shippingInfo.fullName}</strong>
                    <span>{shippingInfo.address}, {shippingInfo.city} - {shippingInfo.pincode}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-bisque/40 flex items-center justify-between">
                  <span className="font-bold text-ebony">Total Amount Paid:</span>
                  <span className="font-serif font-bold text-base text-rose-deep">₹{(completedOrderDetails?.total || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-6 py-3 bg-offwhite border border-bisque hover:border-ebony text-ebony font-sans text-xs font-bold uppercase tracking-wider rounded-full flex items-center justify-center gap-2 transition-colors"
                >
                  <FiPrinter /> Print Receipt
                </button>

                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="w-full sm:w-auto px-8 py-3.5 bg-ebony hover:bg-rose-deep text-white font-sans text-xs font-bold uppercase tracking-widest rounded-full shadow-floating transition-colors"
                >
                  Continue Shopping
                </button>
              </div>

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
