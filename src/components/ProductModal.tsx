import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, RefreshCw, MessageCircle, ShoppingBag, Video } from 'lucide-react';
import { Product } from '../types';
import { WhatsAppLink } from './WhatsAppLink';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  isAdded?: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isAdded = false,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState(product.image);

  const isOutOfStock = !product.inStock || product.stock <= 0;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const handleIncrease = () => {
    if (quantity < product.stock) setQuantity((q) => q + 1);
  };

  const whatsappOrderMsg =
    `Assalam-o-Alaikum! I would like to order ${quantity}x "${product.title}" (Rs. ${(
      product.price * quantity
    ).toLocaleString()}) with Cash on Delivery to my address.`;

  const whatsappVideoMsg =
    `Assalam-o-Alaikum! Could you please share a 15-second video clip of "${product.title}"? Thank you!`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-[#F6F3EC] rounded-[6px] max-w-3xl w-full border border-[#DCD7CC] shadow-[0px_4px_0px_rgba(24,34,50,0.2)] overflow-hidden relative my-auto animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        id="product-detail-modal"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-11 h-11 flex items-center justify-center bg-[#F6F3EC]/80 hover:bg-[#F6F3EC] text-[#182232] rounded-[6px] shadow-[0px_2px_0px_#182232] transition-colors cursor-pointer"
          aria-label="Close dialog"
          id="btn-close-product-modal"
        >
          <X aria-hidden="true" className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image Viewer */}
          <div className="md:col-span-6 p-6 bg-[#F6F3EC] border-b md:border-b-0 md:border-r border-[#DCD7CC] flex flex-col items-center justify-between">
            <div className="w-full relative aspect-square bg-[#EDE8DD]/40 rounded-[6px] flex items-center justify-center p-4 overflow-hidden mb-4">
              {product.discountBadge && (
                <span className="absolute top-3 left-3 bg-[#E84A27] text-white text-xs font-headline font-extrabold px-2.5 py-1 rounded  z-10">
                  {product.discountBadge}
                </span>
              )}
              <img
                src={selectedImg}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnail Row */}
            {product.galleryImages && product.galleryImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto w-full pb-1">
                {product.galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(imgUrl)}
                    className={`w-14 h-14 rounded-lg border p-1 bg-[#F6F3EC] shrink-0 overflow-hidden cursor-pointer transition-all ${
                      selectedImg === imgUrl
                        ? 'border-[#182232] ring-2 ring-[#182232]/20'
                        : 'border-[#DCD7CC] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Live Shop Video Demo Button */}
            <div className="w-full mt-4 bg-[#F0FDF4] border border-[#182232]/30 rounded-[6px] p-3 text-center">
              <p className="text-xs text-[#182232] font-body mb-2">
                Want a real 15-second video of this toy in hand before ordering?
              </p>
              <WhatsAppLink
                message={whatsappVideoMsg}
                className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-headline font-bold py-2 px-4 rounded-[6px] transition-colors w-full"
                id="btn-request-video-demo"
              >
                <Video aria-hidden="true" className="w-4 h-4" />
                <span>Request WhatsApp Video Demo</span>
              </WhatsAppLink>
            </div>
          </div>

          {/* Right Column: Details & Ordering */}
          <div className="md:col-span-6 p-6 flex flex-col justify-between space-y-4">
            <div>
              {/* Category & Age Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-[#C8CFD8] text-[#182232] text-xs font-headline font-bold px-2.5 py-0.5 rounded-[6px]">
                  {product.categoryName}
                </span>
                <span className="bg-[#EDE8DD] text-[#182232] text-xs font-headline font-bold px-2.5 py-0.5 rounded-[6px]">
                  {product.ageLabel}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-headline text-xl sm:text-2xl font-extrabold text-[#182232] leading-tight">
                {product.title}
              </h2>

              {/* Pricing */}
              <div className="mt-4 p-3 bg-[#F6F3EC] rounded-[6px] border border-[#DCD7CC] flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline text-2xl font-black text-[#182232]">
                      Rs. {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#5A6270] line-through">
                        Rs. {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-bold text-[#182232] block mt-0.5">
                    Cash on Delivery (0% advance required)
                  </span>
                </div>

                {/* Stock Status */}
                <div className="text-right">
                  {isOutOfStock ? (
                    <span className="inline-block bg-red-100 text-[#E84A27] text-xs font-headline font-bold px-2 py-1 rounded">
                      Out of stock
                    </span>
                  ) : (
                    <span className="inline-block bg-[#EDE8DD] text-[#182232] text-xs font-headline font-bold px-2 py-1 rounded">
                      {product.stock} in stock
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm font-body text-[#5A6270] mt-3 leading-relaxed">
                {product.fullDescription}
              </p>

              {/* Key Feature Bullets */}
              <div className="mt-4 space-y-1.5">
                <span className="text-xs font-headline font-bold text-[#182232] uppercase tracking-wide">
                  Highlights:
                </span>
                <ul className="space-y-1 text-xs text-[#182232] font-body">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Check aria-hidden="true" className="w-3.5 h-3.5 text-[#182232] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safety Badges */}
              <div className="mt-4 pt-3 border-t border-[#DCD7CC] grid grid-cols-2 gap-2 text-xs text-[#5A6270]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck aria-hidden="true" className="w-4 h-4 text-[#182232]" />
                  <span>{product.safetyNotes}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck aria-hidden="true" className="w-4 h-4 text-[#182232]" />
                  <span>TCS / Leopards (2-3 days)</span>
                </div>
              </div>
            </div>

            {/* Actions: Quantity + Add to Cart + WhatsApp Order */}
            <div className="pt-4 border-t border-[#DCD7CC] space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Control */}
                <div className="flex items-center border border-[#DCD7CC] rounded-[6px] bg-[#F6F3EC] p-1 ">
                  <button
                    onClick={handleDecrease}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="relative w-8 h-8 rounded-[6px] flex items-center justify-center hover:bg-[#EDE8DD] text-[#182232] font-bold disabled:opacity-30 cursor-pointer before:absolute before:-inset-1.5 before:content-['']"
                    aria-label="Decrease quantity"
                  >
                    <span aria-hidden="true">-</span>
                  </button>
                  <span className="w-10 text-center font-headline text-sm font-bold text-[#182232]" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    disabled={quantity >= product.stock || isOutOfStock}
                    className="relative w-8 h-8 rounded-[6px] flex items-center justify-center hover:bg-[#EDE8DD] text-[#182232] font-bold disabled:opacity-30 cursor-pointer before:absolute before:-inset-1.5 before:content-['']"
                    aria-label="Increase quantity"
                  >
                    <span aria-hidden="true">+</span>
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => onAddToCart(product, quantity)}
                  disabled={isOutOfStock}
                  className={`flex-1 font-headline text-sm font-bold py-3 px-4 rounded-[6px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0px_2px_0px_#182232] ${
                    isAdded
                      ? 'bg-[#182232] text-white'
                      : isOutOfStock
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'btn-push-red text-white'
                  }`}
                  id="modal-add-to-cart-btn"
                >
                  {isAdded ? (
                    <>
                      <Check aria-hidden="true" className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : isOutOfStock ? (
                    <span>Temporarily Out of Stock</span>
                  ) : (
                    <>
                      <ShoppingBag aria-hidden="true" className="w-4 h-4" />
                      <span>Add to bag · Rs. {(product.price * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct WhatsApp Instant Buy Button */}
              <WhatsAppLink
                message={whatsappOrderMsg}
                className="w-full min-h-[44px] bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-headline font-bold py-3 px-4 rounded-[6px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                id="modal-whatsapp-instant-buy"
              >
                <MessageCircle aria-hidden="true" className="w-4 h-4 fill-white" />
                <span>Instant Order via WhatsApp (COD)</span>
              </WhatsAppLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
