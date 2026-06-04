const leftOption = document.querySelector("#pricing-1262 #cs-option1-1262");
        const rightOption = document.querySelector("#pricing-1262 #cs-option2-1262");
        const toggle = document.querySelector("#pricing-1262 .cs-toggle");
        const cardGroup = Array.from(document.querySelectorAll('#pricing-1262 .cs-ul-wrapper'))
        // when you click the middle toggle
        toggle.addEventListener('click', (e) => { 
            for (const item of cardGroup) {
                item.classList.toggle("cs-active");
            }
            toggle.classList.toggle("active");
        });       
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