import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import PrivateRoute from "./components/route/PrivateRoute"
import SpecialRoute from "./components/route/SpecialRoute"
import Auth from "./pages/Auth"
import Home from "./pages/Home"
import AddNote from "./pages/AddNote"
import Note from "./pages/Note"
import AllNotes from "./pages/AllNotes"
import Header from "./components/Header"

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route element={<SpecialRoute />}>
          <Route path="/auth" element={<Auth />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/add" element={<AddNote />} />
          <Route path="/note/:noteId" element={<Note />} />
          <Route path="/notes" element={<AllNotes />} />
        </Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
