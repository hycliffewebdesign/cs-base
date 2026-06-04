const leftOption = document.querySelector("#pricing-2062 #cs-option1-2062");
    const rightOption = document.querySelector("#pricing-2062 #cs-option2-2062");
    const toggle = document.querySelector("#pricing-2062 .cs-toggle-group");
    const cardGroup = Array.from(document.querySelectorAll('#pricing-2062 .cs-ul-wrapper'));

    // when you click the left button option
    leftOption.addEventListener('click', (e) => {
        for (const item of cardGroup) {
            item.classList.remove("cs-active");
        }
        toggle.classList.remove("active");
    });
    // when you click the right button option
    rightOption.addEventListener('click', (e) => {
        for (const item of cardGroup) {
            item.classList.add("cs-active");
        }
        toggle.classList.add("active");
    });