import { useState,useCallback,useEffect,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [length, setlength] = useState(1)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null) 
    const generatePassword = useCallback(() => {
       let pass = ""
       let str = "ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

       if (numberAllowed) {
        str += "0123456789"
       }
       if (characterAllowed) {
        str += "!@#$%^&*()_+"
       }
       for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * str.length+1)
        pass += str.charAt(randomIndex)
       }
       setPassword(pass)
    },[length,characterAllowed,numberAllowed,setPassword])
  
    const copyToClipboard = useCallback(()   => {
      passwordRef.current.select()
      passwordRef.current.setSelectionRange(0, 50)
      window.navigator.clipboard.writeText(password)
      alert("Password copied to clipboard");
    },[password])
    const handleClick = () => {
      copyToClipboard()
    }
   useEffect(() => {
    generatePassword()
   }, [length,characterAllowed,numberAllowed,generatePassword])
  return (
    <>
     <h1 className='text-center'>Password Genreter</h1>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-2 py-3 bg-gray-700 text-orange-400"> 
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>  
      <input 
        type= "text"
        placeholder='password'
        value={password}
        ref={passwordRef}

        className='w-full px-4 py-2 text-gray-900 bg-gray-200 focus:outline-none'  
        />
        <button onClick={handleClick} className='bg-blue-600 text-white p-3 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type='range'
            min={1}
            max={50}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setlength(e.target.value)}}/>
            <label>length:{length}</label>

        <input 
          type='checkbox'
          id='numberInput'
          defaultChecked={numberAllowed}
          onChange={()=>{
            setNumberAllowed((prev)=>!prev)
          }}/>
          <label htmlFor='numberInput'>Include Numbers</label> 

          <input 
          type='checkbox'
          id='charInput'
          defaultChecked={characterAllowed}
          onChange={()=>{
            setCharacterAllowed((prev)=>!prev)
          }}/>
          <label htmlFor='charInput'>Include character</label> 
          </div>
        </div>
      </div>
      
    </>
  )
}

export default App


