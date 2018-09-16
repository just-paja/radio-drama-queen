import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import { stringSearch } from '../../search';
import { Classes } from '../../proptypes';

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
  const searchResult = stringSearch(name, search);
  if (!searchResult.relevant) {
    return (
      <span className={classes.dimm}>
        {name}
      </span>
    );
  }
  const highlight = text => (
    <span className={classes.highlight}>
      {text}
    </span>
  );
  const dimm = text => (
    <span className={classes.dimm}>
      {text}
    </span>
  );
  const content = searchResult.results
    .sort((a, b) => a - b)
    .reduce((line, start, index, results) => {
      if (start !== -1) {
        const nextLine = [...line];
        const sample = searchResult.searchSamples[index];
        const prevEnd = index === 0
          ? 0
          : (
            results[index - 1]
            + searchResult.searchSamples[index - 1].length
          );
        console.log(
          sample,
          [start, sample.length],
          [
            index === 0 ? 0 : results[index - 1],
            index === 0 ? 0 : searchResult.searchSamples[index - 1].length,
          ]
        );
        if (prevEnd > start) {
          const diff = prevEnd - start - sample.length;
          console.log(prevEnd, start, sample.length);
          nextLine.push(highlight(name.substr(prevEnd, sample.length - diff)));
        } else if (prevEnd === start) {
          nextLine.push(highlight(name.substr(start, sample.length)));
        } else {
          nextLine.push(dimm(name.substr(prevEnd, start)));
          nextLine.push(highlight(name.substr(start, sample.length)));
        }
        if (index === results.length - 1) {
          nextLine.push(dimm(name.substr(start + sample.length)));
        }
        return nextLine;
      }
      return line;
    }, []);

  return (
    <span>
      {content}
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
