import dayjs from "dayjs";
import { Navigate } from "solid-start";

export default function Home() {
  return <Navigate href={`/calendar/${dayjs().format("DD-MM-YYYY")}`} />;
}
