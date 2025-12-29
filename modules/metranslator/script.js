// --- GLOBAL VARIABLES ---
let db = {};
let isLoaded = false;

// --- DATABASE KUTIPAN LORE (Quotes & Trivia) ---
const loreQuotes = {
    // SINDARIN (ELVES)
    'sindarin': [
        {
            text: "The stars shine upon the hour of our meeting",
            character: "Gildor Inglorion",
            source: "The Fellowship of the Ring (Book)",
            trivia: "Salam tradisional High Elves yang diucapkan Gildor saat bertemu Frodo di hutan Shire."
        },
        {
            text: "Speak friend and enter",
            character: "Narvi & Celebrimbor",
            source: "The Fellowship of the Ring",
            trivia: "Tulisan di Pintu Durin (Moria). Gandalf awalnya salah mengira ini teka-teki, padahal hanya kata sandi sederhana."
        },
        {
            text: "I will go alone",
            character: "Frodo Baggins",
            source: "The Fellowship of the Ring",
            trivia: "Keputusan Frodo di Amon Hen untuk meninggalkan rombongan agar Cincin tidak merusak teman-temannya."
        },
        {
            text: "My heart tells me",
            character: "Legolas Greenleaf",
            source: "The Two Towers",
            trivia: "Firasat Legolas seringkali lebih tajam daripada penglihatan mata biasa."
        },
        {
            text: "Behold the city of the kings",
            character: "Gandalf",
            source: "The Return of the King",
            trivia: "Saat Gandalf dan Pippin pertama kali melihat Minas Tirith yang megah."
        }
    ],
    // QUENYA (HIGH ELVES)
    'quenya': [
        {
            text: "Hail Earendil brightest of angels",
            character: "Frodo Baggins",
            source: "The Two Towers",
            trivia: "Doa spontan Frodo saat menggunakan Phial of Galadriel melawan Shelob."
        },
        {
            text: "Now is the hour",
            character: "Théoden / Fingolfin (Echo)",
            source: "The Return of the King",
            trivia: "Kalimat yang menggambarkan momen krusial sebelum pertempuran besar."
        },
        {
            text: "Farewell world",
            character: "Nienor Níniel",
            source: "The Silmarillion",
            trivia: "Kata-kata terakhir yang tragis sebelum ia melompat ke sungai Teiglin."
        },
        {
            text: "Behold the light of the trees",
            character: "Lore Reference",
            source: "The Silmarillion",
            trivia: "Merujuk pada Dua Pohon Valinor (Laurelin dan Telperion) sebelum dihancurkan Ungoliant."
        }
    ],
    // KHUZDUL (DWARVES)
    'khuzdul': [
        {
            text: "Axes of the Dwarves",
            character: "Gimli",
            source: "The Two Towers (Film)",
            trivia: "Teriakan perang Gimli saat mempertahankan benteng Hornburg di Helm's Deep."
        },
        {
            text: "The Dwarves are upon you",
            character: "Dain Ironfoot",
            source: "The Hobbit: Battle of the Five Armies",
            trivia: "Teriakan pasukan Iron Hills saat menerjang pasukan Thranduil (sebelum Orc datang)."
        },
        {
            text: "He is the king under the mountain",
            character: "Thorin Oakenshield",
            source: "The Hobbit",
            trivia: "Gelar untuk penguasa Erebor yang sah."
        },
        {
            text: "Dig deep and greedy",
            character: "Saruman (Narrator)",
            source: "The Fellowship of the Ring",
            trivia: "Deskripsi kesalahan kaum Kurcaci Moria yang membangunkan Balrog."
        }
    ],
    // BLACK SPEECH (MORDOR)
    'blackspeech': [
        {
            text: "One Ring to rule them all",
            character: "Sauron",
            source: "The Fellowship of the Ring",
            trivia: "Baris pertama puisi Cincin, diukir dengan api pada One Ring."
        },
        {
            text: "And in the darkness bind them",
            character: "Sauron",
            source: "The Fellowship of the Ring",
            trivia: "Bagian penutup dari mantra pengikat Cincin Utama."
        },
        {
            text: "Meat is back on the menu",
            character: "Uglúk",
            source: "The Two Towers (Film)",
            trivia: "Kalimat ikonik Uglúk setelah memenggal Orc yang mau memakan Merry & Pippin."
        },
        {
            text: "The eye sees all",
            character: "Saruman",
            source: "The Fellowship of the Ring",
            trivia: "Peringatan Saruman kepada Gandalf tentang kekuatan penglihatan Sauron."
        },
        {
            text: "Build the tower of darkness",
            character: "Orc Chant",
            source: "Lore Reference",
            trivia: "Perintah umum di Lugbúrz (Barad-dûr)."
        }
    ],
    // ROHIRRIC (ROHAN)
    'rohirric': [
        {
            text: "The king is here",
            character: "Éomer",
            source: "The Return of the King",
            trivia: "Menandakan kehadiran raja di medan perang."
        },
        {
            text: "Arise riders of Theoden",
            character: "Théoden",
            source: "The Return of the King",
            trivia: "Pidato legendaris sebelum serbuan Rohirrim di Pelennor Fields."
        },
        {
            text: "Where is the horse and the rider",
            character: "Théoden (mengutip Eorl)",
            source: "The Two Towers",
            trivia: "Puisi melankolis tentang kejayaan masa lalu yang hilang."
        },
        {
            text: "I am no man",
            character: "Éowyn",
            source: "The Return of the King",
            trivia: "Kalimat pamungkas Éowyn sebelum membunuh Witch-king of Angmar."
        },
        {
            text: "Death and glory",
            character: "Theoden's Army",
            source: "The Return of the King",
            trivia: "Teriakan saat mereka menyerbu pasukan Haradrim."
        }
    ],
    // ENGLISH (DEFAULT)
    'en': [
        {
            text: "If in doubt always follow your nose",
            character: "Gandalf",
            source: "The Fellowship of the Ring",
            trivia: "Saran Gandalf kepada rombongan saat tersesat di Moria."
        },
        {
            text: "You shall not pass",
            character: "Gandalf",
            source: "The Fellowship of the Ring",
            trivia: "Benteng terakhir Gandalf melawan Balrog di jembatan Khazad-dûm."
        },
        {
            text: "My precious",
            character: "Gollum / Sméagol",
            source: "The Hobbit / LOTR",
            trivia: "Obsesi Gollum terhadap One Ring yang telah merusak jiwanya."
        },
        {
            text: "Fly you fools",
            character: "Gandalf",
            source: "The Fellowship of the Ring",
            trivia: "Kata-kata terakhir Gandalf sebelum jatuh ke jurang di Moria."
        }
    ]
};

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
    let metaDiv = document.getElementById('quoteMetadata');
    
    if(outText.innerText !== "...") {
        inText.value = outText.innerText.replace(/<[^>]*>/g, ''); 
        outText.innerHTML = "...";
    }
    
    // Sembunyikan trivia saat swap agar tidak bingung
    if (metaDiv) metaDiv.style.display = 'none';

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
            if (!copulaList.includes(w) && !articleList.includes(w)) {
                result.push(`<span class="raw">(${w})</span>`);
            } else {
                // Kalau cuma artikel yang tidak ketemu, biarkan kosong atau beri tanda tanya
                result.push(`<span class="raw">(${w}?)</span>`);
            }
        }
    });

    outputDiv.innerHTML = result.join(" ");
}

// --- 4. FEATURE: RANDOM INPUT & TRIVIA ---
function randomizeInput() {
    const tgtLang = document.getElementById('targetLang').value;
    const inputArea = document.getElementById('inputText');
    const metaDiv = document.getElementById('quoteMetadata');
    
    // Pilih daftar kutipan
    const quoteList = loreQuotes[tgtLang] || loreQuotes['en'];
    
    // Acak index
    const randomIndex = Math.floor(Math.random() * quoteList.length);
    const selected = quoteList[randomIndex];
    
    // 1. Masukkan Teks ke Input Box
    inputArea.value = selected.text;
    
    // 2. Tampilkan Metadata (Info Trivia)
    metaDiv.style.display = 'block';
    metaDiv.innerHTML = `
        <strong>🗣️ ${selected.character}</strong> <span style="opacity:0.7">(${selected.source})</span><br>
        <em>💡 ${selected.trivia}</em>
    `;
    
    // 3. Jalankan Translate
    runTranslate();
}
