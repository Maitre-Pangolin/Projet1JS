(function () {
  const selectedUser = document.querySelector("#selected-user");
  let lastSelected;
  const userList = document.querySelector("#user-list");
  const userInput = document.querySelector("input");

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

  document.querySelector("#add-user").addEventListener("click", () => {
    userCreate();
  });

  document.querySelector("#new-style").addEventListener("click", () => {
    const index = fontList.indexOf(selectedUser.style.fontFamily) + 1;
    const font = fontList[index >= fontList.length ? 0 : index];
    const fontHandle = document.querySelector("#font");

    selectedUser.style.fontFamily = font;
    fontHandle.style.fontFamily = font;
    fontHandle.textContent = `Font : ${font}`;
  });

  document.querySelector("#remove-list").addEventListener("click", () => {
    let users = [...userList.children];

    users.forEach((e, index) => {
      setTimeout(() => {
        setInterval(() => {
          e.classList.toggle("user-deletion");
        }, 100);
      }, (index - 1) * 500);

      setTimeout(() => {
        e.remove();
      }, index * 500);
      console.log(e);
    });
  });

  function userCreate() {
    const newUser = document.createElement("li");
    newUser.textContent = usernameGenerator();

    const test = document.createElement("span");
    test.textContent = "x";
    test.addEventListener("click", function () {
      this.parentElement.remove();
    });
    newUser.appendChild(test);
    newUser.classList.add("user");

    newUser.addEventListener("click", function ({ target }) {
      if (target != this) return;
      if (lastSelected) lastSelected.classList.remove("user-selected");
      this.classList.add("user-selected");
      selectedUser.textContent = this.textContent.slice(0, -1);
      lastSelected = this;
    });
    userList.appendChild(newUser);
  }

  selectedUser.textContent = usernameGenerator();
  for (let i = 0; i < 6; i++) userCreate(); // FOR ###########
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

// Destroy Button

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
    if (!element.childElementCount) return 0;

    max = -1;
    [...element.children].forEach((element) => {
      let level = heightDOM(element);
      if (level > max) max = level;
    });
    return max + 1;
  }
});

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
