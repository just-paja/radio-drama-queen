import classnames from 'classnames'
import Checkbox from '@material-ui/core/Checkbox'
import formatDuration from 'format-duration'
import PropTypes from 'prop-types'
import React from 'react'

import { Classes } from '../../proptypes'
import { HighlightText, focusable } from '../../components'
import { Sound } from '../../sounds/proptypes'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  selectionItem: {
    alignItems: 'baseline',
    display: 'flex',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  selectable: {
    '&:hover': {
      background: theme.palette.grey[300]
    }
  },
  checkbox: {
    marginRight: theme.spacing(1)
  },
  name: {
    fontSize: theme.spacing(2.5)
  },
  tagRow: {
    color: theme.palette.grey[700],
    '& > span:not(:first-child)': {
      marginLeft: theme.spacing(1)
    }
  },
  empty: {
    color: theme.palette.grey[500]
  }
})

function preventEventBubbling (event) {
  event.preventDefault()
  event.stopPropagation()
}

class SoundSelectionItemComponent extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleAdd () {
    this.props.onAdd(this.props.sound.uuid)
  }

  handleKeyDown (event) {
    if (event.key === ' ') {
      preventEventBubbling(event)
      this.handleSelect()
    } if (['a', 'A', 'Enter'].includes(event.key)) {
      preventEventBubbling(event)
      this.handleAdd()
    }
  }

  handleSelect () {
    this.props.onSelect(this.props.sound.uuid)
  }

  render () {
    const {
      classes,
      focusableRef,
      selectable,
      selected,
      searchFragments,
      sound
    } = this.props
    return (
      <div
        className={classnames(classes.selectionItem, selectable && classes.selectable)}
        onClick={this.handleAdd}
        onKeyDown={this.handleKeyDown}
        ref={focusableRef}
        tabIndex={0}
      >
        <div className={classes.checkbox}>
          <Checkbox
            checked={selected}
            onClick={preventEventBubbling}
            onChange={this.handleSelect}
          />
        </div>
        <div>
          <div>
            <span className={classes.name}>
              <HighlightText text={sound.name} searchFragments={searchFragments} />
            </span>
          </div>
          <div className={classes.tagRow}>
            <span className={classes.duration}>
              {sound.duration
                ? formatDuration(sound.duration * 1000)
                : '?:??'}
            </span>
            <span className={classes.tags}>
              {sound.tags.length
                ? sound.tags.map((tag, index) => (
                  <React.Fragment key={tag.name}>
                    <HighlightText text={tag.title} searchFragments={searchFragments} />
                    {index !== sound.tags.length - 1 && ', '}
                  </React.Fragment>
                ))
                : <span className={classes.empty}>No tags </span>}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

SoundSelectionItemComponent.propTypes = {
  classes: Classes.isRequired,
  focusableRef: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  searchFragments: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectable: PropTypes.bool,
  selected: PropTypes.bool,
  sound: Sound.isRequired
}

export const SoundSelectionItem = withStyles(styles)(
  focusable(SoundSelectionItemComponent)
)
