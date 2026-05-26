'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { placeOrder } from '../app/actions/order';
import type { Product } from '../lib/api';
import type { Locale } from '../lib/locale';
import { getTranslations } from '../lib/i18n';

// ─── small reusable bits ─────────────────────────────────────────────────────

function Stars({ value }: { value: number }) {
  const filled = Math.round(value);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <svg key={s} width="14" height="14" viewBox="0 0 24 24"
          fill={s <= filled ? 'var(--color-primary)' : 'none'} stroke="var(--color-primary)" strokeWidth="2">
          <polygon points="12,2 15,8 22,9 17,14 18,21 12,18 6,21 7,14 2,9 9,8" />
        </svg>
      ))}
    </div>
  );
}

function IconTruck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}

function IconReturn() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/>
    </svg>
  );
}

// ─── main component ──────────────────────────────────────────────────────────

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ProductView({ product, locale = 'en' }: { product: Product; locale?: Locale }) {
  const router  = useRouter();
  const i18n    = getTranslations(locale).product;
  const images  = product.images;
  const price     = product.price;
  const rating    = parseFloat(product.rating) || 0;
  const reviewCount = parseInt(product.reviews, 10) || 0;

  const [activeImg, setActiveImg]         = useState(0);
  const [selectedOffer, setSelectedOffer] = useState<string | null>(product.offers[0] ?? null);
  const [scentOpen, setScentOpen]         = useState(false);

  const [status,      setStatus]      = useState<Status>('idle');
  const [orderResult, setOrderResult] = useState<{ orderId: string; orderNumber: string } | null>(null);
  const [errorMsg,    setErrorMsg]    = useState('');
  const [form,        setForm]        = useState({ name: '', phone: '', address: '', payment: 'cash' });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof typeof form, string>>>({});

  const total = price;

  function validate() {
    const errs: Partial<Record<keyof typeof form, string>> = {};
    if (!form.name.trim())    errs.name    = i18n.required;
    if (!form.phone.trim())   errs.phone   = i18n.required;
    if (!form.address.trim()) errs.address = i18n.required;
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      const result = await placeOrder({
        items: [{
          id:            product.id,
          slug:          product.slug,
          name:          selectedOffer ? `${product.name} — ${selectedOffer}` : product.name,
          image:         product.images[0] ?? '',
          originalPrice: product.originalPrice,
        }],
        unitPrice: price,
        customer: form,
      });
      setOrderResult(result);
      setStatus('success');
      router.push(`/thank-you?order=${encodeURIComponent(result.orderNumber)}`);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : i18n.somethingWrong);
      setStatus('error');
    }
  }

  return (
    <div className="bg-white min-h-full">

      {/* breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 pt-6">
        <div className="flex items-center gap-2 text-[11px] font-sans text-gray-400">
          <Link href="/" className="hover:text-gray-700 transition-colors">{i18n.breadcrumbHome}</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-gray-700 transition-colors">{i18n.breadcrumbShop}</Link>
          <span>/</span>
          <span className="text-[#0F0F0F] font-medium truncate max-w-[220px]">{product.name}</span>
        </div>
      </div>

      {/* ── two-column 50/50 layout ───────────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

        {/* ── LEFT: gallery (sticky) ─────────────────────────────────────── */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-6">

          {/* main image */}
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#F5F0F8] shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            {images.length > 0 ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={images[activeImg]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-sans text-sm">No image</div>
            )}

            {product.tag && (
              <span className="absolute top-4 ltr:left-4 rtl:right-4 bg-[var(--color-primary)] text-white text-[10px] font-black font-sans uppercase tracking-widest px-3 py-1.5 rounded-full">
                {product.tag}
              </span>
            )}
          </div>

          {/* thumbnail strip */}
          {images.length > 1 && (
            <div className="flex items-center gap-2">
              {images.slice(0, 5).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all bg-[#F5F0F8] ${
                    activeImg === i ? 'border-[var(--color-primary)] shadow-sm' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`view ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: info + offers + checkout card ────────────────────── */}
        <div className="flex flex-col gap-6">

          {/* rating */}
          <div className="flex items-center gap-2.5">
            <Stars value={rating} />
            <span className="text-[11px] font-sans text-gray-500">
              <span className="font-bold text-[#0F0F0F]">{rating.toFixed(1)}</span>
              {' '}({reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          {/* name + description */}
          <div>
            <h1 className="font-serif font-bold text-[#0F0F0F] text-[32px] md:text-[42px] leading-[1.12] tracking-tight">
              {product.name}
            </h1>
            {product.shortDesc && (
              <p className="text-[14px] font-sans text-[#666666] leading-relaxed mt-3">
                {product.shortDesc}
              </p>
            )}
          </div>

          {/* feature pills — bold modern: black bg, white text */}
          {product.features.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.features.slice(0, 4).map((f, i) => (
                <span key={i} className="text-[11px] font-sans font-bold text-[var(--color-primary)] bg-[#FFF8F8] border border-[#F5E6E6] px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                  {f}
                </span>
              ))}
            </div>
          )}

          {/* scent notes accordion */}
          {product.fullDesc && (
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setScentOpen(o => !o)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-[11px] font-black font-sans text-[#0F0F0F] uppercase tracking-widest hover:bg-gray-50 transition-colors"
              >
                <span>{i18n.scentNotes}</span>
                <svg className={`transition-transform duration-200 ${scentOpen ? 'rotate-180' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6,9 12,15 18,9"/>
                </svg>
              </button>
              {scentOpen && (
                <div className="px-4 pb-4 pt-1 text-sm font-sans text-[#555555] leading-relaxed border-t border-gray-100"
                  dangerouslySetInnerHTML={{ __html: product.fullDesc }} />
              )}
            </div>
          )}

          {/* ── Offer selector ───────────────────────────────────────── */}
          {product.offers.length > 0 && (
            <div>
              <p className="text-[11px] font-black font-sans text-[#0F0F0F] uppercase tracking-widest mb-3">{i18n.selectScents}</p>
              <div className="flex flex-col gap-2">
                {product.offers.map((offer, i) => {
                  const isSelected = selectedOffer === offer;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedOffer(offer)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-start w-full transition-all duration-150 ${
                        isSelected ? 'border-[var(--color-primary)] bg-[#FFF8F8]' : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                        isSelected ? 'border-[var(--color-primary)]' : 'border-gray-300'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />}
                      </div>
                      <span className={`text-sm font-bold font-sans ${isSelected ? 'text-[#0F0F0F]' : 'text-[#444444]'}`}>
                        {offer}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Checkout — floating card with deep shadow ────────────── */}
          <div className="rounded-3xl bg-white shadow-[0_20px_64px_rgba(0,0,0,0.14)] border border-gray-100 overflow-hidden mt-2">

            {/* card header */}
            <div className="bg-[#FFF8F8] border-b border-[#F5E6E6] px-6 py-4">
              <h3 className="font-serif font-bold text-[var(--color-primary)] text-[18px] leading-tight">{i18n.checkoutTitle}</h3>
              <p className="text-[11px] font-sans text-gray-400 mt-0.5">{i18n.checkoutSub}</p>
            </div>

            <div className="p-6">
              {status === 'success' && orderResult ? (

                /* success state */
                <div className="flex flex-col items-center text-center gap-4 py-8">
                  <div className="w-14 h-14 rounded-full bg-[#F0FFF8] border border-[#C6F6E6] flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00A17C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-serif font-bold text-[#0F0F0F] text-xl mb-1">{i18n.orderPlaced}</p>
                    <p className="text-sm font-sans text-[#555555]">{i18n.thankYou}</p>
                    <p className="text-sm font-sans text-[#555555] mt-1">
                      {i18n.reference} <span className="font-bold text-[#0F0F0F]">{orderResult.orderNumber}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-xs font-bold font-sans text-[#0F0F0F] underline underline-offset-2 hover:text-[var(--color-primary)] transition-colors"
                  >
                    {i18n.placeAnother}
                  </button>
                </div>

              ) : (

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                  {/* order summary */}
                  <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                    <span className="text-sm font-sans text-gray-500 line-clamp-1 flex-1 me-3">
                      {selectedOffer ?? product.name}
                    </span>
                    <span className="font-black font-sans text-[#0F0F0F] text-[16px] flex-shrink-0">{total.toFixed(2)} MAD</span>
                  </div>

                  {/* error banner */}
                  {status === 'error' && (
                    <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      <p className="text-xs font-sans text-[var(--color-primary)]">{errorMsg}</p>
                    </div>
                  )}

                  {/* name + phone */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black font-sans text-gray-500 uppercase tracking-widest mb-1.5">{i18n.fullName}</label>
                      <input
                        type="text"
                        placeholder={i18n.namePlaceholder}
                        value={form.name}
                        onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setFieldErrors(fe => ({ ...fe, name: undefined })); }}
                        className={`w-full h-11 px-3.5 rounded-xl border-2 text-sm font-sans text-[#0F0F0F] placeholder-gray-300 bg-white focus:outline-none focus:border-[var(--color-primary)] transition-all ${fieldErrors.name ? 'border-red-400' : 'border-gray-200'}`}
                      />
                      {fieldErrors.name && <p className="text-[10px] text-red-500 mt-1">{fieldErrors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-black font-sans text-gray-500 uppercase tracking-widest mb-1.5">{i18n.phone}</label>
                      <input
                        type="tel"
                        placeholder={i18n.phonePlaceholder}
                        value={form.phone}
                        onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); setFieldErrors(fe => ({ ...fe, phone: undefined })); }}
                        className={`w-full h-11 px-3.5 rounded-xl border-2 text-sm font-sans text-[#0F0F0F] placeholder-gray-300 bg-white focus:outline-none focus:border-[var(--color-primary)] transition-all ${fieldErrors.phone ? 'border-red-400' : 'border-gray-200'}`}
                      />
                      {fieldErrors.phone && <p className="text-[10px] text-red-500 mt-1">{fieldErrors.phone}</p>}
                    </div>
                  </div>

                  {/* address */}
                  <div>
                    <label className="block text-[10px] font-black font-sans text-gray-500 uppercase tracking-widest mb-1.5">{i18n.deliveryAddress}</label>
                    <textarea
                      placeholder={i18n.addressPlaceholder}
                      rows={2}
                      value={form.address}
                      onChange={e => { setForm(f => ({ ...f, address: e.target.value })); setFieldErrors(fe => ({ ...fe, address: undefined })); }}
                      className={`w-full px-3.5 py-3 rounded-xl border-2 text-sm font-sans text-[#0F0F0F] placeholder-gray-300 bg-white focus:outline-none focus:border-[var(--color-primary)] resize-none transition-all ${fieldErrors.address ? 'border-red-400' : 'border-gray-200'}`}
                    />
                    {fieldErrors.address && <p className="text-[10px] text-red-500 mt-1">{fieldErrors.address}</p>}
                  </div>

                  {/* payment — COD only */}
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F0F0F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20"/>
                    </svg>
                    <span className="text-xs font-semibold font-sans text-[#0F0F0F]">{i18n.cashOnDelivery}</span>
                    <span className="ml-auto text-[10px] font-bold font-sans text-gray-400 uppercase tracking-wider">{i18n.codOnlyOption}</span>
                  </div>

                  {/* submit */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full h-14 rounded-xl bg-[var(--color-primary)] text-white font-black font-sans text-[14px] tracking-widest uppercase hover:bg-[var(--color-primary-dark)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 mt-1"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        {i18n.placingOrder}
                      </>
                    ) : (
                      `${i18n.placeOrder} — ${total.toFixed(2)} MAD`
                    )}
                  </button>

                  {/* trust strip */}
                  <div className="flex items-center justify-center gap-5 text-[10px] font-sans text-gray-400 pt-1">
                    <span className="flex items-center gap-1.5"><IconTruck />{i18n.freeShipping}</span>
                    <span className="flex items-center gap-1.5"><IconShield />{i18n.secureCheckout}</span>
                    <span className="flex items-center gap-1.5"><IconReturn />{parseInt(product.warranty, 10) || 30}-{i18n.returns}</span>
                  </div>

                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ── Customer reviews ──────────────────────────────────────────────── */}
      {product.customerReviews.length > 0 && (
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 pb-16">
          <div className="border-t border-gray-100 pt-10">
            <h2 className="font-serif font-bold text-2xl text-[#0F0F0F] mb-6">
              {i18n.customerReviews}
              <span className="ms-3 text-base font-sans font-normal text-gray-400">{reviewCount.toLocaleString()} {i18n.reviews}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {product.customerReviews.map((r, i) => (
                <div key={i} className="bg-[#FFF8F8] rounded-2xl p-5 border border-[#F5E6E6]">
                  <Stars value={parseFloat(r.rating) || 0} />
                  <p className="text-[#444444] font-sans text-sm leading-relaxed my-3 line-clamp-4">"{r.text}"</p>
                  <span className="text-xs font-bold font-sans text-[#0F0F0F]">{r.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
