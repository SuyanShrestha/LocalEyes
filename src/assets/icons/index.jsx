import React from 'react';
import colors from '../../constants/colors';

// hugeicons
import Home01Icon from './Home01Icon';
import Mail01Icon from './Mail01Icon';
import ArrowLeft01Icon from './ArrowLeft01Icon';
import SquareLock02Icon from './SquareLock02Icon';
import UserIcon from './UserIcon';
import UserSearch01Icon from './UserSearch01Icon';
import NoteIcon from './NoteIcon';
import Notification02Icon from './Notification02Icon';
import Menu11Icon from './Menu11Icon';

const icons = {
  home: Home01Icon,
  mail: Mail01Icon,
  back: ArrowLeft01Icon,
  lock: SquareLock02Icon,
  user: UserIcon,
  userSearch: UserSearch01Icon,
  note: NoteIcon,
  notification: Notification02Icon,
  menu: Menu11Icon,
};

const HugeIcon = ({name, ...props}) => {
  const IconComponent = icons[name];
  return (
    <IconComponent
      height={props.size || 24}
      width={props.size || 24}
      strokeWidth={props.strokeWidth || 1.9}
      color={colors.textLight}
      {...props}
    />
  );
};

export default HugeIcon;

