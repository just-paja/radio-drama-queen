import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import SoundToggleButton from './SoundToggleButton';

import { Sound } from '../proptypes';

const styles = {
  inline: {
    display: 'flex',
    alignItems: 'center',
  },
};

class SoundItem extends Component {
  constructor() {
    super();
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    const { onToggle, sound } = this.props;
    onToggle(sound.uuid);
  }

  render() {
    const { classes, sound } = this.props;
    return sound ? (
      <div className={classes.inline}>
        <SoundToggleButton
          loading={sound.loading}
          onClick={this.handleToggle}
          playing={sound.playing}
        />
        <div>
          {sound.name || sound.uuid}
        </div>
      </div>
    ) : null;
  }
}

SoundItem.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onToggle: PropTypes.func.isRequired,
  sound: Sound.isRequired,
};

export default withStyles(styles)(SoundItem);
