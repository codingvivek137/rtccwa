import './App.css'
import Editor from './component/Editor'
import Home from './component/Home'
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/editor/:roomId' element={<Editor/>}/>
      </Routes>
    </>
  )
}

export default App
