import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, RefreshCw, Truck, Award } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Footer = () => {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      showToast('Thank you for subscribing to Treshion VIP drops!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#121212] text-white pt-14 pb-10 border-t border-neutral-800">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Promises Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-neutral-800 text-neutral-300">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-[#d95338] flex-shrink-0" />
            <div>
              <h5 className="font-heading font-bold text-xs uppercase tracking-wider text-white">Free Express Delivery</h5>
              <p className="text-[11px] text-neutral-400">On all prepaid orders across India</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RefreshCw className="w-6 h-6 text-[#d95338] flex-shrink-0" />
            <div>
              <h5 className="font-heading font-bold text-xs uppercase tracking-wider text-white">7-Day Hassle-Free Returns</h5>
              <p className="text-[11px] text-neutral-400">Instant pickups & seamless size swaps</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#d95338] flex-shrink-0" />
            <div>
              <h5 className="font-heading font-bold text-xs uppercase tracking-wider text-white">100% Secure Checkout</h5>
              <p className="text-[11px] text-neutral-400">UPI, Cards, NetBanking & COD</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-[#d95338] flex-shrink-0" />
            <div>
              <h5 className="font-heading font-bold text-xs uppercase tracking-wider text-white">Premium Quality</h5>
              <p className="text-[11px] text-neutral-400">Crafted with high-grade fabrics</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-neutral-800">
          
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-sm inline-block shadow-sm">
                <img src="/image.png" alt="TRESHION" className="h-9 w-auto object-contain" />
              </div>
              <h3 className="font-heading font-black text-2xl tracking-[0.24em] text-white">
                TRESHION
              </h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Encapsulating inspirations from around the globe, TRESHION crafts clothing for the fashion-forward modern man. Offering an unconventional style statement for everyday individuality.
            </p>
            <form onSubmit={handleSubscribe} className="pt-2 max-w-md">
              <span className="block text-xs font-bold uppercase tracking-widest text-neutral-300 mb-2">
                BE THE FIRST TO KNOW ABOUT EXCLUSIVE DROPS
              </span>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL"
                  required
                  className="bg-neutral-900 border border-neutral-700 px-4 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:border-white outline-none flex-1 tracking-wider"
                />
                <button
                  type="submit"
                  className="bg-white text-black px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center justify-center"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Column 1: ONLINE SHOPPING */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-[0.16em] text-white mb-4">
              ONLINE SHOPPING
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-medium tracking-wide">
              <li><a href="#trending" className="hover:text-white transition-colors">Shirts</a></li>
              <li><a href="#trending" className="hover:text-white transition-colors">T-Shirts</a></li>
              <li><a href="#trending" className="hover:text-white transition-colors">Baggy & Straight Jeans</a></li>
              <li><a href="#trending" className="hover:text-white transition-colors">Pleated Trousers</a></li>
              <li><a href="#trending" className="hover:text-white transition-colors">Parachute Cargos</a></li>
              <li><a href="#trending" className="hover:text-white transition-colors">Outerwear & Jackets</a></li>
              <li><a href="#trending" className="hover:text-white transition-colors">Plus Size (3XL - 5XL)</a></li>
            </ul>
          </div>

          {/* Column 2: CUSTOMER SUPPORT */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-[0.16em] text-white mb-4">
              CUSTOMER POLICIES
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-medium tracking-wide">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ & Help</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Exchange</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Column 3: STORES & APP */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-[0.16em] text-white mb-4">
              EXPERIENCE STORES
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Visit our experiential flagship stores in Bengaluru, Mumbai, Delhi NCR, Hyderabad, and Ahmedabad.
            </p>
            <div className="space-y-1 text-xs text-neutral-300">
              <p>Email: <span className="text-white">support@treshion.com</span></p>
              <p>Mon - Sat: 10:00 AM - 7:00 PM</p>
            </div>
          </div>

        </div>

        {/* Bottom copyright & payment methods */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-neutral-500 text-[11px] gap-4">
          <p>© {new Date().getFullYear()} TRESHION. Crafted with precision & passion.</p>
          <div className="flex items-center gap-3 uppercase tracking-wider text-[10px]">
            <span>100% Genuine Products</span>
            <span>•</span>
            <span>Made in India</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
