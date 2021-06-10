(function () {
  const myChars = Array.from("Made with 💙 by Martin Wasselet"); // Array from better than split() for emoji support (UTF16)
  const container = document.querySelector("#about-container");
  const delayBtwLetter = 0.4;
  let timer = -delayBtwLetter;
  const timers = myChars.map((e) => {
    if (e !== " ") timer += delayBtwLetter;
    return timer;
  });

  myChars.forEach((char, index) => {
    const div = document.createElement("h1");
    div.textContent = char;
    container.appendChild(div);

    setInterval(
      (function upDown() {
        setTimeout(() => {
          div.classList.toggle("testclass");
        }, 500 * timers[index]);
        setTimeout(() => {
          div.classList.toggle("testclass");
        }, 500 * (timers[index] + 1));
        return upDown;
      })(), //Immediate first invokation
      8000
    );
  });
})();
