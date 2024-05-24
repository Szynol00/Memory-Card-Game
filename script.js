const cardsContainer = document.querySelector('.cards');
const status = document.querySelector('.status');
const imgSelector = '.back-view img'

let activeCard, matchedCard;
let disableCards = false;
let numberOfMatches = 0;
let maxMatches = 6;

function getCardImg(card) {
    return card.querySelector(imgSelector);
}

function flipSelectedCard({target: clickedCard}) {
    if (activeCard !== clickedCard && !disableCards) {
        clickedCard.classList.add('flip');
        if (!activeCard) {
            return (activeCard = clickedCard);
        }
        matchedCard = clickedCard;
        disableCards = true;

        const getCardImgSrc = (card) => {
            return getCardImg(card).src;
        };

        checkForMatch(getCardImgSrc(activeCard), getCardImgSrc(matchedCard));
    }
}

function checkForMatch(img1, img2) {
    if (img1 === img2) {
        numberOfMatches++;
        if (numberOfMatches === maxMatches) {
            setTimeout(() => {
                shuffleDeck();
            }, 1000);
        }
        activeCard.removeEventListener('click', flipSelectedCard);
        matchedCard.removeEventListener('click', flipSelectedCard);
        activeCard = matchedCard = null;
        disableCards = false;
    } else {
        setTimeout(() => {
            activeCard.classList.remove('flip');
            matchedCard.classList.remove('flip');
            activeCard = matchedCard = null;
            disableCards = false;
        }, 1200);
    }
}

function shuffleDeck() {
    numberOfMatches = 0;
    disableCards = false;
    activeCard = matchedCard = null;
    cardsContainer.innerHTML = ''

    // Czas na sprawdzenie kart
    let seconds = 10;

    const numbersFrom1To6 = [...Array.from({length: 6}, (_, i) => i + 1)];
    const imgArray = [...numbersFrom1To6, ...numbersFrom1To6];

    imgArray.sort(() => 0.5 - Math.random());

    imgArray.forEach((imgId, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'flip');
        const frontView = document.createElement('div');
        frontView.classList.add('view', 'front-view');

        const frontViewImg = document.createElement('img');
        frontViewImg.src = 'Images/pytajnik.png';
        frontView.alt = 'Pytajnik';
        frontView.appendChild(frontViewImg);

        const backView = document.createElement('div');
        backView.classList.add('view', 'back-view');

        const backViewImg = document.createElement('img');
        backViewImg.src = `Images/img-fruit-${imgArray[index]}.jpg`;
        backViewImg.alt = `Obrazek ${imgArray[index]}`;
        backView.appendChild(backViewImg);

        card.appendChild(frontView);
        card.appendChild(backView);

        cardsContainer.appendChild(card);
    });

    status.textContent = `Czas na sprawdzenie kart: ${seconds}s`;
    const interval = setInterval(() => {
        seconds--;

        if (seconds > 0) {
            status.textContent = `Czas na sprawdzenie kart: ${seconds}s`;
        } else {
            clearInterval(interval);
            status.textContent = 'Czas minął! Czas na grę!';
            document.querySelectorAll('.card').forEach((card) => {
                card.classList.remove('flip');
                card.addEventListener('click', flipSelectedCard);
            });
        }
    }, 1000);
}

shuffleDeck();

