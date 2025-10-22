"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/provider";
import { useCurrencyStore } from "@/lib/store/currency";
import { formatNumber } from "@/lib/utils";
import { type Locale } from "@/lib/i18n/config";

// Generated SEO pages - automatically updated
// Generated SEO pages - automatically updated
// Each locale shows only its own language links with diverse amounts
const EXISTING_PAGES = [
  {
    from: "USD",
    to: "EUR",
    amount: 1,
    locale: "en",
    path: "/convert/1-dollar-to-euro",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 50,
    locale: "en",
    path: "/convert/50-dollar-to-euro",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 500,
    locale: "en",
    path: "/convert/500-dollar-to-euro",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 1,
    locale: "en",
    path: "/convert/1-euro-to-dollar",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 50,
    locale: "en",
    path: "/convert/50-euro-to-dollar",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 500,
    locale: "en",
    path: "/convert/500-euro-to-dollar",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 10,
    locale: "en",
    path: "/convert/10-euro-to-pound",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 100,
    locale: "en",
    path: "/convert/100-euro-to-pound",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 1000,
    locale: "en",
    path: "/convert/1000-euro-to-pound",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 10,
    locale: "en",
    path: "/convert/10-pound-to-euro",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 100,
    locale: "en",
    path: "/convert/100-pound-to-euro",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 1000,
    locale: "en",
    path: "/convert/1000-pound-to-euro",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 20,
    locale: "en",
    path: "/convert/20-dollar-to-pound",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 200,
    locale: "en",
    path: "/convert/200-dollar-to-pound",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 2000,
    locale: "en",
    path: "/convert/2000-dollar-to-pound",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 20,
    locale: "en",
    path: "/convert/20-pound-to-dollar",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 200,
    locale: "en",
    path: "/convert/200-pound-to-dollar",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 2000,
    locale: "en",
    path: "/convert/2000-pound-to-dollar",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 1,
    locale: "de",
    path: "/de/umrechnen/1-dollar-zu-euro",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 50,
    locale: "de",
    path: "/de/umrechnen/50-dollar-zu-euro",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 500,
    locale: "de",
    path: "/de/umrechnen/500-dollar-zu-euro",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 1,
    locale: "de",
    path: "/de/umrechnen/1-euro-zu-dollar",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 50,
    locale: "de",
    path: "/de/umrechnen/50-euro-zu-dollar",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 500,
    locale: "de",
    path: "/de/umrechnen/500-euro-zu-dollar",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 10,
    locale: "de",
    path: "/de/umrechnen/10-euro-zu-pfund",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 100,
    locale: "de",
    path: "/de/umrechnen/100-euro-zu-pfund",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 1000,
    locale: "de",
    path: "/de/umrechnen/1000-euro-zu-pfund",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 10,
    locale: "de",
    path: "/de/umrechnen/10-pfund-zu-euro",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 100,
    locale: "de",
    path: "/de/umrechnen/100-pfund-zu-euro",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 1000,
    locale: "de",
    path: "/de/umrechnen/1000-pfund-zu-euro",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 20,
    locale: "de",
    path: "/de/umrechnen/20-dollar-zu-pfund",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 200,
    locale: "de",
    path: "/de/umrechnen/200-dollar-zu-pfund",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 2000,
    locale: "de",
    path: "/de/umrechnen/2000-dollar-zu-pfund",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 20,
    locale: "de",
    path: "/de/umrechnen/20-pfund-zu-dollar",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 200,
    locale: "de",
    path: "/de/umrechnen/200-pfund-zu-dollar",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 2000,
    locale: "de",
    path: "/de/umrechnen/2000-pfund-zu-dollar",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 1,
    locale: "es",
    path: "/es/convertir/1-dolar-a-euro",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 50,
    locale: "es",
    path: "/es/convertir/50-dolar-a-euro",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 500,
    locale: "es",
    path: "/es/convertir/500-dolar-a-euro",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 1,
    locale: "es",
    path: "/es/convertir/1-euro-a-dolar",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 50,
    locale: "es",
    path: "/es/convertir/50-euro-a-dolar",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 500,
    locale: "es",
    path: "/es/convertir/500-euro-a-dolar",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 10,
    locale: "es",
    path: "/es/convertir/10-euro-a-libra",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 100,
    locale: "es",
    path: "/es/convertir/100-euro-a-libra",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 1000,
    locale: "es",
    path: "/es/convertir/1000-euro-a-libra",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 10,
    locale: "es",
    path: "/es/convertir/10-libra-a-euro",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 100,
    locale: "es",
    path: "/es/convertir/100-libra-a-euro",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 1000,
    locale: "es",
    path: "/es/convertir/1000-libra-a-euro",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 20,
    locale: "es",
    path: "/es/convertir/20-dolar-a-libra",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 200,
    locale: "es",
    path: "/es/convertir/200-dolar-a-libra",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 2000,
    locale: "es",
    path: "/es/convertir/2000-dolar-a-libra",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 20,
    locale: "es",
    path: "/es/convertir/20-libra-a-dolar",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 200,
    locale: "es",
    path: "/es/convertir/200-libra-a-dolar",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 2000,
    locale: "es",
    path: "/es/convertir/2000-libra-a-dolar",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 1,
    locale: "fr",
    path: "/fr/convertir/1-dollar-vers-euro",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 50,
    locale: "fr",
    path: "/fr/convertir/50-dollar-vers-euro",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 500,
    locale: "fr",
    path: "/fr/convertir/500-dollar-vers-euro",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 1,
    locale: "fr",
    path: "/fr/convertir/1-euro-vers-dollar",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 50,
    locale: "fr",
    path: "/fr/convertir/50-euro-vers-dollar",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 500,
    locale: "fr",
    path: "/fr/convertir/500-euro-vers-dollar",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 10,
    locale: "fr",
    path: "/fr/convertir/10-euro-vers-livre",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 100,
    locale: "fr",
    path: "/fr/convertir/100-euro-vers-livre",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 1000,
    locale: "fr",
    path: "/fr/convertir/1000-euro-vers-livre",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 10,
    locale: "fr",
    path: "/fr/convertir/10-livre-vers-euro",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 100,
    locale: "fr",
    path: "/fr/convertir/100-livre-vers-euro",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 1000,
    locale: "fr",
    path: "/fr/convertir/1000-livre-vers-euro",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 20,
    locale: "fr",
    path: "/fr/convertir/20-dollar-vers-livre",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 200,
    locale: "fr",
    path: "/fr/convertir/200-dollar-vers-livre",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 2000,
    locale: "fr",
    path: "/fr/convertir/2000-dollar-vers-livre",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 20,
    locale: "fr",
    path: "/fr/convertir/20-livre-vers-dollar",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 200,
    locale: "fr",
    path: "/fr/convertir/200-livre-vers-dollar",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 2000,
    locale: "fr",
    path: "/fr/convertir/2000-livre-vers-dollar",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 1,
    locale: "it",
    path: "/it/convertire/1-dollaro-in-euro",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 50,
    locale: "it",
    path: "/it/convertire/50-dollaro-in-euro",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 500,
    locale: "it",
    path: "/it/convertire/500-dollaro-in-euro",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 1,
    locale: "it",
    path: "/it/convertire/1-euro-in-dollaro",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 50,
    locale: "it",
    path: "/it/convertire/50-euro-in-dollaro",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 500,
    locale: "it",
    path: "/it/convertire/500-euro-in-dollaro",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 10,
    locale: "it",
    path: "/it/convertire/10-euro-in-sterlina",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 100,
    locale: "it",
    path: "/it/convertire/100-euro-in-sterlina",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 1000,
    locale: "it",
    path: "/it/convertire/1000-euro-in-sterlina",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 10,
    locale: "it",
    path: "/it/convertire/10-sterlina-in-euro",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 100,
    locale: "it",
    path: "/it/convertire/100-sterlina-in-euro",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 1000,
    locale: "it",
    path: "/it/convertire/1000-sterlina-in-euro",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 20,
    locale: "it",
    path: "/it/convertire/20-dollaro-in-sterlina",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 200,
    locale: "it",
    path: "/it/convertire/200-dollaro-in-sterlina",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 2000,
    locale: "it",
    path: "/it/convertire/2000-dollaro-in-sterlina",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 20,
    locale: "it",
    path: "/it/convertire/20-sterlina-in-dollaro",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 200,
    locale: "it",
    path: "/it/convertire/200-sterlina-in-dollaro",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 2000,
    locale: "it",
    path: "/it/convertire/2000-sterlina-in-dollaro",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 1,
    locale: "pt",
    path: "/pt/converter/1-dolar-para-euro",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 50,
    locale: "pt",
    path: "/pt/converter/50-dolar-para-euro",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 500,
    locale: "pt",
    path: "/pt/converter/500-dolar-para-euro",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 1,
    locale: "pt",
    path: "/pt/converter/1-euro-para-dolar",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 50,
    locale: "pt",
    path: "/pt/converter/50-euro-para-dolar",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 500,
    locale: "pt",
    path: "/pt/converter/500-euro-para-dolar",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 10,
    locale: "pt",
    path: "/pt/converter/10-euro-para-libra",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 100,
    locale: "pt",
    path: "/pt/converter/100-euro-para-libra",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 1000,
    locale: "pt",
    path: "/pt/converter/1000-euro-para-libra",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 10,
    locale: "pt",
    path: "/pt/converter/10-libra-para-euro",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 100,
    locale: "pt",
    path: "/pt/converter/100-libra-para-euro",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 1000,
    locale: "pt",
    path: "/pt/converter/1000-libra-para-euro",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 20,
    locale: "pt",
    path: "/pt/converter/20-dolar-para-libra",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 200,
    locale: "pt",
    path: "/pt/converter/200-dolar-para-libra",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 2000,
    locale: "pt",
    path: "/pt/converter/2000-dolar-para-libra",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 20,
    locale: "pt",
    path: "/pt/converter/20-libra-para-dolar",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 200,
    locale: "pt",
    path: "/pt/converter/200-libra-para-dolar",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 2000,
    locale: "pt",
    path: "/pt/converter/2000-libra-para-dolar",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 1,
    locale: "ru",
    path: "/ru/konverter/1-dollar-v-evro",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 50,
    locale: "ru",
    path: "/ru/konverter/50-dollar-v-evro",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 500,
    locale: "ru",
    path: "/ru/konverter/500-dollar-v-evro",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 1,
    locale: "ru",
    path: "/ru/konverter/1-evro-v-dollar",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 50,
    locale: "ru",
    path: "/ru/konverter/50-evro-v-dollar",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 500,
    locale: "ru",
    path: "/ru/konverter/500-evro-v-dollar",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 10,
    locale: "ru",
    path: "/ru/konverter/10-evro-v-funt",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 100,
    locale: "ru",
    path: "/ru/konverter/100-evro-v-funt",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 1000,
    locale: "ru",
    path: "/ru/konverter/1000-evro-v-funt",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 10,
    locale: "ru",
    path: "/ru/konverter/10-funt-v-evro",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 100,
    locale: "ru",
    path: "/ru/konverter/100-funt-v-evro",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 1000,
    locale: "ru",
    path: "/ru/konverter/1000-funt-v-evro",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 20,
    locale: "ru",
    path: "/ru/konverter/20-dollar-v-funt",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 200,
    locale: "ru",
    path: "/ru/konverter/200-dollar-v-funt",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 2000,
    locale: "ru",
    path: "/ru/konverter/2000-dollar-v-funt",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 20,
    locale: "ru",
    path: "/ru/konverter/20-funt-v-dollar",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 200,
    locale: "ru",
    path: "/ru/konverter/200-funt-v-dollar",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 2000,
    locale: "ru",
    path: "/ru/konverter/2000-funt-v-dollar",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 1,
    locale: "ja",
    path: "/ja/kansan/1-doru-kara-yuro",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 50,
    locale: "ja",
    path: "/ja/kansan/50-doru-kara-yuro",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 500,
    locale: "ja",
    path: "/ja/kansan/500-doru-kara-yuro",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 1,
    locale: "ja",
    path: "/ja/kansan/1-yuro-kara-doru",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 50,
    locale: "ja",
    path: "/ja/kansan/50-yuro-kara-doru",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 500,
    locale: "ja",
    path: "/ja/kansan/500-yuro-kara-doru",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 10,
    locale: "ja",
    path: "/ja/kansan/10-yuro-kara-pondo",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 100,
    locale: "ja",
    path: "/ja/kansan/100-yuro-kara-pondo",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 1000,
    locale: "ja",
    path: "/ja/kansan/1000-yuro-kara-pondo",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 10,
    locale: "ja",
    path: "/ja/kansan/10-pondo-kara-yuro",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 100,
    locale: "ja",
    path: "/ja/kansan/100-pondo-kara-yuro",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 1000,
    locale: "ja",
    path: "/ja/kansan/1000-pondo-kara-yuro",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 20,
    locale: "ja",
    path: "/ja/kansan/20-doru-kara-pondo",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 200,
    locale: "ja",
    path: "/ja/kansan/200-doru-kara-pondo",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 2000,
    locale: "ja",
    path: "/ja/kansan/2000-doru-kara-pondo",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 20,
    locale: "ja",
    path: "/ja/kansan/20-pondo-kara-doru",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 200,
    locale: "ja",
    path: "/ja/kansan/200-pondo-kara-doru",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 2000,
    locale: "ja",
    path: "/ja/kansan/2000-pondo-kara-doru",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 1,
    locale: "zh-cn",
    path: "/zh-cn/zhuanhuan/1-meiyuan-dao-ouyuan",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 50,
    locale: "zh-cn",
    path: "/zh-cn/zhuanhuan/50-meiyuan-dao-ouyuan",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 500,
    locale: "zh-cn",
    path: "/zh-cn/zhuanhuan/500-meiyuan-dao-ouyuan",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 1,
    locale: "zh-cn",
    path: "/zh-cn/zhuanhuan/1-ouyuan-dao-meiyuan",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 50,
    locale: "zh-cn",
    path: "/zh-cn/zhuanhuan/50-ouyuan-dao-meiyuan",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 500,
    locale: "zh-cn",
    path: "/zh-cn/zhuanhuan/500-ouyuan-dao-meiyuan",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 10,
    locale: "zh-cn",
    path: "/zh-cn/zhuanhuan/10-ouyuan-dao-yingbang",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 100,
    locale: "zh-cn",
    path: "/zh-cn/zhuanhuan/100-ouyuan-dao-yingbang",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 1000,
    locale: "zh-cn",
    path: "/zh-cn/zhuanhuan/1000-ouyuan-dao-yingbang",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 10,
    locale: "zh-cn",
    path: "/zh-cn/zhuanhuan/10-yingbang-dao-ouyuan",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 100,
    locale: "zh-cn",
    path: "/zh-cn/zhuanhuan/100-yingbang-dao-ouyuan",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 1000,
    locale: "zh-cn",
    path: "/zh-cn/zhuanhuan/1000-yingbang-dao-ouyuan",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 20,
    locale: "zh-cn",
    path: "/zh-cn/zhuanhuan/20-meiyuan-dao-yingbang",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 200,
    locale: "zh-cn",
    path: "/zh-cn/zhuanhuan/200-meiyuan-dao-yingbang",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 2000,
    locale: "zh-cn",
    path: "/zh-cn/zhuanhuan/2000-meiyuan-dao-yingbang",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 20,
    locale: "zh-cn",
    path: "/zh-cn/zhuanhuan/20-yingbang-dao-meiyuan",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 200,
    locale: "zh-cn",
    path: "/zh-cn/zhuanhuan/200-yingbang-dao-meiyuan",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 2000,
    locale: "zh-cn",
    path: "/zh-cn/zhuanhuan/2000-yingbang-dao-meiyuan",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 1,
    locale: "ar",
    path: "/ar/tahweel/1-dolar-ila-yuro",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 50,
    locale: "ar",
    path: "/ar/tahweel/50-dolar-ila-yuro",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 500,
    locale: "ar",
    path: "/ar/tahweel/500-dolar-ila-yuro",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 1,
    locale: "ar",
    path: "/ar/tahweel/1-yuro-ila-dolar",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 50,
    locale: "ar",
    path: "/ar/tahweel/50-yuro-ila-dolar",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 500,
    locale: "ar",
    path: "/ar/tahweel/500-yuro-ila-dolar",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 10,
    locale: "ar",
    path: "/ar/tahweel/10-yuro-ila-junih",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 100,
    locale: "ar",
    path: "/ar/tahweel/100-yuro-ila-junih",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 1000,
    locale: "ar",
    path: "/ar/tahweel/1000-yuro-ila-junih",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 10,
    locale: "ar",
    path: "/ar/tahweel/10-junih-ila-yuro",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 100,
    locale: "ar",
    path: "/ar/tahweel/100-junih-ila-yuro",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 1000,
    locale: "ar",
    path: "/ar/tahweel/1000-junih-ila-yuro",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 20,
    locale: "ar",
    path: "/ar/tahweel/20-dolar-ila-junih",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 200,
    locale: "ar",
    path: "/ar/tahweel/200-dolar-ila-junih",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 2000,
    locale: "ar",
    path: "/ar/tahweel/2000-dolar-ila-junih",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 20,
    locale: "ar",
    path: "/ar/tahweel/20-junih-ila-dolar",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 200,
    locale: "ar",
    path: "/ar/tahweel/200-junih-ila-dolar",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 2000,
    locale: "ar",
    path: "/ar/tahweel/2000-junih-ila-dolar",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 1,
    locale: "hi",
    path: "/hi/converter/1-dalar-se-yuro",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 50,
    locale: "hi",
    path: "/hi/converter/50-dalar-se-yuro",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 500,
    locale: "hi",
    path: "/hi/converter/500-dalar-se-yuro",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 1,
    locale: "hi",
    path: "/hi/converter/1-yuro-se-dalar",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 50,
    locale: "hi",
    path: "/hi/converter/50-yuro-se-dalar",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 500,
    locale: "hi",
    path: "/hi/converter/500-yuro-se-dalar",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 10,
    locale: "hi",
    path: "/hi/converter/10-yuro-se-paund",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 100,
    locale: "hi",
    path: "/hi/converter/100-yuro-se-paund",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 1000,
    locale: "hi",
    path: "/hi/converter/1000-yuro-se-paund",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 10,
    locale: "hi",
    path: "/hi/converter/10-paund-se-yuro",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 100,
    locale: "hi",
    path: "/hi/converter/100-paund-se-yuro",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 1000,
    locale: "hi",
    path: "/hi/converter/1000-paund-se-yuro",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 20,
    locale: "hi",
    path: "/hi/converter/20-dalar-se-paund",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 200,
    locale: "hi",
    path: "/hi/converter/200-dalar-se-paund",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 2000,
    locale: "hi",
    path: "/hi/converter/2000-dalar-se-paund",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 20,
    locale: "hi",
    path: "/hi/converter/20-paund-se-dalar",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 200,
    locale: "hi",
    path: "/hi/converter/200-paund-se-dalar",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 2000,
    locale: "hi",
    path: "/hi/converter/2000-paund-se-dalar",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 1,
    locale: "nl",
    path: "/nl/omrekenen/1-dollar-naar-euro",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 50,
    locale: "nl",
    path: "/nl/omrekenen/50-dollar-naar-euro",
  },
  {
    from: "USD",
    to: "EUR",
    amount: 500,
    locale: "nl",
    path: "/nl/omrekenen/500-dollar-naar-euro",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 1,
    locale: "nl",
    path: "/nl/omrekenen/1-euro-naar-dollar",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 50,
    locale: "nl",
    path: "/nl/omrekenen/50-euro-naar-dollar",
  },
  {
    from: "EUR",
    to: "USD",
    amount: 500,
    locale: "nl",
    path: "/nl/omrekenen/500-euro-naar-dollar",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 10,
    locale: "nl",
    path: "/nl/omrekenen/10-euro-naar-pond",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 100,
    locale: "nl",
    path: "/nl/omrekenen/100-euro-naar-pond",
  },
  {
    from: "EUR",
    to: "GBP",
    amount: 1000,
    locale: "nl",
    path: "/nl/omrekenen/1000-euro-naar-pond",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 10,
    locale: "nl",
    path: "/nl/omrekenen/10-pond-naar-euro",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 100,
    locale: "nl",
    path: "/nl/omrekenen/100-pond-naar-euro",
  },
  {
    from: "GBP",
    to: "EUR",
    amount: 1000,
    locale: "nl",
    path: "/nl/omrekenen/1000-pond-naar-euro",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 20,
    locale: "nl",
    path: "/nl/omrekenen/20-dollar-naar-pond",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 200,
    locale: "nl",
    path: "/nl/omrekenen/200-dollar-naar-pond",
  },
  {
    from: "USD",
    to: "GBP",
    amount: 2000,
    locale: "nl",
    path: "/nl/omrekenen/2000-dollar-naar-pond",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 20,
    locale: "nl",
    path: "/nl/omrekenen/20-pond-naar-dollar",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 200,
    locale: "nl",
    path: "/nl/omrekenen/200-pond-naar-dollar",
  },
  {
    from: "GBP",
    to: "USD",
    amount: 2000,
    locale: "nl",
    path: "/nl/omrekenen/2000-pond-naar-dollar",
  },
];

interface CurrencyLink {
  from: string;
  to: string;
  amount?: number;
  label?: string;
  description?: string;
}

interface InternalLinkGridProps {
  currentPair?: {
    from: string;
    to: string;
    amount?: number;
  };
  showAmountVariations?: boolean;
  showPopularPairs?: boolean;
  maxLinks?: number;
}

export function InternalLinkGrid({
  currentPair,
  showAmountVariations = true,
  showPopularPairs = true,
  maxLinks = 12,
}: InternalLinkGridProps) {
  const { locale } = useI18n();
  const { getCurrentRate } = useCurrencyStore();

  // Filter to only show links that exist AND are for current locale
  const localePages = EXISTING_PAGES.filter((page) => page.locale === locale);

  // Group by currency pairs and select diverse amounts
  const pairGroups = new Map();
  localePages.forEach((page) => {
    const pairKey = `${page.from}-${page.to}`;
    if (!pairGroups.has(pairKey)) {
      pairGroups.set(pairKey, []);
    }
    pairGroups.get(pairKey).push(page);
  });

  // Select diverse amounts from each pair
  const diverseLinks = [];
  const preferredAmounts = [1, 5, 10, 20, 50, 100, 200, 500, 1000, 2000];

  // Priority currency pairs for better display
  const priorityPairs = [
    "USD-EUR",
    "EUR-USD",
    "EUR-GBP",
    "GBP-EUR",
    "USD-GBP",
    "GBP-USD",
  ];

  // First add priority pairs
  priorityPairs.forEach((pairKey) => {
    if (pairGroups.has(pairKey)) {
      const pages = pairGroups.get(pairKey);
      // Select 3 diverse amounts per priority pair
      preferredAmounts.slice(0, 3).forEach((amount) => {
        const page = pages.find((p) => p.amount === amount);
        if (page && diverseLinks.length < maxLinks) {
          // Don't show current page
          if (
            currentPair &&
            page.from === currentPair.from &&
            page.to === currentPair.to &&
            page.amount === currentPair.amount
          ) {
            return;
          }
          diverseLinks.push(page);
        }
      });
    }
  });

  // Then add other pairs if space available
  Array.from(pairGroups.keys()).forEach((pairKey) => {
    if (!priorityPairs.includes(pairKey) && diverseLinks.length < maxLinks) {
      const pages = pairGroups.get(pairKey);
      // Select 1-2 amounts from other pairs
      const page = pages.find((p) => preferredAmounts.includes(p.amount));
      if (page) {
        // Don't show current page
        if (
          currentPair &&
          page.from === currentPair.from &&
          page.to === currentPair.to &&
          page.amount === currentPair.amount
        ) {
          return;
        }
        diverseLinks.push(page);
      }
    }
  });

  const availableLinks = diverseLinks.slice(0, maxLinks).map((page) => ({
    from: page.from,
    to: page.to,
    amount: page.amount,
    url: page.path,
    label: `${page.amount} ${page.from} → ${page.to}`,
    description: (() => {
      switch (locale) {
        case "de":
          return `${page.amount} ${page.from} in ${page.to} umrechnen`;
        case "es":
          return `Convertir ${page.amount} ${page.from} a ${page.to}`;
        case "fr":
          return `Convertir ${page.amount} ${page.from} vers ${page.to}`;
        case "it":
          return `Convertire ${page.amount} ${page.from} in ${page.to}`;
        case "pt":
          return `Converter ${page.amount} ${page.from} para ${page.to}`;
        case "ru":
          return `Конвертировать ${page.amount} ${page.from} в ${page.to}`;
        case "ja":
          return `${page.amount} ${page.from} を ${page.to} に換算`;
        case "zh-cn":
          return `将 ${page.amount} ${page.from} 转换为 ${page.to}`;
        case "ar":
          return `تحويل ${page.amount} ${page.from} إلى ${page.to}`;
        case "hi":
          return `${page.amount} ${page.from} को ${page.to} में रूपांतरित करें`;
        case "nl":
          return `${page.amount} ${page.from} naar ${page.to} omrekenen`;
        default:
          return `Convert ${page.amount} ${page.from} to ${page.to}`;
      }
    })(),
  }));

  // Get current rate for a pair (if available)
  const getDisplayRate = (link: any): string | null => {
    if (
      currentPair &&
      link.from === currentPair.from &&
      link.to === currentPair.to
    ) {
      const rate = getCurrentRate();
      if (rate && link.amount) {
        return formatNumber(link.amount * rate);
      }
    }
    return null;
  };

  // Don't show if no links available
  if (availableLinks.length === 0) {
    return null;
  }

  return (
    <div className="bg-zinc-900 rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">
          {locale === "de"
            ? "Weitere Währungsumrechnungen"
            : "Related Currency Conversions"}
        </h2>
        <p className="text-gray-400 text-sm">
          {locale === "de"
            ? "Beliebte Währungspaare zum schnellen Umrechnen"
            : "Popular currency pairs for quick conversion"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {availableLinks.map((link, index) => {
          const displayRate = getDisplayRate(link);

          return (
            <Link
              key={index}
              href={link.url}
              className="group bg-zinc-800 hover:bg-zinc-700 p-4 rounded-lg transition-all duration-200 hover:scale-[1.02] border border-transparent hover:border-orange-500/20"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-orange-500 group-hover:text-orange-400">
                  {link.label}
                </span>
                <span className="text-gray-400 text-sm">→</span>
              </div>

              <p className="text-gray-300 text-sm mb-2">{link.description}</p>

              {displayRate && (
                <div className="text-green-500 font-mono text-sm">
                  ≈ {displayRate} {link.to}
                </div>
              )}

              {!displayRate && link.amount && (
                <div className="text-gray-500 text-xs">
                  {(() => {
                    switch (locale) {
                      case "de":
                        return "Aktuellen Kurs berechnen";
                      case "es":
                        return "Calcular tasa actual";
                      case "fr":
                        return "Calculer le taux actuel";
                      case "it":
                        return "Calcola tasso attuale";
                      case "pt":
                        return "Calcular taxa atual";
                      case "ru":
                        return "Рассчитать текущий курс";
                      case "ja":
                        return "現在のレートを計算";
                      case "zh-cn":
                        return "计算当前汇率";
                      case "ar":
                        return "احسب السعر الحالي";
                      case "hi":
                        return "वर्तमान दर की गणना करें";
                      case "nl":
                        return "Bereken huidige koers";
                      default:
                        return "Calculate current rate";
                    }
                  })()}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="mt-6 p-4 bg-zinc-800 rounded-lg text-center border border-zinc-700">
        <p className="text-gray-300 text-sm mb-2">
          {(() => {
            switch (locale) {
              case "de":
                return "Benötigen Sie andere Währungspaare?";
              case "es":
                return "¿Necesita otros pares de divisas?";
              case "fr":
                return "Avez-vous besoin d'autres paires de devises?";
              case "it":
                return "Hai bisogno di altre coppie di valute?";
              case "pt":
                return "Precisa de outros pares de moedas?";
              case "ru":
                return "Нужны другие валютные пары?";
              case "ja":
                return "他の通貨ペアが必要ですか？";
              case "zh-cn":
                return "需要其他货币对吗？";
              case "ar":
                return "هل تحتاج إلى أزواج عملات أخرى؟";
              case "hi":
                return "क्या आपको अन्य मुद्रा जोड़े चाहिए?";
              case "nl":
                return "Andere valutaparen nodig?";
              default:
                return "Need other currency pairs?";
            }
          })()}
        </p>
        <Link
          href="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-sm font-semibold text-black transition-colors"
        >
          {(() => {
            switch (locale) {
              case "de":
                return "Alle Währungen anzeigen";
              case "es":
                return "Ver todas las monedas";
              case "fr":
                return "Voir toutes les devises";
              case "it":
                return "Visualizza tutte le valute";
              case "pt":
                return "Ver todas as moedas";
              case "ru":
                return "Показать все валюты";
              case "ja":
                return "すべての通貨を表示";
              case "zh-cn":
                return "查看所有货币";
              case "ar":
                return "عرض جميع العملات";
              case "hi":
                return "सभी मुद्राएं देखें";
              case "nl":
                return "Alle valuta's bekijken";
              default:
                return "View All Currencies";
            }
          })()}
        </Link>
      </div>
    </div>
  );
}

// Homepage component with only existing pages
export function HomepageRelatedLinks() {
  const { locale } = useI18n();

  // Only show pages that actually exist
  const featuredPairs = EXISTING_PAGES.filter((page) => page.locale === locale)
    .slice(0, 6)
    .map((page) => ({
      from: page.from,
      to: page.to,
      amount: page.amount,
      label: `${page.amount} ${page.from} → ${page.to}`,
      url: page.path,
    }));

  if (featuredPairs.length === 0) {
    return null;
  }

  return (
    <div className="bg-zinc-900 rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">
          {locale === "de"
            ? "Beliebte Währungsumrechnungen"
            : "Popular Currency Conversions"}
        </h2>
        <p className="text-gray-400 text-sm">
          {locale === "de"
            ? "Häufig nachgefragte Währungspaare"
            : "Frequently requested currency pairs"}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {featuredPairs.map((pair, index) => (
          <Link
            key={index}
            href={pair.url}
            className="group bg-zinc-800 hover:bg-zinc-700 p-3 rounded text-center transition-all duration-200 hover:scale-[1.02] border border-transparent hover:border-orange-500/20"
          >
            <div className="font-semibold text-orange-500 group-hover:text-orange-400 mb-1">
              {pair.label}
            </div>
            <div className="text-xs text-gray-400">
              {locale === "de" ? "Jetzt berechnen" : "Calculate now"}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Currency landing page component - only show if pages exist
export function CurrencyLandingLinks({
  fromCurrency,
  toCurrency,
}: {
  fromCurrency: string;
  toCurrency: string;
}) {
  const { locale } = useI18n();

  // Only show pages that actually exist for this pair
  const matchingPages = EXISTING_PAGES.filter(
    (page) =>
      page.locale === locale &&
      page.from === fromCurrency &&
      page.to === toCurrency,
  );

  if (matchingPages.length === 0) {
    return null;
  }

  return (
    <div className="bg-zinc-900 rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">
          {locale === "de"
            ? `${fromCurrency}/${toCurrency} Umrechnungen`
            : `${fromCurrency}/${toCurrency} Conversions`}
        </h2>
        <p className="text-gray-400 text-sm">
          {locale === "de"
            ? `Beträge von ${fromCurrency} in ${toCurrency} umrechnen`
            : `Convert amounts from ${fromCurrency} to ${toCurrency}`}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {matchingPages.map((page) => (
          <Link
            key={page.amount}
            href={page.path}
            className="group bg-zinc-800 hover:bg-zinc-700 p-3 rounded text-center transition-all duration-200 hover:scale-[1.02] border border-transparent hover:border-orange-500/20"
          >
            <div className="font-semibold text-orange-500 group-hover:text-orange-400 mb-1">
              {page.amount} {fromCurrency}
            </div>
            <div className="text-xs text-gray-400">→ {toCurrency}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
