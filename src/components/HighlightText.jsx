import PropTypes from 'prop-types'
import React from 'react'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  highlight: {
    background: theme.palette.secondary.light
  }
})

function sortFrags (a, b) {
  return a.index - b.index
}

function joinFragments (text, frag, next) {
  return {
    highlight: true,
    index: frag.index,
    text: text.substr(frag.index, frag.text.length + next.text.length)
  }
}

function getPrefix (text, start) {
  return {
    highlight: false,
    index: 0,
    text: text.substr(0, start)
  }
}

function getFilling (text, end, next) {
  return {
    highlight: false,
    index: end,
    text: next
      ? text.substr(end, next.index - end)
      : text.substr(end)
  }
}

function getFrags (text, searchFragments) {
  const lowerCaseText = text.toLowerCase()
  return searchFragments
    .reduce((acc, fragText) => {
      const results = []
      const search = fragText.toLowerCase()
      let index = lowerCaseText.indexOf(search)
      let padding = 0
      while (index !== -1) {
        results.push({
          text: text.substr(index + padding, fragText.length),
          highlight: true,
          index: index + padding
        })
        padding = padding + index + 1
        index = lowerCaseText.substr(padding).indexOf(search)
      }
      return acc.concat(results)
    }, [])
    .sort(sortFrags)
    .reduce((acc, frag, index, src) => {
      const end = frag.index + frag.text.length
      const next = src[index + 1]
      if (index === 0 && (!next || end < next.index)) {
        return [...acc, getPrefix(text, frag.index), frag, getFilling(text, end, next)]
      }
      if (next) {
        if (end >= next.index) {
          return [...acc, joinFragments(text, frag, next)]
        }
        return [...acc, getFilling(text, end, next), frag]
      }
      if (end < text.length - 1) {
        return [...acc, frag, getFilling(text, end)]
      }
      return [...acc, frag]
    }, [])
}

function renderHighlightedFrags (text, frags, highlightClass) {
  return frags.map((frag, index) => frag.highlight
    ? (
      <span
        className={highlightClass}
        key={`${frag.text}-${frag.index}`}
      >
        {text.substr(frag.index, frag.text.length)}
      </span>
    ) : frag.text
  )
}

function renderHighlights (text, searchFragments, highlightClass) {
  const frags = getFrags(text, searchFragments)
  return frags.length
    ? renderHighlightedFrags(text, frags, highlightClass)
    : text
}

function HighlightTextComponent ({ classes, highlightClass, searchFragments, text }) {
  return (
    <span>
      {searchFragments && searchFragments.length
        ? renderHighlights(text, searchFragments, highlightClass || classes.highlight)
        : text}
    </span>
  )
}

HighlightTextComponent.propTypes = {
  highlightClass: PropTypes.string,
  text: PropTypes.string.isRequired,
  searchFragments: PropTypes.arrayOf(PropTypes.string)
}

export const HighlightText = withStyles(styles)(HighlightTextComponent)
