const romanMap = {
I: 1,
V: 5,
X: 10,
L: 50,
C: 100,
D: 500,
M: 1000,
};

const arabicToRomanMap = [
{ value: 1000, symbol: "M" },
{ value: 900, symbol: "CM" },
{ value: 500, symbol: "D" },
{ value: 400, symbol: "CD" },
{ value: 100, symbol: "C" },
{ value: 90, symbol: "XC" },
{ value: 50, symbol: "L" },
{ value: 40, symbol: "XL" },
{ value: 10, symbol: "X" },
{ value: 9, symbol: "IX" },
{ value: 5, symbol: "V" },
{ value: 4, symbol: "IV" },
{ value: 1, symbol: "I" },
];

const isValidRoman = (romanStr) => {
if (!romanStr) return true; // empty string for live input

// regex for roman numerals 
const romanRegex =
/^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;
if (!romanRegex.test(romanStr)) {
return false;
}

// conversion to arabic numeral (1-1000)
const arabicValue = romanToArabic(romanStr);
return arabicValue >= 1 && arabicValue <= 1000;
};

const romanToArabic = (romanStr) => {
let arabicNum = 0;
const s = romanStr.toUpperCase(); 

for (let i = 0; i < s.length; i++) {
const currentVal = romanMap[s[i]];
const nextVal = romanMap[s[i + 1]];

// checking for subtractive cases 
if (nextVal && currentVal < nextVal) {
    arabicNum += nextVal - currentVal;
    i++; 
} else {
    arabicNum += currentVal;
}
}
return arabicNum;
};


const arabicToRoman = (arabicNum) => {
let romanStr = "";
let num = arabicNum;


for (const { value, symbol } of arabicToRomanMap) {

while (num >= value) {
    romanStr += symbol;
    num -= value;
}
}
return romanStr;
};


const romanInput = document.getElementById("romanInput");
const romanErrorDisplay = document.getElementById("romanError");
const arabicInput = document.getElementById("arabicInput");
const arabicErrorDisplay = document.getElementById("arabicError");

function showError(errorElement, inputElement, message) {
errorElement.textContent = message;
errorElement.style.display = "block";
inputElement.classList.add("error"); 
}


function clearError(errorElement, inputElement) {
errorElement.textContent = "";
errorElement.style.display = "none"; 
inputElement.classList.remove("error"); 
}

arabicInput.addEventListener("input", (e) => {
const value = e.target.value;

// clear previous errors
clearError(arabicErrorDisplay, arabicInput);
clearError(romanErrorDisplay, romanInput);

// if empty input, clear both fields
if (value === "") {
romanInput.value = "";
return;
}

const num = parseInt(value, 10);

// checking if it's a number and is within range 1-1000
if (isNaN(num) || !Number.isInteger(num)) {
showError(
    arabicErrorDisplay,
    arabicInput,
    "Please enter a valid integer."
);
romanInput.value = "";
return;
}

if (num < 1 || num > 1000) {
showError(
    arabicErrorDisplay,
    arabicInput,
    "Number must be between 1 and 1000."
);
romanInput.value = "";
return;
}

// convert to roman numeral if valid
const roman = arabicToRoman(num);
romanInput.value = roman;
});


romanInput.addEventListener("input", (e) => {
const value = e.target.value.toUpperCase(); 


clearError(romanErrorDisplay, romanInput);
clearError(arabicErrorDisplay, arabicInput);


if (value === "") {
arabicInput.value = "";
return;
}

// character validation
const invalidChars = value
.split("")
.filter((char) => !romanMap.hasOwnProperty(char));
if (invalidChars.length > 0) {
showError(
    romanErrorDisplay,
    romanInput,
    `Invalid Roman numeral character(s): ${invalidChars.join(", ")}`
);
arabicInput.value = "";
return;
}

// roman numeral validation 
if (!isValidRoman(value)) {
showError(
    romanErrorDisplay,
    romanInput,
    "Invalid Roman numeral format or out of range (1-1000)."
);
arabicInput.value = "";
return;
}

// convert to arabic if valid
const arabic = romanToArabic(value);
arabicInput.value = arabic.toString();
});
