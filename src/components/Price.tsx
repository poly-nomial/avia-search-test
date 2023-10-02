import { FormControl, FormLabel, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";

const regNumbers = RegExp(/\d*/);

type priceProps = {
    setMinPrice: Function,
    setMaxPrice: Function,
    minPrice: number,
    maxPrice: number
}

export function Price({setMinPrice, setMaxPrice, minPrice, maxPrice}: priceProps): React.JSX.Element {

    function handleMinPriceChange(e: ChangeEvent<HTMLInputElement>): void {
        setMinPrice(Number(e.target.value.match(regNumbers)));
    }

    function handleMaxPriceChange(e: ChangeEvent<HTMLInputElement>): void {
        setMaxPrice(Number(e.target.value.match(regNumbers)));
    }

    return (
        <FormControl>
            <FormLabel id="inputs-group-label">Цена</FormLabel>
            <TextField onChange={handleMinPriceChange} value={minPrice === 0 ? '' : minPrice} size="small" label="От" margin="normal" />
            <TextField onChange={handleMaxPriceChange} value={maxPrice === 0 ? '' : maxPrice} size="small" label="До" />
        </FormControl>
            
            
    )
}