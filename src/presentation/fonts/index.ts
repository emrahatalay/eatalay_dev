import { Archivo, Instrument_Serif } from "next/font/google";

/** Variable Archivo (weight + width axes) carries both display and body text. */
export const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

/** Only the italic cut is used, as an accent; not needed for first paint. */
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: "italic",
  display: "swap",
  preload: false,
  variable: "--font-instrument",
});
