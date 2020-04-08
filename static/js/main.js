"use strict";

(function() {
    const resultField       = document.querySelector('#result');
    const clearBtn          = document.querySelector('#clear');
    const digitButtons      = document.querySelectorAll('.digit-button');
    const operatorButtons   = document.querySelectorAll('.operator-button');
    const modeBtn           = document.querySelector('.mode-button');


    /* Допишите ваш JS код здесь */
    var firstNummber = "";
    var secondNumber = "";
    var operatorSelected = null;
    var visualViewMode = false;

    var repeat = false;



    digitButtons.forEach(function(digitButton)
    {
        digitButton.addEventListener('click',function(e)
        {
            if (operatorSelected == null)
            {
                if (firstNummber == "0")    
                {
                    firstNummber = e.target.value; 
                }
                else
                 firstNummber = (String) (firstNummber) + e.target.value; 
                resultField.value = firstNummber;
            }
            else
            {
                if (secondNumber == "0")
                {
                    secondNumber = e.target.value; 
                }
                else
                secondNumber = (String) (secondNumber) + e.target.value; 
                if (visualViewMode == true)
                {
                    resultField.value = firstNummber + " " + operatorSelected + " " +  secondNumber;
                }
                else
                {
                    resultField.value = secondNumber;
                }
            }
        })
    })

    operatorButtons.forEach(function(operatorButton)
    {
        operatorButton.addEventListener('click',function(e)
        {

            if (e.target.value == "C")
            {
                if (operatorSelected == null)
                {
                    firstNummber = (String) (firstNummber);
                    firstNummber = firstNummber.slice(0, -1);
                    console.log(firstNummber);
                    showres();
                }
                else
                {
                    if (secondNumber == "")
                    {
                        operatorSelected = null;
                    }
                    else
                    {
                        secondNumber = secondNumber.slice(0, -1);
                    }
                    
                    showres();
                }
            }
            else if (e.target.value == ".")
            {
                if (operatorSelected == null)
                {
                    console.log(firstNummber);
                    if (firstNummber == "")
                    {
                        firstNummber = "0."
                    }
                    else if (firstNummber.includes('.') == false)
                        firstNummber += '.';

                    resultField.value = firstNummber;
                }
                else
                {
                    if (secondNumber == "")
                    {
                        secondNumber = "0."
                    }
                    else if (secondNumber.includes('.')==false && secondNumber != "")
                        secondNumber += '.';
                    showres();
                    
                }
            }

            else if (e.target.value != "=" && e.target.value != ".")
            {
                if ((String) (e.target.value) == operatorSelected)
                {
                    repeat = true;
                }
                else
                {
                    repeat = false;
                }

                operatorSelected = (String) (e.target.value);
                if (repeat == true)
                {
                    operation();
                }
                if (secondNumber != 0)
                    secondNumber = 0;

                if (visualViewMode == true)
                {
                    if (operatorSelected == null)
                    {
                        resultField.value = firstNummber;
                    }
                    else
                    {
                        resultField.value = firstNummber + " " + operatorSelected + " " +  secondNumber;
                    }
                }
                else
                {
                    resultField.value = operatorSelected;
                }
            }
            else
            {
                operation();
                check();

                if (visualViewMode == true)
                {
                    resultField.value = "= " + firstNummber;
                }
                else
                {
                    resultField.value = firstNummber;
                }
                
            }
            
        })
    })

    clearBtn.addEventListener('click',function(e)
    {
        resultField.value = 0;
        operatorSelected = null;
        firstNummber = "";
        secondNumber = "";
    })

    modeBtn.addEventListener('click', function(e)
    {
        if (e.target.value == "Viewmode: Classic")
        {
            e.target.value = "Viewmode: Visual"
            visualViewMode = true;
        }
        else
        {
            e.target.value = "Viewmode: Classic"
            visualViewMode = false; 
        }
    })
    
    function round100(val) {
        return Math.round((val)*100000)/100000;
      }

    function operation()
    {

        switch (operatorSelected)
        {
            case "+":
                firstNummber = round100((Number) (firstNummber) + (Number) (secondNumber));
                break;
            case '-':
                firstNummber =  round100((Number) (firstNummber) -  (Number) (secondNumber));
                break;
            case '*':
                firstNummber =  round100((Number) (firstNummber) * (Number) (secondNumber));
                break;
            case '/':
                    firstNummber =  round100( (Number) (firstNummber) / (Number) (secondNumber));
                break; 
        }   
    }

    function showres()
    {
        if (visualViewMode == true)
                    {
                        if (operatorSelected == null)
                        {
                            resultField.value = firstNummber;
                        }
                        else
                        {
                            resultField.value = firstNummber + " " + operatorSelected + " " +  secondNumber;
                        }
                    }
                    else
                    {
                        if (operatorSelected == null)
                        {
                            resultField.value = firstNummber;
                        }
                        else
                        {
                            resultField.value = secondNumber;
                        }
                    }
    }

    function check()
    {
        firstNummber = String ( Number (firstNummber));
        secondNumber = String ( Number (secondNumber));
    }
})()
