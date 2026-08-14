import React, { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock, FiMessageCircle, FiChevronDown, FiSend } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';

const Contact = () => {
  const { showToast } = useShop();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: 'General Inquiry', message: '' });
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Thank you! Your boutique concierge request has been received.');
    setFormData({ name: '', email: '', phone: '', service: 'General Inquiry', message: '' });
  };

  const faqs = [
    {
      q: 'Do you offer custom tailoring & bespoke fitting?',
      a: 'Yes! We offer complimentary alteration services for all Kurtis, Anarkalis, and Co-Ord sets purchased from Estilo Wear. You can visit our boutique atelier or request custom measurements during checkout.'
    },
    {
      q: 'What is the estimated delivery timeframe?',
      a: 'Standard express shipping takes 3 to 5 business days across India. Handcrafted custom bridal couture orders take 10 to 14 business days.'
    },
    {
      q: 'How do I care for pure Silk & Chikankari outfits?',
      a: 'We strongly recommend professional Dry Cleaning for all pure Silk sarees, Chikankari sets, and Zardozi garments to preserve fabric luster and hand embroidery.'
    },
    {
      q: 'What is your return & exchange policy?',
      a: 'We offer a hassle-free 7-day exchange policy. If an item does not fit or you wish to switch colors, our courier partner will pick up the item from your doorstep.'
    }
  ];

  return (
    <div className="pb-16 sm:pb-24 pt-4 sm:pt-8">
      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center">
        <span className="text-xs font-sans font-bold text-rose-antique uppercase tracking-[0.3em]">
          Boutique Concierge
        </span>
        <h1 className="font-serif text-2xl sm:text-5xl font-bold text-ebony mt-2">
          Contact & Styling Appointments
        </h1>
        <p className="text-[11px] sm:text-sm font-sans text-ebony/70 mt-2 max-w-lg mx-auto">
          Have a question about fabric, custom fit, or bridal couture? Our personal stylists are at your service.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
          
          {/* Contact Details Card */}
          <div className="space-y-6">
            <div className="bg-ebony text-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-floating space-y-4 sm:space-y-6">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-champagne">
                Visit Our Flagship Store
              </h3>

              <div className="space-y-4 text-xs font-sans text-white/80">
                <div className="flex items-start gap-3">
                  <FiMapPin className="text-blush text-lg flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Estilo Wear Atelier</strong><br />
                    Plot 45, Designer Boulevard, Jubilee Hills, Hyderabad - 500033
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FiPhone className="text-blush text-lg flex-shrink-0" />
                  <span>Stylist Line: +91 98765 43210</span>
                </div>

                <div className="flex items-center gap-3">
                  <FiMail className="text-blush text-lg flex-shrink-0" />
                  <span>Concierge: concierge@estilowear.com</span>
                </div>

                <div className="flex items-start gap-3">
                  <FiClock className="text-blush text-lg flex-shrink-0 mt-0.5" />
                  <span>
                    Monday – Saturday: 10:30 AM – 8:30 PM<br />
                    Sunday: By Appointment Only
                  </span>
                </div>
              </div>

              {/* WhatsApp Direct Connect Button */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-sans text-xs font-bold uppercase tracking-wider py-3.5 rounded-full flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <FiMessageCircle className="text-base" /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Contact & Appointment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-bisque/60 shadow-sm space-y-5 sm:space-y-6">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-ebony">
                Send Us a Message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-sans font-bold text-ebony uppercase tracking-wider mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ananya Sharma"
                    className="w-full bg-offwhite border border-bisque rounded-xl px-4 py-3 text-xs font-sans focus:outline-none focus:border-rose-antique"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-bold text-ebony uppercase tracking-wider mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-offwhite border border-bisque rounded-xl px-4 py-3 text-xs font-sans focus:outline-none focus:border-rose-antique"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-sans font-bold text-ebony uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ananya@example.com"
                    className="w-full bg-offwhite border border-bisque rounded-xl px-4 py-3 text-xs font-sans focus:outline-none focus:border-rose-antique"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-bold text-ebony uppercase tracking-wider mb-2">
                    Inquiry Type
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-offwhite border border-bisque rounded-xl px-4 py-3 text-xs font-sans focus:outline-none focus:border-rose-antique"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Bridal Consultation">Bridal Consultation Appointment</option>
                    <option value="Bespoke Tailoring">Custom Fitting & Alterations</option>
                    <option value="Order Status">Order Tracking Request</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans font-bold text-ebony uppercase tracking-wider mb-2">
                  Your Message / Requirement *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the outfit you are looking for..."
                  className="w-full bg-offwhite border border-bisque rounded-xl px-4 py-3 text-xs font-sans focus:outline-none focus:border-rose-antique"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-ebony hover:bg-rose-deep text-white font-sans text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <FiSend /> Submit Request
              </button>
            </form>
          </div>

        </div>

        {/* FAQ Accordion */}
        <div className="mt-12 sm:mt-20 pt-8 sm:pt-12 border-t border-bisque/60 max-w-3xl mx-auto space-y-6 sm:space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-sans font-bold text-rose-antique uppercase tracking-[0.3em]">
              Got Questions?
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ebony">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white border border-bisque/60 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-5 text-left font-serif text-base font-bold text-ebony flex items-center justify-between hover:text-rose-antique"
                >
                  <span>{faq.q}</span>
                  <FiChevronDown className={`transition-transform ${activeFaq === i ? 'rotate-180 text-rose-antique' : ''}`} />
                </button>
                {activeFaq === i && (
                  <div className="p-5 pt-0 text-xs font-sans text-ebony/75 leading-relaxed border-t border-bisque/30">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
