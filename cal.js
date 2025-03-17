let numb1 = document.querySelectorAll(".btn");
let numb2 = document.querySelector(".btn");
let opretor = document.querySelector(".btn");
let result = document.querySelector("#display");



function handleEvent(event) {
    if (event.type === 'click') {
        if (event.target.innerText === "Backspace" || 
            event.target.innerText === "C" || 
            event.target.id === "X" || 
            event.target.innerText === "CE") {
            result.innerHTML = "";  // Clear the display if any of the special keys is pressed
        } else {
            result.innerHTML += event.target.innerText;
        }
    } else if (event.type === 'keydown') {
        if (event.key === "Backspace") {
            result.innerHTML = "";  // Clear the display if backspace is pressed
        } else {
            result.innerHTML += event.key;  // Show the key pressed
        }
    } 
  }


numb1.forEach((btn) => {
    btn.addEventListener("click", handleEvent);
});

document.addEventListener("keydown", handleEvent);

numb2.forEach((btn) => {
    btn.addEventListener("click", handleEvent);
});

opretor.forEach((btn) => {
    btn.addEventListener("click", handleEvent);
});

/*numb2.forEach((btn) => {
    btn.addEventListener("click", function() {
        document.getElementById("display").innerHTML = btn.innerText;
    });
});

opretor.forEach((btn) => {
    btn.addEventListener("click", function() {
        document.getElementById("display").innerHTML = btn.innerText;
    });
});*/

function sumNumbers(numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
  }

  



