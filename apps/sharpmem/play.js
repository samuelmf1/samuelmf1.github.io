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

const rulesDisplay = document.querySelector('#rules')
rulesDisplay.addEventListener("mouseover", showRules, false);
function showRules() {
    rulesDisplay.setAttribute("style", "text-decoration: none;")
    rulesDisplay.textContent = "Select any tile and it will flip over to display an image. Each attempt requires that you flip over two tiles; your goal is always to select two identical tiles. If they do, in fact, match, your score goes up by one point and those tiles both disappear (making it easier to find more matches). If, however, the tiles you selected do not match, they will flip back over so you can make another attempt to match different tiles. Do your best to remember what images are on the tiles you have already interacted with, as it will help you clear the board in fewer attempts. The fewer attempts it takes you to clear the board, the better your performance and the higher your final score will be, because your ratio of successes:attempts will be higher."
}
rulesDisplay.addEventListener("mouseout", hideRules, false);
function hideRules() {
    rulesDisplay.textContent = "show rules"
    rulesDisplay.setAttribute("style", "text-decoration: overline;")
}

const hardModeDisplay = document.querySelector('#detail')
hardModeDisplay.addEventListener("mouseover", showDetail, false)
function showDetail() {
    hardModeDisplay.textContent = " (1/2 the time to memorize tile selections)"
}
rulesDisplay.addEventListener("mouseout", hideDetail, false);
function hideDetail() {
    hardModeDisplay.textContent = " (?)"
}

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
        let timeOutSetting = document.getElementById("toggle").checked
        if (timeOutSetting) {
            setTimeout(checkMatch, 300)
        } else {
            setTimeout(checkMatch, 600)
        }
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
        congratsDisplay.setAttribute("style", "color:maroon; ")
        gridDisplay.innerHTML = ""
    }
}