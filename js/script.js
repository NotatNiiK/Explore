function iOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

let iosCheck = iOS();
if (iosCheck) {
    let fixedBackground = document.querySelectorAll('._ios');
    fixedBackground.forEach(element => {
        element.classList.add('notFixedBg');
    });
}

let burger = document.querySelector('.header__burger');
let menu = document.querySelector('.header__nav');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('lock');
});

let header = document.querySelector('.header');
let arrowToTop = document.querySelector('.arrow-to-top');

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 0) header.classList.add('bg');
    else header.classList.remove('bg');
    if (window.pageYOffset > window.innerHeight / 3) {
        arrowToTop.classList.add('active');
        arrowToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            })
        })
    }
    else {
        arrowToTop.classList.remove('active');
    }
});

let tabsLinks = document.querySelectorAll('.tabs__link');
let tabsForm = document.querySelectorAll('.form-tabs');

if (tabsLinks.length === tabsForm.length && (tabsLinks.length && tabsForm.length > 0)) {
    tabsLinks[0].classList.add('active');
    tabsForm[0].classList.add('active');
    tabsForm[0].classList.add('visible');
    for (let i = 0; i < tabsLinks.length, i < tabsForm.length; i++) {
        tabsLinks[i].addEventListener('click', (event) => {
            event.preventDefault();
            for (let j = 0; j < tabsForm.length, j < tabsLinks.length; j++) {
                tabsForm[i].classList.remove('visible');
                if (tabsForm[j].classList.contains('active')) {
                    tabsForm[j].classList.remove('active')
                }
                if (tabsLinks[j].classList.contains('active')) {
                    tabsLinks[j].classList.remove('active')
                }
            }
            tabsLinks[i].classList.add('active');
            tabsForm[i].classList.add('active');
            setTimeout(() => {
                tabsForm[i].classList.add('visible');
            }, 0);
        });
    }
}

let inputs = document.querySelectorAll('.form-tabs__input');
for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    let placeholder = input.placeholder;
    input.addEventListener('focus', () => {
        input.placeholder = "";
    })
    input.addEventListener('blur', () => {
        input.placeholder = placeholder;
    })
}

const animItems = document.querySelectorAll("._anim-items");
if (animItems.length > 0) {
    window.addEventListener("scroll", animOnScroll);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint - window.innerHeight - window.innerHeight / animStart;
            }
            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add("_active");
            }
            else {
                if (!animItem.classList.contains('_anim-repeat')) {
                    animItem.classList.remove("_active");
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    animOnScroll();
}

