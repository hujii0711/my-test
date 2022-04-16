import AddNumber from '../components/AddNumber';
import {connect} from 'react-redux';

// store의 dispatch가 첫번째 인자
function mapReduxDispatchToReactProps(dispatch){
  return {
    onClick: function(_size){
      dispatch({type:"INCREMENT", size:_size});
    }
  }
}

export default connect(null, mapReduxDispatchToReactProps)(AddNumber);