import { assets } from "@/assets";
import { cn } from "@/lib/utils";
import React, { memo } from "react";
import { NavLink } from "react-router-dom";

const sidebarLinks = [
  {
    icon: (className: string) => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M5 17H4C3.46957 17 2.96086 16.7893 2.58579 16.4142C2.21071 16.0391 2 15.5304 2 15V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H20C20.5304 3 21.0391 3.21071 21.4142 3.58579C21.7893 3.96086 22 4.46957 22 5V15C22 15.5304 21.7893 16.0391 21.4142 16.4142C21.0391 16.7893 20.5304 17 20 17H19"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 15L17 21H7L12 15Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Home",
    path: "/dashboard",
  },
  {
    icon: (className: string) => (
      <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 14H3V21H10V14Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 3H3V10H10V3Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 4H21"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 9H21"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 15H21"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 20H21"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "My Properties",
    path: "/properties",
  },
  {
    icon: (className: string) => (
      <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 14H3V21H10V14Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 3H3V10H10V3Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 4H21"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 9H21"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 15H21"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 20H21"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Buy/Rent",
    path: "/acquire",
  },
  {
    icon: (className: string) => (
      <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 14H3V21H10V14Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 3H3V10H10V3Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 4H21"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 9H21"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 15H21"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 20H21"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Transaction history",
    path: "/history",
  },
  {
    icon: (className: string) => (
      <svg
        className={className}
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.7768 6.43476C15.5454 6.67082 15.4158 6.98819 15.4158 7.31874C15.4158 7.64929 15.5454 7.96666 15.7768 8.20272L17.7973 10.2232C18.0333 10.4546 18.3507 10.5842 18.6813 10.5842C19.0118 10.5842 19.3292 10.4546 19.5652 10.2232L24.3261 5.46238C24.9611 6.86562 25.1534 8.42906 24.8773 9.94434C24.6012 11.4596 23.8699 12.8548 22.7808 13.9439C21.6916 15.033 20.2965 15.7643 18.7812 16.0404C17.2659 16.3165 15.7025 16.1242 14.2992 15.4892L5.57311 24.2154C5.07072 24.7178 4.38934 25 3.67886 25C2.96838 25 2.287 24.7178 1.78462 24.2154C1.28224 23.713 1 23.0316 1 22.3211C1 21.6107 1.28224 20.9293 1.78462 20.4269L10.5108 11.7008C9.87577 10.2975 9.6835 8.73407 9.95959 7.21879C10.2357 5.70351 10.967 4.30835 12.0561 3.21925C13.1452 2.13014 14.5404 1.39881 16.0557 1.12273C17.5709 0.846639 19.1344 1.0389 20.5376 1.6739L15.7894 6.42213L15.7768 6.43476Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Governance",
    path: "/governance",
  },
  {
    icon: (className: string) => (
      <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.97 12.92C2.67476 13.0974 2.43033 13.348 2.26039 13.6476C2.09045 13.9472 2.00075 14.2856 2 14.63V17.87C2.00075 18.2144 2.09045 18.5528 2.26039 18.8524C2.43033 19.152 2.67476 19.4026 2.97 19.58L5.97 21.38C6.28106 21.5669 6.63711 21.6656 7 21.6656C7.36289 21.6656 7.71894 21.5669 8.03 21.38L12 19V13.5L7 10.5L2.97 12.92Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.00172 16.4984L2.26172 13.6484"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 16.5L12 13.5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 16.5V21.67"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 13.5V19L15.97 21.38C16.2811 21.5669 16.6371 21.6656 17 21.6656C17.3629 21.6656 17.7189 21.5669 18.03 21.38L21.03 19.58C21.3252 19.4026 21.5697 19.152 21.7396 18.8524C21.9096 18.5528 21.9992 18.2144 22 17.87V14.63C21.9992 14.2856 21.9096 13.9472 21.7396 13.6476C21.5697 13.348 21.3252 13.0974 21.03 12.92L17 10.5L12 13.5Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 16.5L12 13.5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 16.4984L21.74 13.6484"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 16.5V21.67"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.97 4.42156C7.67476 4.59894 7.43033 4.84956 7.26039 5.14915C7.09045 5.44873 7.00075 5.78713 7 6.13156V10.5016L12 13.5016L17 10.5016V6.13156C16.9992 5.78713 16.9096 5.44873 16.7396 5.14915C16.5697 4.84956 16.3252 4.59894 16.03 4.42156L13.03 2.62156C12.7189 2.43467 12.3629 2.33594 12 2.33594C11.6371 2.33594 11.2811 2.43467 10.97 2.62156L7.97 4.42156Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.0017 7.99844L7.26172 5.14844"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 7.99844L16.74 5.14844"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 13.5V8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Trading",
    path: "/trading",
  },
];

const Sidebar = () => {
  return (
    <div className="sticky left-0 top-0 flex h-screen w-full max-w-[312px] flex-col justify-between border-r border-[#EAECF0] bg-background pt-10">
      <div className="flex flex-col gap-6">
        <div className="flex h-14 items-center pl-[32px]">
          <img
            src={assets.svgs.logoIcon}
            width={27}
            height={27}
            className="mr-2 size-7"
          />
          <p className="text-lg font-medium">Coiton</p>
        </div>

        <div className="flex flex-col gap-2 pl-[32px]">
          {sidebarLinks.map(({ label, icon, path }: any) => (
            <NavLink
              to={path}
              key={path}
              className={({ isActive }) =>
                cn(
                  "group flex h-14 items-center gap-4 rounded-l-full px-8 transition-colors",
                  {
                    "border-r-4 border-primary bg-[#E7FEFC]": isActive,
                    "border-r-4 border-transparent hover:border-border/50 hover:bg-secondary/80":
                      !isActive,
                  },
                )
              }
              children={({ isActive }) => (
                <React.Fragment>
                  {icon(
                    isActive
                      ? "stroke-[#056F67]"
                      : "stroke-muted-foreground group-hover:stroke-foreground transition-[stroke]",
                  )}
                  <p
                    className={cn("font-sans_normal text-lg text-foreground", {
                      "font-sans_medium text-primary": isActive,
                      "text-muted-foreground transition-colors group-hover:text-foreground":
                        !isActive,
                    })}
                  >
                    {label}
                  </p>
                </React.Fragment>
              )}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between border-t border-[#EAECF0] px-8 py-4">
          <p>Value</p>
        </div>
        <div className="flex flex-col gap-2 bg-[#F9FAFB] px-8 py-4">
          <p className="text-sm text-[#667085]">Balance</p>

          <div className="flex h-10 items-center justify-between">
            <h4 className="flex items-center gap-2 font-sans_bold text-xl text-primary">
              <img src={assets.svgs.starknetIcon} width={24} height={24} />
              20,088,000
            </h4>
            <div className="flex size-10 items-center justify-center rounded-full border border-[#EAECF0] bg-background">
              <svg
                width="13"
                height="11"
                viewBox="0 0 13 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 2H1.5C1.36739 2 1.24021 1.94732 1.14645 1.85355C1.05268 1.75979 1 1.63261 1 1.5C1 1.36739 1.05268 1.24021 1.14645 1.14645C1.24021 1.05268 1.36739 1 1.5 1H10C10.1326 1 10.2598 0.947321 10.3536 0.853553C10.4473 0.759785 10.5 0.632608 10.5 0.5C10.5 0.367392 10.4473 0.240215 10.3536 0.146447C10.2598 0.0526785 10.1326 0 10 0H1.5C1.10218 0 0.720644 0.158035 0.43934 0.43934C0.158035 0.720644 0 1.10218 0 1.5V9.5C0 9.89782 0.158035 10.2794 0.43934 10.5607C0.720644 10.842 1.10218 11 1.5 11H11.5C11.7652 11 12.0196 10.8946 12.2071 10.7071C12.3946 10.5196 12.5 10.2652 12.5 10V3C12.5 2.73478 12.3946 2.48043 12.2071 2.29289C12.0196 2.10536 11.7652 2 11.5 2ZM11.5 10H1.5C1.36739 10 1.24021 9.94732 1.14645 9.85355C1.05268 9.75979 1 9.63261 1 9.5V2.91437C1.16055 2.97129 1.32966 3.00025 1.5 3H11.5V10ZM8.5 6.25C8.5 6.10166 8.54399 5.95666 8.6264 5.83332C8.70881 5.70999 8.82594 5.61386 8.96299 5.55709C9.10003 5.50032 9.25083 5.48547 9.39632 5.51441C9.5418 5.54335 9.67544 5.61478 9.78033 5.71967C9.88522 5.82456 9.95665 5.9582 9.98559 6.10368C10.0145 6.24917 9.99967 6.39997 9.94291 6.53701C9.88614 6.67406 9.79001 6.79119 9.66668 6.8736C9.54334 6.95601 9.39834 7 9.25 7C9.05109 7 8.86032 6.92098 8.71967 6.78033C8.57902 6.63968 8.5 6.44891 8.5 6.25Z"
                  fill="#1D2939"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Sidebar);
