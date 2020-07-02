import Navbar from './components/Navbar'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Routes />
      </Router>
    )
  }
}

export const launch = () => {
  if (document.getElementById("app"))
    ReactDOM.render(<App />, document.getElementById("app"))
}
