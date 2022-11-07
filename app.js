const pop = document.querySelector("#pop");
const pop_input = document.querySelector("#pop-input");

const push = document.querySelector("#push");
const push_input = document.querySelector("#push-input");

const stack_container = document.querySelector(".stack-container");

push.addEventListener("click", addToStack);
push_input.addEventListener("keydown", addToStack);

pop.addEventListener("click", removeFromStack);
pop_input.addEventListener("keydown", removeFromStack);

// document.addEventListener("keydown", (e) => {
//   stack_container.innerText+=e.code
// })
// CHECKING ENTER KEY
function checkEnter(e) {
  if (e.code == "Enter" || e.code == "NumpadEnter" || e.keyCode === 13) {

    return true;
  } else return false;
}
// PUSH OPERATION
let index = 0;
function addToStack(e) {
  if (e.target.id == "push" || checkEnter(e)) {
    let entered_value = push_input.value;
    let multiple_values
    if (entered_value.includes(",")) {
       multiple_values = entered_value.split(",")
    } else {
      
       multiple_values = entered_value.split(" ")
    }
    
    async function delayInserting() {
  
    for (let val of multiple_values) {
      await new Promise(resolve => {

          
        if (val !== "") {
          let div = document.createElement("div");
          div.className = "values";
          div.innerText = val;
          div.setAttribute("value", index);
          index += 1;
          stack_container.appendChild(div);
          push_input.value = "";
        }
        resolve()
      })
        await new Promise (resolve=> {
          setTimeout(() => {
            resolve()
          }, 500);
        }
      )
    }


    }
    delayInserting()

  }
}

// POP OPERATION
const temp = document.querySelector(".temp-container");
const container = document.querySelector(".container");

function removeFromStack(e) {
  if (e.target.id == "pop" || checkEnter(e)) {
    let arr = Array.from(document.querySelectorAll(".values"));
    let pop_value = pop_input.value;
    let arr2 = arr.slice(parseInt(pop_value) + 1).reverse();
    let valueToBeDeleted = arr[parseInt(pop_value)]
valueToBeDeleted.style.setProperty("background-color","#eed202")
    let delay = 0;

    if (pop_value !== "") {
      // ADDING TEMP CONTAINER
      temp.classList.remove("none");
      //   REMOVING FROM STACK
      async function movingToTemp() {
        // REMOVING FROM STACK AND ADDING TO TEMP

        for (let elem of arr2) {
          await new Promise((resolve) => {
            elem.style.animation = "lift 0.5s ease";
            resolve();
          });

          await new Promise((resolve) => {
            a = elem.cloneNode(true);
            resolve();
          });

          await new Promise((resolve) => {
            a.style.animation = "drop 0.5s ease";
            resolve();
          });

          await temp.appendChild(a);

          await new Promise((resolve) => {
            setTimeout(() => {
              elem.remove();

              resolve();
            }, 480);
          });
        }

        let present_stack = document.querySelector(".stack-container");
        let last = present_stack.lastChild;
        last.style.animation = "delete 2s ease";

        // DELETING VALUE
        await new Promise((resolve) => {
          setTimeout(() => {
            last.remove();

            resolve();
          }, 1950);
        });

        // REMOVING FROM TEMP AND ADDING TO STACK
        const present_temp = document.querySelector(".temp-container");
        temp_array = Array.from(
          present_temp.querySelectorAll(".values")
        ).reverse();

        for (let temp_value of temp_array) {
          await new Promise((resolve) => {
            temp_value.style.animation = "lift 0.5s ease";
            resolve();
          });

          await new Promise((resolve) => {
            x = temp_value.cloneNode(true);
            resolve();
          });

          await new Promise((resolve) => {
            x.style.animation = "drop 0.5s ease";
            resolve();
          });

          await stack_container.appendChild(x);

          await new Promise((resolve) => {
            setTimeout(() => {
              temp_value.remove();

              resolve();
            }, 480);
          });
        }

        // REMOVING TEMP CONTAINER
        temp.style.animation = "fadeout 0.5s ease";

        await new Promise((resolve) => {
          setTimeout(() => {
            temp.classList.add("none");
            resolve();
          }, 480);
        });

        pop_input.value = "";
      }
      movingToTemp();
    }
    
    else if (pop_value === "") {
      stack_container.lastChild.style.animation = "lift 1s ease";

      setTimeout(() => {
        stack_container.lastChild.remove();
      }, 980);
    }
  }
}
