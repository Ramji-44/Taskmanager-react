import "./App.css"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import Dashboard from "./pages/Dashboard"

function App() {

  return (
    <>
      <Navbar />
      <div className="title">
        <span className="line"></span>
        <h1>Task Dashboard</h1>
      </div>

      <main className="main-container">
        <Dashboard/>
      </main>

      <Footer />
    </>
  )
}

export default App