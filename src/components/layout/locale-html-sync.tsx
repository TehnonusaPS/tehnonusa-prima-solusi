"use client";

import * as React from "react";

export function LocaleHtmlSync({ locale }: { locale: string }) {
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}

export default LocaleHtmlSync;
