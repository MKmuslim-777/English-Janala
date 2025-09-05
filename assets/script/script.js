

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then(res => res.json()) //promise of json Data
    .then(data => displayLessons(data.data))
};


const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(json => displayLevelWord(json.data))
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if(words.length == 0){
        wordContainer.innerHTML = `
        <div class="text-center col-span-full py-10 space-y-5 font-bangla">
                <img src="./assets/alert-error.png" alt="" class="mx-auto">
                <p class="text-gray-500 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="text-4xl font-bold fon-bangla">নেক্সট Lesson এ যান</h1>
            </div>
        `;
        return;
    }

    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
                <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
                <p class="mt-3.5 font-semibold">Meaning / Pronunciation</p>
                <div class="font-bangla font-medium text-2xl">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"}"</div>
                <div class="flex justify-between items-center">
                    <button class="btn bg-[#1A91FF20] border-none hover:bg-[#1A91FF90]">
                        <i class="fa-solid fa-circle-info"></i>
                    </button>
                    <button class="btn bg-[#1A91FF20] border-none hover:bg-[#1A91FF90]">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>

                </div>
            </div>
        `
        wordContainer.append(card)
    });
}

const displayLessons = (lessons) => {
    // 1.get the container & empty
    const levelContainer = document.getElementById("level-container")

    // 2. get into every lessons 
    for(let lesson of lessons){
        //     3. create Element 
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-right-from-bracket"></i> Lesson - ${lesson.level_no}</button>
        `
        //     4. append into container
        levelContainer.append(btnDiv)
    }
};





loadLessons()


