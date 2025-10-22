"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCurrencyStore } from "@/lib/store/currency";
import { currencies, getCurrencyByCode } from "@/lib/currencies";
import { useI18n } from "@/lib/i18n/provider";
import { formatNumber } from "@/lib/utils";
import { EnhancedBreadcrumb } from "@/components/seo/EnhancedBreadcrumb";
import { EnhancedFAQSection } from "@/components/seo/EnhancedFAQSection";
import { InternalLinkGrid } from "@/components/seo/InternalLinkGrid";
import { generateConversionStructuredData } from "@/lib/seo/meta-descriptions";

interface EnhancedConversionPageProps {
  fromCurrencyCode: string;
  toCurrencyCode: string;
  amount: number;
  locale?: string;
}

export function EnhancedConversionPage({
  fromCurrencyCode,
  toCurrencyCode,
  amount,
  locale: propLocale,
}: EnhancedConversionPageProps) {
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const { locale: contextLocale } = useI18n();
  const locale = propLocale || contextLocale;
  const { setBaseCurrency, setTargetCurrency, getCurrentRate, isOnline } =
    useCurrencyStore();

  // Get currency objects
  const fromCurrency =
    getCurrencyByCode(fromCurrencyCode) ||
    currencies.find((c) => c.code === fromCurrencyCode) ||
    currencies[0];
  const toCurrency =
    getCurrencyByCode(toCurrencyCode) ||
    currencies.find((c) => c.code === toCurrencyCode) ||
    currencies[1];

  // Get localized texts
  const getLocalizedTexts = (locale: string) => {
    const texts: Record<string, Record<string, string>> = {
      convert: {
        en: "Convert",
        de: "Umrechnen",
        es: "Convertir",
        fr: "Convertir",
        it: "Convertire",
        pt: "Converter",
        ru: "Конвертировать",
        ja: "変換",
        "zh-cn": "转换",
        ar: "تحويل",
        hi: "कन्वर्ट करें",
        nl: "Converteer",
      },
      from: {
        en: "From",
        de: "Von",
        es: "De",
        fr: "De",
        it: "Da",
        pt: "De",
        ru: "Из",
        ja: "から",
        "zh-cn": "从",
        ar: "من",
        hi: "से",
        nl: "Van",
      },
      to: {
        en: "to",
        de: "zu",
        es: "a",
        fr: "vers",
        it: "in",
        pt: "para",
        ru: "в",
        ja: "へ",
        "zh-cn": "到",
        ar: "إلى",
        hi: "में",
        nl: "naar",
      },
      result: {
        en: "Result",
        de: "Ergebnis",
        es: "Resultado",
        fr: "Résultat",
        it: "Risultato",
        pt: "Resultado",
        ru: "Результат",
        ja: "結果",
        "zh-cn": "结果",
        ar: "النتيجة",
        hi: "परिणाम",
        nl: "Resultaat",
      },
      exchangeRate: {
        en: "Exchange Rate",
        de: "Wechselkurs",
        es: "Tipo de Cambio",
        fr: "Taux de Change",
        it: "Tasso di Cambio",
        pt: "Taxa de Câmbio",
        ru: "Курс Валют",
        ja: "為替レート",
        "zh-cn": "汇率",
        ar: "سعر الصرف",
        hi: "एक्सचेंज रेट",
        nl: "Wisselkoers",
      },
      lastUpdated: {
        en: "Last Updated",
        de: "Zuletzt aktualisiert",
        es: "Última actualización",
        fr: "Dernière mise à jour",
        it: "Ultimo aggiornamento",
        pt: "Última atualização",
        ru: "Последнее обновление",
        ja: "最終更新",
        "zh-cn": "最后更新",
        ar: "آخر تحديث",
        hi: "अंतिम अपडेट",
        nl: "Laatst bijgewerkt",
      },
      loading: {
        en: "Loading...",
        de: "Lädt...",
        es: "Cargando...",
        fr: "Chargement...",
        it: "Caricamento...",
        pt: "Carregando...",
        ru: "Загрузка...",
        ja: "読み込み中...",
        "zh-cn": "加载中...",
        ar: "جارٍ التحميل...",
        hi: "लोड हो रहा है...",
        nl: "Laden...",
      },
      currencyCalculator: {
        en: "Currency Calculator",
        de: "Währungsrechner",
        es: "Calculadora de Divisas",
        fr: "Calculateur de Devises",
        it: "Calcolatore di Valute",
        pt: "Calculadora de Moedas",
        ru: "Валютный Калькулятор",
        ja: "通貨計算機",
        "zh-cn": "货币计算器",
        ar: "حاسبة العملات",
        hi: "मुद्रा कैलकुलेटर",
        nl: "Valuta Calculator",
      },
      liveRates: {
        en: "Live Rates",
        de: "Live-Kurse",
        es: "Tipos en Vivo",
        fr: "Taux en Direct",
        it: "Tassi Live",
        pt: "Taxas ao Vivo",
        ru: "Живые курсы",
        ja: "ライブレート",
        "zh-cn": "实时汇率",
        ar: "أسعار مباشرة",
        hi: "लाइव रेट्स",
        nl: "Live Koersen",
      },
      cachedRates: {
        en: "Cached Rates",
        de: "Gespeicherte Kurse",
        es: "Tipos en Caché",
        fr: "Taux en Cache",
        it: "Tassi Cache",
        pt: "Taxas em Cache",
        ru: "Кешированные курсы",
        ja: "キャッシュレート",
        "zh-cn": "缓存汇率",
        ar: "أسعار مخزنة",
        hi: "कैश्ड रेट्स",
        nl: "Gecachte Koersen",
      },
      error: {
        en: "Error",
        de: "Fehler",
        es: "Error",
        fr: "Erreur",
        it: "Errore",
        pt: "Erro",
        ru: "Ошибка",
        ja: "エラー",
        "zh-cn": "错误",
        ar: "خطأ",
        hi: "त्रुटि",
        nl: "Fout",
      },
      withLiveRates: {
        en: "with live exchange rates",
        de: "mit aktuellen Wechselkursen",
        es: "con tipos de cambio en vivo",
        fr: "avec des taux de change en direct",
        it: "con tassi di cambio in tempo reale",
        pt: "com taxas de câmbio ao vivo",
        ru: "с живыми курсами валют",
        ja: "ライブ為替レートで",
        "zh-cn": "使用实时汇率",
        ar: "بأسعار صرف مباشرة",
        hi: "लाइव एक्सचेंज रेट्स के साथ",
        nl: "met live wisselkoersen",
      },
      getAccurate: {
        en: "Get accurate currency conversion for",
        de: "Erhalten Sie genaue Währungsumrechnung für",
        es: "Obtenga conversión de moneda precisa para",
        fr: "Obtenez une conversion de devise précise pour",
        it: "Ottieni conversione valuta accurata per",
        pt: "Obtenha conversão de moeda precisa para",
        ru: "Получите точную конвертацию валют для",
        ja: "正確な通貨換算を取得",
        "zh-cn": "获得准确的货币转换",
        ar: "احصل على تحويل عملة دقيق لـ",
        hi: "सटीक मुद्रा रूपांतरण प्राप्त करें",
        nl: "Krijg nauwkeurige valutaconversie voor",
      },
    };

    return {
      convert: texts.convert[locale] || texts.convert.en,
      from: texts.from[locale] || texts.from.en,
      to: texts.to[locale] || texts.to.en,
      result: texts.result[locale] || texts.result.en,
      exchangeRate: texts.exchangeRate[locale] || texts.exchangeRate.en,
      lastUpdated: texts.lastUpdated[locale] || texts.lastUpdated.en,
      loading: texts.loading[locale] || texts.loading.en,
      currencyCalculator:
        texts.currencyCalculator[locale] || texts.currencyCalculator.en,
      liveRates: texts.liveRates[locale] || texts.liveRates.en,
      cachedRates: texts.cachedRates[locale] || texts.cachedRates.en,
      error: texts.error[locale] || texts.error.en,
    };
  };

  // Get localized currency name
  const getLocalizedCurrencyName = (currency: any, locale: string) => {
    const currencyNames: Record<string, Record<string, string>> = {
      EUR: {
        en: "Euro",
        de: "Euro",
        es: "Euro",
        fr: "Euro",
        it: "Euro",
        pt: "Euro",
        ru: "Евро",
        ja: "ユーロ",
        "zh-cn": "欧元",
        ar: "يورو",
        hi: "यूरो",
        nl: "Euro",
      },
      USD: {
        en: "US Dollar",
        de: "US-Dollar",
        es: "Dólar Estadounidense",
        fr: "Dollar Américain",
        it: "Dollaro Americano",
        pt: "Dólar Americano",
        ru: "Доллар США",
        ja: "米ドル",
        "zh-cn": "美元",
        ar: "دولار أمريكي",
        hi: "अमेरिकी डॉलर",
        nl: "Amerikaanse Dollar",
      },
      GBP: {
        en: "British Pound",
        de: "Britisches Pfund",
        es: "Libra Esterlina",
        fr: "Livre Sterling",
        it: "Sterlina Britannica",
        pt: "Libra Esterlina",
        ru: "Британский фунт",
        ja: "英ポンド",
        "zh-cn": "英镑",
        ar: "جنيه إسترليني",
        hi: "ब्रिटिश पाउंड",
        nl: "Brits Pond",
      },
      JPY: {
        en: "Japanese Yen",
        de: "Japanischer Yen",
        es: "Yen Japonés",
        fr: "Yen Japonais",
        it: "Yen Giapponese",
        pt: "Yen Japonês",
        ru: "Японская иена",
        ja: "日本円",
        "zh-cn": "日元",
        ar: "ين ياباني",
        hi: "जापानी येन",
        nl: "Japanse Yen",
      },
      CHF: {
        en: "Swiss Franc",
        de: "Schweizer Franken",
        es: "Franco Suizo",
        fr: "Franc Suisse",
        it: "Franco Svizzero",
        pt: "Franco Suíço",
        ru: "Швейцарский франк",
        ja: "スイスフラン",
        "zh-cn": "瑞士法郎",
        ar: "فرنك سويسري",
        hi: "स्विस फ्रैंक",
        nl: "Zwitserse Frank",
      },
      CAD: {
        en: "Canadian Dollar",
        de: "Kanadischer Dollar",
        es: "Dólar Canadiense",
        fr: "Dollar Canadien",
        it: "Dollaro Canadese",
        pt: "Dólar Canadense",
        ru: "Канадский доллар",
        ja: "カナダドル",
        "zh-cn": "加拿大元",
        ar: "دولار كندي",
        hi: "कनाडाई डॉलर",
        nl: "Canadese Dollar",
      },
      AUD: {
        en: "Australian Dollar",
        de: "Australischer Dollar",
        es: "Dólar Australiano",
        fr: "Dollar Australien",
        it: "Dollaro Australiano",
        pt: "Dólar Australiano",
        ru: "Австралийский доллар",
        ja: "豪ドル",
        "zh-cn": "澳元",
        ar: "دولار أسترالي",
        hi: "ऑस्ट्रेलियाई डॉलर",
        nl: "Australische Dollar",
      },
      CNY: {
        en: "Chinese Yuan",
        de: "Chinesischer Yuan",
        es: "Yuan Chino",
        fr: "Yuan Chinois",
        it: "Yuan Cinese",
        pt: "Yuan Chinês",
        ru: "Китайский юань",
        ja: "人民元",
        "zh-cn": "人民币",
        ar: "يوان صيني",
        hi: "चीनी युआन",
        nl: "Chinese Yuan",
      },
      INR: {
        en: "Indian Rupee",
        de: "Indische Rupie",
        es: "Rupia India",
        fr: "Roupie Indienne",
        it: "Rupia Indiana",
        pt: "Rupia Indiana",
        ru: "Индийская рупия",
        ja: "インドルピー",
        "zh-cn": "印度卢比",
        ar: "روبية هندية",
        hi: "भारतीय रुपया",
        nl: "Indiase Roepie",
      },
      KRW: {
        en: "South Korean Won",
        de: "Südkoreanischer Won",
        es: "Won Surcoreano",
        fr: "Won Sud-Coréen",
        it: "Won Sudcoreano",
        pt: "Won Sul-Coreano",
        ru: "Южнокорейская вона",
        ja: "韓国ウォン",
        "zh-cn": "韩元",
        ar: "وون كوري جنوبي",
        hi: "दक्षिण कोरियाई वॉन",
        nl: "Zuid-Koreaanse Won",
      },
    };

    return currencyNames[currency.code]?.[locale] || currency.name;
  };

  const localizedTexts = getLocalizedTexts(locale);
  const fromCurrencyName = getLocalizedCurrencyName(fromCurrency, locale);
  const toCurrencyName = getLocalizedCurrencyName(toCurrency, locale);

  // Set currencies in store
  useEffect(() => {
    setBaseCurrency(fromCurrency);
    setTargetCurrency(toCurrency);
  }, [setBaseCurrency, setTargetCurrency, fromCurrency, toCurrency]);

  // Fetch and calculate rates
  useEffect(() => {
    const fetchRates = () => {
      setLoading(true);
      try {
        const currentRate = getCurrentRate();
        if (currentRate) {
          setRate(currentRate);
          setResult(amount * currentRate);
        }
      } catch (error) {
        console.error("Error fetching rates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [fromCurrency.code, toCurrency.code, amount, getCurrentRate]);

  // Generate page metadata
  const pageTitle = `${localizedTexts.convert} ${amount} ${fromCurrency.code} ${localizedTexts.to} ${toCurrency.code} - ${fromCurrencyName} ${localizedTexts.to} ${toCurrencyName}`;
  const pageDescription = `${localizedTexts.convert} ${amount} ${fromCurrencyName} ${localizedTexts.to} ${toCurrencyName} ${localizedTexts.withLiveRates}. ${localizedTexts.getAccurate} ${fromCurrency.code} ${localizedTexts.to} ${toCurrency.code}.`;

  // Generate structured data
  const structuredData = generateConversionStructuredData(
    fromCurrency.code,
    toCurrency.code,
    rate || 0,
    amount,
    locale,
  );

  // Breadcrumb items
  const breadcrumbItems = [
    { name: localizedTexts.currencyCalculator, href: "/" },
    {
      name: `${amount} ${fromCurrency.code} ${localizedTexts.to} ${toCurrency.code}`,
      href: `#`,
      current: true,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <EnhancedBreadcrumb items={breadcrumbItems} />

        {/* Main Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent leading-tight">
            {pageTitle}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {pageDescription}
          </p>
        </div>

        {/* Conversion Result Card */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* From Amount */}
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-orange-400">
                {formatNumber(amount)} {fromCurrency.code}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {fromCurrencyName}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="text-gray-400 text-2xl">→</div>
            </div>

            {/* To Amount */}
            <div className="text-center">
              {loading ? (
                <div className="text-2xl font-mono text-gray-500">
                  {localizedTexts.loading}
                </div>
              ) : result ? (
                <>
                  <div className="text-2xl font-mono font-bold text-green-400">
                    {formatNumber(result)} {toCurrency.code}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {toCurrencyName}
                  </div>
                </>
              ) : (
                <div className="text-2xl font-mono text-red-400">
                  {localizedTexts.error}
                </div>
              )}
            </div>
          </div>

          {/* Exchange Rate Info */}
          {rate && !loading && (
            <div className="mt-6 pt-4 border-t border-zinc-700">
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-1">
                  {localizedTexts.exchangeRate}
                </div>
                <div className="font-mono text-lg">
                  1 {fromCurrency.code} = {formatNumber(rate)} {toCurrency.code}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {localizedTexts.lastUpdated}:{" "}
                  {new Date().toLocaleDateString(locale)}
                </div>
              </div>
            </div>
          )}

          {/* Online/Offline Status */}
          <div className="mt-4 text-center">
            <span
              className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                isOnline
                  ? "bg-green-900 text-green-300"
                  : "bg-red-900 text-red-300"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  isOnline ? "bg-green-400" : "bg-red-400"
                }`}
              />
              {isOnline ? localizedTexts.liveRates : localizedTexts.cachedRates}
            </span>
          </div>
        </div>

        {/* Internal Links Grid */}
        <InternalLinkGrid
          currentPair={{
            from: fromCurrency.code,
            to: toCurrency.code,
            amount: amount,
          }}
        />

        {/* FAQ Section */}
        <EnhancedFAQSection
          currencyPair={{
            from: fromCurrency.code,
            to: toCurrency.code,
            rate: rate || undefined,
            amount: amount,
          }}
        />

        {/* Back to Calculator Link */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
          >
            ← {localizedTexts.currencyCalculator}
          </Link>
        </div>
      </div>
    </div>
  );
}
