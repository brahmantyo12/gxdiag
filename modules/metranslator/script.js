// --- GLOBAL VARIABLES ---
let db = {};
let isLoaded = false;

// --- DATABASE KUTIPAN LORE (Sama seperti sebelumnya) ---
const loreQuotes = {
    'sindarin': [
        { text: "The stars shine upon the hour of our meeting", character: "Gildor Inglorion", source: "The Fellowship of the Ring", trivia: "Salam tradisional High Elves." },
        { text: "Speak friend and enter", character: "Narvi", source: "LOTR: Fellowship", trivia: "Kata sandi Pintu Durin di Moria." },
        { text: "I will go alone", character: "Frodo", source: "LOTR: Fellowship", trivia: "Keputusan Frodo di Amon Hen." }
    ],
    'quenya': [
        { text: "Hail Earendil brightest of angels", character: "Frodo", source: "The Two Towers", trivia: "Doa menggunakan Phial of Galadriel." },
        { text: "Now is the hour", character: "Théoden", source: "Return of the King", trivia: "Momen sebelum pertempuran." }
    ],
    'khuzdul': [
        { text: "Axes of the Dwarves", character: "Gimli", source: "The Two Towers", trivia: "Teriakan perang di Helm's Deep." },
        { text: "The Dwarves are upon you", character: "Dain", source: "The Hobbit", trivia: "Pasukan Iron Hills menyerang." }
    ],
    'blackspeech': [
        { text: "One Ring to rule them all", character: "Sauron", source: "The One Ring", trivia: "Puisi cincin baris pertama." },
        { text: "Meat is back on the menu", character: "Uglúk", source: "The Two Towers", trivia: "Uruk-hai yang kelaparan." }
    ],
    'rohirric': [
        { text: "The king is here", character: "Éomer", source: "Return of the King", trivia: "Kedatangan harapan." },
        { text: "Arise riders of Theoden", character: "Théoden", source: "Return of the King", trivia: "Pidato Pelennor Fields." }
    ],
    'en': [
        { text: "You shall not pass", character: "Gandalf", source: "Fellowship", trivia: "Menahan Balrog." },
        { text: "My precious", character: "Gollum", source: "LOTR", trivia: "Obsesi terhadap Cincin." }
    ]
};

// --- 1. LOAD DATA DATABASE ---
fetch('data.json')
    .then(res => res.json())
    .then(data => {
        db = data;
        isLoaded = true;
        document.getElementById('status').innerText = "Archives Loaded.";
        updateTheme();
    })
    .catch(err => {
        console.error(err);
        document.getElementById('status').innerText = "Error loading data.json";
    });

// --- 2. UI LOGIC (Theme, Particles, Swap) ---
function updateTheme() {
    const target = document.getElementById('targetLang').value;
    document.body.className = `theme-${target}`;
    initParticles(target);
}

function initParticles(race) {
    const container = document.getElementById('particles');
    container.innerHTML = ""; 
    let type = 'star'; let color = 'white'; let count = 40;

    if (race === 'khuzdul') { type = 'dust'; color = '#cd7f32'; count = 30; }
    else if (race === 'blackspeech') { type = 'ember'; color = '#ff4500'; count = 50; }
    else if (race === 'rohirric') { type = 'pollen'; color = '#90EE90'; count = 25; }
    else if (race === 'quenya') { type = 'star'; color = '#00BFFF'; count = 60; }
    else if (race === 'en') { count = 0; } 

    for (let i = 0; i < count; i++) {
        let p = document.createElement('div');
        p.className = type === 'ember' ? 'ember' : (type === 'dust' || type === 'pollen' ? 'dust' : 'star');
        p.style.left = Math.random() * 100 + 'vw';
        p.style.backgroundColor = color; 
        
        if (type === 'star') {
            p.style.top = Math.random() * 100 + 'vh';
            let s = Math.random() * 3 + 'px';
            p.style.width = s; p.style.height = s;
            p.style.animationDuration = (Math.random() * 2 + 2) + 's';
        } else {
            let s = Math.random() * 5 + 2 + 'px';
            p.style.width = s; p.style.height = s;
            p.style.animationDuration = (Math.random() * 5 + 4) + 's';
            p.style.animationDelay = (Math.random() * 5) + 's';
        }
        container.appendChild(p);
    }
}

function swapLanguages() {
    let src = document.getElementById('sourceLang');
    let tgt = document.getElementById('targetLang');
    let temp = src.value; src.value = tgt.value; tgt.value = temp;
    
    let inText = document.getElementById('inputText');
    let outText = document.getElementById('outputText');
    let metaDiv = document.getElementById('quoteMetadata');
    
    if(outText.innerText !== "...") {
        inText.value = outText.innerText.replace(/<[^>]*>/g, ''); 
        outText.innerHTML = "...";
    }
    if (metaDiv) metaDiv.style.display = 'none';
    updateTheme();
}

function copyResult() {
    const t = document.getElementById('outputText').innerText;
    navigator.clipboard.writeText(t);
}

function randomizeInput() {
    const tgtLang = document.getElementById('targetLang').value;
    const inputArea = document.getElementById('inputText');
    const metaDiv = document.getElementById('quoteMetadata');
    const quoteList = loreQuotes[tgtLang] || loreQuotes['en'];
    const randomIndex = Math.floor(Math.random() * quoteList.length);
    const selected = quoteList[randomIndex];
    
    inputArea.value = selected.text;
    metaDiv.style.display = 'block';
    metaDiv.innerHTML = `<strong>🗣️ ${selected.character}</strong> <span style="opacity:0.7">(${selected.source})</span><br><em>💡 ${selected.trivia}</em>`;
    runTranslate();
}

// --- 3. ALGORITMA LEVENSHTEIN (FUZZY MATCHING / ANTI-TYPO) ---
// Menghitung jarak antara dua kata (misal: "freind" ke "friend" jaraknya 1)
function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

// --- 4. ALGORITMA CASE PRESERVATION (HURUF KAPITAL) ---
// Menyesuaikan huruf besar/kecil hasil terjemahan dengan input asli
function matchCase(original, translated) {
    if (!original || !translated) return translated;
    
    // Jika semua kapital (KING -> ARAN)
    if (original === original.toUpperCase()) return translated.toUpperCase();
    
    // Jika huruf pertama kapital (King -> Aran)
    if (original[0] === original[0].toUpperCase()) {
        return translated.charAt(0).toUpperCase() + translated.slice(1);
    }
    
    // Default huruf kecil (king -> aran)
    return translated.toLowerCase();
}

// --- 5. TRANSLATION LOGIC (MODERN & SMART) ---
function runTranslate() {
    if (!isLoaded) return;

    const srcLang = document.getElementById('sourceLang').value;
    const tgtLang = document.getElementById('targetLang').value;
    const rawInput = document.getElementById('inputText').value; // Jangan toLowerCase dulu!
    const outputDiv = document.getElementById('outputText');
    const audio = document.getElementById('sfx');

    audio.currentTime = 0; audio.play().catch(()=>{});
    if (!rawInput) return;

    // Split pintar (memisahkan tanda baca)
    let spacedInput = rawInput.replace(/([.,!?;:(){}\[\]<>"\/\-])/g, ' $1 ');
    let words = spacedInput.split(/\s+/);
    let result = [];

    // Rules Grammar
    const copulaList = ['is', 'am', 'are', 'was', 'were'];
    const articleList = ['the', 'a', 'an'];
    const zeroCopulaLangs = ['sindarin', 'quenya', 'khuzdul', 'blackspeech']; 
    const zeroArticleLangs = ['khuzdul', 'blackspeech'];

    // --- HELPER UTAMA ---
    function getDict(lang) {
        let dict = db[lang] || {};
        // Merge Neo-Languages otomatis
        if (lang === 'khuzdul' && db['khuzdul_neo']) dict = {...dict, ...db['khuzdul_neo']};
        if (lang === 'blackspeech' && db['blackspeech_neo']) dict = {...dict, ...db['blackspeech_neo']};
        return dict;
    }

    function searchWord(word, dict, isSourceSearch) {
        word = word.toLowerCase();
        
        // 1. Exact Match
        if (isSourceSearch) {
            // Reverse Search (Inggris -> Key)
            for (let k in dict) { if (dict[k] === word) return k; }
        } else {
            // Direct Search (Key -> Target)
            if (dict[word]) return dict[word];
        }

        // 2. Plural Handling (Kings -> King)
        if (word.endsWith('s')) {
            let root = word.slice(0, -1);
            if (isSourceSearch) {
                for (let k in dict) { if (dict[k] === root) return k; }
            } else {
                if (dict[root]) return dict[root];
            }
        }

        // 3. Fuzzy Matching (Anti-Typo) - Hanya jika kata > 3 huruf
        // Batas toleransi typo: 1 huruf salah
        if (word.length > 3) {
            if (isSourceSearch) {
                for (let k in dict) {
                    if (levenshtein(dict[k], word) <= 1) return k; 
                }
            } else {
                for (let k in dict) {
                    if (levenshtein(k, word) <= 1) return dict[k];
                }
            }
        }

        return null;
    }

    // --- PROSES TRANSLASI ---
    words.forEach(originalWord => {
        if (!originalWord) return;
        
        let cleanWord = originalWord.toLowerCase();

        // Pass Tanda Baca
        if (/^[.,!?;:(){}\[\]<>"\/\-]+$/.test(originalWord)) {
            result.push(originalWord);
            return;
        }

        // Grammar Filter (Skip is/the untuk bahasa tertentu)
        if (zeroCopulaLangs.includes(tgtLang) && copulaList.includes(cleanWord)) return;
        if (zeroArticleLangs.includes(tgtLang) && articleList.includes(cleanWord)) return;

        // 1. Pivot ke Inggris (Jika input bukan Inggris)
        let pivotWord = cleanWord;
        if (srcLang !== 'en') {
            let srcDict = getDict(srcLang);
            let found = searchWord(cleanWord, srcDict, true); // true = Reverse Search
            if (found) pivotWord = found;
            else pivotWord = null; // Kata asing tak dikenal di kamus asal
        }

        // 2. Dari Inggris (Pivot) ke Target
        if (pivotWord) {
            if (tgtLang === 'en') {
                // Jika target Inggris, kembalikan pivot (sudah dalam Inggris)
                result.push(matchCase(originalWord, pivotWord));
            } else {
                let tgtDict = getDict(tgtLang);
                let finalWord = searchWord(pivotWord, tgtDict, false); // false = Direct Search

                if (finalWord) {
                    // SUKSES: Sesuaikan kapitalisasi
                    result.push(matchCase(originalWord, finalWord));
                } else {
                    // Gagal di target, tampilkan pivot Inggrisnya
                    result.push(`<span class="raw">(${pivotWord}?)</span>`);
                }
            }
        } else {
            // Kata benar-benar tidak ditemukan (bahkan di bahasa asal)
            result.push(`<span class="raw">(${originalWord})</span>`);
        }
    });

    let finalString = result.join(" ").replace(/\s+([.,!?;:])/g, '$1');
    outputDiv.innerHTML = finalString;
}
