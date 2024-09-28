declare type TNode = React.ReactNode;

declare type TParentLayout = PropsWithChildren<{}>;

declare type TMaxWrapper = TParentLayout & {
  children?: string;
};

declare type TSiteConfig = {
  title: string;
  description: string;
  icon: string;
};

declare type TRoutes = {
  label: string;
  path: any;
};

declare type TCoitonFlow = {
  title: string;
  description: string;
  gradient: string;
  color: string;
  border: string;
  stack: TNode;
};
