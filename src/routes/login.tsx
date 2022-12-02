import { useI18n } from "@solid-primitives/i18n";
import { Show, Suspense } from "solid-js";
import { Title, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { authenticator } from "~/server/auth/authenticator";
import { authClient } from "~/utils/auth";

export const routeData = () => {
  return createServerData$(async (_, { request }) => {
    return await authenticator.isAuthenticated(request);
  });
};

function Login() {
  const user = useRouteData<typeof routeData>();
  const [t] = useI18n();
  return (
    <>
      <Title>{t("Login.title")}</Title>
      <Suspense fallback={<div>{t("Login.loading")}</div>}>
        <Show
          when={user() == null}
          fallback={
            <div class="flex items-center gap-2">
              <img
                src={user()?.picture ?? ""}
                width={30}
                height={30}
                class="flex-shrink-0 rounded-full border"
                alt=""
              />
              <div class="text-sm">{user()?.displayName}</div>
            </div>
          }
        >
          <div class="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => {
                void authClient.login("google", {
                  successRedirect: "/",
                  failureRedirect: "/login",
                });
              }}
            >
              {t("Login.sign_in_with_google")}
            </button>
          </div>
        </Show>
      </Suspense>
    </>
  );
}

export default Login;
