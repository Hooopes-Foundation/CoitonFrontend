declare type TNode = React.ReactNode;

declare type TParentLayoutProps = {
  children: TNode;
};

declare type TWrapperProps = {
  children: TNode;
  className?: string | string[];
};

declare type TInitialeState = {
  address: string | null;
  connected: boolean;
};
