import React, {
    Component
} from 'react';
import {

} from 'react-native';

// const API = 'https://api.coinmarketcap.com/v1/ticker/?start=0&limit=10'

async function getAPIFromServer(start, limit) {
    try {
        let response = await fetch('https://api.coinmarketcap.com/v1/ticker/?start='+ start + '&' + 'limit=' + limit);
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error('Error is:', error)
    }
}
export{getAPIFromServer}