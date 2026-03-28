import { twMerge } from 'tailwind-merge';
import { Main } from '~/components/Main';
import { TITLE } from '~/constants/seo.constants';
import { heading, label, text } from '~/styles/text.styles';

export function headers(): HeadersInit {
  return {
    // cache for 1 hour, revalidate up to 24 hours
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  };
}

export default function Home() {
  return (
    <>
      <title>{TITLE}</title>
      <meta
        name="description"
        content="Software engineer interested in TypeScript, React, and Design Systems. Currently working as a Senior Frontend Engineer at BreakLine."
      />
      <Main className="container grid gap-20 md:gap-24">
        <h1 className={heading({ level: 'h2', weight: 'regular' })}>
          Hi, I'm Brett. I'm a Software Engineer building products with React,
          TypeScript, & Node.js
        </h1>

        <section>
          <h2 className={twMerge(label, 'mb-6')}>Updates</h2>

          <ul className="grid gap-8">
            {UPDATES_V2.map(({ year, updates }) => (
              <li
                key={year}
                className="grid gap-3 md:gap-6 sm:grid-cols-[120px_1fr]"
              >
                <span
                  className={text({
                    color: 'secondary',
                    className: 'leading-snug',
                  })}
                >
                  {year}
                </span>

                <ul className="grid gap-2.5 md:gap-4">
                  {updates.map(({ update, suffix, type }, index) => (
                    <li key={index} className="relative">
                      {type === UPDATE_TYPE.ROLE && (
                        <div className="absolute -left-2.75 top-2.25 size-1 rounded-full bg-accent" />
                      )}

                      <p
                        className={text({
                          className: 'leading-snug text-pretty',
                        })}
                      >
                        {update}
                        {suffix && (
                          <>
                            {' '}
                            <span className="text-text-muted text-sm">
                              ({suffix})
                            </span>
                          </>
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      </Main>
    </>
  );
}

const UPDATE_TYPE = {
  ROLE: 'role',
  PROJECT: 'project',
} as const;

interface YearUpdate {
  update: string;
  suffix?: string;
  type: (typeof UPDATE_TYPE)[keyof typeof UPDATE_TYPE];
}

interface Updates {
  year: number;
  updates: YearUpdate[];
}

const UPDATES_V2: Updates[] = [
  {
    year: 2026,
    updates: [
      {
        update: 'Launch improved BreakLine candidate invitation flow',
        type: UPDATE_TYPE.PROJECT,
      },
      {
        update: 'Launch BreakLine Partners microsite',
        type: UPDATE_TYPE.PROJECT,
      },
      {
        update:
          'Launch improved BreakLine partner and staff management dashboards',
        type: UPDATE_TYPE.PROJECT,
      },
    ],
  },
  {
    year: 2025,
    updates: [
      {
        update:
          'Launch BreakLine internal browser extension for candidate sourcing and outreach',
        type: UPDATE_TYPE.PROJECT,
      },
      {
        update: 'New role as Senior Frontend Engineer at BreakLine',
        type: UPDATE_TYPE.ROLE,
      },
      {
        update: "Launch internal Figma plugin for Audible's marketing team",
        type: UPDATE_TYPE.PROJECT,
      },
    ],
  },
  {
    year: 2024,
    updates: [
      {
        update: 'New role as Software Engineer at BDG Partners',
        type: UPDATE_TYPE.ROLE,
      },
      {
        update:
          'Launch Figma plugin to browse and place Audible catalog content directly in designs',
        type: UPDATE_TYPE.PROJECT,
      },
      {
        update: 'Presenter at Contentful Amazon Day',
        type: UPDATE_TYPE.PROJECT,
      },
    ],
  },
  {
    year: 2023,
    updates: [
      {
        update: 'Elegant Seagulls Sauce Honorable Mention',
        suffix: 'Awwwards',
        type: UPDATE_TYPE.PROJECT,
      },
      {
        update: 'Launch Elegant Seagulls Sauce website',
        type: UPDATE_TYPE.PROJECT,
      },
      {
        update: 'Launch new Audible Gift Center experience',
        type: UPDATE_TYPE.PROJECT,
      },
      {
        update: 'Launch updated global Audible landing page experiments',
        type: UPDATE_TYPE.PROJECT,
      },
      {
        update:
          'Launch first phase of the global Audible About site initiative',
        type: UPDATE_TYPE.PROJECT,
      },
      { update: 'Launch Audible ACX Blog', type: UPDATE_TYPE.PROJECT },
      { update: 'Launch personal website v4.0', type: UPDATE_TYPE.PROJECT },
    ],
  },
  {
    year: 2022,
    updates: [
      {
        update: 'Elegant Seagulls agency Site of The Day',
        suffix: 'Awwwards',
        type: UPDATE_TYPE.PROJECT,
      },
      {
        update: 'Hello World! Charles Robert Smith is born',
        type: UPDATE_TYPE.PROJECT,
      },
      {
        update: 'Launch Audible landing page experiments',
        type: UPDATE_TYPE.PROJECT,
      },
    ],
  },
  {
    year: 2021,
    updates: [
      {
        update: 'Launch Audible Audiobook quiz recommendation  platform',
        type: UPDATE_TYPE.PROJECT,
      },
    ],
  },
  {
    year: 2020,
    updates: [
      {
        update: 'Promoted to Tech Director at Elegant Seagulls',
        type: UPDATE_TYPE.ROLE,
      },
    ],
  },
  {
    year: 2019,
    updates: [
      {
        update: 'Waves 4 Water Honorable Mention',
        suffix: 'Awwwards',
        type: UPDATE_TYPE.PROJECT,
      },
      {
        update: 'Tane Website of the Day',
        suffix: 'CSS Design Awards',
        type: UPDATE_TYPE.PROJECT,
      },
      {
        update: 'Tane Honorable Mention & Mobile Excellence Award',
        suffix: 'Awwwards',
        type: UPDATE_TYPE.PROJECT,
      },
      {
        update: 'About Audible Honorable Mention',
        suffix: 'Awwwards',
        type: UPDATE_TYPE.PROJECT,
      },
    ],
  },
  {
    year: 2018,
    updates: [
      {
        update: 'Promoted to Lead Frontend Developer at Elegant Seagulls',
        type: UPDATE_TYPE.ROLE,
      },
      {
        update: 'InVision Design Leadership Honorable Mention',
        suffix: 'Awwwards',
        type: UPDATE_TYPE.PROJECT,
      },
    ],
  },
  {
    year: 2017,
    updates: [
      {
        update: 'Elegant Seagulls agency site Honorable Mention',
        suffix: 'Awwwards',
        type: UPDATE_TYPE.PROJECT,
      },
    ],
  },
];
