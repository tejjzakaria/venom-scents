import { getProducts, getStore } from '../../lib/api';
import ShopClient from '../../components/ShopClient';
import { getLocale } from '../actions/locale';

export default async function ShopPage() {
  const [products, locale, store] = await Promise.all([getProducts(), getLocale(), getStore()]);
  const sc = store?.content?.[locale] ?? store?.content?.['en'];
  return <ShopClient products={products} locale={locale} heroImage={sc?.shop?.hero?.image} />;
}
