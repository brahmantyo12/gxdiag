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
        inText.value = outText.innerText.replace(/<[^>]*>/g, ''); 
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
    const copulaList = ['is', 'am', 'are', 'was', 'were'];
    const articleList = ['the', 'a', 'an'];
    
    // 1. Bahasa yang TIDAK pakai "to be" (Zero Copula)
    // Rohirric dihapus dari sini karena dia pakai "is"
    const zeroCopulaLangs = ['sindarin', 'quenya', 'khuzdul', 'blackspeech'];

    // 2. Bahasa yang TIDAK pakai "the/a/an" (Zero Article)
    // Sindarin/Quenya/Rohirric punya kata "the", jadi tidak dimasukkan sini
    const zeroArticleLangs = ['khuzdul', 'blackspeech'];

    // --- HELPER: Cari makna Inggris (Pivot) ---
    function findEnglishMeaning(word, language) {
        if (language === 'en') return word; 
        
        let dict = db[language];
        // Cek juga dictionary Neo jika ada
        if (language === 'khuzdul' && !dict[word] && db['khuzdul_neo']) dict = {...dict, ...db['khuzdul_neo']};
        if (language === 'blackspeech' && !dict[word] && db['blackspeech_neo']) dict = {...dict, ...db['blackspeech_neo']};

        if (!dict) return null;

        // Reverse Search (Value -> Key)
        for (let enKey in dict) {
            if (dict[enKey] === word) return enKey; 
        }
        return null;
    }

    // --- HELPER: Cari kata Target (Support Neo-Languages) ---
    function findTargetWord(englishWord, language) {
        if (language === 'en') return englishWord; 
        
        // 1. Cek Database Utama (Canon)
        let dict = db[language];
        if (dict && dict[englishWord]) return dict[englishWord];

        // 2. Cek Database Neo (Ekspansi)
        if (language === 'khuzdul' && db['khuzdul_neo'] && db['khuzdul_neo'][englishWord]) {
            return db['khuzdul_neo'][englishWord];
        }
        if (language === 'blackspeech' && db['blackspeech_neo'] && db['blackspeech_neo'][englishWord]) {
            return db['blackspeech_neo'][englishWord];
        }

        return null;
    }

    // --- EXECUTE TRANSLATION ---
    words.forEach(w => {
        if(!w) return;

        // RULE 1: Skip "is/am/are" untuk bahasa tertentu
        if (zeroCopulaLangs.includes(tgtLang) && copulaList.includes(w)) {
            return; 
        }

        // RULE 2: Skip "the/a/an" KECUALI untuk Sindarin/Quenya/Rohirric
        if (zeroArticleLangs.includes(tgtLang) && articleList.includes(w)) {
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
            // Kata tidak ditemukan, tapi cek apakah ini artikel/copula yang lolos filter
            // (Misal: "the" di Sindarin tapi lupa dimasukkan ke data.json)
            if (!copulaList.includes(w) && !articleList.includes(w)) {
                result.push(`<span class="raw">(${w})</span>`);
            } else {
                // Kalau cuma artikel yang tidak ketemu, biarkan kosong atau beri tanda tanya
                // Untuk Rohirric "the" = "se", kalau belum ada di DB akan muncul (the?)
                result.push(`<span class="raw">(${w}?)</span>`);
            }
        }
    });

    outputDiv.innerHTML = result.join(" ");
}
