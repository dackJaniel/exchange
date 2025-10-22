// Additional languages for comprehensive multilingual support
// Completes Arabic, Hindi, and Dutch translations

export const additionalLanguages = {
  ar: {
    meta: {
      title: "حاسبة العملات المجانية - أسعار الصرف المباشرة لأكثر من 180 عملة",
      description: "قم بتحويل العملات فوريًا بأسعار الصرف المباشرة. حاسبة عملات مجانية تدعم اليورو والدولار الأمريكي والجنيه الإسترليني والين الياباني وأكثر من 180 عملة. تعمل دون اتصال كـ PWA. سريعة ودقيقة ومُحسّنة للهاتف المحمول.",
      manifestName: "حاسبة العملات - محول العملات المجاني",
      manifestDescription: "حاسبة عملات احترافية مع أسعار صرف مباشرة لأكثر من 180 عملة. تعمل دون اتصال بتقنية PWA.",
      openGraphTitle: "حاسبة العملات المجانية - تحويل اليورو والدولار الأمريكي والجنيه الإسترليني + 180 أخرى",
      openGraphDescription: "حاسبة عملات احترافية مع أسعار صرف في الوقت الفعلي. التحويل بين اليورو والدولار الأمريكي والجنيه الإسترليني والين الياباني وأكثر من 170 عملة. مجانية وسريعة وتعمل دون اتصال كتطبيق ويب تدريجي.",
      twitterTitle: "حاسبة العملات - أسعار الصرف المباشرة",
      twitterDescription: "تحويل العملات بأسعار مباشرة لليورو والدولار الأمريكي والجنيه الإسترليني + 180 أخرى. PWA مجاني يعمل دون اتصال.",
      schemaDescription: "حاسبة عملات احترافية مع أسعار صرف مباشرة لأكثر من 180 عملة دولية بما في ذلك اليورو والدولار الأمريكي والجنيه الإسترليني والين الياباني والفرنك السويسري وغيرها الكثير",
    },

    ui: {
      calculator: "حاسبة",
      currencyConverter: "محول العملات",
      convert: "تحويل",
      from: "من",
      to: "إلى",
      amount: "المبلغ",
      result: "النتيجة",
      exchangeRate: "سعر الصرف",
      lastUpdated: "آخر تحديث",
      refresh: "تحديث",
      loading: "جارٍ التحميل...",
      error: "حدث خطأ",
      offline: "غير متصل",
      online: "متصل",
      liveRates: "أسعار مباشرة",
      cachedRates: "أسعار مخزنة",
      selectCurrency: "اختر العملة",
      clear: "مسح",
      equals: "يساوي",
      calculate: "احسب",
      backToCalculator: "العودة للحاسبة",
      installApp: "تثبيت التطبيق",
      shareApp: "مشاركة التطبيق",
      about: "حول",
      help: "مساعدة",
      settings: "الإعدادات",
      language: "اللغة",
      theme: "المظهر",
      notifications: "الإشعارات",
      privacyPolicy: "سياسة الخصوصية",
      termsOfService: "شروط الخدمة",
      contactUs: "اتصل بنا",
    },

    conversion: {
      title: "تحويل {amount} {from} إلى {to}",
      description: "قم بتحويل {amount} {fromName} إلى {toName} بأسعار الصرف المباشرة. احصل على تحويل دقيق للعملة من {from} إلى {to}.",
      result: "{amount} {from} = {convertedAmount} {to}",
      rate: "1 {from} = {rate} {to}",
      lastUpdate: "آخر تحديث: {time}",
      offlineNotice: "أنت غير متصل. عرض آخر سعر صرف مخزن مؤقتاً.",
      conversionTips: "نصائح التحويل",
      whyUseOurConverter: "لماذا تستخدم محولنا؟",
      keyFeatures: "الميزات الرئيسية",
      perfectFor: "مثالي لـ",
    },

    keywords: [
      "حاسبة العملات", "محول العملات", "حاسبة سعر الصرف", "محول عملات مجاني",
      "تحويل العملات", "حاسبة يورو دولار", "حاسبة eur usd", "يورو إلى دولار",
      "حاسبة جنيه يورو", "أسعار صرف مباشرة", "تحويل فوري", "عملات عالمية"
    ],

    faq: {
      title: "الأسئلة الشائعة",
      questions: {
        howToUse: "كيف أستخدم حاسبة العملات؟",
        isItFree: "هل حاسبة العملات هذه مجانية؟",
        howAccurate: "ما مدى دقة أسعار الصرف؟",
        howOften: "كم مرة يتم تحديث الأسعار؟",
        workOffline: "هل تعمل دون اتصال؟",
        whichCurrencies: "ما هي العملات المدعومة؟",
        installApp: "هل يمكنني تثبيتها كتطبيق؟",
        dataPrivacy: "كيف يتم التعامل مع بياناتي؟"
      },
      answers: {
        howToUse: "ببساطة اختر عملتك المصدر والهدف، أدخل المبلغ واحصل على نتائج تحويل فورية بأسعار صرف مباشرة.",
        isItFree: "نعم! حاسبة العملات الخاصة بنا مجانية تماماً دون الحاجة للتسجيل.",
        howAccurate: "نستخدم مصادر بيانات مالية موثوقة ونحدث الأسعار كل 15 دقيقة لضمان أقصى دقة.",
        howOften: "يتم تحديث أسعار الصرف كل 15 دقيقة خلال ساعات السوق.",
        workOffline: "نعم! تطبيق PWA الخاص بنا يعمل دون اتصال باستخدام آخر الأسعار المخزنة مؤقتاً.",
        whichCurrencies: "ندعم أكثر من 180 عملة دولية تشمل جميع العملات الرئيسية في العالم.",
        installApp: "نعم! يمكنك تثبيت تطبيق الويب التقدمي على جهازك للوصول السريع.",
        dataPrivacy: "نحترم خصوصيتك. لا يتم جمع أو تخزين أي بيانات شخصية."
      }
    }
  },

  hi: {
    meta: {
      title: "मुफ्त मुद्रा कैलकुलेटर - 180+ मुद्राओं के लिए लाइव एक्सचेंज रेट्स",
      description: "लाइव एक्सचेंज रेट्स के साथ तुरंत मुद्राओं को कन्वर्ट करें। EUR, USD, GBP, JPY और 180+ मुद्राओं का समर्थन करने वाला मुफ्त मुद्रा कैलकुलेटर। PWA के रूप में ऑफलाइन काम करता है। तेज़, सटीक और मोबाइल-अनुकूलित।",
      manifestName: "मुद्रा कैलकुलेटर - मुफ्त मुद्रा कनवर्टर",
      manifestDescription: "180+ मुद्राओं के लिए लाइव एक्सचेंज रेट्स के साथ पेशेवर मुद्रा कैलकुलेटर। PWA तकनीक के साथ ऑफलाइन काम करता है।",
      openGraphTitle: "मुफ्त मुद्रा कैलकुलेटर - EUR, USD, GBP + 180 और अधिक कन्वर्ट करें",
      openGraphDescription: "रियल-टाइम एक्सचेंज रेट्स के साथ पेशेवर मुद्रा कैलकुलेटर। EUR, USD, GBP, JPY और 170+ मुद्राओं के बीच कन्वर्ट करें। मुफ्त, तेज़ और प्रोग्रेसिव वेब ऐप के रूप में ऑफलाइन काम करता है।",
      twitterTitle: "मुद्रा कैलकुलेटर - लाइव एक्सचेंज रेट्स",
      twitterDescription: "EUR, USD, GBP + 180 और अधिक के लिए लाइव रेट्स के साथ मुद्राओं को कन्वर्ट करें। मुफ्त PWA ऑफलाइन काम करता है।",
      schemaDescription: "EUR, USD, GBP, JPY, CHF और कई और अधिक सहित 180+ अंतर्राष्ट्रीय मुद्राओं के लिए लाइव एक्सचेंज रेट्स के साथ पेशेवर मुद्रा कैलकुलेटर",
    },

    ui: {
      calculator: "कैलकुलेटर",
      currencyConverter: "मुद्रा कनवर्टर",
      convert: "कन्वर्ट करें",
      from: "से",
      to: "में",
      amount: "राशि",
      result: "परिणाम",
      exchangeRate: "एक्सचेंज रेट",
      lastUpdated: "अंतिम अपडेट",
      refresh: "रिफ्रेश करें",
      loading: "लोड हो रहा है...",
      error: "त्रुटि हुई",
      offline: "ऑफलाइन",
      online: "ऑनलाइन",
      liveRates: "लाइव रेट्स",
      cachedRates: "कैश्ड रेट्स",
      selectCurrency: "मुद्रा चुनें",
      clear: "साफ करें",
      equals: "बराबर",
      calculate: "गणना करें",
      backToCalculator: "कैलकुलेटर पर वापस जाएं",
      installApp: "ऐप इंस्टॉल करें",
      shareApp: "ऐप साझा करें",
      about: "हमारे बारे में",
      help: "सहायता",
      settings: "सेटिंग्स",
      language: "भाषा",
      theme: "थीम",
      notifications: "सूचनाएं",
      privacyPolicy: "गोपनीयता नीति",
      termsOfService: "सेवा की शर्तें",
      contactUs: "संपर्क करें",
    },

    conversion: {
      title: "{amount} {from} को {to} में कन्वर्ट करें",
      description: "लाइव एक्सचेंज रेट्स के साथ {amount} {fromName} को {toName} में कन्वर्ट करें। {from} से {to} के लिए सटीक मुद्रा रूपांतरण प्राप्त करें।",
      result: "{amount} {from} = {convertedAmount} {to}",
      rate: "1 {from} = {rate} {to}",
      lastUpdate: "अंतिम अपडेट: {time}",
      offlineNotice: "आप ऑफलाइन हैं। अंतिम कैश्ड एक्सचेंज रेट दिखा रहे हैं।",
      conversionTips: "कन्वर्जन टिप्स",
      whyUseOurConverter: "हमारा कनवर्टर क्यों उपयोग करें?",
      keyFeatures: "मुख्य विशेषताएं",
      perfectFor: "के लिए बिल्कुल सही",
    },

    keywords: [
      "मुद्रा कैलकुलेटर", "मुद्रा कनवर्टर", "एक्सचेंज रेट कैलकुलेटर", "मुफ्त मुद्रा कनवर्टर",
      "मुद्रा रूपांतरण", "यूरो डॉलर कैलकुलेटर", "eur usd कैलकुलेटर", "यूरो से डॉलर",
      "पाउंड यूरो कैलकुलेटर", "लाइव एक्सचेंज रेट्स", "तत्काल रूपांतरण", "वैश्विक मुद्राएं"
    ],

    faq: {
      title: "अक्सर पूछे जाने वाले प्रश्न",
      questions: {
        howToUse: "मुद्रा कैलकुलेटर का उपयोग कैसे करें?",
        isItFree: "क्या यह मुद्रा कैलकुलेटर मुफ्त है?",
        howAccurate: "एक्सचेंज रेट्स कितने सटीक हैं?",
        howOften: "रेट्स कितनी बार अपडेट होते हैं?",
        workOffline: "क्या यह ऑफलाइन काम करता है?",
        whichCurrencies: "कौन सी मुद्राएं समर्थित हैं?",
        installApp: "क्या मैं इसे ऐप के रूप में इंस्टॉल कर सकता हूं?",
        dataPrivacy: "मेरे डेटा को कैसे संभाला जाता है?"
      },
      answers: {
        howToUse: "बस अपनी स्रोत और लक्ष्य मुद्राओं का चयन करें, राशि दर्ज करें और लाइव एक्सचेंज रेट्स के साथ तत्काल रूपांतरण परिणाम प्राप्त करें।",
        isItFree: "हां! हमारा मुद्रा कैलकुलेटर पूरी तरह से मुफ्त है, कोई पंजीकरण आवश्यक नहीं।",
        howAccurate: "हम विश्वसनीय वित्तीय डेटा स्रोतों का उपयोग करते हैं और अधिकतम सटीकता के लिए हर 15 मिनट में रेट्स अपडेट करते हैं।",
        howOften: "एक्सचेंज रेट्स बाजार के घंटों के दौरान हर 15 मिनट में अपडेट होते हैं।",
        workOffline: "हां! हमारा PWA अंतिम कैश्ड रेट्स का उपयोग करके ऑफलाइन काम करता है।",
        whichCurrencies: "हम दुनिया की सभी प्रमुख मुद्राओं सहित 180+ अंतर्राष्ट्रीय मुद्राओं का समर्थन करते हैं।",
        installApp: "हां! आप त्वरित पहुंच के लिए अपने डिवाइस पर हमारे प्रोग्रेसिव वेब ऐप को इंस्टॉल कर सकते हैं।",
        dataPrivacy: "हम आपकी गोपनीयता का सम्मान करते हैं। कोई व्यक्तिगत डेटा एकत्रित या संग्रहीत नहीं किया जाता।"
      }
    }
  },

  nl: {
    meta: {
      title: "Gratis Valuta Calculator - Live Wisselkoersen voor 180+ Valuta's",
      description: "Converteer valuta's direct met live wisselkoersen. Gratis valuta calculator die EUR, USD, GBP, JPY en 180+ valuta's ondersteunt. Werkt offline als PWA. Snel, nauwkeurig en mobiel-geoptimaliseerd.",
      manifestName: "Valuta Calculator - Gratis Valuta Converter",
      manifestDescription: "Professionele valuta calculator met live wisselkoersen voor 180+ valuta's. Werkt offline met PWA technologie.",
      openGraphTitle: "Gratis Valuta Calculator - Converteer EUR, USD, GBP + 180 Meer",
      openGraphDescription: "Professionele valuta calculator met real-time wisselkoersen. Converteer tussen EUR, USD, GBP, JPY en 170+ valuta's. Gratis, snel en werkt offline als Progressive Web App.",
      twitterTitle: "Valuta Calculator - Live Wisselkoersen",
      twitterDescription: "Converteer valuta's met live koersen voor EUR, USD, GBP + 180 meer. Gratis PWA werkt offline.",
      schemaDescription: "Professionele valuta calculator met live wisselkoersen voor 180+ internationale valuta's inclusief EUR, USD, GBP, JPY, CHF en vele meer",
    },

    ui: {
      calculator: "Calculator",
      currencyConverter: "Valuta Converter",
      convert: "Converteer",
      from: "Van",
      to: "Naar",
      amount: "Bedrag",
      result: "Resultaat",
      exchangeRate: "Wisselkoers",
      lastUpdated: "Laatst Bijgewerkt",
      refresh: "Verversen",
      loading: "Laden...",
      error: "Fout opgetreden",
      offline: "Offline",
      online: "Online",
      liveRates: "Live Koersen",
      cachedRates: "Gecachte Koersen",
      selectCurrency: "Valuta Selecteren",
      clear: "Wissen",
      equals: "Gelijk aan",
      calculate: "Berekenen",
      backToCalculator: "Terug naar Calculator",
      installApp: "App Installeren",
      shareApp: "App Delen",
      about: "Over Ons",
      help: "Help",
      settings: "Instellingen",
      language: "Taal",
      theme: "Thema",
      notifications: "Meldingen",
      privacyPolicy: "Privacybeleid",
      termsOfService: "Servicevoorwaarden",
      contactUs: "Contact Opnemen",
    },

    conversion: {
      title: "Converteer {amount} {from} naar {to}",
      description: "Converteer {amount} {fromName} naar {toName} met live wisselkoersen. Krijg nauwkeurige valuta conversie van {from} naar {to}.",
      result: "{amount} {from} = {convertedAmount} {to}",
      rate: "1 {from} = {rate} {to}",
      lastUpdate: "Laatst bijgewerkt: {time}",
      offlineNotice: "Je bent offline. Toont de laatst gecachte wisselkoers.",
      conversionTips: "Conversie Tips",
      whyUseOurConverter: "Waarom onze converter gebruiken?",
      keyFeatures: "Hoofdkenmerken",
      perfectFor: "Perfect Voor",
    },

    keywords: [
      "valuta calculator", "valuta converter", "wisselkoers calculator", "gratis valuta converter",
      "valuta omrekenen", "euro dollar calculator", "eur usd calculator", "euro naar dollar",
      "pond euro calculator", "live wisselkoersen", "directe omrekening", "wereldwijde valuta's"
    ],

    faq: {
      title: "Veelgestelde Vragen",
      questions: {
        howToUse: "Hoe gebruik ik de valuta calculator?",
        isItFree: "Is deze valuta calculator gratis?",
        howAccurate: "Hoe nauwkeurig zijn de wisselkoersen?",
        howOften: "Hoe vaak worden de koersen bijgewerkt?",
        workOffline: "Werkt het offline?",
        whichCurrencies: "Welke valuta's worden ondersteund?",
        installApp: "Kan ik het als app installeren?",
        dataPrivacy: "Hoe wordt mijn data behandeld?"
      },
      answers: {
        howToUse: "Selecteer gewoon je bron- en doelvaluta's, voer het bedrag in en krijg directe conversieresultaten met live wisselkoersen.",
        isItFree: "Ja! Onze valuta calculator is volledig gratis zonder registratie vereist.",
        howAccurate: "We gebruiken betrouwbare financiële databronnen en updaten koersen elke 15 minuten voor maximale nauwkeurigheid.",
        howOften: "Wisselkoersen worden elke 15 minuten tijdens markturen bijgewerkt.",
        workOffline: "Ja! Onze PWA werkt offline met de laatst gecachte koersen.",
        whichCurrencies: "We ondersteunen 180+ internationale valuta's inclusief alle belangrijke wereldvaluta's.",
        installApp: "Ja! Je kunt onze Progressive Web App op je apparaat installeren voor snelle toegang.",
        dataPrivacy: "We respecteren je privacy. Geen persoonlijke gegevens worden verzameld of opgeslagen."
      }
    }
  }
};

export type AdditionalLanguageKey = keyof typeof additionalLanguages;
