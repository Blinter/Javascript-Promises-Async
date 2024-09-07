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