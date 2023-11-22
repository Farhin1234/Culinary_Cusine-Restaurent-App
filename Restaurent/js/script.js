let loginForm = document.querySelector(".login-form");

document.querySelector("#login-btn").onclick = () => {
  loginForm.classList.toggle("active");
  navbar.classList.remove("active");
};

let navbar = document.querySelector(".navbar");
window.onscroll = () => {
  loginForm.classList.remove("active");
  navbar.classList.remove("active");
};
document.getElementById("orderNowBtn").addEventListener("click", function () {
  window.location.href = "menu.html";
});
