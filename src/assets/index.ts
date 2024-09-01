// svgs
import logoIcon from "./svgs/logo.svg";
import starknetIcon from "./svgs/starknet.svg";
import earnReward from "./svgs/earn-returns.svg";
import buyToken from "./svgs/buy-token.svg";
import placeholderSvg from "./svgs/placeholder.svg";

import johnProfile from "./svgs/john.svg";
import yusufProfile from "./svgs/yusuf.svg";
import ikenneProfile from "./svgs/ikenne.svg";
import frankProfile from "./svgs/frank.svg";

import testBanner from "./images/test.jpg";
// shapes
import flatShape from "./images/flat.png";
import flatPurpleShape from "./images/flat-purple.png";
import octShape from "./images/oct.png";
import octYellowShape from "./images/oct-yellow.png";
import clyShape from "./images/cly.png";

import prop1 from "./images/prop1.png";
import prop2 from "./images/prop2.png";
import prop3 from "./images/prop3.png";

// videos
import coitonVideo from "./videos/coiton.mp4";

export const assets = {
  images: {
    testBanner,
    prop1,
    prop2,
    prop3,
  },
  videos: {
    coitonVideo,
  },
  shapes: {
    flatShape,
    flatPurpleShape,
    octShape,
    octYellowShape,
    clyShape,
  },
  svgs: {
    logoIcon,
    starknetIcon,
    earnReward,
    buyToken,
    placeholderSvg,

    johnProfile,
    yusufProfile,
    ikenneProfile,
    frankProfile,
  },
  lottie: {
    stackLottie: () => import("./lotties/stack.json"),
  },
};
