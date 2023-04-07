const modalWindow = ({ name, img, type, breed, description, age, inoculations, diseases, parasites }) => {
    if (document.getElementsByClassName("modal_window").length == 0) {
        const modal = ` 
                <div class="modal_window">
                <div class="modal_cart_container">
                    <div class="close_btn">
                        <div class="right"></div>
                        <div class="left"></div>
                    </div>
                    <img class="modal_pets" src="${img}" alt="pets">
                    <div class="modal_content_container">
                        <h3 class="modal_heading">${name}</h3>
                        <h4 class="modal_subtitle">${type} - ${breed}</h4>
                        <p class="modal_text">${description}</p>
                        <ul class="modal">
                            <li class="modal_sub_sub_title"><b>Age:</b> <span class="Age">${age}</span></li>
                            <li class="modal_sub_sub_title"><b>Inoculations:</b> <span class="Inoculations">${inoculations}</span></li>
                            <li class="modal_sub_sub_title"><b>Diseases:</b> <span class="Diseases">${diseases}</span></li>
                            <li class="modal_sub_sub_title"><b>Parasites:</b> <span class="Parasites">${parasites}</span></li>
                        </ul>
                    </div>
                </div>
                </div>`
        document.body.innerHTML += modal;
    } else {
        // add class
    }

};
// modalWindow(pets[0])
Array.from(document.getElementsByClassName("slider_cart"))
    .forEach(el => {
        el.addEventListener("click", () => modalWindow[pets[0]], false)
    })

document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal_window")) {
        document.body.removeChild(document.getElementsByClassName("modal_window")[0])
    }
})


// Burger 

const burger = document.getElementsByClassName('burger_icon')[0];
const burgerWrapper = document.getElementsByClassName('burger_wrapper')[0];
const anchors = document.querySelectorAll('.burger_wrapper a')
anchors.forEach(el => {
    el.addEventListener('click', (e) => {
        setTimeout(()=> {
            burger.classList.remove('active')
            burgerWrapper.classList.remove('active')
            document.body.classList.remove('body_no_scroll')
        },100)
    })
})

burger.addEventListener('click', () => {
    burger.classList.toggle('active')
    burgerWrapper.classList.toggle('active')
    document.body.classList.toggle('body_no_scroll')

})