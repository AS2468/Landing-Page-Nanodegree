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

const ul = document.querySelector("#navbar__list");



/**
 * End Global Variables
 * Start Helper Functions
 *
 */

//create elements and assign some elements with attributes
const elementCreater = (element, attributes) => {
  const elementContainer = document.createElement(element);
  if(!(attributes == undefined)){
    const element_with_attributes = attributesCreater(elementContainer, attributes);
    return element_with_attributes;
  }else{
    return elementContainer;
  }

};

//help the elementcreater() by creating and setting attributes
const attributesCreater = (element_tag, attributesObj) => {
  if(!(attributesObj == undefined)){
    const attributes = Object.entries(attributesObj);
    for(let i=0; i < attributes.length; i++){
      const attr = document.createAttribute(attributes[i][0]);
      attr.value = attributes[i][1];
      element_tag.setAttributeNode(attr);
    }
  }
  return element_tag;
};


//add a class to a element
const add_class = (element_target, class_name) => {
  const section = document.querySelector(element_target.hash);
  section.classList.add(class_name);
};
//remove a class from a list of elements
const remove_class = (class_name) => {
  const sections = document.querySelectorAll("section");
  for (section of sections) {
    section.classList.remove(class_name);
  }
};

//find the y coordinates of the section element and return the value
const element_location = (element)=>{
  let bodyElem = document.body.getBoundingClientRect().top;
  let element_section = element.getBoundingClientRect().top;
  let area_offset = element_section - bodyElem;
  return area_offset; 
}

//show active links while scrolling 
const section_location_scrolling = ()=>{
  const section_elements = document.querySelectorAll("section");
  const section_top_points = [];
  for (section_element of section_elements){
    section_top_points.push(element_location(section_element));
  }
  return section_top_points;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *        
 */

// build the nav
const navElementsAdder = () => {
  const section = document.querySelectorAll("section");
  for (let i = 0; i < section.length; i++) {
    const liTag = elementCreater("li");
    const aTag = elementCreater("a", {"href": `#section${i + 1}`});
    aTag.className = "menu__link";
    aTag.textContent =`section ${i+1}`;
    liTag.appendChild(aTag);
    ul.appendChild(liTag);
  }
};
// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

//add section dynamically
const section_content = ()=>{
  const main = document.querySelector("main");
  const section_new = elementCreater("section", {"id":"section4", "data-nav":"section 4"});
  const div_new = elementCreater("div");
  const h2_new = elementCreater("h2");
  const p_new = elementCreater("p");
  div_new.className = "landing__container";
  h2_new.textContent = "Eggs, bacon and toast";
  p_new.textContent = `Preparation time: 5min. Difficulty: beginner.
  The breakfast of champions! Follow along to recreate this childhood staple, just like mom used to make it.</p>
How To Make It:
Step 1-
Preheat oven to 375 degrees. Lightly butter 6 standard muffin cups. With a rolling pin, flatten bread slices slightly and, with a 4 1/4-inch cookie cutter, cut into 8 rounds. Cut each round in half, then press 2 halves into each muffin cup, overlapping slightly and making sure bread comes up to edge of cup. Use extra bread to patch any gaps. Brush bread with remaining butter.
  
Step 2-
In a large skillet, cook bacon over medium, until almost crisp, 4 minutes, flipping once. (It will continue to cook in the oven.) Lay 1 bacon slice in each bread cup and crack an egg over each. Season with salt and pepper. Bake until egg whites are just set, 20 to 25 minutes. Run a small knife around cups to loosen toasts. Serve immediately.`

  div_new.appendChild(h2_new);
  div_new.appendChild(p_new);
  section_new.appendChild(div_new);
  main.appendChild(section_new);

}

//scroll to a section when menu links are clicked
const click_on_nav_link = (evt)=>{
  if(evt.target.className == "menu__link"){
    const section_element = document.querySelector(evt.target.hash)
    const section_top = element_location(section_element);
    window.scrollTo({top:section_top, behavior: "smooth"});
    remove_class("your-active-class");
    add_class(evt.target, "your-active-class");
  }
}

//while scroll change the background color for the menu links to green
const scroll_active_links = ()=>{
  const section_points = section_location_scrolling();
  for(let i = 0; i < section_points.length; i++){
    const links = document.querySelectorAll(".menu__link");
    if(window.scrollY >= section_points[i] && !(window.scrollY > section_points[i+1])){
      links[i].style.cssText = "background-color:#ac92ec; border-radius: 50px;";
    }else{
      links[i].style.cssText = "background-color: #34093F;";
    }
  }
}
/**
 * End Main Functions
 * Begin Events
 *
 */

 //load the section content function first (in the capture phase)
window.addEventListener("DOMContentLoaded", section_content,true);
//load the navElementAdder function second in the bubbling phase
window.addEventListener("DOMContentLoaded", navElementsAdder);
// Scroll to section on link click
document.addEventListener('click', click_on_nav_link);
//listen for a scroll event
window.addEventListener("scroll", scroll_active_links);
