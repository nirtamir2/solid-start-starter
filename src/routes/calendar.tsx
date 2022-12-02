import { useI18n } from "@solid-primitives/i18n";
import { Show, Suspense } from "solid-js";
import { Outlet, useRouteData } from "solid-start";
import { createServerData$, redirect } from "solid-start/server";
import { UserProvider } from "~/providers/UserProvider";
import { authenticator } from "~/server/auth/authenticator";

export const routeData = () => {
  return createServerData$(async (_, { request }) => {
    const user = await authenticator.isAuthenticated(request);
    if (user == null) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal,etc/throw-error
      throw redirect("/login");
    }
    return user;
  });
};

export default function UserLayout() {
  const user = useRouteData<typeof routeData>();
  const [t] = useI18n();

  return (
    <Suspense
      fallback={
        <div class="flex items-center justify-center">
          {t("UserLayout.loading")}
        </div>
      }
    >
      <Show keyed when={user()} fallback={<div>{t("UserLayout.no_user")}</div>}>
        {(user) => (
          <UserProvider user={user}>
            <Outlet />
          </UserProvider>
        )}
      </Show>
    </Suspense>
  );
}
