# Javascript Promises - Asynchronous Code (using Async/Await)

### Part 1 : Number Facts

1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API.

```javascript
$(".defaultTextContainer").empty();
(async function grabMath() {
    try {
        const resp = await $.getJSON("http://numbersapi.com/42/math?json");
        $(".defaultTextContainer").append(`${resp.text}<br>`);
    } catch (e) {
        console.error(e);
    }
})()
```

2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

```javascript
$(".defaultTextContainer").empty();
(async () => {
    try {
        const resp = await $.getJSON("http://numbersapi.com/42,8,16,24/math?json");
        for (const k in resp) $(".defaultTextContainer").append(`${resp[k]}<br>`);
    } catch (e) {
        console.error(e);
    }
})()

// Chained
$(".defaultTextContainer").empty();
(async () => {
    try {
        [
            await $.getJSON("http://numbersapi.com/42/math?json"),
            await $.getJSON("http://numbersapi.com/8/math?json"),
            await $.getJSON("http://numbersapi.com/24/math?json"),
            await $.getJSON("http://numbersapi.com/16/math?json")
        ].forEach(v => {
            console.log(v.text);
        });
    } catch (e) {
        console.error(e);
    }
})()
```

3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

```javascript
$(".defaultTextContainer").empty();
(async () => {
    try {
        [
            await $.getJSON("http://numbersapi.com/42/math?json"),
            await $.getJSON("http://numbersapi.com/42/math?json"),
            await $.getJSON("http://numbersapi.com/42/math?json"),
            await $.getJSON("http://numbersapi.com/42/math?json")
        ].forEach(v => {
            $(".defaultTextContainer").append(v.text + "<br>");
        });
    } catch (e) {
        console.error(e);
    }
})()
```

---

### Part 2: Deck of Cards

1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

```javascript
$(".defaultTextContainer").empty();
(async () => {
    try {
        const newDeck = await $.getJSON("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        const newCard = await $.getJSON(`https://deckofcardsapi.com/api/deck/${newDeck.deck_id}/draw/?count=1`);
        console.log(`${newCard.cards[0].value} of ${newCard.cards[0].suit}`);
    } catch (e) {
        console.error(e);
    }
})()
```

2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the **same** deck.
    
    Once you have both cards, **console.log** the values and suits of both cards.

```javascript
$(".defaultTextContainer").empty();
(async () => {
    try {
        const newDeck = await $.getJSON("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        const getNewCard = deckResp =>
            $.getJSON(`https://deckofcardsapi.com/api/deck/${deckResp.deck_id}/draw/?count=1`);
        const newCard = await getNewCard(newDeck);
        const newCard2 = await getNewCard(newDeck);
        console.log(`${newCard.cards[0].value} of ${newCard.cards[0].suit}`);
        console.log(`${newCard2.cards[0].value} of ${newCard2.cards[0].suit}`);
    } catch (e) {
        console.error(e);
    }
})()
```

3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.
   
```
See index.html, deck_of_cards.js
```