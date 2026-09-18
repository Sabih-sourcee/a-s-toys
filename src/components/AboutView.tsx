import React from 'react';
import { Store, ShieldCheck, Heart, MapPin, Phone, MessageCircle, ArrowRight } from 'lucide-react';

interface AboutViewProps {
  onShopClick: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onShopClick }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="about-section">
      <div className="bg-white rounded-2xl border border-[#EBE5DA] p-6 sm:p-12 shadow-xs space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-[#F4EFE6] text-[#0F3D9C] px-3 py-1 rounded-full text-xs font-headline font-bold mb-3">
            <Store className="w-3.5 h-3.5" />
            <span>Our Lahore Heritage</span>
          </div>
          <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-[#1D1B18] tracking-tight">
            From a physical counter in Lahore to happy doorsteps across Pakistan
          </h1>
          <p className="font-body text-base text-[#58554F] mt-3 leading-relaxed">
            A &amp; S Toys began with a simple observation: Pakistani parents were tired of ordering fragile, sharp-edged toys online that broke within 2 hours of arrival.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-[#FBF9F4] p-5 rounded-xl border border-[#EBE5DA] space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#0F3D9C] text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-headline text-base font-bold text-[#1D1B18]">
              In-Hand Quality Check
            </h3>
            <p className="font-body text-xs sm:text-sm text-[#58554F] leading-relaxed">
              Every single toy is physically opened and checked at our Lahore workshop. We sand off sharp burs, test battery contacts, and verify that screws are securely embedded.
            </p>
          </div>

          <div className="bg-[#FBF9F4] p-5 rounded-xl border border-[#EBE5DA] space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#C4291F] text-white flex items-center justify-center font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-headline text-base font-bold text-[#1D1B18]">
              Child-Safe Materials
            </h3>
            <p className="font-body text-xs sm:text-sm text-[#58554F] leading-relaxed">
              We exclusively select natural solid beechwood, non-toxic waterborne food-grade dyes, soft silicone teethers, and sturdy die-cast zinc alloys.
            </p>
          </div>

          <div className="bg-[#FBF9F4] p-5 rounded-xl border border-[#EBE5DA] space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#258547] text-white flex items-center justify-center font-bold">
              <Store className="w-5 h-5" />
            </div>
            <h3 className="font-headline text-base font-bold text-[#1D1B18]">
              Real Shop Support
            </h3>
            <p className="font-body text-xs sm:text-sm text-[#58554F] leading-relaxed">
              Have doubts about toy sizing? Message our team directly on WhatsApp. We send real 15-second unedited video clips right from our shop counter.
            </p>
          </div>
        </div>

        {/* Visit Our Lahore Store */}
        <div className="bg-[#F4EFE6] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-headline text-lg font-bold text-[#1D1B18]">
              Visiting Lahore? Come say salam in person!
            </h3>
            <p className="font-body text-xs sm:text-sm text-[#58554F]">
              Main Market, Gulberg III, Lahore, Pakistan. Open Monday to Saturday: 11:00 AM – 10:00 PM.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-headline text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Shop</span>
            </a>
            <button
              onClick={onShopClick}
              className="btn-push-red text-white font-headline text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore All Toys</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
