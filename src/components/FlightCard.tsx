import { Box, Divider, Typography } from "@mui/material";
import React from "react";

type flightCardProps = {
    departureCity: string,
    arrivalCity: string,
    duration: number,
    carrier: string,
    transfers: number
}

export function FlightCard({departureCity, arrivalCity, duration, carrier, transfers}: flightCardProps): React.JSX.Element {
    return (
        <Box marginTop={1} marginBottom={1} sx={{ borderBottom: '2px solid blue'}}>
            <Typography marginBottom={1} textAlign="center">
               {departureCity} → {arrivalCity}
            </Typography>
            <Divider />
            <Typography marginTop={1} textAlign="center">
                {`${Math.floor(duration / 60)} ч. ${duration % 60} мин.`}
            </Typography>
            <Divider>
                {transfers === 0 ? `Без пересадок` : transfers === 1 ? `1 пересадка` : `${transfers} пересадки`}
            </Divider>
            <Typography marginLeft={2} marginBottom={2} sx={{ fontSize: 12 }}>
                Рейс выполняет: {carrier}
            </Typography>
        </Box>
    )
}