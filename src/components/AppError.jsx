import PropTypes from 'prop-types';
import React from 'react';

const AppError = ({ error }) => {
  if (!error) {
    return null;
  }
  if (error instanceof Error) {
    return (
      <span>{error.message}</span>
    );
  }
  return <span>{error}</span>;
};

AppError.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape({
      message: PropTypes.string,
    }),
  ]),
};

AppError.defaultProps = {
  error: null,
};

export default AppError;
