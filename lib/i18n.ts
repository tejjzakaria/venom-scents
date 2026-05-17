import type { Locale } from './locale';

export type Translations = {
  announcementBar: string;
  nav: { home: string; shop: string; about: string; contact: string };
  footer: { tagline: string; shopAll: string; ourStory: string; home: string; contact: string };
  collection: { title: string; allProducts: string };
  bestsellers: { title: string; viewAll: string; addToCart: string };
  shop: {
    title: string; subtitle: string; statsText: string;
    breadcrumbHome: string; breadcrumbShop: string;
    sortFeatured: string; sortBestSelling: string; sortNewest: string;
    sortPriceLow: string; sortPriceHigh: string;
    products: string; product: string;
    emptyTitle: string; emptySub: string;
    noProductsTitle: string; noProductsSub: string;
    viewAll: string; viewProduct: string; addToCart: string;
    ctaTitle: string; ctaSub: string; ctaButton: string;
  };
  product: {
    breadcrumbHome: string; breadcrumbShop: string;
    bundleSave: string; bottle1: string; bottle2: string; bottle3: string; perUnit: string;
    selectScents: string; scentNotes: string;
    checkoutTitle: string; checkoutSub: string;
    added: string; add: string;
    fullName: string; namePlaceholder: string;
    phone: string; phonePlaceholder: string;
    deliveryAddress: string; addressPlaceholder: string;
    cashOnDelivery: string; codOnlyOption: string;
    placeOrder: string; placingOrder: string;
    freeShipping: string; secureCheckout: string; returns: string;
    orderPlaced: string; thankYou: string; reference: string; placeAnother: string;
    scent: string; scents: string;
    customerReviews: string; reviews: string;
    required: string; somethingWrong: string;
  };
  reviews: { verified: string };
  contact: {
    eyebrow: string; fallbackDesc: string;
    reachUs: string; chooseYour: string; channel: string;
    email: string; emailSub: string;
    whatsapp: string; whatsappSub: string;
    instagram: string; instagramSub: string;
    tiktok: string; tiktokSub: string;
  };
  productPage: { discoverMore: string; youMayLike: string; viewAll: string };
  thankYouPage: {
    title: string;
    subtitle: string;
    reference: string;
    continueShopping: string;
    backHome: string;
  };
};

const dict: Record<Locale, Translations> = {
  en: {
    announcementBar: 'SPRING SALE — UP TO 60% OFF',
    nav: { home: 'Home', shop: 'Shop', about: 'About', contact: 'Contact' },
    footer: { tagline: 'Redefining allure, one scent at a time.', shopAll: 'Shop All', ourStory: 'Our Story', home: 'Home', contact: 'Contact' },
    collection: { title: 'Venom Collection', allProducts: 'All Products' },
    bestsellers: { title: 'Our Bestsellers', viewAll: 'View all products', addToCart: 'Add To Cart' },
    shop: {
      title: 'The Collection',
      subtitle: 'Every drop crafted to captivate. Find your signature scent below.',
      statsText: '4.8 · 125,000+ customers',
      breadcrumbHome: 'Home', breadcrumbShop: 'Shop',
      sortFeatured: 'Featured', sortBestSelling: 'Best Selling', sortNewest: 'Newest',
      sortPriceLow: 'Price: Low to High', sortPriceHigh: 'Price: High to Low',
      products: 'products', product: 'product',
      emptyTitle: 'No products found', emptySub: 'Try a different category.',
      noProductsTitle: 'No products available', noProductsSub: 'Check back soon.',
      viewAll: 'View All Products', viewProduct: 'View Product', addToCart: 'Add to Cart',
      ctaTitle: "Can't find your scent?",
      ctaSub: "Take our 60-second fragrance quiz and we'll match you perfectly.",
      ctaButton: 'Take the Quiz',
    },
    product: {
      breadcrumbHome: 'Home', breadcrumbShop: 'Shop',
      bundleSave: 'Bundle & Save', bottle1: '1 Bottle', bottle2: '2 Bottles', bottle3: '3 Bottles', perUnit: '/ea',
      selectScents: 'Select Your Scents', scentNotes: 'Scent Notes',
      checkoutTitle: 'Complete Your Order', checkoutSub: 'Fast delivery · Secure checkout',
      added: 'Added', add: 'Add',
      fullName: 'Full Name', namePlaceholder: 'Your name',
      phone: 'Phone', phonePlaceholder: '+1 234 567 890',
      deliveryAddress: 'Delivery Address', addressPlaceholder: 'Street, city, postal code',
      cashOnDelivery: 'Cash on Delivery', codOnlyOption: 'Only option',
      placeOrder: 'Place Order', placingOrder: 'Placing Order…',
      freeShipping: 'Free shipping', secureCheckout: 'Secure checkout', returns: 'day returns',
      orderPlaced: 'Order Placed!', thankYou: 'Thank you for your order.',
      reference: 'Reference:', placeAnother: 'Place another order',
      scent: 'scent', scents: 'scents',
      customerReviews: 'Customer Reviews', reviews: 'reviews',
      required: 'Required', somethingWrong: 'Something went wrong. Please try again.',
    },
    reviews: { verified: 'Verified' },
    contact: {
      eyebrow: 'Get in Touch', fallbackDesc: "A question, a compliment, or just want to talk fragrance — our team is here for all of it.",
      reachUs: 'Reach Us', chooseYour: 'Choose Your', channel: 'Channel',
      email: 'Email', emailSub: 'We reply within 24 hours',
      whatsapp: 'WhatsApp', whatsappSub: 'Mon – Sat, 9 AM – 6 PM',
      instagram: 'Instagram', instagramSub: 'DMs open',
      tiktok: 'TikTok', tiktokSub: 'Follow for drops & reviews',
    },
    productPage: { discoverMore: 'Discover More', youMayLike: 'You May Also Like', viewAll: 'View all' },
    thankYouPage: {
      title: 'Order Confirmed!',
      subtitle: 'Thank you for your order. Our team will contact you shortly to confirm delivery.',
      reference: 'Order reference:',
      continueShopping: 'Continue Shopping',
      backHome: 'Back to Home',
    },
  },

  fr: {
    announcementBar: "SOLDES DE PRINTEMPS — JUSQU'À 60% DE RÉDUCTION",
    nav: { home: 'Accueil', shop: 'Boutique', about: 'À Propos', contact: 'Contact' },
    footer: { tagline: "Redéfinir l'attrait, un parfum à la fois.", shopAll: 'Voir tout', ourStory: 'Notre Histoire', home: 'Accueil', contact: 'Contact' },
    collection: { title: 'Collection Venom', allProducts: 'Tous les Produits' },
    bestsellers: { title: 'Nos Meilleures Ventes', viewAll: 'Voir tous les produits', addToCart: 'Ajouter au Panier' },
    shop: {
      title: 'La Collection',
      subtitle: 'Chaque goutte conçue pour captiver. Trouvez votre parfum signature ci-dessous.',
      statsText: '4.8 · 125 000+ clients',
      breadcrumbHome: 'Accueil', breadcrumbShop: 'Boutique',
      sortFeatured: 'En vedette', sortBestSelling: 'Meilleures ventes', sortNewest: 'Plus récent',
      sortPriceLow: 'Prix : croissant', sortPriceHigh: 'Prix : décroissant',
      products: 'produits', product: 'produit',
      emptyTitle: 'Aucun produit trouvé', emptySub: 'Essayez une autre catégorie.',
      noProductsTitle: 'Aucun produit disponible', noProductsSub: 'Revenez bientôt.',
      viewAll: 'Voir tous les produits', viewProduct: 'Voir le produit', addToCart: 'Ajouter au panier',
      ctaTitle: 'Vous ne trouvez pas votre parfum ?',
      ctaSub: "Faites notre quiz de 60 secondes et nous vous trouverons le parfait.",
      ctaButton: 'Faire le Quiz',
    },
    product: {
      breadcrumbHome: 'Accueil', breadcrumbShop: 'Boutique',
      bundleSave: 'Offre groupée', bottle1: '1 Flacon', bottle2: '2 Flacons', bottle3: '3 Flacons', perUnit: '/un',
      selectScents: 'Choisissez vos parfums', scentNotes: 'Notes Olfactives',
      checkoutTitle: 'Finalisez votre commande', checkoutSub: 'Livraison rapide · Paiement sécurisé',
      added: 'Ajouté', add: 'Ajouter',
      fullName: 'Nom complet', namePlaceholder: 'Votre nom',
      phone: 'Téléphone', phonePlaceholder: '+33 6 12 34 56 78',
      deliveryAddress: 'Adresse de livraison', addressPlaceholder: 'Rue, ville, code postal',
      cashOnDelivery: 'Paiement à la livraison', codOnlyOption: 'Seule option',
      placeOrder: 'Passer la commande', placingOrder: 'En cours…',
      freeShipping: 'Livraison gratuite', secureCheckout: 'Paiement sécurisé', returns: 'jours de retour',
      orderPlaced: 'Commande passée !', thankYou: 'Merci pour votre commande.',
      reference: 'Référence :', placeAnother: 'Passer une autre commande',
      scent: 'parfum', scents: 'parfums',
      customerReviews: 'Avis clients', reviews: 'avis',
      required: 'Requis', somethingWrong: 'Une erreur s\'est produite. Veuillez réessayer.',
    },
    reviews: { verified: 'Vérifié' },
    contact: {
      eyebrow: 'Contactez-nous', fallbackDesc: "Une question, un compliment, ou juste envie de parler parfum — notre équipe est là pour tout.",
      reachUs: 'Nous rejoindre', chooseYour: 'Choisissez votre', channel: 'Canal',
      email: 'Email', emailSub: 'Nous répondons sous 24 heures',
      whatsapp: 'WhatsApp', whatsappSub: 'Lun – Sam, 9h – 18h',
      instagram: 'Instagram', instagramSub: 'DMs ouverts',
      tiktok: 'TikTok', tiktokSub: 'Suivez pour les nouveautés',
    },
    productPage: { discoverMore: 'Découvrir Plus', youMayLike: 'Vous Aimerez Aussi', viewAll: 'Voir tout' },
    thankYouPage: {
      title: 'Commande confirmée !',
      subtitle: 'Merci pour votre commande. Notre équipe vous contactera sous peu pour confirmer la livraison.',
      reference: 'Référence de commande :',
      continueShopping: 'Continuer les achats',
      backHome: "Retour à l'accueil",
    },
  },

  ar: {
    announcementBar: 'تخفيضات الربيع — حتى 60% خصم',
    nav: { home: 'الرئيسية', shop: 'المتجر', about: 'من نحن', contact: 'تواصل معنا' },
    footer: { tagline: 'نعيد تعريف الجاذبية، عطراً في كل مرة.', shopAll: 'تسوق الكل', ourStory: 'قصتنا', home: 'الرئيسية', contact: 'تواصل معنا' },
    collection: { title: 'مجموعة فينوم', allProducts: 'جميع المنتجات' },
    bestsellers: { title: 'الأكثر مبيعاً', viewAll: 'عرض جميع المنتجات', addToCart: 'أضف إلى السلة' },
    shop: {
      title: 'المجموعة',
      subtitle: 'كل قطرة مصنوعة لتأسر. اعثر على عطرك المميز أدناه.',
      statsText: '4.8 · أكثر من 125,000 عميل',
      breadcrumbHome: 'الرئيسية', breadcrumbShop: 'المتجر',
      sortFeatured: 'مميز', sortBestSelling: 'الأكثر مبيعاً', sortNewest: 'الأحدث',
      sortPriceLow: 'السعر: من الأقل إلى الأعلى', sortPriceHigh: 'السعر: من الأعلى إلى الأقل',
      products: 'منتجات', product: 'منتج',
      emptyTitle: 'لم يتم العثور على منتجات', emptySub: 'جرب فئة مختلفة.',
      noProductsTitle: 'لا تتوفر منتجات', noProductsSub: 'تحقق لاحقاً.',
      viewAll: 'عرض جميع المنتجات', viewProduct: 'عرض المنتج', addToCart: 'أضف إلى السلة',
      ctaTitle: 'لم تجد عطرك؟',
      ctaSub: 'خذ اختبارنا المدته 60 ثانية وسنجد لك الأنسب.',
      ctaButton: 'ابدأ الاختبار',
    },
    product: {
      breadcrumbHome: 'الرئيسية', breadcrumbShop: 'المتجر',
      bundleSave: 'حزم وتوفير', bottle1: 'زجاجة واحدة', bottle2: 'زجاجتان', bottle3: '3 زجاجات', perUnit: '/للوحدة',
      selectScents: 'اختر عطورك', scentNotes: 'نفحات العطر',
      checkoutTitle: 'أكمل طلبك', checkoutSub: 'توصيل سريع · دفع آمن',
      added: 'تمت الإضافة', add: 'أضف',
      fullName: 'الاسم الكامل', namePlaceholder: 'اسمك',
      phone: 'الهاتف', phonePlaceholder: '+212 6 12 34 56 78',
      deliveryAddress: 'عنوان التسليم', addressPlaceholder: 'الشارع، المدينة، الرمز البريدي',
      cashOnDelivery: 'الدفع عند الاستلام', codOnlyOption: 'الخيار الوحيد',
      placeOrder: 'تأكيد الطلب', placingOrder: 'جارٍ التأكيد…',
      freeShipping: 'شحن مجاني', secureCheckout: 'دفع آمن', returns: 'يوم للإرجاع',
      orderPlaced: 'تم تقديم الطلب!', thankYou: 'شكراً لطلبك.',
      reference: 'رقم الطلب:', placeAnother: 'تقديم طلب آخر',
      scent: 'عطر', scents: 'عطور',
      customerReviews: 'آراء العملاء', reviews: 'مراجعات',
      required: 'مطلوب', somethingWrong: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
    },
    reviews: { verified: 'موثق' },
    contact: {
      eyebrow: 'تواصل معنا', fallbackDesc: 'سؤال، أو إطراء، أو مجرد حديث عن العطور — فريقنا هنا لكل شيء.',
      reachUs: 'تواصل معنا', chooseYour: 'اختر', channel: 'قناتك',
      email: 'البريد الإلكتروني', emailSub: 'نرد خلال 24 ساعة',
      whatsapp: 'واتساب', whatsappSub: 'الاثنين – السبت، 9 صباحاً – 6 مساءً',
      instagram: 'إنستغرام', instagramSub: 'الرسائل مفتوحة',
      tiktok: 'تيك توك', tiktokSub: 'تابع للعروض والمراجعات',
    },
    productPage: { discoverMore: 'اكتشف المزيد', youMayLike: 'قد يعجبك أيضاً', viewAll: 'عرض الكل' },
    thankYouPage: {
      title: 'تم تأكيد الطلب!',
      subtitle: 'شكراً لطلبك. سيتواصل معك فريقنا قريباً لتأكيد التسليم.',
      reference: 'رقم الطلب:',
      continueShopping: 'مواصلة التسوق',
      backHome: 'العودة للرئيسية',
    },
  },
};

export function getTranslations(locale: Locale): Translations {
  return dict[locale] ?? dict.en;
}
