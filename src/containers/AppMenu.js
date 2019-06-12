import { connect } from 'react-redux'

import AppMenu from '../components/AppMenu'

import { areSoundCategoriesEmpty } from '../soundCategories/selectors'

const mapStateToProps = state => ({
  isEmpty: areSoundCategoriesEmpty(state)
})

export default connect(mapStateToProps)(AppMenu)
