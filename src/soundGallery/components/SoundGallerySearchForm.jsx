import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import React, { Component } from 'react';


import { withStyles } from '@material-ui/core/styles';

import Input from '../../components/Input';

import { Classes } from '../../proptypes';

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
    this.handleFilterUsedChange = this.handleFilterUsedChange.bind(this);
  }

  handleChange(event) {
    const { onChange } = this.props;
    onChange(event.target.value);
  }

  handleFilterUsedChange(event) {
    const { onFilterUsedChange } = this.props;
    onFilterUsedChange(event.target.checked);
  }

  render() {
    const { classes, filterUsed, search } = this.props;
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
        <FormControlLabel
          control={(
            <Checkbox
              className={classes.input}
              checked={filterUsed}
              name="filterUsed"
              onChange={this.handleFilterUsedChange}
            />
          )}
          label="Only unused"
        />
      </div>
    );
  }
}

SoundSearchForm.propTypes = {
  classes: Classes.isRequired,
  filterUsed: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onFilterUsedChange: PropTypes.func.isRequired,
  search: PropTypes.string,
};

SoundSearchForm.defaultProps = {
  filterUsed: false,
  search: '',
};

export default withStyles(styles)(SoundSearchForm);
