import { FormControl, FormLabel, FormControlLabel, Checkbox } from "@mui/material";
import React from "react";
import { carrierArrayObject } from "../App";

type CompaniesProps = {
    carriers: Array<carrierArrayObject>;
    filteredCarriers: Array<string>
    addFilteredCarriers: Function
}

export function Companies({carriers, filteredCarriers, addFilteredCarriers}: CompaniesProps): React.JSX.Element {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        if (!filteredCarriers.includes(event.target.name)) {
            addFilteredCarriers([event.target.name, ...filteredCarriers]);
        } else {
            addFilteredCarriers((state: Array<string>) => state.filter((carrier) => carrier !== event.target.name));
        }
      };

    return (
        <FormControl>
            <FormLabel id="companies-group-label">Авиакомпании</FormLabel>
            {carriers.map((carrier) => (
                <FormControlLabel control={<Checkbox onChange={handleChange} name={carrier.carrier} checked={filteredCarriers.includes(carrier.carrier)}/>} label={carrier.carrier} />
            ))}
        </FormControl>
    )
}