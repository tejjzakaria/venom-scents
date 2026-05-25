import { getProducts, getStore } from '../../lib/api';
import ShopClient from '../../components/ShopClient';
import { getLocale } from '../actions/locale';

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
      ctaTitle={shop?.cta?.title}
      ctaSubtitle={shop?.cta?.subtitle}
      ctaButton={shop?.cta?.button}
    />
  );
}
