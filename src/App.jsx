import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8);

  const [numberAllowed, setNumberAllowed] = useState(false);

  const [charAllowed, setCharAllowed] = useState(false);

  const [password, setPassword] = useState("");

  // useRef hook
  const passRef = useRef(null)

  const copyPasswordToClipBoard = useCallback( () => {
    passRef.current?.select()
    passRef.current?.setSelectionRange(0, 12)
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "1234567890"
    if (charAllowed) str += "`~!@#$%^&()-_=+[]{}|;:',.<>?/*"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      
      pass += str.charAt(char)
    }

    setPassword(pass)
    
  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect( () => {passwordGenerator()},[length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-20 text-orange-500 bg-gray-700'> <h1 className='text-white text-center text-2xl font-bold'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 mt-4'>
        <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly ref={passRef}/>
        <button onClick={copyPasswordToClipBoard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <label htmlFor="length-range">Length : {length}</label>
          <input type="range" min={8} max={20} onChange={(e) => {setLength(e.target.value)}} id='length-range' className='cursor-pointer' value={length} />
        </div>
        <div className='flex item-center gap-x-1'>
          <input type="checkbox" name="" id="numberInput" defaultChecked={numberAllowed} onChange={() => {setNumberAllowed((prev) => !prev)}} />
          <label htmlFor="nuberInput">Numbers</label>
        </div>
        <div className='flex item-center gap-x-1'>
          <input type="checkbox" name="" id="charInput" defaultChecked={charAllowed} onChange={() => {setCharAllowed((prev) => (!prev))}} />
          <label htmlFor="charInput">Character</label>
        </div>
      </div>

    </div>
    </>
  )
}

export default App
