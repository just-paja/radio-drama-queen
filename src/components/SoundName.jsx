import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import { Classes } from '../proptypes';

const styles = theme => ({
  dimm: {
    color: theme.palette.text.hint,
  },
  highlight: {
    color: theme.palette.text.primary,
  },
});

const highlightSearch = (name, search, classes) => {
  if (!search) {
    return name;
  }
  const searchIndex = name.search(search);
  if (searchIndex === -1) {
    return (
      <span className={classes.dimm}>
        {name}
      </span>
    );
  }
  const start = name.substr(0, searchIndex);
  const highlight = name.substr(searchIndex, search.length);
  const end = name.substr(searchIndex + search.length);
  return (
    <span>
      {start ? <span className={classes.dimm}>{start}</span> : null}
      <span className={classes.highlight}>
        {highlight}
      </span>
      {end ? <span className={classes.dimm}>{end}</span> : null}
    </span>
  );
};

const SoundName = ({
  classes,
  highlight,
  name,
  uuid,
}) => (
  <div>
    {highlightSearch(name || uuid, highlight, classes)}
  </div>
);

SoundName.propTypes = {
  classes: Classes.isRequired,
  highlight: PropTypes.string,
  name: PropTypes.string,
  uuid: PropTypes.string.isRequired,
};

SoundName.defaultProps = {
  name: '',
  highlight: '',
};

export default withStyles(styles)(SoundName);
