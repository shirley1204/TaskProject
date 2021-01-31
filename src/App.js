import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/scripts/Home/Home";
import Addtask from "./components/scripts/Home/AddTask";
import EditTask from "./components/scripts/Home/EditTask";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/addtask" component={Addtask} />
      <Route exact path="/edittask" component={EditTask} />
    </Router>
  );
}
export default App;
