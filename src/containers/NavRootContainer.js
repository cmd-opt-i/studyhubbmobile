import { connect } from 'react-redux'
import Root from '../components/Root'
import { push, pop } from '../actions'

function mapStateToProps (state) {
  return {
    navigation: state.NavReducer
   }
}

export default connect(
  mapStateToProps,
   {
     pushRoute: (route) => push(route),
     popRoute: () => pop()
   }
)(Root)
