import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import colors from '../../constants/colors';

const Menu11Icon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color="#000000"
    fill="none"
    {...props}>
    <Path
      d="M20 12L10 12"
      // stroke="currentColor"
      stroke={colors.secondaryColor30}
      strokeWidth={props.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20 5L4 5"
      // stroke="currentColor"
      stroke={colors.secondaryColor30}
      strokeWidth={props.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20 19L4 19"
      // stroke="currentColor"
      stroke={colors.secondaryColor30}
      strokeWidth={props.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Menu11Icon;
