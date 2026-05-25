import type { Metadata } from 'next';
import Link from 'next/link';
import { getLocale } from '../actions/locale';
import { getTranslations } from '../../lib/i18n';

export const metadata: Metadata = { title: 'Order Confirmed' };

type Props = { searchParams: Promise<{ order?: string }> };

export default async function ThankYouPage({ searchParams }: Props) {
  const [locale, { order }] = await Promise.all([getLocale(), searchParams]);
  const t = getTranslations(locale).thankYouPage;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-white px-6 py-24">
      <div className="max-w-md w-full text-center flex flex-col items-center gap-6">

        {/* check icon */}
        <div className="w-20 h-20 rounded-full bg-[#F0FFF8] border-2 border-[#C6F6E6] flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#00A17C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20,6 9,17 4,12" />
          </svg>
        </div>

        {/* text */}
        <div className="flex flex-col gap-3">
          <h1 className="font-serif font-bold text-[#0F0F0F] text-3xl md:text-4xl">{t.title}</h1>
          <p className="text-[#555555] font-sans text-sm md:text-base leading-relaxed">{t.subtitle}</p>
          {order && (
            <p className="text-sm font-sans text-gray-400 mt-1">
              {t.reference}{' '}
              <span className="font-bold text-[#0F0F0F]">{order}</span>
            </p>
          )}
        </div>

        {/* actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-2">
          <Link
            href="/shop"
            className="w-full sm:w-auto flex-1 h-12 flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white font-bold font-sans text-sm hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            {t.continueShopping}
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto flex-1 h-12 flex items-center justify-center rounded-full border border-gray-200 text-[#0F0F0F] font-bold font-sans text-sm hover:border-gray-400 transition-colors"
          >
            {t.backHome}
          </Link>
        </div>

      </div>
    </div>
  );
}
