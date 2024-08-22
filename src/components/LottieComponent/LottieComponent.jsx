import LottieView from "lottie-react-native";

const LottieComponent = ({ animationData, width, height }) => {
//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: {animationData},
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };

  return <LottieView source={animationData} width={width} height={height} autoPlay loop/>;
};

export default LottieComponent;
