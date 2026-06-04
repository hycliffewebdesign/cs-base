const leftOption = document.querySelector("#pricing-1385 #cs-option1-1385");
        const rightOption = document.querySelector("#pricing-1385 #cs-option2-1385");
        const toggle = document.querySelector("#pricing-1385 .cs-toggle");
        const cardGroup = Array.from(document.querySelectorAll('#pricing-1385 .cs-card-group'))
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