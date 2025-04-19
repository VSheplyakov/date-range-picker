"use client";
import { Collapse, IconButton } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { Typography, Paper, Divider, Stack } from "@mui/material";
import { DateField, DateRangeCalendar } from "@mui/x-date-pickers-pro";
import ActionButton from "./ActionButton";
import useDateRangePicker from "@/hooks/useDateRangePicker";
import { calendarStyles } from "@/utils/calendarStyles";

export default function MyDateRangePicker() {
  const {
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
  } = useDateRangePicker();

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
      <Typography variant="h5" my={1} sx={{ textAlign: "center" }}>
        Оберіть період:
      </Typography>

      <Stack
        sx={{
          gap: 2,
          py: 2,
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
              onClick={() => clearField("start")}
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
              onClick={() => clearField("end")}
              sx={{ borderRadius: "50%" }}
            >
              {value[1] ? <CloseIcon /> : <EditIcon />}
            </IconButton>
          }
          label="Дата завершення"
          value={value[1]}
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
              sx={calendarStyles}
            />
          </Stack>
          <ActionButton
            handleClickCancel={handleClickCancel}
            handleClickApply={handleClickApply}
            disabledApplyButton={disabledApply}
          />
        </Stack>
      </Collapse>
    </Paper>
  );
}
