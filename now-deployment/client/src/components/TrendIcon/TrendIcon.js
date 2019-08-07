import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown,
  faMinus
} from '@fortawesome/free-solid-svg-icons';

import './TrendIcon.scss';

const TrendIcon = ({ trend }) => {
  let icon = undefined;
  let styleClass = '';

  if (trend > 0) {
    icon = faChevronUp;
    styleClass = 'danger-color';
  } else if (trend < 0) {
    icon = faChevronDown;
    styleClass = 'success-color';
  } else {
    icon = faMinus;
    styleClass = 'warning-color';
  }

  return (
    <div className={'trend ' + styleClass}>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

export default TrendIcon;
