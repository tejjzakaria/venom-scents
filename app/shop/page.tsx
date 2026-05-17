import { getProducts } from '../../lib/api';
import ShopClient from '../../components/ShopClient';
import { getLocale } from '../actions/locale';

export default async function ShopPage() {
  const [products, locale] = await Promise.all([getProducts(), getLocale()]);
  return <ShopClient products={products} locale={locale} />;
}
