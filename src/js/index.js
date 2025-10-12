 



const toggle = ( classBtn, classForToggle, toggleClass ) => {
    const toggleBtn = document.querySelector(`.${classBtn}`);
    const classToggle = document.querySelector(`.${classForToggle}`)
    
      toggleBtn.addEventListener('click', () => {
        classToggle.classList.toggle(toggleClass);
    })
      
}
toggle('dropdawn__button', 'dropdawn', 'dropdawn--active'  )
toggle('menu-nav', 'header__container', 'active'  )
toggle('hero__btn', 'hero__text-container', 'show'  )

// 

const toggleElement = (classBtn, classForToggle) => {
const btns = document.querySelectorAll(`.${classBtn}`)

console.log(btns)
btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const parent = btn.parentElement;

    parent.classList.toggle(`${classForToggle}`)
  })
})

}

toggleElement('toggle__btn', 'open' )
toggleElement('faq__header', 'faq__item--open' )
toggleElement('advantages__header', 'open' )