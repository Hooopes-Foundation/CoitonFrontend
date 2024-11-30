import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Carousel } from "@/components/ui/cards-carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FiFacebook, FiLinkedin } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

export default function ProfileView() {
  const cards = [1, 2, 3].map((_, index) => <Card key={index} />);

  const isActive = true;

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Link
          to="/dashboard"
          className="font-sans_medium text-lg tracking-wide opacity-40"
        >
          Home
        </Link>
        <ChevronLeft className="size-4" />
        <p className="font-sans_medium text-lg tracking-wide">Profile</p>
      </div>

      <div className="flex gap-6">
        <div className="w-[636px] rounded-xl border border-[#DFDFDF] bg-[#F9FAFB] bg-background">
          <div className="flex flex-col gap-6 border-b border-[#DFDFDF] p-6 md:p-8 lg:p-10">
            <div className="size-[249px] rounded-full bg-secondary"></div>

            <p className="font-sans_medium text-4xl">Onanike Samuel Chisom</p>

            <div className="flex items-center gap-2">
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.75 23.8336C10.1398 23.8336 11.5817 23.1756 13.0535 21.8596M13.0535 21.8596C14.3085 20.7373 15.5852 19.1366 16.25 17.0576C17.6944 12.5402 9.02777 17.0576 11.9167 20.8221C12.2721 21.2852 12.655 21.6237 13.0535 21.8596ZM13.0535 21.8596C14.7898 22.8867 16.8254 21.9638 18.2044 20.9025C18.626 20.5782 18.8367 20.416 18.9624 20.4665C19.0883 20.517 19.1618 20.8072 19.3089 21.3877C19.7796 23.2453 21.17 24.7447 22.75 22.3283"
                  stroke="#141B34"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.6667 14.0837V8.54861C21.6667 6.69139 21.6667 5.76278 21.3763 5.02113C20.9097 3.82881 19.9227 2.88833 18.6715 2.44362C17.8932 2.16699 16.9187 2.16699 14.9697 2.16699C11.559 2.16699 9.8536 2.16699 8.49156 2.65109C6.3019 3.42932 4.57471 5.07518 3.75802 7.16172C3.25 8.45963 3.25 10.0847 3.25 13.3349V16.1267C3.25 19.4934 3.25 21.1767 4.16834 22.3457C4.43146 22.6806 4.74351 22.9779 5.09499 23.2287C5.49267 23.5123 5.94708 23.7041 6.5 23.8337"
                  stroke="#141B34"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.25 13.0003C3.25 11.0059 4.86675 9.38922 6.86111 9.38922C7.58238 9.38922 8.43271 9.5156 9.13398 9.3277C9.75706 9.16073 10.2437 8.67406 10.4107 8.05097C10.5986 7.3497 10.4722 6.49937 10.4722 5.7781C10.4722 3.78374 12.089 2.16699 14.0833 2.16699"
                  stroke="#141B34"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-lg">Coitoneer</p>
              <div className="rounded-full border border-[#6F6F6F] px-2 py-1 text-xs text-[#6F6F6F]">
                Core
              </div>
            </div>

            <div
              className={cn(
                "flex w-max items-center gap-2 rounded-full border px-4 py-2",
                {
                  "border-[#00605A] bg-[#C8FFFB] text-[#004843]": isActive,
                  "border-[#D12E2E] bg-[#FFD3D3] text-[#D12E2E]": !isActive,
                },
              )}
            >
              <span
                className={cn("size-2 rounded-full", {
                  "bg-[#004843]": isActive,
                  "bg-[#D12E2E]": !isActive,
                })}
              />
              <span className="font-sans_medium text-sm">
                {isActive ? "Active" : "Closed"}
              </span>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[529px] flex-col gap-6 p-6 md:p-8 lg:p-10">
            <div className="flex items-center justify-between">
              <p className="w-full max-w-[125px] text-lg text-muted-foreground">
                City
              </p>
              <p className="text-lg">Lagos</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-full max-w-[125px] text-lg text-muted-foreground">
                Country
              </p>
              <p className="text-lg">Nigeria</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-full max-w-[125px] text-lg text-muted-foreground">
                Phone
              </p>
              <p className="text-lg">07033168551</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-full max-w-[125px] text-lg text-muted-foreground">
                Email
              </p>
              <p className="text-lg">davidodinegun@gmail.com</p>
            </div>

            <div className="mx-auto mt-6 flex items-center gap-2">
              <Button size={"icon"} className="rounded-[8px]">
                <FiFacebook className="size-6" />
              </Button>
              <Button size={"icon"} className="rounded-[8px]">
                <FaXTwitter className="size-6" />
              </Button>
              <Button size={"icon"} className="rounded-[8px]">
                <FiLinkedin className="size-6" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <div className="h-[477px] w-full rounded-xl border border-b border-[#DFDFDF] bg-[#F9FAFB] bg-background p-6 md:p-8 lg:p-10">
            <TradingChart />
          </div>
        </div>
      </div>

      {/* //? APPROVED LISTINGS */}
      <div className="flex w-full flex-1 flex-col gap-6 rounded-xl border border-[#DFDFDF] bg-[#F9FAFB] bg-background p-6 md:p-8">
        <div className="flex items-center justify-between">
          <p className="font-sans_bold text-4xl">Approved Listings</p>
          <span role="button" className="text-[#15948A]">
            View More
          </span>
        </div>

        <div className="flex w-full">
          <Carousel items={cards} />
        </div>
      </div>

      {/* //? NOT APPROVED */}
      <div className="flex w-full flex-1 flex-col gap-6 rounded-xl border border-[#DFDFDF] bg-[#F9FAFB] bg-background p-6 md:p-8">
        <div className="flex items-center justify-between">
          <p className="font-sans_bold text-4xl">Pending Listings</p>
          <span role="button" className="text-[#15948A]">
            View More
          </span>
        </div>

        <div className="flex w-full">
          <Carousel items={cards} />
        </div>
      </div>

      {/* //? PENDING APPROVALS */}
      <div className="flex w-full flex-1 flex-col gap-6 rounded-xl border border-[#DFDFDF] bg-[#F9FAFB] bg-background p-6 md:p-8">
        <div className="flex items-center justify-between">
          <p className="font-sans_bold text-4xl">Approvals</p>
          <span role="button" className="text-[#15948A]">
            View More
          </span>
        </div>

        <div className="flex w-full">
          <Carousel items={cards} />
        </div>
      </div>
    </div>
  );
}

export const Card = () => {
  return (
    <div className="mr-6 flex h-96 gap-6 peer-last-of-type:mr-0">
      <div className="min-w-[300px] overflow-hidden rounded-[8px] bg-secondary">
        <img
          src="https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80"
          alt=""
          width={300}
          height={384}
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-between gap-6 whitespace-nowrap">
        <div className="flex items-center justify-between gap-4">
          <div className="rounded-[8px] bg-[#DEEDEC] px-3 py-1 font-sans_medium text-sm tracking-wide text-primary">
            High Confidence
          </div>
          <div className="rounded-[8px] bg-[#FFF2DA] px-3 py-1 font-sans_medium text-sm tracking-wide text-[#C28000]">
            High Confidence
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="line-clamp-2 whitespace-pre-wrap font-sans_medium text-lg">
            423E Magic Lane, Lekki Phase 3, WA 12343 423E Magic Lane, Lekki
            Phase 3, WA 12343
          </p>
          <p className="line-clamp-2 whitespace-pre-wrap font-sans_medium text-lg text-primary">
            $450,000
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 17.5H2"
                stroke="#949494"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21"
                stroke="#949494"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12"
                stroke="#949494"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12"
                stroke="#949494"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            <span className="font-sans_regular text-lg leading-none text-[#8B8B8B]">
              4 Bedroom
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 20L5 21M18 20L19 21"
                stroke="#949494"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12"
                stroke="#949494"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12H22"
                stroke="#949494"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5"
                stroke="#949494"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M8 6L10.5 4"
                stroke="#949494"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            <span className="font-sans_regular text-lg leading-none text-[#8B8B8B]">
              3 Baths
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 21V9.61065C22 8.28771 22 7.62624 21.6561 7.11395C21.3123 6.60167 20.7034 6.35601 19.4856 5.86468L13.4856 3.44396C12.752 3.14799 12.3852 3 12 3C11.6148 3 11.248 3.14799 10.5144 3.44396L4.51444 5.86468C3.29663 6.35601 2.68773 6.60167 2.34387 7.11395C2 7.62624 2 8.28771 2 9.61065V21"
                stroke="#949494"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 19V21M8 19V21"
                stroke="#949494"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 14L7.74254 13.0299C8.10632 11.5747 8.28821 10.8472 8.83073 10.4236C9.37325 10 10.1232 10 11.6231 10H12.3769C13.8768 10 14.6267 10 15.1693 10.4236C15.7118 10.8472 15.8937 11.5747 16.2575 13.0299L16.5 14"
                stroke="#949494"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 14H7C6.44772 14 6 14.4477 6 15V18C6 18.5523 6.44772 19 7 19H17C17.5523 19 18 18.5523 18 18V15C18 14.4477 17.5523 14 17 14Z"
                stroke="#949494"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 16.4902V16.5002"
                stroke="#949494"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.5 16.4902V16.5002"
                stroke="#949494"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="font-sans_regular text-lg leading-none text-[#8B8B8B]">
              2 Car park
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12C7.46544 12 3.62948 14.9642 2.35747 19.044C1.99646 20.2019 1.81595 20.7809 2.26968 21.3904C2.7234 22 3.46112 22 4.93655 22H19.0634C20.5389 22 21.2766 22 21.7303 21.3904C22.184 20.7809 22.0035 20.2019 21.6425 19.044C20.3705 14.9642 16.5346 12 12 12Z"
                stroke="#949494"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M15 17H15.009"
                stroke="#949494"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22C12 20.3431 10.6569 19 9 19C7.34315 19 6 20.3431 6 22"
                stroke="#949494"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M12 12V7.5M12 7.5V5C12 3.58579 12 2.87868 12.4393 2.43934C12.8787 2 13.5858 2 15 2H17.25C18.4228 2 19.0092 2 19.4131 2.30997C19.5171 2.38977 19.6102 2.48286 19.69 2.58686C20 2.99082 20 3.57721 20 4.75C20 5.92279 20 6.50918 19.69 6.91314C19.6102 7.01714 19.5171 7.11023 19.4131 7.19003C19.0092 7.5 18.4228 7.5 17.25 7.5H12Z"
                stroke="#949494"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            <span className="font-sans_regular text-lg leading-none text-[#8B8B8B]">
              32 km/sq
            </span>
          </div>
        </div>

        <Button size={"lg"}>View Details</Button>
      </div>
    </div>
  );
};

export const TradingChart = () => {
  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
    { month: "July", desktop: 52 },
    { month: "August", desktop: 390 },
    { month: "September", desktop: 914 },
    { month: "October", desktop: 150 },
    { month: "November", desktop: 800 },
    { month: "December", desktop: 359 },
  ];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#056F67",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="desktop"
          type="natural"
          fill="url(#fillDesktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
};
