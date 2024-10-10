import { ctxConfig } from "@/lib/blockchain";
import { stringToFelt } from "@/lib/utils";
import { useContractStore } from "@/store/contract.store";
import { useReadContract, useSendTransaction } from "@starknet-react/core";
import { useMemo } from "react";

export const useOrganizations = () => {
  const setAllOrgs = useContractStore((state) => state.setAllOrgs);

  const fetchOrganizations = () => {
    const readTx = useMemo(() => {
      if (!ctxConfig.CONTRACT_ADDR || !ctxConfig.CONTRACT_ABI) return null;
      return {
        address: ctxConfig.CONTRACT_ADDR as any,
        functionName: "get_organizations",
        abi: ctxConfig.CONTRACT_ABI,
        args: [],
        watch: true,
      };
    }, [ctxConfig.CONTRACT_ADDR, ctxConfig.CONTRACT_ABI]);

    const tx = readTx ? useReadContract(readTx) : null;

    const refinedData = {
      ...tx,
      data:
        tx?.data?.length > 0
          ? tx?.data.map((org: ORGANIZATION_INTERFACE) => ({
              id: Number(org.id),
              name: String(org.name),
              region: String(org.region),
              validator: Number(org.validator),
              domain: String(org.domain),
            }))
          : [],
    };

    setAllOrgs(refinedData?.data);

    return refinedData;
  };

  const registerOrganization = ({
    contract,
    wltAddr,
    vId,
    name,
    region,
  }: any) => {
    const calls = useMemo(() => {
      if (!contract || !wltAddr) return undefined;

      const nameFelt = stringToFelt(name);
      const regionFelt = stringToFelt(region);

      return [
        contract.populate("register_organization", [vId, nameFelt, regionFelt]),
      ];
    }, [contract, wltAddr, vId, name, region]);

    const tx = useSendTransaction({
      calls,
    });

    return { tx, calls };
  };

  return { fetchOrganizations, registerOrganization };
};
