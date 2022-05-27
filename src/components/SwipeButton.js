import React from 'react'
import Swipe from 'react-swipe-button'

const SwipeButton = ({text, onSuccess}) => (
    <Swipe
        text={text}
        color="#0362fc"
        onSuccess={() => onSuccess()}
        text_unlocked={"Succes"}
    />
)

export default SwipeButton