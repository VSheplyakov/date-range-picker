"use client";
import { Collapse, IconButton } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useState } from "react";
import { Typography, Paper, Divider, Stack } from "@mui/material";
import { DateField, DateRangeCalendar } from "@mui/x-date-pickers-pro";
import { DateRange } from "@mui/x-date-pickers-pro";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/uk";

dayjs.locale("uk");

export default function MyDateRangePicker() {
  const [value, setValue] = useState<DateRange<Dayjs>>([null, null]);
  const [calendarOpen, setCalendarOpen] = useState(false);

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
        <DateField
          label="Дата початку"
          value={value[0]}
          onFocus={() => setCalendarOpen(true)}
          onChange={(newDate) => setValue([newDate, value[1]])}
          format="DD-MM-YYYY"
          disablePast
          InputProps={{
            sx: {
              borderRadius: "12px",
              backgroundColor: "inherit",
            },
          }}
        />
        <DateField
          label="Дата завершення"
          value={value[1]}
          onFocus={() => setCalendarOpen(true)}
          onChange={(newDate) => setValue([value[0], newDate])}
          format="DD-MM-YYYY"
          disablePast
          InputProps={{
            sx: {
              borderRadius: "12px",
              backgroundColor: "inherit",
            },
          }}
        />
      </Stack>

      <Divider sx={{ mb: 2 }} />
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
      >
        <IconButton
          onClick={() => setCalendarOpen((prev) => !prev)}
          sx={{
            border: "1px solid lightgray",
            borderRadius: "8px",
            backgroundColor: "inherit",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "#f5f5f5/50%",
            },
          }}
        >
          <CalendarMonthIcon color={calendarOpen ? "success" : "disabled"} />
        </IconButton>
      </Stack>
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
              onChange={(newValue) => setValue(newValue)}
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
        </Stack>
      </Collapse>
    </Paper>
  );
}
