let nextPic = document.querySelector("#next");

let picture = document.querySelector("a");

let backPic = document.querySelector("#back");

nextPic.addEventListener("click", () => {
  document.getElementById("next").style.display = "none";
  document.getElementById("back").style.display = "block";
  picture.innerHTML = `<img class="project" id="pic2" src="./Pic/2.png" alt="project"><p class="project-title">
            <span class="code">
                < </span>
                    App UI Design
                    <span class="code"> /> </span>
        </p>`;
  document.querySelector(".others").innerHTML = "BACK";
});

backPic.addEventListener("click", () => {
  document.getElementById("next").style.display = "block";
  document.getElementById("back").style.display = "none";
  picture.innerHTML = `<img class="project" id="pic1" src="./Pic/1.png" alt="project"><p class="project-title">
            <span class="code">
                < </span>
                    App UI Design
                    <span class="code"> /> </span>
        </p>`;
  document.querySelector(".others").innerHTML = "NEXT";
});
