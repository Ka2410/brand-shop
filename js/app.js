'use strict';

/* ============ PRELOADER (INDEX ONLY) ============ */
(function initPreloader() {
  // Only run preloader on home page (index.html or /)
  const path = window.location.pathname.split('/').pop();
  const isHomePage = path === '' || path === 'index.html' || path === '/';
  if (!isHomePage) return;

  const preloader = document.createElement('div');
  preloader.className = 'preloader';
  preloader.id = 'luxPreloader';
  preloader.innerHTML = `
    <div class="preloader-logo">LUX</div>
    <div class="preloader-credit">made by karam</div>
    <div class="preloader-track"><div class="preloader-fill" id="luxPreloaderFill"></div></div>
    <div class="preloader-percent" id="luxPreloaderPercent">00%</div>
  `;

  if (document.body) {
    document.body.appendChild(preloader);
    document.body.classList.add('preloader-active');
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(preloader);
      document.body.classList.add('preloader-active');
    });
  }

  let progress = 0;
  const fill = () => document.getElementById('luxPreloaderFill');
  const percent = () => document.getElementById('luxPreloaderPercent');

  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress > 90) progress = 90;
    const f = fill(); const p = percent();
    if (f) f.style.width = progress + '%';
    if (p) {
      const isRTL = document.documentElement.dir === 'rtl';
      const formatted = String(Math.round(progress)).padStart(2, '0');
      p.textContent = isRTL
        ? formatted.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]) + '٪'
        : formatted + '%';
    }
  }, 200);

  const finish = () => {
    clearInterval(interval);
    const f = fill(); const p = percent();
    if (f) f.style.width = '100%';
    if (p) {
      const isRTL = document.documentElement.dir === 'rtl';
      p.textContent = isRTL ? '١٠٠٪' : '100%';
    }
    setTimeout(() => {
      const el = document.getElementById('luxPreloader');
      if (el) el.classList.add('hide');
      document.body.classList.remove('preloader-active');
      setTimeout(() => el?.remove(), 800);
    }, 350);
  };

  if (document.readyState === 'complete') finish();
  else { window.addEventListener('load', finish); setTimeout(finish, 3000); }
})();
/* ============ LANGUAGE TRANSITION ============ */
let isLangTransitioning = false;

function injectLangTransition() {
  if (document.getElementById('langTransition')) return;
  const el = document.createElement('div');
  el.className = 'lang-transition';
  el.id = 'langTransition';
  el.innerHTML = `
    <div class="lang-door lang-door-left"></div>
    <div class="lang-door lang-door-right"></div>
    <div class="lang-transition-label" id="langTransitionLabel"></div>
  `;
  document.body.appendChild(el);
}

function playLangTransition(targetLang, onChange) {
  if (isLangTransitioning) return;
  isLangTransitioning = true;

  const transition = document.getElementById('langTransition');
  const label = document.getElementById('langTransitionLabel');

  if (!transition || !label) { onChange(); isLangTransitioning = false; return; }

  transition.classList.remove('closing', 'opening', 'active');
  label.innerHTML = `<span class="${targetLang === 'ar' ? 'ar' : ''}">${targetLang === 'ar' ? 'العربية' : 'English'}</span>`;

  requestAnimationFrame(() => transition.classList.add('active', 'closing'));
  setTimeout(() => onChange(), 600);
  setTimeout(() => { transition.classList.remove('closing'); transition.classList.add('opening'); }, 1000);
  setTimeout(() => { transition.classList.remove('active', 'opening'); isLangTransitioning = false; }, 1650);
}

/* ============ TRANSLATIONS ============ */
const TRANSLATIONS = {
  en: {
    locale: 'Locale', features: 'Features', addToBag: 'Add to Bag', buyNow: 'Buy Now',
    yourBag: 'Your Bag', total: 'TOTAL', subtotal: 'Subtotal', shipping: 'Shipping',
    checkout: 'Checkout', remove: 'Remove', emptyBag: 'Your bag is empty.',
    emptyBagText: 'Discover our latest drops and find your new favorite piece.',
    startShopping: 'Start Shopping', view: 'View', added: 'Added',
    closeLabel: 'Close', home: 'Home', shop: 'Shop', about: 'About',
    contact: 'Contact', account: 'Account', login: 'Login', signup: 'Sign Up',
    search: 'Search', wishlist: 'Wishlist', allProducts: 'All Products',
    filter: 'Filter', sortBy: 'Sort', size: 'Size', color: 'Color',
    apply: 'Apply', clear: 'Clear', resetFilters: 'Reset Filters',
    sizeGuide: 'Size Guide', description: 'Description', materials: 'Materials',
    care: 'Care', shippingInfo: 'Shipping & Returns',
    youMayLike: 'You May Also Like', completeLook: 'Complete the Look',
    save: 'Save', new: 'New', sale: 'Sale', newest: 'Newest',
    showing: 'Showing', products: 'products', noProducts: 'No products match your filters',
    email: 'Email', password: 'Password', fullName: 'Full Name',
    phone: 'Phone', address: 'Address', city: 'City', area: 'Area',
    street: 'Street', building: 'Building', apartment: 'Apartment',
    loginBtn: 'Login', signupBtn: 'Create Account',
    noAccount: "Don't have an account?", haveAccount: 'Already have an account?',
    forgotPassword: 'Forgot password?', welcome: 'Welcome Back',
    createAccount: 'Create Your Account', myOrders: 'My Orders',
    myProfile: 'My Profile', myAddresses: 'My Addresses', logout: 'Logout',
    noOrders: 'No orders yet', noOrdersText: 'Start shopping to place your first order.',
    orderPlaced: 'Order Placed', orderConfirmed: 'Your order has been confirmed!',
    orderNumber: 'Order Number', thankYou: 'Thank you for shopping with LUX.',
    continueShoppingBtn: 'Continue Shopping',
    firstName: 'First Name', lastName: 'Last Name', confirmPassword: 'Confirm Password',
    checkoutTitle: 'Checkout', infoStep: 'Information', shippingStep: 'Shipping',
    paymentStep: 'Payment', contactInfo: 'Contact Information',
    shippingAddress: 'Shipping Address', shippingMethod: 'Shipping Method',
    paymentMethod: 'Payment Method', standardShipping: 'Standard (3-5 days)',
    expressShipping: 'Express (1-2 days)', sameDayShipping: 'Same-Day (Cairo only)',
    cardPayment: 'Credit / Debit Card', codPayment: 'Cash on Delivery',
    vodafonePayment: 'Vodafone Cash', paymobPayment: 'Paymob',
    placeOrder: 'Place Order', back: 'Back', next: 'Next',
    orderSummary: 'Order Summary', free: 'FREE',
    ourStory: 'Our Story', bornInCairo: 'Born in Cairo',
    madeInEgypt: 'Made in Egypt', ourValues: 'Our Values',
    quality: 'Quality', sustainability: 'Sustainability', community: 'Community',
    contactUs: 'Contact Us', whatsapp: 'WhatsApp', faq: 'FAQ',
    sendMessage: 'Send Message', message: 'Message', subject: 'Subject',
    yourName: 'Your Name', messageSent: 'Message sent!',
    newsletter: 'Join the Movement', subscribe: 'Subscribe', subscribed: 'Subscribed!',
    emailPlaceholder: 'Your email', quantity: 'Quantity',
    sizeRequired: 'Please select a size', itemAdded: 'Item added to bag',
    wishAdded: 'Added to wishlist', wishRemoved: 'Removed from wishlist',
    continueShopping: 'Continue Shopping', emptyWishlist: 'Your wishlist is empty.',
    emptyWishlistText: 'Save your favorite pieces for later by tapping the heart icon.',
    wishlistPageText: 'Your favorite pieces, saved for later.',
    orderTracking: 'Track Order', orderDate: 'Order Date', orderStatus: 'Status',
    processing: 'Processing', shipped: 'Shipped', delivered: 'Delivered',
    blog: 'Journal', readMore: 'Read More', minRead: 'min read',
    backToBlog: 'Back to Journal', recentPosts: 'Recent Posts',
    notFound: 'Page Not Found', notFoundText: 'This page is off the map. But the good stuff is right here.',
    goHome: 'Go Home', findYourSize: 'Find Your Size',
    footerDesc: 'Egyptian streetwear born in Cairo. 90s nostalgia meets modern design.',
    recentlyViewed: 'Recently Viewed',
    quickView: 'Quick View',
    saveForLater: 'Save for Later',
    savedForLater: 'Saved for Later',
    moveToCart: 'Move to Cart',
    exitTitle: 'Wait! Don\'t go',
    exitText: 'Get 10% off your first order. Enter your email to unlock the code.',
    exitCode: 'LUX10',
    exitCta: 'Unlock 10% Off',
    emailSent: 'Check your inbox for the code!',
    freeShippingProgress: 'Add {amount} more for FREE shipping',
    freeShippingUnlocked: '🎉 You unlocked FREE shipping!',
    inStock: 'In Stock',
    lowStock: 'Only {n} left',
    outOfStock: 'Out of Stock',
    addYourSize: 'Select a size',
    followUs: 'Follow us on Instagram',
    whatsappChat: 'Chat on WhatsApp',
    quickViewSizes: 'Select size',
    crossSellTitle: 'You May Also Like',
    completeTheLook: 'Complete the Look',
    quickAdd: 'Quick Add',
    accountWelcome: 'Welcome back',
    myWishlist: 'My Wishlist',
    madeBy: 'Made by Karam',
    saveChanges: 'Save Changes',
    contactText: 'Questions, custom orders, or just want to say hi? We are here.',
    contactInfoText: 'We reply within 24 hours. For urgent inquiries, WhatsApp is fastest.',
    aboutHeroText: "LUX is more than a brand. It's a movement born in the streets of Cairo, mixing 90s nostalgia with modern streetwear culture.",
    aboutStory1P1: 'We started with one idea: to create Egyptian streetwear that could stand shoulder-to-shoulder with the global scene. Every piece is a love letter to the streets that raised us.',
    aboutStory1P2: 'From the chaos of downtown Cairo to the calm of the Nile, our designs channel the energy of a city that never sleeps.',
    aboutStory2P1: "Every LUX piece is designed and manufactured locally, supporting Egyptian artisans and craftspeople who've been perfecting their trade for generations.",
    aboutStory2P2: 'We believe in quality you can feel and roots you can trust. No shortcuts, no compromises.',
    valueQualityText: 'Premium fabrics, careful stitching, built to last season after season.',
    valueSustainabilityText: 'Slow fashion, ethical production, minimal waste. Better for the planet.',
    valueCommunityText: 'A movement, not just a brand. Welcome to the LUX family.',
    blogHeroText: 'Stories from the streets of Cairo.',
    blogFeaturedTag: 'Featured',
    blogFeaturedTitle: 'The Rise of Egyptian Streetwear',
    blogFeaturedExcerpt: 'How a new generation of Egyptian designers is reshaping the global streetwear conversation — one drop at a time.',
    blogArticle1Title: 'Behind the Orange: Our Statement Piece',
    blogArticle1Excerpt: "The story behind our boldest drop yet — and why orange is the new black.",
    blogArticle2Title: 'Vintage Washes, Modern Fits',
    blogArticle2Excerpt: "Why we love the 90s — and how we're bringing it back without the kitsch.",
    blogArticle3Title: 'The Return of Baggy',
    blogArticle3Excerpt: "Skinny is out, baggy is in. Here's why the silhouette shift is here to stay.",
    blogArticle4Title: 'Minimalism in Streetwear',
    blogArticle4Excerpt: 'How "less is more" became the most powerful statement on the block.',
    blogArticle5Title: 'Free Your Mind: The Story of a Print',
    blogArticle5Excerpt: 'From a sketch on a napkin to a bestseller — the journey of one design.',
    blogArticle6Title: 'Building LUX: Year One',
    blogArticle6Excerpt: 'Reflections on our first year — the wins, the losses, the lessons.',
    faqQ1: 'How long does shipping take?',
    faqA1: 'Standard shipping takes 3-5 business days within Egypt. Express is 1-2 days for Cairo & Giza. Same-day delivery available in Cairo for orders placed before 2pm.',
    faqQ2: 'Can I return an item?',
    faqA2: 'Yes! We accept returns within 14 days of delivery. Items must be unworn with tags attached. Contact us via WhatsApp to start a return.',
    faqQ3: 'Do you ship outside Egypt?',
    faqA3: 'Currently we only ship within Egypt. International shipping is coming soon — subscribe to our newsletter to be the first to know.',
    faqQ4: 'How do I know my size?',
    faqA4: "Each product page has a detailed Size Guide. If you're between sizes, we recommend sizing up for our oversized fits.",
    faqQ5: 'What payment methods do you accept?',
    faqA5: 'We accept Credit/Debit Cards, Cash on Delivery, Vodafone Cash, InstaPay, and Paymob.',
    readTime3: '3 min read', readTime4: '4 min read', readTime5: '5 min read', readTime6: '6 min read',
    dateDec2025: 'Dec 2025',
    // ===== NEW =====
    tagline: 'Cairo Streetwear · Since 2024',
    trustFreeShipping: 'Free shipping over EGP 2000',
    trustReturns: '14-day easy returns',
    trustCOD: 'Cash on delivery available',
    trustFastShip: 'Fast shipping across Egypt',
    whyWeMadeIt: 'Why We Made It',
    fit: 'Fit',
    reviews: 'Reviews',
    verifiedBuyer: 'Verified Buyer',
    writeReview: 'Write a Review',
    basedOn: 'Based on {n} reviews',
    sold: 'Sold {n}+ times',
    emptyBagSuggestions: 'Check out these picks',
    emptyWishlistSuggestions: 'You might like these',
    pageNotFoundTitle: 'Lost in the streets?',
    pageNotFoundSub: "The page you're looking for doesn't exist — but these do.",
    exploreCollection: 'Explore Collection',
    backToShop: 'Back to Shop',
    // ===== Fit labels =====
    fitOversized: 'Oversized',
    fitRegular: 'Regular',
    fitRelaxed: 'Relaxed',
    fitSlim: 'Slim'
  },
  ar: {
    locale: 'اللغة', features: 'الميزات', addToBag: 'أضف للحقيبة', buyNow: 'اشترِ الآن',
    yourBag: 'حقيبتك', total: 'الإجمالي', subtotal: 'المجموع الفرعي', shipping: 'الشحن',
    checkout: 'إتمام الشراء', remove: 'إزالة', emptyBag: 'حقيبتك فارغة',
    emptyBagText: 'اكتشف أحدث الإصدارات واعرف قطعتك الجديدة.',
    startShopping: 'ابدأ التسوق', view: 'مشهد', added: 'تمت الإضافة',
    closeLabel: 'إغلاق', home: 'الرئيسية', shop: 'المتجر', about: 'من نحن',
    contact: 'اتصل بنا', account: 'حسابي', login: 'دخول', signup: 'إنشاء حساب',
    search: 'بحث', wishlist: 'المفضلة', allProducts: 'كل المنتجات',
    filter: 'تصفية', sortBy: 'ترتيب', size: 'المقاس', color: 'اللون',
    apply: 'تطبيق', clear: 'مسح', resetFilters: 'إعادة ضبط',
    sizeGuide: 'دليل المقاسات', description: 'الوصف', materials: 'المواد',
    care: 'العناية', shippingInfo: 'الشحن والإرجاع',
    youMayLike: 'قد يعجبك أيضًا', completeLook: 'أكمل اللوك',
    save: 'وفر', new: 'جديد', sale: 'عرض', newest: 'الأحدث',
    showing: 'عرض', products: 'منتجات', noProducts: 'لا توجد منتجات تطابق اختياراتك',
    email: 'البريد الإلكتروني', password: 'كلمة المرور', fullName: 'الاسم الكامل',
    phone: 'الهاتف', address: 'العنوان', city: 'المدينة', area: 'المنطقة',
    street: 'الشارع', building: 'المبنى', apartment: 'الشقة',
    loginBtn: 'تسجيل الدخول', signupBtn: 'إنشاء الحساب',
    noAccount: 'ماعندكش حساب؟', haveAccount: 'عندك حساب بالفعل؟',
    forgotPassword: 'نسيت كلمة المرور؟', welcome: 'أهلاً بك',
    createAccount: 'أنشئ حسابك', myOrders: 'طلباتي',
    myProfile: 'ملفي', myAddresses: 'عناويني', logout: 'خروج',
    noOrders: 'لا توجد طلبات', noOrdersText: 'ابدأ التسوق لتقديم أول طلب.',
    orderPlaced: 'تم الطلب', orderConfirmed: 'تم تأكيد طلبك!',
    orderNumber: 'رقم الطلب', thankYou: 'شكرًا لتسوقك من LUX.',
    continueShoppingBtn: 'متابعة التسوق',
    firstName: 'الاسم الأول', lastName: 'اسم العائلة', confirmPassword: 'تأكيد كلمة المرور',
    checkoutTitle: 'إتمام الشراء', infoStep: 'المعلومات', shippingStep: 'الشحن',
    paymentStep: 'الدفع', contactInfo: 'معلومات الاتصال',
    shippingAddress: 'عنوان الشحن', shippingMethod: 'طريقة الشحن',
    paymentMethod: 'طريقة الدفع', standardShipping: 'عادي (٣-٥ أيام)',
    expressShipping: 'سريع (١-٢ يوم)', sameDayShipping: 'نفس اليوم (القاهرة)',
    cardPayment: 'بطاقة ائتمان', codPayment: 'الدفع عند الاستلام',
    vodafonePayment: 'فودافون كاش', paymobPayment: 'باي موب',
    placeOrder: 'تأكيد الطلب', back: 'رجوع', next: 'التالي',
    orderSummary: 'ملخص الطلب', free: 'مجاني',
    ourStory: 'قصتنا', bornInCairo: 'وُلد في القاهرة',
    madeInEgypt: 'صُنع في مصر', ourValues: 'قيمنا',
    quality: 'الجودة', sustainability: 'الاستدامة', community: 'المجتمع',
    contactUs: 'اتصل بنا', whatsapp: 'واتساب', faq: 'الأسئلة الشائعة',
    sendMessage: 'إرسال', message: 'الرسالة', subject: 'الموضوع',
    yourName: 'اسمك', messageSent: 'تم إرسال الرسالة!',
    newsletter: 'انضم للحركة', subscribe: 'اشترك', subscribed: 'تم الاشتراك!',
    emailPlaceholder: 'إيميلك', quantity: 'الكمية',
    sizeRequired: 'اختر المقاس من فضلك', itemAdded: 'تمت الإضافة للحقيبة',
    wishAdded: 'أُضيف للمفضلة', wishRemoved: 'حُذف من المفضلة',
    continueShopping: 'متابعة التسوق', emptyWishlist: 'مفضلتك فارغة.',
    emptyWishlistText: 'احفظ القطع اللي بتحبها بالضغط على أيقونة القلب.',
    wishlistPageText: 'قطعك المفضلة، محفوظة لوقت لاحق.',
    orderTracking: 'تتبع الطلب', orderDate: 'تاريخ الطلب', orderStatus: 'الحالة',
    processing: 'قيد المعالجة', shipped: 'تم الشحن', delivered: 'تم التوصيل',
    blog: 'المدونة', readMore: 'اقرأ المزيد', minRead: 'دقيقة قراءة',
    backToBlog: 'رجوع للمدونة', recentPosts: 'منشورات حديثة',
    notFound: 'الصفحة غير موجودة', notFoundText: 'الصفحة دي تايهة في الشوارع. بس الحلو هنا.',
    goHome: 'الرئيسية', findYourSize: 'اعرف مقاسك',
    footerDesc: 'ستريت وير مصري وُلد في القاهرة. حنين التسعينيات مع التصميم الحديث.',
    recentlyViewed: 'شوهد مؤخرًا',
    quickView: 'نظرة سريعة',
    saveForLater: 'احفظ لوقت لاحق',
    savedForLater: 'محفوظ لوقت لاحق',
    moveToCart: 'انقل للحقيبة',
    exitTitle: 'استنى! متسيبنا',
    exitText: 'خصم ١٠٪ على أول أوردر. اكتب إيميلك لفتح الكود.',
    exitCode: 'LUX10',
    exitCta: 'افتح خصم ١٠٪',
    emailSent: 'شوف إيميلك للكود!',
    freeShippingProgress: 'أضف {amount} للحصول على شحن مجاني',
    freeShippingUnlocked: '🎉 حصلت على شحن مجاني!',
    inStock: 'متوفر',
    lowStock: 'باقي {n} بس',
    outOfStock: 'غير متوفر',
    addYourSize: 'اختر المقاس',
    followUs: 'تابعنا على انستجرام',
    whatsappChat: 'كلمنا على واتساب',
    quickViewSizes: 'اختر المقاس',
    crossSellTitle: 'قد يعجبك أيضًا',
    completeTheLook: 'أكمل اللوك',
    quickAdd: 'إضافة سريعة',
    accountWelcome: 'أهلاً بعودتك',
    myWishlist: 'مفضلتي',
    madeBy: 'صُنع بواسطة كرم',
    saveChanges: 'احفظ التغييرات',
    contactText: 'عندك سؤال، طلب خاص، أو عايز تسلم؟ إحنا هنا.',
    contactInfoText: 'بنرد في خلال ٢٤ ساعة. للحالات العاجلة، واتساب أسرع.',
    aboutHeroText: 'LUX مش مجرد براند. حركة اتولدت في شوارع القاهرة، بتخلط حنين التسعينيات مع ثقافة الستريت وير الحديثة.',
    aboutStory1P1: 'بدأنا بفكرة واحدة: نعمل ستريت وير مصري يقدر يقف جنب أحسن براندات العالم. كل قطعة عبارة عن رسالة حب للشوارع اللي ربتنا.',
    aboutStory1P2: 'من زحمة وسط البلد لهدوء النيل، تصاميمنا بتعكس طاقة مدينة مبتنامش.',
    aboutStory2P1: 'كل قطعة LUX بتتصمم وتتصنع محليًا، وبتدعم الصنّاع المصريين اللي ورثوا الحرفة جيل ورا جيل.',
    aboutStory2P2: 'بندور على جودة تحسها، وجذور تثق فيها. مفيش طرق مختصرة، مفيش تنازلات.',
    valueQualityText: 'أقمشة فاخرة، خياطة دقيقة، تبقى معاك موسم ورا موسم.',
    valueSustainabilityText: 'موضة بطيئة، إنتاج أخلاقي، أقل هدر. أحسن للكوكب.',
    valueCommunityText: 'حركة، مش مجرد براند. أهلاً بيك في عيلة LUX.',
    blogHeroText: 'حكايات من شوارع القاهرة.',
    blogFeaturedTag: 'مميز',
    blogFeaturedTitle: 'صعود الستريت وير المصري',
    blogFeaturedExcerpt: 'إزاي جيل جديد من المصممين المصريين بيعيد رسم خريطة الستريت وير العالمية — قطعة ورا قطعة.',
    blogArticle1Title: 'خلف البرتقالي: قطعتنا الجريئة',
    blogArticle1Excerpt: 'الحكاية ورا أجرأ إصدار عندنا — وليه البرتقالي بقى اللون الجديد.',
    blogArticle2Title: 'غسلات فينتاج، قَصّات مودرن',
    blogArticle2Excerpt: 'ليه بنحب التسعينيات — وإزاي رجعناها بدون مبالغة.',
    blogArticle3Title: 'عودة الواسع',
    blogArticle3Excerpt: 'الضيق خرج، الواسع رجع. وإيه اللي يخلي التغيير ده يكمل.',
    blogArticle4Title: 'المينيماليزم في الستريت وير',
    blogArticle4Excerpt: 'إزاي "أقل = أكثر" بقى أقوى تصريح في الشارع.',
    blogArticle5Title: 'عقلك حر: حكاية طبعة',
    blogArticle5Excerpt: 'من رسمة على منديل لأكثر قطعة مبيعًا — رحلة تصميم واحد.',
    blogArticle6Title: 'بناء LUX: السنة الأولى',
    blogArticle6Excerpt: 'تأملات في أول سنة — المكاسب، الخسائر، والدروس.',
    faqQ1: 'الشحن بياخد قد إيه؟',
    faqA1: 'الشحن العادي ٣-٥ أيام عمل داخل مصر. السريع ١-٢ يوم للقاهرة والجيزة. التوصيل في نفس اليوم متاح في القاهرة للطلبات قبل الساعة ٢.',
    faqQ2: 'أقدر أرجّع المنتج؟',
    faqA2: 'أكيد! بنقبل الإرجاع خلال ١٤ يوم من الاستلام. القطعة لازم تكون مش مستعملة وبالتاج. كلمنا على واتساب لبدء الإرجاع.',
    faqQ3: 'بتشحنوا برة مصر؟',
    faqA3: 'حاليًا بنشحن داخل مصر بس. الشحن الدولي جاي قريب — اشترك في النشرة لتعرف أول واحد.',
    faqQ4: 'أعرف مقاسي إزاي؟',
    faqA4: 'كل صفحة منتج فيها دليل مقاسات مفصّل. لو بين مقاسين، بننصح تكبر مقاس لأن قَصّاتنا أوفرسايز.',
    faqQ5: 'بتقبلوا إيه طرق دفع؟',
    faqA5: 'بنقبل كروت الائتمان/الخصم، الدفع عند الاستلام، فودافون كاش، إنستاباي، وباي موب.',
    readTime3: '٣ دقايق قراءة', readTime4: '٤ دقايق قراءة', readTime5: '٥ دقايق قراءة', readTime6: '٦ دقايق قراءة',
    dateDec2025: 'ديسمبر ٢٠٢٥',
    tagline: 'ستريت وير القاهرة · منذ ٢٠٢٤',
    trustFreeShipping: 'شحن مجاني فوق ٢٠٠٠ ج.م',
    trustReturns: 'إرجاع مجاني خلال ١٤ يوم',
    trustCOD: 'الدفع عند الاستلام متاح',
    trustFastShip: 'شحن سريع لكل مصر',
    whyWeMadeIt: 'ليه عملناها؟',
    fit: 'القَصّة',
    reviews: 'التقييمات',
    verifiedBuyer: 'مشتري موثّق',
    writeReview: 'اكتب تقييم',
    basedOn: 'بناءً على {n} تقييم',
    sold: 'اتباعت {n}+ مرة',
    emptyBagSuggestions: 'بص على القطع دي',
    emptyWishlistSuggestions: 'ممكن يعجبوك',
    pageNotFoundTitle: 'تايه في الشوارع؟',
    pageNotFoundSub: 'الصفحة اللي بتدور عليها مش موجودة — بس دي موجودة.',
    exploreCollection: 'اكتشف الكوليكشن',
    backToShop: 'رجوع للمتجر',
    fitOversized: 'أوفرسايز',
    fitRegular: 'عادي',
    fitRelaxed: 'مريح',
    fitSlim: 'ضيق'
  }
};

/* ============ SAFE STORAGE / ESCAPE HELPERS ============ */
const safeParse = (key, fallback) => {
  try {
    const val = localStorage.getItem(key);
    if (val === null || val === 'undefined') return fallback;
    const parsed = JSON.parse(val);
    return parsed ?? fallback;
  } catch (e) {
    console.warn(`[LUX] Failed to parse "${key}", resetting.`, e);
    try { localStorage.removeItem(key); } catch {}
    return fallback;
  }
};

const escapeHtml = (str) => String(str ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

/* ============ PRODUCTS (مع وصف موسّع + fit + reviews data) ============ */
const PRODUCTS = [
  {
    id: 1, slug: 'nyc-graffiti',
    lookName: 'NYC GRAFFITI', lookNameAr: 'جرافيتي نيويورك',
    itemName: 'GRAPHIC TEE', itemNameAr: 'تي شيرت جرافيك',
    price: 999.99, comparePrice: 1299.99,
    category: 'graphic-tees', categoryLabel: 'Graphic Tees', categoryLabelAr: 'تي شيرتات',
    sizes: ['S','M','L','XL','XXL'],
    colors: [
      { name: 'White', nameAr: 'أبيض', hex: '#FFFFFF' },
      { name: 'Black', nameAr: 'أسود', hex: '#0A0A0A' },
      { name: 'Lavender', nameAr: 'لافندر', hex: '#E5DFF0' }
    ],
    badge: 'Sale', images: ['./images/look-01.png'], stock: 8,
    rating: 4.8, reviewCount: 127, soldCount: 850,
    fit: 'Oversized',
    description: 'Inspired by 90s NYC graffiti culture. Oversized graphic tee in premium cotton.',
    descriptionAr: 'مستوحى من ثقافة الجرافيتي في نيويورك التسعينيات. تي شيرت أوفرسايز بقطن فاخر.',
    descriptionLong: 'A wearable piece of NYC history — our NYC Graffiti Graphic Tee captures the raw energy of 90s street art with a modern cut. Screen-printed by hand on 240 GSM ring-spun cotton, it holds its shape wash after wash and only gets softer with time. The boxy silhouette drops just right on the shoulders, making it perfect for layering or wearing solo.',
    descriptionLongAr: 'قطعة من تاريخ نيويورك — التي شيرت ده بيلقط الطاقة الجريئة لفنون الشوارع التسعينيات بقَصّة عصرية. مطبوع يدويًا على قطن ٢٤٠ جرام، بيحافظ على شكله مهما اتغسل وبيبقى أنعم مع الوقت. القَصّة الواسعة بتنزل على الكتف بشكل مثالي.',
    whyWeMadeIt: 'Cairo streets taught us to stand out. NYC taught us how to shout it.',
    whyWeMadeItAr: 'شوارع القاهرة علمتنا نتميز. نيويورك علمتنا نعلي صوتنا.',
    materials: '100% Cotton · 240 GSM',
    care: 'Machine wash cold · Do not bleach · Iron low'
  },
  {
    id: 2, slug: 'free-mind',
    lookName: 'FREE MIND', lookNameAr: 'عقل حر',
    itemName: 'SLEEVELESS TEE', itemNameAr: 'تي شيرت صيفي',
    price: 899.99,
    category: 'graphic-tees', categoryLabel: 'Graphic Tees', categoryLabelAr: 'تي شيرتات',
    sizes: ['M','L','XL'],
    colors: [
      { name: 'Black', nameAr: 'أسود', hex: '#0A0A0A' },
      { name: 'Faded Black', nameAr: 'أسود باهت', hex: '#3A3A3A' }
    ],
    images: ['./images/look-02.png'], stock: 15,
    rating: 4.6, reviewCount: 84, soldCount: 420,
    fit: 'Regular',
    description: 'Sleeveless graphic tee with "Free Your Mind" print. Breathable cotton.',
    descriptionAr: 'تي شيرت صيفي بطبعة "Free Your Mind". قطن يتنفس.',
    descriptionLong: 'Made for Cairo summers. The Free Mind Sleeveless Tee is cut from lightweight breathable cotton with a relaxed shoulder that lets air flow freely. The bold "Free Your Mind" print is a daily reminder — wear it on the court, the rooftop, or anywhere the city takes you.',
    descriptionLongAr: 'معمول لصيف القاهرة. التي شيرت الصيفي ده من قطن خفيف يتنفس، بقَصّة مريحة على الكتف بتسمح بالتهوية. طبعة "Free Your Mind" الجريئة تذكيرك اليومي — البسه في النادي، على السطوح، أو أي مكان في المدينة.',
    whyWeMadeIt: 'Because your mind deserves the same freedom your body does.',
    whyWeMadeItAr: 'لأن عقلك يستحق نفس الحرية اللي جسمك محتاجها.',
    materials: '100% Cotton',
    care: 'Machine wash cold · Iron inside out'
  },
  {
    id: 3, slug: 'orange-heat',
    lookName: 'ORANGE HEAT', lookNameAr: 'حرارة برتقالي',
    itemName: 'ZIP HOODIE', itemNameAr: 'هودي بسحاب',
    price: 1799.99,
    category: 'oversized-fits', categoryLabel: 'Oversized Fits', categoryLabelAr: 'أوفرسايز',
    sizes: ['S','M','L','XL'],
    colors: [
      { name: 'Orange', nameAr: 'برتقالي', hex: '#FF6B1A' },
      { name: 'Grey', nameAr: 'رمادي', hex: '#9A9A9A' }
    ],
    badge: 'New', images: ['./images/look-03.png'], stock: 3,
    rating: 4.9, reviewCount: 41, soldCount: 180,
    fit: 'Oversized',
    description: 'Statement zip hoodie in bold orange. Heavyweight, boxy fit.',
    descriptionAr: 'هودي بسحاب بلون برتقالي جريء. تقيل، أوفرسايز، بإحساس تقني.',
    descriptionLong: 'Our boldest drop yet. The Orange Heat Zip Hoodie is built on 400 GSM heavyweight fleece with a double-layer hood, YKK zipper, and metal-tipped drawstrings. It is loud, it is warm, and it is built to be worn as a statement — not just a layer.',
    descriptionLongAr: 'أجرأ إصدار عندنا. هودي Orange Heat بسحاب على قماش ٤٠٠ جرام تقيل، بكابوت طبقتين، سحاب YKK، وخيطان معدنية. صوته عالي، دافي، ومصمم يلبس كتصريح مش كطبقة عادية.',
    whyWeMadeIt: 'To prove that Egypt can make loud, world-class streetwear.',
    whyWeMadeItAr: 'عشان نثبت إن مصر تقدر تعمل ستريت وير عالمي بصوت عالي.',
    materials: '80% Cotton · 20% Polyester · 400 GSM',
    care: 'Machine wash cold · Tumble dry low'
  },
  {
    id: 4, slug: 'clean-canvas',
    lookName: 'CLEAN CANVAS', lookNameAr: 'كانفاس نظيف',
    itemName: 'RIBBED TANK', itemNameAr: 'توب مضلع',
    price: 699.99,
    category: 'graphic-tees', categoryLabel: 'Graphic Tees', categoryLabelAr: 'تي شيرتات',
    sizes: ['XS','S','M','L'],
    colors: [
      { name: 'White', nameAr: 'أبيض', hex: '#FFFFFF' },
      { name: 'Black', nameAr: 'أسود', hex: '#0A0A0A' }
    ],
    images: ['./images/look-04.png'], stock: 20,
    rating: 4.5, reviewCount: 62, soldCount: 310,
    fit: 'Slim',
    description: 'Minimalist ribbed tank, perfect for layering.',
    descriptionAr: 'توب مضلع مينيمال، مثالي للطبقات.',
    descriptionLong: 'The Clean Canvas Ribbed Tank is where minimalist design meets maximum comfort. Cut from a soft cotton-elastane blend with a fitted rib that stretches without losing shape. Wear it under a hoodie, over a tee, or as a stand-alone piece in summer.',
    descriptionLongAr: 'توب Clean Canvas المضلع هو التقاء البساطة بالراحة القصوى. مصنوع من قطن و elastane بضلوع مريح يمد من غير ما يفقد شكله. البسه تحت هودي، فوق تي شيرت، أو لوحده في الصيف.',
    whyWeMadeIt: 'Every wardrobe needs a blank canvas. This is ours.',
    whyWeMadeItAr: 'كل دولاب محتاج كانفاس فاضي. ده بتاعنا.',
    materials: '95% Cotton · 5% Elastane',
    care: 'Machine wash cold · Hang dry'
  },
  {
    id: 5, slug: 'retro-99',
    lookName: 'RETRO 99', lookNameAr: 'ريترو ٩٩',
    itemName: 'VARSITY TEE', itemNameAr: 'تي شيرت فارسيتي',
    price: 1099.99,
    category: 'graphic-tees', categoryLabel: 'Graphic Tees', categoryLabelAr: 'تي شيرتات',
    sizes: ['S','M','L','XL'],
    colors: [
      { name: 'Multi', nameAr: 'متعدد', hex: '#8B1538' },
      { name: 'Navy', nameAr: 'كحلي', hex: '#1A2B4A' }
    ],
    images: ['./images/look-05.png'], stock: 12,
    rating: 4.7, reviewCount: 95, soldCount: 540,
    fit: 'Regular',
    description: 'Retro 99 varsity tee with vintage-style color-blocking.',
    descriptionAr: 'تي شيرت فارسيتي ريترو ٩٩ بستايل فينتاج.',
    descriptionLong: 'A love letter to the late 90s. The Retro 99 Varsity Tee brings back the golden era of American collegiate sportswear with vintage-washed color blocking and an oversized chest print. Cut for everyday wear — soft, structured, and made to fade beautifully over time.',
    descriptionLongAr: 'رسالة حب لآخر التسعينيات. تي شيرت Retro 99 Varsity بيرجع العصر الذهبي للملابس الرياضية الجامعية الأمريكية بغسلة فينتاج وألوان بلوك ومطبوع كبير على الصدر. مقصوص للاستخدام اليومي — ناعم، مرتب، ومصمم يبهت بشكل جميل مع الوقت.',
    whyWeMadeIt: 'The 90s never really ended. They just moved to Cairo.',
    whyWeMadeItAr: 'التسعينيات عمرها ما خلصت. بس انتقلت القاهرة.',
    materials: '100% Cotton · Vintage Wash',
    care: 'Machine wash cold'
  },
  {
    id: 6, slug: 'back-stage',
    lookName: 'BACK STAGE', lookNameAr: 'خلف الكواليس',
    itemName: 'BACK PRINT TEE', itemNameAr: 'تي شيرت بطبعة خلفية',
    price: 1199.99,
    category: 'graphic-tees', categoryLabel: 'Graphic Tees', categoryLabelAr: 'تي شيرتات',
    sizes: ['S','M','L','XL','XXL'],
    colors: [
      { name: 'White', nameAr: 'أبيض', hex: '#FFFFFF' },
      { name: 'Black', nameAr: 'أسود', hex: '#0A0A0A' },
      { name: 'Off White', nameAr: 'أوف وايت', hex: '#F5F3EE' }
    ],
    images: ['./images/look-06.png'], stock: 6,
    rating: 4.8, reviewCount: 156, soldCount: 720,
    fit: 'Oversized',
    description: 'Oversized tee with a bold back print.',
    descriptionAr: 'تي شيرت أوفرسايز بطبعة خلفية جريئة.',
    descriptionLong: 'What happens back stage stays back stage — except this print. Our Back Stage Tee is designed with a full-length back graphic printed with water-based inks, giving it a vintage feel from day one. 220 GSM heavyweight cotton, boxy cut, drop shoulders.',
    descriptionLongAr: 'اللي يحصل خلف الكواليس يفضل خلف الكواليس — ما عدا الطبعة دي. تي شيرت Back Stage معمول بطبعة كاملة على الظهر بأحبار مائية، بتديه إحساس فينتاج من أول يوم. قطن ٢٢٠ جرام تقيل، قَصّة واسعة، أكتاف نازلة.',
    whyWeMadeIt: 'Because the best stories are the ones nobody talks about.',
    whyWeMadeItAr: 'لأن أحلى الحكايات هي اللي محدش بيتكلم عنها.',
    materials: '100% Cotton · 220 GSM',
    care: 'Machine wash cold · Iron inside out'
  },
  {
    id: 7, slug: 'red-line',
    lookName: 'RED LINE', lookNameAr: 'الخط الأحمر',
    itemName: 'BACK PRINT TEE', itemNameAr: 'تي شيرت بطبعة خلفية',
    price: 1399.99,
    category: 'graphic-tees', categoryLabel: 'Graphic Tees', categoryLabelAr: 'تي شيرتات',
    sizes: ['S','M','L','XL','XXL'],
    colors: [
      { name: 'White', nameAr: 'أبيض', hex: '#FFFFFF' },
      { name: 'Red', nameAr: 'أحمر', hex: '#8B1538' }
    ],
    badge: 'New', images: ['./images/look-07.png'], stock: 2,
    rating: 4.9, reviewCount: 23, soldCount: 95,
    fit: 'Oversized',
    description: 'Iconic back-print tee paired with pinstripe pants.',
    descriptionAr: 'تي شيرت بطبعة خلفية أيقونية مع بنطلون مقلم.',
    descriptionLong: 'The Red Line Tee is our tribute to the boundary between chaos and control. Bold red typography against off-white 240 GSM cotton, with a graphic that only gets better with age. This is the piece that started it all — redesigned.',
    descriptionLongAr: 'تي شيرت Red Line هو تحيتنا للحد بين الفوضى والانضباط. طبعة حمراء جريئة على قطن ٢٤٠ جرام أوف وايت، بتصميم بيبقى أحلى مع الوقت. القطعة اللي بدأ منها كل حاجة — بإصدار جديد.',
    whyWeMadeIt: 'Some lines are meant to be crossed. This one is meant to be worn.',
    whyWeMadeItAr: 'في خطوط معمولة تتعدى. والخط ده معمول يتلبس.',
    materials: '100% Cotton · 240 GSM',
    care: 'Machine wash cold · Iron inside out'
  },
  {
    id: 8, slug: 'girl-boss',
    lookName: 'GIRL BOSS', lookNameAr: 'بوس البنت',
    itemName: 'CROP TANK', itemNameAr: 'توب قصير',
    price: 899.99,
    category: 'graphic-tees', categoryLabel: 'Graphic Tees', categoryLabelAr: 'تي شيرتات',
    sizes: ['XS','S','M','L'],
    colors: [
      { name: 'Black', nameAr: 'أسود', hex: '#0A0A0A' },
      { name: 'Charcoal', nameAr: 'فحمي', hex: '#3A3A3A' }
    ],
    badge: 'New', images: ['./images/look-08.png'], stock: 10,
    rating: 4.7, reviewCount: 71, soldCount: 380,
    fit: 'Slim',
    description: 'Fitted crop tank with a soft touch.',
    descriptionAr: 'توب قصير مظبوط بملمس ناعم.',
    descriptionLong: 'The Girl Boss Crop Tank is confidence you can wear. Cut close to the body with a slightly cropped hem, made from a soft cotton-elastane blend that moves with you. Perfect with high-rise denim, layered under an oversized button-up, or on its own.',
    descriptionLongAr: 'توب Girl Boss هو الثقة اللي تتلبس. قريب من الجسم بحاشية قصيرة، مصنوع من قطن و elastane ناعم بيتحرك معاك. مثالي مع الجينز العالي، تحت قميص واسع، أو لوحده.',
    whyWeMadeIt: 'For everyone who walks into a room like they own it.',
    whyWeMadeItAr: 'لكل حد بيدخل الأوضة كإنها بتاعته.',
    materials: '95% Cotton · 5% Elastane',
    care: 'Machine wash cold · Hang dry'
  },
  {
    id: 9, slug: 'off-duty',
    lookName: 'OFF DUTY', lookNameAr: 'في الإجازة',
    itemName: 'CLASSIC TEE', itemNameAr: 'تي شيرت كلاسيك',
    price: 799.99,
    category: 'graphic-tees', categoryLabel: 'Graphic Tees', categoryLabelAr: 'تي شيرتات',
    sizes: ['S','M','L','XL','XXL'],
    colors: [
      { name: 'White', nameAr: 'أبيض', hex: '#FFFFFF' },
      { name: 'Off White', nameAr: 'أوف وايت', hex: '#F5F3EE' },
      { name: 'Black', nameAr: 'أسود', hex: '#0A0A0A' }
    ],
    images: ['./images/look-09.png'], stock: 25,
    rating: 4.6, reviewCount: 210, soldCount: 1200,
    fit: 'Regular',
    description: 'Everyday classic tee with a subtle logo.',
    descriptionAr: 'تي شيرت كلاسيك يومي بشعار صغير.',
    descriptionLong: 'Not every day needs to be a statement. The Off Duty Classic Tee is 180 GSM combed cotton — light, breathable, and built to be your daily go-to. Small embroidered LUX logo on the chest, clean lines everywhere else.',
    descriptionLongAr: 'مش كل يوم محتاج يكون بيان. تي شيرت Off Duty الكلاسيك من قطن مُمشّط ١٨٠ جرام — خفيف، يتنفس، ومعمول يبقى يوميّك. شعار LUX مطرز صغير على الصدر، وخطوط نظيفة في كل حتة تانية.',
    whyWeMadeIt: 'Because sometimes less is the whole point.',
    whyWeMadeItAr: 'لأن في أوقات "أقل" هي الفكرة كلها.',
    materials: '100% Cotton · 180 GSM',
    care: 'Machine wash cold'
  },
  {
    id: 10, slug: 'soft-edge',
    lookName: 'SOFT EDGE', lookNameAr: 'الحافة الناعمة',
    itemName: 'PINSTRIPE PANTS', itemNameAr: 'بنطلون مقلم',
    price: 1499.99,
    category: 'baggy-denim', categoryLabel: 'Baggy Denim', categoryLabelAr: 'بناطيل واسعة',
    sizes: ['S','M','L','XL'],
    colors: [
      { name: 'Grey', nameAr: 'رمادي', hex: '#7A7A7A' },
      { name: 'Charcoal', nameAr: 'فحمي', hex: '#3A3A3A' }
    ],
    badge: 'New', images: ['./images/look-10.png'], stock: 4,
    rating: 4.8, reviewCount: 37, soldCount: 140,
    fit: 'Relaxed',
    description: 'Wide-leg pinstripe pants with a tailored edge.',
    descriptionAr: 'بنطلون مقلم واسع بحافة مرتبة.',
    descriptionLong: 'The Soft Edge Pinstripe Pants walk the line between tailored and street. Wide-leg cut in a stretch-blend fabric that drapes beautifully, with a subtle pinstripe running down the side. Dress them up with a blazer or down with a hoodie — either way, they hold the look.',
    descriptionLongAr: 'بنطلون Soft Edge المقلم بيمشي على الخط بين الرسمي والستريت. قَصّة واسعة من قماش مخلوط بيقع بشكل جميل، مع خط مقلم رفيع على الجنب. البسه رسمي مع بليزر أو كاجوال مع هودي — في الحالتين هيمسك اللوك.',
    whyWeMadeIt: 'Sharp edges, soft soul. That is Cairo in a pair of pants.',
    whyWeMadeItAr: 'حواف حادة، روح ناعمة. دي القاهرة في بنطلون.',
    materials: '60% Polyester · 40% Viscose',
    care: 'Dry clean only'
  }
];

/* ============ REVIEWS (نماذج — في الحقيقة بتيجي من backend) ============ */
const REVIEWS = {
  1: [
    { name: 'Ahmed M.', nameAr: 'أحمد م.', rating: 5, date: '2 weeks ago', dateAr: 'من أسبوعين', verified: true, text: 'Best tee I own. Fits perfect, thick fabric, print still crisp after 5 washes.', textAr: 'أحلى تي شيرت عندي. المقاس مظبوط، القماش تقيل، والطبعة لسه زي ما هي بعد ٥ غسلات.' },
    { name: 'Sara K.', nameAr: 'سارة ك.', rating: 5, date: '1 month ago', dateAr: 'من شهر', verified: true, text: 'Ordered 2 more after the first one. Quality is insane for the price.', textAr: 'طلبت ٢ كمان بعد الأول. الجودة جنان بالنسبة للسعر.' },
    { name: 'Youssef H.', nameAr: 'يوسف ح.', rating: 4, date: '1 month ago', dateAr: 'من شهر', verified: true, text: 'Great fit, wish they had more colors. Shipping was super fast.', textAr: 'قَصّة حلوة، ياريت لو فيه ألوان أكتر. الشحن كان سريع جدًا.' }
  ],
  3: [
    { name: 'Omar T.', nameAr: 'عمر ط.', rating: 5, date: '1 week ago', dateAr: 'من أسبوع', verified: true, text: 'The orange pops. Heavyweight, feels premium. Worth every pound.', textAr: 'البرتقالي بيلفت. تقيل وبيحس فاخر. يستاهل كل جنيه.' },
    { name: 'Layla S.', nameAr: 'ليلى س.', rating: 5, date: '3 weeks ago', dateAr: 'من ٣ أسابيع', verified: true, text: 'Bought it for my brother, ended up keeping it. Sorry not sorry.', textAr: 'اشتريته لأخويا، وفي الآخر خدته. آسفة مش آسفة.' }
  ],
  7: [
    { name: 'Karim N.', nameAr: 'كريم ن.', rating: 5, date: '5 days ago', dateAr: 'من ٥ أيام', verified: true, text: 'The print quality is next level. Back print is huge and clean.', textAr: 'جودة الطبعة مستوى تاني. طبعة الظهر كبيرة ونظيفة.' }
  ]
};

/* ============ STATE ============ */
const AppState = {
  cart: safeParse('lux_cart', []),
  wishlist: safeParse('lux_wishlist', []),
  savedForLater: safeParse('lux_saved', []),
  recentlyViewed: safeParse('lux_recent', []),
  user: safeParse('lux_user', null),
  orders: safeParse('lux_orders', []),
  isRTL: localStorage.getItem('lux_rtl') === 'true',
  activeDrawer: null,
  lastFocused: null,
  activeModal: null,
  modalLastFocused: null,
  exitIntentShown: sessionStorage.getItem('lux_exit_shown') === 'true'
};

const FREE_SHIPPING_THRESHOLD = 2000;

/* ============ HELPERS ============ */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);
const formatPrice = n => AppState.isRTL ? `${n.toFixed(2)} ج.م` : `EGP ${n.toFixed(2)}`;
const isTouchDevice = () => window.matchMedia('(hover: none)').matches;
const toArabicNum = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
const num = n => AppState.isRTL ? toArabicNum(n) : n;
const t = (key, vars) => {
  let str = TRANSLATIONS[AppState.isRTL ? 'ar' : 'en'][key] || key;
  if (vars) Object.keys(vars).forEach(k => { str = str.replace(`{${k}}`, vars[k]); });
  return str;
};

/* ============ STORAGE ============ */
const saveCart = () => localStorage.setItem('lux_cart', JSON.stringify(AppState.cart));
const saveWishlist = () => localStorage.setItem('lux_wishlist', JSON.stringify(AppState.wishlist));
const saveSavedLater = () => localStorage.setItem('lux_saved', JSON.stringify(AppState.savedForLater));
const saveRecentlyViewed = () => localStorage.setItem('lux_recent', JSON.stringify(AppState.recentlyViewed));
const saveUser = u => { AppState.user = u; localStorage.setItem('lux_user', JSON.stringify(u)); };
const saveOrders = () => localStorage.setItem('lux_orders', JSON.stringify(AppState.orders));
const logout = () => { AppState.user = null; localStorage.removeItem('lux_user'); window.location.href = 'index.html'; };

/* ============ CART ============ */
const getCartCount = () => AppState.cart.reduce((s, i) => s + i.qty, 0);
const getCartTotal = () => AppState.cart.reduce((s, i) => s + i.price * i.qty, 0);
const getShipping = () => getCartTotal() >= FREE_SHIPPING_THRESHOLD || getCartTotal() === 0 ? 0 : 80;
const getFinalTotal = () => getCartTotal() + getShipping();
const getFreeShippingRemaining = () => Math.max(0, FREE_SHIPPING_THRESHOLD - getCartTotal());

function addToCart(product, size, color, qty = 1) {
  const existing = AppState.cart.find(i =>
    i.productId === product.id && i.size === size && i.color === color.name);
  if (existing) { existing.qty += qty; }
  else {
    AppState.cart.push({
      productId: product.id, slug: product.slug,
      lookName: AppState.isRTL ? product.lookNameAr : product.lookName,
      itemName: AppState.isRTL ? product.itemNameAr : product.itemName,
      price: product.price, img: product.images[0],
      size, color: color.name, colorHex: color.hex, qty
    });
  }
  saveCart();
  renderCartDrawer();
  updateBagCount();
  const bagIcon = $('bagOpen');
  if (bagIcon) { bagIcon.classList.remove('pulse'); void bagIcon.offsetWidth; bagIcon.classList.add('pulse'); }
}

function removeFromCart(idx) { AppState.cart.splice(idx, 1); saveCart(); renderCartDrawer(); updateBagCount(); }
function updateQty(idx, delta) {
  AppState.cart[idx].qty += delta;
  if (AppState.cart[idx].qty <= 0) AppState.cart.splice(idx, 1);
  saveCart(); renderCartDrawer(); updateBagCount();
}
function clearCart() { AppState.cart = []; saveCart(); renderCartDrawer(); updateBagCount(); }

function moveToSavedLater(idx) {
  const item = AppState.cart[idx];
  AppState.savedForLater.push(item);
  AppState.cart.splice(idx, 1);
  saveCart(); saveSavedLater(); renderCartDrawer(); updateBagCount();
  showToast(t('savedForLater'));
}
function moveSavedToCart(idx) {
  const item = AppState.savedForLater[idx];
  AppState.cart.push(item);
  AppState.savedForLater.splice(idx, 1);
  saveCart(); saveSavedLater(); renderCartDrawer(); updateBagCount();
  showToast(t('itemAdded'));
}

/* ============ WISHLIST / RECENTLY VIEWED ============ */
function toggleWishlist(productId) {
  const idx = AppState.wishlist.indexOf(productId);
  if (idx >= 0) { AppState.wishlist.splice(idx, 1); saveWishlist(); updateWishlistCount(); return false; }
  AppState.wishlist.push(productId); saveWishlist(); updateWishlistCount(); return true;
}
const isWishlisted = id => AppState.wishlist.includes(id);

function updateWishlistCount() {
  const el = $('wishlistCount');
  if (!el) return;
  const count = AppState.wishlist.length;
  el.textContent = num(count);
  el.classList.toggle('show', count > 0);
}

function addToRecentlyViewed(productId) {
  AppState.recentlyViewed = AppState.recentlyViewed.filter(id => id !== productId);
  AppState.recentlyViewed.unshift(productId);
  if (AppState.recentlyViewed.length > 6) AppState.recentlyViewed.pop();
  saveRecentlyViewed();
}

/* ============ STAR RATING HELPER ============ */
function starsHTML(rating, size = 14) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  const star = (filled) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5"><polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9"/></svg>`;
  return `<span class="stars">${star(true).repeat(full)}${half ? star(true) : ''}${star(false).repeat(empty)}</span>`;
}

/* ============ PRODUCT CARD (مع rating + sold) ============ */
function productCardHTML(p) {
  const wishlisted = isWishlisted(p.id);
  const badgeClass = p.badge === 'Sale' ? 'sale' : (p.badge === 'New' ? 'new' : '');
  const stockHtml = p.stock <= 5 ? `<div class="product-card-stock">${t('lowStock', { n: num(p.stock) })}</div>` : '';

  const lookName = escapeHtml(AppState.isRTL ? p.lookNameAr : p.lookName);
  const itemName = escapeHtml(AppState.isRTL ? p.itemNameAr : p.itemName);
  const imgSrc = escapeHtml(p.images[0]);
  const slugSafe = encodeURIComponent(p.slug);

  return `
    <div class="product-card" data-product-id="${p.id}">
      <div class="product-card-image">
        <a href="product.html?slug=${slugSafe}" style="display:block;width:100%;height:100%;">
          <img src="${imgSrc}" alt="${lookName}" loading="lazy">
        </a>
        <button class="product-card-wish ${wishlisted ? 'active' : ''}" data-wish-id="${p.id}" aria-label="Wishlist">
          <svg viewBox="0 0 24 24"><path d="M20.8 4.6c-2-2-5.2-2-7.1 0L12 6.3l-1.7-1.7c-1.9-2-5.1-2-7.1 0-2 2-2 5.2 0 7.1L12 20.5l8.8-8.8c2-1.9 2-5.1 0-7.1z"/></svg>
        </button>
        ${p.badge ? `<span class="product-card-badge ${badgeClass}">${t(p.badge.toLowerCase())}</span>` : ''}
        <button class="product-card-quick" data-quick-id="${p.id}">${t('quickView')}</button>
      </div>
      <div class="product-card-info">
        ${p.rating ? `
          <div class="product-card-rating">
            ${starsHTML(p.rating, 11)}
            <span class="product-card-rating-count">(${num(p.reviewCount)})</span>
          </div>
        ` : ''}
        <div class="product-card-look">${lookName}</div>
        <div class="product-card-name">${itemName}</div>
        <div class="product-card-price-row">
          <span class="product-card-price">${formatPrice(p.price)}</span>
          ${p.comparePrice ? `<span class="product-card-compare">${formatPrice(p.comparePrice)}</span>` : ''}
        </div>
        <div class="product-card-colors">
          ${p.colors.map(c => `<span class="product-card-color" style="background:${escapeHtml(c.hex)};" title="${escapeHtml(AppState.isRTL ? c.nameAr : c.name)}"></span>`).join('')}
        </div>
        ${stockHtml}
      </div>
    </div>
  `;
}

/* ============ PRODUCT CARD EVENT DELEGATION ============ */
document.addEventListener('click', e => {
  const wishBtn = e.target.closest('[data-wish-id]');
  if (wishBtn) {
    e.preventDefault(); e.stopPropagation();
    const id = parseInt(wishBtn.dataset.wishId, 10);
    const added = toggleWishlist(id);
    wishBtn.classList.toggle('active', added);
    showToast(added ? t('wishAdded') : t('wishRemoved'));
    return;
  }

  const quickBtn = e.target.closest('[data-quick-id]');
  if (quickBtn) {
    e.preventDefault(); e.stopPropagation();
    const id = parseInt(quickBtn.dataset.quickId, 10);
    openQuickView(id);
    return;
  }
});

/* ============ CART DRAWER RENDER (مع Empty State جديد) ============ */
function renderCartDrawer() {
  const cartItems = $('cartItems');
  const cartTotal = $('cartTotal');
  const cartCount = $('cartHeaderCount');
  const checkoutBtn = $('checkoutBtn');
  if (!cartItems) return;

  const shippingBar = $('freeShippingBar');
  if (shippingBar) {
    if (AppState.cart.length === 0) shippingBar.style.display = 'none';
    else {
      shippingBar.style.display = 'block';
      const remaining = getFreeShippingRemaining();
      const percent = Math.min(100, (getCartTotal() / FREE_SHIPPING_THRESHOLD) * 100);
      const fill = $('freeShippingFill');
      const text = $('freeShippingText');
      if (fill) { fill.style.width = `${percent}%`; fill.classList.toggle('complete', remaining === 0); }
      if (text) {
        text.innerHTML = remaining === 0
          ? t('freeShippingUnlocked')
          : t('freeShippingProgress', { amount: formatPrice(remaining) });
      }
    }
  }

  if (AppState.cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
        </div>
        <p class="cart-empty-title">${t('emptyBag')}</p>
        <p class="cart-empty-sub">${t('emptyBagText')}</p>
        <a href="shop.html" class="btn btn-sm" style="margin-top:16px;">${t('startShopping')}</a>
      </div>
    `;
    if (checkoutBtn) checkoutBtn.disabled = true;
  } else {
    cartItems.innerHTML = AppState.cart.map((item, idx) => `
      <div class="cart-item">
        <div class="cart-item-img" style="background-image:url('${escapeHtml(item.img)}');"></div>
        <div class="cart-item-info">
          <div class="cart-item-look">${escapeHtml(item.lookName)}</div>
          <div class="cart-item-name">${escapeHtml(item.itemName)}</div>
          <div class="cart-item-meta">${t('size')}: ${escapeHtml(item.size)} · ${t('color')}: ${escapeHtml(item.color)}</div>
          <div class="cart-item-row">
            <div class="qty-stepper" data-idx="${idx}">
              <button data-action="dec">−</button>
              <span>${num(item.qty)}</span>
              <button data-action="inc">+</button>
            </div>
            <div class="cart-item-price">${formatPrice(item.price * item.qty)}</div>
          </div>
          <button class="cart-remove" data-idx="${idx}">${t('remove')}</button>
          <button class="cart-save-later" data-save-idx="${idx}">${t('saveForLater')}</button>
        </div>
      </div>
    `).join('');
    if (checkoutBtn) checkoutBtn.disabled = false;
  }
  if (cartTotal) cartTotal.textContent = formatPrice(getCartTotal());
  if (cartCount) cartCount.textContent = getCartCount() > 0 ? `(${num(getCartCount())})` : '';

  renderCartCrossSell();
}

function renderCartCrossSell() {
  const container = $('cartCrossSell');
  const itemsContainer = $('cartCrossSellItems');
  if (!container || !itemsContainer) return;

  if (AppState.cart.length === 0) { container.style.display = 'none'; return; }

  const cartIds = AppState.cart.map(i => i.productId);
  const suggestions = PRODUCTS.filter(p => !cartIds.includes(p.id)).slice(0, 4);
  if (suggestions.length === 0) { container.style.display = 'none'; return; }

  container.style.display = 'block';
  itemsContainer.innerHTML = suggestions.map(p => `
    <div class="cart-cross-item" data-cross-id="${p.id}">
      <div class="cart-cross-item-img" style="background-image:url('${escapeHtml(p.images[0])}');"></div>
      <div class="cart-cross-item-name">${escapeHtml(AppState.isRTL ? p.itemNameAr : p.itemName)}</div>
      <div class="cart-cross-item-price">${formatPrice(p.price)}</div>
    </div>
  `).join('');

  itemsContainer.querySelectorAll('[data-cross-id]').forEach(el => {
    el.addEventListener('click', () => {
      const id = parseInt(el.dataset.crossId, 10);
      const product = PRODUCTS.find(p => p.id === id);
      if (!product) return;
      const size = product.sizes[Math.floor(product.sizes.length / 2)];
      addToCart(product, size, product.colors[0]);
      showToast(`${t('itemAdded')} — ${AppState.isRTL ? product.itemNameAr : product.itemName}`);
    });
  });
}

function updateBagCount() {
  const bagCount = $('bagCount');
  if (!bagCount) return;
  const count = getCartCount();
  bagCount.textContent = num(count);
  bagCount.classList.toggle('show', count > 0);
}

/* ============ FOCUS TRAP ============ */
function getFocusable(el) {
  return el.querySelectorAll('button:not([disabled]), a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
}

function trapFocus(e) {
  const container = AppState.activeModal || AppState.activeDrawer;
  if (!container || e.key !== 'Tab') return;
  const focusables = getFocusable(container);
  if (focusables.length === 0) return;
  const first = focusables[0], last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

/* ============ DRAWER SYSTEM ============ */
function openDrawer(drawer) {
  if (AppState.activeDrawer && AppState.activeDrawer !== drawer) AppState.activeDrawer.classList.remove('show');
  AppState.lastFocused = document.activeElement;
  const overlay = $('overlay'); if (overlay) overlay.classList.add('show');
  drawer.classList.add('show');
  AppState.activeDrawer = drawer;
  document.body.classList.add('no-scroll');
  setTimeout(() => { const f = getFocusable(drawer); if (f.length) f[0].focus(); }, 100);
}

function closeAllDrawers() {
  if (!AppState.activeDrawer) return;
  AppState.activeDrawer.classList.remove('show');
  const overlay = $('overlay'); if (overlay) overlay.classList.remove('show');
  AppState.activeDrawer = null;
  if (!AppState.activeModal) document.body.classList.remove('no-scroll');
  if (AppState.lastFocused?.focus) AppState.lastFocused.focus();
}

/* ============ MODAL SYSTEM ============ */
function openModal(modalId) {
  const modal = $(modalId);
  if (!modal) return;
  AppState.modalLastFocused = document.activeElement;
  modal.classList.add('show');
  AppState.activeModal = modal;
  document.body.classList.add('no-scroll');
  setTimeout(() => { const f = getFocusable(modal); if (f.length) f[0].focus(); }, 100);
}

function closeModal(modalId) {
  const modal = modalId ? $(modalId) : AppState.activeModal;
  if (!modal) return;
  modal.classList.remove('show');
  if (AppState.activeModal === modal) AppState.activeModal = null;
  if (!AppState.activeDrawer) document.body.classList.remove('no-scroll');
  if (AppState.modalLastFocused?.focus) AppState.modalLastFocused.focus();
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay.show').forEach(m => m.classList.remove('show'));
  AppState.activeModal = null;
  if (!AppState.activeDrawer) document.body.classList.remove('no-scroll');
}

/* ============ TOAST ============ */
let toastTimer;
function showToast(msg) {
  const toast = $('toast'), text = $('toastText');
  if (!toast || !text) return;
  text.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

/* ============ QUICK VIEW ============ */
let currentQuickViewProduct = null;
let currentQuickViewSize = null;

function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  currentQuickViewProduct = product;
  currentQuickViewSize = null;

  const modal = $('quickViewModal');
  if (!modal) return;
  const body = modal.querySelector('.quick-view-body');
  if (!body) return;

  const lookName = escapeHtml(AppState.isRTL ? product.lookNameAr : product.lookName);
  const itemName = escapeHtml(AppState.isRTL ? product.itemNameAr : product.itemName);

  body.innerHTML = `
    <div class="quick-view-image">
      <img src="${escapeHtml(product.images[0])}" alt="${lookName}">
    </div>
    <div class="quick-view-info">
      <div class="pdp-look">${lookName}</div>
      <h3>${itemName}</h3>
      <div class="quick-view-price">${formatPrice(product.price)}</div>
      <div class="pdp-section-label" style="margin-bottom:12px;">${t('size')}</div>
      <div class="quick-view-sizes">
        ${product.sizes.map(s => `<button class="quick-view-size" data-qv-size="${escapeHtml(s)}">${escapeHtml(s)}</button>`).join('')}
      </div>
      <button class="btn btn-block" id="quickViewAdd" style="margin-bottom:12px;">${t('addToBag')}</button>
      <a href="product.html?slug=${encodeURIComponent(product.slug)}" class="btn btn-ghost btn-block">${t('view')} ${itemName}</a>
    </div>
  `;

  body.querySelectorAll('[data-qv-size]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentQuickViewSize = btn.dataset.qvSize;
      body.querySelectorAll('[data-qv-size]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  body.querySelector('#quickViewAdd')?.addEventListener('click', () => {
    if (!currentQuickViewSize) { showToast(t('sizeRequired')); return; }
    addToCart(product, currentQuickViewSize, product.colors[0]);
    showToast(`${t('itemAdded')} — ${AppState.isRTL ? product.itemNameAr : product.itemName}`);
    closeModal('quickViewModal');
  });

  openModal('quickViewModal');
}

function openSizeGuide() { openModal('sizeGuideModal'); }

/* ============ EXIT INTENT ============ */
function setupExitIntent() {
  if (AppState.exitIntentShown) return;
  if (isTouchDevice()) return;
  if (sessionStorage.getItem('lux_user_subscribed') === 'true') return;
  if (!$('exitIntentModal')) return;

  const handler = (e) => {
    if (e.clientY <= 5) {
      document.removeEventListener('mouseleave', handler);
      if (AppState.exitIntentShown) return;
      AppState.exitIntentShown = true;
      sessionStorage.setItem('lux_exit_shown', 'true');
      openModal('exitIntentModal');
    }
  };
  document.addEventListener('mouseleave', handler);
}

/* ============ TRANSLATIONS APPLY ============ */
function applyTranslations() {
  document.querySelectorAll('[data-t]').forEach(el => {
    const trans = t(el.dataset.t);
    if (trans) el.textContent = trans;
  });
  document.querySelectorAll('[data-t-ph]').forEach(el => {
    const trans = t(el.dataset.tPh);
    if (trans) el.placeholder = trans;
  });
  const localeLabel = $('localeLabel');
  if (localeLabel) localeLabel.textContent = t('locale');
  const mobileLangLabel = $('mobileLangLabel');
  if (mobileLangLabel) mobileLangLabel.textContent = AppState.isRTL ? 'English' : 'العربية';
  const taglineEl = $('logoTagline');
  if (taglineEl) taglineEl.textContent = t('tagline');
}

function applyRTL() {
  document.documentElement.dir = AppState.isRTL ? 'rtl' : 'ltr';
  document.documentElement.lang = AppState.isRTL ? 'ar' : 'en';
  const arBtn = $('arBtn');
  if (arBtn) arBtn.textContent = AppState.isRTL ? 'English →' : '← عربي';
}

function toggleRTL() {
  if (isLangTransitioning) return;
  const targetLang = AppState.isRTL ? 'en' : 'ar';

  playLangTransition(targetLang, () => {
    AppState.isRTL = !AppState.isRTL;
    localStorage.setItem('lux_rtl', AppState.isRTL);
    applyRTL();
    applyTranslations();
    renderCartDrawer();
    updateWishlistCount();
    if (typeof window.onLanguageChange === 'function') window.onLanguageChange();
  });
}

/* ============ TEMPLATES ============ */
function renderNavbar() {
  return `
    <nav class="navbar">
      <button class="icon-btn menu-icon" id="menuOpen" aria-label="Menu">
        <svg viewBox="0 0 24 24"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
      </button>
      <a href="index.html" class="logo-wrap" aria-label="LUX">
        <span class="logo">LUX</span>
        <span class="logo-tagline" id="logoTagline" data-t="tagline">${t('tagline')}</span>
      </a>
      <div class="nav-links">
        <a href="shop.html" data-page="shop">Shop</a>
        <a href="about.html" data-page="about">About</a>
        <a href="blog.html" data-page="blog">Journal</a>
        <a href="contact.html" data-page="contact">Contact</a>
      </div>
      <div class="nav-right">
        <button class="locale" id="localeBtn"><span id="localeLabel">Locale</span> <span class="locale-arrow">▼</span></button>
        <button class="icon-btn wishlist-icon" id="wishlistNavBtn" aria-label="Wishlist">
          <svg viewBox="0 0 24 24"><path d="M20.8 4.6c-2-2-5.2-2-7.1 0L12 6.3l-1.7-1.7c-1.9-2-5.1-2-7.1 0-2 2-2 5.2 0 7.1L12 20.5l8.8-8.8c2-1.9 2-5.1 0-7.1z"/></svg>
          <span class="wishlist-count" id="wishlistCount">0</span>
        </button>
        <button class="icon-btn bag-icon" id="bagOpen" aria-label="Bag">
          <svg viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
          <span class="bag-count" id="bagCount">0</span>
        </button>
        <a href="account.html" class="icon-btn account-icon" aria-label="Account">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>
        </a>
      </div>
    </nav>`;
}

function renderFooter() {
  return `
    <footer class="footer">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">LUX</div>
          <p class="footer-desc" data-t="footerDesc">Egyptian streetwear born in Cairo. 90s nostalgia meets modern design.</p>
          <div class="footer-designer">
            <div class="footer-designer-label" data-t="madeBy">Made by Karam</div>
            <div class="footer-social">
              <a href="https://wa.me/201211659075" target="_blank" rel="noopener" class="whatsapp" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24"><path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 0 0 3.84 1h.01a7.94 7.94 0 0 0 5.55-13.58z"/></svg>
                <span>+20 121 165 9075</span>
              </a>
              <a href="https://instagram.com/ka__2410" target="_blank" rel="noopener" class="instagram" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none"/></svg>
                <span>@ka__2410</span>
              </a>
              <a href="https://github.com/Ka2410" target="_blank" rel="noopener" class="github" aria-label="GitHub">
                <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                <span>@Ka2410</span>
              </a>
            </div>
          </div>
        </div>
        <div class="footer-col"><h4 data-t="shop">Shop</h4><ul>
          <li><a href="shop.html" data-t="allProducts">All Products</a></li>
          <li><a href="shop.html#graphic-tees">Graphic Tees</a></li>
          <li><a href="shop.html#baggy-denim">Baggy Denim</a></li>
          <li><a href="shop.html#oversized-fits">Oversized Fits</a></li>
        </ul></div>
        <div class="footer-col"><h4 data-t="about">Company</h4><ul>
          <li><a href="about.html" data-t="about">About Us</a></li>
          <li><a href="blog.html" data-t="blog">Journal</a></li>
          <li><a href="contact.html" data-t="contact">Contact</a></li>
        </ul></div>
        <div class="footer-col"><h4 data-t="account">Support</h4><ul>
          <li><a href="account.html" data-t="account">Account</a></li>
          <li><a href="wishlist.html" data-t="wishlist">Wishlist</a></li>
          <li><a href="cart.html" data-t="yourBag">Cart</a></li>
        </ul></div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 LUX. All rights reserved.</span>
        <span>Made in Egypt 🇪🇬</span>
      </div>
    </footer>`;
}

function renderDrawers() {
  return `
    <div class="overlay" id="overlay"></div>
    <aside class="cart-drawer" id="cartDrawer">
      <div class="cart-header">
        <h3><span data-t="yourBag">Your Bag</span> <span class="count" id="cartHeaderCount"></span></h3>
        <button class="close-btn" id="cartClose" aria-label="Close">×</button>
      </div>
      <div class="free-shipping-bar" id="freeShippingBar" style="display:none;">
        <div class="free-shipping-text" id="freeShippingText"></div>
        <div class="free-shipping-progress"><div class="free-shipping-fill" id="freeShippingFill"></div></div>
      </div>
      <div class="cart-items" id="cartItems"></div>
      <div class="cart-cross-sell" id="cartCrossSell" style="display:none;">
        <h4 data-t="crossSellTitle">You May Also Like</h4>
        <div class="cart-cross-sell-items" id="cartCrossSellItems"></div>
      </div>
      <div class="cart-footer">
        <div class="cart-total-row">
          <span class="label" data-t="total">TOTAL</span>
          <span class="value" id="cartTotal">EGP 0.00</span>
        </div>
        <a href="checkout.html" class="btn btn-block" id="checkoutBtn" data-t="checkout" style="display:flex;">Checkout</a>
      </div>
    </aside>

    <aside class="mobile-menu" id="mobileMenu">
      <div class="mobile-menu-bg"></div>
      <div class="menu-header">
        <div class="menu-logo">LUX</div>
        <button class="close-btn" id="menuClose" aria-label="Close">×</button>
      </div>
      <nav>
        <a href="shop.html"><span class="menu-num">01</span><span data-t="shop">Shop</span><svg class="menu-arrow" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13,6 19,12 13,18"/></svg></a>
        <a href="about.html"><span class="menu-num">02</span><span data-t="about">About</span><svg class="menu-arrow" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13,6 19,12 13,18"/></svg></a>
        <a href="blog.html"><span class="menu-num">03</span><span data-t="blog">Journal</span><svg class="menu-arrow" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13,6 19,12 13,18"/></svg></a>
        <a href="contact.html"><span class="menu-num">04</span><span data-t="contact">Contact</span><svg class="menu-arrow" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13,6 19,12 13,18"/></svg></a>
        <a href="wishlist.html"><span class="menu-num">05</span><span data-t="wishlist">Wishlist</span><svg class="menu-arrow" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13,6 19,12 13,18"/></svg></a>
        <a href="account.html"><span class="menu-num">06</span><span data-t="account">Account</span><svg class="menu-arrow" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13,6 19,12 13,18"/></svg></a>
      </nav>
      <div class="mobile-menu-footer">
        <button class="mobile-lang-switch" id="mobileLangBtn">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>
          <span id="mobileLangLabel">العربية</span>
        </button>
        <div class="mobile-social">
          <a href="https://instagram.com/ka__2410" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></svg></a>
          <a href="https://wa.me/201211659075" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 0 0 3.84 1h.01a7.94 7.94 0 0 0 5.55-13.58z"/></svg></a>
          <a href="https://github.com/Ka2410" target="_blank" rel="noopener" aria-label="GitHub"><svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></a>
        </div>
      </div>
    </aside>

    <div class="toast" id="toast">
      <svg viewBox="0 0 24 24"><polyline points="4,12 10,18 20,6"/></svg>
      <span id="toastText"></span>
    </div>

    <a href="https://wa.me/201211659075" target="_blank" rel="noopener" class="whatsapp-float" id="whatsappFloat" aria-label="WhatsApp">
      <svg viewBox="0 0 24 24"><path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 0 0 3.84 1h.01a7.94 7.94 0 0 0 5.55-13.58zM12.05 18.5h-.01a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.49.65.67-2.43-.16-.25a6.6 6.6 0 0 1 1.02-8.24 6.57 6.57 0 0 1 9.32 0 6.6 6.6 0 0 1 1.93 4.66 6.62 6.62 0 0 1-6.6 6.62zm3.62-4.94c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.2-.5.65-.62.78-.11.13-.23.15-.42.05-.2-.1-.83-.31-1.58-.98-.59-.52-.98-1.17-1.1-1.37-.11-.2-.01-.3.09-.4.09-.09.2-.23.3-.34.1-.11.13-.2.2-.33.06-.13.03-.25-.02-.35-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.33l-.38-.01a.73.73 0 0 0-.53.25c-.18.2-.7.68-.7 1.65 0 .98.71 1.92.81 2.05.1.13 1.4 2.13 3.38 2.99.47.2.84.32 1.13.41.47.15.9.13 1.24.08.38-.06 1.17-.48 1.33-.94.16-.46.16-.86.11-.94-.05-.08-.18-.13-.38-.23z"/></svg>
    </a>
  `;
}

function renderModals() {
  return `
    <div class="modal-overlay" id="sizeGuideModal">
      <div class="modal">
        <div class="modal-header">
          <h3 data-t="sizeGuide">Size Guide</h3>
          <button class="modal-close" data-close-modal aria-label="Close">×</button>
        </div>
        <div class="modal-body">
          <table class="size-guide-table">
            <thead><tr><th data-t="size">Size</th><th>Chest (cm)</th><th>Length (cm)</th><th>Shoulder (cm)</th></tr></thead>
            <tbody>
              <tr><td>S</td><td>96</td><td>68</td><td>44</td></tr>
              <tr><td>M</td><td>100</td><td>70</td><td>46</td></tr>
              <tr><td>L</td><td>104</td><td>72</td><td>48</td></tr>
              <tr><td>XL</td><td>108</td><td>74</td><td>50</td></tr>
              <tr><td>XXL</td><td>112</td><td>76</td><td>52</td></tr>
            </tbody>
          </table>
          <div class="size-guide-note">
            ${AppState.isRTL
              ? 'كل القطع عندنا أوفرسايز قَصّة. لو بتحب قَصّة أضيق، اختر مقاس أصغر.'
              : 'All our pieces have an oversized fit. If you prefer a closer fit, size down.'}
          </div>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="quickViewModal">
      <div class="modal quick-view">
        <button class="modal-close" data-close-modal style="position:absolute;top:16px;right:16px;z-index:3;background:#fff;border-radius:50%;width:36px;height:36px;">×</button>
        <div class="quick-view-body" style="display:contents;"></div>
      </div>
    </div>

    <div class="modal-overlay" id="exitIntentModal">
      <div class="modal exit-popup">
        <button class="modal-close" data-close-modal style="position:absolute;top:16px;right:16px;">×</button>
        <div class="exit-popup-eyebrow">Limited Time</div>
        <h3 data-t="exitTitle">Wait! Don't go</h3>
        <p data-t="exitText">Get 10% off your first order. Enter your email to unlock the code.</p>
        <div class="exit-popup-code">LUX10</div>
        <form id="exitForm">
          <input type="email" class="form-input" placeholder="Your email" required data-t-ph="emailPlaceholder">
          <button type="submit" class="btn btn-block" data-t="exitCta">Unlock 10% Off</button>
        </form>
      </div>
    </div>
  `;
}

/* ============ INIT ============ */
function initApp() {
  applyRTL();
  applyTranslations();
  injectLangTransition();

  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 10), { passive: true });
  }

  const overlay = $('overlay');
  const cartDrawer = $('cartDrawer');
  const mobileMenu = $('mobileMenu');

  $('bagOpen')?.addEventListener('click', () => cartDrawer && openDrawer(cartDrawer));
  $('menuOpen')?.addEventListener('click', () => mobileMenu && openDrawer(mobileMenu));
  $('cartClose')?.addEventListener('click', closeAllDrawers);
  $('menuClose')?.addEventListener('click', closeAllDrawers);
  overlay?.addEventListener('click', closeAllDrawers);

  $('wishlistNavBtn')?.addEventListener('click', () => { window.location.href = 'wishlist.html'; });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (AppState.activeModal) closeAllModals();
      else closeAllDrawers();
    }
    trapFocus(e);
  });

  document.addEventListener('click', e => {
    if (e.target.classList.contains('modal-overlay')) closeAllModals();
    if (e.target.closest('[data-close-modal]')) closeAllModals();
  });

  const cartItems = $('cartItems');
  if (cartItems) {
    cartItems.addEventListener('click', e => {
      const removeBtn = e.target.closest('.cart-remove');
      if (removeBtn) { removeFromCart(parseInt(removeBtn.dataset.idx, 10)); return; }
      const saveBtn = e.target.closest('.cart-save-later');
      if (saveBtn) { moveToSavedLater(parseInt(saveBtn.dataset.saveIdx, 10)); return; }
      const stepBtn = e.target.closest('.qty-stepper button');
      if (stepBtn) {
        const idx = parseInt(stepBtn.closest('.qty-stepper').dataset.idx, 10);
        updateQty(idx, stepBtn.dataset.action === 'inc' ? 1 : -1);
      }
    });
  }

  $('arBtn')?.addEventListener('click', toggleRTL);
  $('localeBtn')?.addEventListener('click', toggleRTL);
  $('mobileLangBtn')?.addEventListener('click', () => {
    if (AppState.activeDrawer) closeAllDrawers();
    setTimeout(() => toggleRTL(), 200);
  });

  $('exitForm')?.addEventListener('submit', e => {
    e.preventDefault();
    sessionStorage.setItem('lux_user_subscribed', 'true');
    showToast(t('emailSent'));
    closeModal('exitIntentModal');
  });

  renderCartDrawer();
  updateBagCount();
  updateWishlistCount();
  setupExitIntent();

  document.addEventListener('contextmenu', e => {
    const allowed = e.target.closest('button, a, input, textarea, [contenteditable]');
    if (!allowed) e.preventDefault();
  });
  document.addEventListener('dragstart', e => { if (e.target.tagName === 'IMG') e.preventDefault(); });
}