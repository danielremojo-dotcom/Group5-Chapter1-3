
const pagesContent = [

`Hai Zoe,

I’ll skip the formalities and just say hi.

I made this because I wanted to say thank you. It is something small, but I put time into it because I think you deserve that much.

Over the past few months, I realized that spending time with you is something I genuinely appreciate. Not in a big dramatic way, just in the kind of way that makes normal days feel a little better.`,



`Even the little things stand out to me.

Our random chats on Discord, watching movies or series together, or just walking you home. Those moments might seem simple, but they meant more than I probably said at the time.

They gave me something to look forward to, even on days that felt pretty average.



I remember you once asked me what attributes I liked about you.`,

`I think one of the things I admire most is how easily you get along with people. You make conversations feel natural. Your laugh is easy to recognize, and it makes things feel lighter without you even trying.

Also those small things, like waving at kids when they look at you. That kind of thing says a lot about who you are.



I also appreciate how comfortable things feel when I am around you.`,

`There is no pressure to act different or try too hard. I can just be normal, and that is enough. That kind of comfort is rare, and I do not take it for granted.



And it is not just about the moments themselves.

It is the way those moments stay with me after. A short conversation, a random joke, or even just sitting quietly somehow ends up being something I remember later on.`,

`That is what made me realize I should probably say thank you properly.



I did not make this for any big reason.

I just thought instead of saying thanks in a usual way, I would do something a bit more thoughtful. Something you could look at and know that the time we spent was appreciated.`,



`So yeah, this is just me saying thank you.

For the time, the conversations, the random moments, and the memories that came with them. They might seem small, but they mattered to me more than you probably noticed.


I am not expecting anything from this. I just wanted to make something small that shows I appreciate you and everything you bring into the moments we share.`,



`Anyway,

thank you for being you, and for being someone who makes ordinary days feel a little less ordinary.

That is all

Yours truly,
Marck.`

];

let currentPageIndex = 0;
let typedPages = [];
let typingInProgress = false;

const bgMusic = document.getElementById("bgMusic");
const pageFlipSound = document.getElementById("pageFlip");

function playAudio(audio) {
  audio.currentTime = 0;
  audio.play().catch(err => console.log("Audio blocked:", err));
}

function showLetter() {
  const intro = document.getElementById("introText");
  const btn = document.getElementById("readBtn");

  btn.disabled = true;

  document.body.classList.add("blur-active");

  intro.classList.add("fade-out");
  btn.classList.add("fade-out");

  bgMusic.volume = 0;
  bgMusic.play().then(() => {
    let vol = 0;
    const fadeIn = setInterval(() => {
      if (vol < 0.5) { // max volume
        vol += 0.01;
        bgMusic.volume = vol;
      } else {
        clearInterval(fadeIn);
      }
    }, 100);
  }).catch(err => console.log("Audio play blocked:", err));

  setTimeout(() => {
    intro.style.display = "none";
    btn.style.display = "none";
    document.getElementById("controls").style.display = "block";

    renderAllPages();
    showPage(0);
  }, 600);
}

function renderAllPages() {
  const book = document.getElementById("book");
  book.innerHTML = "";

  pagesContent.forEach((content) => {
    const page = document.createElement("div");
    page.className = "page front";
    page.style.opacity = 0;
    page.style.transform = "translateY(50px) scale(0.95)";
    page.innerHTML = `<p class="text"></p>`;
    book.appendChild(page);
  });
}

function showPage(index) {
  const pages = document.querySelectorAll(".page.front");

  pages.forEach((p, i) => {
    p.style.zIndex = pages.length - i;
    if (i !== index) {
      p.style.opacity = 0;
      p.style.transform = "translateY(50px) scale(0.95)";
    }
  });

  const page = pages[index];

  page.style.transition = "none";
  page.style.opacity = 0;
  page.style.transform = "translateY(50px) scale(0.95)";
  page.getBoundingClientRect();

  page.style.transition = "all 0.8s ease";
  page.style.opacity = 1;
  page.style.transform = "translateY(0) scale(1)";

  currentPageIndex = index;
  typePage(index);
}

function typePage(index) {
  const pages = document.querySelectorAll(".page.front");
  const page = pages[index];
  const textEl = page.querySelector(".text");

  if (typedPages[index]) {
    // Replace newlines with <br> so line breaks show correctly
    textEl.innerHTML = pagesContent[index].replace(/\n/g, "<br>");
    return;
  }

  typingInProgress = true;
  const fullText = pagesContent[index].replace(/\n/g, "<br>");
  let i = 0;

  function type() {
    if (i < fullText.length) {
      textEl.innerHTML = fullText.substring(0, i) + '<span class="cursor"></span>';

      let delay = 20;
      if (fullText.substring(i, i+3) === "...") delay = 120;

      i++;
      setTimeout(type, delay);
    } else {
      textEl.innerHTML = fullText;
      typedPages[index] = true;
      typingInProgress = false;
    }
  }

  type();
}

function finishTyping(index) {
  const pages = document.querySelectorAll(".page.front");
  const textEl = pages[index].querySelector(".text");

  textEl.innerHTML = pagesContent[index].replace(/\n/g, "<br>");
  typedPages[index] = true;
  typingInProgress = false;
}
function nextPage() {
  if (currentPageIndex < pagesContent.length - 1) {

    if (typingInProgress) {
      finishTyping(currentPageIndex);
      return;
    }

    flipPage(currentPageIndex + 1, -180);
  }
}

function prevPage() {
  if (currentPageIndex > 0) {

    if (typingInProgress) {
      finishTyping(currentPageIndex);
      return;
    }

    flipPage(currentPageIndex - 1, 180);
  }
}

function flipPage(targetIndex, rotateDeg) {
  const pages = document.querySelectorAll(".page.front");
  const current = pages[currentPageIndex];
  const next = pages[targetIndex];

  playAudio(pageFlipSound);

  current.style.transform = `rotateY(${rotateDeg}deg)`;
  current.style.opacity = 0;

  setTimeout(() => {
    current.style.transform = "rotateY(0deg)";
    showPage(targetIndex);
  }, 400);
}

bgMusic.volume = 0;

function fadeMusic() {
  bgMusic.play();
  let vol = 0;

  const fadeIn = setInterval(() => {
    if (vol < 0.5) {
      vol += 0.01;
      bgMusic.volume = vol;
    } else {
      clearInterval(fadeIn);
    }
  }, 100);
}