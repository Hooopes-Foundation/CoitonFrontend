import { assets } from "@/assets";
import ListingBoard from "./_components/listing-board";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { FiCheckCircle } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import { LuMailWarning } from "react-icons/lu";
// import { motion } from "framer-motion";
// import { variants } from "@/static";
import { useFetchListings } from "@/hooks/starknet/useFetchListings";

const updates = [
  {
    status: "pending",
  },
  {
    status: "approved",
  },
  {
    status: "denied",
  },
];

export default function DashboardView() {
  // const { fadeIn } = variants;

  const { listings } = useFetchListings();

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* <div className="h-[240px] w-full rounded-3xl bg-gradient-to-l from-[#0D857C] to-[#0EB9AC] p-[1px]">
        <div className="flex size-full overflow-hidden rounded-[inherit] bg-gradient-to-r from-[#056F67] to-[#0AADA1] text-white">
          <div className="w-1/2 px-12">
            <div className="size-full border-x border-[#0FAB9F]">
              <div className="flex size-full items-center justify-center">
                <div className="flex w-full flex-col gap-1 border-y border-[#0FAB9F] p-4">
                  <p className="font-serif_regular text-xl italic leading-none md:text-[38px]">
                    Empowering Decentralized Real Estate for All.
                  </p>
                  <span className="font-sans_light text-xl text-[#B1EDE9]">
                    Invest, Verify, and Unlock Real Estate Potential
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-full w-1/2">
            <img
              className="absolute bottom-0 right-0 z-[1] w-[550px]"
              src={assets.svgs.dashboardHeader}
              width={671}
              height={447}
            />
            <motion.img
              variants={fadeIn("up", 0.6)}
              initial="show"
              whileInView={"show"}
              viewport={{
                once: true,
                amount: 0.7,
              }}
              animate={{
                rotate: 10,
                translateY: [-5, 0],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3,
                ease: "easeInOut",
              }}
              src={assets.shapes.flatShape}
              alt="NOODLE SHAPE"
              className="absolute -bottom-[200px] -left-28 z-0"
              width={699}
              height={519}
            />
          </div>
        </div>
      </div> */}
      <img
        src={assets.svgs.dashboardBanner}
        alt=""
        className="object-contain"
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <div className="relative flex h-[422px] w-full flex-col justify-between overflow-hidden rounded-3xl border border-[#E8E3F7] bg-[#F9F7FF]">
          <div className="my-4 flex h-[55px] items-center justify-between px-8">
            <h4 className="font-sans_medium text-lg text-[#3001BF]">
              Market Snapshot
            </h4>
          </div>

          <div className="px-8 py-10">
            <h4 className="font-sans_medium text-3xl -tracking-[6%] text-[#3001BF] md:text-4xl">
              Coiton Token
            </h4>
            <p className="font-sans_medium text-base text-[#BAAEE0]">
              Launching Soon
            </p>
          </div>

          <div className="absolute -bottom-4 -right-24 h-[300px] w-[350px] rotate-[17deg]">
            <img
              src={assets.images.tokenBlue}
              width={442}
              height={442}
              className="absolute z-[3]"
            />
            <img
              src={assets.images.tokenGreen}
              width={442}
              height={442}
              className="absolute z-[2] ml-4 mt-4"
            />
            <img
              src={assets.images.tokenPink}
              width={442}
              height={442}
              className="absolute z-[1] ml-8 mt-8"
            />
          </div>
        </div>
        <div className="h-[422px] w-full overflow-hidden rounded-3xl border border-[#F6F1DE] bg-[#FFFDF7]">
          <div className="my-4 flex h-[55px] items-center justify-between px-8">
            <h4 className="font-sans_medium text-lg text-[#AE8600]">
              DAO Updates
            </h4>

            <Button className="w-max border border-[#F6F1DE] !bg-[#FBF5DF] px-5 text-[#AE8600] hover:!bg-[#FBF5DF]/90">
              <span className="font-sans_medium text-sm">View More</span>
              <svg
                width="12"
                height="11"
                viewBox="0 0 12 11"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 fill-none"
              >
                <path
                  d="M11.8538 5.85354L7.35375 10.3535C7.25993 10.4474 7.13268 10.5001 7 10.5001C6.86732 10.5001 6.74007 10.4474 6.64625 10.3535C6.55243 10.2597 6.49972 10.1325 6.49972 9.99979C6.49972 9.86711 6.55243 9.73986 6.64625 9.64604L10.2931 5.99979H0.5C0.367392 5.99979 0.240215 5.94711 0.146447 5.85334C0.0526785 5.75958 0 5.6324 0 5.49979C0 5.36718 0.0526785 5.24 0.146447 5.14624C0.240215 5.05247 0.367392 4.99979 0.5 4.99979H10.2931L6.64625 1.35354C6.55243 1.25972 6.49972 1.13247 6.49972 0.99979C6.49972 0.867108 6.55243 0.73986 6.64625 0.64604C6.74007 0.552219 6.86732 0.499512 7 0.499512C7.13268 0.499512 7.25993 0.552219 7.35375 0.64604L11.8538 5.14604C11.9002 5.19248 11.9371 5.24762 11.9623 5.30832C11.9874 5.36902 12.0004 5.43408 12.0004 5.49979C12.0004 5.5655 11.9874 5.63056 11.9623 5.69126C11.9371 5.75196 11.9002 5.8071 11.8538 5.85354Z"
                  className="fill-[#AE8600]"
                />
              </svg>
            </Button>
          </div>

          <div className="h-[342px] overflow-hidden rounded-b-[inherit]">
            <ScrollArea className="size-full px-8">
              {updates.map(({ status }) => (
                <div
                  key={status}
                  className={cn(
                    "mb-3 flex h-[75px] items-center justify-between rounded-[10px] border px-6 last:mb-8",
                    {
                      "border-[#EAE1C2] bg-[#FFFEE9]/80 text-[#D4A300]":
                        status === "pending",
                      "border-[#C2EADB] bg-[#E9FAF0]/80 text-[#00914B]":
                        status === "approved",
                      "border-[#EAC2C2] bg-[#FAE9E9]/80 text-[#FF3E3E]":
                        status === "denied",
                    },
                  )}
                >
                  <p className="w-[176px] truncate font-sans_medium text-base">
                    2 Bedroom, Air conditoned Bungalow with furnished
                  </p>

                  <p className="flex items-center gap-2 font-sans_regular text-sm capitalize">
                    <span>{status}</span>
                    {status === "pending" ? (
                      <FiClock className="size-4" />
                    ) : status === "approved" ? (
                      <FiCheckCircle className="size-4" />
                    ) : (
                      <LuMailWarning className="size-4" />
                    )}
                  </p>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
        <div className="h-[422px] w-full overflow-hidden rounded-3xl border border-[#DCF7F5] bg-[#F5FFFE]">
          <div className="my-4 flex h-[55px] items-center justify-between px-8">
            <h4 className="font-sans_medium text-lg text-primary">
              Your Properties
            </h4>

            <Button className="w-max border border-[#DCF7F5] !bg-[#E8FDFC] px-5 text-primary hover:!bg-[#E8FDFC]/90">
              <span className="font-sans_medium text-sm">View More</span>
              <svg
                width="12"
                height="11"
                viewBox="0 0 12 11"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 fill-none"
              >
                <path
                  d="M11.8538 5.85354L7.35375 10.3535C7.25993 10.4474 7.13268 10.5001 7 10.5001C6.86732 10.5001 6.74007 10.4474 6.64625 10.3535C6.55243 10.2597 6.49972 10.1325 6.49972 9.99979C6.49972 9.86711 6.55243 9.73986 6.64625 9.64604L10.2931 5.99979H0.5C0.367392 5.99979 0.240215 5.94711 0.146447 5.85334C0.0526785 5.75958 0 5.6324 0 5.49979C0 5.36718 0.0526785 5.24 0.146447 5.14624C0.240215 5.05247 0.367392 4.99979 0.5 4.99979H10.2931L6.64625 1.35354C6.55243 1.25972 6.49972 1.13247 6.49972 0.99979C6.49972 0.867108 6.55243 0.73986 6.64625 0.64604C6.74007 0.552219 6.86732 0.499512 7 0.499512C7.13268 0.499512 7.25993 0.552219 7.35375 0.64604L11.8538 5.14604C11.9002 5.19248 11.9371 5.24762 11.9623 5.30832C11.9874 5.36902 12.0004 5.43408 12.0004 5.49979C12.0004 5.5655 11.9874 5.63056 11.9623 5.69126C11.9371 5.75196 11.9002 5.8071 11.8538 5.85354Z"
                  className="fill-primary"
                />
              </svg>
            </Button>
          </div>

          <div className="h-[342px] overflow-hidden px-8">
            <div className="grid size-full grid-cols-2 rounded-t-2xl border border-b-0 border-[#DBEEED] bg-white">
              <div className="flex flex-col justify-center gap-2 border-r border-[#EFF9F8] p-6">
                <div className="flex w-max items-center gap-2 rounded-2xl border border-[#DBEEED] bg-[#F2FFFE] px-4 py-2 text-primary">
                  <img
                    src={assets.svgs.logoIcon}
                    className="size-[26px]"
                    width={26}
                    height={26}
                    alt=""
                  />
                  <p className="font-sans_bold text-xl">$15.67</p>
                </div>
                <p className="font-sans_light text-lg text-[#666666]">Token</p>
              </div>
              <div className="flex flex-col justify-center gap-2 border-b border-[#EFF9F8] p-6">
                <div className="flex w-max items-center gap-2 rounded-2xl border border-[#DBEEED] bg-[#F2FFFE] px-4 py-2 text-primary">
                  <img
                    src={assets.svgs.bookmarkIcon}
                    className="size-[26px]"
                    width={26}
                    height={26}
                    alt=""
                  />
                  <p className="font-sans_bold text-xl">300</p>
                </div>
                <p className="font-sans_light text-lg text-[#666666]">
                  Saved Properties
                </p>
              </div>
              <div className="flex flex-col justify-center gap-2 border-t border-[#EFF9F8] p-6">
                <div className="flex w-max items-center gap-2 rounded-2xl border border-[#DBEEED] bg-[#F2FFFE] px-4 py-2 text-primary">
                  <img
                    src={assets.svgs.homeIcon}
                    className="size-[26px]"
                    width={26}
                    height={26}
                    alt=""
                  />
                  <p className="font-sans_bold text-xl">3</p>
                </div>
                <p className="font-sans_light text-lg text-[#666666]">
                  Properties Owned
                </p>
              </div>
              <div className="flex flex-col justify-center gap-2 border-l border-[#EFF9F8] p-6">
                <div className="flex w-max items-center gap-2 rounded-2xl border border-[#DBEEED] bg-[#F2FFFE] px-4 py-2 text-primary">
                  <img
                    src={assets.svgs.moneyIcon}
                    className="size-[26px]"
                    width={26}
                    height={26}
                    alt=""
                  />
                  <p className="font-sans_bold text-xl">10</p>
                </div>
                <p className="font-sans_light text-lg text-[#666666]">
                  Properties Rented
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ListingBoard data={listings} />
    </div>
  );
}
