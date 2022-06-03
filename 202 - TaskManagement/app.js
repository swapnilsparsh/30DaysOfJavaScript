document.addEventListener('DOMContentLoaded', (event) => {  
    var dragSrcEl = null;  
    function handleDragStart(e) {  
     this.style.opacity = '0.1';  
     this.style.border = '3px dashed #c4cad3';  
     dragSrcEl = this;  
     e.dataTransfer.effectAllowed = 'move';  
     e.dataTransfer.setData('text/html', this.innerHTML);  
    }  
    function handleDragOver(e) {  
     if (e.preventDefault) {  
      e.preventDefault();  
     }  
     e.dataTransfer.dropEffect = 'move';  
     return false;  
    }  
    function handleDragEnter(e) {  
     this.classList.add('task-hover');  
    }  
    function handleDragLeave(e) {  
     this.classList.remove('task-hover');  
    }  
    function handleDrop(e) {  
     if (e.stopPropagation) {  
      e.stopPropagation(); // stops the browser from redirecting.  
     }  
     if (dragSrcEl != this) {  
      dragSrcEl.innerHTML = this.innerHTML;  
      this.innerHTML = e.dataTransfer.getData('text/html');  
     }  
     return false;  
    }  
    function handleDragEnd(e) {  
     this.style.opacity = '1';  
     this.style.border = 0;  
     items.forEach(function (item) {  
      item.classList.remove('task-hover');  
     });  
    }  
    let items = document.querySelectorAll('.task');   
    items.forEach(function(item) {  
     item.addEventListener('dragstart', handleDragStart, false);  
     item.addEventListener('dragenter', handleDragEnter, false);  
     item.addEventListener('dragover', handleDragOver, false);  
     item.addEventListener('dragleave', handleDragLeave, false);  
     item.addEventListener('drop', handleDrop, false);  
     item.addEventListener('dragend', handleDragEnd, false);  
    });  
   }); 
