const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }
    // adiciona digito à tela da calculadora
    addDigit(digit) {
        // checar se a operação atual já tem um ponto
        if (digit === '.' && this.currentOperationText.innerText.includes('.')) {
            return
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    // Processa os calculos das operações
    processOperation(operation) {

        //checa se o valor atual está vazio
        if (this.currentOperationText.innerText === "" && this.previousOperationText == '') {
            if (this.previousOperationText.innerText !== "") {
                //mudança de operação 
                this.changeOperation(operation)
            }
            return;
        }

        //pegar valores atuais e prévios
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0]
        const current = +this.currentOperationText.innerText

        switch (operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "DEL":
                this.processDelOperator(operationValue, operation, current, previous)
                break;
            case "CE":
                this.processClearCurrentOperator(operationValue, operation, current, previous)
                break;
            case "C":
                this.processCancelOperator(operationValue, operation, current, previous)
                break;
            case "=":
                           
                this.processEqualOperator(operationValue, operation, current, previous)
                break;
            default:
                return
        }
    }


    //muda os valores da tela da calculadora
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
        console.log(operationValue, operation, current, previous)
        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //checar se value é zero, se for adicionar valor atual
            if (previous === 0) {
                operationValue = current
            }

            //add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ''
        }
    }

    //muda a operação
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"]

        if (!mathOperations.includes(operation)) {
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
    }

    //Deleta o ultimo digito
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    //limpa innerText atual
    processClearCurrentOperator() {
        this.currentOperationText.innerText = ''
    }

    //cancela operação
    processCancelOperator() {
        this.currentOperationText.innerText = ''
        this.previousOperationText.innerText = ""
    }

    //operação para igual
    processEqualOperator( ) {

        const operation = previousOperationText.innerText.split(" ")[1]
        this.processOperation(operation)

    }

}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === '.') {
            calc.addDigit(value)
        } else {
            calc.processOperation(value)
        }
    })
})