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
import Call02Icon from './Call02Icon';
import Linkedin01Icon from './Linkedin01Icon';
import Facebook01Icon from './Facebook01Icon';
import NewTwitterRectangleIcon from './NewTwitterRectangleIcon';
import InstagramIcon from './InstagramIcon';
import DashboardSquare01Icon from './DashboardSquare01Icon';
import StarIcon from './StarIcon';
import Delete02Icon from './Delete02Icon';
import Appointment02Icon from './Appointment02Icon';
import Tick02Icon from './Tick02Icon';
import Cancel01Icon from './Cancel01Icon';
import Calendar01Icon from './Calendar01Icon';
import Location05Icon from './Location05Icon';

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
  phone: Call02Icon,
  linkedin: Linkedin01Icon,
  facebook: Facebook01Icon,
  twitter: NewTwitterRectangleIcon,
  instagram: InstagramIcon,
  dashboard: DashboardSquare01Icon,
  star: StarIcon,
  delete: Delete02Icon,
  appointment: Appointment02Icon,
  tick: Tick02Icon,
  cancel: Cancel01Icon,
  calendar: Calendar01Icon,
  location: Location05Icon,
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

