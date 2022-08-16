import {UseState} from './UseState';
import {ClassState} from './ClassState';
import './App.css';
import { UseReducer } from './UseReducer';

function App() {
  return (
    <div className="App">
      <UseReducer name="Use Reducer" />
      {/* <UseState name="UseState" />
      <ClassState name="ClassState" /> */}
    </div>
  );
}

export default App;
