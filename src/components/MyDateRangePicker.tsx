"use client";
import { Button, Collapse, IconButton } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { Typography, Paper, Divider, Stack } from "@mui/material";
import { DateField, DateRangeCalendar } from "@mui/x-date-pickers-pro";
import { DateRange } from "@mui/x-date-pickers-pro";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/uk";

dayjs.locale("uk");

export default function MyDateRangePicker() {
  const [activeField, setActiveField] = useState<"start" | "end" | null>(null);
  const [value, setValue] = useState<DateRange<Dayjs>>([null, null]);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleClearField = (field: "start" | "end") => {
    if (field === "start") {
      setValue([null, value[1]]);
    } else {
      setValue([value[0], null]);
    }
    setActiveField(field);
    setCalendarOpen(true);
  };

  const handleCalendarChange = (newValue: DateRange<Dayjs>) => {
    setValue(newValue);
    if (newValue[0] && newValue[1]) {
      setActiveField(null);
      // setCalendarOpen(false);
    }
  };

  return (
    <Paper
      elevation={10}
      sx={{
        width: { xs: "100%", md: "600px" },
        p: 3,
        borderRadius: 3,
        background: "linear-gradient(to right, lightcyan, lightblue)",
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h5" my={2} sx={{ textAlign: "center" }}>
        Оберіть період:
      </Typography>

      <Stack
        sx={{
          gap: 2,
          p: 2,
          mb: 2,
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={1}
        >
          <IconButton
            size="large"
            onClick={() => setCalendarOpen((prev) => !prev)}
            sx={{
              backgroundColor: "inherit",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#f5f5f5/50%",
              },
            }}
          >
            <CalendarMonthIcon
              color={calendarOpen ? "success" : "disabled"}
              fontSize="large"
            />
          </IconButton>
        </Stack>
        <DateField
          endAdornment={
            <IconButton
              onClick={() => handleClearField("start")}
              sx={{ borderRadius: "50%" }}
            >
              {value[0] ? <CloseIcon /> : <EditIcon />}
            </IconButton>
          }
          label="Дата початку"
          value={value[0]}
          onChange={(newDate) => setValue([newDate, value[1]])}
          format="DD-MM-YYYY"
          disabled={activeField !== "start"}
          disablePast
          InputProps={{
            sx: {
              borderRadius: "12px",
              backgroundColor: "inherit",
            },
          }}
        />
        <DateField
          endAdornment={
            <IconButton
              onClick={() => handleClearField("end")}
              sx={{ borderRadius: "50%" }}
            >
              {value[1] ? <CloseIcon /> : <EditIcon />}
            </IconButton>
          }
          label="Дата завершення"
          value={value[1]}
          // onFocus={() => setCalendarOpen(true)}
          onChange={(newDate) => setValue([value[0], newDate])}
          format="DD-MM-YYYY"
          disablePast
          disabled={activeField !== "end"}
          InputProps={{
            sx: {
              borderRadius: "12px",
              backgroundColor: "inherit",
            },
          }}
        />
      </Stack>
      {calendarOpen && <Divider sx={{ mb: 2 }} />}

      <Collapse in={calendarOpen}>
        <Stack
          sx={{
            w: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 2,
              width: "min-content",
            }}
          >
            <DateRangeCalendar
              disablePast
              value={value}
              dayOfWeekFormatter={(day) => `${day.format("dd")}`.toUpperCase()}
              onChange={handleCalendarChange}
              calendars={1}
              sx={{
                background: "inherit",
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                ".MuiPickersCalendarHeader-label": {
                  textTransform: "capitalize",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#29303F",
                },
                ".MuiDayCalendar-weekDayLabel": {
                  textTransform: "capitalize",
                  fontSize: "13px",
                  color: "#757575",
                },
                ".MuiPickersDay-root": {
                  fontSize: "13px",
                },
                ".Mui-selected": {
                  backgroundColor: "inherit !important",
                  fontWeight: "600",
                  border: "1px solid lightgray",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                },
                ".MuiPickersDay-root.Mui-selected:hover": {
                  backgroundColor: "inherit !important",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                },
                ".MuiPickersDay-root.Mui-selected": {
                  backgroundColor: "inherit !important",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                },
                ".MuiPickersDay-today": {
                  border: "1px solid lightgray !important",
                },
              }}
            />
          </Stack>
          <Stack
            direction={"row"}
            // justifyItems={"center"}
            // alignItems={"center"}
            justifyContent={"space-around"}
            gap={2}
            width={"100%"}
            pt={{ xs: 2, md: 4 }}
          >
            <Button
              sx={{ color: "error.main" }}
              onClick={() => {
                setValue([null, null]);
                setCalendarOpen(false);
              }}
            >
              Відмінти
            </Button>
            <Button
              sx={{ color: "success.main" }}
              onClick={() => setCalendarOpen(false)}
            >
              Підтвердити
            </Button>
          </Stack>
        </Stack>
      </Collapse>
    </Paper>
  );
}
