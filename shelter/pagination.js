// Pagination

const btnPrevOne = document.getElementsByClassName('nav_first')[0]
const btnPrevStart = document.getElementsByClassName('nav_start')[0]
const btnNextOne = document.getElementsByClassName('next_one')[0]
const btnNextEnd = document.getElementsByClassName('next_end')[0]
const pagePosition = document.getElementsByClassName('page_position')[0]

function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
        let j = Math.round(Math.random(i));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr;
}

const generatedPets = pets.map((el, idx, acc) => shuffle(acc))

const myCustomFetch = (page) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (page >= 0 || page < 6) {
            resolve(generatedPets[page])
        } else {
            reject()
        }
    }, 1000)
})

// let page = 0;
// const lastPageNum = 5;

// btnNextOne.addEventListener("click", () => {
//     if (page > lastPageNum) return
//     myCustomFetch(page + 1)
//         .then(res => JSON.parse(res))
//         .then(cards => {
//             // обновить карточки
//             page = page + 1
//         })
//         .catch()

// })



btnNextEnd.addEventListener("click", () => {
    console.log('click');
    pagePosition.innerText = 5;
})