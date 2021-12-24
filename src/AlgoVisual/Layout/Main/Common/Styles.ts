export let enabledSliderStyle = {
    color: "#33435d",
    ":hover": {
        boxShadow: 0
    },

    '& .MuiSlider-thumb': {
        bgcolor: "#85a4d9",
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: '0',
        },
    },
    '& .MuiSlider-valueLabel': {
        display: "none"
    }
}

export let disabledSliderStyle = {
    '& .MuiSlider-thumb': {
        bgcolor: "#f5a0a0",
        ":hover": {
            boxShadow: 0
        },
    },
}
