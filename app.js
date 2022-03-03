const cardArray = [
    {
        name: 'burger',
        img: 'images/burger.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'burger',
        img: 'images/burger.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    }
]

cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
const attemptsDisplay = document.querySelector('#attempts')
const scaledScoreDisplay = document.querySelector('#scaled-score')
const congratsDisplay = document.querySelector('#congrats')


let cardsChosen = []
let cardsChosenIds = []
let numAttempts = 0
const cardsWon = []

function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 480)
    }
}

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        gridDisplay.append(card)
    }
}

createBoard()

function checkMatch() {
    const cards = document.querySelectorAll('img')

    if (cardsChosenIds[0] == cardsChosenIds[1]) {
        alert("Snap! You have clicked on the same image twice. Try to avoid doing this, as it lowers your score.")
        cards[cardsChosenIds[0]].setAttribute('src', 'images/blank.png')
        cards[cardsChosenIds[1]].setAttribute('src', 'images/blank.png')
    } else {
        if (cardsChosen[0] == cardsChosen[1]) {
            cards[cardsChosenIds[0]].setAttribute('src', 'images/white.png')
            cards[cardsChosenIds[1]].setAttribute('src', 'images/white.png')
            cards[cardsChosenIds[0]].removeEventListener('click', flipCard)
            cards[cardsChosenIds[1]].removeEventListener('click', flipCard)
            cardsWon.push(cardsChosen)
        } else {
            cards[cardsChosenIds[0]].setAttribute('src', 'images/blank.png')
            cards[cardsChosenIds[1]].setAttribute('src', 'images/blank.png')
        }
    }
    cardsChosen = []
    cardsChosenIds = []

    if (cardsWon.length === 1) {
        resultDisplay.textContent = cardsWon.length + " match made"
    } else {
        resultDisplay.textContent = cardsWon.length + " matches made"
    }

    numAttempts += 1
    if (numAttempts === 1) {
        attemptsDisplay.textContent = numAttempts + " attempt"
    } else {
        attemptsDisplay.textContent = numAttempts + " attempts"
    }

    let scaledScore = Math.round((cardsWon.length / numAttempts) * 100)
    if (numAttempts > 5) {
        scaledScoreDisplay.textContent = "running score: " + scaledScore
    }

    if (cardsWon.length === (cardArray.length/2)) {
        scaledScoreDisplay.textContent = ""
        congratsDisplay.innerHTML = "You acheived a final score of " + scaledScore + "!"
        gridDisplay.innerHTML = ""
    }
}