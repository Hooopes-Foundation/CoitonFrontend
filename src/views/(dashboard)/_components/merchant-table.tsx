import { memo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { truncateAddr } from "@/lib/utils";
import { Link } from "react-router-dom";

const MerchantTable = ({
  unapprovedListings,
}: {
  unapprovedListings: any[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="!border-b-0 hover:bg-transparent">
          <TableHead className="w-[337px] text-base">Property Owner</TableHead>
          <TableHead className="text-base">Type</TableHead>
          <TableHead className="text-base">Region</TableHead>
          <TableHead className="text-base">Status</TableHead>
          <TableHead className="text-right text-base">Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {unapprovedListings.map(
          (
            ppty: { id: number; details: any; hash: string; owner: string },
            _index: number,
          ) => (
            <TableRow
              key={_index}
              className="!border-b border-[#E0E0E0] last-of-type:!border-b-0 hover:bg-transparent"
            >
              <TableCell className="flex items-center gap-4 text-base">
                <div className="size-14 overflow-hidden rounded-full bg-secondary">
                  <img
                    src={`https://bronze-gigantic-quokka-778.mypinata.cloud/ipfs/${ppty?.details?.banner?.path}`}
                    alt={"dddtdtdttd"}
                    className="size-full object-cover"
                  />
                </div>
                <span>{truncateAddr(ppty.owner)}</span>
              </TableCell>
              <TableCell className="text-base capitalize">
                {ppty.details.propertyType}
              </TableCell>
              <TableCell className="text-base">
                {ppty.details.country}
              </TableCell>
              <TableCell className="text-base">
                ${Number(ppty.details.price).toLocaleString()}
              </TableCell>
              <TableCell className="text-right text-base">
                <Link
                  to={`/property/${ppty.id}?from=dao-page`}
                  className="flex items-center justify-end gap-2"
                >
                  <span>View More</span>
                  <span>
                    <svg
                      className="size-5"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1043_1705)">
                        <path
                          d="M3.88867 13.6108L14.8053 4.88465"
                          stroke="#1A1E26"
                          strokeWidth="1.26984"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.0709 4.39461L14.8081 4.88423L14.9707 8.85645"
                          stroke="#1A1E26"
                          strokeWidth="1.26984"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1043_1705">
                          <rect
                            width="7.40741"
                            height="17.5887"
                            fill="white"
                            transform="translate(5.56055 18.0649) rotate(-131.155)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                </Link>
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
      <TableFooter className="border-t-0 !bg-transparent">
        <TableRow className="!bg-transparent hover:!bg-transparent">
          <TableCell className="text-base" colSpan={4}>
            {unapprovedListings.length} list(s)
          </TableCell>
          <TableCell className="text-right text-base">Pagination</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default memo(MerchantTable);
