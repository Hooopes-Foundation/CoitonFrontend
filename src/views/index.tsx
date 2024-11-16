import DashboardView from "./(dashboard)/dashboard.view";
import GetVerifiedView from "./(onboarding)/account-types/get-verified.view";
import PropertyManagementView from "./(onboarding)/account-types/property.management.view";
import AccountTypeView from "./(onboarding)/account.view";
import Approval from "./(onboarding)/account-types/approval";
import StepFive from "./(onboarding)/step-five.view";
import StepFour from "./(onboarding)/step-four.view";
import StepOne from "./(onboarding)/step-one.view";
import StepSix from "./(onboarding)/step-six.view";
import StepThree from "./(onboarding)/step-three.view";
import StepTwo from "./(onboarding)/step-two.view";
import AboutView from "./(public)/about.view";
import BlogView from "./(public)/blog.view";
import HomeView from "./(public)/home.view";
import ListingsView from "./(public)/listings.view";
import TokenView from "./(public)/token.view";
import StarknetView from "./(starknet)/starknet.view";
import MintView from "./(onboarding)/account-types/mint.view";
import ListingPropertyView from "./(listing)/listing-property.view";
import PropertiesWiew from "./(dashboard)/properties.view";
import DaoGovernanceView from "./(dashboard)/daoGovernance.view";
import ProposalsView from "./(dashboard)/proposals.view";
import ProposalDetailsView from "./(dashboard)/proposalDetails.view";

export const views = {
  home: <HomeView />,
  about: <AboutView />,
  listings: <ListingsView />,
  token: <TokenView />,
  blog: <BlogView />,

  // test
  test: <StarknetView />,

  // onboarding
  stepOne: <StepOne />,
  stepTwo: <StepTwo />,
  stepThree: <StepThree />,
  stepFour: <StepFour />,
  stepFive: <StepFive />,
  stepSix: <StepSix />,
  account: <AccountTypeView />,

  // onboarding-type
  propertyManagement: <PropertyManagementView />,
  getVerified: <GetVerifiedView />,
  approval: <Approval />,
  mint: <MintView />,

  // dashboard
  dashboard: <DashboardView />,
  proposals: <ProposalsView />,
  proposalDetails: <ProposalDetailsView />,
  daoGovernance: <DaoGovernanceView />,
  properties: <PropertiesWiew />,
  listingProperty: <ListingPropertyView />,
};
