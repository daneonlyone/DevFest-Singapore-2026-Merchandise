import React, { useState } from 'react';
import {
  ExternalLink,
  ShoppingBag,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Shirt,
  Info,
  ArrowUpRight,
  Tag,
  ShieldAlert,
  Ticket
} from 'lucide-react';

/**
 * ============================================================================
 * OFFICIAL LUMA LINKS (From https://luma.com/gdgsg-devfest26-swags)
 * ============================================================================
 */
export const LUMA_SWAG_STORE_URL = "https://luma.com/gdgsg-devfest26-swags";
export const LUMA_MAIN_EVENT_URL = "https://luma.com/gdgsg-devfest26";

interface ProductPhoto {
  url: string;
  label: string;
  caption: string;
}

interface SwagItem {
  id: string;
  name: string;
  edition: string;
  priceSGD: number;
  badge?: string;
  badgeColor?: string;
  stockNote?: string;
  description: string;
  perks?: string[];
  sizes?: string[];
  photos: ProductPhoto[];
}

const SWAG_ITEMS: SwagItem[] = [
  {
    id: 'event-tee-2026',
    name: "Event Tee (2026 Edition)",
    edition: "2026 Edition",
    priceSGD: 20,
    badge: "Official Tee + Sticker Sheet",
    badgeColor: "bg-[#4285F4]/20 text-[#60a5fa] border-[#4285F4]/30",
    description: "Every event tee purchase includes an exclusive DevFest Singapore 2026 sticker sheet. Features high-density combed cotton with minimalist front developer branding and official commemorative rear graphics.",
    perks: [
      "Includes exclusive DevFest sticker sheet with every tee",
      "Soft bio-washed combed cotton, pre-shrunk for zero shrinkage",
      "Available in sizes XS through 3XL"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    photos: [
      {
        url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
        label: "Front Flat-lay",
        caption: "Front chest placement with official DevFest Singapore 2026 developer emblem."
      },
      {
        url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80",
        label: "Rear Graphic View",
        caption: "Commemorative rear silkscreen design celebrating the Singapore tech community."
      },
      {
        url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
        label: "Free Included Sticker Sheet",
        caption: "Exclusive DevFest holographic sticker pack included complimentary with each Event Tee."
      }
    ]
  },
  {
    id: 'keycap-keychain-2026',
    name: "Keycap Keychain (2026 Edition)",
    edition: "2026 Edition",
    priceSGD: 5,
    badge: "Limited to 200 Spots",
    badgeColor: "bg-[#FBBC04]/20 text-[#facc15] border-[#FBBC04]/30",
    stockNote: "200 Max Capacity on Luma",
    description: "\"Bring the crisp, satisfying feel of a mechanical switch wherever you go. You won't be able to resist tapping it.\"",
    perks: [
      "Authentic tactile mechanical clicky switch",
      "Custom DevFest Singapore printed keycap",
      "Durable metal keychain clasp for backpacks and lanyards"
    ],
    photos: [
      {
        url: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=80",
        label: "Mechanical Keycap Macro",
        caption: "Tactile clicky switch keycap with custom developer legend and metal clip."
      },
      {
        url: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=1200&q=80",
        label: "Keychain Attachment",
        caption: "Attached to keychain ring ready for backpacks, badges, or key rings."
      }
    ]
  },
  {
    id: 'gdg-keychain-2024',
    name: "GDG Keychain (2024 Edition)",
    edition: "2024 Edition",
    priceSGD: 5,
    badge: "Only 30 Remaining",
    badgeColor: "bg-[#EA4335]/20 text-[#f87171] border-[#EA4335]/30",
    stockNote: "Rare Collector Item • 30 Spots",
    description: "Our exclusive 15th anniversary keychain. Sturdy collector edition celebrating 15 years of Google Developer Group Singapore.",
    perks: [
      "Exclusive GDG 15th Anniversary commemorative design",
      "Gunmetal die-cast finish with enamel core accents",
      "Vintage archive release from 2024"
    ],
    photos: [
      {
        url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80",
        label: "15th Anniversary Keychain",
        caption: "Collector edition metal keychain commemorating GDG Singapore's 15th milestone."
      }
    ]
  },
  {
    id: 'tote-bag-2024',
    name: "Tote Bag (2024 Edition)",
    edition: "2024 Edition",
    priceSGD: 5,
    badge: "Only 50 Remaining",
    badgeColor: "bg-[#34A853]/20 text-[#4ade80] border-[#34A853]/30",
    stockNote: "Limited Archive Batch • 50 Spots",
    description: "Our exclusive 15th anniversary tote bag. Sturdy natural canvas bag built for laptops, notebooks, and conference swag.",
    perks: [
      "Exclusive 15th anniversary anniversary branding",
      "Heavyweight natural unbleached cotton canvas",
      "Reinforced shoulder straps for comfortable daily carry"
    ],
    photos: [
      {
        url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
        label: "15th Anniversary Canvas Tote",
        caption: "Natural raw canvas tote bag with reinforced handles and commemorative graphics."
      }
    ]
  }
];

export default function App() {
  const [activePhotoIndices, setActivePhotoIndices] = useState<Record<string, number>>({
    'event-tee-2026': 0,
    'keycap-keychain-2026': 0,
    'gdg-keychain-2024': 0,
    'tote-bag-2024': 0
  });

  const [lightboxData, setLightboxData] = useState<{
    item: SwagItem;
    photoIndex: number;
  } | null>(null);

  const [sizeChartOpen, setSizeChartOpen] = useState(false);

  const handleSelectPhoto = (itemId: string, index: number) => {
    setActivePhotoIndices((prev) => ({ ...prev, [itemId]: index }));
  };

  const openLightbox = (item: SwagItem, photoIndex: number) => {
    setLightboxData({ item, photoIndex });
  };

  const nextLightboxPhoto = () => {
    if (!lightboxData) return;
    const total = lightboxData.item.photos.length;
    setLightboxData({
      ...lightboxData,
      photoIndex: (lightboxData.photoIndex + 1) % total
    });
  };

  const prevLightboxPhoto = () => {
    if (!lightboxData) return;
    const total = lightboxData.item.photos.length;
    setLightboxData({
      ...lightboxData,
      photoIndex: (lightboxData.photoIndex - 1 + total) % total
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-100 flex flex-col font-sans selection:bg-[#4285F4]/30 selection:text-white">
      {/* Google 4-Color Accent Strip */}
      <div className="h-1.5 w-full grid grid-cols-4 sticky top-0 z-50">
        <div className="bg-[#4285F4]"></div>
        <div className="bg-[#EA4335]"></div>
        <div className="bg-[#FBBC04]"></div>
        <div className="bg-[#34A853]"></div>
      </div>

      {/* Top Navigation */}
      <nav className="border-b border-slate-800 bg-[#0d121f]/95 backdrop-blur-md sticky top-1.5 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://images.lumacdn.com/uploads/db/cec1bb69-b7c1-43c1-af7e-e8ec09746964.jpg"
              alt="GDG Singapore"
              className="w-9 h-9 rounded-full border border-slate-700 object-cover"
            />
            <div>
              <span className="font-bold text-white text-sm sm:text-base">DevFest Singapore 2026</span>
              <p className="text-[11px] text-slate-400">Official Swag Photo Lookbook</p>
            </div>
          </div>

          <a
            href={LUMA_SWAG_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#4285F4] to-[#2563eb] hover:from-[#3b82f6] hover:to-[#1d4ed8] text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/20 active:scale-95 transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Pre-order on Luma</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 w-full">
        {/* Banner from Luma */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
          <img
            src="https://images.lumacdn.com/uploads/4n/69b42d2b-5eb8-4023-a12b-65de4f83589f.png"
            alt="DevFest Singapore 2026: Event Swags"
            className="w-full h-48 sm:h-64 object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/60 to-transparent flex flex-col justify-end p-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4285F4] mb-1">
              GDG Singapore Community Store
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              DevFest Singapore 2026: Event Swags
            </h1>
          </div>
        </div>

        {/* Intro & Event Notice */}
        <div className="bg-[#101524] border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
              <Calendar className="w-4 h-4 text-[#4285F4] shrink-0" />
              <span>Saturday, November 28, 2026 • 9:30 AM – 6:00 PM SGT</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-[#EA4335] shrink-0" />
              <span>Google Singapore, 80 Pasir Panjang Rd</span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            As Luma ticketing does not display photo galleries, this official webpage provides high-resolution photos and details of every commemorative merchandise item available for pre-order.
          </p>

          {/* Important Entry Ticket Disclaimer from Luma page */}
          <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/60 flex items-start gap-3 text-xs sm:text-sm text-blue-200">
            <Info className="w-5 h-5 text-[#38bdf8] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p>
                <strong>Merchandise Collection Note:</strong> Swag tickets on Luma are exclusively for merchandise purchases and onsite collection.
              </p>
              <p className="text-xs text-blue-300">
                Please ensure you register through the{' '}
                <a
                  href={LUMA_MAIN_EVENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline text-white hover:text-blue-100"
                >
                  Main DevFest Conference Page
                </a>{' '}
                to secure your conference entry admission.
              </p>
            </div>
          </div>

          {/* Direct CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={LUMA_SWAG_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#4285F4] to-[#2563eb] text-white font-bold text-sm shadow-lg hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Open Official Luma Swag Store</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => setSizeChartOpen(true)}
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition flex items-center justify-center gap-1.5"
            >
              <Shirt className="w-4 h-4 text-[#38bdf8]" />
              <span>View T-Shirt Sizing Chart</span>
            </button>
          </div>
        </div>

        {/* Merchandise Visual Photo Gallery Cards */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-xl font-bold text-white">Merchandise Photos & Details</h2>
              <p className="text-xs text-slate-400">Click any image to enlarge in full-screen zoom</p>
            </div>
            <a
              href={LUMA_SWAG_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#60a5fa] hover:underline flex items-center gap-1"
            >
              Luma Checkout
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="space-y-8">
            {SWAG_ITEMS.map((item) => {
              const activeIndex = activePhotoIndices[item.id] || 0;
              const currentPhoto = item.photos[activeIndex] || item.photos[0];

              return (
                <article
                  key={item.id}
                  className="bg-[#101524] border border-slate-800 rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-12 transition hover:border-slate-700"
                >
                  {/* Photo Column */}
                  <div className="md:col-span-7 bg-[#090d16] p-4 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
                    <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 group cursor-pointer">
                      <img
                        src={currentPhoto.url}
                        alt={`${item.name} - ${currentPhoto.label}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onClick={() => openLightbox(item, activeIndex)}
                        loading="lazy"
                      />

                      <button
                        onClick={() => openLightbox(item, activeIndex)}
                        className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-lg bg-black/75 hover:bg-black text-white text-xs font-medium flex items-center gap-1.5 transition"
                        title="Click to zoom photo"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                        <span>Enlarge Photo</span>
                      </button>

                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] font-medium">
                        {currentPhoto.label}
                      </div>
                    </div>

                    <div className="pt-3 space-y-2">
                      <p className="text-xs text-slate-400 italic">
                        "{currentPhoto.caption}"
                      </p>

                      {/* Photo Thumbnails */}
                      {item.photos.length > 1 && (
                        <div className="flex items-center gap-2 pt-1">
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                            Photos:
                          </span>
                          <div className="flex gap-2">
                            {item.photos.map((photo, pIdx) => (
                              <button
                                key={pIdx}
                                onClick={() => handleSelectPhoto(item.id, pIdx)}
                                className={`text-xs px-2.5 py-1 rounded-md transition ${
                                  activeIndex === pIdx
                                    ? 'bg-[#4285F4] text-white font-semibold shadow-sm'
                                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                                }`}
                              >
                                {photo.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Details Column */}
                  <div className="md:col-span-5 p-6 flex flex-col justify-between space-y-4 bg-[#101524]">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        {item.badge && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                        )}
                        <span className="text-xs font-mono text-slate-400">
                          {item.edition}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white leading-snug">
                        {item.name}
                      </h3>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.description}
                      </p>

                      {item.perks && (
                        <ul className="space-y-1.5 text-xs text-slate-300 pt-1">
                          {item.perks.map((perk, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#34A853] mt-0.5">✓</span>
                              <span>{perk}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {item.sizes && (
                        <div className="pt-2 text-xs text-slate-400 border-t border-slate-800">
                          <div className="flex items-center justify-between">
                            <span>Available Sizes on Luma:</span>
                            <button
                              onClick={() => setSizeChartOpen(true)}
                              className="text-[#38bdf8] hover:underline text-[11px]"
                            >
                              Size Chart ↗
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {item.sizes.map((s) => (
                              <span key={s} className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-200 border border-slate-700">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.id === 'event-tee-2026' && (
                        <p className="text-[11px] text-slate-400 italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                          💡 <strong>Multiple tees:</strong> On Luma checkout, enter multiple sizes like: <code>"XS - 2, M - 4"</code>.
                        </p>
                      )}
                    </div>

                    {/* Price and Pre-order Button */}
                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-2xl font-extrabold text-white">
                          SGD ${item.priceSGD}
                        </span>
                      </div>

                      <a
                        href={LUMA_SWAG_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#4285F4] to-[#2563eb] hover:from-[#3b82f6] hover:to-[#1d4ed8] text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Pre-order on Luma</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Strict Refund & Exchange Policy Notice from Luma */}
        <section className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 text-amber-200 text-xs sm:text-sm space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-bold">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Strict No-Refund and No-Exchange Policy (by GDG Singapore)</span>
          </div>
          <p className="leading-relaxed text-amber-200/90 text-xs">
            All transactions and merchandise purchases completed through the Luma platform are strictly non-refundable and non-exchangeable. Please double-check your sizing and item selection before completing payment.
          </p>
        </section>

        {/* Pickup Details */}
        <section className="bg-[#0f1422] border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-white text-base">Onsite Collection Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-white block">📍 Venue</span>
              <p className="text-slate-400">Google Singapore, Mapletree Business City II, 80 Pasir Panjang Rd, Singapore 117372</p>
            </div>
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-white block">⏰ Time & Date</span>
              <p className="text-slate-400">Saturday, Nov 28, 2026 • 9:30 AM – 6:00 PM SGT during conference hours.</p>
            </div>
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-white block">🎟️ What to Bring</span>
              <p className="text-slate-400">Flash your Luma digital ticket QR pass on your phone to our swag counter staff.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Sizing Chart Modal */}
      {sizeChartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#111728] border border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold text-xs">
                  <Shirt className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white uppercase tracking-tight">
                    CT51 Unisex T-Shirts
                  </h3>
                  <p className="text-[11px] font-medium text-orange-400 tracking-wider">
                    -COMFY COTTON
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSizeChartOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Visual Measurement Diagram & Info */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              {/* T-Shirt Diagram Graphic */}
              <div className="sm:col-span-5 flex justify-center">
                <svg viewBox="0 0 200 200" className="w-36 h-36 text-slate-300" fill="none">
                  {/* T-Shirt Outline */}
                  <path d="M60 48 L76 58 C86 62 114 62 124 58 L140 48 L174 74 L154 98 L138 86 L138 165 C138 169 135 172 131 172 L69 172 C65 172 62 169 62 165 L62 86 L46 98 L26 74 Z" stroke="#94a3b8" strokeWidth="2.5" fill="#1e293b" />
                  <path d="M76 58 C86 70 114 70 124 58" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                  {/* Shoulder Indicator */}
                  <path d="M45 42 H155" stroke="#f97316" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="100" y="38" textAnchor="middle" fill="#f97316" fontSize="9" fontWeight="bold">SHOULDER</text>
                  {/* Chest Indicator */}
                  <path d="M56 104 H144" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="100" y="100" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">CHEST</text>
                  {/* Sleeve Indicator */}
                  <text x="165" y="60" textAnchor="middle" fill="#a855f7" fontSize="8" fontWeight="bold" transform="rotate(35 165 60)">SLEEVE</text>
                  {/* Length Indicator */}
                  <path d="M30 48 V172" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="25" y="112" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="bold" transform="rotate(-90 25 112)">LENGTH</text>
                </svg>
              </div>

              {/* Guide Note */}
              <div className="sm:col-span-7 space-y-1.5 text-xs text-slate-300">
                <span className="font-semibold text-white block">Official Size Guide</span>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  All measurements below are shown in inches (") for available event sizes.
                  Please consult your chest and shoulder measurements to select the best fit.
                </p>
                <div className="inline-block px-2 py-1 rounded bg-orange-500/15 border border-orange-500/30 text-orange-300 text-[10px] font-mono">
                  Available for DevFest Singapore: XS to 3XL
                </div>
              </div>
            </div>

            {/* CT51 Size Table (Only Available Sizes) */}
            <div className="overflow-x-auto border border-slate-800 rounded-xl">
              <table className="w-full text-center text-xs">
                <thead>
                  <tr className="bg-[#E65100] text-white font-bold text-xs uppercase tracking-wider">
                    <th className="py-2.5 px-3 border-r border-orange-700/50">Size</th>
                    <th className="py-2.5 px-3 border-r border-orange-700/50">Shoulder</th>
                    <th className="py-2.5 px-3 border-r border-orange-700/50">Chest</th>
                    <th className="py-2.5 px-3 border-r border-orange-700/50">Sleeve</th>
                    <th className="py-2.5 px-3">Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-mono text-slate-300 bg-[#0c111e]">
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-bold text-white border-r border-slate-800">XS</td>
                    <td className="py-2.5 px-3 border-r border-slate-800">15"</td>
                    <td className="py-2.5 px-3 border-r border-slate-800 font-semibold text-[#38bdf8]">36"</td>
                    <td className="py-2.5 px-3 border-r border-slate-800">7.5"</td>
                    <td className="py-2.5 px-3">26"</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-bold text-white border-r border-slate-800">S</td>
                    <td className="py-2.5 px-3 border-r border-slate-800">16"</td>
                    <td className="py-2.5 px-3 border-r border-slate-800 font-semibold text-[#38bdf8]">38"</td>
                    <td className="py-2.5 px-3 border-r border-slate-800">8"</td>
                    <td className="py-2.5 px-3">27"</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-bold text-white border-r border-slate-800">M</td>
                    <td className="py-2.5 px-3 border-r border-slate-800">17"</td>
                    <td className="py-2.5 px-3 border-r border-slate-800 font-semibold text-[#38bdf8]">40"</td>
                    <td className="py-2.5 px-3 border-r border-slate-800">8.5"</td>
                    <td className="py-2.5 px-3">28"</td>
                  </tr>
                  <tr className="bg-blue-500/10 hover:bg-blue-500/15">
                    <td className="py-2.5 px-3 font-bold text-white border-r border-slate-800">L</td>
                    <td className="py-2.5 px-3 border-r border-slate-800">18"</td>
                    <td className="py-2.5 px-3 border-r border-slate-800 font-semibold text-[#38bdf8]">42"</td>
                    <td className="py-2.5 px-3 border-r border-slate-800">9"</td>
                    <td className="py-2.5 px-3">29"</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-bold text-white border-r border-slate-800">XL</td>
                    <td className="py-2.5 px-3 border-r border-slate-800">19"</td>
                    <td className="py-2.5 px-3 border-r border-slate-800 font-semibold text-[#38bdf8]">44"</td>
                    <td className="py-2.5 px-3 border-r border-slate-800">9.5"</td>
                    <td className="py-2.5 px-3">30"</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-bold text-white border-r border-slate-800">2XL</td>
                    <td className="py-2.5 px-3 border-r border-slate-800">20"</td>
                    <td className="py-2.5 px-3 border-r border-slate-800 font-semibold text-[#38bdf8]">46"</td>
                    <td className="py-2.5 px-3 border-r border-slate-800">10"</td>
                    <td className="py-2.5 px-3">31"</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-bold text-white border-r border-slate-800">3XL</td>
                    <td className="py-2.5 px-3 border-r border-slate-800">21"</td>
                    <td className="py-2.5 px-3 border-r border-slate-800 font-semibold text-[#38bdf8]">48"</td>
                    <td className="py-2.5 px-3 border-r border-slate-800">10.5"</td>
                    <td className="py-2.5 px-3">32"</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-slate-400">
              <span className="italic">* Measurement may vary +/- 5%.</span>
              <button
                onClick={() => setSizeChartOpen(false)}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition"
              >
                Close Sizing Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Zoom Modal */}
      {lightboxData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          onClick={() => setLightboxData(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxData(null)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black border border-slate-800">
              <img
                src={lightboxData.item.photos[lightboxData.photoIndex].url}
                alt={lightboxData.item.name}
                className="max-w-full max-h-[75vh] object-contain rounded-xl"
              />

              {lightboxData.item.photos.length > 1 && (
                <>
                  <button
                    onClick={prevLightboxPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/20 transition"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextLightboxPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/20 transition"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div className="w-full mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300 bg-slate-900/90 px-4 py-3 rounded-xl border border-slate-800">
              <div>
                <span className="font-bold text-white mr-2">{lightboxData.item.name}</span>
                <span className="text-slate-400">
                  ({lightboxData.photoIndex + 1} of {lightboxData.item.photos.length}) — {lightboxData.item.photos[lightboxData.photoIndex].caption}
                </span>
              </div>
              <a
                href={LUMA_SWAG_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-[#4285F4] hover:bg-blue-600 text-white font-semibold transition flex items-center gap-1.5 shrink-0"
              >
                <span>Order on Luma (SGD ${lightboxData.item.priceSGD})</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#090d15] text-slate-400 text-xs py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-semibold text-white">DevFest Singapore 2026 • GDG Singapore</p>
            <p className="text-[11px] text-slate-400">Independent community event organized by Google Developer Group Singapore.</p>
          </div>
          <div className="flex items-center justify-center gap-4 text-xs">
            <a href={LUMA_SWAG_STORE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Luma Swags</a>
            <span className="text-slate-600">•</span>
            <a href={LUMA_MAIN_EVENT_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Event Registration</a>
            <span className="text-slate-600">•</span>
            <a href="https://gdg.community.dev/gdg-singapore/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GDG Chapter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
