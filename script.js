function reverseString(str) {
  return str.split("").reverse().join("");
}

function isPalindrome(str) {
  let reverse = reverseString(str);
  return reverse === str;
}

function convertDateToString(date) {
  let dateStr = {
    day: "",
    month: "",
    year: "",
  };
  if (date.day < 10) {
    dateStr.day = "0" + date.day.toString();
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month.toString();
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();

  return dateStr;
}

function getAllDateFormats(date) {
  let dateStr = convertDateToString(date);

  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllFormats(date) {
  let allDateFormat = getAllDateFormats(date);
  let flag = false;

  for (let i = 0; i < allDateFormat.length; i++) {
    if (isPalindrome(allDateFormat[i])) {
      flag = true;
    }
  }
  return flag;
}
function isLeapYear(year) {
  if (year % 400 === 0) return true;
  else if (year % 100 === 0) return false;
  else if (year % 4 === 0) return true;

  return false;
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
    if (month > 12) {
      month = 1;
      year++;
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindrome(date) {
  let nextDate = getNextDate(date);
  let count = 0;

  while (1) {
    count++;
    let palindrome = checkPalindromeForAllFormats(nextDate);

    if (palindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [count, nextDate];
}

function getPreviousDate(date) {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31]; 

  if (month === 3) {
    if (isLeapYear(year)) {
      if (day < 1) {
        day = 29;
        month = 2;
      }
    } else {
      if (day < 1) {
        day = 28;
        month = 2;
      }
    }
  }
  else{
      if(day<1 && daysInMonth[month-1]===30){
          day=31;
          month--;
      }
      else if(day<1 && daysInMonth[month-1]===31){
          if(month===1){
              day=31;
              month=12;
              year--;
          }
          else{
            day=30;
            month--;
          }
      }
  }
  return{
      day:day,
      month:month,
      year:year
  }
}

function getPreviousPalindrome(date){
    let prevDate = getPreviousDate(date);
    let count = 0;

    while(true){
        count++;
        let palindrome = checkPalindromeForAllFormats(prevDate);
        if(palindrome){
            break;
        }
        prevDate = getPreviousDate(prevDate);
    }
    return [count,prevDate];
}

// let date = {
//   day: 31,
//   month: 12,
//   year: 2020,
// };

const bdayInput = document.getElementById("date-input");
const showBtn = document.getElementById("show-btn");
const output = document.getElementById("output");

showBtn.addEventListener("click",()=>{
  const bDayString = bdayInput.value;
  
  let dateArray = bDayString.split("-");   // yyyy-mm-dd
  let day = dateArray[2];
  let month = dateArray[1];
  let year = dateArray[0];
  
  let date ={
    day: Number(day),
    month : Number(month),
    year: Number(year)
  }
  // console.log(date);
  let dateStr = convertDateToString(date);
  console.log(dateStr);

  let palindrome = checkPalindromeForAllFormats(dateStr);
  
  if(!palindrome){
    const [count1,nextDate]=getNextPalindrome(date);
    const [count2,prevDate] = getPreviousPalindrome(date);

    if(count1>count2){
      output.innerText =`The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${count2} days`;
    }
    else{
      output.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${count1} days`;
    }
  }
  else{
    output.innerText = `Congo! Your birthday is palindrome!`
  }
  
})