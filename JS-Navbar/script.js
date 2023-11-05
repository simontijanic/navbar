/*const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header ul li a");

window.addEventListener("scroll", () => {
  let current = "";

  for (const section of sections) {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  }

  for (const link of navLinks) {
    link.classList.remove("active");
    if (link.classList.contains(current)) {
      link.classList.add("active");
    }
  }
});
 */

// MODERN

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header ul li a');

const sectionIndexMap = new Map(); //assosiere individuel section element med sitt index
// innen sections array

const intersectingArray = new Array(sections.length).fill(false); // likt som sections array
// fylt med false values og hver array er lik en section og brukes til å holde track av
// om en spesifikk section er nåværende intersecting (synlig) i viewporten

for (let i = 0; i < sections.length; ++i) {
  sectionIndexMap.set(sections[i], i); // looper gjennom og setter hver sections til en index i map
}


function updateActive() {
  for (const link of navLinks) {
    link.classList.remove('active'); // fjerner klasse fra alle links
  }

  for (let i = 0; i < sections.length; ++i) { //looper gjennom sections length og derreter =>
    if (intersectingArray[i] === true) {  // sjekker om den indexen i array er true
      navLinks[i].classList.add('active'); //adder active klasse
      // stop looking through array when first one found
      break;
    }
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        intersectingArray[sectionIndexMap.get(entry.target)] = true;
        console.log("First", entry.target, "Second", sectionIndexMap, "Third",intersectingArray);
      } else {
        intersectingArray[sectionIndexMap.get(entry.target)] = false;
      }
    }
    /**
     Dette funker sånn her: callback funksjonen observer får en array som er entries som inneholder
     informasjon om elementer som har gått inn og ut av viewporten. for.. of loop
     leter gjennom hver eneste entry og sjekker om den intersecter viewporten med å sjekke
     at propertien er true når den er i viewport og false npr den ikke er.
     */
    updateActive();
  },
  // -92px from top of page because this is how large the header is
  { rootMargin: '-92px 0px 0px 0px' }
);

sections.forEach((section) => {
  observer.observe(section);
});

//sections[i] <=> navLinks[i] <=> intersectingArray[i]

/**
 Oppsumert så bruker koden parallel arrays  (sections, navLinks, and intersectingArray)
 hvor hvert element på samme tid korresponderer til hverandre. Når en sekjson er i view
 vil koden update intersectingArray og updateActive legger till aktiv klass.
Det viktigste konseptet her er at hvert element i disse tre arryanesa på samme indeks
er relatert til hverandre. Sections[0] svarer til første del på nettsiden, navlinks[0]
svarer til første lenken som fører til første delen og intersectingArray[0] represeterer om den
flrste delen er synlig for øyeblikket (false, true f.eks)
 */
