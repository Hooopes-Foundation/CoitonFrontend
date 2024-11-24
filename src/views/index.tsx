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
import StarknetView from "./(starknet)/starknet.view";
import MintView from "./(onboarding)/account-types/mint.view";
import ManagementView from "./(dashboard)/management.view";
import NewListingView from "./(dashboard)/new-listing.view";
import GovernanceView from "./(dashboard)/governance.view";
import ProposalsView from "./(dashboard)/proposals.view";
import ProposalDetailsView from "./(dashboard)/proposal-details.view";
import CreateProposalView from "./(dashboard)/create-proposal.view";
import PropertyDetailsView from "./(dashboard)/property-details.view";
import ProfileView from "./(dashboard)/profile.view";

export const views = {
  home: <HomeView />,
  about: <AboutView />,
  listings: <ListingsView />,
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
  management: <ManagementView />,
  newListing: <NewListingView />,
  governance: <GovernanceView />,
  proposals: <ProposalsView />,
  proposalDetails: <ProposalDetailsView />,
  createProposal: <CreateProposalView />,
  propertyDetails: <PropertyDetailsView />,
  profile: <ProfileView />,
};
