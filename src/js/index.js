 



const toggle = ( classBtn, classForToggle, toggleClass ) => {
    const toggleBtn = document.querySelector(`.${classBtn}`);
    const classToggle = document.querySelector(`.${classForToggle}`)

      if (!toggleBtn || !classToggle) {
            console.warn(`Element not found: ${classBtn} or ${classToggle}`);
            return;
        }
    
      toggleBtn.addEventListener('click', () => {
        classToggle.classList.toggle(toggleClass);
    })
      
}
toggle('dropdown__button', 'dropdown', 'open'  )
toggle('menu-nav', 'header__container', 'active'  )
toggle('hero__btn', 'hero__text-container', 'show'  )

// 

const toggleElement = (classBtn, classForToggle) => {
const btns = document.querySelectorAll(`.${classBtn}`)

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