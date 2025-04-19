import { DateRange } from "@mui/x-date-pickers-pro";
import { Dayjs } from "dayjs";
import { useMemo, useState } from "react";

const useDateRangePicker = () => {
  const [activeField, setActiveField] = useState<"start" | "end" | null>(null);
  const [value, setValue] = useState<DateRange<Dayjs>>([null, null]);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const clearField = (field: "start" | "end") => {
    setValue((prev) => (field === "start" ? [null, prev[1]] : [prev[0], null]));
    setActiveField(field);
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
    setValue(newValue);
    if (newValue[0] && newValue[1]) {
      setActiveField(null);
    }
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
    activeField,
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
