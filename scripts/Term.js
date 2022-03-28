function colorLine(de, ate) {
    removeLine();
    let boxItem = document.querySelectorAll(".box-item");
    boxItem.forEach((el, key) => {
        if (key >= de && key <= ate) {
            el.classList.add('box-on');
        }
    });
}

function removeLine() {
    let boxItem = document.querySelectorAll(".box-item");
    boxItem.forEach((el, key) => {
        el.classList.remove('box-on');
    });
}

function cleanLine() {
    let boxItem = document.querySelectorAll(".box-item");
    boxItem.forEach((el, key) => {
        el.innerHTML = null;
        el.classList.remove('right');
        el.classList.remove('wrong');
        el.classList.remove('maybe');
        el.classList.remove('animate-letter');
    });
}

function addWord(line, word) {
    let boxItem = document.querySelectorAll(".box-item");
    boxItem[line].innerHTML = word;
    boxItem[line].classList.add("animate-letter");
}

function removeWord(line) {
    let boxItem = document.querySelectorAll(".box-item");
    boxItem[line].innerHTML = null;
    boxItem[line].classList.remove("animate-letter");
}

function randomWord() {
    const word = [
        'sagaz',
        'negro',
        'teste',
        'termo',
        'afeto',
        'inato',
        'mexer',
        'cerne',
        'ideia',
        'honra',
        'posse',
        'genro',
        'ceder',
        'denso',
        'ainda',
        'feliz',
        'falar',
        'forma',
        'meiga',
        'pleno',
        'limbo',
        'gerar',
        'lugar',
        'valor',
        'havia',
        'crise',
        'viver',
        'todos',
    ];
    return word[Math.floor(Math.random() * 28)];
}

document.addEventListener("DOMContentLoaded", function(e) {
    let obj = {
        'word': randomWord(),
        'wordPress': '',
        'item': 0
    }
    colorLine(0, 4);

    addEventListener("keyup", (event) => {
        if ((event.key == 'Backspace' || event.key == 'Delete') && obj.item >= 0) {
            removeWord(obj.item);
            if (obj.item == 0) {
                obj.item = 0;
            } else if (obj.item != 5 && obj.item != 10 && obj.item != 15 && obj.item != 20 && obj.item != 25 && obj.item != 30) {
                obj.item--;
            }
        }
    });

    addEventListener("keypress", (event) => {
        let press = event.key;
        if (event.key != 'Enter') {
            console.log(obj.word)
            if (obj.item >= 30) {
                reset(0);
            } else {
                addWord(obj.item, press);
                obj.item++;
                obj.wordPress += press;
            }
            action(obj.item);
        }
    });

    document.getElementById("btn").addEventListener("click", () => {
        let modal = document.getElementById("modal");
        let dialog = document.getElementById("dialog");
        modal.style.display = "none";
    });

    function action(it) {
        switch (it) {
            case 5:
                colorLine(5, 9);
                obj.wordPress = getWord(0, 4);
                checkWord(0, 4);
                break;

            case 10:
                colorLine(10, 14);
                obj.wordPress = getWord(5, 9);
                checkWord(5, 9);
                break;

            case 15:
                colorLine(15, 19);
                obj.wordPress = getWord(10, 14);
                checkWord(10, 14);
                break;

            case 20:
                colorLine(20, 24);
                obj.wordPress = getWord(15, 19);
                checkWord(15, 19);
                break;

            case 25:
                colorLine(25, 29);
                obj.wordPress = getWord(20, 24);
                checkWord(20, 24);
                break;

            case 30:
                obj.wordPress = getWord(25, 29);
                checkWord(25, 29);
                break;
        }
    }

    function getWord(de, ate) {
        let boxItem = document.querySelectorAll(".box-item");
        let word = '';
        boxItem.forEach((el, key) => {
            if (key >= de && key <= ate) {
                word += document.querySelectorAll(".box-item")[key].innerHTML;
            }
        });
        return word;
    }

    function checkWord(de, ate) {
        let boxItem = document.querySelectorAll(".box-item");
        let word = Array.from(obj.wordPress);
        let rightWord = Array.from(obj.word);
        let cont = 0;
        let status = 0;
        boxItem.forEach((el, key) => {
            if (key >= de && key <= ate) {
                if (word[cont] == rightWord[cont]) {

                    el.classList.add('right');
                    status++;
                } else {
                    if (rightWord.indexOf(word[cont]) == -1) {
                        el.classList.add('wrong');
                    } else {
                        el.classList.add('maybe');
                    }
                }
                cont++;
            }
        });

        if (status == 5) {
            reset(1);
        }

        obj.wordPress = '';
    }

    function messageModal(status) {
        let modal = document.getElementById("modal");
        let dialog = document.getElementById("dialog");
        let title = document.getElementById("dialog-title");

        modal.style.display = "flex";
        dialog.classList.add("animete-fadeInd");
        if (status) {
            title.innerHTML = 'Parabêns você ganhou!!!';
        } else {
            title.innerHTML = 'Opss.. não foi dessa vez';
        }

    }

    function reset(status) {
        setTimeout(() => {
            messageModal(status);
            cleanLine();
            colorLine(0, 4);
            obj.item = 0;
            obj.word = randomWord();
        }, 500);
    }

});