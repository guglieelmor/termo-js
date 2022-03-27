  function colorLine(de, ate){
    removeLine();
    let boxItem = document.querySelectorAll(".box-item");
    boxItem.forEach((el, key) => {
        if(key >= de && key <= ate){
            el.classList.add('box-on');
        }
    }); 
  }

  function removeLine(){
    let boxItem = document.querySelectorAll(".box-item");
    boxItem.forEach((el, key) => {
        el.classList.remove('box-on');
    }); 
  }

  function cleanLine(){
    let boxItem = document.querySelectorAll(".box-item");
    boxItem.forEach((el, key) => {
        el.innerHTML = null;
        el.classList.remove('right');
        el.classList.remove('wrong');
        el.classList.remove('maybe');
    }); 
  }

  function addWord(line, word){
    let boxItem = document.querySelectorAll(".box-item")[line].innerHTML = word;
  }

  function removeWord(line){
    let boxItem = document.querySelectorAll(".box-item")[line].innerHTML = null;
  }

document.addEventListener("DOMContentLoaded", function(e) {
  let obj = {
      'word': 'teste',
      'wordPress': '',
      'item': 0
  }
  colorLine(0, 4);

//   addEventListener("keyup", (event) => {
//     if(event.key == 'Backspace' || event.key == 'Delete'){
//         removeWord(obj.item);
//         obj.item--;
//     } 
//   });

  addEventListener("keypress", (event) => {
      let press = event.key;

      if(obj.item >= 30){
        cleanLine();
        colorLine(0, 4);
        messageModal();
        obj.item = 0;
      } else {
        addWord(obj.item, press);
        obj.item++;
        obj.wordPress += press;
      }

      action(obj.item);
  });
    
  document.getElementById("btn").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
  });

  function action(it){
      switch(it){
        case 5:
            colorLine(5, 9);
            checkWord(0, 4);
            break;

        case 10:
            colorLine(10, 14);
            checkWord(5, 9);
            break;

        case 15:
            colorLine(15, 19);
            checkWord(10, 14);
            break;

        case 20:
            colorLine(20, 24);
            checkWord(15, 19);
            break;

        case 25:
            colorLine(25, 29);
            checkWord(20, 24);
            break;

        case 30:
            checkWord(25, 29);
            break;
      }
  }
  

  function checkWord(de, ate){
    let boxItem = document.querySelectorAll(".box-item");
    let word = Array.from(obj.wordPress);
    let rightWord = Array.from(obj.word);
    let cont = 0;
    let exist;
    boxItem.forEach((el, key) => {
        if(key >= de && key <= ate){
            if(word[cont] == rightWord[cont]){

                el.classList.add('right');
            } else {
                if(rightWord.indexOf(word[cont]) == -1){
                    el.classList.add('wrong'); 
                } else {
                    el.classList.add('maybe');
                }
            }
            cont++;
        }
    }); 

    obj.wordPress = '';                                                                                                                         
  }

  function messageModal(){
    document.getElementById("modal").style.display = "flex";
  }

});