const container = document.querySelector(".slider_container")
const cartContainer = document.querySelector(".slider_cart_container")
const sliderLine = document.querySelector(".slider-line")


container.addEventListener("click", (e) => {
    const elementsNum = Math.floor(sliderLine.getBoundingClientRect().width / 270)
    const gapWidth = (sliderLine.getBoundingClientRect().width - elementsNum * 270) / (elementsNum - 1) || 0

    const offset = elementsNum * (270 + gapWidth)
    console.log(offset)
    if (e.target.closest(".arrow_prev") != null) {
        left -= offset;
        if (left == -3 * offset) {
            left = 0;
        }
    }
    if (e.target.closest(".arrow_next") != null) {
        left += offset;
        if (left > 0) {
            left = -2 * offset;
        }
    }
    sliderLine.style.left = `${left}px`;
})