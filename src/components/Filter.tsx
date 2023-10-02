import { FormControl, FormLabel, Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

type filterProps = {
    legs: Array<number>,
    filteredTransfers: Array<number>,
    setFilteredTransfers: Function
}

export function Filter({legs, filteredTransfers, setFilteredTransfers}: filterProps): React.JSX.Element {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        if(!filteredTransfers.includes(Number(event.target.name))) {
            setFilteredTransfers([Number(event.target.name), ...filteredTransfers]);
        } else {
            setFilteredTransfers((state: Array<number>) => state.filter((transfer) => transfer !== Number(event.target.name)));
        }
    }

    return (
        <FormControl>
            <FormLabel id="checkbox-buttons-group-label">Фильтрация</FormLabel>
            {legs.map((leg) => (
                    <FormControlLabel control={<Checkbox onChange={handleChange} name={`${leg}`} checked={filteredTransfers.includes(leg)}/>} label={leg === 0 ? 'Без пересадок' : leg === 1 ? '1 пересадка' : `${leg} пересадки`}/>
            ))}
        </FormControl>
    )
}