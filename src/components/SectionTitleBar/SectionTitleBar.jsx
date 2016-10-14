import React, { PropTypes } from 'react';
import { AppBar } from 'react-toolbox/lib/app_bar';
import theme from './SectionTitleBar.scss';

function SectionTitleBar({children, other}) {
  return (
    <AppBar {...other} theme={theme}>
      {children}
    </AppBar>
  );
}

SectionTitleBar.propTypes = {
  children: PropTypes.node,
  other: PropTypes.array,
};

export default SectionTitleBar;
