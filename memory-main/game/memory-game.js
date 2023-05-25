class MatchGrid {

    constructor(args) {
        this.font = args.font
        this.grid = args.grid
        this.limit = args.limit
    }
}

let game

const optionButtonsNode = document.querySelectorAll('.start-mode__option-button');

const gameSetting = {
    font: 'numbers',
    grid: '4',
    limit: '1'
}

if (optionButtonsNode.length) {
    const buttonsArray = Array.from(optionButtonsNode);
    buttonsArray.forEach((button) => {
        button.addEventListener('click', function () {

            const dataSet = Object.entries(this.dataset)[0]
            const dataKey = dataSet[0]
            const dataValue = dataSet[1]

            gameSetting[dataValue] = this.value

            console.log(this.value)
            console.log(dataValue)

            const activeElement = document.querySelector(`[data-${dataKey}="${dataValue}"].active`);
            activeElement.classList.remove('active')
            this.classList.add('active')

            if (dataKey === 'font') {
                document.body.style.fontFamily = `'${this.value}', sans-serif`
            }

        })
    })
}
// TODO come up with the idea how to change font on click
const startModeDiv = document.querySelector('.start-mode');
const startButton = document.querySelector('.start-mode__modal-button-start');

const addClasses = () => {

}

const generateGrid = (dimension) => {
    let numbersForGrid = [...Array(Math.pow(Number(game.grid), 2) / 2).keys()].map(value => ++value)
    return numbersForGrid.concat(numbersForGrid)
}

const getFirstNodeElement = (node) => node.firstElementChild

if (startButton) {
    startButton.addEventListener('click', function () {
        game = new MatchGrid(gameSetting)
        startModeDiv.style.display = 'none';

        let numbersForGrid = generateGrid(game.grid)

        const playground = document.querySelector('.game__grid-items');


        const timer = document.querySelector('.timer');
        const moves = document.querySelector('.moves');

        timer.innerHTML = `0${game.limit}:00`

        let min = game.limit
        let sec = 0

        const interval = setInterval(() => {

            if (min === 0 && sec === 0) {
                clearInterval(interval)
                alert('game over')
                return
            }

            if (sec === 0) {
                min--
                sec = 59
            } else {
                sec--
            }

            timer.innerHTML = `0${min}:${sec > 9 ? sec : '0' + sec}`

        }, 1000);

        let head = null
        let tail = null

        let prevElement = null

        const numbers = []
        const results = []

        let isLock = false;

        [...Array(Math.pow(Number(game.grid), 2))].forEach((_, i) => {

            const gridItemContainer = document.createElement('div');
            const gridItemFront = document.createElement('div');
            const gridItemBack = document.createElement('div');

            gridItemContainer.classList.add(`game__grid-items-container`)
            gridItemContainer.classList.add(`game__grid-item-${game.grid}`)

            gridItemFront.classList.add('game__grid-item-front')
            gridItemFront.classList.add(`game__grid-item-${game.grid}`)

            const randomIndex = Math.floor(Math.random() * numbersForGrid.length)
            gridItemFront.innerHTML = String(numbersForGrid[randomIndex])
            numbersForGrid.splice(randomIndex, 1)

            gridItemBack.classList.add('game__grid-item-back')
            gridItemBack.classList.add(`game__grid-item-${game.grid}`)

            gridItemContainer.appendChild(gridItemFront)
            gridItemContainer.appendChild(gridItemBack)

            playground.classList.add(`game__grid-items-${game.grid}`)
            playground.appendChild(gridItemContainer);


            // GAME LOGIC
            gridItemContainer.addEventListener('click', function () {

                const frontItem = getFirstNodeElement(this)

                const value = frontItem.innerHTML

                if(this === prevElement) return
                if(results.includes(value)) return
                if(isLock) return

                const movesValue = Number(moves.innerHTML)
                moves.innerHTML = String(movesValue + 1)

                this.classList.add('game__grid-item-container--flipped')

                if(!prevElement) {
                    prevElement = this
                }

                frontItem.classList.add('game__grid-item-container--active')
                // else {
                //     frontItem.classList.add('game__grid-item-container--active')
                //     head = this
                // }

                if(numbers.length) {
                    if(value === numbers[0]) {
                        results.push(numbers.pop())

                        const frontItemPrev = getFirstNodeElement(prevElement)

                        frontItemPrev.classList.remove('game__grid-item-container--active')
                        frontItem.classList.remove('game__grid-item-container--active')

                        // head = null
                        prevElement = null
                    } else {
                        isLock = true
                        setTimeout(() => {

                            this.classList.remove('game__grid-item-container--flipped')
                            prevElement.classList.remove('game__grid-item-container--flipped')
                            // head = null
                            prevElement = null
                            isLock = false
                            numbers.pop()
                        }, 1000)
                    }
                } else {
                    numbers.push(value)
                }

            })
        })

    })
}
