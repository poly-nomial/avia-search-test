import React from "react";
import { FlightCard } from "./FlightCard";
import { Box, Button, Card, Typography } from "@mui/material";
import { carrierArrayObject, flightsArrayObject } from "../App";

type cardListProps = {
    carriersAndPrices: Array<carrierArrayObject>,
    filteredCarriers: Array<string>,
    minPrice: number,
    maxPrice: number,
    flights: Array<flightsArrayObject>,
    filteredTransfers: Array<number>
}

export function CardList({carriersAndPrices, filteredCarriers, minPrice, maxPrice, flights, filteredTransfers}: cardListProps): React.JSX.Element {
    return (
        


        <Card sx={{ maxWidth: 700, marginBottom: 1 }}>
            {carriersAndPrices.map((elem: carrierArrayObject) => {
                if (filteredCarriers.length === 0 || (filteredCarriers.includes(elem.carrier))) {
                    if ((Number(elem.lowestPrice) >= minPrice) && (maxPrice === 0 || Number(elem.lowestPrice) <= maxPrice)) {
                        return (
                            <>
                                <Box sx={{backgroundColor: 'primary.main'}} paddingBottom={2} paddingTop={1} marginTop={2}>
                                    <Typography variant="h5" color="white" marginLeft={2}>
                                        {elem.carrier}
                                    </Typography>
                                    <Typography color="white" marginLeft={2}>
                                        от {elem.lowestPrice} руб.
                                    </Typography>
                                </Box>
                                {flights.map(flight => {
                                    if (flight.flight.carrier.caption === elem.carrier && (filteredTransfers.length === 0 || filteredTransfers.includes(flight.flight.legs[0].segments.length - 1))) {
                                                return (
                                                    <FlightCard departureCity={flight.flight.legs[0].segments[0].departureAirport.caption}
                                                                arrivalCity={flight.flight.legs[0].segments[flight.flight.legs[0].segments.length - 1].arrivalAirport.caption} duration={flight.flight.legs[0].duration}
                                                                carrier={flight.flight.carrier.caption}
                                                                transfers={flight.flight.legs[0].segments.length - 1} />
                                                )
                                    }
                                })}
                                <Button variant="contained" fullWidth color="error">Выбрать</Button>
                            </>
                        )
                    }
                }
                
            })}
        </Card>
    )          
}