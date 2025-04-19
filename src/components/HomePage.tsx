import { Stack } from "@mui/material";
import MyDateRangePicker from "./MyDateRangePicker";

export default function HomePage() {
  return (
    <Stack sx={{ alignItems: "center", justifyContent: "center" }}>
      <MyDateRangePicker />
    </Stack>
  );
}
