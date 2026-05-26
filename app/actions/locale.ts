'use server';

import { cookies } from 'next/headers';
import type { Locale } from '../../lib/locale';

const VALID: string[] = ['en', 'fr', 'ar'];

export async function setLocale(locale: string): Promise<void> {
  if (!VALID.includes(locale)) return;
  const jar = await cookies();
  jar.set('locale', locale, { path: '/', maxAge: 31_536_000, sameSite: 'lax' });
}

export async function getLocale(): Promise<Locale> {
  const jar = await cookies();
  const val = jar.get('locale')?.value;
  return VALID.includes(val ?? '') ? (val as Locale) : 'ar';
}
