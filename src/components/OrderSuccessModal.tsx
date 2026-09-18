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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white">
      <div
        className="bg-[#FBF9F4] rounded-2xl max-w-2xl w-full border border-[#EBE5DA] shadow-2xl overflow-hidden relative my-auto animate-in fade-in zoom-in-95 duration-150 print:border-none print:shadow-none"
        onClick={(e) => e.stopPropagation()}
        id="order-success-modal"
      >
        {/* Banner */}
        <div className="bg-[#258547] text-white p-6 text-center">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-8 h-8 text-white stroke-2" />
          </div>
          <span className="text-xs font-headline font-bold uppercase tracking-wider text-green-100">
            Shukriya! Order Received
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl font-extrabold mt-1">
            Order #{order.id} Confirmed
          </h2>
          <p className="text-xs sm:text-sm text-green-100 mt-1">
            We will inspect your toys at our Lahore shop before handing over to {order.courier}.
          </p>
        </div>

        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Tracking Timeline Simulator */}
          <div className="bg-white rounded-xl border border-[#EBE5DA] p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3 text-xs font-headline font-bold text-[#1D1B18]">
              <span className="flex items-center gap-1.5 text-[#0F3D9C]">
                <Truck className="w-4 h-4" />
                <span>Courier Dispatch Journey ({order.courier})</span>
              </span>
              <span className="bg-[#EBF7EE] text-[#258547] px-2 py-0.5 rounded text-[10px]">
                Tracking: {order.trackingNumber}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-headline">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-[#258547] text-white flex items-center justify-center text-[10px] font-bold mb-1 shadow-xs">
                  ✓
                </div>
                <span className="font-bold text-[#1D1B18]">Order Placed</span>
                <span className="text-[9px] text-[#58554F]">Instant</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-[#0F3D9C] text-white flex items-center justify-center text-[10px] font-bold mb-1 shadow-xs animate-pulse">
                  2
                </div>
                <span className="font-bold text-[#0F3D9C]">Lahore QA</span>
                <span className="text-[9px] text-[#58554F]">In Hand Check</span>
              </div>

              <div className="flex flex-col items-center opacity-60">
                <div className="w-6 h-6 rounded-full bg-[#F4EFE6] text-[#58554F] flex items-center justify-center text-[10px] font-bold mb-1">
                  3
                </div>
                <span className="font-bold text-[#58554F]">TCS Dispatched</span>
                <span className="text-[9px] text-[#58554F]">Tracking SMS</span>
              </div>

              <div className="flex flex-col items-center opacity-60">
                <div className="w-6 h-6 rounded-full bg-[#F4EFE6] text-[#58554F] flex items-center justify-center text-[10px] font-bold mb-1">
                  4
                </div>
                <span className="font-bold text-[#58554F]">Doorstep Delivery</span>
                <span className="text-[9px] text-[#58554F]">Pay Cash (COD)</span>
              </div>
            </div>
          </div>

          {/* Delivery & Customer Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-3.5 rounded-xl border border-[#EBE5DA] space-y-1">
              <span className="font-headline font-bold text-[#1D1B18] flex items-center gap-1 text-[#0F3D9C]">
                <MapPin className="w-3.5 h-3.5" />
                Delivery Address
              </span>
              <p className="font-bold text-[#1D1B18]">{order.customer.fullName}</p>
              <p className="text-[#58554F]">{order.customer.address}</p>
              <p className="font-semibold text-[#1D1B18]">{order.customer.city}, Pakistan</p>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-[#EBE5DA] space-y-1">
              <span className="font-headline font-bold text-[#1D1B18] flex items-center gap-1 text-[#0F3D9C]">
                <Phone className="w-3.5 h-3.5" />
                Contact &amp; Payment
              </span>
              <p className="text-[#58554F]">Phone: <strong className="text-[#1D1B18]">{order.customer.phone}</strong></p>
              <p className="text-[#58554F]">
                Payment: <strong className="text-[#258547] uppercase font-headline">
                  {order.paymentMethod === 'cod'
                    ? 'Cash on Delivery (COD)'
                    : order.paymentMethod === 'jazzcash'
                    ? 'JazzCash'
                    : order.paymentMethod === 'easypaisa'
                    ? 'EasyPaisa'
                    : 'Bank Transfer'}
                </strong>
              </p>
              <p className="text-[11px] text-[#58554F]">Expected Delivery: 2–3 Working Days</p>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="bg-white rounded-xl border border-[#EBE5DA] p-4 shadow-xs">
            <h4 className="font-headline text-xs font-bold text-[#1D1B18] uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <PackageCheck className="w-4 h-4 text-[#0F3D9C]" />
              <span>Items in this parcel</span>
            </h4>
            <div className="divide-y divide-[#F4EFE6] text-xs">
              {order.items.map((item) => (
                <div key={item.product.id} className="py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#F4EFE6] text-[#0F3D9C] text-[11px] font-bold flex items-center justify-center">
                      {item.quantity}×
                    </span>
                    <span className="font-medium text-[#1D1B18]">{item.product.title}</span>
                  </div>
                  <span className="font-headline font-bold text-[#0F3D9C]">
                    Rs. {(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-[#EBE5DA] flex justify-between items-baseline">
              <span className="font-headline text-sm font-extrabold text-[#1D1B18]">
                Total Amount Due (COD)
              </span>
              <span className="font-headline text-xl font-black text-[#0F3D9C]">
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
              className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-headline text-sm font-bold py-3 rounded-full flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              id="btn-whatsapp-priority-confirm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Send Order to WhatsApp for Priority Dispatch</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handlePrint}
                className="bg-white hover:bg-[#F4EFE6] text-[#1D1B18] border border-[#EBE5DA] font-headline text-xs font-bold py-2.5 rounded-full flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                id="btn-print-receipt"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save Slip</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onContinueShopping();
                }}
                className="bg-[#0F3D9C] hover:bg-[#0A2B70] text-white font-headline text-xs font-bold py-2.5 rounded-full flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                id="btn-continue-shopping-after-order"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
