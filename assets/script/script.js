function pronounceWord(word) {
  // 1. নতুন একটি SpeechSynthesisUtterance অবজেক্ট বানানো হলো।
  const utterance = new SpeechSynthesisUtterance(word);

  // 2. কোন ভাষায় পড়বে সেটা ঠিক করা হলো।
  utterance.lang = "en-EN"; // English

  // 3. ব্রাউজারের speech engine দিয়ে শব্দটি বলা হলো।
  window.speechSynthesis.speak(utterance);
}





const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then((res) => res.json()) //promise of json Data
    .then((data) => displayLessons(data.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  // console.log(lessonButtons);
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      removeActive(); //remove all active class
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayLevelWord(json.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
                <div class="border border-sky-200 rounded-xl p-5 space-y-4">
                    <div>
                        <h2 class="text-2xl font-bold">${
                          word.word
                        } (<i class="fa-solid fa-microphone-lines"></i> : ${
    word.pronunciation
  })</h2>
                    </div>
                    <div>
                        <h2 class="font-bold">Meaning</h2>
                        <p class="font-bangla">${word.meaning} </p>
                    </div>
                    <div>
                        <h2 class="font-bold">Example</h2>
                        <p>${word.sentence} </p>
                    </div>
                    <div>
                        <h2 class="font-bold">Synonyms</h2>
                        <div>${createElements(word.synonyms)}
                        
                        
                        </div>
                    </div>
                    
                </div>
    `;
  document.getElementById("word_modal").showModal();
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
        <div class="text-center col-span-full py-10 space-y-5 font-bangla">
                <img src="./assets/alert-error.png" alt="" class="mx-auto">
                <p class="text-gray-500 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="text-4xl font-bold fon-bangla">নেক্সট Lesson এ যান</h1>
            </div>
        `;
    manageSpinner(false);
    return;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
                <h2 class="font-bold text-2xl">${
                  word.word ? word.word : "শব্দ পাওয়া যায়নি"
                }</h2>
                <p class="mt-3.5 font-semibold">Meaning / Pronunciation</p>
                <div class="font-bangla font-medium text-2xl">"${
                  word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
                } / ${
      word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"
    }"</div>
                <div class="flex justify-between items-center">
                    <button onclick="loadWordDetail(${
                      word.id
                    })" class="btn bg-[#1A91FF20] border-none hover:bg-[#1A91FF90]">
                        <i class="fa-solid fa-circle-info"></i>
                    </button>
                    <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF20] border-none hover:bg-[#1A91FF90]">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>

                </div>
            </div>
        `;
    wordContainer.append(card);
  });
  manageSpinner(false);
};

const displayLessons = (lessons) => {
  // 1.get the container & empty
  const levelContainer = document.getElementById("level-container");

  // 2. get into every lessons
  for (let lesson of lessons) {
    //     3. create Element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-right-from-bracket"></i> Lesson - ${lesson.level_no}</button>
        `;
    //     4. append into container
    levelContainer.append(btnDiv);
  }
};

loadLessons();

document.getElementById("btn-search").addEventListener("click", () => {
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);

  fetch("https://openapi.programming-hero.com/api/words/all")
  .then(res => res.json())
  .then(data => {
    const allWords = data.data;
    // console.log(allWords);

    const filterWords = allWords.filter((word) => word.word.toLowerCase().includes(searchValue));
    console.log(filterWords);
    displayLevelWord(filterWords);
});

});
