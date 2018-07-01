import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import SoundCategoryControls from '../containers/SoundCategoryControls';
import SoundItem from '../containers/SoundItem';

import { Sound } from '../proptypes';

const styles = {
  removePadding: {
    paddingLeft: 0,
    paddingRight: 0,
  },
};

const SoundCategory = ({
  classes,
  name,
  sounds,
  uuid,
}) => (
  <Card>
    <CardContent>
      <Typography variant="headline">
        {name || 'Default'}
      </Typography>
      <List dense>
        {sounds.map(soundUuid => (
          <ListItem className={classes.removePadding} key={soundUuid}>
            <SoundItem uuid={soundUuid} />
          </ListItem>
        ))}
      </List>
    </CardContent>
    <CardActions>
      <SoundCategoryControls uuid={uuid} />
    </CardActions>
  </Card>
);

SoundCategory.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  name: PropTypes.string,
  sounds: PropTypes.arrayOf(Sound).isRequired,
  uuid: PropTypes.string.isRequired,
};

SoundCategory.defaultProps = {
  name: null,
};

export default withStyles(styles)(SoundCategory);
