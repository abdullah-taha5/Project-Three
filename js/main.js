// Explore button
let exploreBtn = document.querySelector('.title .btn'),
    hadithSection = document.querySelector('.hadith');
exploreBtn.addEventListener('click', function() {
    hadithSection.scrollIntoView({behavior: 'smooth'})
})


let fixedNav = document.querySelector('.header'),
    scrollBtn =  document.querySelector('.scroll-btn');
window.addEventListener("scroll", function() {
    if (window.scrollY > 100) {
        fixedNav.classList.add('active');
    } else {
        fixedNav.classList.remove('active');  
    }

    if (window.scrollY > 500) {
        scrollBtn.classList.add('active');
    } else {
        scrollBtn.classList.remove('active');
    }
});
scrollBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
});



// hadith section
let hadithContainer = document.querySelector('.hadith-container'),
    next = document.querySelector('.buttons .next'),
    prev = document.querySelector('.buttons .prev'),
    number = document.querySelector('.buttons .number'),
    hadithIndex = 0;

hadithChanger();
function hadithChanger() {
    fetch("https://api.hadith.sutanlab.id/books/muslim?range=1-300")
    .then(Response => Response.json())
    .then(data =>{
        let hadiths = data.data.hadiths;
        changeHadith();
        next.addEventListener('click', function() {
            if (hadithIndex == 299) {
                hadithIndex = 0;
            } else {
                hadithIndex++;
            }
            changeHadith();
        })
        prev.addEventListener('click', function() {
            if (hadithIndex == 0) {
                hadithIndex = 299;
            } else {
                hadithIndex--;
            }
            changeHadith();
        })
        function changeHadith() {
            hadithContainer.innerText = hadiths[hadithIndex].arab + " .";
            number.innerText = `300 - ${hadithIndex + 1}`;
        }
    })
};



// link sections

let sections = document.querySelectorAll("section"),
    links = document.querySelectorAll(".header ul li");

links.forEach(link =>{
    link.addEventListener('click', function() {
        let target = link.dataset.filter;
        sections.forEach(section =>{
            if (section.classList.contains(target)) {
                section.scrollIntoView({behavior:'smooth'});
            }
        })
        
    })
});



// Quran section
let surahsContainer = document.querySelector(".surhas-container");
getSurahs();
function getSurahs() {
    // fetch("http://api.alquran.cloud/v1/meta")
    fetch("meta.json")
    .then(Response => Response.json())
    .then(data =>{
        let surahs = data.data.surahs.references;
        let numberOfSurahs = 114;
        for (let i = 0; i < numberOfSurahs; i++) {
           
            surahsContainer.innerHTML += `
            <div class="surah">
                <p>${surahs[i].name}</p>    
                <p>${surahs[i].englishName}</p>
           </div>
           `
        }
        let surahsTitels = document.querySelectorAll('.surah');
        let    popup = document.querySelector('.surah-popup'),
            ayatContainer = document.querySelector('.ayat');
            
            surahsTitels.forEach((title, index)=>{
                title.addEventListener('click', function() {
                    fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
                    .then(Response => Response.json())
                    .then(data =>{
                        ayatContainer.innerHTML = "";
                        let ayat = data.data.ayahs;
                        ayat.forEach(aya =>{
                            popup.classList.add('active');
                            ayatContainer.innerHTML += `
                            <p>(${aya.numberInSurah}) - ${aya.text}</p>
                            `
                        })
                    })
                })
            })
            let closePopup = document.querySelector('.close-popup');
            closePopup.addEventListener('click', function() {
                popup.classList.remove('active');
            })
    })
};




// pray time section

let cards = document.querySelector('.cards');
getPrayTimes();
function getPrayTimes() {
    // fetch("http://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8")
    fetch("timingsByCity.json")
    .then(Response => Response.json())
    .then(data =>{
        
        let times = data.data.timings;
        cards.innerHTML = "";
        for (let time in times) {
            cards.innerHTML +=
            `
                <div class="card">
                    <div class="circle">
                        <svg>
                            <Circle cx="100" cy="100" r="100"></Circle>
                        </svg>
                        <div class="pray-time">${times[time]}</div>
                    </div>
                  <p>${time}</p>
                </div>
            `
        }
    })
}



// Active Sidebar

let bars = document.querySelector('.bars'),
    sidebar = document.querySelector('.header ul');

bars.addEventListener('click', function() {
    sidebar.classList.toggle('active');
});