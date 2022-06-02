import React from 'react';
import Swipe from 'react-swipe-button';

const SwipeButton = ({ startText, endText, onSuccess }) => (
    <Swipe
        text={startText}
        color="#0362fc"
        onSuccess={() => onSuccess()}
        text_unlocked={endText}
    />
)

export default SwipeButton;