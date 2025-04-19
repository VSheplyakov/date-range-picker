"use client";
import { ReactNode } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import MuiXLicense from "../components/MuiXLicense";

interface Props {
  children: ReactNode;
}

export default function ProvidersWrapper({ children }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
      <MuiXLicense />
      {children}
    </LocalizationProvider>
  );
}
