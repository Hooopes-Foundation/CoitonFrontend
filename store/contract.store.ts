import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useContractStore = create<
  INITIAL_CONTRACT_STATE & INITIAL_CONTRACT_ACTIONS
>()(
  persist(
    (set) => ({
      allOrgs: [],
      snglOrg: undefined,

      setAllOrgs: (newOrgs: ORGANIZATION_INTERFACE[]) =>
        set((state) => {
          const uniqueOrgsMap = new Map();
          state.allOrgs.forEach((org) => uniqueOrgsMap.set(org.id, org));
          newOrgs.forEach((org) => uniqueOrgsMap.set(org.id, org));

          return { allOrgs: Array.from(uniqueOrgsMap.values()) };
        }),
    }),
    { name: "contract-store" }
  )
);
