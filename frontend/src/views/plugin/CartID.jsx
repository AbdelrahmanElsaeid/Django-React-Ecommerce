import React from 'react';

function CartID() {
    const generateRandomString = () => {
        const length = 30; 
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
        let randomString = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }

        localStorage.setItem('randomString', randomString);
    };

    const existingRandomString = localStorage.getItem('randomString');

    if (!existingRandomString) {
        generateRandomString();
    } else {
        console.log(`Random string in localStorage: ${existingRandomString}`);
    }

    return existingRandomString;
}

export default CartID;
