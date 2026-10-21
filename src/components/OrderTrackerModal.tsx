import React, { useState } from 'react';
import { X, Search, Truck, Check, Clock } from 'lucide-react';
import { Order } from '../types';
import { config } from '../config';
import { paymentLabel } from '../lib/orders';

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
        (o.trackingNumber || '').toLowerCase() === clean
    );
    setMatchedOrder(found || null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-[#F6F3EC] rounded-[6px] max-w-lg w-full border border-[#DCD7CC] shadow-[0px_4px_0px_rgba(24,34,50,0.2)] overflow-hidden relative my-auto animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        id="order-tracker-modal"
      >
        {/* Header */}
        <div className="bg-[#182232] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck aria-hidden="true" className="w-5 h-5 text-[#E84A27]" />
            <h3 className="font-headline text-lg font-bold">
              Track Pakistan Courier Parcel
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center rounded-[6px] text-white/80 hover:text-white hover:bg-[#F6F3EC]/10 transition-colors cursor-pointer"
            aria-label="Close order tracker"
            id="btn-close-tracker"
          >
            <X aria-hidden="true" className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <label htmlFor="tracker-input" className="sr-only">Order number or WhatsApp phone</label>
            <input
              type="text"
              placeholder="Enter Order # (e.g. AST-123456) or Phone"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 h-11 px-3.5 rounded-[6px] bg-[#F6F3EC] border border-[#DCD7CC] focus:border-[#182232] text-xs sm:text-sm font-body outline-none"
              id="tracker-input"
            />
            <button
              type="submit"
              className="h-11 bg-[#182232] hover:bg-[#182232] text-white font-headline text-xs font-bold px-5 rounded-[6px] transition-colors cursor-pointer flex items-center gap-1"
            >
              <Search aria-hidden="true" className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </form>

          {matchedOrder ? (
            <div className="bg-[#F6F3EC] rounded-[6px] border border-[#DCD7CC] p-4 space-y-4 ">
              <div className="flex items-center justify-between border-b border-[#EDE8DD] pb-3">
                <div>
                  <span className="text-[10px] text-[#5A6270] uppercase font-headline font-bold">
                    Order ID
                  </span>
                  <p className="font-headline font-extrabold text-[#182232] text-base">
                    #{matchedOrder.id}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#5A6270] uppercase font-headline font-bold">
                    Courier
                  </span>
                  <p className="font-headline font-bold text-[#182232] text-xs">
                    {matchedOrder.courier || 'Not assigned'}
                  </p>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="space-y-3 pl-2 border-l-2 border-[#182232]">
                <div className="relative pl-4">
                  <div className="absolute -left-[17px] top-0 w-4 h-4 rounded-[6px] bg-[#182232] flex items-center justify-center text-white">
                    <Check aria-hidden="true" className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <p className="font-headline font-bold text-xs text-[#182232]">
                    <span className="sr-only">Completed: </span>
                    Order received
                  </p>
                  <p className="text-[11px] text-[#5A6270]">
                    Saved on {matchedOrder.createdAt}. Payment: {paymentLabel(matchedOrder.paymentMethod)}.
                  </p>
                </div>

                <div className="relative pl-4">
                  <div className="absolute -left-[17px] top-0 w-4 h-4 rounded-[6px] bg-[#182232] flex items-center justify-center" aria-hidden="true">
                    <span className="w-1.5 h-1.5 rounded-[6px] bg-[#F6F3EC] animate-pulse" />
                  </div>
                  <p className="font-headline font-bold text-xs text-[#182232]">
                    <span className="sr-only">In progress: </span>
                    Waiting for us to confirm
                  </p>
                  <p className="text-[11px] text-[#5A6270]">
                    Destination: {matchedOrder.customer.city} · Rs. {matchedOrder.total.toLocaleString()} via {matchedOrder.courier}
                  </p>
                </div>
              </div>

              <div className="bg-[#F6F3EC] p-3 rounded-lg text-xs space-y-1 text-[#5A6270]">
                <div className="flex justify-between">
                  <span>Recipient:</span>
                  <strong className="text-[#182232]">{matchedOrder.customer.fullName}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Address:</span>
                  <span className="text-[#182232] text-right truncate max-w-xs">{matchedOrder.customer.address}</span>
                </div>
              </div>
            </div>
          ) : searched ? (
            <div className="bg-[#F6F3EC] rounded-[6px] border border-[#DCD7CC] p-6 text-center text-xs text-[#5A6270]">
              <p className="font-headline font-bold text-sm text-[#182232]">
                No parcel found for "{query}"
              </p>
              <p className="mt-1">
                Check the order number or phone saved in this browser, or message us. Call{' '}
                <a href={`tel:${config.phoneTel}`} className="font-bold text-[#182232] underline">{config.phone}</a>.
              </p>
            </div>
          ) : (
            <div className="bg-[#F6F3EC] rounded-[6px] border border-[#DCD7CC] p-5 text-center text-xs text-[#5A6270]">
              <Clock aria-hidden="true" className="w-8 h-8 text-[#182232] mx-auto mb-2 opacity-60" />
              <p className="font-headline font-bold text-sm text-[#182232]">
                Instant Tracking for Pakistani Orders
              </p>
              <p className="mt-1">
                This looks up orders placed in this browser. It is not a live courier tracker.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
