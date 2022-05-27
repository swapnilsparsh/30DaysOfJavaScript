function drawGraph() {
  canvas = O('graphArea');
  context = canvas.getContext('2d');
  var i;
  context.beginPath();    
  context.strokeStyle = '#FAFAD2';
   
  for(i = 0; i < 639; i += 10) {
    context.moveTo(i, 0);
    context.lineTo(i, 479);
  }  
  for(i = 0; i < 479; i += 10) {
    context.moveTo(0, i);
    context.lineTo(639, i);
  }   
  context.stroke(); 
  context.closePath();

  context.beginPath();
  context.strokeStyle = 'black';
  context.moveTo(0, 240);
  context.lineTo(639, 240);
  context.moveTo(320, 0);
  context.lineTo(320, 479);
  context.strokeStyle = 'black';
  context.stroke(); 
  context.closePath(); 
}

function plotComplex(str, l_LHS, l_RHS) {
  if(complexonLHS(str, str.length) == 1  && complexonRHS(str, str.length) == 1) {
    alert("Invalid equation entered , Equation in form of y = f(x) or x = f(y) required" + 
          " both sides compound functions" );
  }
  else if(complexonLHS(str, str.length)) {
    var tmp = l_RHS.head;
    tmp = tmp.next;
    //alert("Complex function is on LHS");
    if(l_RHS.nodes() != 1) {
      alert("Invalid equation entered ," + "Equation in form y = f(x) or x = f(y) required");
      return;
    }
    switch(tmp.variable) {
    case 'x':    plotAlongX(l_LHS); break;
    case 'y':    plotAlongY(l_LHS); break;
    default :    alert("Invalid equation! Expecting x/y character on RHS");
    }
  }
  else if(complexonRHS(str, str.length)) {
    var tmp = l_LHS.head;
    tmp = tmp.next;
    //alert("Complex function is on RHS");
    if(l_LHS.nodes() != 1) {
      alert("Invalid equation entered! " + "Must be of form y = f(x) or x = f(y)");
      return;
    }
    switch(tmp.variable) {
    case 'x':    plotAlongX(l_RHS); break;
    case 'y':    plotAlongY(l_RHS); break;
    default :    alert("Invalid equation! Expecting x/y character on LHS");
    }
  }
}

function putPixel(x, y) {
  context.beginPath();
  context.strokeStyle = 'red';
  context.moveTo(x, y);
  context.lineTo(x+1, y+1);
  context.stroke();
  context.closePath();
}

function plotGraph(list_LHS, list_RHS) {
  canvas = O('graphArea');
  context = canvas.getContext('2d');
  //alert("In plotGraph");
  //alert(l_LHS.display() + " = " + l_RHS.display());
 
  var i, j, start = 0, px, py, dx, dy, ppx, ppy,x, y;
  var fx = [0,0,0];
  var fy = [0,0,0];
  dx = degree('x', list_LHS, list_RHS);
  dy = degree('y', list_LHS, list_RHS);
  if(hasNegativePowers(list_LHS, list_RHS)  == true && 
    isHyperbola(list_LHS, list_RHS, dx, dy) == false) {
    plotNegativePowers(list_LHS, list_RHS);
    return;
  } 
  else if(isHyperbola(list_LHS, list_RHS, dx, dy) && 
          hasNegativePowers(list_LHS, list_RHS) == false) {
    plotHyperbola(list_LHS, list_RHS);
    return;
  }
  scaleGraph(50, 1);
  context.beginPath();
  context.strokeStyle = 'red'; 
    
  //alert("dx : " + dx.toString() + "dy : " + dy.toString());
  if(dx > dy) {
    for(i = 0; i < 640; i++) {
      for(j = 0; j < 480; j++) {
        if(evaluate(list_LHS, i-320, 240-j) == evaluate(list_RHS, i-320, 240-j)) {
          //alert("evaluate true at i : " + i.toString() + ", " + "j : " + j.toString());
          if(start != 0) {
            context.moveTo(px, py);
            context.lineTo(i, j);
            context.stroke();
          }
          start = 1;
          px = i, py = j;
        }
      }
    }
  }
  else {
        
    for(j = 0; j < 480; j++) {
      for(i = 0; i < 640; i++) {
        
        if(evaluate(list_LHS, i-320, 240-j) == evaluate(list_RHS, i-320, 240-j)) {
          //alert("evaluate true at i : " + i.toString() + ", " + "j : " + j.toString());
          if(start > 2) {
            context.moveTo(ppx, ppy);
            context.lineTo(i, j);
            context.stroke();
          }
          if(start < 3) {
            fx[start] = i;
            fy[start] = j;
          }
          if(start == 3) {
            context.moveTo(fx[1], fy[1]);
            context.lineTo(fx[0], fy[0]);
            context.moveTo(fx[2], fy[2]);
            context.lineTo(fx[0], fy[0]);
            context.stroke();
          }
          start++;
          ppx = px, ppy = py;
          px = i, py = j;
          x = i, y = j;
        }
      }
    }  
    context.moveTo(ppx, ppy);
    context.lineTo(x, y);
    context.moveTo(px, py);
    context.lineTo(x, y);
    context.stroke();
  }
  context.closePath();
} 

function main() {
  var str = document.forms["myForm"]["str"].value;
  if(str === null || str == "") {
    alert("Equation field must be filled out");
    return false;
  }
  var l_LHS, l_RHS, s = "";
  l_LHS = findSIDE(str, str.length, 0);
  if(l_LHS != null)
    l_RHS = findSIDE(str, str.length, 1);
  plotGraph(l_LHS, l_RHS);
  
  s += ("You entered: " + (polyList(l_LHS, l_RHS)).toString());  
  O('error').innerHTML = s;
  plotGraph(l_LHS, l_RHS);
  //alert(s);
}  

function Node(coeff, variable, power, func, farg, fpower) {
  this.coeff = coeff;
  this.variable = variable;
  this.power = power;
  this.func = func;
  this.farg = farg;
  this.fpower = fpower;
  this.next = null;  
}

function LinkedList() {
  this.head = new Node("head", "head", "head" , "", "", "");
  this.insert = insert;
  this.find = find;
  this.display = display;
  this.nodes = nodes;
}

function insert(c, v, p, ff, farg, fp) {
  var newNode = new Node(c, v, p, ff, farg, fp);
  var currNode = this.head;
  
  while(currNode.next)
    currNode = currNode.next;
  currNode.next = newNode;
  
  return newNode;
}

function nodes() {
  var tmp = this.head, count = 0;
  tmp = tmp.next;
  while(tmp) {
    count++;
    tmp = tmp.next;
  }
  return count;
}

function find(c, v, p) {
  var tmp = this.head;
  while(tmp) {
    if(tmp.coeff == c  && tmp.variable == v  && tmp.power == p)
      break;
    tmp = tmp.next;
  }
  return tmp;
}

function display() {
  var tmp = this.head;
  var s = "";
  var tmpFUN = ["sin", "sec", "cos", "cot", "tan", "log", "cosec", "e"];

  tmp = tmp.next;
  while(tmp) {
    s += ("(" + (tmp.coeff).toString() + ") * " + 
          (tmp.variable).toString() + "^" + 
         (tmp.power).toString());
    if(tmp.func > -1) {
      s += tmpFUN[tmp.func];

      s += (" ( (" + (tmp.farg.coeff).toString() + ") * " + 
          (tmp.farg.variable).toString() + "^" + 
         (tmp.farg.power).toString()) + ") ^ " + tmp.fpower.toString();
    }
    tmp = tmp.next;

    if(tmp)
      s += " + ";
  }
  s += "\b\b    ";
  return s;
}

function isDigit(c) {
  if(c >= '0' && c <= '9')
    return true;
  else 
    return false;
}

function findSIDE(str, size, side) {
  var list = new LinkedList();
  var i = 0, err = "", msg;
  var sentinel, equality;
  equality = str.indexOf('=');
  sentinel = (side == 0) ? equality : size;
  i = (side == 1) ? (equality + 1) : 0;
  if(equality == -1) {
    alert("ERROR : Invalid equation entered[No '=' specified]");
    return null;
  }
  //msg += ("Entering loop with i : " + i + ", sentinel : " + sentinel);
  //alert(msg);
  while(i < sentinel) {
    i = fetchNode(list, str, size, i, sentinel, side);
    if(i == null)
      return i;

  }  
  //alert("Exiting findSIDE");
  return list;
}

function escapeWhitespace(str, size, i) {
  while(i < size && str.charAt(i) == ' ')
    i++;
  return i;
}

function polyList(l_LHS, l_RHS) {
  var s = "";
  s += l_LHS.display();
  s += " = ";
  s += l_RHS.display();
  return s;
}

function degree(v, l_LHS, l_RHS) {
  var tmp, deg = 0;
  tmp = l_LHS.head;
  while(tmp) {
    if(tmp.variable == v) 
      if(tmp.power > deg)
        deg = tmp.power;
    tmp = tmp.next;
  }
  for(tmp = l_RHS.head; tmp != null; tmp = tmp.next) { 
    if(tmp.variable == v) {
      if(tmp.power > deg)
        deg = tmp.power;
    }
  }
  return deg;
}

function O(obj) {
  if(typeof obj == 'object') return obj;
  else return document.getElementById(obj);
}

function S(obj) {
  return O(obj).style;
}


function C(name) {
  var elements = document.getElementsByTagName("*");
  var objects = [];
  
  for(var i = 0; i < elements.length; i++)
    if(elements[i].className == name)
      objects.push(elements[i]);
  
  return objects;
}

function evaluate(start, x, y) {
  var temp = start.head;
  temp = temp.next;
  var c = 0, func = -1, arg = 0, m;
  var count = 0;
  //alert("evaluate called for " + start.display());
  while(temp) {
    arg = 0, m = 1, c = 0;
    switch(temp.variable) {
    case 'x':
      c = (temp.coeff * (Math.pow(x, temp.power)));
      break;
    case 'y':
      c = (temp.coeff * (Math.pow(y, temp.power)));
      break;
    case 'c':
      c = temp.coeff;
      break;
    }
    //alert("temp.func : " + temp.func.toString());
    if(temp.func != -1) {
      switch(temp.farg.variable) {
      case 'x':
        arg = (temp.farg.coeff * (Math.pow(x, temp.farg.power)));
        break;
      case 'y':
        arg = (temp.farg.coeff * (Math.pow(y, temp.farg.power)));
        break;
      case 'c':
        arg = temp.farg.coeff;
        break;
      }
      switch(temp.func) {
      case 0: m = Math.sin(arg); break;
      case 1: m = 1/Math.cos(arg); break;
      case 2: m = Math.cos(arg); break;
      case 3: m = 1/Math.tan(arg); break;
      case 4: m = Math.tan(arg); break;
      case 5: m = Math.log(arg); break;
      case 6: m = 1/Math.sin(arg); break;
      case 7: m = Math.pow(2.71828, arg); break;
      }
      m = Math.pow(m, temp.fpower);  
      //alert("m = " + m.toString());
    }
    count += (c*m);
    temp = temp.next;
  }
  //alert("evaluate(" +  start.display() + ", " + x.toString() + ", " +  y.toString() +
  //      ") : " + count.toString());
  return count;
}

function fetchNode(list, str, size, i, sentinel, side) {
  var tokenFound = false;
  var c = 0, p = 0, v = 'c';
  var sign = '+', fsign = '+', psign = '+';
  var isComplex = false, func, farg, fp;
  var parenthesis = 0;
  farg = new Node(0, 'c', 0, -1, null, 0);
      
  i = escapeWhitespace(str, size, i);
  if(str.charAt(i) == '-' || str.charAt(i) == '+') {
    sign = str.charAt(i);
    i++;
  }
  i = escapeWhitespace(str, size, i);
  while(isDigit(str.charAt(i))) {
    c = (str.charAt(i) - '0') + c*10;
    tokenFound = true;
    i++;
  }
  c = (sign == '-') ? -c : c;
  //msg = "c = " + c.toString();
  //alert(msg);
     
  i = escapeWhitespace(str, size, i);    
  if(str.charAt(i) == 'x' || str.charAt(i) == 'y') {
    v = (str.charAt(i) == 'x') ? 'x' : ((str.charAt(i) == 'y') ? 'y' : 'c');
    if(v != 'c' && c == 0) 
      c = (sign == '-') ? -1 : 1;
    i++;
  }
  if(tokenFound == false)
    tokenFound = (v == 'c') ? false : true;    
    
  i = escapeWhitespace(str, size, i); 
  if(str.charAt(i) == '^') {
    i++;
    
    if(str.charAt(i) == '(') {
      parenthesis++; i++;
    } 
    if(str.charAt(i) == '-') {
      psign = '-'; i++;
    }  
    while(isDigit(str.charAt(i))) {
      p = ((str.charAt(i) - '0') + p*10);
      i++;
    }
    if(str.charAt(i) == ')')
      parenthesis--, i++;
    p = psign == '-' ? -p : p;
  }
  else 
    p = (v == 'c') ? 0 : 1;
     
  i = escapeWhitespace(str, size, i);
  while(str.charAt(i) == '(') {
    //alert("Parenthesis++ near i : " + i.toString());
    parenthesis++;
    i++;
  }
  i = escapeWhitespace(str, size, i);
  if(str.charAt(i) == 's'  ||  str.charAt(i) == 'c'  
    || str.charAt(i) == 't' || str.charAt(i) == 'l' || str.charAt(i) == 'e') {
    isComplex = false;
    //alert("There is a possiblity of complex func");
    if(str.charAt(i) == 'e') {
      isComplex = true;
      func = 7;
      if(str.charAt(i+1) != '^')
        alert("Error : Expected ^ character near 'e'");
    }
    if(i+5 < size && isComplex == false) {
      if(str.charAt(i) == 'c' && str.charAt(i+1) == 'o' && str.charAt(i+2) == 's' &&
         str.charAt(i+3) == 'e' && str.charAt(i+4) == 'c') {
        func = 6;
        isComplex = true;
      }
    }
    if(i+3 < size && isComplex == false) {
      if(str.charAt(i) == 's' && str.charAt(i+1) == 'i' && str.charAt(i+2) == 'n') {
        func = 0;
        isComplex = true;
      }
      else if(str.charAt(i) == 's' && str.charAt(i+1) == 'e' && str.charAt(i+2) == 'c') {
        func = 1;
        isComplex = true;
      }
      else if(str.charAt(i) == 'c' && str.charAt(i+1) == 'o' && str.charAt(i+2) == 's') {
        func = 2;
        isComplex = true;
      }
      else if(str.charAt(i) == 'c' && str.charAt(i+1) == 'o' && str.charAt(i+2) == 't') {
        func = 3;
        isComplex = true;
      }
      else if(str.charAt(i) == 't' && str.charAt(i+1) == 'a' && str.charAt(i+2) == 'n') {
        func = 4;
        isComplex = true;
      }
      else if(str.charAt(i) == 'l' && str.charAt(i+1) == 'o' && str.charAt(i+2) == 'g') {
        func = 5;
        isComplex = true;
      }
    }
    if(isComplex == false) {
      alert("Error: Invalid ratio entered(near character " + i.toString() + ")");
      return null;
    }
    if(func == 7) 
      i += 2;
    else
      i = (func == 6) ? (i+5) : (i+3);
    
    //var tmpFUN = ["sin", "sec", "cos", "cot", "tan", "log", "cosec", "e"];
    //alert("function found " + (i != -1) ? tmpFUN[func].toString() : "(nil)");  
    var argFound = false;
    i = escapeWhitespace(str, size, i);
    while(str.charAt(i) == '(') {
      //alert("Parenthesis++ near i : " + i.toString());
      parenthesis++;
      i++;
    }
    if(str.charAt(i) == '-' || str.charAt(i) == '+') {
      fsign = str.charAt(i);
      i++;
    }
    i = escapeWhitespace(str, size, i);
    while(isDigit(str.charAt(i))) {
      farg.coeff = (str.charAt(i) - '0') + farg.coeff*10;
      i++;
    }
    farg.coeff = (fsign == '-') ? -farg.coeff : farg.coeff;
    argFound = (farg.coeff == 0) ? false : true;
    //msg = ("farg.coeff = " + farg.coeff.toString());
    //alert(msg);
     
    i = escapeWhitespace(str, size, i);
    if(str.charAt(i) == 'x' || str.charAt(i) == 'y') {
      farg.variable = (str.charAt(i) == 'x') ? 'x' : ((str.charAt(i) == 'y') ? 'y' : 'c');
      if(farg.varaible != 'c' && farg.coeff == 0) 
        farg.coeff = (fsign == '-') ? -1 : 1;
      i++;
    }
    if(argFound == false)
      argFound = (farg.variable == 'c') ? false : true;    
    
    i = escapeWhitespace(str, size, i); 
    while(str.charAt(i) == ')') {
      //alert("Parenthesis-- near i : " + i.toString());
      parenthesis--;
      i++;
    }
    if(str.charAt(i) == '^' && parenthesis > 0) {
      i++;    
      while(isDigit(str.charAt(i))) {
        farg.power = ((str.charAt(i) - '0') + farg.power*10);
        i++;
      }
    }
    else 
      farg.power = (farg.variable == 'c') ? 0 : 1;
    //alert("arg : "+farg.coeff.toString() +farg.variable.toString() + "^" + farg.power.toString());
    i = escapeWhitespace(str, size, i);
    
    while(str.charAt(i) == ')') {
      //alert("Parenthesis-- near i : " + i.toString());
      parenthesis--;
      i++;
      i = escapeWhitespace(str, size, i);
    }
    if(parenthesis != 0) {
      alert("Error : Mismatching parenthesis found parenthesis : " + parenthesis.toString());
      return null;
    }
    i = escapeWhitespace(str, size, i);
    fp = 1;
    if(str.charAt(i) == '^') {
      i++;
      fp = 0;
      while(isDigit(str.charAt(i))) {
        fp = ((str.charAt(i) - '0') + fp*10);
        i++;
      }
      if(fp == 0) {
        alert("Error No integer found after '^' token" + "near character " + i.toString());
        return null;
      }
    }
   
  }  
  i = escapeWhitespace(str, size, i);
  //msg = ("Scan complete, Sentinel wait" + " ,i : " + i.toString());
  //alert(msg);
  if(str.charAt(i) == '+' || str.charAt(i) == '=' || str.charAt(i) == '-'
    || i == size) {
    if(isComplex == false && tokenFound == true) 
      list.insert(c, v, p, -1, null, 0);
    else if(tokenFound == false && isComplex == true && argFound == true) {
      tokenFound = true;
      list.insert(sign == '+' ? 1 : -1, 'c', 0, func, farg, fp);
    }
    else if(tokenFound == true && isComplex == true && argFound == true) 
      list.insert(c, v, p, func, farg, fp); 

    else if(tokenFound == false) {
      alert("Error : Invalid symbol encountered at character(" + i.toString() 
            + ") expecting a constant or a variable [ No token found]");
      return null;
    }
    if(i >= sentinel)
      return i;
  }
  else {
    var err;
    err += ("Error : character " + i.toString() + "Invalid character (" 
            + (str.charAt(i)).toString() + ") : expected +, =]\n" + 
            "Invalid expression entered on " + (side ? "RHS" : "LHS"));
    alert(err);
    return null;
  }
  return i;
}

function hasComplexFunction(str, size) {
  var result = 0;
  if(str.search("sin") != -1 || str.search("cos") != -1 || str.search("tan") != -1 ||
     str.search("cosec") != -1 || str.search("sec") != -1 || str.search("cot") != -1 || 
     str.search("log") != -1 || str.search("e") != -1) 
    result = 1;
  //alert("hasComplexFunction() : " + result);
  return result;
}

function complexonRHS(str, size) {
  return hasComplexFunction(str.substr(str.indexOf("="), size), size);
}

function complexonLHS(str, size) {
  return hasComplexFunction(str.substr(0, str.indexOf("=")-1), size);
}

function plotAlongX(list) {
  var i, _y, _x, start = 0, px, py;
  scaleGraph(50, 0.1);
  canvas = O('graphArea');
  context = canvas.getContext('2d');
 
  context.strokeStyle = 'red';
  context.beginPath();
  //alert("In plotAlongX(" + list.display() + ")");
  for(i = 0; i < 48; i += 0.1) {
    _y = i - 24;
    _x = evaluate(list, 0, _y);
    if(start && ((Math.abs(px - _x)) < 32)) {
      context.moveTo(_x*10+320, (240-_y*10));  
      context.lineTo(px*10+320, 240-py*10);
    }
    context.stroke();
    start++;
    px = _x, py = _y;    
  }
  context.closePath();
}

function plotAlongY(list) {
  var i, _y, _x, start = 0, px, py;
  scaleGraph(50, 0.1);
  canvas = O('graphArea');
  context = canvas.getContext('2d');
 
  context.strokeStyle = 'red';
  context.beginPath();

  //alert("In plotAlongY(" + list.display() + ")"); 
  for(i = 0; i < 64; i += 0.1) {
    _x = i - 32;
    _y = evaluate(list, _x, 0);
    _y *= 10;
    if(start && ((Math.abs(py - _y)) < 24)) {
      context.moveTo(_x*10+320, (240-_y));  
      context.lineTo(px*10+320, 240-py);
    }         
    context.stroke();
    start++;
    px = _x, py = _y;
  }
  context.closePath();
}

function scaleGraph(scale, scaleFactor) {
  canvas = O('graphArea');
  context = canvas.getContext('2d');
 
  context.font = '12px Times';
  context.strokeText("O", 323, 238);
  context.moveTo(0, 240);
  context.beginPath();
  for(i = 240; i < 480; i += (scale)) {
    if(i == 240) continue;
    context.moveTo(317, i);
    context.lineTo(323, i);
    context.strokeText(((240-i)*scaleFactor).toString(), 290, i);
  } 
  for(i = 320; i < 640; i += (scale)) {
    if(i == 320) continue;
    context.moveTo(i, 237);
    context.lineTo(i, 243);
    context.strokeText(((i-320)*scaleFactor).toString(), i-10, 253);
  }
  for(i = 240; i > 0; i -= (scale)) {
    if(i == 240) continue;
    context.moveTo(317, i);
    context.lineTo(323, i);
    context.strokeText(((240-i)*scaleFactor).toString(), 297, i);
  } 
  for(i = 320; i > 0; i -= (scale)) {
    if(i == 320) continue;
    context.moveTo(i, 237);
    context.lineTo(i, 243);
    context.strokeText(((i-320)*scaleFactor).toString(), i-10, 253);
  }
  context.stroke();
}

function coeffOf(l_LHS, l_RHS, variable) {
  var tmp = l_LHS.head;
  tmp = tmp.next;
  while(tmp) {
    if(tmp.variable == variable) 
      return tmp.coeff;
    tmp = tmp.next;
  }
  
  tmp = l_RHS.head;
  tmp = tmp.next;
  while(tmp) {
    if(tmp.variable == variable) 
      return tmp.coeff;
    tmp = tmp.next;
  }
  return 0;
}

function powerOf(l_LHS, l_RHS, variable) {
  var tmp = l_LHS.head;
  tmp = tmp.next;
  while(tmp) {
    if(tmp.variable == variable) {
      return tmp.power;
    }
    tmp = tmp.next;
  }
  
  tmp = l_RHS.head;
  tmp = tmp.next;
  while(tmp) {
    if(tmp.variable == variable) 
      return tmp.power;
    tmp = tmp.next;
  }
  return 0;
}

function hasNegativePowers(l_LHS, l_RHS) {
  var tmp = l_LHS.head;
  tmp = tmp.next;
  while(tmp) {
    if(tmp.power < 0)
      return true;
    tmp = tmp.next;
  }
  
  tmp = l_RHS.head;
  tmp = tmp.next;
  while(tmp) {
    if(tmp.power < 0) 
      return true;
    tmp = tmp.next;
  }
  return false;
}

function isHyperbola(l_LHS, l_RHS, degx, degy) {
  if(degx == 2  &&  degy == 2) {
    if((coeffOf(l_LHS, l_RHS, 'x') < 0 && coeffOf(l_LHS, l_RHS, 'y') > 0) ||
       (coeffOf(l_LHS, l_RHS, 'x') > 0 && coeffOf(l_LHS, l_RHS, 'y') < 0)) 
      return true;
  }
  return false;
}
  
function plotNegativePowers(l_LHS, l_RHS) {
  if(powerOf(l_LHS, l_RHS, 'x') < 0) 
    plothybX(l_LHS, l_RHS);
  else 
    plothybY(l_LHS, l_RHS);
  context.closePath();
}

function plothybX(l_LHS, l_RHS) {
  scaleGraph(50, 0.1);
  canvas = O('graphArea');
  context = canvas.getContext('2d');
  context.beginPath();
  context.strokeStyle = 'red'; 
  var x1, x2, y1, y2, py1, py2, start = 0, i, px1, px2, m, p;   

  for(i = 0; i < 64; i += 0.1) {
    x1 = i - 32;
    m = Math.pow(x1, powerOf(l_LHS, l_RHS, 'x'));
    switch(powerOf(l_LHS, l_RHS, 'y')) {
    case 1:
      y1 = ((coeffOf(l_LHS, l_RHS, 'x')*m - coeffOf(l_LHS, l_RHS, 'c')) / 
            coeffOf(l_LHS, l_RHS, 'y'));
      p = 1;
      break;
    case 2:
      y1 = Math.sqrt((Math.abs(coeffOf(l_LHS, l_RHS, 'x'))*m - coeffOf(l_LHS, l_RHS, 'c')) /
                     coeffOf(l_LHS, l_RHS, 'y'));
      
      p = 2;
      break;
    }
      
    y1 *= 10;
    y2 = -y1;
    if(start && (Math.abs((240-py1)-(240-y1)) < 240)) {
      context.moveTo(x1*10+320, 240-y1);
      context.lineTo(px1*10+320, 240-py1);
      if(p == 2) {
        context.moveTo(x1*10+320, 240-y2);
        context.lineTo(px1*10+320, 240-py2);
      }
      context.stroke();
    }
    start++;
    px1 = x1, py1 = y1, py2 = y2;
  }      
  context.closePath();
}

function plothybY(l_LHS, l_RHS) {
  scaleGraph(50, 0.1);
  canvas = O('graphArea');
  context = canvas.getContext('2d');
  context.beginPath();
  context.strokeStyle = 'red'; 
  var x1, x2, y1, y2, py1, py2, start = 0, i, px1, px2, m, p;   

  for(i = 0; i < 48; i += 0.1) {
    y1 = 24-i;
    m = Math.pow(y1, powerOf(l_LHS, l_RHS, 'y'));

    switch(powerOf(l_LHS, l_RHS, 'x')) {
    case 1:
      x1 = ((coeffOf(l_LHS, l_RHS, 'y')*m - coeffOf(l_LHS, l_RHS, 'c')) /
                     coeffOf(l_LHS, l_RHS, 'x'));
      p = 1;
      break;
    case 2:
      x1 = Math.sqrt((Math.abs(coeffOf(l_LHS, l_RHS, 'y'))*m - coeffOf(l_LHS, l_RHS, 'c')) /
                     coeffOf(l_LHS, l_RHS, 'x'));
 
      p = 2;
      break;
    }
    x1 *= 10;
    x2 = -x1;
    if(start && Math.abs(x1-px1) < 320) {
      context.moveTo(x1+320, 240 - y1*10);
      context.lineTo(px1+320, 240-y1*10);
      if(p == 2) {
        context.moveTo(x2+320, 240-y1*10);
        context.lineTo(px2+320, 240-py1*10);
      }
      context.stroke();
    }
    start++;
    px1 = x1, px2 = x2, py1 = y1;
  }
  context.closePath();
}

function plotHyperbola(l_LHS, l_RHS) {
  if(coeffOf(l_LHS, l_RHS, 'x') < 0) 
    plothybX(l_LHS, l_RHS);
  else if(coeffOf(l_LHS, l_RHS, 'y') < 0) 
    plothybY(l_LHS, l_RHS);
}
     
