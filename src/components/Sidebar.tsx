import React, { MouseEventHandler } from "react";
import { Sort } from "./Sort";
import { Filter } from "./Filter";
import { Price } from "./Price";
import { Companies } from "./Companies";
import { Grid } from "@mui/material";
import { carrierArrayObject } from "../App";

type SidebarProps = {
    carriers: Array<carrierArrayObject>,
    clickOnAscendingSort: MouseEventHandler,
    clickOnDescendingSort: MouseEventHandler,
    clickOnTimeSort: MouseEventHandler,
    filteredCarriers: Array<string>,
    addFilteredCarriers: Function,
    setMinPrice: Function,
    setMaxPrice: Function,
    minPrice: number,
    maxPrice: number,
    legs: Array<number>,
    filteredTransfers: Array<number>,
    setFilteredTransfers: Function
}

export function Sidebar({carriers, clickOnAscendingSort, clickOnDescendingSort, clickOnTimeSort, filteredCarriers, addFilteredCarriers, setMinPrice, 
    setMaxPrice, minPrice, maxPrice, legs, filteredTransfers, setFilteredTransfers}: SidebarProps): React.JSX.Element {
    
    return (
        <Grid container className="Sidebar" marginLeft={2}>
            <Grid md={12}><Sort clickOnAscendingSort={clickOnAscendingSort} clickOnDescendingSort={clickOnDescendingSort} 
            clickOnTimeSort={clickOnTimeSort}/></Grid>
            <Grid md={12}><Filter legs={legs} filteredTransfers={filteredTransfers} setFilteredTransfers={setFilteredTransfers}/></Grid>
            <Grid md={12}><Price setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} minPrice={minPrice} maxPrice={maxPrice}/></Grid>
            <Grid md={12}><Companies carriers={carriers} filteredCarriers={filteredCarriers} addFilteredCarriers={addFilteredCarriers}/></Grid>
        </Grid>
    )
}