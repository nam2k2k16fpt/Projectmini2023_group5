import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import ListRouter from './routing/Router'
import { saveUserDataFailed, saveUserDataStart, saveUserDataSuccess } from './redux/userSlice';
import axios from 'axios';
import { useEffect } from 'react';
function App() {
  const jwtToken = useSelector((state) => state.auth.login.jwtToken);
  const dispatch = useDispatch();
  console.log('App');
  useEffect(() => {
    if (jwtToken) {
      dispatch(saveUserDataStart());
      axios.get('https://api.realworld.io/api/user', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        }
      }).then((response) => {
        console.log(response);
        dispatch(saveUserDataSuccess(response.data));
      })
        .catch(() => dispatch(saveUserDataFailed()));
    }
  }, [jwtToken, dispatch]);

  
  return (
    <ListRouter />
  );
}

export default App;
