import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const HeadingIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color="#000000"
    fill="none"
    {...props}>
    <Path
      d="M6 4V20"
      stroke="currentColor"
      strokeWidth={props.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18 4V20"
      stroke="currentColor"
      strokeWidth={props.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 12H18"
      stroke="currentColor"
      strokeWidth={props.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default HeadingIcon;
