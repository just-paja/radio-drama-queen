import { createMuiTheme } from '@material-ui/core/styles'

const borderSize = 1
const borderStyle = 'solid'

const cardBorderColor = 'rgba(0, 0, 0, .08)'
const dropTargetColor = 'rgba(0, 0, 0, .32)'
const interactionOverlayColor = 'rgba(0, 0, 0, .16)'
const listSeparatorColor = 'rgba(0, 0, 0, .04)'

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
    listSeparator: getBorderStyle(listSeparatorColor, 'top')
  }
})
