import { getStore, getProducts, resolveContent } from "../lib/api";
import { getLocale } from "./actions/locale";
import Hero from "../components/Hero";
import Collection, { BG_COLORS } from "../components/Collection";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import Bestsellers from "../components/Bestsellers";
import Benefits from "../components/Benefits";
import Reviews from "../components/Reviews";

export default async function Home() {
  const [store, locale, products] = await Promise.all([
    getStore(),
    getLocale(),
    getProducts(),
  ]);
  const sc         = resolveContent(store, locale);
  const c          = sc?.home;
  const reviewsContent = c?.reviews ?? undefined;

  // Derive category cards — one card per unique category using first product image
  const categoryMap = new Map<string, string>();
  for (const p of products) {
    if (p.category && !categoryMap.has(p.category) && p.images[0]) {
      categoryMap.set(p.category, p.images[0]);
    }
  }
  const firstImage = products.find(p => p.images[0])?.images[0] ?? '/images/collection1.webp';
  const categories = [
    { name: 'All Products', image: firstImage, bgColor: BG_COLORS[0] },
    ...Array.from(categoryMap.entries()).slice(0, 5).map(([name, image], i) => ({
      name,
      image,
      bgColor: BG_COLORS[(i + 1) % BG_COLORS.length],
    })),
  ];

  // Derive bestsellers — top 4 by units sold
  const bestsellers = [...products]
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 4);

  return (
    <div className="flex flex-col flex-1">
      <Hero         content={c?.hero} />
      <Collection   categories={categories} locale={locale} />
      <About        content={c?.about} />
      <Testimonials content={c?.testimonials} />
      <Bestsellers  products={bestsellers} locale={locale} />
      <Benefits     content={c?.benefits} />
      <Reviews      content={reviewsContent} locale={locale} />
    </div>
  );
}
