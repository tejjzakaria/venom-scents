const BASE_URL = (process.env.CRM_BASE_URL ?? '').replace(/\/$/, '');
const STORE_ID = process.env.STORE_ID ?? '';
const API_KEY  = process.env.CRM_API_KEY ?? '';

export type StoreContent = {
  home?: {
    hero?: {
      headline?:    string;
      subtext?:     string;
      ctaText?:     string;
      socialProof?: string;
      image?:       string;
    };
    about?: {
      headline?: string;
      body?:     string;
      ctaText?:  string;
      image?:    string;
    };
    testimonials?: {
      headlineBold?:   string;
      headlineItalic?: string;
      stats?: Array<{ percent: string; text: string }>;
      items?: Array<{ video: string; quote: string }>;
    };
    benefits?: {
      headlineBold?:   string;
      headlineItalic?: string;
      items?: Array<{ title: string; description: string }>;
    };
    reviews?: {
      headlineBold?:   string;
      headlineItalic?: string;
      subtitle?:       string;
      totalReviews?:   string;
      items?: Array<{
        image:        string;
        name:         string;
        date:         string;
        rating:       number;
        text:         string;
        productImage: string;
        productName:  string;
      }>;
    };
  };
  about?: {
    hero?: {
      eyebrow?:  string;
      headline?: string;
      subtitle?: string;
      image?:    string;
    };
    stats?: Array<{ value: string; label: string }>;
    mission?: {
      eyebrow?:        string;
      headlineBold?:   string;
      headlineItalic?: string;
      body1?:          string;
      body2?:          string;
      ctaText?:        string;
      image?:          string;
    };
    values?: {
      eyebrow?:        string;
      headlineBold?:   string;
      headlineItalic?: string;
      items?: Array<{ title: string; description: string }>;
    };
    timeline?: {
      eyebrow?:        string;
      headlineBold?:   string;
      headlineItalic?: string;
      items?: Array<{ year: string; title: string; text: string }>;
    };
    cta?: {
      headline?:     string;
      subtitle?:     string;
      primaryCta?:   string;
      secondaryCta?: string;
    };
  };
  shop?: {
    hero?: {
      image?:     string;
      title?:     string;
      subtitle?:  string;
      statsText?: string;
    };
    cta?: {
      title?:    string;
      subtitle?: string;
      button?:   string;
    };
  };
  contact?: {
    instagram?: string;
    tiktok?:    string;
  };
  product?: {
    howToUse?: {
      eyebrow?:  string;
      headline?: string;
      steps?:    Array<{ step: string; title: string; description: string }>;
    };
    whyUs?: {
      eyebrow?:  string;
      headline?: string;
      items?:    Array<{ title: string; description: string }>;
    };
  };
};

import type { Locale } from './locale';

const VALID_LOCALES: Locale[] = ['en', 'fr', 'ar'];

export function resolveContent(store: StoreInfo | null, locale: Locale): StoreContent | undefined {
  if (!store?.content) return undefined;
  return store.content[locale] ?? Object.values(store.content)[0];
}

export function getAvailableLocales(store: StoreInfo | null): Locale[] {
  return Object.keys(store?.content ?? {}).filter((l): l is Locale => VALID_LOCALES.includes(l as Locale));
}

export type StoreInfo = {
  _id:       string;
  name:      string;
  status:    'Active' | 'Paused' | 'Disconnected';
  desc?:     string;
  email?:    string;
  phone?:    string;
  country?:  string;
  currency?: string;
  color:     string;
  initials:  string;
  logo?:     string;
  favicon?:  string;
  content?:  Record<string, StoreContent>;
};

export async function getStore(): Promise<StoreInfo | null> {
  if (!BASE_URL || !STORE_ID || !API_KEY) return null;
  try {
    const res = await fetch(
      `${BASE_URL}/api/stores/${STORE_ID}`,
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
        cache: 'no-store',
      },
    );
    if (!res.ok) return null;
    return res.json() as Promise<StoreInfo>;
  } catch {
    return null;
  }
}

export type Product = {
  id:            string;
  name:          string;
  slug:          string;
  sku:           string;
  category:      string;
  price:         number;
  originalPrice: number | null;
  stock:         number;
  sold:          number;
  status:        'Active' | 'Draft' | 'Out of Stock';
  tag:           string;
  warranty:      string;
  rating:        string;
  reviews:       string;
  views:         string;
  shortDesc:     string;
  fullDesc:      string;
  images:        string[];
  features:      string[];
  specs:         { key: string; value: string }[];
  offers:        string[];
  customerReviews: { name: string; rating: string; text: string }[];
};

export type OrderItem = {
  productId:     string;
  productSlug:   string;
  productName:   string;
  productImage:  string;
  price:         number;
  originalPrice: number;
  quantity:      number;
  subtotal:      number;
};

export type CreateOrderBody = {
  orderNumber:      string;
  customerName:     string;
  customerPhone?:   string;
  customerAddress?: string;
  items:            OrderItem[];
  subtotal?:        number;
  savings?:         number;
  total:            number;
  paymentMethod?:   string;
  status?:          'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
};

export async function getProducts(opts?: { limit?: number; skip?: number }): Promise<Product[]> {
  if (!BASE_URL || !STORE_ID) return [];
  try {
    const params = new URLSearchParams({
      status: 'Active',
      limit:  String(opts?.limit ?? 100),
      skip:   String(opts?.skip  ?? 0),
    });
    const res = await fetch(
      `${BASE_URL}/api/stores/${STORE_ID}/products?${params}`,
      { next: { revalidate: 30 } },
    );
    if (!res.ok) return [];
    const data = await res.json() as { products: Product[] };
    return data.products;
  } catch {
    return [];
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  if (!BASE_URL || !STORE_ID) return null;
  try {
    const res = await fetch(
      `${BASE_URL}/api/stores/${STORE_ID}/products/${slug}`,
      { next: { revalidate: 30 } },
    );
    if (!res.ok) return null;
    return res.json() as Promise<Product>;
  } catch {
    return null;
  }
}

export function generateOrderNumber(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ORD-${date}-${rand}`;
}

export async function submitOrder(body: CreateOrderBody): Promise<{ orderId: string; orderNumber: string }> {
  if (!BASE_URL || !STORE_ID) throw new Error('Store not configured — set CRM_BASE_URL and STORE_ID in .env');
  if (!API_KEY) throw new Error('API key not configured — set CRM_API_KEY in .env');

  const res = await fetch(`${BASE_URL}/api/stores/${STORE_ID}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    cache: 'no-store',
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(data.error ?? `Order submission failed (${res.status})`);
  }

  const { id } = await res.json() as { id: string };
  return { orderId: id, orderNumber: body.orderNumber };
}
