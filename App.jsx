import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")

  
  const passwordGenerator = useCallback ( () =>  {
    let pass = ""
    let str  = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let num ="0123456789"
    let chr ="@#$/."

    if(number){
      str += num
    }
    if(character){
      str += chr
    }
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length))
    }
    setPassword(pass)
    

  },[number,length,character,setPassword])
  
  useEffect(()=>{passwordGenerator()},[number,length,character,passwordGenerator])
  const passRef = useRef();
  
  return (
    <>
      
    <div className="relative top-52 w-full max-w-md mx-auto text-white bg-gray-600 border-2 border-white-500">

      <h1 className='text-2xl underline-offset-8 capitalize underline font-bold font-serif'> PASSWORD GENERATOR </h1>
        
        <div id='input' className="flex shadow text-black text-xl overflow-hidden mx-1 my-2  ">
          <input className="w-full outline-none py-1 px-3 rounded-lg" 
          type="text"
          placeholder='password'
          value={password} 
          ref={passRef}
          readOnly/>
          <button className='bg-black text-center rounded text-white mx-2 px-3 py-3' onClick={()=>{window.navigator.clipboard.writeText(password)
          passRef.current?.select()}}>COPY</button> 
        </div>
    
        <div className="flex flex-row">
          
            <input type="range" className='cursor-pointer' min={4} max={100} value={length} onChange={(e)=>{setLength(e.target.value)}}/>
            <label>Length : {length}</label>

            <input className="ml-4 mx-1" type="checkbox" 
            onClick={()=>{setCharacter((prev)=>!prev)}}/>
            <label >Characters</label>
            

            <input className="ml-4 mx-1" type="checkbox" 
            onClick={()=>{setNumber((prev)=>!prev)}}/>
            <label >Numbers</label>
          
        </div>
      </div>

    </>
  )
}

export default App
