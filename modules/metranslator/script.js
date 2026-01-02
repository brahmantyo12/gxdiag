// --- GLOBAL VARIABLES ---
let db = {};
let isLoaded = false;
let typoCorrections = []; 
let isMusicPlaying = false; 

// --- DATABASE KUTIPAN LORE (Quotes, Trivia, & CANON TRANSLATION) ---
// Note: 'canon' adalah terjemahan manual yang akurat agar tidak error saat di-translate mesin.
const loreQuotes = {
    'sindarin': [
        { 
            text: "The stars shine upon the hour of our meeting", 
            canon: "Elen síla lúmenn' omentielvo", // Kalimat Asli Quenya/Sindarin
            character: "Gildor", source: "LOTR: Fellowship", trivia: "Salam tradisional High Elves." 
        },
        { 
            text: "Speak friend and enter", 
            canon: "Pedo mellon a minno", 
            character: "Narvi", source: "LOTR: Fellowship", trivia: "Kata sandi Pintu Durin." 
        },
        { 
            text: "I will go alone", 
            canon: "Im govathon ani", // Rekonstruksi Neo-Sindarin
            character: "Frodo", source: "LOTR: Fellowship", trivia: "Keputusan Frodo di Amon Hen." 
        }
    ],
    'quenya': [
        { 
            text: "Hail Earendil brightest of angels", 
            canon: "Aiya Eärendil elenion ancalima", 
            character: "Frodo", source: "The Two Towers", trivia: "Doa menggunakan Phial of Galadriel." 
        },
        { 
            text: "Now is the hour", 
            canon: "Sí man i yûlna", // (Metaforis)
            character: "Théoden", source: "Return of the King", trivia: "Momen sebelum pertempuran." 
        }
    ],
    'khuzdul': [
        { 
            text: "Axes of the Dwarves", 
            canon: "Baruk Khazâd", 
            character: "Gimli", source: "The Two Towers", trivia: "Teriakan perang di Helm's Deep." 
        },
        { 
            text: "The Dwarves are upon you", 
            canon: "Khazâd ai-mênu", 
            character: "Dain", source: "The Hobbit", trivia: "Pasukan Iron Hills menyerang." 
        }
    ],
    'blackspeech': [
        { 
            text: "One Ring to rule them all", 
            canon: "Ash nazg durbatulûk", 
            character: "Sauron", source: "The One Ring", trivia: "Puisi cincin baris pertama." 
        },
        { 
            text: "And in the darkness bind them", 
            canon: "Agh burzum-ishi krimpatul", 
            character: "Sauron", source: "The One Ring", trivia: "Baris penutup mantra cincin." 
        }
    ],
    'rohirric': [
        { 
            text: "The king is here", 
            canon: "Se cyning is her", // Old English (Rohirric)
            character: "Éomer", source: "Return of the King", trivia: "Kedatangan harapan." 
        },
        { 
            text: "I am no man", 
            canon: "Ic ne eom wer", 
            character: "Éowyn", source: "Return of the King", trivia: "Melawan Witch-king." 
        }
    ],
    'en': [
        { text: "You shall not pass", canon: "You shall not pass", character: "Gandalf", source: "Fellowship", trivia: "Menahan Balrog." },
        { text: "My precious", canon: "My precious", character: "Gollum", source: "LOTR", trivia: "Obsesi terhadap Cincin." }
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
    updateAudio(target); 
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

// --- 3. RANDOMIZE INPUT (DICE) ---
function randomizeInput() {
    const tgtLang = document.getElementById('targetLang').value;
    const inputArea = document.getElementById('inputText');
    const metaDiv = document.getElementById('quoteMetadata');
    const quoteList = loreQuotes[tgtLang] || loreQuotes['en'];
    
    // Acak Quote
    const randomIndex = Math.floor(Math.random() * quoteList.length);
    const selected = quoteList[randomIndex];
    
    // Set Input
    inputArea.value = selected.text;
    
    // Tampilkan Metadata
    metaDiv.style.display = 'block';
    metaDiv.innerHTML = `<strong>🗣️ ${selected.character}</strong> <span style="opacity:0.7">(${selected.source})</span><br><em>💡 ${selected.trivia}</em>`;
    
    // SPECIAL TRIGGER: Jika quote dipilih dari dadu, kita passing 'canon' translation-nya
    // agar logic translator tidak perlu mikir, langsung tampilkan yang benar.
    runTranslate(selected.canon); 
}

// --- 4. ALGORITMA PENDUKUNG (Levenshtein & Case) ---
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

// --- 5. TRANSLATION CORE LOGIC (Smart Detector) ---
// Parameter 'forcedOutput' opsional: Jika ada, langsung tampilkan (untuk fitur Quote)
function runTranslate(forcedOutput = null) {
    if (!isLoaded) return;

    const srcLang = document.getElementById('sourceLang').value;
    const tgtLang = document.getElementById('targetLang').value;
    const rawInput = document.getElementById('inputText').value;
    const outputDiv = document.getElementById('outputText');
    const audio = document.getElementById('sfx');
    const logDiv = document.getElementById('typoLog');

    audio.currentTime = 0; audio.play().catch(()=>{});
    
    // RULE 0: Jika ada Forced Output (dari Quote/Dadu), langsung pakai itu.
    if (forcedOutput) {
        outputDiv.innerHTML = forcedOutput;
        if (logDiv) logDiv.innerText = "✨ Canonical translation used.";
        return;
    }

    if (!rawInput) return;
    typoCorrections = [];

    let spacedInput = rawInput.replace(/([.,!?;:(){}\[\]<>"\/\-])/g, ' $1 ');
    let words = spacedInput.split(/\s+/);
    let result = [];

    const copulaList = ['is', 'am', 'are', 'was', 'were'];
    const articleList = ['the', 'a', 'an'];
    const zeroCopulaLangs = ['sindarin', 'quenya', 'khuzdul', 'blackspeech'];
    const zeroArticleLangs = ['khuzdul', 'blackspeech'];

    // --- SMART LOOKUP ---
    function smartLookup(word, lang, isReverse) {
        let dict = db[lang] || {};
        // Merge Neo
        if (lang === 'khuzdul' && db['khuzdul_neo']) dict = {...dict, ...db['khuzdul_neo']};
        if (lang === 'blackspeech' && db['blackspeech_neo']) dict = {...dict, ...db['blackspeech_neo']};

        const checkDict = (term) => {
            if (isReverse) {
                for (let k in dict) { if (dict[k] === term) return k; }
            } else {
                if (dict[term]) return dict[term];
            }
            return null;
        };

        // A. Exact Match
        let found = checkDict(word);
        if (found) return found;

        // B. Morphology
        const suffixes = ['est', 'ing', 'ed', 's', 'er', 'ies'];
        for (let s of suffixes) {
            if (word.endsWith(s)) {
                let root = word;
                if (s === 'ies') root = word.slice(0, -3) + 'y';
                else root = word.slice(0, -s.length);
                
                let rootFound = checkDict(root);
                if (rootFound) {
                    if (lang === 'quenya' && !isReverse && s === 'est') return 'an' + rootFound;
                    return rootFound;
                }
            }
        }

        // C. Fuzzy Matching
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

    // --- DETEKSI BAHASA ASING (MIXED LANGUAGE) ---
    // Cek apakah kata ini ada di database bahasa lain (Khuzdul/BS/Sindarin)
    // Walaupun Source = English.
    function isAlienWord(word) {
        const alienLangs = ['khuzdul', 'blackspeech', 'sindarin', 'quenya'];
        for (let lang of alienLangs) {
            let dict = db[lang] || {};
            // Cek di Key (Bahasa Asing)
            if (dict[word]) return true;
            // Cek di Neo
            if (lang === 'khuzdul' && db['khuzdul_neo'] && db['khuzdul_neo'][word]) return true;
            if (lang === 'blackspeech' && db['blackspeech_neo'] && db['blackspeech_neo'][word]) return true;
        }
        return false;
    }

    words.forEach(originalWord => {
        if (!originalWord) return;
        let cleanWord = originalWord.toLowerCase();

        // Pass Punctuation
        if (/^[.,!?;:(){}\[\]<>"\/\-]+$/.test(originalWord)) {
            result.push(originalWord);
            return;
        }

        // Grammar Filter
        if (zeroCopulaLangs.includes(tgtLang) && copulaList.includes(cleanWord)) return;
        if (zeroArticleLangs.includes(tgtLang) && articleList.includes(cleanWord)) return;

        let pivotWord = cleanWord;
        
        // LOGIC 1: PIVOT (Source -> English)
        if (srcLang !== 'en') {
            let found = smartLookup(cleanWord, srcLang, true);
            if (found) pivotWord = found;
            else pivotWord = null;
        }

        // LOGIC 2: English -> Target
        if (pivotWord) {
            if (tgtLang === 'en') {
                result.push(matchCase(originalWord, pivotWord));
            } else {
                let finalWord = smartLookup(pivotWord, tgtLang, false);
                if (finalWord) {
                    result.push(matchCase(originalWord, finalWord));
                } else {
                    // Gagal Translate. Cek Smart Fallback:
                    
                    // A. Apakah ini Nama Orang? (Huruf Besar)
                    if (originalWord[0] === originalWord[0].toUpperCase()) {
                        result.push(originalWord); 
                    } 
                    // B. Apakah ini kata bahasa asing yang nyasar? (Mixed Language)
                    // Contoh: User ketik "Uruk" (BS) tapi Source English.
                    else if (isAlienWord(pivotWord)) {
                        // Jika kata ini dikenali sebagai kata Middle-earth valid, biarkan saja.
                        result.push(matchCase(originalWord, pivotWord));
                    }
                    else {
                        result.push(`<span class="raw">(${pivotWord}?)</span>`);
                    }
                }
            }
        } else {
            // Gagal Total (Tidak ada di Source)
            // Cek Mixed Language
            if (isAlienWord(cleanWord)) {
                 result.push(originalWord);
            } else if (originalWord[0] === originalWord[0].toUpperCase()) {
                result.push(originalWord);
            } else {
                result.push(`<span class="raw">(${originalWord})</span>`);
            }
        }
    });

    let finalString = result.join(" ").replace(/\s+([.,!?;:])/g, '$1');
    outputDiv.innerHTML = finalString;

    if (logDiv) {
        logDiv.innerText = typoCorrections.length > 0 ? "Auto-corrected: " + typoCorrections.join(", ") : "";
    }
}

// --- 6. AUDIO LOGIC ---
function toggleMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const btn = document.getElementById('musicToggle');
    const target = document.getElementById('targetLang').value;

    if (isMusicPlaying) {
        bgMusic.pause();
        isMusicPlaying = false;
        btn.innerHTML = "🔇 Sound Off";
        btn.classList.remove('music-active');
    } else {
        isMusicPlaying = true;
        btn.innerHTML = "🔊 Sound On";
        btn.classList.add('music-active');
        updateAudio(target); 
        bgMusic.play().catch(e => {
            console.log("Audio autoplay blocked by browser:", e);
            alert("Interaksi diperlukan agar musik bisa diputar!");
        });
    }
}

function updateAudio(lang) {
    const bgMusic = document.getElementById('bgMusic');
    let sourceFile = "";
    
    switch(lang) {
        case 'sindarin':
        case 'quenya':
            sourceFile = "assets/elf.mp3"; 
            break;
        case 'blackspeech':
            sourceFile = "assets/orc.mp3"; 
            break;
        // Tambahkan case lain jika file mp3-nya sudah ada
        default:
            sourceFile = ""; 
    }

    if (sourceFile) {
        if (!bgMusic.src.endsWith(sourceFile)) {
            bgMusic.src = sourceFile;
            if (isMusicPlaying) bgMusic.play();
        }
    } else {
        bgMusic.pause();
    }
}
