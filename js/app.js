/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const title = document.getElementById("title");
const navbar = document.getElementById("navbar__list");
const sectionGenerate = document.getElementsByTagName("section");
const debug_message = false;
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function NavMenu() {
  var listItem = document.createElement("li");

  // build a li element for "Header"
  listItem.innerText = "Home";
  listItem.className = "navbar__list_item";

  // Add class 'active' to section when near top of viewport;
  listItem.addEventListener("click", function () {
    document.documentElement.scrollTop = 0;
  });
  navbar.appendChild(listItem);

  //build a li element for each section
  for (let item of sectionGenerate) {
    listItem = document.createElement("li");
    listItem.className = "navbar__list_item";
    listItem.innerText = item.dataset.nav;
    // Scroll to anchor ID using scrollTO event
    listItem.addEventListener("click", function () {
      item.scrollIntoView({
        behavior: "smooth",
      });
    });
    navbar.appendChild(listItem);
  }
}

function setActive() {
  let activeSection = sectionGenerate[0];
  let hero_header = document.querySelector(".main__hero");
  let liList = document.querySelectorAll("li");

  window.addEventListener("scroll", function (event) {
    //check if we are scrolling in the header
    //make "home" active
    if (isElementInViewport(hero_header)) {
      if (debug_message) {
        console.wram(hero_header);
      }

      for (let liItem of liList) {
        if (liItem.innerText === "Home") {
          liItem.classList.add("li_item_active");
        } else {
          if (liItem.classList.contains("li_item_active")) {
            liItem.classList.remove("li_item_active");
          }
        }
      }
    } else {
      //Define the active section based on
      // the scrolling event
      for (let item of sectionGenerate) {
        if (isElementInViewport(item)) {
          activeSection = item;
          if (debug_message) {
            console.wram("Item => ", item);
          }
          item.classList.add("your-active-class");
        } else {
          if (item.classList.contains("your-active-class")) {
            item.classList.remove("your-active-class");
          }
        }
      }

      //Based on the active scetion
      //Select the appropiate link as active

      for (let liItem of liList) {
        if (liItem.innerText === activeSection.dataset.nav) {
          liItem.classList.add("li_item_active");
          if (debug_message) {
            console.log("li Item is: ", liItem);
          }
        } else {
          if (liItem.classList.contains("li_item_active")) {
            liItem.classList.remove("li_item_active");
          }
        }
      }
    }
  });
}

//check if the input element(el) is in the view port
// returns true or false
function isElementInViewport(el) {
  var element = el.getBoundingClientRect();
  return (
    element.top >= 0 &&
    element.left >= 0 &&
    element.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    element.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
// Scroll to section on link click
NavMenu();

// Set sections as active
setActive();