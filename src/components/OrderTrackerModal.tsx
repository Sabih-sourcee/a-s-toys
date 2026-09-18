import React, { useState } from 'react';
import { X, Search, Truck, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrders: Order[];
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  recentOrders,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [matchedOrder, setMatchedOrder] = useState<Order | null>(
    recentOrders.length > 0 ? recentOrders[0] : null
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const clean = query.trim().toLowerCase();
    const found = recentOrders.find(
      (o) =>
        o.id.toLowerCase() === clean ||
        o.customer.phone.replace(/[^0-9]/g, '').includes(clean) ||
        o.trackingNumber.toLowerCase() === clean
    );
    setMatchedOrder(found || null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-[#FBF9F4] rounded-2xl max-w-lg w-full border border-[#EBE5DA] shadow-2xl overflow-hidden relative my-auto animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        id="order-tracker-modal"
      >
        {/* Header */}
        <div className="bg-[#0F3D9C] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#F0A63A]" />
            <h3 className="font-headline text-lg font-bold">
              Track Pakistan Courier Parcel
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            id="btn-close-tracker"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Order # (e.g. AST-123456) or Phone"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-full bg-white border border-[#EBE5DA] focus:border-[#0F3D9C] text-xs sm:text-sm font-body outline-none"
              id="tracker-input"
            />
            <button
              type="submit"
              className="bg-[#0F3D9C] hover:bg-[#0A2B70] text-white font-headline text-xs font-bold px-5 py-2.5 rounded-full transition-colors cursor-pointer flex items-center gap-1"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </form>

          {matchedOrder ? (
            <div className="bg-white rounded-xl border border-[#EBE5DA] p-4 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#F4EFE6] pb-3">
                <div>
                  <span className="text-[10px] text-[#58554F] uppercase font-headline font-bold">
                    Order ID
                  </span>
                  <p className="font-headline font-extrabold text-[#0F3D9C] text-base">
                    #{matchedOrder.id}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#58554F] uppercase font-headline font-bold">
                    Courier
                  </span>
                  <p className="font-headline font-bold text-[#1D1B18] text-xs">
                    {matchedOrder.courier} ({matchedOrder.trackingNumber})
                  </p>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="space-y-3 pl-2 border-l-2 border-[#258547]">
                <div className="relative pl-4">
                  <div className="absolute -left-[17px] top-0 w-4 h-4 rounded-full bg-[#258547] flex items-center justify-center text-white text-[10px]">
                    ✓
                  </div>
                  <p className="font-headline font-bold text-xs text-[#1D1B18]">
                    Order Quality Inspected at Lahore Hub
                  </p>
                  <p className="text-[11px] text-[#58554F]">
                    Inspected for smooth edges, battery safety, and boxed in bubble wrap.
                  </p>
                </div>

                <div className="relative pl-4">
                  <div className="absolute -left-[17px] top-0 w-4 h-4 rounded-full bg-[#0F3D9C] flex items-center justify-center text-white text-[10px] animate-pulse">
                    •
                  </div>
                  <p className="font-headline font-bold text-xs text-[#0F3D9C]">
                    Booked for Dispatch with {matchedOrder.courier}
                  </p>
                  <p className="text-[11px] text-[#58554F]">
                    Destination: {matchedOrder.customer.city} • Cash on Delivery (Rs. {matchedOrder.total.toLocaleString()})
                  </p>
                </div>
              </div>

              <div className="bg-[#FBF9F4] p-3 rounded-lg text-xs space-y-1 text-[#58554F]">
                <div className="flex justify-between">
                  <span>Recipient:</span>
                  <strong className="text-[#1D1B18]">{matchedOrder.customer.fullName}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Address:</span>
                  <span className="text-[#1D1B18] text-right truncate max-w-xs">{matchedOrder.customer.address}</span>
                </div>
              </div>
            </div>
          ) : searched ? (
            <div className="bg-white rounded-xl border border-[#EBE5DA] p-6 text-center text-xs text-[#58554F]">
              <p className="font-headline font-bold text-sm text-[#1D1B18]">
                No parcel found for "{query}"
              </p>
              <p className="mt-1">
                Please double-check your Order Number or WhatsApp phone number, or chat with our Lahore team on WhatsApp (+92 300 1234567).
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[#EBE5DA] p-5 text-center text-xs text-[#58554F]">
              <Clock className="w-8 h-8 text-[#0F3D9C] mx-auto mb-2 opacity-60" />
              <p className="font-headline font-bold text-sm text-[#1D1B18]">
                Instant Tracking for Pakistani Orders
              </p>
              <p className="mt-1">
                Enter your order ID from your confirmation SMS or receipt to view the real-time courier status.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
