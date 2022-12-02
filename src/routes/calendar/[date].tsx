import { Motion, Presence } from "@motionone/solid";
import { useI18n } from "@solid-primitives/i18n";
import { A, useIsRouting } from "@solidjs/router";
import dayjs from "dayjs";
import { For, Show, Suspense } from "solid-js";
import type { RouteDataArgs } from "solid-start";
import { createRouteData, useParams, useRouteData } from "solid-start";
import { z } from "zod";
import NavigateBeforeIcon from "~/assets/navigate-before.svg";
import NavigateNextIcon from "~/assets/navigate-next.svg";
import { TrainingLesson } from "~/components/TrainingLesson";
import { useUser } from "~/providers/UserProvider";
import { client } from "~/utils/trpc";

const DD_MM_YYY_REGEX = /^(3[01]|[12]\d|0[1-9])-(1[0-2]|0[1-9])-\d{4}$/;

const paramsSchema = z.object({
  date: z.string().regex(DD_MM_YYY_REGEX),
});

export function routeData({ params }: RouteDataArgs) {
  const getAPIDate = () => {
    const parsedSchema = paramsSchema.parse(params);
    const [day = "", month = "", year = ""] = parsedSchema.date.split("-");
    return `${month}/${day}/${year}`;
  };

  return createRouteData(
    async ([, date]) => {
      return await client.app.getCalendar.query({
        date,
      });
    },
    { key: () => ["calendar", getAPIDate()] as const }
  );
}

const URL_DATE_FORMAT = "DD-MM-YYYY";

export default function Calendar() {
  const user = useUser();

  const calendar = useRouteData<typeof routeData>();
  const isRouting = useIsRouting();
  const params = useParams<z.infer<typeof paramsSchema>>();
  const [t] = useI18n();

  const date = () => {
    const [day, month, year] = params.date.split("-");
    return dayjs()
      .year(Number(year))
      .month(Number(month) - 1)
      .date(Number(day));
  };

  const weekDays = () => {
    const firstWeekDay = date().startOf("week");
    return Array.from({ length: 7 }, (_, index) => {
      return firstWeekDay.add(index, "days");
    });
  };

  return (
    <div class="flex flex-col justify-center px-2 pb-10 pt-5">
      <div class="flex flex-col flex-wrap gap-5 pb-10">
        <div>
          <button type="button" class="flex items-center gap-2">
            <img
              src={user.picture}
              width={30}
              height={30}
              class="flex-shrink-0 rounded-full border"
              alt=""
            />
            <div class="text-sm">{user.displayName}</div>
          </button>
        </div>
        <h2 class="flex-1 self-center whitespace-nowrap text-center text-5xl font-bold">
          {t("Home.title")}
        </h2>
      </div>
      <div class="sticky top-0 z-10 flex w-full flex-col items-center border-b bg-white py-3">
        <div>
          <div class="flex items-center justify-between">
            <A
              href={`/calendar/${date()
                .startOf("week")
                .subtract(1, "day")
                .format(URL_DATE_FORMAT)}`}
            >
              <div class="sr-only">{t("Home.last_week")}</div>
              <NavigateNextIcon height={24} width={24} />
            </A>
            <div class="py-3 text-center">{date().format("MMMM")}</div>
            <A
              href={`/calendar/${date()
                .endOf("week")
                .add(1, "day")
                .format(URL_DATE_FORMAT)}`}
            >
              <div class="sr-only">{t("Home.next_week")}</div>
              <NavigateBeforeIcon height={24} width={24} />
            </A>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <For each={weekDays()}>
              {(weekDay) => {
                return (
                  <div class="flex flex-col items-center justify-center gap-2">
                    {weekDay.format("dd")}
                    <A
                      href={`/calendar/${weekDay.format(URL_DATE_FORMAT)}`}
                      activeClass="flex h-10 w-10 items-center justify-center rounded-full border text-green-800 bg-green-200"
                      inactiveClass="flex h-10 w-10 items-center justify-center rounded-full border"
                    >
                      {weekDay.date()}
                    </A>
                  </div>
                );
              }}
            </For>
          </div>
        </div>
      </div>
      <div class="h-10" />
      <Presence exitBeforeEnter>
        <Show when={isRouting()}>
          <Motion.div
            class="flex justify-center"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "60px" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {t("Home.loading_new_route")}
          </Motion.div>
        </Show>
      </Presence>
      <div class="flex justify-center">
        <Suspense fallback={<div>{t("Home.loading")}</div>}>
          <ul class="container flex flex-col gap-4 md:max-w-xl">
            <For
              each={calendar()?.data}
              fallback={<div>{t("Home.not_found")}</div>}
            >
              {(data) => {
                return (
                  <li class="rounded border">
                    <div
                      classList={{
                        "opacity-40": isRouting(),
                      }}
                    >
                      <TrainingLesson
                        data={data}
                        onRegister={() => {
                          // Do nothing for now
                        }}
                      />
                    </div>
                  </li>
                );
              }}
            </For>
          </ul>
        </Suspense>
      </div>
    </div>
  );
}
