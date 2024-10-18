import DashboardView from "./(dashboard)/dashboard.view";
import ConnectWalletView from "./(onboarding)/connect-wallet.view";
import WalletToDaoView from "./(onboarding)/dao.view";
import GatewayView from "./(onboarding)/gateway.view";
import LiquidityView from "./(onboarding)/liquidity.view";
import WalletTradingAccountView from "./(onboarding)/trading-account.view";
import VerificationView from "./(onboarding)/verification.view";
import AboutView from "./(public)/about.view";
import BlogView from "./(public)/blog.view";
import HomeView from "./(public)/home.view";
import ListingsView from "./(public)/listings.view";
import TeamsView from "./(public)/team.view";
import TokenView from "./(public)/token.view";
import StarknetView from "./(starknet)/starknet.view";

export const views = {
  home: <HomeView />,
  about: <AboutView />,
  team: <TeamsView />,
  listings: <ListingsView />,
  token: <TokenView />,
  blog: <BlogView />,

  // test
  test: <StarknetView />,

  // onboarding
  gateway: <GatewayView />,
  connect: <ConnectWalletView />,
  verification: <VerificationView />,
  liquidity: <LiquidityView />,
  dao: <WalletToDaoView />,
  trading: <WalletTradingAccountView />,

  // dashboard
  dashboard: <DashboardView />,
};
