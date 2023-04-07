function modalWindow({ name, img, type, breed, description, age, inoculations, diseases, parasites }) {
    const modalBackgrounds = document.getElementsByClassName("modal_window")
    if (modalBackgrounds.length == 0) {
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
        const modalBackground = modalBackgrounds[0]
        const classes = modalBackground.classList;
        //update fields
        modalBackground.getElementsByClassName("modal_pets")[0].src = img
        modalBackground.getElementsByClassName("modal_heading")[0].innerHTML = name
        modalBackground.getElementsByClassName("modal_subtitle")[0].innerHTML = `${type} - ${breed}`
        modalBackground.getElementsByClassName("modal_text")[0].innerHTML = description
        modalBackground.getElementsByClassName("Age")[0].innerHTML = age
        modalBackground.getElementsByClassName("Inoculations")[0].innerHTML = inoculations
        modalBackground.getElementsByClassName("Diseases")[0].innerHTML = diseases
        modalBackground.getElementsByClassName("Parasites")[0].innerHTML = parasites

        if(classes.contains("modal_invisible")) {
            classes.remove("modal_invisible")
        }
    }
    document.getElementsByClassName("modal_window")[0].style.top = `${window.scrollY}px`
    document.body.classList.add('body_no_scroll')
};

const burger = document.getElementsByClassName('burger_icon')[0];
const burgerWrapper = document.getElementsByClassName('burger_wrapper')[0];
const anchors = document.querySelectorAll('.burger_wrapper a')

document.body.addEventListener("click", (e) => {
    // console.log("Body",e.target)
    const targetElement = e.target;
    if(targetElement.closest(".slider_cart") != null) {
        const card = targetElement.closest(".slider_cart")
        
        const num = +card.dataset.number || 0
        console.log(num)
        modalWindow(pets[num])
        return
    }

    if(targetElement.closest(".burger_icon")) {
        console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
        console.log(burgerWrapper)
        targetElement.classList.toggle('active')
        document.getElementsByClassName('burger_wrapper')[0].classList.toggle('active')
        document.body.classList.toggle('body_no_scroll')
        return
    }
    const modal = targetElement.closest(".modal_cart_container")
    const closeBtn = targetElement.closest(".close_btn")
    const modalWindowBlock = document.getElementsByClassName("modal_window")[0]
    if (modal == null && modalWindowBlock || closeBtn != null) {
        modalWindowBlock.classList.add("modal_invisible")
        document.body.classList.remove('body_no_scroll')
    }
},true)


// Burger 

anchors.forEach(el => {
    el.addEventListener('click', (e) => {
        setTimeout(()=> {
            burger.classList.remove('active')
            burgerWrapper.classList.remove('active')
            document.body.classList.remove('body_no_scroll')
        },100)
    })
})