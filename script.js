let num1='';
let num2='';
let operator='';
let result="";
let count=0;  //counting times when = is pressed, if after result number is picked
const display = document.querySelector('.displayResult');
const buttons = document.querySelectorAll('.gridItem');
const dot = document.getElementById(".");

buttons.forEach((button) =>{
    button.addEventListener('click', function(e){
        processValue(e.target.id);
    });
});
dot.addEventListener("click", ()=>{
    document.getElementById(".").disabled =true;       //for disabling dot so you cant enter more then once
})

function processValue(value){
    
    if(!isNaN(Number(value)) || value === "."){
        if(num1.length >=11 || num2.length >=11){       //number overflow screen 
            return;
        }
        else{
            if(result === 0){      //*****case when after calculation user enter number instead of operation so clear board.
                num1="";
                num2="";
                operator="";
                result="";
                console.log("result0");
            }
            if(typeof(num1) !== "number" && result===1){           //case for continuous +++
                num2 += value;
                display.textContent=`${num2}`;
                console.log(num2);
            }
            else if(typeof(num1) !== "number" ){
                num1 += value;
                display.textContent=`${num1}`;
            }
            else{
                num2 += value;
                display.textContent=`${num2}`;
            }
        }
    }
    else{
        if(value === "+" || value === "-" || value === "/" || value === "*"){
            document.getElementById(".").disabled =false;
            if(num2 !== ""){        //case when 1+2+3 continuously which means num2 is ""
                getResult();        //result=""
                operator = value;
                result=1;
            }
            else{
            operator = value;
            num1 = Number(num1); 
            result="";              //set this to differentiate between result=0 for ***** case(press number after result(num2="") case and pressing number after operator case)
            
            }
        }
        else if(value === "="){
            document.getElementById(".").disabled =false;
            if(num1==="" && num2===""){
                display.textContent="0";
            }
            else if(num2 ===""){
                return;
            }
            else{
                getResult();        //result=0
            }
        }
        else if(value === "clear"){
            document.getElementById(".").disabled =false;
            num1="";
            num2="";
            operator="";
            result="";
            display.textContent="0";
        }
        else if(value === "plusMinus"){
            changeSign();
        }
        else if(value === "delete"){
            deleteNum();
        }
    }
    count++;
    console.log("num1 is " + num1);
    console.log("num2 is " + num2);

}
//function to get and display result. also prepare for next step like setting up num1
function getResult(){
    num1 = Number(num1);
    num2 = Number(num2);
    console.log(num1);
    console.log("result num2 is " + num2);
    result = operate(num1,num2);
    num1=`${result}`;       //convert to string for changeSign
    num2="";
    display.textContent=`${result}`;
    result=0;                   //set this to differentiate between result=0 for ***** case
}
//function to operate or call to perform calculation
function operate(num1, num2){
    if(operator === "+"){
        return plus(num1,num2);
    }
    else if(operator === "-"){
        return minus(num1,num2);
    }
    else if(operator === "*"){
        return multiply(num1,num2);
    }
    else if(operator === "/"){
        return divide(num1,num2);
    }
}
//function to delete one degit
function deleteNum(){
    if(num1.charAt(num1.length-1) === "." || num2.charAt(num2.length-1) === "."){
        document.getElementById(".").disabled =false;
    }
    if(typeof(num1) != "number"){       //is num1 is not a number yet meaning no operate has yet to be pressed
        num1 = num1.substr(0,num1.length-1);
        
        if(num1 === ""){
            display.textContent="0";
        }
        else{
            display.textContent=`${num1}`;
        }
    }
    else{                               //if not then its num2 to change
        num2 = num2.substr(0, num2.length-1);
        display.textContent=`${num2}`;
        if(num2 === ""){
            display.textContent="0";
        }
        else{
            display.textContent=`${num2}`;
        }
    }
}
//change sign on numbers function
function changeSign(){
    if(typeof(num1) != "number"){       //is num1 is not a number yet meaning no operate has yet to be pressed
        if(num1.charAt(0) !== "-"){
            num1 = "-" + num1;
        }
        else{
            num1 = num1.slice(1);
        }
        display.textContent=`${num1}`;
    }
    else{                               //if not then its num2 to change
        if(num2.charAt(0) !== "-"){
            num2 = "-" + num2;
            display.textContent=`${num2}`;
        }
        else{
            num2 = num2.slice(1);
        }
        display.textContent=`${num2}`;
    }
}
//operations on numbers functions
let plus = function(a,b){
    return a+b;
}
let minus = function(a,b){
    return a-b;
}
let multiply =function(a,b){
    console.log(a*b);
    return Number((a*b).toFixed(9));
    
}
let divide = function(a,b){
    if(b === 0){
        return "WTF?";
    }
    else{
        return Number((a/b).toFixed(9));  //toFixed meaning round but return as a string
    }
}