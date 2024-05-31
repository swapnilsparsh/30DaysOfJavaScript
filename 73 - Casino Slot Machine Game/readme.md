> # Casino Slot Machine Game 
---

#### Slot machines include one or more currency detectors that validate the form of payment, whether coin, cash, voucher, or token. The machine pays out according to the pattern of symbols displayed when the reels stop "spinning".

**--> Here We will be using *emogies* in place of currency.** 
___

## How to make the **Casino Slot Machine** game  :->

>Technologies used: *html, CSS, simple JS*


> ## Our Game Looks like->

---
<br><br>

## **Approach :** <br>
<br>

> In 1st Div 3 slots are proived with some initial emogies .

```html
    <div class="machine">
      <div class="slot" id="slot1"><div class="value" id="value1">😂</div></div>
      <div class="slot" id="slot2"><div class="value" id="value2">😍</div></div>
      <div class="slot" id="slot3"><div class="value" id="value3">😎</div></div>
    </div>
```

> In 2nd Div We have 3 elements:
            <br> 1. **Controller which take input from 1 to 10 , decides the speed of changes of emogies**
            <br> 2. **START button**
            <br> 3. **STOP button**
```html
<div class='controllers'> 
        <input type='number' id='inpSpeed' min='1' max='10' value='1'>
        
        <button id='btnStart'onclick="startclick()">START</button>
        <button id='btnStop' onclick="stopclick()">STOP</button>

    </div>
```

> Last Div to show result = i) If you are winning   ii) OR you are loosing
```html

    </div>
        <div class='output' >
            <p id='myoutput'>Hey! You are Rocking 😎🔥</p>
        </div> 
```
  
  
---

## **-->*How Buttons , speed -controller and Output works ??***

>### 'START BUTTON' ::  
```html
 <button id='btnStart'onclick="startclick()">START</button>
```

** Clicking On 'START' button starclick() function Works.
```js
function startclick(){
    updateAnimation(inpSpeed.value)
    value1.classList.add('animation')
    value2.classList.add('animation')
    value3.classList.add('animation')
    

    myoutput.textContent = 'Hey! You are ON 😎🔥'
}
```
---

> ### Speed-Controller: Take input between from 1 to 10 and decrease and increase the speed.
```html
 <input type='number' id='inpSpeed' min='1' max='10' value='1'>
 ```
 
 ```js
 inpSpeed.onchange= function(ev){
   document.documentElement.style.setProperty('--speed', ev.target.value)
   updateAnimation(ev.target.value)
}
```
---

> ### ***STOP BUTTON:***
```html
<button id='btnStop' onclick="stopclick()">STOP</button>
```
->Clicking on STOP Button, stop the game and display the result in below div.

**How JS Works behind It**
```js
function stopclick(){
    clearInterval(animationId);

    console.log("stop button clicked")
    if(value1.innerText==value2.innerText && value2.innerText==value3.innerText){
        text = ' Well Done Boss , You Won! 😎😎😎'
    }else{
        text = ' OOPS!😐 Give it another try '
    }
```
> If on the time when emogies of all 3 slots are equal as -> You will win the game, and as a display there will be shown **Well Done Boss , You won!**
else , You will loose and will get to be shown that **OOPS! Give another try**


---

># **Demo Video**



