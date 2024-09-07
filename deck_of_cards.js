$(".defaultTextContainer").empty();
const grabNewCard = deck => $.getJSON(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
const displayNewCard = resp => {
    const rotation = `rotate(${Math.floor(Math.random() * 359)}deg)`;
    $('.defaultTextContainer')
        .append($("<img>")
            .attr({
                'class': 'newImageCard',
                'src': resp.cards[0].image,
            })
            .css({
                'position': 'absolute',
                'margin-left': '-50px',
                'margin-top': '5%',
                'transform': rotation,
                '-ms-transform': rotation,
                '-moz-transform': rotation,
                '-webkit-transform': rotation,
                '-o-transform': rotation,
            }));
}
try {
    (async () => {
        const newDeck = await $.getJSON("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        $('#newCard').on('click', async () => {
            const newCard = await grabNewCard(newDeck);
            if (newCard.remaining == 0) {
                $('#newCard')
                    .off('click')
                    .text('No more cards!')
                    .css({ 'cusror': 'not-allowed' })
                    .on('click', () => alert("No more cards in the deck!"));
                return;
            }
            displayNewCard(newCard);
        });
    })()
} catch (e) {
    console.error(e);
}