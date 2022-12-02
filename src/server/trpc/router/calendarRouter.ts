import { z } from "zod";
import { procedure, router } from "../utils";

export const calendarRouter = router({
  getCalendar: procedure
    .input(
      z.object({
        date: z.string(), // MM/DD/YYYY
      })
    )
    .query(() => {
      return {
        data: [
          {
            startDateTimeJson: "2022-11-01T20:00:00+02:00",
            durationInMinutes: 55,
            name: "ספורט",
            employeeName: "זינאדין זידאן",
            location: {
              name: "סנטיאגו ברנבאו",
            },
          },
        ],
      };
    }),
});
