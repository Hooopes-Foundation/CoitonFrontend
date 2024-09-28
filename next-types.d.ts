declare type TNode = React.ReactNode;

declare type TPropsWithChildren = PropsWithChildren<{}>;

declare type TMaxWrapper = TPropsWithChildren & {
  className?: string;
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
