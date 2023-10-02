import React from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CardList } from './components/CardList';
import { Sidebar } from './components/Sidebar';
import Grid from '@mui/material/Unstable_Grid2';
import data from './flights/flights.json';

type segmentsType = {
  departureAirport: {
    caption: string,
  },
  arrivalAirport: {
    caption: string,
  },
  airline: {
    caption: string
  }
}

type legsArrayType = {
  duration: number,
  segments: Array<segmentsType>
}

export type flightsArrayObject = {
  flight: {
    carrier: {
      caption: string,
    },
    legs: Array<legsArrayType>
  }
}

export type carrierArrayObject = {
  carrier: string,
  lowestPrice?: string,
  fastestTime: number,
  flights: flightsArrayObject[]
} 

const flightsArray  = data.result.flights as unknown as flightsArrayObject[];

const carrierNamesSet: Set<string> = new Set();
const legsSet: Set<number> = new Set();

flightsArray.forEach((elem: any) => {
  carrierNamesSet.add(elem.flight.carrier.caption);
  elem.flight.legs.forEach((leg: any) => {
    legsSet.add(leg.segments.length - 1);
  })
})

const legs = Array.from(legsSet).sort((a, b) => {
  return a - b;
});

const uniqueCarrierNames = Array.from(carrierNamesSet).sort();

const uniqueCarriersAndPrices: Array<carrierArrayObject> = uniqueCarrierNames.map((elem) => {
    return {
      carrier: elem,
      flights: [],
      fastestTime: 0,
    }
  })

flightsArray.forEach((elem: any) => {
  uniqueCarriersAndPrices.forEach((elem2) => {
    if (elem2.carrier === elem.flight.carrier.caption) {
      elem2.flights.push(elem);
      if (!elem2.lowestPrice) {
        elem2.lowestPrice = elem.flight.price.total.amount;
      } else if (elem2.lowestPrice > elem.flight.price.total.amount) {
        elem2.lowestPrice = elem.flight.price.total.amount;
      }
      if (elem2.fastestTime === 0) {
        elem2.fastestTime = elem.flight.legs[0].duration;
      } else if (elem2.fastestTime > elem.flight.legs[0].duration) {
        elem2.fastestTime = elem.flight.legs[0].duration;
      }
    }
  })
})
//console.log(uniqueCarriersAndPrices);
function App(): React.JSX.Element {
  const [carriersAndPrices, setCarriersAndPrices] = React.useState<Array<carrierArrayObject>>(uniqueCarriersAndPrices);
  const [uniqueCarriers, setUniqueCarriers] = React.useState<Array<string>>(uniqueCarrierNames);
  const [sortBy, setSortBy] = React.useState<"ascending" | "descending" | "time">("ascending");
  const [sortedCarriers, setSortedCarriers] = React.useState<Array<carrierArrayObject>>([]);
  const [filteredCarriers, setFilteredCarriers] = React.useState<Array<string>>([]);
  const [minPrice, setMinPrice] = React.useState<number>(0);
  const [maxPrice, setMaxPrice] = React.useState<number>(0);
  const [filteredTransfers, setFilteredTransfers] = React.useState<Array<number>>([]);

  React.useEffect(() => {
    if (sortBy === "ascending") {
      setSortedCarriers(uniqueCarriersAndPrices.slice().sort((a: carrierArrayObject, b: carrierArrayObject) => {
        return Number(a.lowestPrice) - Number(b.lowestPrice);
      }))
    } else if (sortBy === "descending") {
      setSortedCarriers(uniqueCarriersAndPrices.slice().sort((a: carrierArrayObject, b: carrierArrayObject) => {
        return Number(b.lowestPrice) - Number(a.lowestPrice);
      }))
    } else if (sortBy === 'time') {
      uniqueCarriersAndPrices.forEach((carrier) => {
        carrier.flights.sort((a: flightsArrayObject, b: flightsArrayObject) => {
          return (a.flight.legs[0].duration - b.flight.legs[0].duration);
        })
      })
      setSortedCarriers(uniqueCarriersAndPrices.slice().sort((a: carrierArrayObject, b: carrierArrayObject) => {
        return a.fastestTime - b.fastestTime;
      }))
    }
    //console.log(sortedCarriers);
  }, [sortBy])

  function sortByAscendingPrice(): void {
    setSortBy('ascending');
  }

  function sortByDescendingPrice(): void {
    setSortBy('descending');
  }

  function sortByTravelTime(): void {
    setSortBy('time');
  }

  function addFilteredCarriers(newFilteredCarriers: Array<string>): void {
    setFilteredCarriers(newFilteredCarriers);
  } 
 // console.log(flightsArray);
  return (
    <Grid container spacing={2}>
      <Grid md={4}>
        <Sidebar carriers={uniqueCarriersAndPrices} clickOnAscendingSort={sortByAscendingPrice} clickOnDescendingSort={sortByDescendingPrice} 
        clickOnTimeSort={sortByTravelTime} filteredCarriers={filteredCarriers} addFilteredCarriers={addFilteredCarriers} 
        setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} minPrice={minPrice} maxPrice={maxPrice} legs={legs} 
        filteredTransfers={filteredTransfers} setFilteredTransfers={setFilteredTransfers}/>
      </Grid>
      <Grid md={8}>
        <CardList carriersAndPrices={sortedCarriers} filteredCarriers={filteredCarriers} minPrice={minPrice} maxPrice={maxPrice} 
        flights={flightsArray} filteredTransfers={filteredTransfers}/>
      </Grid>
    </Grid>
  );
}

export default App;
