import { assets } from "@/assets";
import { cn } from "@/lib/utils";
import { Fragment, memo, useState } from "react";
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
        width="25"
        height="25"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.16405 11.3497L4 11.5587L4.45686 16.1005C4.715 18.6668 4.84407 19.9499 5.701 20.7249C6.55793 21.5 7.84753 21.5 10.4267 21.5H13.5733C16.1525 21.5 17.4421 21.5 18.299 20.7249C19.1559 19.9499 19.285 18.6668 19.5431 16.1005L20 11.5587L20.836 11.3497C21.5201 11.1787 22 10.564 22 9.85882C22 9.35735 21.7553 8.88742 21.3445 8.59985L13.1469 2.86154C12.4583 2.37949 11.5417 2.37949 10.8531 2.86154L2.65549 8.59985C2.24467 8.88742 2 9.35735 2 9.85882C2 10.564 2.47993 11.1787 3.16405 11.3497Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 16C14.2005 16.6224 13.1502 17 12 17C10.8498 17 9.79952 16.6224 9 16"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: "Property Management",
    path: "/management",
    sublinks: [
      {
        icon: (className: string) => (
          <svg
            className={className}
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 8.55C2 7.68127 2.1813 7.5 3.05 7.5H15.95C16.8187 7.5 17 7.68127 17 8.55V9.45C17 10.3187 16.8187 10.5 15.95 10.5H3.05C2.1813 10.5 2 10.3187 2 9.45V8.55Z"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M2 2.55C2 1.6813 2.1813 1.5 3.05 1.5H15.95C16.8187 1.5 17 1.6813 17 2.55V3.45C17 4.3187 16.8187 4.5 15.95 4.5H3.05C2.1813 4.5 2 4.3187 2 3.45V2.55Z"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M2 14.55C2 13.6813 2.1813 13.5 3.05 13.5H15.95C16.8187 13.5 17 13.6813 17 14.55V15.45C17 16.3187 16.8187 16.5 15.95 16.5H3.05C2.1813 16.5 2 16.3187 2 15.45V14.55Z"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        ),
        label: "Buy/Rent",
        path: "/management",
      },
      {
        icon: (className: string) => (
          <svg
            className={className}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 9C1.5 5.81802 1.5 4.22703 2.37868 3.23851C3.25736 2.25 4.67157 2.25 7.5 2.25H10.5C13.3284 2.25 14.7427 2.25 15.6213 3.23851C16.5 4.22703 16.5 5.81802 16.5 9C16.5 12.1819 16.5 13.773 15.6213 14.7615C14.7427 15.75 13.3284 15.75 10.5 15.75H7.5C4.67157 15.75 3.25736 15.75 2.37868 14.7615C1.5 13.773 1.5 12.1819 1.5 9Z"
              strokeWidth="1.2"
            />
            <path
              d="M1.5 6.75H7.5C9.6213 6.75 10.6819 6.75 11.341 7.40901C12 8.06805 12 9.1287 12 11.25V15.75"
              strokeWidth="1.2"
            />
            <path d="M7.5 15.75V6.75" strokeWidth="1.2" />
          </svg>
        ),
        label: "List a Property",
        path: "/new-listing",
      },
    ],
  },
  {
    icon: (className: string) => (
      <svg
        width="26"
        height="26"
        className={className}
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.58464 2.16699C4.5931 2.16699 2.16797 4.59212 2.16797 7.58366C2.16797 9.58859 3.25726 11.3391 4.8763 12.2757V19.3304C4.8763 20.216 4.8763 20.6588 5.04123 21.057C5.20616 21.4552 5.51927 21.7683 6.1455 22.3946L7.58464 23.8337L9.86851 21.5498C9.97384 21.4445 10.0265 21.3917 10.0702 21.3346C10.185 21.1846 10.2585 21.0071 10.2835 20.8198C10.293 20.7485 10.293 20.674 10.293 20.5251C10.293 20.4045 10.293 20.3442 10.2866 20.2856C10.2698 20.132 10.2204 19.9838 10.1417 19.8509C10.1117 19.8002 10.0755 19.752 10.0031 19.6556L8.66797 17.8753L9.4263 16.8643C9.85583 16.2915 10.0706 16.0052 10.1818 15.6716C10.293 15.3381 10.293 14.9801 10.293 14.2643V12.2757C11.912 11.3391 13.0013 9.58859 13.0013 7.58366C13.0013 4.59212 10.5762 2.16699 7.58464 2.16699Z"
          strokeWidth="1.625"
          strokeLinejoin="round"
        />
        <path
          d="M7.58203 7.58301H7.59251"
          strokeWidth="2.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.082 15.167H20.582C21.5916 15.167 22.0963 15.167 22.4945 15.3319C23.0254 15.5518 23.4472 15.9736 23.6671 16.5045C23.832 16.9027 23.832 17.4074 23.832 18.417C23.832 19.4266 23.832 19.9313 23.6671 20.3295C23.4472 20.8603 23.0254 21.2822 22.4945 21.5021C22.0963 21.667 21.5916 21.667 20.582 21.667H14.082"
          strokeWidth="1.625"
          strokeLinecap="round"
        />
        <path
          d="M16.25 5.41699H20.5833C21.5929 5.41699 22.0976 5.41699 22.4959 5.58192C23.0267 5.80182 23.4485 6.22362 23.6684 6.75451C23.8333 7.15269 23.8333 7.65746 23.8333 8.66699C23.8333 9.67653 23.8333 10.1813 23.6684 10.5795C23.4485 11.1103 23.0267 11.5322 22.4959 11.7521C22.0976 11.917 21.5929 11.917 20.5833 11.917H16.25"
          strokeWidth="1.625"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: "DAO Governance",
    path: "/governance",
    sublinks: [
      {
        icon: (className: string) => (
          <svg
            className={className}
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 8.55C2 7.68127 2.1813 7.5 3.05 7.5H15.95C16.8187 7.5 17 7.68127 17 8.55V9.45C17 10.3187 16.8187 10.5 15.95 10.5H3.05C2.1813 10.5 2 10.3187 2 9.45V8.55Z"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M2 2.55C2 1.6813 2.1813 1.5 3.05 1.5H15.95C16.8187 1.5 17 1.6813 17 2.55V3.45C17 4.3187 16.8187 4.5 15.95 4.5H3.05C2.1813 4.5 2 4.3187 2 3.45V2.55Z"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M2 14.55C2 13.6813 2.1813 13.5 3.05 13.5H15.95C16.8187 13.5 17 13.6813 17 14.55V15.45C17 16.3187 16.8187 16.5 15.95 16.5H3.05C2.1813 16.5 2 16.3187 2 15.45V14.55Z"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        ),
        label: "DOA Listings",
        path: "/governance",
      },
      {
        icon: (className: string) => (
          <svg
            className={className}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 9C1.5 5.81802 1.5 4.22703 2.37868 3.23851C3.25736 2.25 4.67157 2.25 7.5 2.25H10.5C13.3284 2.25 14.7427 2.25 15.6213 3.23851C16.5 4.22703 16.5 5.81802 16.5 9C16.5 12.1819 16.5 13.773 15.6213 14.7615C14.7427 15.75 13.3284 15.75 10.5 15.75H7.5C4.67157 15.75 3.25736 15.75 2.37868 14.7615C1.5 13.773 1.5 12.1819 1.5 9Z"
              strokeWidth="1.2"
            />
            <path
              d="M1.5 6.75H7.5C9.6213 6.75 10.6819 6.75 11.341 7.40901C12 8.06805 12 9.1287 12 11.25V15.75"
              strokeWidth="1.2"
            />
            <path d="M7.5 15.75V6.75" strokeWidth="1.2" />
          </svg>
        ),
        label: "Proposals",
        path: "/proposals",
      },
      {
        icon: (className: string) => (
          <svg
            width="19"
            height="19"
            className={className}
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.50065 17.4168C13.8729 17.4168 17.4173 13.8724 17.4173 9.50016C17.4173 5.12791 13.8729 1.5835 9.50065 1.5835C5.1284 1.5835 1.58398 5.12791 1.58398 9.50016C1.58398 13.8724 5.1284 17.4168 9.50065 17.4168Z"
              strokeWidth="1.2"
            />
            <path
              d="M5.9375 13.4582C7.78343 11.5248 11.1967 11.4337 13.0625 13.4582M11.4753 7.52067C11.4753 8.61372 10.5879 9.49984 9.49327 9.49984C8.39871 9.49984 7.51131 8.61372 7.51131 7.52067C7.51131 6.42761 8.39871 5.5415 9.49327 5.5415C10.5879 5.5415 11.4753 6.42761 11.4753 7.52067Z"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        ),
        label: "Profile",
        path: "/profile",
      },
    ],
  },
  {
    icon: (className: string) => (
      <svg
        width="26"
        height="26"
        className={className}
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.1673 17.3333V8.66667C15.1673 7.64529 15.1673 7.13461 14.85 6.8173C14.5327 6.5 14.022 6.5 13.0007 6.5C11.9793 6.5 11.4686 6.5 11.1513 6.8173C10.834 7.13461 10.834 7.64529 10.834 8.66667V17.3333C10.834 18.3547 10.834 18.8654 11.1513 19.1827C11.4686 19.5 11.9793 19.5 13.0007 19.5C14.022 19.5 14.5327 19.5 14.85 19.1827C15.1673 18.8654 15.1673 18.3547 15.1673 17.3333Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.7493 9.75033V7.58366C22.7493 6.56228 22.7493 6.0516 22.432 5.73429C22.1147 5.41699 21.604 5.41699 20.5827 5.41699C19.5613 5.41699 19.0506 5.41699 18.7333 5.73429C18.416 6.0516 18.416 6.56228 18.416 7.58366V9.75033C18.416 10.7717 18.416 11.2824 18.7333 11.5997C19.0506 11.917 19.5613 11.917 20.5827 11.917C21.604 11.917 22.1147 11.917 22.432 11.5997C22.7493 11.2824 22.7493 10.7717 22.7493 9.75033Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.58333 15.1663V12.9997C7.58333 11.9783 7.58333 11.4676 7.26604 11.1503C6.94873 10.833 6.43804 10.833 5.41667 10.833C4.39529 10.833 3.88461 10.833 3.5673 11.1503C3.25 11.4676 3.25 11.9783 3.25 12.9997V15.1663C3.25 16.1877 3.25 16.6984 3.5673 17.0157C3.88461 17.333 4.39529 17.333 5.41667 17.333C6.43804 17.333 6.94873 17.333 7.26604 17.0157C7.58333 16.6984 7.58333 16.1877 7.58333 15.1663Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 22.75V19.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.584 14.0837V11.917"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 6.5V3.25"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.584 5.41667V3.25"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.41602 19.4997V17.333"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.41602 10.8337V8.66699"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Trading",
    path: "/trading",
  },
  // {
  //   icon: (className: string) => (
  //     <svg
  //       className={className}
  //       width="24"
  //       height="24"
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       xmlns="http://www.w3.org/2000/svg"
  //     >
  //       <path
  //         d="M10 14H3V21H10V14Z"
  //         strokeWidth="2"
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //       />
  //       <path
  //         d="M10 3H3V10H10V3Z"
  //         strokeWidth="2"
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //       />
  //       <path
  //         d="M14 4H21"
  //         strokeWidth="2"
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //       />
  //       <path
  //         d="M14 9H21"
  //         strokeWidth="2"
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //       />
  //       <path
  //         d="M14 15H21"
  //         strokeWidth="2"
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //       />
  //       <path
  //         d="M14 20H21"
  //         strokeWidth="2"
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //       />
  //     </svg>
  //   ),
  //   label: "Transaction history",
  //   path: "/transaction-history",
  // },
];

const Sidebar = () => {
  const [activeParent, setActiveParent] = useState<string | null>(null);

  return (
    <div className="sticky left-0 top-0 flex h-screen w-full max-w-[330px] flex-col justify-between border-r border-[#EAECF0] bg-background pt-10">
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
          {sidebarLinks.map(({ label, icon, path, sublinks }: any) => (
            <Fragment key={path}>
              <NavLink
                to={path}
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
                onClick={() => setActiveParent(label)} // Update active parent on click
              >
                {({ isActive }) => (
                  <Fragment>
                    {icon(
                      isActive
                        ? "stroke-[#056F67]"
                        : "stroke-muted-foreground group-hover:stroke-foreground transition-[stroke]",
                    )}
                    <p
                      className={cn(
                        "font-sans_normal text-lg text-foreground",
                        {
                          "font-sans_medium text-primary": isActive,
                          "text-muted-foreground transition-colors group-hover:text-foreground":
                            !isActive,
                        },
                      )}
                    >
                      {label}
                    </p>
                  </Fragment>
                )}
              </NavLink>

              {sublinks && activeParent === label && (
                <div className="flex flex-col gap-2 pl-16">
                  {sublinks.map(({ label, icon, path }: any) => (
                    <NavLink
                      key={path}
                      to={path}
                      className={({ isActive }) =>
                        cn(
                          "group flex h-10 items-center gap-3 rounded-l-full px-6 font-sans_medium text-base transition-colors",
                          {
                            "text-primary": isActive,
                            "text-muted-foreground hover:text-foreground":
                              !isActive,
                          },
                        )
                      }
                    >
                      {({ isActive }) => (
                        <Fragment>
                          {icon(
                            isActive
                              ? "stroke-[#056F67]"
                              : "stroke-muted-foreground group-hover:stroke-foreground transition-[stroke]",
                          )}
                          <p
                            className={cn(
                              "font-sans_normal text-lg text-foreground",
                              {
                                "font-sans_medium text-primary": isActive,
                                "text-muted-foreground transition-colors group-hover:text-foreground":
                                  !isActive,
                              },
                            )}
                          >
                            {label}
                          </p>
                        </Fragment>
                      )}
                    </NavLink>
                  ))}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      {/* <div className="flex flex-col">
        <div className="flex items-center justify-between border-t border-[#EAECF0] px-8 py-4">
          <p>Value</p>

          <p className="flex items-center gap-2">
            <span>Coiton</span>
            <ChevronDown className="size-4" />
          </p>
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
      </div> */}
    </div>
  );
};

export default memo(Sidebar);
