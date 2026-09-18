import React, { useState } from 'react';
import { X, Star, Check, ShieldCheck, Truck, RefreshCw, MessageCircle, ShoppingBag, Video } from 'lucide-react';
import { Product } from '../types';

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

  const whatsappOrderMsg = encodeURIComponent(
    `Assalam-o-Alaikum! I would like to order ${quantity}x "${product.title}" (Rs. ${(
      product.price * quantity
    ).toLocaleString()}) with Cash on Delivery to my address.`
  );

  const whatsappVideoMsg = encodeURIComponent(
    `Assalam-o-Alaikum! Could you please share a 15-second live video clip of "${product.title}" from your Lahore shop? Thank you!`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-[#FBF9F4] rounded-2xl max-w-3xl w-full border border-[#EBE5DA] shadow-2xl overflow-hidden relative my-auto animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        id="product-detail-modal"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white text-[#1D1B18] p-2 rounded-full shadow-md transition-colors cursor-pointer"
          title="Close dialog"
          id="btn-close-product-modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image Viewer */}
          <div className="md:col-span-6 p-6 bg-white border-b md:border-b-0 md:border-r border-[#EBE5DA] flex flex-col items-center justify-between">
            <div className="w-full relative aspect-square bg-[#F4EFE6]/40 rounded-xl flex items-center justify-center p-4 overflow-hidden mb-4">
              {product.discountBadge && (
                <span className="absolute top-3 left-3 bg-[#C4291F] text-white text-xs font-headline font-extrabold px-2.5 py-1 rounded shadow-xs z-10">
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
                    className={`w-14 h-14 rounded-lg border p-1 bg-white shrink-0 overflow-hidden cursor-pointer transition-all ${
                      selectedImg === imgUrl
                        ? 'border-[#0F3D9C] ring-2 ring-[#0F3D9C]/20'
                        : 'border-[#EBE5DA] opacity-70 hover:opacity-100'
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
            <div className="w-full mt-4 bg-[#F0FDF4] border border-[#258547]/30 rounded-xl p-3 text-center">
              <p className="text-xs text-[#1D1B18] font-body mb-2">
                Want a real 15-second video of this toy in hand before ordering?
              </p>
              <a
                href={`https://wa.me/923001234567?text=${whatsappVideoMsg}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-headline font-bold py-2 px-4 rounded-full transition-colors w-full shadow-xs"
                id="btn-request-video-demo"
              >
                <Video className="w-4 h-4" />
                <span>Request WhatsApp Video Demo</span>
              </a>
            </div>
          </div>

          {/* Right Column: Details & Ordering */}
          <div className="md:col-span-6 p-6 flex flex-col justify-between space-y-4">
            <div>
              {/* Category & Age Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-[#DBE4FA] text-[#0F3D9C] text-xs font-headline font-bold px-2.5 py-0.5 rounded-full">
                  {product.categoryName}
                </span>
                <span className="bg-[#F4EFE6] text-[#1D1B18] text-xs font-headline font-bold px-2.5 py-0.5 rounded-full">
                  {product.ageLabel}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-headline text-xl sm:text-2xl font-extrabold text-[#1D1B18] leading-tight">
                {product.title}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex items-center text-[#F0A63A] font-bold">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-[#1D1B18] font-headline font-bold">
                    {product.rating}
                  </span>
                </div>
                <span className="text-[#58554F] font-body">
                  ({product.reviewsCount} verified Pakistani parent reviews)
                </span>
              </div>

              {/* Pricing */}
              <div className="mt-4 p-3 bg-white rounded-xl border border-[#EBE5DA] flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline text-2xl font-black text-[#0F3D9C]">
                      Rs. {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#58554F] line-through">
                        Rs. {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-bold text-[#258547] block mt-0.5">
                    Cash on Delivery (0% advance required)
                  </span>
                </div>

                {/* Stock Status */}
                <div className="text-right">
                  {isOutOfStock ? (
                    <span className="inline-block bg-red-100 text-[#C4291F] text-xs font-headline font-bold px-2 py-1 rounded">
                      Out of stock
                    </span>
                  ) : (
                    <span className="inline-block bg-[#EBF7EE] text-[#258547] text-xs font-headline font-bold px-2 py-1 rounded">
                      {product.stock} in stock (Lahore hub)
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm font-body text-[#58554F] mt-3 leading-relaxed">
                {product.fullDescription}
              </p>

              {/* Key Feature Bullets */}
              <div className="mt-4 space-y-1.5">
                <span className="text-xs font-headline font-bold text-[#1D1B18] uppercase tracking-wide">
                  Highlights:
                </span>
                <ul className="space-y-1 text-xs text-[#1D1B18] font-body">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#258547] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safety Badges */}
              <div className="mt-4 pt-3 border-t border-[#EBE5DA] grid grid-cols-2 gap-2 text-xs text-[#58554F]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0F3D9C]" />
                  <span>{product.safetyNotes}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#0F3D9C]" />
                  <span>TCS / Leopards (2-3 days)</span>
                </div>
              </div>
            </div>

            {/* Actions: Quantity + Add to Cart + WhatsApp Order */}
            <div className="pt-4 border-t border-[#EBE5DA] space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Control */}
                <div className="flex items-center border border-[#EBE5DA] rounded-full bg-white p-1 shadow-xs">
                  <button
                    onClick={handleDecrease}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F4EFE6] text-[#1D1B18] font-bold disabled:opacity-30 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-headline text-sm font-bold text-[#1D1B18]">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    disabled={quantity >= product.stock || isOutOfStock}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F4EFE6] text-[#1D1B18] font-bold disabled:opacity-30 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => onAddToCart(product, quantity)}
                  disabled={isOutOfStock}
                  className={`flex-1 font-headline text-sm font-bold py-3 px-4 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                    isAdded
                      ? 'bg-[#258547] text-white'
                      : isOutOfStock
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'btn-push-red text-white'
                  }`}
                  id="modal-add-to-cart-btn"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : isOutOfStock ? (
                    <span>Temporarily Out of Stock</span>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart (Rs. {(product.price * quantity).toLocaleString()})</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct WhatsApp Instant Buy Button */}
              <a
                href={`https://wa.me/923001234567?text=${whatsappOrderMsg}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-headline font-bold py-3 px-4 rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                id="modal-whatsapp-instant-buy"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Instant Order via WhatsApp (COD)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
