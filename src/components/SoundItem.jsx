import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import SoundToggleButton from './SoundToggleButton';

import { Sound } from '../proptypes';

const styles = {
  inline: {
    display: 'flex',
    alignItems: 'center',
  },
};

const SoundItem = ({ classes, sound, onToggle }) => (
  sound ? (
    <div className={classes.inline}>
      <SoundToggleButton onToggle={onToggle} playing={sound.playing} />
      <div>
        {sound.name || sound.uuid}
      </div>
    </div>
  ) : null
);

SoundItem.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onToggle: PropTypes.func.isRequired,
  sound: Sound.isRequired,
};

export default withStyles(styles)(SoundItem);
