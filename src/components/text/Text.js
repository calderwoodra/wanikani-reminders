import React from "react";
import { classNames } from "src/components/helpers/classNames";

// Font family
// font-sans
// font-serif
// font-mono

// Font weight
// font-thin font-weight: 100;
// font-extralight font-weight: 200;
// font-light font-weight: 300;
// font-normal font-weight: 400;
// font-medium font-weight: 500;
// font-semibold font-weight: 600;
// font-bold font-weight: 700;
// font-extrabold font-weight: 800;
// font-black font-weight: 900;

// Font size
// text-xs font-size: 0.75rem; /* 12px */
// text-sm font-size: 0.875rem; /* 14px */
// text-base font-size: 1rem; /* 16px */
// text-lg font-size: 1.125rem; /* 18px */
// text-xl font-size: 1.25rem; /* 20px */
// text-2xl font-size: 1.5rem; /* 24px */
// text-3xl font-size: 1.875rem; /* 30px */
// text-4xl font-size: 2.25rem; /* 36px */
// text-5xl font-size: 3rem; /* 48px */
// text-6xl font-size: 3.75rem; /* 60px */
// text-7xl font-size: 4.5rem; /* 72px */
// text-8xl font-size: 6rem; /* 96px */
// text-9xl font-size: 8rem; /* 128px */

// Line Height
// leading-3 line-height: .75rem; /* 12px */
// leading-4 line-height: 1rem; /* 16px */
// leading-5 line-height: 1.25rem; /* 20px */
// leading-6 line-height: 1.5rem; /* 24px */
// leading-7 line-height: 1.75rem; /* 28px */
// leading-8 line-height: 2rem; /* 32px */
// leading-9 line-height: 2.25rem; /* 36px */
// leading-10 line-height: 2.5rem; /* 40px */
// leading-none line-height: 1;
// leading-tight line-height: 1.25;
// leading-snug line-height: 1.375;
// leading-normal line-height: 1.5;
// leading-relaxed line-height: 1.625;
// leading-loose

// IMPORTANT: do not include colors here
export const TextStyle = Object.freeze({
  hero: "font-serif text-5xl-serif md:text-6xl-serif",
  h1: "font-serif text-3xl-serif md:text-5xl-serif",
  h2: "font-serif text-2xl-serif md:text-4xl-serif font-semibold",
  h4: "font-serif text-lg-serif md:text-xl-serif font-semibold",

  sans_hero: "font-sans text-5xl md:text-6xl font-semibold",
  header: "font-sans text-xl md:text-3xl font-semibold",
  med_header: "font-sans text-lg md:text-2xl font-semibold",
  small_header: "font-sans text-base md:text-xl font-semibold",
  button: "font-sans text-lg leading-normal font-medium tracking-tight",
  body: "font-sans text-base md:text-lg leading-normal tracking-normal",
  paragraph: "font-sans text-sm md:text-base leading-normal tracking-normal",
  sub_header: "font-sans text-sm md:text-base",
  title: "font-sans text-xs md:text-sm font-semibold",
  value: "font-sans text-xs font-semibold",
  sub_value: "font-sans text-xs md:text-sm",
  fine_print: "font-sans text-xs",
  none: "",
});

export const Text = ({ className, style, children }) => {
  return <div className={classNames(className, style)}>{children}</div>;
};

Text.defaultProps = {
  style: TextStyle.none,
};
