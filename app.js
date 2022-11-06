const pop = document.querySelector("#pop");
const pop_input = document.querySelector("#pop-input");

const push = document.querySelector("#push");
const push_input = document.querySelector("#push-input");

const stack_container = document.querySelector(".stack-container");

push.addEventListener("click", addToStack);
push_input.addEventListener("keydown", addToStack);

pop.addEventListener("click", removeFromStack);
pop_input.addEventListener("keydown", removeFromStack);

function checkEnter(e) {
  if (e.code == "Enter" || e.code == "NumpadEnter") {
    return true;
  } else return false;
}

let index = 0;
function addToStack(e) {
  if (e.target.id == "push" || checkEnter(e)) {
    let val = push_input.value;
    console.log(val === "");
    if (val !== "") {
      let div = document.createElement("div");
      div.className = "values";
      div.innerText = val;
      div.setAttribute("value", index);
      index += 1;
      stack_container.appendChild(div);
      push_input.value = "";
    }
  }
}

const temp = document.querySelector(".temp-container");
const container = document.querySelector(".container");

function removeFromStack(e) {
  if (e.target.id == "pop" || checkEnter(e)) {
    let arr = document.querySelectorAll(".values");
    let pop_value = pop_input.value;
    let arr2 = Array.from(arr)
      .slice(parseInt(pop_value) + 1)
      .reverse();
    let delay = 0;

    if (pop_value !== "") {
      // ADDING TEMP CONTAINER
      temp.classList.remove("none");
      //   REMOVING FROM STACK
      arr2.forEach((elem) => {
        delay += 500;
        setTimeout(() => {
          elem.style.animation = "lift 0.5s ease";
          setTimeout(() => {
            //   CLONING NODE BEFORE DELETING
            a = elem.cloneNode(true);

            elem.remove();
          }, 480);

          // ADDING TO TEMP FROM STACK
          setTimeout(() => {
            a.style.animation = "drop 0.5s ease";
            temp.appendChild(a);
          }, 500);
        }, delay);
      });
      console.log(delay);

      setTimeout(() => {
        let present_stack = document.querySelector(".stack-container");

        last = present_stack.lastChild;
        last.style.animation = "delete 2s ease";
        // console.log(last);

        setTimeout(() => {
          last.remove();

          const present_temp = document.querySelector(".temp-container");
          temp_array = Array.from(
            present_temp.querySelectorAll(".values")
          ).reverse();

          let dela = 0;
          temp_array.forEach((temp_value) => {
            dela += 500;

            setTimeout(() => {
              temp_value.style.animation = "lift 0.5s ease";
              setTimeout(() => {
                x = temp_value.cloneNode(true);

                temp_value.remove();
              }, 480);

              setTimeout(() => {
                x.style.animation = "drop 0.5s ease";

                stack_container.appendChild(x);
              }, 500);
            }, dela);
          });
          console.log(dela);
        }, 1900);
      }, arr2.length * 700);

      setTimeout(() => {
        temp.style.animation = "fadeout 0.5s ease";

        setTimeout(() => {
          temp.classList.add("none");
        }, 480);
      }, arr2.length * 2 * 950);

      pop_input.value = "";
    } else if (pop_value === "") {
      stack_container.lastChild.style.animation = "lift 1s ease";

      setTimeout(() => {
        stack_container.lastChild.remove();
      }, 980);
    }
  }
}
