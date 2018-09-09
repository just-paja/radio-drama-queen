import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Input from './Input';

import { Classes } from '../proptypes';

const styles = theme => ({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit,
    maxWidth: theme.breakpoints.values.sm,
  },
  input: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class SoundSearchForm extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { onChange } = this.props;
    onChange(event.target.value);
  }

  render() {
    const { classes, search } = this.props;
    return (
      <div className={classes.container}>
        <Input
          className={classes.input}
          label="Sound search"
          input={{
            name: 'search',
            onChange: this.handleChange,
            value: search,
          }}
          meta={{}}
          type="search"
        />
      </div>
    );
  }
}

SoundSearchForm.propTypes = {
  classes: Classes.isRequired,
  onChange: PropTypes.func.isRequired,
  search: PropTypes.string,
};

SoundSearchForm.defaultProps = {
  search: '',
};

export default withStyles(styles)(SoundSearchForm);
