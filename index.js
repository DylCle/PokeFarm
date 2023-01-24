    let darkMode = localStorage.getItem(".dark-them");
    const icon = document.querySelector("#icon");




    const enableDarkMode = () => {
        document.body.classList.add("dark-them");
        localStorage.setItem(".dark-them", "enabled");
        icon.src = "sun.png";
    };
    const disableDarkMode = () => {
        document.body.classList.remove("dark-them");
        localStorage.setItem(".dark-them", null);
        icon.src = "darkmodetoogle.png";
    };

    if (darkMode === "enabled") {
        enableDarkMode();
    }

    

    icon.addEventListener("click", () => {

        darkMode = localStorage.getItem(".dark-them");
        if(darkMode !== "enabled"){
            enableDarkMode();
        }else {
            disableDarkMode();
        }
    });




