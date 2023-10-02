import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import React, { MouseEventHandler } from "react";

type sortProps = {
    clickOnAscendingSort: MouseEventHandler,
    clickOnDescendingSort: MouseEventHandler,
    clickOnTimeSort: MouseEventHandler
}


export function Sort({clickOnAscendingSort, clickOnDescendingSort, clickOnTimeSort}: sortProps): React.JSX.Element {
    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Сортировать</FormLabel>
            <RadioGroup
                defaultValue="ascending"
                name="radio-buttons-group"
            >
                <FormControlLabel value="ascending" control={<Radio />} label="по возрастанию цены" onClick={clickOnAscendingSort}/>
                <FormControlLabel value="descending" control={<Radio />} label="по убыванию цены" onClick={clickOnDescendingSort}/>
                <FormControlLabel value="time" control={<Radio />} label="по времени в пути" onClick={clickOnTimeSort}/>
            </RadioGroup>
        </FormControl>
    )
}