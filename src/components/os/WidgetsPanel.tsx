"use client";

import dynamic from "next/dynamic";

const WeatherWidget = dynamic(() =>
  import("@/components/widgets/WeatherWidget").then((m) => m.WeatherWidget)
);
const CalendarWidget = dynamic(() =>
  import("@/components/widgets/CalendarWidget").then((m) => m.CalendarWidget)
);
const ClockWidget = dynamic(() =>
  import("@/components/widgets/ClockWidget").then((m) => m.ClockWidget)
);
const NotesWidget = dynamic(() =>
  import("@/components/widgets/NotesWidget").then((m) => m.NotesWidget)
);
const MusicWidget = dynamic(() =>
  import("@/components/widgets/MusicWidget").then((m) => m.MusicWidget)
);

export function WidgetsPanel() {
  return (
    <div className="absolute left-4 top-10 hidden flex-col gap-3 lg:flex">
      <ClockWidget />
      <WeatherWidget />
      <CalendarWidget />
      <NotesWidget />
      <MusicWidget />
    </div>
  );
}
