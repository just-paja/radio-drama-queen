import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Field, Form } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';

import Input from '../../components/Input';

const styles = theme => ({
  removePadding: {
  },
});

class SoundCategoryName extends Component {
  constructor() {
    super();
    this.handleEscape = this.handleEscape.bind(this);
  }

  handleEscape(e) {
    if (e.key === 'Escape') {
      const { categoryUuid, onCancel } = this.props;
      onCancel(categoryUuid);
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <Field
          autoFocus
          component={Input}
          label="Category name"
          name="name"
          onKeyUp={this.handleEscape}
        />
      </Form>
    );
  }
}

SoundCategoryName.propTypes = {
  categoryUuid: PropTypes.string.isRequired,
}

export default withStyles(styles)(SoundCategoryName);
