//pop up images on hover
//pop up page that shows up when clicked on 
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navBurger = document.querySelector('.nav-burger-menu');

let toggle = false;

navToggle.addEventListener("click", () =>{
    if(toggle == false) {
        navBurger.style.display = "block";
        navBurger.ariaLabel = "nav bar";
        toggle = true;
    }
    else {
        navBurger.style.display = "none";
        toggle = false;
    }
})

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("modal-caption");
  const closeBtn = document.querySelector(".close");

  document.querySelectorAll(".gallery-pic img").forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.src;
      modalCaption.textContent = img.getAttribute("data-caption") || img.alt || "";
    });
  });
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };
  modal.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});

document.querySelector("#qualifying-list").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  alert(`${name} has entered qualifying`);
});