import SoundGalleryTarget from '../components/SoundGalleryTarget'

import { connect } from 'react-redux'
import { boardStore } from '../../soundBoards'
import { categoryStore } from '../../soundCategories'

const mapStateToProps = (state, { board, category }) => ({
  board: boardStore.getFirst(state, board),
  category: categoryStore.getFirst(state, category)
})

const container = connect(mapStateToProps)(SoundGalleryTarget)

container.displayName = 'Connect(SoundGalleryTarget)'

export default container
