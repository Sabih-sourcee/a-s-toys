import React from 'react';
import { CheckCircle2, MessageCircle, Printer, Truck, ArrowRight, MapPin, Phone, PackageCheck } from 'lucide-react';
import { Order } from '../types';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  onContinueShopping: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onContinueShopping,
}) => {
  if (!order) return null;

  const whatsappConfirmMsg = encodeURIComponent(
    `Assalam-o-Alaikum! I have placed order #${order.id} for Rs. ${order.total.toLocaleString()} on your website.\n\n` +
      `Name: ${order.customer.fullName}\n` +
      `Phone: ${order.customer.phone}\n` +
      `City: ${order.customer.city}\n` +
      `Address: ${order.customer.address}\n\n` +
      `Please dispatch via ${order.courier}. Shukriya!`
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-[#F6F3EC]">
      <div
        className="bg-[#F6F3EC] rounded-[6px] max-w-2xl w-full border border-[#DCD7CC] shadow-[0px_4px_0px_rgba(24,34,50,0.2)] overflow-hidden relative my-auto animate-in fade-in zoom-in-95 duration-150 print:border-none print:shadow-none"
        onClick={(e) => e.stopPropagation()}
        id="order-success-modal"
      >
        {/* Banner */}
        <div className="bg-[#182232] text-white p-6 text-center">
          <div className="w-14 h-14 bg-[#F6F3EC]/20 rounded-[6px] flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 aria-hidden="true" className="w-8 h-8 text-white stroke-2" />
          </div>
          <span className="text-xs font-headline font-bold uppercase tracking-wider text-green-100">
            Shukriya! Order Received
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl font-extrabold mt-1">
            Order #{order.id} Confirmed
          </h2>
          <p className="text-xs sm:text-sm text-green-100 mt-1">
            We will inspect your toys at our Karachi shop before handing over to {order.courier}.
          </p>
        </div>

        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Tracking Timeline Simulator */}
          <div className="bg-[#F6F3EC] rounded-[6px] border border-[#DCD7CC] p-4 ">
            <div className="flex items-center justify-between mb-3 text-xs font-headline font-bold text-[#182232]">
              <span className="flex items-center gap-1.5 text-[#182232]">
                <Truck aria-hidden="true" className="w-4 h-4" />
                <span>Courier Dispatch Journey ({order.courier})</span>
              </span>
              <span className="bg-[#EDE8DD] text-[#182232] px-2 py-0.5 rounded text-[10px]">
                Tracking: {order.trackingNumber}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-headline">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-[6px] bg-[#182232] text-white flex items-center justify-center text-[10px] font-bold mb-1 ">
                  ✓
                </div>
                <span className="font-bold text-[#182232]">Order Placed</span>
                <span className="text-[9px] text-[#5A6270]">Instant</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-[6px] bg-[#182232] text-white flex items-center justify-center text-[10px] font-bold mb-1  animate-pulse">
                  2
                </div>
                <span className="font-bold text-[#182232]">Karachi QA</span>
                <span className="text-[9px] text-[#5A6270]">In Hand Check</span>
              </div>

              <div className="flex flex-col items-center opacity-60">
                <div className="w-6 h-6 rounded-[6px] bg-[#EDE8DD] text-[#5A6270] flex items-center justify-center text-[10px] font-bold mb-1">
                  3
                </div>
                <span className="font-bold text-[#5A6270]">TCS Dispatched</span>
                <span className="text-[9px] text-[#5A6270]">Tracking SMS</span>
              </div>

              <div className="flex flex-col items-center opacity-60">
                <div className="w-6 h-6 rounded-[6px] bg-[#EDE8DD] text-[#5A6270] flex items-center justify-center text-[10px] font-bold mb-1">
                  4
                </div>
                <span className="font-bold text-[#5A6270]">Doorstep Delivery</span>
                <span className="text-[9px] text-[#5A6270]">Pay Cash (COD)</span>
              </div>
            </div>
          </div>

          {/* Delivery & Customer Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-[#F6F3EC] p-3.5 rounded-[6px] border border-[#DCD7CC] space-y-1">
              <span className="font-headline font-bold text-[#182232] flex items-center gap-1 text-[#182232]">
                <MapPin aria-hidden="true" className="w-3.5 h-3.5" />
                Delivery Address
              </span>
              <p className="font-bold text-[#182232]">{order.customer.fullName}</p>
              <p className="text-[#5A6270]">{order.customer.address}</p>
              <p className="font-semibold text-[#182232]">{order.customer.city}, Pakistan</p>
            </div>

            <div className="bg-[#F6F3EC] p-3.5 rounded-[6px] border border-[#DCD7CC] space-y-1">
              <span className="font-headline font-bold text-[#182232] flex items-center gap-1 text-[#182232]">
                <Phone aria-hidden="true" className="w-3.5 h-3.5" />
                Contact &amp; Payment
              </span>
              <p className="text-[#5A6270]">Phone: <strong className="text-[#182232]">{order.customer.phone}</strong></p>
              <p className="text-[#5A6270]">
                Payment: <strong className="text-[#182232] uppercase font-headline">
                  {order.paymentMethod === 'cod'
                    ? 'Cash on Delivery (COD)'
                    : order.paymentMethod === 'jazzcash'
                    ? 'JazzCash'
                    : order.paymentMethod === 'easypaisa'
                    ? 'EasyPaisa'
                    : 'Bank Transfer'}
                </strong>
              </p>
              <p className="text-[11px] text-[#5A6270]">Expected Delivery: 2–3 Working Days</p>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="bg-[#F6F3EC] rounded-[6px] border border-[#DCD7CC] p-4 ">
            <h4 className="font-headline text-xs font-bold text-[#182232] uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <PackageCheck aria-hidden="true" className="w-4 h-4 text-[#182232]" />
              <span>Items in this parcel</span>
            </h4>
            <div className="divide-y divide-[#EDE8DD] text-xs">
              {order.items.map((item) => (
                <div key={item.product.id} className="py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-[6px] bg-[#EDE8DD] text-[#182232] text-[11px] font-bold flex items-center justify-center">
                      {item.quantity}×
                    </span>
                    <span className="font-medium text-[#182232]">{item.product.title}</span>
                  </div>
                  <span className="font-headline font-bold text-[#182232]">
                    Rs. {(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-[#DCD7CC] flex justify-between items-baseline">
              <span className="font-headline text-sm font-extrabold text-[#182232]">
                Total Amount Due (COD)
              </span>
              <span className="font-headline text-xl font-black text-[#182232]">
                Rs. {order.total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 print:hidden">
            <a
              href={`https://wa.me/923001234567?text=${whatsappConfirmMsg}`}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-headline text-sm font-bold py-3 rounded-[6px] flex items-center justify-center gap-2  transition-colors cursor-pointer"
              id="btn-whatsapp-priority-confirm"
            >
              <MessageCircle aria-hidden="true" className="w-4 h-4 fill-white" />
              <span>Send Order to WhatsApp for Priority Dispatch</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handlePrint}
                className="bg-[#F6F3EC] hover:bg-[#EDE8DD] text-[#182232] border border-[#DCD7CC] font-headline text-xs font-bold py-2.5 rounded-[6px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                id="btn-print-receipt"
              >
                <Printer aria-hidden="true" className="w-3.5 h-3.5" />
                <span>Print / Save Slip</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onContinueShopping();
                }}
                className="bg-[#182232] hover:bg-[#182232] text-white font-headline text-xs font-bold py-2.5 rounded-[6px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                id="btn-continue-shopping-after-order"
              >
                <span>Continue Shopping</span>
                <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
