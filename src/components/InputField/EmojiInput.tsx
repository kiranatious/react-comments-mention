import React, { useRef, useEffect, useState } from 'react'
import Picker from 'emoji-picker-react'
import './InputField.scss'
import MentionsComponent from '../MentionInput/MentionsComponent'

function useOutsideAlerter(ref: any, setOpen: Function) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(!open)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

interface EmojiInputProps {
  text: string
  setText: Function
  mode?: string
  inputStyle?: object
}

const EmojiInput = ({ text, setText, mode, inputStyle }: EmojiInputProps) => {
  const [open, setOpen] = useState(false)
  const [chosenEmoji, setChosenEmoji] = useState<{ emoji?: any }>()
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, setOpen)

  useEffect(() => {
    if (chosenEmoji) {
      let newText = text + ' ' + chosenEmoji.emoji
      setText(newText)
    }
  }, [chosenEmoji])

  const onEmojiClick = (emojiObject: { emoji?: any }, event: MouseEvent) => {
    event
    setChosenEmoji(emojiObject)
  }

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <div className='emoji-input'>
      <MentionsComponent
          text={text}
          onChange={setText}
          mode={mode}
          inputStyle={inputStyle}
        />
      <div className='emoji-icon' onClick={() => setOpen(!open)}></div>
      {open ? (
        <div ref={wrapperRef} style={{position: "absolute", right: "0px", top: "40px"}}>
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      ) : null}
    </div>
  )
}

export default EmojiInput
