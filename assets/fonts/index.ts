import localFont from "next/font/local";

export const fontSans = localFont({
  src: [
    {
      path: "./Satoshi_Complete/Satoshi-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Satoshi_Complete/Satoshi-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./Satoshi_Complete/Satoshi-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Satoshi_Complete/Satoshi-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./Satoshi_Complete/Satoshi-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Satoshi_Complete/Satoshi-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./Satoshi_Complete/Satoshi-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Satoshi_Complete/Satoshi-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./Satoshi_Complete/Satoshi-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./Satoshi_Complete/Satoshi-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-sans",
});

export const fontSerif = localFont({
  src: [
    {
      path: "./Instrument_Serif/InstrumentSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Instrument_Serif/InstrumentSerif-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-serif",
});
