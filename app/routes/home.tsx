import { heading, label, text } from "~/styles/text.styles";
import type { Route } from "./+types/home";
import { twMerge } from "tailwind-merge";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Brett Smith" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home() {
  return (
    <main className="container my-16 md:my-20 grid gap-20 md:gap-24">
      <h1 className={heading({ level: "h2", weight: "regular" })}>
        Hi, I'm Brett. I'm a Software Engineer building projects with React,
        TypeScript, & Node.js
      </h1>

      <section>
        <h2 className={twMerge(label, "mb-6")}>Updates</h2>

        <ul className="grid gap-8">
          {UPDATES_V2.map(({ year, updates }) => (
            <li
              key={year}
              className="grid gap-3 md:gap-6 sm:grid-cols-[120px_1fr]"
            >
              <span className={text({ color: "secondary" })}>{year}</span>

              <ul className="grid gap-1.5 md:gap-2">
                {updates.map(({ update }, index) => (
                  <li key={index} className={text()}>
                    {update}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

interface YearUpdate {
  update: string;
}

interface Updates {
  year: number;
  updates: YearUpdate[];
}

const UPDATES_V2: Updates[] = [
  {
    year: 2025,
    updates: [
      {
        update: "Launch BreakLine Partners Microsite",
      },
      {
        update: "New role as Senior Frontend Engineer at BreakLine",
      },
    ],
  },
  {
    year: 2024,
    updates: [
      { update: "New role as Software Engineer at BDG Partners" },
      { update: "Launch custom Audible Catalog Figma plugin" },
      { update: "Presenter at Contentful Amazon Day" },
    ],
  },
  {
    year: 2023,
    updates: [
      { update: "Elegant Seagulls Sauce Honorable Mention" },
      { update: "Launch Elegant Seagulls Sauce website" },
      { update: "Launch new Audible Gift Center experience" },
      { update: "Launch updated global Audible landing page experiments" },
      { update: "Begin rolling out global Audible About site initiative" },
      { update: "Audible ACX Blog" },
      { update: "Launch personal website v4.0" },
    ],
  },
  {
    year: 2022,
    updates: [
      { update: "Elegant Seagulls agency Site of The Day" },
      { update: "Hello World! Charles Robert Smith" },
      { update: "Launch Audible landing page experiments" },
    ],
  },
  {
    year: 2021,
    updates: [
      { update: "Launch Audible Audiobook quiz recommendation  platform" },
    ],
  },
  {
    year: 2020,
    updates: [{ update: "Tech. Director at Elegant Seagulls" }],
  },
  {
    year: 2019,
    updates: [
      { update: "Waves 4 Water Honorable Mention" },
      { update: "Tane Website of the Day" },
      { update: "Tane Honorable Mention & Mobile Excellence Award" },
      { update: "About Audible Honorable Mention" },
    ],
  },
  {
    year: 2018,
    updates: [
      { update: "Lead Frontend Developer at Elegant Seagulls" },
      { update: "InVision Design Leadership Honorable Mention" },
    ],
  },
  {
    year: 2017,
    updates: [{ update: "Elegant Seagulls agency site Honorable Mention" }],
  },
];
