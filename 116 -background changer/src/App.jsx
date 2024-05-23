import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [color, setColor] = useState("olive")
/// onlick ko function chahiye nahi ki jo func se return ho rha hai
  return (
     <div className='w-full h-screen'
     style={{backgroundColor:color}}>
     <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
      <div className='flex flex-wrap justify-center gap-3 bg-white rounded-xl'>
         <button 
         onClick={()=>setColor("red")}
         className='outline-none px-4 py-3 rounded-3xl m-1 text-white' style={{backgroundColor:"red"}} >Red</button>
         <button 
          onClick={()=>setColor("green")}//imp
         className='outline-none px-4 py-3 rounded-3xl m-1 text-white' style={{backgroundColor:"green"}} >green</button>
         <button
          onClick={()=>setColor("blue")}
         className='outline-none px-4 py-3 rounded-3xl m-1 text-white' style={{backgroundColor:"blue"}} >blue </button>
         <button 
         onClick={()=>setColor("Yellow")}
         className='outline-none px-4 py-3 rounded-3xl m-1' style={{backgroundColor:"Yellow"}} >Yellow</button>
         <button 
         onClick={()=>setColor("Grey")}
         className='outline-none px-4 py-3 rounded-3xl text-white m-1' style={{backgroundColor:"Grey"}} >Grey</button>
         <button 
         onClick={()=>setColor("pink")}
         className='outline-none px-4 py-3 rounded-3xl m-1 text-white' style={{backgroundColor:"pink"}} >Pink</button>
          <button 
         onClick={()=>setColor("Purple")}
         className='outline-none px-4 py-3 rounded-3xl m-1 text-white' style={{backgroundColor:"Purple"}} >Purple</button>
          <button 
         onClick={()=>setColor("Black")}
         className='outline-none px-4 py-3 rounded-3xl m-1 text-white' style={{backgroundColor:"Black"}} >Black</button>
         </div>
     </div>
     </div> 
  
  )
}

export default App
