import React, { useState, useEffect, ChangeEvent } from 'react';
import type { MouseEvent } from 'react';

import { cnApp } from './App.classname';
import { Graph } from './component/Graph/Graph';

import { getEndDate, getStartDate } from './utils';
import './App.css';

const currencies = ['RUB', 'EUR'];

const App = () => {
    const [dollarExchangeRate, setDollarExchangeRate] = useState<number[]>([]);
    const [currentCurrency, setCurrentCurrency] = useState<string>('RUB');
    const [period, setPeriod] = useState(14);

    useEffect(() => {
        fetch(`https://api.currencybeacon.com/v1/timeseries?api_key=vuiRs5xRGXtbCZK2BMeATAhyhlFLj1Sw&base=USD&start_date=${getStartDate(period)}&end_date=${getEndDate()}&symbols=${currentCurrency}`)
            .then(response => response.json())
            .then((data) => setDollarExchangeRate(
                Object
                    .values(data)
                    .map((rate: any) => rate[currentCurrency])
                    .filter(rate => rate !== undefined)
                ))
    }, [currentCurrency, period])

    const handleChangeCurrency = (event: ChangeEvent<HTMLSelectElement>) => {
        setCurrentCurrency(event.target.value);
    }

    const handleChangePeriod = (event: MouseEvent<HTMLButtonElement>) => {
        setPeriod(+event.currentTarget.value);
    };

    return (
        <div className={cnApp()}>
            <Graph rates={dollarExchangeRate}/>

            <div className={cnApp('SelectBlock')}>
                <p className={cnApp('Text')}>Dollar per</p>
                <select onChange={handleChangeCurrency} defaultValue="RUB">
                    {currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}
                </select>
            </div>

            <div className={cnApp('TimeButtons')}>
                <button className={cnApp('Button')} onClick={handleChangePeriod} value={5}>5 days</button>
                <button className={cnApp('Button')} onClick={handleChangePeriod} value={14}>2 weeks</button>
                <button className={cnApp('Button')} onClick={handleChangePeriod} value={30}>Month</button>
            </div>
        </div>
    );
}

export default App;
