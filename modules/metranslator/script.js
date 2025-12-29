// --- GLOBAL VARIABLES ---
let db = {};
let isLoaded = false;

// --- 1. LOAD DATA DATABASE ---
fetch('data.json')
    .then(res => res.json())
    .then(data => {
        db = data;
        isLoaded = true;
        document.getElementById('status').innerText = "Archives Loaded.";
        updateTheme(); // Set tema awal
    })
    .catch(err => {
        console.error(err);
        document.getElementById('status').innerText = "Error loading data.json (Check Console)";
    });

// --- 2. UI & THEME LOGIC ---
function updateTheme() {
    const target = document.getElementById('targetLang').value;
    document.body.className = `theme-${target}`;
    initParticles(target);
}

function initParticles(race) {
    const container = document.getElementById('particles');
    container.innerHTML = ""; 

    let type = 'star';
    let color = 'white';
    let count = 40;

    // Aturan Tema Partikel
    if (race === 'khuzdul') { type = 'dust'; color = '#cd7f32'; count = 30; }
    else if (race === 'blackspeech') { type = 'ember'; color = '#ff4500'; count = 50; }
    else if (race === 'rohirric') { type = 'pollen'; color = '#90EE90'; count = 25; }
    else if (race === 'quenya') { type = 'star'; color = '#00BFFF'; count = 60; }
    else if (race === 'en') { count = 0; } 

    // Generate Partikel
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
    
    // Tukar Nilai Dropdown
    let temp = src.value;
    src.value = tgt.value;
    tgt.value = temp;
    
    // Tukar Isi Teks (Input <-> Output)
    let inText = document.getElementById('inputText');
    let outText = document.getElementById('outputText');
    
    if(outText.innerText !== "...") {
        inText.value = outText.innerText.replace(/<[^>]*>/g, ''); // Bersihkan tag HTML
        outText.innerHTML = "...";
    }
    updateTheme();
}

function copyResult() {
    const t = document.getElementById('outputText').innerText;
    navigator.clipboard.writeText(t);
}

// --- 3. TRANSLATION CORE LOGIC (SMART GRAMMAR) ---
function runTranslate() {
    if (!isLoaded) return;

    const srcLang = document.getElementById('sourceLang').value;
    const tgtLang = document.getElementById('targetLang').value;
    const rawInput = document.getElementById('inputText').value.toLowerCase();
    const outputDiv = document.getElementById('outputText');
    const audio = document.getElementById('sfx');

    // Mainkan Efek Suara
    audio.currentTime = 0; audio.play().catch(()=>{});

    if (!rawInput) return;

    // Pecah kalimat jadi kata-kata (hapus tanda baca)
    let words = rawInput.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"").split(/\s+/);
    let result = [];

    // --- RULES TATA BAHASA ---
    // Daftar kata kerja bantu "to be"
    const ignoreList = ['is', 'am', 'are', 'was', 'were'];
    
    // Daftar bahasa yang TIDAK pakai "to be" (Zero Copula)
    // NOTE: Rohirric TIDAK masuk sini karena dia pakai "is" (Old English style)
    const zeroCopulaLangs = ['sindarin', 'quenya', 'khuzdul', 'blackspeech'];

    // --- HELPER: Cari makna Inggris (Pivot) ---
    function findEnglishMeaning(word, language) {
        if (language === 'en') return word; 
        
        let dict = db[language];
        if (!dict) return null;

        // Reverse Search (Value -> Key)
        for (let enKey in dict) {
            if (dict[enKey] === word) return enKey; 
        }
        return null;
    }

    // --- HELPER: Cari kata Target ---
    function findTargetWord(englishWord, language) {
        if (language === 'en') return englishWord; 
        
        let dict = db[language];
        if (dict && dict[englishWord]) return dict[englishWord]; 
        return null;
    }

    // --- EXECUTE TRANSLATION ---
    words.forEach(w => {
        if(!w) return;

        // LOGIC PINTAR: 
        // Jika target bahasa ada di daftar zeroCopulaLangs, DAN kata ini adalah "is/am/are",
        // maka SKIP kata ini (jangan diterjemahkan).
        if (zeroCopulaLangs.includes(tgtLang) && ignoreList.includes(w)) {
            return; 
        }

        // 1. Pivot ke Inggris dulu
        let pivotWord = findEnglishMeaning(w, srcLang);

        if (pivotWord) {
            // 2. Dari Inggris ke Bahasa Tujuan
            let finalWord = findTargetWord(pivotWord, tgtLang);

            if (finalWord) {
                result.push(finalWord);
            } else {
                // Kata ada di source, tapi tidak ada di target
                result.push(`<span class="raw">(${pivotWord}?)</span>`);
            }
        } else {
            // Kata tidak ditemukan di kamus manapun
            // Cek lagi: jika ini stopwords (is/am/are) yang lolos filter (misal utk Rohirric), biarkan saja
            if (!ignoreList.includes(w)) {
                result.push(`<span class="raw">(${w})</span>`);
            } else {
                 // Jika ini "is" di Rohirric tapi tidak ada di kamus, biarkan dalam kurung
                 result.push(`<span class="raw">(${w})</span>`);
            }
        }
    });

    outputDiv.innerHTML = result.join(" ");
}
