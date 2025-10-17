export const translations = {
  en: {
    // App metadata
    meta: {
      title:
        "Free Currency Calculator - Live Exchange Rates for 170+ Currencies",
      description:
        "Convert currencies instantly with live exchange rates. Free currency calculator supporting EUR, USD, GBP, JPY and 170+ currencies. Works offline as PWA. Fast, accurate, and mobile-optimized for travel and business.",
      manifestName: "Currency Calculator - Free Currency Converter",
      manifestDescription:
        "Professional currency calculator with live exchange rates for 170+ currencies. Works offline with PWA technology.",
      openGraphTitle:
        "Free Currency Calculator - Convert EUR, USD, GBP + 170 More",
      openGraphDescription:
        "Professional currency calculator with real-time exchange rates. Convert between EUR, USD, GBP, JPY and 170+ currencies. Free, fast, and works offline as Progressive Web App.",
      twitterTitle: "Currency Calculator - Live Exchange Rates",
      twitterDescription:
        "Convert currencies with live rates for EUR, USD, GBP + 170 more. Free PWA works offline.",
      schemaDescription:
        "Professional currency calculator with live exchange rates for 170+ international currencies including EUR, USD, GBP, JPY, CHF and many more",
    },

    // Keywords for SEO
    keywords: [
      // Primary high-volume keywords
      "currency calculator",
      "currency converter",
      "exchange rate calculator",
      "free currency converter",
      "currency exchange calculator",

      // Specific currency pairs
      "euro to dollar converter",
      "eur to usd calculator",
      "euro dollar calculator",
      "pound to euro converter",
      "gbp eur calculator",
      "usd eur converter",
      "dollar to euro",
      "euro to pound",
      "swiss franc euro calculator",
      "chf eur converter",

      // Long-tail transactional
      "convert euro to dollar",
      "currency conversion online",
      "real time exchange rates",
      "live currency rates",
      "forex calculator",
      "money converter",
      "international currency calculator",

      // Feature-based keywords
      "offline currency converter",
      "PWA currency calculator",
      "mobile currency converter",
      "free exchange rate calculator",
      "accurate currency converter",
      "fast currency calculator",

      // Geographic and use-case
      "travel currency converter",
      "business currency calculator",
      "international money transfer calculator",
      "currency rates today",
      "current exchange rates",

      // Technical SEO
      "progressive web app",
      "offline calculator",
      "mobile first",
      "real-time rates",
      "finance calculator",
      "crypto currency converter",
      "bitcoin calculator",
    ],

    // Schema.org features
    features: [
      "Live exchange rates",
      "Offline functionality",
      "Progressive Web App",
      "170+ currencies",
      "Free to use",
      "Mobile optimized",
      "Fast calculations",
    ],

    // UI translations
    ui: {
      // Navigation & Menu
      menu: "Menu",
      navigationDescription: "Navigation and legal information",
      language: "Language",
      install: "Install",
      installApp: "Install App",

      // Currency & Calculator
      calculator: "Calculator",
      conversion: "Conversion",
      exchangeRate: "Exchange Rate",
      from: "From",
      to: "To",
      amount: "Amount",
      result: "Result",
      swapCurrencies: "Swap currencies",
      selectCurrency: "Select currency",
      searchCurrency: "Search currency...",

      // Status messages
      loading: "Loading...",
      updating: "Updating...",
      cached: "cached",
      justNow: "Just now",
      minutesAgo: (minutes: number) => `${minutes}m ago`,
      hoursAgo: (hours: number) => `${hours}h ago`,
      never: "Never",

      // Error messages
      networkError: "Network error",
      offlineUpdate: "Offline - no update possible",
      refreshRates: "Refresh exchange rates",

      // Legal pages
      privacy: "Privacy Policy",
      dataProtection: "Data Protection",
      imprint: "Imprint",
      siteNotice: "Site Notice",

      // Share functionality
      shareApp: "Share App",
      shareTitle: "Share App",
      shareDescription: "Share the free currency calculator with your friends",
      shareText:
        "Check out this free currency calculator! 170+ currencies with live exchange rates. 📱💱",
      shareNativeTitle: "Share",
      shareNativeDescription: "Share with friends",
      shareWhatsApp: "WhatsApp",
      shareWhatsAppDescription: "Share with friends",
      shareCopyLink: "Copy link",
      shareCopyLinkCopied: "Copied!",
      shareCopyDescription: "Copy to clipboard",
      shareFooter: "💱 Free currency calculator for everyone!",

      // Offline notice
      offlineTitle: "Internet connection required",
      offlineDescription:
        "For first use, an online connection is needed to load current exchange rates. Afterwards, the app works offline too.",
      offlineMode: "Offline Mode",
      offlineCachedData: "Working with cached data. Last updated:",
      unknown: "Unknown",

      // Pull to refresh
      pullToRefreshRelease: "Release to refresh",
      pullToRefreshPull: "Pull down to refresh",
      pullToRefreshUpdating: "Updating app...",
      pullToRefreshChecking: "Checking for updates...",
      pullToRefreshOffline: "Offline - no update possible",

      // Coffee donation
      buyMeACoffee: "Buy me a Coffee",

      // Service Worker
      updateAvailable: "App update available! 🚀",
      updateDescription: "A new version of the app is available. Update now?",
      updateButton: "Update",
      updateLater: "Later",
      ratesUpdated: "Exchange rates updated",
      ratesUpdatedDescription: "The latest exchange rates have been loaded.",

      // App updates
      updateSuccess: "App successfully updated! ✨",
      updateSuccessDescription: "The newest version is now available.",

      // Exchange rates
      online: "Online",
      offline: "Offline",
      noRatesOffline: "No rates - Online connection required",
      updateFailed: "Update failed",
      offlineNoData:
        "No exchange rate data available offline. Connect to internet to load initial data.",

      // Currency grouping
      majorCurrencies: "Major Currencies",
      europeanCurrencies: "European Currencies",
      otherCurrencies: "Other Currencies",
      searchCurrencies: "Search currencies...",

      // Currency search
      noCurrencyFound: "No currency found.",
      noCurrencyMatching: "No matching currency found.",

      // 404 page
      notFoundTitle: "Page Not Found",
      notFoundDescription: "The requested page could not be found.",
      notFoundButton: "Back to Calculator",

      // Notifications and PWA features
      notifications: {
        settings: "Notifications",
        title: "Push Notifications",
        description: "Configure notifications and auto-sync for rate updates.",
        permission: "Permission",
        granted: "Granted",
        denied: "Denied",
        notRequested: "Not requested",
        enable: "Enable",
        disable: "Disable",
        enabled: "Notifications enabled!",
        enabledDescription: "You will receive rate update notifications.",
        disabled: "Notifications disabled",
        permissionDenied: "Permission denied",
        permissionRequired: "Permission required",
        error: "Failed to update settings",
        test: "Test",
        testTitle: "Test Notification",
        testBody: "This is a test notification from the Currency Calculator",
        testSent: "Test notification sent",
        testError: "Failed to send test",
        pushNotifications: "Push Notifications",
        pushDescription: "Get notifications even when app is closed.",
        active: "Active",
        inactive: "Inactive",
        backgroundSync: "Auto-Sync",
        backgroundSyncDescription:
          "Automatically sync rates in the background.",
        backgroundSyncEnabled: "Auto-sync enabled!",
        backgroundSyncError: "Failed to enable auto-sync",
        enableBackgroundSync: "Enable Auto-Sync",
      },

      // Conversion History
      conversionHistory: {
        title: "Conversion History",
        recent: "Recent",
        statistics: "Statistics",
        settings: "Settings",
        noConversions: "No conversions yet",
        allTime: "All Time",
        last24h: "Last 24 Hours",
        last7d: "Last 7 Days",
        last30d: "Last 30 Days",
        export: "Export",
        clear: "Clear All",
        exported: "History exported successfully",
        exportFailed: "Export failed",
        historyCleared: "History cleared",
        totalConversions: "Total Conversions",
        averageAmount: "Average Amount",
        popularPairs: "Most Used Currency Pairs",
        offline: "Offline",
        enableLogging: "Enable Conversion Logging",
        loggingDescription: "Automatically save all conversions when online",
        privacyNotice: "Privacy Notice",
        privacyDescription:
          "All conversion data is stored locally on your device and never sent to external servers.",
        enable: "Enable",
        disable: "Disable",
        loggingEnabled: "Conversion logging enabled",
        loggingDisabled: "Conversion logging disabled",
      },
    },
  },
  de: {
    // App metadata
    meta: {
      title:
        "Währungsrechner Kostenlos - Aktuelle Wechselkurse für 170+ Währungen",
      description:
        "Währungen sofort umrechnen mit aktuellen Wechselkursen. Kostenloser Währungsrechner für EUR, USD, GBP, CHF und 170+ Währungen. Funktioniert offline als PWA. Schnell, genau und mobil-optimiert für Reisen und Business.",
      manifestName: "Währungsrechner - Kostenloser Currency Calculator",
      manifestDescription:
        "Professioneller Währungsrechner mit aktuellen Wechselkursen für 170+ Währungen. Funktioniert offline mit PWA-Technologie.",
      openGraphTitle:
        "Kostenloser Währungsrechner - EUR, USD, CHF + 170 weitere Währungen",
      openGraphDescription:
        "Professioneller Währungsrechner mit Echtzeit-Wechselkursen. Umrechnung zwischen EUR, USD, GBP, CHF und 170+ Währungen. Kostenlos, schnell und funktioniert offline als Progressive Web App.",
      twitterTitle: "Währungsrechner - Aktuelle Wechselkurse",
      twitterDescription:
        "Währungen umrechnen mit Live-Kursen für EUR, USD, CHF + 170 weitere. Kostenlose PWA funktioniert offline.",
      schemaDescription:
        "Professioneller Währungsrechner mit aktuellen Wechselkursen für 170+ internationale Währungen inklusive EUR, USD, GBP, CHF, JPY und viele weitere",
    }, // Keywords for SEO
    keywords: [
      // Primary German keywords
      "währungsrechner",
      "währung umrechnen",
      "wechselkurs rechner",
      "kostenloser währungsrechner",
      "currency calculator deutsch",

      // Specific German currency pairs
      "euro dollar rechner",
      "eur usd rechner",
      "euro in dollar umrechnen",
      "dollar in euro rechnen",
      "pfund euro rechner",
      "schweizer franken euro rechner",
      "chf eur rechner",
      "euro pfund rechner",

      // Long-tail German keywords
      "euro in dollar umwandeln",
      "währung online umrechnen",
      "aktueller wechselkurs rechner",
      "devisen rechner",
      "geld umrechnen",
      "währungsumrechnung online",
      "devisenrechner kostenlos",

      // German feature keywords
      "währungsrechner offline",
      "mobiler währungsrechner",
      "genauer währungsrechner",
      "schneller currency calculator",
      "währungsrechner app",

      // German geographic/use-case
      "reise währungsrechner",
      "urlaub geld umrechnen",
      "währungsrechner deutschland",
      "business währungsrechner",
      "wechselkurs heute",
      "aktuelle wechselkurse",

      // Mixed German-English (common searches)
      "euro to dollar rechner",
      "currency converter deutsch",
      "exchange rate deutschland",
      "währung calculator",
      "forex rechner",
      "bitcoin euro rechner",
      "krypto währungsrechner",

      // Progressive Web App German
      "PWA währungsrechner",
      "offline rechner",
      "mobile first",
      "progressive web app",
      "finanzen rechner",
    ],

    // Schema.org features
    features: [
      "Aktuelle Wechselkurse",
      "Offline-Funktionalität",
      "Progressive Web App",
      "Über 170 Währungen",
      "Kostenlose Nutzung",
      "Mobile optimiert",
      "Schnelle Berechnungen",
    ],

    // UI translations
    ui: {
      // Navigation & Menu
      menu: "Menü",
      navigationDescription: "Navigation und rechtliche Informationen",
      language: "Sprache",
      install: "Installieren",
      installApp: "App installieren",

      // Currency & Calculator
      calculator: "Rechner",
      conversion: "Umrechnung",
      exchangeRate: "Wechselkurs",
      from: "Von",
      to: "Nach",
      amount: "Betrag",
      result: "Ergebnis",
      swapCurrencies: "Währungen tauschen",
      selectCurrency: "Währung auswählen",
      searchCurrency: "Währung suchen...",

      // Status messages
      loading: "Lädt...",
      updating: "Aktualisiert...",
      cached: "gespeichert",
      justNow: "Gerade eben",
      minutesAgo: (minutes: number) => `vor ${minutes}m`,
      hoursAgo: (hours: number) => `vor ${hours}h`,
      never: "Nie",

      // Error messages
      networkError: "Netzwerkfehler",
      offlineUpdate: "Offline - keine Aktualisierung möglich",
      refreshRates: "Wechselkurse aktualisieren",

      // Legal pages
      privacy: "Privacy Policy",
      dataProtection: "Datenschutz",
      imprint: "Impressum",
      siteNotice: "Site Notice",

      // Share functionality
      shareApp: "App teilen",
      shareTitle: "App teilen",
      shareDescription:
        "Teile den kostenlosen Währungsrechner mit deinen Freunden",
      shareText:
        "Schau dir diesen kostenlosen Währungsrechner an! Über 170 Währungen mit aktuellen Wechselkursen. 📱💱",
      shareNativeTitle: "Teilen",
      shareNativeDescription: "Mit Freunden teilen",
      shareWhatsApp: "WhatsApp",
      shareWhatsAppDescription: "Mit Freunden teilen",
      shareCopyLink: "Link kopieren",
      shareCopyLinkCopied: "Kopiert!",
      shareCopyDescription: "Link in Zwischenablage",
      shareFooter: "💱 Kostenloser Währungsrechner für alle!",

      // Offline notice
      offlineTitle: "Internet-Verbindung erforderlich",
      offlineDescription:
        "Für die erste Nutzung ist eine Online-Verbindung nötig, um aktuelle Wechselkurse zu laden. Danach funktioniert die App auch offline.",
      offlineMode: "Offline-Modus",
      offlineCachedData:
        "Arbeitet mit zwischengespeicherten Daten. Zuletzt aktualisiert:",
      unknown: "Unbekannt",

      // Pull to refresh
      pullToRefreshRelease: "Loslassen zum Aktualisieren",
      pullToRefreshPull: "Zum Aktualisieren herunterziehen",
      pullToRefreshUpdating: "App wird aktualisiert...",
      pullToRefreshChecking: "Suche nach Updates...",
      pullToRefreshOffline: "Offline - keine Aktualisierung möglich",

      // Coffee donation
      buyMeACoffee: "Kauf mir einen Kaffee",

      // Service Worker
      updateAvailable: "App-Update verfügbar! 🚀",
      updateDescription:
        "Eine neue Version der App ist verfügbar. Jetzt aktualisieren?",
      updateButton: "Aktualisieren",
      updateLater: "Später",
      ratesUpdated: "Wechselkurse aktualisiert",
      ratesUpdatedDescription: "Die neuesten Wechselkurse wurden geladen.",

      // App updates
      updateSuccess: "App erfolgreich aktualisiert! ✨",
      updateSuccessDescription: "Die neueste Version ist jetzt verfügbar.",

      // Exchange rates
      online: "Online",
      offline: "Offline",
      noRatesOffline: "Keine Kurse - Online-Verbindung erforderlich",
      updateFailed: "Aktualisierung fehlgeschlagen",
      offlineNoData:
        "Keine Wechselkursdaten offline verfügbar. Internetverbindung für das Laden der ersten Daten erforderlich.",

      // Currency grouping
      majorCurrencies: "Hauptwährungen",
      europeanCurrencies: "Europäische Währungen",
      otherCurrencies: "Andere Währungen",
      searchCurrencies: "Währungen suchen...",

      // Currency search
      noCurrencyFound: "Keine Währung gefunden.",
      noCurrencyMatching: "Keine passende Währung gefunden.",

      // 404 page
      notFoundTitle: "Seite nicht gefunden",
      notFoundDescription:
        "Die angeforderte Seite konnte nicht gefunden werden.",
      notFoundButton: "Zurück zum Calculator",

      // Notifications and PWA features
      notifications: {
        settings: "Benachrichtigungen",
        title: "Push-Mitteilungen",
        description:
          "Mitteilungen und Auto-Sync für Wechselkurse konfigurieren.",
        permission: "Berechtigung",
        granted: "Erlaubt",
        denied: "Verweigert",
        notRequested: "Nicht angefragt",
        enable: "Aktivieren",
        disable: "Deaktivieren",
        enabled: "Mitteilungen aktiviert!",
        enabledDescription: "Sie erhalten Updates über Kursänderungen.",
        disabled: "Mitteilungen deaktiviert",
        permissionDenied: "Berechtigung verweigert",
        permissionRequired: "Berechtigung erforderlich",
        error: "Fehler beim Aktualisieren",
        test: "Test",
        testTitle: "Test-Mitteilung",
        testBody: "Dies ist eine Test-Mitteilung vom Währungsrechner",
        testSent: "Test-Mitteilung gesendet",
        testError: "Fehler beim Test senden",
        pushNotifications: "Push-Mitteilungen",
        pushDescription: "Mitteilungen auch bei geschlossener App erhalten.",
        active: "Aktiv",
        inactive: "Inaktiv",
        backgroundSync: "Auto-Sync",
        backgroundSyncDescription:
          "Kurse automatisch im Hintergrund aktualisieren.",
        backgroundSyncEnabled: "Auto-Sync aktiviert!",
        backgroundSyncError: "Fehler beim Aktivieren",
        enableBackgroundSync: "Auto-Sync aktivieren",
      },

      // Conversion History
      conversionHistory: {
        title: "Umrechnungs-Verlauf",
        recent: "Kürzlich",
        statistics: "Statistiken",
        settings: "Einstellungen",
        noConversions: "Noch keine Umrechnungen",
        allTime: "Alle Zeit",
        last24h: "Letzte 24 Stunden",
        last7d: "Letzte 7 Tage",
        last30d: "Letzte 30 Tage",
        export: "Exportieren",
        clear: "Alle löschen",
        exported: "Verlauf erfolgreich exportiert",
        exportFailed: "Export fehlgeschlagen",
        historyCleared: "Verlauf gelöscht",
        totalConversions: "Gesamt-Umrechnungen",
        averageAmount: "Durchschnittlicher Betrag",
        popularPairs: "Meist genutzte Währungspaare",
        offline: "Offline",
        enableLogging: "Umrechnungs-Protokollierung aktivieren",
        loggingDescription:
          "Alle Umrechnungen automatisch speichern wenn online",
        privacyNotice: "Datenschutz-Hinweis",
        privacyDescription:
          "Alle Umrechnungsdaten werden lokal auf Ihrem Gerät gespeichert und niemals an externe Server gesendet.",
        enable: "Aktivieren",
        disable: "Deaktivieren",
        loggingEnabled: "Umrechnungs-Protokollierung aktiviert",
        loggingDisabled: "Umrechnungs-Protokollierung deaktiviert",
      },
    },
  },
} as const;

export type TranslationKeys = typeof translations.en;
