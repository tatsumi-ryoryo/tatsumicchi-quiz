'use strict'

{
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const btn = document.getElementById('btn');
    const result = document.getElementById('result');
    const scoreLabel = document.querySelector('#result > p');

    const quizSet = shuffle([
        {q: 'たつみっちの故郷は?', c: ['滋賀県', '東京都', 'フランス']},
        {q: '世界で1番かっこいいのは?', c: ['たつみっち', '竹内涼真', '横浜流星']},
        {q: 'web業界において1番大切なのは?', c: ['楽しむこと', 'お金を稼ぐこと', 'すぐにインフルエンサーを信用すること']},
    ]);

    let currentNum = 0;
    let isAnswered;
    let score = 0;

    
    function shuffle(arr) {
        for (let i =arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
    }

    function checkAnswer(li) {
        if (isAnswered) {
            return;
        }
        isAnswered = true;
        if (li.textContent === quizSet[currentNum].c[0]) {
            li.classList.add('correct');
            score++;
        } else {
            li.classList.add('wrong');
        }

        btn.classList.remove('disabled');
    }
    
    function setQuiz() {
        isAnswered = false;
        question.textContent = quizSet[currentNum].q;

        while(choices.firstChild) {
            choices.removeChild(choices.firstChild);
        }
    
        const shuffledChoices = shuffle([...quizSet[currentNum].c]);
        shuffledChoices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', ()=> {
                checkAnswer(li);
            })
            choices.appendChild(li);
        });

        if (currentNum === quizSet.length - 1) {
            btn.textContent = 'Show Score';
        }
    }

    setQuiz();

    btn.addEventListener('click', () => {
        if (btn.classList.contains('disabled')) {
            return;
        }
        btn.classList.add('disabled');

        if (currentNum === quizSet.length - 1) {
            scoreLabel.textContent =`Score: ${score} / ${quizSet.length}`;
            result.classList.remove('hidden');
        } else {
            currentNum++;
            setQuiz();
        }
    });
}