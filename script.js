const startBtn = document.querySelector('.start-btn');
const kilavuzBtn = document.querySelector('.kilavuzbtn');
const popupInfo = document.querySelector('.popup-info');
const flipbook = document.querySelector('.recipe-book');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const goHomeBtn = document.querySelector('.goHome-btn');
const GeriBildirim = document.querySelector('.geribilAl-btn');
const feedBackBox = document.querySelector('.feedback-box');
const anasayfa = document.querySelector('.ana-btn');
const geribilBox = document.querySelector('.feedback-text');
const pages = document.querySelectorAll('.page');
const geriBtn = document.querySelector('.geritusu');
const geriflpBtn = document.querySelector('.buton');

geriBtn.onclick = () => {
    feedBackBox.classList.remove('active');
    resultBox.classList.add('active');
    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Skorunuz : ${userScore} / ${questions.length}`;
    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = Math.min((userScore / questions.length) * 100, 100); // Yüzdeyi 100 ile sınırla
    let speed = 20;
    let progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#4b2977 ${progressStartValue * 3.6}deg,
         rgba(255,255,255,.1) 0deg)`;
        if (progressStartValue >= progressEndValue) { // progressStartValue 100'e eşit ya da büyük olduğunda durdur
            clearInterval(progress);
        }
    }, speed);    
}


kilavuzBtn.onclick = () => {
    main.classList.add('active'); // main bulanık sayfa
    flipbook.classList.add('active');
    
}

startBtn.onclick = () => {
    popupInfo.classList.add('active'); // popinfo quiz acıklama sayfa
    main.classList.add('active'); // main bulanık sayfa
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active'); // sorular
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');
    showQuestions(0); /*ilk soruyu gosterir acınca */
    questionCounter(1); /* ilk soru old gosterir altta */
    headerScore(); /* skor kısmını gosteren */
}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
}



GeriBildirim.onclick = () => {
    resultBox.classList.remove('active');
    feedBackBox.classList.add('active');
    const scoreText = document.querySelector('.feedback-total');
    scoreText.textContent = `Skorunuz : ${userScore} / ${questions.length}`;

    // Soruları konularına göre ayır
    const topicAQuestions = [1, 2, 3, 6,10,16];
    const topicBQuestions = [7,11,13,14,25,26];
    const topicCQuestions = [4, 8, 12, 15,27,28];
    const topicDQuestions = [5, 9, 17, 21, 22,24];
    const topicEQuestions = [18,19,20,23,29,30];

    // Konulara göre doğru cevap sayısını hesapla
    let topicACorrectCount = 0;
    let topicBCorrectCount = 0;
    let topicCCorrectCount = 0;
    let topicDCorrectCount = 0;
    let topicECorrectCount = 0;

    for (let i = 0; i < questions.length; i++) {
        const questionNumber = i + 1; // Soru numarası (1 tabanlı)
        if (!wrongQuestionNumbers.includes(questionNumber)) {
            // Soru yanlışlar arasında değilse doğru cevaplanmıştır
            if (topicAQuestions.includes(questionNumber)) {
                topicACorrectCount++;
            }
            if (topicBQuestions.includes(questionNumber)) {
                topicBCorrectCount++;
            }
            if (topicCQuestions.includes(questionNumber)) {
                topicCCorrectCount++;
            }
            if (topicDQuestions.includes(questionNumber)) {
                topicDCorrectCount++;
            }
            if (topicEQuestions.includes(questionNumber)) {
                topicECorrectCount++;
            }
        }
    }

    // Geri bildirim oluştur
    //let feedbackMessage = `Yanlış Cevapladığınız Sorular: ${wrongQuestionNumbers.join(', ')}.`;

    if (topicACorrectCount < 3) {
        feedbackMessage = `Temel siber güvenlik bilgilerine sahip değilsiniz. Temel kavramları (örneğin, siber güvenlik nedir, siber zorbalık nedir) anlamanıza yönelik içeriklere odaklanmalısınız. İnteraktif ve görsel eğitim materyalleri ilginizi çekebilir.`;
    }
    else if (topicACorrectCount >= 3){
        feedbackMessage = `Temel Siber Güvenlik Bilgilerine sahipsiniz. Diğer konulardaki gelişiminize odaklanabilirsiniz.`;

    }
    if(topicBCorrectCount < 3) {
        feedbackMessage += `Hata sayınız fazla olduğu için şifreleme ve hesap güvenliğiniz hakkında daha fazla bilgi edinmelisiniz, bunun için kılavuzdan yardım alabilirsiniz. Şifre güvenliği ve kimlik doğrulama yöntemleri üzerine temel bilgileri öğrendikten sonra, çevrimiçi güvenliğiniz çok daha güçlü olacaktır.`;
    }
    else if(topicBCorrectCount >= 3){
        feedbackMessage += `Şifre güvenliği, çok faktörlü kimlik doğrulama ve şifre yönetimi konularında başarılısınız.`;
    }
    if (topicCCorrectCount < 3) {
        feedbackMessage += `İnternet, Sosyal medya ve Elektronik cihazlarınızın güvenli kullanımı hakkında daha fazla bilgi edinmek için kılavuza göz atınız.`;
    }
    /*else if (topicCCorrectCount >= 3){
        feedbackMessage += ``;
    }*/
    if (topicDCorrectCount < 3) {
        feedbackMessage += `Antivirüs yazılımları, kişisel verilerin korunması bilinci, yazılım güncellemeleri ve sosyal mühendislik saldırıları gibi konularda bilgi eksikliğiniz söz konusu olabilir.`;
    }
    /*else if (topicDCorrectCount >= 3){
        feedbackMessage += ``;
    }*/
    if (topicECorrectCount < 3) {
        feedbackMessage += `Kimlik avı, e-posta sahteciliği, sosyal mühendislik ve telefon dolandırıcılığı gibi tehditleri anlamak için daha fazla araştırma yapmanız yararınıza olur.`;
    }
    if (topicACorrectCount >= 3 && topicBCorrectCount >= 3 && topicCCorrectCount >=3 && topicDCorrectCount >= 3 && topicECorrectCount >=3){
        feedbackMessage = `Temel Seviye Siber Güvenlik bilgisine hakimsiniz. Orta-İleri seviye öğrenim için kaynak desteği isterseniz kılavuz sayfasından inceleyebilirsiniz.`;
    }
    if (topicACorrectCount < 3 && topicBCorrectCount < 3 && topicCCorrectCount <3 && topicDCorrectCount <3 && topicECorrectCount <3) {
        feedbackMessage += ` Hiçbir konuda yeterli başarı gösteremediniz.`;
    }

    geribilBox.textContent = feedbackMessage;
};



anasayfa.onclick = () => {
    quizSection.classList.remove('active');
    feedBackBox.classList.remove('active');
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
}

/* Soru yansıdı sayfaya */
let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn'); /* butonu tanımladık. */

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);
        questionNumb++;
        questionCounter(questionNumb);  /* kacıncı soru old altta gosteren yer dinamiklesti*/
        nextBtn.classList.remove('active'); /* butonu kaldırdı */
    }
    else {
        showResultBox(); /* questions completed */
    }
}

const optionList = document.querySelector('.option-list'); /* soruların old nesne tanımlandı */

/* soruları arraydan alıyoruz.*/
function showQuestions(index) {
    const questionText = document.querySelector('.question-text'); /* soru kısmını tanımladık */
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
                     <div class="option"><span>${questions[index].options[1]}</span></div>
                     <div class="option"><span>${questions[index].options[2]}</span></div>
                     <div class="option"><span>${questions[index].options[3]}</span></div>`;
    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}
let wrongQuestionNumbers = []; 
function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    }
    else {
        wrongQuestionNumbers.push(questions[questionCount].numb);
        answer.classList.add('incorrect');
        for (let i = 0; i < allOptions; i++) { /* diger seceneklere tıklanmıyo olsun */
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }

    }

    for (let i = 0; i < allOptions; i++) { /* diger seceneklere tıklanmıyo olsun */
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');

}


/* kacıncı soru old footerda yazdıgımız kısım icin */
function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} / ${questions.length}  `;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Skor: ${userScore} / ${questions.length}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');
    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Skorunuz : ${userScore} / ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = Math.min((userScore / questions.length) * 100, 100); // Yüzdeyi 100 ile sınırla deger fırlamasın
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#4b2977 ${progressStartValue * 3.6}deg,
         rgba(255,255,255,.1) 0deg)`;
        if (progressStartValue >= progressEndValue) { // progressStartValue 100'e eşit ya da büyük olduğunda durdur
            clearInterval(progress);
        }
    }, speed);
}
