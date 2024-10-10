declare interface CONNECTOR_INTERFACE {
  id?: string;
  name?: string;
  icon?: { dark: string; light: string } | string;
}

declare interface INITIAL_WALLET_STATE {
  wltAddr: string | undefined;
  isWltCntd: boolean | undefined;
  cntrr: CONNECTOR_INTERFACE | undefined;
  crntTab: "GETTER_FN" | "SETTER_FN";
}

declare interface INITIAL_WALLET_ACTIONS {
  setWltAddr: (wltAddr: string | undefined) => void;
  setIsWltCntd: (isWltCntd: boolean | undefined) => void;
  setCntrr: (cntrr: CONNECTOR_INTERFACE | undefined) => void;
  setCrntTab: (tab: "GETTER_FN" | "SETTER_FN") => void;
}

declare type ORGANIZATION_INTERFACE = {
  id: number;
  name: string;
  region: string;
  validator: number;
  domain: string | number;
};

declare type LISTING_INTERFACE = {
  id: number;
  details: ByteArray;
  hash: number;
  owner: string;
};

declare interface INITIAL_CONTRACT_STATE {
  allOrgs: ORGANIZATION_INTERFACE[];
}

declare interface INITIAL_CONTRACT_ACTIONS {
  setAllOrgs: (orgs: ORGANIZATION_INTERFACE[]) => void;
}

declare interface INTERFACE_FELT_CONVERSION_RESULT {
  original: string;
  felt: string;
  converted: string;
  matches: boolean;
}
