import { cva, type VariantProps } from "cva";

export const text = cva([], {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      default: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
    color: {
      primary: "text-ink-900",
      secondary: "text-muted-400",
      tertiary: "text-muted-300",
    },
  },
  defaultVariants: {
    size: "default",
    weight: "regular",
    color: "primary",
  },
});

export type TextVariants = VariantProps<typeof text>;

export const heading = cva("tracking-tight", {
  variants: {
    level: {
      h1: "text-3xl md:text-5xl leading-[1.1] md:leading-[1.05]",
      h2: "text-3xl md:text-4xl leading-[1.1]",
      h3: "text-3xl md:text-3xl leading-[1.1]",
      h4: "text-2xl md:text-2xl leading-[1.15]",
      h5: "text-xl md:text-xl leading-tight",
      h6: "text-base md:leading-tight",
    },
    weight: {
      regular: "font-normal",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    color: {
      primary: "text-ink-950",
      secondary: "text-ink-900",
      tertiary: "text-muted-400",
    },
  },
  defaultVariants: {
    level: "h2",
    weight: "semibold",
    color: "primary",
  },
});

export type HeadingVariants = VariantProps<typeof heading>;

export const label = "text-xs uppercase tracking-widest";

export const linkText = cva("transition-colors underline-offset-4", {
  variants: {
    underline: {
      initial: "underline",
      hover: "hover:underline",
    },
    color: {
      action: "text-signal-500 hover:text-signal-700 active:text-signal-700",
      primary: "text-ink-900 hover:text-signal-500 active:text-signal-500",
      inherit: "text-inherit",
    },
  },
});

export type LinkTextVariants = VariantProps<typeof linkText>;
