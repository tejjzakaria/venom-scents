import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProduct, getProducts, getStore, resolveContent } from '../../../lib/api';
import { getLocale } from '../../actions/locale';
import ProductView from '../../../components/ProductView';
import type { StoreContent } from '../../../lib/api';
import { getTranslations } from '../../../lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product  = await getProduct(slug);
  return { title: product?.name ?? 'Product' };
}

// ─── How to Use ──────────────────────────────────────────────────────────────

const DEFAULT_HOW_TO_USE_STEPS = [
  { step: "01", title: "Choose Pulse Points", description: "Apply to wrists, neck, and behind the ears for maximum projection and longevity." },
  { step: "02", title: "Don't Rub — Let It Breathe", description: "Rubbing breaks the fragrance molecules. Let the scent dry naturally on your skin." },
  { step: "03", title: "Layer for All-Day Wear", description: "Start with an unscented moisturiser to lock in the scent and extend wear throughout the day." },
  { step: "04", title: "Store Correctly", description: "Keep your bottle away from heat and direct light — a cool, dark spot preserves the fragrance for longer." },
];

function HowToUse({ content }: { content?: NonNullable<StoreContent['product']>['howToUse'] }) {
  const eyebrow  = content?.eyebrow  ?? "Application Guide";
  const headline = content?.headline ?? "How to Get the Most Out of Your Scent";
  const steps    = content?.steps    ?? DEFAULT_HOW_TO_USE_STEPS;

  return (
    <section className="w-full py-14 lg:py-20 bg-[#0A0A0A]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <div className="text-center mb-10 lg:mb-14">
          <p className="text-[var(--color-primary)] font-sans text-xs uppercase tracking-[0.2em] mb-3">{eyebrow}</p>
          <h2 className="text-white font-serif font-bold text-2xl md:text-3xl lg:text-[40px] leading-[1.15]">{headline}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.step} className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[var(--color-primary)]/40 transition-colors">
              <span className="block text-[var(--color-primary)] font-serif font-bold text-4xl mb-4 opacity-60">{s.step}</span>
              <h3 className="text-white font-bold font-sans text-base mb-2">{s.title}</h3>
              <p className="text-white/50 font-sans text-sm leading-[1.6]">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Venom ───────────────────────────────────────────────────────────────

const WHY_ICONS = [
  <svg key="ph" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  <svg key="cl" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>,
  <svg key="vg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  <svg key="pr" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12,2 15,8 22,9 17,14 18,21 12,18 6,21 7,14 2,9 9,8"/></svg>,
];

const DEFAULT_WHY_ITEMS = [
  { title: "Pheromone-Infused Formula", description: "Our signature blend enhances your natural chemistry for an irresistible, magnetic effect." },
  { title: "12+ Hour Longevity",        description: "Engineered to last from morning to midnight without a single reapplication." },
  { title: "Vegan & Cruelty-Free",      description: "No animal testing, no compromise. Beauty that feels as good as it smells." },
  { title: "Premium Ingredients",       description: "Sourced from the world's finest fragrance houses, including Grasse, France." },
];

function WhyVenom({ content }: { content?: NonNullable<StoreContent['product']>['whyUs'] }) {
  const eyebrow  = content?.eyebrow  ?? "Why Venom";
  const headline = content?.headline ?? "Crafted to a Different Standard";
  const items    = content?.items    ?? DEFAULT_WHY_ITEMS;

  return (
    <section className="w-full py-14 lg:py-20 bg-[#FFF8F8]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <div className="text-center mb-10 lg:mb-14">
          <p className="text-[var(--color-primary)] font-sans text-xs uppercase tracking-[0.2em] mb-3">{eyebrow}</p>
          <h2 className="text-black font-serif font-bold text-2xl md:text-3xl lg:text-[40px] leading-[1.15]">{headline}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#F5E6E6] p-6" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
              <div className="w-11 h-11 rounded-xl border border-[#F5E6E6] bg-[#FFF8F8] flex items-center justify-center mb-4">
                {WHY_ICONS[i % WHY_ICONS.length]}
              </div>
              <h3 className="text-[#0F0F0F] font-bold font-sans text-sm mb-2">{item.title}</h3>
              <p className="text-[#777] font-sans text-xs leading-[1.6]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── You May Also Like ───────────────────────────────────────────────────────

function RelatedProducts({ products, labels }: { products: { slug: string; name: string; price: number; originalPrice: number | null; images: string[]; tag: string }[]; labels: { discoverMore: string; youMayLike: string; viewAll: string } }) {
  if (products.length === 0) return null;

  return (
    <section className="w-full py-14 lg:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <div className="flex items-end justify-between mb-8 lg:mb-10">
          <div>
            <p className="text-[var(--color-primary)] font-sans text-xs uppercase tracking-[0.2em] mb-2">{labels.discoverMore}</p>
            <h2 className="text-[#0F0F0F] font-serif font-bold text-2xl lg:text-3xl">{labels.youMayLike}</h2>
          </div>
          <Link href="/shop" className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold font-sans text-[var(--color-primary)] hover:underline">
            {labels.viewAll}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {products.map((p) => {
            const price    = p.price;
            const original = p.originalPrice ?? price;
            const savings  = original > price ? Math.round(((original - price) / original) * 100) : 0;
            const image    = p.images[0] ?? null;

            return (
              <Link
                key={p.slug}
                href={`/shop/${p.slug}`}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="relative aspect-square bg-[#F5F0F8] overflow-hidden">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs font-sans">No image</div>
                  )}
                  {p.tag && (
                    <span className="absolute top-2 ltr:left-2 rtl:right-2 bg-[var(--color-primary)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{p.tag}</span>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-[#0F0F0F] font-bold font-sans text-sm leading-snug mb-2">{p.name}</h3>
                  <div className="flex items-center gap-2 mt-auto">
                    <span className="text-[#0F0F0F] font-bold text-sm">{price.toFixed(2)} MAD</span>
                    {original > price && <span className="text-gray-400 line-through text-xs">{original.toFixed(2)}</span>}
                    {savings > 0 && <span className="bg-[var(--color-primary)] text-white text-[9px] font-bold px-1.5 py-0.5 rounded ms-auto">-{savings}%</span>}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [product, all, store, locale] = await Promise.all([
    getProduct(slug),
    getProducts({ limit: 100 }),
    getStore(),
    getLocale(),
  ]);

  if (!product || product.status !== 'Active') notFound();

  const sc = resolveContent(store, locale)?.product;
  const pt = getTranslations(locale).productPage;

  const scents = all.filter(p => p.slug !== product.slug);

  // Related: same category first, then fill with top-sold from others — max 4
  const sameCategory = all.filter(p => p.slug !== product.slug && p.category === product.category);
  const others       = all.filter(p => p.slug !== product.slug && p.category !== product.category)
                           .sort((a, b) => b.sold - a.sold);
  const related = [...sameCategory, ...others].slice(0, 4);

  return (
    <>
      <ProductView product={product} scents={scents} locale={locale} />
      <HowToUse   content={sc?.howToUse} />
      <WhyVenom   content={sc?.whyUs} />
      <RelatedProducts products={related} labels={pt} />
    </>
  );
}
