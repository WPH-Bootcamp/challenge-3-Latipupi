'use strict';
const prompt = require('prompt-sync')({ sigint: true });
// =================================================================
// BAGIAN 1: FUNGSI VALIDASI INPUT (User Input Handling)
// =================================================================

/**
 * Meminta pengguna untuk memasukkan angka hingga input yang valid dimasukkan.
 * Menggunakan Number() untuk konversi eksplisit dan isNaN() untuk validasi.
 * @param {string} promptMessage Pesan yang akan ditampilkan dalam prompt.
 * @returns {number} Angka yang telah divalidasi.
 */
function getValidNumberInput(promptMessage) {
    let input;
    let numberValue;
    
    while (true) {
        input = prompt(promptMessage);

        // Cek jika pengguna membatalkan (null) atau meninggalkan kosong
        if (input === null || input.trim() === "") {
            console.log("Input tidak boleh kosong atau dibatalkan. Silakan coba lagi.");
            continue;
        }

        // Konversi eksplisit
        numberValue = Number(input);

        // Validasi: Cek apakah itu angka yang valid (dan bukan Infinity dari 1/0, tapi 
        // kita fokus pada input user, jadi isNaN cukup)
        if (!isNaN(numberValue)) {
            return numberValue;
        } else {
            console.log(`"${input}" bukan angka yang valid. Silakan masukkan angka.`);
        }
    }
}


/**
 * Meminta pengguna untuk memasukkan operator matematika yang valid.
 * @param {string} promptMessage Pesan yang akan ditampilkan dalam prompt.
 * @returns {string} Operator yang telah divalidasi.
 */
function getValidOperatorInput(promptMessage) {
    let operator;
    const validOperators = ['+', '-', '*', '/', '%', '**'];
    
    while (true) {
        operator = prompt(promptMessage);

        if (operator === null || operator.trim() === "") {
            console.log("Operator tidak boleh kosong atau dibatalkan. Silakan coba lagi.");
            continue;
        }
        
        // Memastikan input adalah salah satu operator yang valid
        if (validOperators.includes(operator)) {
            return operator;
        } else {
            console.log(`Operator "${operator}" tidak valid. Yang diizinkan: ${validOperators.join(', ')}.`);
        }
    }
}


// =================================================================
// BAGIAN 2: FUNGSI ARITMATIKA DASAR (Basic Arithmetic Operation)
// =================================================================

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    // Penanganan pembagian dengan nol
    if (b === 0) {
        return "Error: Division by zero!";
    }
    return a / b;
}

function modulo(a, b) {
    return a % b;
}

function power(a, b) {
    return a ** b;
}


// =================================================================
// BAGIAN 4: FUNGSI ANALISIS DATA TYPE & KONDISIONAL
// =================================================================

/**
 * Menganalisis hasil perhitungan dan menampilkan detail berdasarkan tipe dan nilai.
 * @param {*} result Hasil dari operasi aritmatika.
 */
function analyzeAndDisplayResult(result) {
    let analysisOutput = `\n--- Analisis Hasil ---\n`;
    
    // 4.1. Cek Tipe Data (typeof)
    const resultType = typeof result;
    analysisOutput += `Tipe data hasil: ${resultType}\n`;

    if (resultType === 'number') {
        // --- Jika hasilnya adalah Angka ---
        
        // 4.2. if/else if/else chain: Cek Positif, Negatif, atau Nol
        if (result > 0) {
            analysisOutput += `Nilai: Positif.`;
        } else if (result < 0) {
            analysisOutput += `Nilai: Negatif.`;
        } else {
            analysisOutput += `Nilai: Nol.`;
        }

        // Cek Integer atau Floating-point
        if (Number.isInteger(result)) {
             analysisOutput += ` (Integer)\n`;
        } else {
             analysisOutput += ` (Floating-Point / Desimal: ${result.toFixed(2)})\n`;
        }
        
        // 4.3. Ternary Operator: Cek Genap atau Ganjil
        const parity = result % 2 === 0 ? "Genap" : "Ganjil";
        analysisOutput += `Paritas: ${parity}\n`;
        
        // 4.4. Logical Operators (&& dan ||): Contoh kondisi kompleks
        if (result > 0 && Number.isInteger(result)) {
             analysisOutput += `* Catatan: Angka ini Positif dan Integer.\n`;
        } else if (result < 0 || !Number.isInteger(result)) {
             analysisOutput += `* Catatan: Angka ini Negatif atau Desimal.\n`;
        }
        
    } else if (resultType === 'string') {
        // --- Jika hasilnya adalah String (Contoh: Error Division by Zero) ---
        analysisOutput += `Pesan: ${result}\n`;

    } else {
        // 4.5. Nullish Coalescing Operator (??)
        // Cek jika null atau undefined
        const safeResult = result ?? "Result is undefined or null, something went wrong!";
        analysisOutput += `Pesan Default (Nullish Coalescing): ${safeResult}\n`;
    }

    console.log(`Hasil Akhir: ${result}\n${analysisOutput}`);
    console.log(`Hasil Akhir: ${result}\n${analysisOutput}`);
}


// =================================================================
// BAGIAN 3 & 5: LOGIKA UTAMA KALKULATOR (Main Calculator Logic & Exit)
// =================================================================

function mainCalculatorLoop() {
    
    // 3. Main Calculator Logic (while(true) loop)
    while (true) {
        
        // 1. Get Inputs
        const numA = getValidNumberInput("Masukkan angka pertama:");
        const operator = getValidOperatorInput("Masukkan operator (+, -, *, /, %, **):");
        const numB = getValidNumberInput("Masukkan angka kedua:");

        let finalResult;

        // 3. Switch Statement: Panggil fungsi yang sesuai
        switch (operator) {
            case '+':
                finalResult = add(numA, numB);
                break;
            case '-':
                finalResult = subtract(numA, numB);
                break;
            case '*':
                finalResult = multiply(numA, numB);
                break;
            case '/':
                finalResult = divide(numA, numB);
                break;
            case '%':
                finalResult = modulo(numA, numB);
                break;
            case '**':
                finalResult = power(numA, numB);
                break;
            default:
                finalResult = "Error: Operator tidak dikenal.";
        }

        // 4. Data Type Analysis & Conditional Output
        analyzeAndDisplayResult(finalResult);

        // 5. Exit Mechanism
        const continuePrompt = prompt("Apakah Anda ingin melakukan perhitungan lagi? (ketik 'yes' atau 'no')");
        
        if (continuePrompt !== null && continuePrompt.toLowerCase() === 'no') {
            console.log("Terima kasih telah menggunakan Kalkulator JS!");
            break; // Keluar dari while(true) loop
        }
    }
}

// Jalankan program
mainCalculatorLoop();