import Color from 'color'

import { createMuiTheme } from '@material-ui/core/styles'

const borderSize = 1
const borderStyle = 'solid'

const primaryAction = Color('#3967B0')
const forbiddenAction = Color('#ff0000')

const bodyDisplay = Color('#060606')
const infoDisplay = Color('#2f2f2f')

const body = {
  contrastText: bodyDisplay.string(),
  main: 'transparent',
  selected: primaryAction.lighten(0.66).string()
}

const primary = {
  contrastText: '#fff',
  dark: primaryAction.darken(0.33).string(),
  light: primaryAction.lighten(0.33).string(),
  main: primaryAction.string()
}

const infoData = {
  contrastText: infoDisplay.negate().string(),
  dark: infoDisplay.darken(0.33).string(),
  forbidden: forbiddenAction.darken(0.33).string(),
  main: infoDisplay.string(),
  selected: infoDisplay.negate().lighten(0.33).string()
}

const cardBorderColor = 'rgba(0, 0, 0, .08)'
const hoverColor = 'rgba(0, 0, 0, .08)'
const dropTargetColor = 'rgba(0, 0, 0, .32)'
const interactionOverlayColor = 'rgba(0, 0, 0, .16)'
const listSeparatorColor = 'rgba(0, 0, 0, .04)'
const focusOutlineColor = 'rgba(229, 151, 0, 255)'

function getBorderStyle (color, direction) {
  const side = direction ? direction.charAt(0).toUpperCase() + direction.slice(1) : ''
  return {
    [`border${side}Color`]: color,
    [`border${side}Style`]: borderStyle,
    [`border${side}Width`]: borderSize
  }
}

export const theme = createMuiTheme({
  palette: {
    body,
    infoData,
    primary,
    dropTarget: dropTargetColor,
    interactionOverlay: interactionOverlayColor,
    listSeparator: listSeparatorColor
  },
  components: {
    card: {
      boxShadow: 'none',
      overflow: 'visible',
      ...getBorderStyle(cardBorderColor)
    },
    cardSeparator: getBorderStyle(cardBorderColor, 'top'),
    focus: {
      outlineColor: focusOutlineColor,
      outlineStyle: 'solid',
      outlineWidth: 1,
      '&:hover': {
        backgroundColor: hoverColor
      }
    },
    listSeparator: getBorderStyle(listSeparatorColor, 'top')
  }
})
