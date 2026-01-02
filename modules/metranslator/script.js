// --- GLOBAL VARIABLES ---
let db = {};
let isLoaded = false;
let typoCorrections = []; // Penampung log typo

// --- DATABASE KUTIPAN LORE (Quotes & Trivia) ---
const loreQuotes = {
    'sindarin': [
        { text: "The stars shine upon the hour of our meeting", character: "Gildor", source: "LOTR: Fellowship", trivia: "Salam tradisional High Elves." },
        { text: "Speak friend and enter", character: "Narvi", source: "LOTR: Fellowship", trivia: "Kata sandi Pintu Durin." },
        { text: "I will go alone", character: "Frodo", source: "LOTR: Fellowship", trivia: "Keputusan Frodo di Amon Hen." },
        { text: "My heart tells me", character: "Legolas", source: "The Two Towers", trivia: "Firasat Elf." }
    ],
    'quenya': [
        { text: "Hail Earendil brightest of angels", character: "Frodo", source: "The Two Towers", trivia: "Doa menggunakan Phial of Galadriel." },
        { text: "Now is the hour", character: "Théoden", source: "Return of the King", trivia: "Momen sebelum pertempuran." },
        { text: "Behold the light", character: "Lore", source: "Silmarillion", trivia: "Cahaya Dua Pohon Valinor." }
    ],
    'khuzdul': [
        { text: "Axes of the Dwarves", character: "Gimli", source: "The Two Towers", trivia: "Teriakan perang di Helm's Deep." },
        { text: "The Dwarves are upon you", character: "Dain", source: "The Hobbit", trivia: "Pasukan Iron Hills menyerang." },
        { text: "He is the king under the mountain", character: "Thorin", source: "The Hobbit", trivia: "Gelar Raja Erebor." }
    ],
    'blackspeech': [
        { text: "One Ring to rule them all", character: "Sauron", source: "The One Ring", trivia: "Puisi cincin baris pertama." },
        { text: "Meat is back on the menu", character: "Uglúk", source: "The Two Towers", trivia: "Uruk-hai yang kelaparan." },
        { text: "The eye sees all", character: "Saruman", source: "Fellowship", trivia: "Kekuatan Barad-dûr." }
    ],
    'rohirric': [
        { text: "The king is here", character: "Éomer", source: "Return of the King", trivia: "Kedatangan harapan." },
        { text: "Arise riders of Theoden", character: "Théoden", source: "Return of the King", trivia: "Pidato Pelennor Fields." },
        { text: "I am no man", character: "Éowyn", source: "Return of the King", trivia: "Melawan Witch-king." }
    ],
    'en': [
        { text: "You shall not pass", character: "Gandalf", source: "Fellowship", trivia: "Menahan Balrog." },
        { text: "My precious", character: "Gollum", source: "LOTR", trivia: "Obsesi terhadap Cincin." },
        { text: "Fly you fools", character: "Gandalf", source: "Fellowship", trivia: "Kata terakhir Gandalf di Moria." }
    ]
};

// --- 1. LOAD DATA ---
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

// --- 2. UI LOGIC ---
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

// --- 3. ALGORITMA PENDUKUNG (Levenshtein & Case) ---
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
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
            }
        }
    }
    return matrix[b.length][a.length];
}

function matchCase(original, translated) {
    if (!original || !translated) return translated;
    if (original === original.toUpperCase()) return translated.toUpperCase();
    if (original[0] === original[0].toUpperCase()) return translated.charAt(0).toUpperCase() + translated.slice(1);
    return translated.toLowerCase();
}

// --- 4. SUPER TRANSLATION LOGIC (Word Processing Center) ---
function runTranslate() {
    if (!isLoaded) return;

    const srcLang = document.getElementById('sourceLang').value;
    const tgtLang = document.getElementById('targetLang').value;
    const rawInput = document.getElementById('inputText').value;
    const outputDiv = document.getElementById('outputText');
    const audio = document.getElementById('sfx');
    const logDiv = document.getElementById('typoLog'); // Pastikan div ini ada di HTML

    audio.currentTime = 0; audio.play().catch(()=>{});
    if (!rawInput) return;

    // Reset log typo
    typoCorrections = [];

    // Split Pintar
    let spacedInput = rawInput.replace(/([.,!?;:(){}\[\]<>"\/\-])/g, ' $1 ');
    let words = spacedInput.split(/\s+/);
    let result = [];

    // Grammar Rules
    const copulaList = ['is', 'am', 'are', 'was', 'were'];
    const articleList = ['the', 'a', 'an'];
    const zeroCopulaLangs = ['sindarin', 'quenya', 'khuzdul', 'blackspeech'];
    const zeroArticleLangs = ['khuzdul', 'blackspeech'];

    // --- HELPER UTAMA: PENCARI KATA PINTAR ---
    // Mencari kata di kamus tertentu dengan urutan: Exact -> Morphology -> Fuzzy
    function smartLookup(word, lang, isReverse) {
        // 1. Siapkan Kamus (Merge Neo jika perlu)
        let dict = db[lang] || {};
        if (lang === 'khuzdul' && db['khuzdul_neo']) dict = {...dict, ...db['khuzdul_neo']};
        if (lang === 'blackspeech' && db['blackspeech_neo']) dict = {...dict, ...db['blackspeech_neo']};

        // 2. Fungsi Cek Kamus Internal
        const checkDict = (term) => {
            if (isReverse) {
                // Cari Key berdasarkan Value (Inggris -> Asing)
                for (let k in dict) { if (dict[k] === term) return k; }
            } else {
                // Cari Value berdasarkan Key (Asing -> Inggris / Inggris -> Target)
                if (dict[term]) return dict[term];
            }
            return null;
        };

        // STEP A: Exact Match
        let found = checkDict(word);
        if (found) return found;

        // STEP B: Morphology (Copot Imbuhan)
        const suffixes = ['est', 'ing', 'ed', 's', 'er', 'ies'];
        for (let s of suffixes) {
            if (word.endsWith(s)) {
                let root = word;
                if (s === 'ies') root = word.slice(0, -3) + 'y';
                else root = word.slice(0, -s.length);
                
                let rootFound = checkDict(root);
                if (rootFound) {
                    // Logic khusus Quenya Superlative
                    if (lang === 'quenya' && !isReverse && s === 'est') return 'an' + rootFound;
                    return rootFound;
                }
            }
        }

        // STEP C: Fuzzy Matching (Anti-Typo) - Hanya jika kata > 3 huruf
        if (word.length > 3) {
            if (isReverse) {
                for (let k in dict) {
                    if (levenshtein(dict[k], word) <= 1) {
                        typoCorrections.push(`"${word}"→"${dict[k]}"`);
                        return k;
                    }
                }
            } else {
                for (let k in dict) {
                    if (levenshtein(k, word) <= 1) {
                        typoCorrections.push(`"${word}"→"${k}"`);
                        return dict[k];
                    }
                }
            }
        }

        return null;
    }

    // --- PROSES TRANSLASI PER KATA ---
    words.forEach(originalWord => {
        if (!originalWord) return;
        let cleanWord = originalWord.toLowerCase();

        // 1. Pass Tanda Baca
        if (/^[.,!?;:(){}\[\]<>"\/\-]+$/.test(originalWord)) {
            result.push(originalWord);
            return;
        }

        // 2. Grammar Filter (Skip is/the)
        if (zeroCopulaLangs.includes(tgtLang) && copulaList.includes(cleanWord)) return;
        if (zeroArticleLangs.includes(tgtLang) && articleList.includes(cleanWord)) return;

        // 3. Logic Penerjemahan
        let pivotWord = cleanWord;
        
        // JIKA Source bukan Inggris, cari dulu bahasa Inggrisnya (Pivot)
        if (srcLang !== 'en') {
            let found = smartLookup(cleanWord, srcLang, true); // true = Reverse search
            if (found) pivotWord = found;
            else pivotWord = null;
        }

        // DARI Inggris (Pivot) KE Target
        if (pivotWord) {
            if (tgtLang === 'en') {
                result.push(matchCase(originalWord, pivotWord));
            } else {
                let finalWord = smartLookup(pivotWord, tgtLang, false); // false = Normal search
                
                if (finalWord) {
                    result.push(matchCase(originalWord, finalWord));
                } else {
                    // Gagal: Cek apakah ini Nama Orang (Huruf Besar)?
                    if (originalWord[0] === originalWord[0].toUpperCase()) {
                        result.push(originalWord); 
                    } else {
                        result.push(`<span class="raw">(${pivotWord}?)</span>`);
                    }
                }
            }
        } else {
            // Gagal Total (Kata asing tak dikenal)
            if (originalWord[0] === originalWord[0].toUpperCase()) {
                result.push(originalWord); // Anggap nama
            } else {
                result.push(`<span class="raw">(${originalWord})</span>`);
            }
        }
    });

    // Final Output
    let finalString = result.join(" ").replace(/\s+([.,!?;:])/g, '$1');
    outputDiv.innerHTML = finalString;

    // Tampilkan Log Typo (Jika ada div-nya di HTML)
    if (logDiv) {
        logDiv.innerText = typoCorrections.length > 0 ? "Auto-corrected: " + typoCorrections.join(", ") : "";
    }
}
