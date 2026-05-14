import "./App.css"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import Form from "./components/Form/Form"
import Tasks from "./components/Tasks/Tasks"

function App() {

  return (
    <>
      <Navbar />
      <div className="title">
        <span className="line"></span>
        <h1>Task Dashboard</h1>
      </div>

      <main className="main-container">
        <div className="form-section">
          <Form />
        </div>

        <div className="tasks-section">
          <Tasks />
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App