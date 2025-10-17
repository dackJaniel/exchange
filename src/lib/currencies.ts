import { Currency } from "@/types/calculator";

// Popular currencies with their symbols and flags
export const currencies: Currency[] = [
  { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺" },
  { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸" },
  { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧" },
  { code: "CZK", symbol: "Kč", name: "Czech Koruna", flag: "🇨🇿" },
  { code: "PLN", symbol: "zł", name: "Polish Zloty", flag: "🇵🇱" },
  { code: "CHF", symbol: "Fr", name: "Swiss Franc", flag: "🇨🇭" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "MXN", symbol: "$", name: "Mexican Peso", flag: "🇲🇽" },

  // Major Asian currencies
  { code: "INR", symbol: "₹", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "KRW", symbol: "₩", name: "South Korean Won", flag: "🇰🇷" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", flag: "🇸🇬" },
  { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar", flag: "🇭🇰" },
  { code: "THB", symbol: "฿", name: "Thai Baht", flag: "🇹🇭" },
  { code: "MYR", symbol: "RM", name: "Malaysian Ringgit", flag: "🇲🇾" },
  { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah", flag: "🇮🇩" },
  { code: "PHP", symbol: "₱", name: "Philippine Peso", flag: "🇵🇭" },
  { code: "VND", symbol: "₫", name: "Vietnamese Dong", flag: "🇻🇳" },

  // Middle East & Africa
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal", flag: "🇸🇦" },
  { code: "ZAR", symbol: "R", name: "South African Rand", flag: "🇿🇦" },
  { code: "ILS", symbol: "₪", name: "Israeli Shekel", flag: "🇮🇱" },
  { code: "TRY", symbol: "₺", name: "Turkish Lira", flag: "🇹🇷" },
  { code: "EGP", symbol: "E£", name: "Egyptian Pound", flag: "🇪🇬" },

  // South America
  { code: "BRL", symbol: "R$", name: "Brazilian Real", flag: "🇧🇷" },
  { code: "ARS", symbol: "$", name: "Argentine Peso", flag: "🇦🇷" },
  { code: "COP", symbol: "$", name: "Colombian Peso", flag: "🇨🇴" },
  { code: "CLP", symbol: "$", name: "Chilean Peso", flag: "🇨🇱" },
  { code: "PEN", symbol: "S/", name: "Peruvian Sol", flag: "🇵🇪" },
  { code: "UYU", symbol: "$U", name: "Uruguayan Peso", flag: "🇺🇾" },
  { code: "BOB", symbol: "Bs", name: "Bolivian Boliviano", flag: "🇧🇴" },
  { code: "PYG", symbol: "₲", name: "Paraguayan Guarani", flag: "🇵🇾" },
  { code: "VES", symbol: "Bs.S", name: "Venezuelan Bolívar", flag: "🇻🇪" },

  // Central America & Caribbean
  { code: "GTQ", symbol: "Q", name: "Guatemalan Quetzal", flag: "🇬🇹" },
  { code: "BZD", symbol: "BZ$", name: "Belize Dollar", flag: "🇧🇿" },
  { code: "CRC", symbol: "₡", name: "Costa Rican Colón", flag: "🇨🇷" },
  { code: "HNL", symbol: "L", name: "Honduran Lempira", flag: "🇭🇳" },
  { code: "NIO", symbol: "C$", name: "Nicaraguan Córdoba", flag: "🇳🇮" },
  { code: "PAB", symbol: "B/.", name: "Panamanian Balboa", flag: "🇵🇦" },
  { code: "SVC", symbol: "₡", name: "Salvadoran Colón", flag: "🇸🇻" },
  { code: "JMD", symbol: "J$", name: "Jamaican Dollar", flag: "🇯🇲" },
  { code: "TTD", symbol: "TT$", name: "Trinidad & Tobago Dollar", flag: "🇹🇹" },
  { code: "DOP", symbol: "RD$", name: "Dominican Peso", flag: "🇩🇴" },

  // Nordic countries
  { code: "SEK", symbol: "kr", name: "Swedish Krona", flag: "🇸🇪" },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone", flag: "🇳🇴" },
  { code: "DKK", symbol: "kr", name: "Danish Krone", flag: "🇩🇰" },
  { code: "ISK", symbol: "kr", name: "Icelandic Krona", flag: "🇮🇸" },

  // Other European currencies
  { code: "HUF", symbol: "Ft", name: "Hungarian Forint", flag: "🇭🇺" },
  { code: "RON", symbol: "lei", name: "Romanian Leu", flag: "🇷🇴" },
  { code: "BGN", symbol: "лв", name: "Bulgarian Lev", flag: "🇧🇬" },
  { code: "HRK", symbol: "kn", name: "Croatian Kuna", flag: "🇭🇷" },
  { code: "RSD", symbol: "дин", name: "Serbian Dinar", flag: "🇷🇸" },
  { code: "UAH", symbol: "₴", name: "Ukrainian Hryvnia", flag: "🇺🇦" },
  { code: "RUB", symbol: "₽", name: "Russian Ruble", flag: "🇷🇺" },

  // Other major currencies
  { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar", flag: "🇳🇿" },
  { code: "TWD", symbol: "NT$", name: "Taiwan Dollar", flag: "🇹🇼" },

  // Africa (additional)
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", flag: "🇳🇬" },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling", flag: "🇰🇪" },
  { code: "GHS", symbol: "₵", name: "Ghanaian Cedi", flag: "🇬🇭" },
  { code: "MAD", symbol: "د.م.", name: "Moroccan Dirham", flag: "🇲🇦" },
  { code: "TND", symbol: "د.ت", name: "Tunisian Dinar", flag: "🇹🇳" },
  { code: "ETB", symbol: "Br", name: "Ethiopian Birr", flag: "🇪🇹" },
  { code: "UGX", symbol: "USh", name: "Ugandan Shilling", flag: "🇺🇬" },

  // Pacific & Oceania
  { code: "FJD", symbol: "FJ$", name: "Fijian Dollar", flag: "🇫🇯" },
  { code: "PGK", symbol: "K", name: "Papua New Guinea Kina", flag: "🇵🇬" },
  { code: "WST", symbol: "WS$", name: "Samoan Tala", flag: "🇼🇸" },
  { code: "TOP", symbol: "T$", name: "Tongan Paʻanga", flag: "🇹🇴" },

  // Additional Asian currencies
  { code: "BDT", symbol: "৳", name: "Bangladeshi Taka", flag: "🇧🇩" },
  { code: "PKR", symbol: "₨", name: "Pakistani Rupee", flag: "🇵🇰" },
  { code: "LKR", symbol: "₨", name: "Sri Lankan Rupee", flag: "🇱🇰" },
  { code: "NPR", symbol: "₨", name: "Nepalese Rupee", flag: "🇳🇵" },
  { code: "MMK", symbol: "K", name: "Myanmar Kyat", flag: "🇲🇲" },
  { code: "KHR", symbol: "៛", name: "Cambodian Riel", flag: "🇰🇭" },
  { code: "LAK", symbol: "₭", name: "Lao Kip", flag: "🇱🇦" },
  { code: "BND", symbol: "B$", name: "Brunei Dollar", flag: "🇧🇳" },
  { code: "MOP", symbol: "MOP$", name: "Macanese Pataca", flag: "🇲🇴" },

  // Additional European currencies
  { code: "ALL", symbol: "L", name: "Albanian Lek", flag: "🇦🇱" },
  { code: "BAM", symbol: "KM", name: "Bosnia-Herzegovina Mark", flag: "🇧🇦" },
  { code: "MKD", symbol: "ден", name: "Macedonian Denar", flag: "🇲🇰" },
  { code: "MDL", symbol: "L", name: "Moldovan Leu", flag: "🇲🇩" },
  { code: "GEL", symbol: "₾", name: "Georgian Lari", flag: "🇬🇪" },
  { code: "AMD", symbol: "֏", name: "Armenian Dram", flag: "🇦🇲" },
  { code: "AZN", symbol: "₼", name: "Azerbaijani Manat", flag: "🇦🇿" },
  { code: "BYN", symbol: "Br", name: "Belarusian Ruble", flag: "🇧🇾" },
  { code: "KZT", symbol: "₸", name: "Kazakhstani Tenge", flag: "🇰🇿" },
  { code: "UZS", symbol: "so'm", name: "Uzbekistani Som", flag: "🇺🇿" },

  // Additional Middle Eastern currencies
  { code: "QAR", symbol: "ر.ق", name: "Qatari Riyal", flag: "🇶🇦" },
  { code: "BHD", symbol: ".د.ب", name: "Bahraini Dinar", flag: "🇧🇭" },
  { code: "KWD", symbol: "د.ك", name: "Kuwaiti Dinar", flag: "🇰🇼" },
  { code: "OMR", symbol: "ر.ع.", name: "Omani Rial", flag: "🇴🇲" },
  { code: "JOD", symbol: "د.ا", name: "Jordanian Dinar", flag: "🇯🇴" },
  { code: "LBP", symbol: "ل.ل", name: "Lebanese Pound", flag: "🇱🇧" },
  { code: "SYP", symbol: "£S", name: "Syrian Pound", flag: "🇸🇾" },
  { code: "IQD", symbol: "ع.د", name: "Iraqi Dinar", flag: "🇮🇶" },
  { code: "IRR", symbol: "﷼", name: "Iranian Rial", flag: "🇮🇷" },
  { code: "AFN", symbol: "؋", name: "Afghan Afghani", flag: "🇦🇫" },
];

// Helper function to get currency by code
export const getCurrencyByCode = (code: string): Currency | undefined => {
  return currencies.find(currency => currency.code === code);
};

// Helper function to get major currencies (top 20 most traded)
export const getMajorCurrencies = (): Currency[] => {
  const majorCodes = [
    'USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'NZD',
    'CNY', 'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'HUF', 'INR',
    'KRW', 'SGD', 'HKD', 'MXN'
  ];

  return majorCodes
    .map(code => getCurrencyByCode(code))
    .filter((currency): currency is Currency => currency !== undefined);
};

// Helper function to get currencies by region
export const getCurrenciesByRegion = (region: 'europe' | 'asia' | 'americas' | 'africa' | 'oceania'): Currency[] => {
  const regionCurrencies: Record<string, string[]> = {
    europe: ['EUR', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'HUF', 'RON', 'BGN', 'HRK', 'RSD', 'UAH', 'RUB', 'ALL', 'BAM', 'MKD', 'MDL', 'GEL', 'AMD', 'AZN', 'BYN', 'KZT', 'UZS'],
    asia: ['JPY', 'CNY', 'INR', 'KRW', 'SGD', 'HKD', 'THB', 'MYR', 'IDR', 'PHP', 'VND', 'TWD', 'BDT', 'PKR', 'LKR', 'NPR', 'MMK', 'KHR', 'LAK', 'BND', 'MOP'],
    americas: ['USD', 'CAD', 'MXN', 'BRL', 'ARS', 'COP', 'CLP', 'PEN', 'UYU', 'BOB', 'PYG', 'VES', 'GTQ', 'BZD', 'CRC', 'HNL', 'NIO', 'PAB', 'SVC', 'JMD', 'TTD', 'DOP'],
    africa: ['ZAR', 'EGP', 'NGN', 'KES', 'GHS', 'MAD', 'TND', 'ETB', 'UGX'],
    oceania: ['AUD', 'NZD', 'FJD', 'PGK', 'WST', 'TOP']
  };

  const codes = regionCurrencies[region] || [];
  return codes
    .map(code => getCurrencyByCode(code))
    .filter((currency): currency is Currency => currency !== undefined);
};

// Helper function to search currencies by name or code
export const searchCurrencies = (query: string): Currency[] => {
  const lowerQuery = query.toLowerCase();
  return currencies.filter(currency =>
    currency.code.toLowerCase().includes(lowerQuery) ||
    currency.name.toLowerCase().includes(lowerQuery)
  );
};

// Popular currency pairs for trading
export const getPopularCurrencyPairs = (): Array<{from: Currency, to: Currency}> => {
  const pairs = [
    ['EUR', 'USD'], ['GBP', 'USD'], ['USD', 'JPY'], ['USD', 'CHF'],
    ['AUD', 'USD'], ['USD', 'CAD'], ['NZD', 'USD'], ['EUR', 'GBP'],
    ['EUR', 'CHF'], ['EUR', 'JPY'], ['GBP', 'JPY'], ['CHF', 'JPY'],
    ['AUD', 'JPY'], ['CAD', 'JPY'], ['NZD', 'JPY'], ['EUR', 'CAD'],
    ['GBP', 'CHF'], ['AUD', 'CAD'], ['EUR', 'AUD'], ['GBP', 'CAD']
  ];

  return pairs
    .map(([from, to]) => ({
      from: getCurrencyByCode(from),
      to: getCurrencyByCode(to)
    }))
    .filter((pair): pair is {from: Currency, to: Currency} =>
      pair.from !== undefined && pair.to !== undefined
    );
};

// Default currencies for the app
export const getDefaultCurrencies = () => ({
  base: getCurrencyByCode('EUR') || currencies[0],
  target: getCurrencyByCode('USD') || currencies[1]
});
