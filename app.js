/**********Navbar************/
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navbar-links");

hamburger.addEventListener("click", mobileMenu);
function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}
const navLink = document.querySelectorAll(".navbar-links");
navLink.forEach(n => n.addEventListener("click", closeMenu));
function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

/*****Scrolling action button**********/
window.addEventListener('scroll', function() {
    var floatingButton = document.getElementById('floatingButton');
    var scrollThreshold = 300; 
    
    if (window.pageYOffset > scrollThreshold) {
      floatingButton.style.bottom = '5rem'; 
      floatingButton.style.opacity = '1'; 
    } else {
      floatingButton.style.bottom = '-60rem'; 
    }
});

/*********GSAP and ScrollTrigger************/
gsap.registerPlugin(ScrollTrigger);
gsap.from(".navbar .logo",{
  opacity:0,
  stagger:0.1,
  duration:1,
  ease:Power3.easeInOut,
})
gsap.from(".navbar ul li a",{
  opacity:0,
  stagger:0.1,
  duration:1,
  delay:0.1,
  ease:Power3.easeInOut,
})
gsap.from(".homepage-container",{
  opacity:0,
  x:100,
  duration:1,
  ease:Power3.easeInOut,
})
gsap.from(".homepage-container h1",{
  opacity:0,
  y:100,
  duration:1,
  ease:Power3.easeInOut,
})
gsap.from(".homepage-container p",{
  opacity:0,
  y:100,
  delay:0.5,
  duration:1,
  ease:Power3.easeInOut,
})


/**********Form Validation***************/
function validateForm() {
  var name = document.getElementById("name").value;
  var phone = document.getElementById("mobile").value;

  if (name.trim() === "") {
    alert("Name is required");
    return false;
  }
  if (!phone.match(/^\d{10}$/)) {
    alert("Invalid phone number. Please enter a 10-digit number without spaces or dashes.");
    return false;
  }
  return true;
}

/***********Scroll Effect******************/
window.addEventListener('scroll', reveal);
function reveal(){
  var reveals = document.querySelectorAll('.reveal');

  for(var i = 0; i < reveals.length; i++){

    var windowheight = window.innerHeight;
    var revealtop = reveals[i].getBoundingClientRect().top;
    var revealpoint = 150;

    if(revealtop < windowheight - revealpoint){
      reveals[i].classList.add('active');
    }
    else{
      reveals[i].classList.remove('active');
    }
  }
}

/*********Google Form Script************/
const scriptURL =
"https://script.google.com/macros/s/AKfycbwbu8FUsVkDQECCyjIR6qZUZfHqUIMNdFrlxRANodo_MAbRlXkHb6VmZ1a3kgsgnHo5/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");
const sub = document.querySelector("#submit")
sub.addEventListener("click",()=>{
    msg.innerHTML = "YOUR MESSAGE IS BEING PROCESSED";
})
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateForm()) {
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        msg.innerHTML = "MESSAGE SENT SUCCESSFUL";
        msg.style.marginBottom = "1rem";
        setTimeout(function () {
          msg.innerHTML = "";
        }, 5000);
      })
      .catch((error) => console.error("Error!", error.message));

    form.reset();
  }
});
