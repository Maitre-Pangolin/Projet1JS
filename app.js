(function () {
  //IIFE for variable scoping
  const selectedUser = document.querySelector("#selected-user");
  let lastSelected;
  const userList = document.querySelector("#user-list");

  fontList = [
    "Roboto",
    "Geneva",
    "Tahoma",
    "Verdana",
    "Kanit",
    '"Mate SC"',
    '"Sigmar One"',
    '"ZCOOL KuaiLe"',
  ];

  selectedUser.textContent = usernameGenerator();
  for (let i = 0; i < 6; i++) userCreate(); //

  document.querySelector("#add-user").addEventListener("click", () => {
    userCreate();
  });

  function userCreate() {
    const newUser = document.createElement("li");
    newUser.textContent = usernameGenerator();

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "x";
    deleteBtn.addEventListener("click", function () {
      // no arrow function need to bind this
      this.parentElement.remove();
    });
    newUser.appendChild(deleteBtn);
    newUser.classList.add("user");

    newUser.addEventListener("click", function ({ target }) {
      // Destructuring ==> explain
      if (target != this) return; // Return on span click
      if (lastSelected) lastSelected.classList.remove("user-selected");
      this.classList.add("user-selected");
      selectedUser.textContent = this.textContent.slice(0, -1); // Remove 'x' span
      lastSelected = this;
    });
    userList.appendChild(newUser);
  }

  let fontIndex = 0;
  document.querySelector("#new-font").addEventListener("click", () => {
    fontIndex = fontIndex == fontList.length - 1 ? 0 : (fontIndex += 1);
    const font = fontList[fontIndex];
    const fontHandle = document.querySelector("#font");

    selectedUser.style.fontFamily = font;
    fontHandle.style.fontFamily = font;
    fontHandle.textContent = `Font : ${font}`;
  });

  document.querySelector("#remove-list").addEventListener("click", () => {
    let users = [...userList.children]; // Spread operator ... Explain

    users.forEach((e, index) => {
      setTimeout(() => {
        setInterval(() => {
          e.classList.toggle("user-deletion");
        }, 100);
      }, (index - 1) * 500);

      setTimeout(() => {
        e.remove();
      }, index * 500);
    });
  });
})();

// TRANSITION

document.querySelector(".container").addEventListener("click", ({ target }) => {
  const text = document.querySelector("#move-indication");
  const mover = document.querySelector(".mover");
  switch (
    target.id // SWITCH ############
  ) {
    case "left":
      mover.style.left = "0";
      mover.style.transition = "1s linear";
      mover.style.backgroundColor = "#ef476f";
      text.textContent = "Linear Transition";
      break;

    case "right":
      mover.style.left = "calc(100% - 70px)";
      mover.style.transition = "1s ease";
      mover.style.backgroundColor = "#ffd166";
      text.textContent = "Ease Transition";
      break;

    case "top":
      mover.style.top = "0";
      mover.style.transition = "1s ease-in";
      mover.style.backgroundColor = "#06d6a0";
      mover.style.borderRadius = "0px";
      text.textContent = "Ease-in Transition";
      break;

    case "bottom":
      mover.style.top = "calc(100% - 70px)";
      mover.style.transition = "1s ease-out";
      mover.style.backgroundColor = "#118ab2";
      mover.style.borderRadius = "100%";
      text.textContent = "Ease-out Transition";

      break;
    default:
      break;
  }
});

// MOUSE PRESS / RELEASE BUTTON EFFECT

document.addEventListener("mousedown", ({ target }) => {
  if (target.tagName == "BUTTON") {
    target.style.boxShadow = "none";
  }
});

document.addEventListener("mouseup", ({ target }) => {
  if (target.tagName == "BUTTON") {
    const color = target.style.backgroundColor;
    target.style.boxShadow = `${color} 2px 2px`;
  }
});

// ############## Destroy Button  ##############

document.querySelector("header button").addEventListener("click", () => {
  let allElements = [...document.querySelectorAll("body *")];
  const maxHeight = Math.max(...allElements.map((e) => heightDOM(e)));
  const deletionTime = 1000;

  while (allElements.length > 0) {
    const elem = allElements.pop();
    setTimeout(() => {
      elem.innerHTML = "🔥";
      elem.style.textAlign = "center";
      elem.style.fontSize = "40px";
      elem.style.padding = "10px";
      setInterval(() => {
        elem.style.backgroundColor =
          elem.style.backgroundColor == "red" ? "white" : "red";
      }, 200);
    }, deletionTime * heightDOM(elem));
  }

  setTimeout(() => {
    document.body.innerHTML = "";
    const myimg = document.createElement("img");
    myimg.src = "https://i.gifer.com/5LSi.gif";
    myimg.addEventListener("click", () => window.location.reload());
    document.body.appendChild(myimg);
  }, deletionTime * (maxHeight + 1));

  function heightDOM(element) {
    // RECURSIVE FUNCTION TO RETRIEVE ELEMENT HEIGHT IN DOM TREE
    if (!element.childElementCount) return 0;

    max = -1;
    [...element.children].forEach((element) => {
      let level = heightDOM(element);
      if (level > max) max = level;
    });
    return max + 1;
  }
});
