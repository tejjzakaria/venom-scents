import Script from 'next/script';
import type { StorePixels } from '../lib/api';

function safe(id: string | undefined): string {
  return (id ?? '').replace(/[^a-zA-Z0-9_\-]/g, '');
}

export default function PixelScripts({ pixels }: { pixels?: StorePixels }) {
  if (!pixels) return null;

  const meta = safe(pixels.metaPixelId);
  const snap = safe(pixels.snapPixelId);
  const tt   = safe(pixels.ttPixelId);
  const ga4  = safe(pixels.ga4Id);
  const gtm  = safe(pixels.gtmId);
  const pin  = safe(pixels.pinterestId);

  return (
    <>
      {meta && (
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','${meta}');fbq('track','PageView');
        `}</Script>
      )}

      {snap && (
        <Script id="snap-pixel" strategy="afterInteractive">{`
          (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];var s='script',r=t.createElement(s);r.async=!0;r.src=n;var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u);})(window,document,'https://sc-static.net/scevent.min.js');
          snaptr('init','${snap}');snaptr('track','PAGE_VIEW');
        `}</Script>
      )}

      {tt && (
        <Script id="tiktok-pixel" strategy="afterInteractive">{`
          !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._l=ttq._l||{},ttq.load.loadOnce=function(){w.existingScript=d.querySelector('script[src="'+i+'"]'),w.existingScript?ttq._l[w.existingScript.src]=!0:(n=d.createElement("script"),n.type="text/javascript",n.async=!0,n.src=i,d.head.insertBefore(n,d.head.firstChild))},ttq.load.loadOnce()};ttq.load('${tt}');ttq.page();}(window,document,'ttq');
        `}</Script>
      )}

      {ga4 && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`
            window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4}');
          `}</Script>
        </>
      )}

      {gtm && (
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');
        `}</Script>
      )}

      {pin && (
        <Script id="pinterest" strategy="afterInteractive">{`
          !function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var n=window.pintrk;n.queue=[],n.version="3.0";var t=document.createElement("script");t.async=!0,t.src=e;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
          pintrk('load','${pin}');pintrk('page');
        `}</Script>
      )}
    </>
  );
}
