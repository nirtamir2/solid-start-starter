import { useI18n } from "@solid-primitives/i18n";
import dayjs from "dayjs";
import TimeIcon from "~/assets/time.svg";

interface TrainingLessonData {
  startDateTimeJson: string;
  durationInMinutes: number;
  name: string;
  employeeName: string;
  location: {
    name: string;
  };
}

export function TrainingLesson(props: {
  data: TrainingLessonData;
  onRegister: () => void;
}) {
  const [t] = useI18n();

  const data = () => props.data;

  const startTime = dayjs(data().startDateTimeJson);

  const endTime = dayjs(startTime).add(data().durationInMinutes, "minutes");

  return (
    <div class="flex flex-col gap-4 p-4">
      <div class="text-center text-2xl font-bold">{data().name}</div>
      <div class="flex flex-wrap justify-between">
        <div>
          <div class="text-lg text-gray-600">{data().employeeName}</div>
          <div class="text-base text-gray-500">{data().location.name}</div>
        </div>
        <div class="flex items-center gap-2 self-end">
          <TimeIcon height={24} width={24} />
          <div>
            <time dateTime={startTime.toString()}>
              {startTime.format("HH:mm")}
            </time>
            <span>-</span>
            <time dateTime={startTime.toString()}>
              {endTime.format("HH:mm")}
            </time>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          props.onRegister();
        }}
      >
        {t("TrainingLesson.register")}
      </button>
    </div>
  );
}
