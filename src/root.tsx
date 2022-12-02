// @refresh reload
import { I18nContext, createI18nContext } from "@solid-primitives/i18n";
import dayjs from "dayjs";
import "dayjs/locale/he";
import { Suspense, createEffect } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import he from "~/i18n/locales/he.json";
import "./root.css";

export default function Root() {
  const lang = "he";
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const i18nDictionary = { he };
  const i18n = createI18nContext(i18nDictionary, lang);
  const [t] = i18n;

  createEffect(() => {
    dayjs.locale(lang);
  });

  return (
    <Html lang={lang} dir="rtl">
      <I18nContext.Provider value={i18n}>
        <Head>
          <Title>{t("title")}</Title>
          <Meta charset="utf-8" />
          <Meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            // eslint-disable-next-line no-secrets/no-secrets
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Body>
          <Suspense>
            <ErrorBoundary>
              <Routes>
                <FileRoutes />
              </Routes>
            </ErrorBoundary>
          </Suspense>
          <Scripts />
        </Body>
      </I18nContext.Provider>
    </Html>
  );
}
