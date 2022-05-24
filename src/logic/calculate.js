import Big from "big.js";
import operate from "./operate";
import isNumber from "./isNumber";

/**
 * Given a button name and a calculator data object, return an updated
 * calculator data object.
 *
 * Calculator data object contains:
 *   total:String      the running total
 *   next:String       the next number to be operated on with the total
 *   operation:String  +, -, etc.
 */
export default function calculate(
    total, setTotal,
    next, setNext,
    operation, setOperation,
    buttonName
) {
    if (buttonName === "AC") {
        setTotal(null)
        setNext(null)
        setOperation(null)
    }

    if (isNumber(buttonName)) {
        if (buttonName === "0" && next === "0") {
            return;
        }

        // If there is an operation, update next
        if (operation) {
            if (next) {
                setNext(next + buttonName)
                return;
            }

            setNext(buttonName);
            return;
        }

        // If there is no operation, update next and clear the value
        if (next) {
            setNext(next === "0" ? buttonName : next + buttonName);
            setTotal(null);
            return;
        }

        setNext(buttonName);
        setTotal(null);
        return;
    }

    if (buttonName === "%") {
        if (operation && next) {
            const result = operate(total, next, operation);
            setTotal(Big(result).div(Big("100")).toString());
            setNext(null);
            setOperation(null);
            return;
        }

        if (next) {
            setNext(Big(next).div(Big("100")).toString());
        }

        return;
    }

    if (buttonName === ".") {
        if (next) {
            // ignore a "." if the next number already has one
            if (next.includes(".")) {
                return;
            }

            setNext(next + ".");
            return;
        }

        setNext("0.");
        return;
    }

    if (buttonName === "=") {
        if (next && operation) {
            setTotal(operate(total, next, operation));
            setNext(null);
            setOperation(null);
        }

        return;
    }

    if (buttonName === "+/-") {
        if (next) {
            setNext((-1 * parseFloat(next)).toString());
            return;
        }

        if (total) {
            setTotal((-1 * parseFloat(total)).toString());
            return;
        }

        return;
    }

    // Button must be an operation

    // When the user presses an operation button without having entered
    // a number first, do nothing.
    // if (!obj.next && !obj.total) {
    //   return {};
    // }

    // User pressed an operation button and there is an existing operation
    if (operation) {
        setTotal(operate(total, next, operation));
        setNext(null);
        setOperation(buttonName);
        return;
    }

    // no operation yet, but the user typed one

    // The user hasn't typed a number yet, just save the operation
    if ( ! next) {
        setOperation(buttonName);
        return;
    }

    // save the operation and shift 'next' into 'total'
    setTotal(next);
    setNext(null);
    setOperation(buttonName)
}