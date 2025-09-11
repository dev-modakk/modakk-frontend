'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  LuStar,
  LuHeart,
  LuShoppingCart,
  LuTruck,
  LuRotateCw,
  LuShieldCheck,
  LuCircleCheckBig,
  LuMinus,
  LuPlus,
  LuShare2,
  LuCopy,
  LuChevronDown,
  LuArrowLeft,
} from 'react-icons/lu';
import { Footer } from '@/components';


type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  images: string[];
  category: string; // used to route back to Kids / Baby listings
  ageRange: string;
  description: string;
  badge?: string;
  inStock: boolean;
  featured: boolean;
  features?: string[];
  whatsIncluded?: string[];
};

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Epic Squishmallow Fun',
    price: 39.95,
    originalPrice: 49.95,
    rating: 4.8,
    reviews: 124,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1520975922324-6c2d9b1c3bfe?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1545249390-6bdfa286032b?w=1200&h=900&fit=crop',
    ],
    category: 'Plush & Comfort', // kids
    ageRange: '3-8 years',
    description:
      'Adorable squishmallow collection with unicorn themes and cozy accessories for snuggle time.',
    badge: 'Popular',
    inStock: true,
    featured: true,
    features: [
      'Ultra-soft, kid-safe materials',
      'Machine-washable covers',
      'Hypoallergenic fill',
      'Ethically sourced',
    ],
    whatsIncluded: ['1 × 5" Squishmallow', 'Mini stickers', 'Greeting card'],
  },
  {
    id: '2',
    name: 'Newborn Essentials Bundle',
    price: 89.95,
    originalPrice: 109.95,
    rating: 4.9,
    reviews: 245,
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1495556650867-99590cea3652?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=900&fit=crop',
    ],
    category: 'Newborn Care', // baby
    ageRange: '0-3 months',
    description:
      'Everything new parents need including organic cotton clothes, blankets, and gentle care products.',
    badge: 'Bestseller',
    inStock: true,
    featured: true,
    features: [
      'GOTS-certified organic cotton',
      'Dermatologist-tested skincare',
      'Breathable swaddles',
      'Newborn-safe materials',
    ],
    whatsIncluded: [
      '2 × Organic onesies',
      '1 × Swaddle blanket',
      '1 × Gentle baby wash',
      '1 × Greeting card',
    ],
  },
  {
    id: '3',
    name: 'Science Explorer Kit',
    price: 69.95,
    rating: 4.9,
    reviews: 89,
    images: [
      'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=900&fit=crop',
    ],
    category: 'Educational', // kids
    ageRange: '6-12 years',
    description:
      'Educational experiments and discovery tools to spark curiosity and scientific thinking.',
    badge: 'New',
    inStock: true,
    featured: true,
    features: ['Step-by-step guides', 'Safe experiments', 'Reusable lab tools'],
    whatsIncluded: ['Beakers & tubes', 'Magnifier', 'Experiment cards'],
  },
  {
    id: '4',
    name: "Baby's First Books Collection",
    price: 34.95,
    rating: 4.8,
    reviews: 198,
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&h=900&fit=crop',
    ],
    category: 'Books & Storytelling', // baby
    ageRange: '0-12 months',
    description:
      'Soft fabric books, board books, and interactive story collections perfect for bedtime reading.',
    badge: 'Bestseller',
    inStock: true,
    featured: true,
    features: ['Tear-resistant', 'Non-toxic inks', 'High-contrast patterns'],
    whatsIncluded: ['3 × Board books', '1 × Soft fabric book'],
  },
];

const categoryToListHref = (category: string) => {
  // Basic route mapping for breadcrumbs
  const babyCats = new Set([
    'Newborn Care',
    'Development & Learning',
    'Feeding & Nutrition',
    'Books & Storytelling',
    'Bath & Hygiene',
    'Sleep & Comfort',
    'Play & Activity',
    'Clothing & Accessories',
  ]);
  return babyCats.has(category) ? '/baby-gift-boxes' : '/kids-gift-boxes';
};

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [specOpen, setSpecOpen] = useState(true);
  const [shipOpen, setShipOpen] = useState(true);
  const [faqOpen, setFaqOpen] = useState(false);

  const product = useMemo(
    () => PRODUCTS.find((p) => p.id === params.id),
    [params.id]
  );

  const related = useMemo(() => {
    if (!product) return [];
    const pool = PRODUCTS.filter((p) => p.id !== product.id);
    const sameCategory = pool.filter((p) => p.category === product.category);
    return (sameCategory.length ? sameCategory : pool).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-2xl font-semibold text-slate-900 mb-2">Product not found</p>
          <p className="text-slate-600 mb-6">The item you’re looking for doesn’t exist.</p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50"
            >
              <LuArrowLeft className="w-4 h-4" />
              Go back
            </button>
            <Link
              href="/kids-gift-boxes"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Browse Gift Boxes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(100 - (product.price / product.originalPrice) * 100)
      : 0;

  const handleAddToCart = () => {
    if (!product.inStock) return;
    console.log('Add to cart', { productId: product.id, qty });
  };

  const handleBuyNow = () => {
    if (!product.inStock) return;
    console.log('Buy now', { productId: product.id, qty });
  };

  const validatePincode = () => {
    const ok = /^\d{6}$/.test(pincode);
    setPincodeStatus(ok ? 'valid' : 'invalid');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      // noop
    }
  };

  return (
    <>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Breadcrumbs */}
          <nav className="text-sm text-slate-500 mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-slate-900">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href={categoryToListHref(product.category)}
                  className="hover:text-slate-900"
                >
                  {categoryToListHref(product.category) === '/baby-gift-boxes'
                    ? 'Baby Gift Boxes'
                    : 'Kids Gift Boxes'}
                </Link>
              </li>
              <li>/</li>
              <li className="text-slate-900 truncate max-w-[50vw]">{product.name}</li>
            </ol>
          </nav>

          {/* Main layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Gallery */}
            <section>
              <div className="aspect-square w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <img
                  src={product.images[selectedIndex]}
                  alt={`${product.name} image ${selectedIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 gap-3">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedIndex(i)}
                    className={`aspect-square rounded-xl overflow-hidden border transition ${selectedIndex === i
                      ? 'border-blue-600 ring-2 ring-blue-200'
                      : 'border-slate-200 hover:border-slate-300'
                      }`}
                    aria-label={`Show image ${i + 1}`}
                  >
                    <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </section>

            {/* Details */}
            <section>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    {product.name}
                  </h1>
                  <p className="text-sm text-slate-600 mt-1">
                    {product.category} • {product.ageRange}
                  </p>
                </div>

                <button
                  onClick={() => setWishlisted((w) => !w)}
                  className="p-2 rounded-lg border border-slate-300 hover:bg-slate-50"
                  aria-label="Toggle wishlist"
                >
                  <LuHeart
                    className={`w-5 h-5 ${wishlisted ? 'fill-red-500 text-red-500' : 'text-slate-500'}`}
                  />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <LuStar
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-slate-300'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-600">
                  {product.rating.toFixed(1)} • {product.reviews} reviews
                </span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-end gap-3">
                <div className="text-3xl font-bold text-slate-900">
                  ${product.price.toFixed(2)}
                </div>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <div className="text-slate-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </div>
                    {discount > 0 && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                        {discount}% OFF
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Availability */}
              <div className="mt-2">
                {product.inStock ? (
                  <span className="inline-flex items-center gap-2 text-green-700 text-sm font-medium">
                    <LuCircleCheckBig className="w-4 h-4" /> In stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-slate-500 text-sm font-medium">
                    Out of stock
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-4 text-slate-700 leading-relaxed">{product.description}</p>

              {/* Qty + CTA */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <div className="inline-flex items-center border border-slate-300 rounded-xl overflow-hidden w-fit">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 hover:bg-slate-50"
                    aria-label="Decrease quantity"
                  >
                    <LuMinus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 min-w-[3rem] text-center font-medium">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(10, q + 1))}
                    className="px-3 py-2 hover:bg-slate-50"
                    aria-label="Increase quantity"
                  >
                    <LuPlus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition ${product.inStock
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    }`}
                >
                  <LuShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition ${product.inStock
                    ? 'bg-slate-900 hover:bg-black text-white'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    }`}
                >
                  Buy Now
                </button>
              </div>

              {/* Share / Copy */}
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({
                          title: product.name,
                          url: typeof window !== 'undefined' ? window.location.href : '',
                        })
                        .catch(() => { });
                    } else {
                      copyLink();
                    }
                  }}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50"
                >
                  <LuShare2 className="w-4 h-4" />
                  Share
                </button>
                <button
                  onClick={copyLink}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50"
                >
                  <LuCopy className="w-4 h-4" />
                  Copy link
                </button>
              </div>

              {/* Pincode / Shipping */}
              <div className="mt-6 rounded-2xl border border-slate-200">
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 rounded-t-2xl text-sm font-semibold text-slate-700">
                  Delivery & Returns
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1">
                      <label htmlFor="pincode" className="block text-sm font-medium text-slate-700 mb-1">
                        Check delivery (India pincode)
                      </label>
                      <input
                        id="pincode"
                        value={pincode}
                        onChange={(e) => {
                          setPincode(e.target.value.replace(/\D/g, '').slice(0, 6));
                          setPincodeStatus('idle');
                        }}
                        placeholder="e.g. 560001"
                        className="w-full sm:w-64 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        inputMode="numeric"
                      />
                    </div>
                    <button
                      onClick={validatePincode}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    >
                      Check
                    </button>
                  </div>

                  {pincodeStatus !== 'idle' && (
                    <div className={`text-sm ${pincodeStatus === 'valid' ? 'text-green-700' : 'text-red-600'}`}>
                      {pincodeStatus === 'valid'
                        ? 'Delivery available. Standard shipping 3–6 business days.'
                        : 'Please enter a valid 6-digit Indian pincode.'}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <LuTruck className="w-4 h-4 text-slate-500" />
                      Free shipping on orders over $49
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <LuRotateCw className="w-4 h-4 text-slate-500" />
                      Easy 7-day returns
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <LuShieldCheck className="w-4 h-4 text-slate-500" />
                      Secure checkout
                    </div>
                  </div>
                </div>
              </div>

              {/* Specs / In the box (Accordion) */}
              <div className="mt-6 space-y-3">
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setSpecOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-slate-50"
                  >
                    <span className="text-sm font-semibold text-slate-800">What’s inside & Features</span>
                    <LuChevronDown className={`w-4 h-4 transition-transform ${specOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {specOpen && (
                    <div className="px-4 pb-4 pt-1">
                      {product.whatsIncluded?.length ? (
                        <>
                          <p className="text-sm font-medium text-slate-700 mb-2">What’s included</p>
                          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1 mb-3">
                            {product.whatsIncluded.map((it, i) => (
                              <li key={i}>{it}</li>
                            ))}
                          </ul>
                        </>
                      ) : null}
                      {product.features?.length ? (
                        <>
                          <p className="text-sm font-medium text-slate-700 mb-2">Key features</p>
                          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                            {product.features.map((f, i) => (
                              <li key={i}>{f}</li>
                            ))}
                          </ul>
                        </>
                      ) : null}
                    </div>
                  )}
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setShipOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-slate-50"
                  >
                    <span className="text-sm font-semibold text-slate-800">Shipping & Returns</span>
                    <LuChevronDown className={`w-4 h-4 transition-transform ${shipOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {shipOpen && (
                    <div className="px-4 pb-4 pt-1 text-sm text-slate-700">
                      Standard delivery in 3–6 business days. Easy 7-day returns on unopened items. Support available
                      7 days a week.
                    </div>
                  )}
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setFaqOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-slate-50"
                  >
                    <span className="text-sm font-semibold text-slate-800">FAQ</span>
                    <LuChevronDown className={`w-4 h-4 transition-transform ${faqOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {faqOpen && (
                    <div className="px-4 pb-4 pt-1 text-sm text-slate-700 space-y-2">
                      <p className="font-medium">Is this safe for my child?</p>
                      <p>Yes. All products meet international standards for child safety and use non-toxic materials.</p>
                      <p className="font-medium">Can I include a gift message?</p>
                      <p>Absolutely. Add a personalized message at checkout; we’ll print it on a premium card.</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-bold text-slate-900 mb-4">You may also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((r) => (
                  <div
                    key={r.id}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                  >
                    <Link href={`/product/${r.id}`} className="block">
                      <div className="relative">
                        <img
                          src={r.images[0]}
                          alt={r.name}
                          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {r.badge && (
                          <div className="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-bold bg-blue-600 text-white pointer-events-none">
                            {r.badge}
                          </div>
                        )}
                        {!r.inStock && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                            <span className="text-white font-semibold bg-red-600 px-2 py-1 rounded">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        <h3 className="font-semibold text-slate-900 line-clamp-2">{r.name}</h3>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <LuStar
                                key={i}
                                className={`w-3 h-3 ${i < Math.floor(r.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-slate-300'
                                  }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-slate-500">({r.reviews})</span>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          {r.originalPrice && r.originalPrice > r.price && (
                            <span className="text-sm text-slate-400 line-through">
                              ${r.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="text-lg font-bold text-slate-900">
                            ${r.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
