function swap(e, r) {
    let t = e.style.height;
    (e.style.height = r.style.height), (r.style.height = t);
  }
  function disableSortingBtn() {
    (document.querySelector(".bubbleSort").disabled = !0),
      (document.querySelector(".insertionSort").disabled = !0),
      (document.querySelector(".mergeSort").disabled = !0),
      (document.querySelector(".quickSort").disabled = !0),
      (document.querySelector(".selectionSort").disabled = !0);
  }
  function enableSortingBtn() {
    (document.querySelector(".bubbleSort").disabled = !1),
      (document.querySelector(".insertionSort").disabled = !1),
      (document.querySelector(".mergeSort").disabled = !1),
      (document.querySelector(".quickSort").disabled = !1),
      (document.querySelector(".selectionSort").disabled = !1);
  }
  function disableSizeSlider() {
    document.querySelector("#arr_sz").disabled = !0;
  }
  function enableSizeSlider() {
    document.querySelector("#arr_sz").disabled = !1;
  }
  function disableNewArrayBtn() {
    document.querySelector(".newArray").disabled = !1;
  }
  function enableNewArrayBtn() {
    document.querySelector(".newArray").disabled = !1;
  }
  function waitforme(e) {
    return new Promise((r) => {
      setTimeout(() => {
        r("");
      }, e);
    });
  }
  let arraySize = document.querySelector("#arr_sz");
  arraySize.addEventListener("input", function () {
    console.log(arraySize.value, typeof arraySize.value),
      createNewArray(parseInt(arraySize.value));
  });
  let delay = 260,
    delayElement = document.querySelector("#speed_input");
  delayElement.addEventListener("input", function () {
    console.log(delayElement.value, typeof delayElement.value),
      (delay = 320 - parseInt(delayElement.value));
  });
  let array = [];
  function createNewArray(e = 60) {
    deleteChild(), (array = []);
    for (let r = 0; r < e; r++) array.push(Math.floor(250 * Math.random()) + 1);
    const r = document.querySelector("#bars");
    for (let t = 0; t < e; t++) {
      const e = document.createElement("div");
      (e.style.height = 1.5 * array[t] + "px"),
        e.classList.add("bar"),
        e.classList.add("flex-item"),
        e.classList.add(`barNo${t}`),
        r.appendChild(e);
    }
  }
  function deleteChild() {
    document.querySelector("#bars").innerHTML = "";
  }
  createNewArray();
  const newArray = document.querySelector(".newArray");
  newArray.addEventListener("click", function () {
    console.log("From newArray " + arraySize.value),
      console.log("From newArray " + delay),
      enableSortingBtn(),
      enableSizeSlider(),
      createNewArray(arraySize.value);
  });

// bubble sort
async function bubble() {
    const ele = document.querySelectorAll(".bar");
    for (let i = 0; i < ele.length - 1; i++) {
      for (let j = 0; j < ele.length - i - 1; j++) {
        console.log("In jth loop");
        ele[j].style.background = "blue";
        ele[j + 1].style.background = "blue";
        if (parseInt(ele[j].style.height) > parseInt(ele[j + 1].style.height)) {
          await waitforme(delay);
          swap(ele[j], ele[j + 1]);
        }
        ele[j].style.background = "cyan";
        ele[j + 1].style.background = "cyan";
      }
      ele[ele.length - 1 - i].style.background = "green";
    }
    ele[0].style.background = "green";
  }
  const bubSortbtn = document.querySelector(".bubbleSort");
  bubSortbtn.addEventListener("click", async function () {
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await bubble();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
  });

  
// insertion sort
async function insertion() {
    const ele = document.querySelectorAll(".bar");
    ele[0].style.background = "green";
    for (let i = 1; i < ele.length; i++) {
      let j = i - 1;
      let key = ele[i].style.height;
      ele[i].style.background = "blue";
      await waitforme(delay);
      while (j >= 0 && parseInt(ele[j].style.height) > parseInt(key)) {
        ele[j].style.background = "blue";
        ele[j + 1].style.height = ele[j].style.height;
        j--;
        await waitforme(delay);
        for (let k = i; k >= 0; k--) {
          ele[k].style.background = "green";
        }
      }
      ele[j + 1].style.height = key;
      ele[i].style.background = "green";
    }
  }
  const inSortbtn = document.querySelector(".insertionSort");
  inSortbtn.addEventListener("click", async function () {
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await insertion();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
  });

// merge sort
async function merge(e, t, r, a) {
    const n = r - t + 1,
      l = a - r;
    let o = new Array(n),
      g = new Array(l);
    for (let r = 0; r < n; r++)
      await waitforme(delay),
        (e[t + r].style.background = "orange"),
        (o[r] = e[t + r].style.height);
    for (let t = 0; t < l; t++)
      await waitforme(delay),
        (e[r + 1 + t].style.background = "yellow"),
        (g[t] = e[r + 1 + t].style.height);
    await waitforme(delay);
    let i = 0,
      s = 0,
      y = t;
    for (; i < n && s < l; )
      await waitforme(delay),
        parseInt(o[i]) <= parseInt(g[s])
          ? (n + l === e.length
              ? (e[y].style.background = "green")
              : (e[y].style.background = "lightgreen"),
            (e[y].style.height = o[i]),
            i++,
            y++)
          : (n + l === e.length
              ? (e[y].style.background = "green")
              : (e[y].style.background = "lightgreen"),
            (e[y].style.height = g[s]),
            s++,
            y++);
    for (; i < n; )
      await waitforme(delay),
        n + l === e.length
          ? (e[y].style.background = "green")
          : (e[y].style.background = "lightgreen"),
        (e[y].style.height = o[i]),
        i++,
        y++;
    for (; s < l; )
      await waitforme(delay),
        n + l === e.length
          ? (e[y].style.background = "green")
          : (e[y].style.background = "lightgreen"),
        (e[y].style.height = g[s]),
        s++,
        y++;
  }
  async function mergeSort(e, t, r) {
    if (t >= r)
      return void console.log(`return cause just 1 elemment l=${t}, r=${r}`);
    const a = t + Math.floor((r - t) / 2);
    await mergeSort(e, t, a),
      await mergeSort(e, a + 1, r),
      await merge(e, t, a, r);
  }
  const mergeSortbtn = document.querySelector(".mergeSort");
  mergeSortbtn.addEventListener("click", async function () {
    let e = document.querySelectorAll(".bar"),
      t = parseInt(e.length) - 1;
    disableSortingBtn(),
      disableSizeSlider(),
      disableNewArrayBtn(),
      await mergeSort(e, 0, t),
      enableSortingBtn(),
      enableSizeSlider(),
      enableNewArrayBtn();
  });

// quick sort
async function partitionLomuto(e, t, a) {
    let n = t - 1;
    e[a].style.background = "red";
    for (let r = t; r <= a - 1; r++)
      (e[r].style.background = "yellow"),
        await waitforme(delay),
        parseInt(e[r].style.height) < parseInt(e[a].style.height)
          ? (console.log("In partitionLomuto for j if"),
            n++,
            swap(e[n], e[r]),
            (e[n].style.background = "orange"),
            n != r && (e[r].style.background = "orange"),
            await waitforme(delay))
          : (e[r].style.background = "pink");
    n++,
      await waitforme(delay),
      swap(e[n], e[a]),
      (e[a].style.background = "pink"),
      (e[n].style.background = "green"),
      await waitforme(delay);
    for (let t = 0; t < e.length; t++)
      "green" != e[t].style.background && (e[t].style.background = "cyan");
    return n;
  }
  async function quickSort(e, t, a) {
    if (t < a) {
      let n = await partitionLomuto(e, t, a);
      await quickSort(e, t, n - 1), await quickSort(e, n + 1, a);
    } else
      t >= 0 &&
        a >= 0 &&
        t < e.length &&
        a < e.length &&
        ((e[a].style.background = "green"), (e[t].style.background = "green"));
  }
  const quickSortbtn = document.querySelector(".quickSort");
  quickSortbtn.addEventListener("click", async function () {
    let e = document.querySelectorAll(".bar"),
      t = e.length - 1;
    disableSortingBtn(),
      disableSizeSlider(),
      disableNewArrayBtn(),
      await quickSort(e, 0, t),
      enableSortingBtn(),
      enableSizeSlider(),
      enableNewArrayBtn();
  });

// selection sort
async function selection() {
    const e = document.querySelectorAll(".bar");
    for (let t = 0; t < e.length; t++) {
      let n = t;
      e[t].style.background = "blue";
      for (let a = t + 1; a < e.length; a++)
        (e[a].style.background = "red"),
          await waitforme(delay),
          parseInt(e[a].style.height) < parseInt(e[n].style.height)
            ? (n !== t && (e[n].style.background = "cyan"), (n = a))
            : (e[a].style.background = "cyan");
      await waitforme(delay),
        swap(e[n], e[t]),
        (e[n].style.background = "cyan"),
        (e[t].style.background = "green");
    }
  }
  const selectionSortbtn = document.querySelector(".selectionSort");
  selectionSortbtn.addEventListener("click", async function () {
    disableSortingBtn(),
      disableSizeSlider(),
      disableNewArrayBtn(),
      await selection(),
      enableSortingBtn(),
      enableSizeSlider(),
      enableNewArrayBtn();
  });
  