function createElement(elementName, classes) {
    const element = document.createElement(elementName)
    classes.forEach(clazz => element.classList.add(clazz));
    return element
}

const wrapper = createElement("div", ["wrapper"]);
document.body.prepend(wrapper)

const header = createElement("div", ["header"]);
wrapper.appendChild(header)

const heading = createElement("h1", ["heading"]);
header.appendChild(heading)
heading.innerText = "RSS Виртуальная клавиатура";

const visibleWindow = createElement("textarea", ["visible-window"]);
// visibleWindow.setAttribute('readonly', true);
wrapper.appendChild(visibleWindow)

const keyboardWrapper = createElement("div", ["keyboard-wrapper"]);
wrapper.appendChild(keyboardWrapper)

//first line

const firstLineSymbols = ["`", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "-", "=", "Backspace"]
const secondLineSymbols = ["Tab", ..."qwertyuiop[]".split(""), "\\", "Del"]
const thirdLineSymbols = ["CapsLock", ..."asdfghjkl;'".split(""), "Enter"]
const fourthLineSymbols = ["Shift", ..."zxcvbnm,./".split(""), "&#x25B3;", "Shift"]
const fifthLineSymbols = ["Ctrl", "Win", "Alt", " ", "Alt", "&#x25C1;", "&#x25BD;", "&#x25B7;", "Ctrl"]

const englishKeyboard = [
    ["`", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "-", "=", "Backspace"],
    ["Tab", ..."qwertyuiop[]".split(""), "\\", "Del"],
    ["CapsLock", ..."asdfghjkl;'".split(""), "Enter"],
    ["Shift", ..."zxcvbnm,./".split(""), "&#x25B3;", "Shift"],
    ["Ctrl", "Win", "Alt", "&nbsp;", "Alt", "&#x25C1;", "&#x25BD;", "&#x25B7;", "Ctrl"]
]

const russianKeyboard = [
    ["ё", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "-", "=", "Backspace"],
    ["Tab", ..."йцукенгшщзхъ".split(""), "\\", "Del"],
    ["CapsLock", ..."фывапролджэ".split(""), "Enter"],
    ["Shift", ..."ячсмитьбю/".split(""), "&#x25B3;", "Shift"],
    ["Ctrl", "Win", "Alt", "&nbsp;", "Alt", "&#x25C1;", "&#x25BD;", "&#x25B7;", "Ctrl"]
]

function init(symbols) {
    symbols[0].forEach((el, idx) => {
        const key = createElement("div", ["key"]);
        if (idx == 13) key.classList.add("large");
        key.innerText = el;
        keyboardWrapper.appendChild(key);
    })
    symbols[1].forEach((el, idx) => {
        const key = createElement("div", ["key"]);
        key.innerText = el;
        keyboardWrapper.appendChild(key);
    })
    symbols[2].forEach((el, idx) => {
        const key = createElement("div", ["key"]);
        if (new Set([0, 12]).has(idx)) key.classList.add("large");
        key.innerText = el;
        keyboardWrapper.appendChild(key);
    })
    symbols[3].forEach((el, idx) => {
        const key = createElement("div", ["key"]);
        if (new Set([0, 12]).has(idx)) key.classList.add("large");
        key.innerHTML = el;
        keyboardWrapper.appendChild(key);
    })
    symbols[4].forEach((el, idx) => {
        const key = createElement("div", ["key"]);
        if (idx == 3) key.classList.add("space");
        key.innerHTML = el;
        keyboardWrapper.appendChild(key);
    })
    const shift = Array.from(document.getElementsByClassName("key")).filter(el => el.innerText == "Shift");
    shift[0].dataset.pos = "Left";
    shift[1].dataset.pos = "Right";

    const alt = Array.from(document.getElementsByClassName("key")).filter(el => el.innerText == "Alt");
    alt[0].dataset.pos = "Left";
    alt[1].dataset.pos = "Right";

    const ctrl = Array.from(document.getElementsByClassName("key")).filter(el => el.innerText == "Ctrl");
    ctrl[0].dataset.pos = "Left";
    ctrl[1].dataset.pos = "Right";
}

const languageChooser = {
    "english": englishKeyboard,
    "russian": russianKeyboard
}

let language = "english"

function changeLanguage() {
    if(language == "english") {
        language = "russian";
    }
    else if(language == "russian") {
        language = "english";
    }
    console.log(language)
    console.log(languageChooser[language])
    const flatSymbols = languageChooser[language].flat();
    Array.from(document.getElementsByClassName("key")).forEach((el,idx)=> el.innerHTML = flatSymbols[idx]);
}




init(englishKeyboard)
/*
split left and right
*/


let CapsLockState = false;
const keys = Array.from(document.getElementsByClassName("key"))
const letters = Array.from(document.getElementsByClassName("key"))
    .filter(el => {
        return isLetter(el.innerText)
    })

keyboardWrapper.addEventListener("click", (e) => {
    if (e.target.classList.contains("key")) {
        e.target.classList.add("active")
        const value = e.target.innerText;
        if (isLetter(value) || value.length == 1) {
            let startPos, endPos;
            startPos = visibleWindow.selectionStart;
            endPos = visibleWindow.selectionEnd;
            visibleWindow.value = visibleWindow.value.substring(0, startPos)
                + value
                + visibleWindow.value.substring(endPos, visibleWindow.value.length);
            visibleWindow.focus();
            startPos = endPos = startPos + 1;
            visibleWindow.setSelectionRange(startPos, endPos);
        }
        if (value === "Enter") {
            visibleWindow.value += "\r\n";
        }

        if (value === "Backspace") {
            visibleWindow.value = visibleWindow.value.slice(0, -1)
        }

        if(value === "Tab") {
            let startPos, endPos;
            startPos = visibleWindow.selectionStart;
            endPos = visibleWindow.selectionEnd;
            visibleWindow.value = visibleWindow.value.substring(0, startPos)
                + " ".repeat(4)
                + visibleWindow.value.substring(endPos, visibleWindow.value.length);
            visibleWindow.focus();
            startPos = endPos = startPos + 4;
            visibleWindow.setSelectionRange(startPos, endPos);
        }
 
        if (value === "CapsLock") {
            e.target.classList.toggle("pressed")
            CapsLockState = !CapsLockState;
            letters
                .forEach(htmlElement => {
                    let el = htmlElement.innerText;
                    if (CapsLockState)
                        el = el.toUpperCase()
                    else
                        el = el.toLowerCase()
                    htmlElement.innerText = el;
                })
        }

        setTimeout(() => {
            e.target.classList.remove("active");
        }, 200)
    }
})


document.addEventListener('keydown', function (event) {
    // console.log(event)
    // console.log(event.key)
    let letter;
    switch(event.key) {
        case "Control": {
            letter = "Ctrl";
            break;
        }
        case "AltGraph": {
            letter = "Alt";
            break;
        }
        default: {
            letter = event.key
        }
    }
    keys.filter(el => el.innerText.toLowerCase() === letter.toLowerCase()).forEach(el => {

        if (letter === 'CapsLock') {
            el.classList.toggle("pressed")
            CapsLockState = !CapsLockState;
            letters
                .forEach(htmlElement => {
                    let el = htmlElement.innerText;
                    if (CapsLockState)
                        el = el.toUpperCase()
                    else
                        el = el.toLowerCase()
                    htmlElement.innerText = el;
                })
        }


        if (event.shiftKey  &&  event.altKey) {
            if(el.dataset.pos && event.code.indexOf(el.dataset.pos) == -1) {
                changeLanguage()
            }   
        }

        if(el.dataset.pos && event.code.indexOf(el.dataset.pos) == -1) {} else {
            el.classList.add("active")
        }

        setTimeout(() => {
            el.classList.remove("active");
        }, 200)
    })
});


function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase() && c.length == 1;
}

// tab 4 spaces