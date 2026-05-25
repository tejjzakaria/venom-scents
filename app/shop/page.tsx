import type { Metadata } from 'next';
import { getProducts, getStore, resolveContent } from '../../lib/api';
import ShopClient from '../../components/ShopClient';
import { getLocale } from '../actions/locale';

export async function generateMetadata(): Promise<Metadata> {
  const [store, locale] = await Promise.all([getStore(), getLocale()]);
  const sc = resolveContent(store, locale);
  return { title: sc?.shop?.hero?.title ?? 'Shop' };
}

export default async function ShopPage() {
  const [products, locale, store] = await Promise.all([getProducts(), getLocale(), getStore()]);
  const sc   = store?.content?.[locale] ?? store?.content?.['en'];
  const shop = sc?.shop;
  return (
    <ShopClient
      products={products}
      locale={locale}
      heroImage={shop?.hero?.image}
      heroTitle={shop?.hero?.title}
      heroSubtitle={shop?.hero?.subtitle}
      heroStatsText={shop?.hero?.statsText}
    />
  );
}
