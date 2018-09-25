import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import SoundToggleButton from './SoundToggleButton';

import { SoundName } from '../../sounds/components';
import { Sound } from '../../sounds/proptypes';

const styles = {
  inline: {
    display: 'flex',
    alignItems: 'center',
  },
};

class SoundCategoryItem extends Component {
  constructor() {
    super();
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    const { onToggle, sound } = this.props;
    onToggle(sound.uuid);
  }

  render() {
    const {
      classes,
      connectDragSource,
      search,
      sound,
    } = this.props;
    return sound && connectDragSource ? connectDragSource(
      <div className={classes.inline}>
        <SoundToggleButton
          loading={sound.loading}
          onClick={this.handleToggle}
          playing={sound.playing}
          error={sound.error}
        />
        <SoundName
          name={sound.name}
          uuid={sound.uuid}
          highlight={search}
        />
      </div>
    ) : null;
  }
}

SoundCategoryItem.propTypes = {
  connectDragSource: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onToggle: PropTypes.func.isRequired,
  search: PropTypes.string,
  sound: Sound.isRequired,
};

SoundCategoryItem.defaultProps = {
  connectDragSource: null,
  search: '',
};

export default withStyles(styles)(SoundCategoryItem);
