import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWalletStore = create<
  INITIAL_WALLET_STATE & INITIAL_WALLET_ACTIONS
>()(
  persist(
    (set) => ({
      wltAddr: undefined,
      isWltCntd: undefined,
      cntrr: undefined,
      crntTab: "GETTER_FN",

      setWltAddr: (wltAddr: string | undefined) => set({ wltAddr: wltAddr }),
      setIsWltCntd: (isWltCntd: boolean | undefined) =>
        set({ isWltCntd: isWltCntd }),
      setCntrr: (cntrr: CONNECTOR_INTERFACE | undefined) =>
        set({ cntrr: cntrr }),
      setCrntTab: (tab: "GETTER_FN" | "SETTER_FN") => set({ crntTab: tab }),
    }),
    { name: "wallet-store" }
  )
);
