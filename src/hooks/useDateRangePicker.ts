import { DateRange } from "@mui/x-date-pickers-pro";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";

const useDateRangePicker = () => {
  const [value, setValue] = useState<DateRange<Dayjs>>([null, null]);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const clearField = (field: "start" | "end") => {
    setValue((prev) => (field === "start" ? [null, prev[1]] : [prev[0], null]));

    setCalendarOpen(true);
  };

  const disabledApply = useMemo(() => {
    return (
      !value[0] ||
      !value[1] ||
      value[0].format("YYYY-MM-DD") === value[1].format("YYYY-MM-DD")
    );
  }, [value]);

  const handleCalendarChange = (newValue: DateRange<Dayjs>) => {
    const [start, end] = newValue;

    const today = dayjs().startOf("day");

    const newStart = start
      ? start.isSame(today, "day")
        ? dayjs().add(1, "second")
        : start.startOf("day")
      : null;

    const newEnd = end ? end.endOf("day").set("second", 59) : null;

    setValue([newStart, newEnd]);
  };
  const handleClickCancel = () => {
    setValue([null, null]);
    setCalendarOpen(false);
  };

  const handleClickApply = () => {
    setCalendarOpen(false);
  };

  return {
    value,
    setValue,
    calendarOpen,
    setCalendarOpen,
    clearField,
    disabledApply,
    handleCalendarChange,
    handleClickCancel,
    handleClickApply,
  };
};

export default useDateRangePicker;
