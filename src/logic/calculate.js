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
export default function calculate(obj, operation) {
    if (operation === "AC") {
        return {
            total: null,
            next: null,
            operation: null,
        };
    }

    if (isNumber(operation)) {
        if (operation === "0" && obj.next === "0") {
            return {};
        }
        // If there is an operation, update next
        if (obj.operation) {
            if (obj.next) {
                return { next: obj.next + operation };
            }
            return { next: operation };
        }
        // If there is no operation, update next and clear the value
        if (obj.next) {
            const next = obj.next === "0" ? operation : obj.next + operation;
            return {
                next,
                total: null,
            };
        }
        return {
            next: operation,
            total: null,
        };
    }

    if (operation === "%") {
        if (obj.operation && obj.next) {
            const result = operate(obj.total, obj.next, obj.operation);
            return {
                total: Big(result)
                    .div(Big("100"))
                    .toString(),
                next: null,
                operation: null,
            };
        }
        if (obj.next) {
            return {
                next: Big(obj.next)
                    .div(Big("100"))
                    .toString(),
            };
        }
        return {};
    }

    if (operation === ".") {
        if (obj.next) {
            // ignore a . if the next number already has one
            if (obj.next.includes(".")) {
                return {};
            }
            return { next: obj.next + "." };
        }
        return { next: "0." };
    }

    if (operation === "=") {
        if (obj.next && obj.operation) {
            return {
                total: operate(obj.total, obj.next, obj.operation),
                next: null,
                operation: null,
            };
        } else {
            // '=' with no operation, nothing to do
            return {};
        }
    }

    if (operation === "+/-") {
        if (obj.next) {
            return {
                next: (-1 * parseFloat(obj.next)).toString()
            };
        }
        if (obj.total) {
            return {
                total: (-1 * parseFloat(obj.total)).toString()
            };
        }
        return {};
    }

    // Button must be an operation

    // When the user presses an operation button without having entered
    // a number first, do nothing.
    // if (!obj.next && !obj.total) {
    //   return {};
    // }

    // User pressed an operation button and there is an existing operation
    if (obj.operation) {
        return {
            total: operate(obj.total, obj.next, obj.operation),
            next: null,
            operation: operation,
        };
    }

    // no operation yet, but the user typed one

    // The user hasn't typed a number yet, just save the operation
    if (!obj.next) {
        return { operation: operation };
    }

    // save the operation and shift 'next' into 'total'
    return {
        total: obj.next,
        next: null,
        operation: operation,
    };
}