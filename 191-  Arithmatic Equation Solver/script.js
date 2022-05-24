

// token types
const NUMBER = "number";
const VAR = "var";
const OPERATOR = "operator";
const ASSIGN = "assign";

const OPENPARENTHESiS = "openparenthesis";
const CLOSEPARENTHESIS = "closeparenthesis";


// key-value collection for storing variables
const variables = {};


// handles assign statements (e.g. "X = 400 + 2"), and expressions (e.g. "X + 500")
function evaluate(expr) {
    let tokens = tokenize(expr);

    if(isAssignment(tokens)) {
        return evalAssignment(tokens);
    }

    return evalExpression(tokens);
}


function evalAssignment(tokens) {
    let name = tokens[0].value,
        value = evalExpression(tokens.splice(2));

    variables[name] = value;
    return value; 
}


function evalExpression(tokens) {
    let operators = [],
        values = [];

    // check for expressions such as "-100 * y"
    checkUnaryMinus(tokens);

    while(tokens.length > 0) {

        // extract left-most token
        let token = tokens.shift(),
            {type, value} = token;

        switch(type) {
            case NUMBER:
                values.push(value);
                break;

            case VAR:
                values.push(resolveVariable(value));
                break;

            case OPENPARENTHESiS:
                operators.push(token);

                // check for expressions such as "x * (-40.5)"
                checkUnaryMinus(tokens);
                break;

            case CLOSEPARENTHESIS:
                handleCloseParenthesis(operators, values);
                break;

            case OPERATOR:
                handleOperator(token, operators, values);
                break;
        }
    }


    while(operators.length > 0) {
        let op = operators.pop();
        applyOperator(op.value, values);
    }


    // at this point, there should be only one token left (a number with final value)
    if(values.length != 1) {
        throw new Error("Wrong expression, cannot evaluate");
    }
    

    return values[0];
}


function resolveVariable(name) {
    let value = variables[name];

    if(value == undefined) {
        throw new Error(`Unknown variable: ${name}`);
    }

    return value;
}


function handleCloseParenthesis(operators, values) {
    while(true) {
        let op = operators.pop();

        if(op == undefined) {
            throw new Error("Syntax error: ')' found without pair '('");
        }

        if(op.type == OPENPARENTHESiS) {
            break;
        }

        applyOperator(op.value, values);
    }
}


function handleOperator(op, operators, values) {
    let {value} = op;

    if(value == "^") {
        operators.push(op);
        return;
    }

    while(true) {
        let op2 = peek(operators);

        if(op2 == undefined) {
            break;
        }

        if(op2.type == OPENPARENTHESiS) {
            break;
        }

        if(getPrecedence(op2.value) < getPrecedence(value)) {
            break;
        }


        // discard op2
        operators.pop();

        applyOperator(op2.value, values);
    }

    operators.push(op);
}


function applyOperator(op, stack) {
    let right = stack.pop(),
        left = stack.pop();

    if(left == undefined || right == undefined) {
        throw new Error(`Syntax error: cannot apply operator ${op} on non-existent values`);
    }

    let result;

    switch(op) {
        case "+":
            result = left + right;
            break;

        case "-":
            result = left - right;
            break;

        case "*":
            result = left * right;
            break;

        case "/":
            result = left / right;
            break;

        case "^":
            result = Math.pow(left, right);
            break;

        default:
            throw new Error(`Unknown operator: ${op}`);
    }

    stack.push(result);
}


function getPrecedence(op) {
    switch(op) {
        case "^":
            return 3;

        case "*":
        case "/":
            return 2;

        case "+":
        case "-":
            return 1;
    }

    throw new Error(`Unknown operator: ${op}`);
}


function peek(stack) {
    let {length} = stack;

    if(length > 0) {
        return stack[length - 1];
    }

    return undefined;
}


// a unary minus has highest precedence, and can happen on first postion, or immediately after "("
// for example "-100 * y", or "x * (-40.5)"
function checkUnaryMinus(tokens) {
  if(tokens.length < 2) {
    return;
  }
  
  let first = tokens[0],
      second = tokens[1];
  
  if(first.type != OPERATOR) {
    return;
  }
  
  if(first.value != "-") {
    return;
  }


  let {type, value} = second;

  switch(type) {
    case NUMBER:
         second.value = -value;
         break;

    case VAR:
        second.value = -resolveVariable(value);
        second.type = NUMBER;

        break;

    default:
        throw new Error("Only a number or variable can follow the unary '-' operator");
  }
  
  
  // get rid of "-" element
  tokens.shift();
}


function tokenize(expr) {
    let tokens = [],
        inWord = false,
        word = "";

    for(let i = 0; i < expr.length; i++) {
        let ch = expr.charAt(i);

        if(isLetter(ch) || isDigit(ch)) {
            inWord = true;
            word += ch;

            continue;
        }

        if(inWord) {
            tokens.push(getToken(word));

            inWord = false;
            word = "";
        }

        if(isWhitespace(ch)) {
            continue;
        }

        if(isOperator(ch)) {
            tokens.push({
                type: OPERATOR,
                value: ch
            });

            continue;
        }

        if(ch == "=") {
            tokens.push({
                type: ASSIGN,
                value: ch
            });

            continue;
        }

        if(ch == "(") {
            tokens.push({
                type: OPENPARENTHESiS,
                value: ch
            });

            continue;
        }

        if(ch == ")") {
            tokens.push({
                type: CLOSEPARENTHESIS,
                value: ch
            });

            continue;
        }


        throw new Error(`Unknown character: ${ch}`);
    }


    if(word) {
        tokens.push(getToken(word));
    }


    return tokens;
}


function getToken(word) {
    if(isLetter(word.charAt(0))) {
        return {
            type: VAR,
            value: word
        };
    }

    return {
        type: NUMBER,
        value: parseFloat(word)
    };
}


// a - z, A - Z, and underscore
function isLetter(ch) {
    if(between(ch, "a", "z")) {
        return true;
    }

    if(between(ch, "A", "Z")) {
        return true;
    }

    return ch === "_";
}


// 0 - 9 and dot
function isDigit(ch) {
    if(between(ch, "0", "9")) {
        return true;
    }

    return ch === ".";
}


function between(val, min, max) {
    return min <= val && val <= max;
}


function isWhitespace(ch) {
    return ch == " " || ch == "\t" || ch == "\r" || ch == "\n";
}


function isOperator(ch) {
    return ch == "+" || ch == "-" || ch == "*" || ch == "/" || ch == "^";
}


function isAssignment(tokens) {
    return tokens.length > 2 && tokens[0].type == VAR & tokens[1].value == "=";
}



window.onload = () => {
    let expr = document.getElementById("expr");

    expr.addEventListener("keypress", e => {
        if(e.key == "Enter") {
            doCalc();
        }
    });
}


function doCalc() {
    let expr = document.getElementById("expr")  ,
        result = document.getElementById("result");

    let calculatedValue,
        isErr = false;

    try {
        calculatedValue = evaluate(expr.value);
    } catch(err) {
        calculatedValue = err;
        isErr = true;
    }

    result.value += `> ${expr.value}\r\n${calculatedValue}\r\n\r\n`;
    result.scrollTop = result.scrollHeight;
  
    if(!isErr) {
      expr.value = "";
    }
}