/*
2MMPa, Masir Zemarai NMDADI, Academiejaar 2015-2016
Bachelor in de grafische en digitale media, Multimediaproductie
Arteveldehogeschool
*/

(function() {
    var questions = [{
        question: "Hoe lang duren de Gentse Feesten?",
        choices: [5, 12, 7, 10],
        correctAnswer: 3
    }, {
        question: "Op welk plein zijn er geen evenementen te vinden van de Gentse Feesten?",
        choices: [ 'Grote markt', 'Korenmarkt', 'Groentemarkt', 'Kouter'],
        correctAnswer: 0
    }, {
        question: "Wie is de burgemeester van Gent?",
        choices: [ 'Herman Brusselmans', 'Sven Nys', 'Maggie De Block', 'Daniël Termont'],
        correctAnswer: 3
    }, {
        question: "Hoeveel feestgangers trekken de Gentse Feesten gemiddeld per dag?",
        choices: ['20 000', '50 000','100 000', '200 000'],
        correctAnswer: 2
    }, {
        question: "Welk jaar zijn de Gentse Feesten ontstaan?",
        choices: ['1960', '1878', '1913','1843'],
        correctAnswer: 3
    }, {
        question: "Hoeveel m2 bedraagt de totale oppervlakte van de Feestenzone?",
        choices: ['765 000 m2','150 000m2', '67 000m2', '512 000m2'],
        correctAnswer: 3
    }, {
        question: "Hoeveel ton afval wordt er ongeveer verzameld van op de straat gedurende de Gentse Feesten?",
        choices: ['45 ton', '10 ton', '130 ton','70 ton'],
        correctAnswer: 3
    }, {
        question: "Wie van de volgende personen is een bekende Gentenaar?",
        choices: ['Louis Tobback', 'Herman De Croo', 'Herman Brusselmans','Gert verhulst'],
        correctAnswer: 2
    }, {
        question: "Hoe worden de Gentse Feesten volgens de traditie geopend?",
        choices: ['Via vuurwerk', 'Voorstelling van KAAGent spelers', 'Klokken van het Belfort laten luiden','Door de belleman'],
        correctAnswer: 3
    }, {
        question: "Een van de muziekpodia is polé polé, maar wat betekent polé polé?",
        choices: ['Uit de bol gaan', 'Santé, Dans Dans','Kalmpjes aan'],
        correctAnswer: 2
    }];

    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object

    // Display initial question
    displayNext();

    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
        e.preventDefault();

        // Suspend click listener during fade animation
        if(quiz.is(':animated')) {
            return false;
        }
        choose();

        // If no user selection, progress is stopped
        if (isNaN(selections[questionCounter])) {
            alert('Please make a selection!');
        } else {
            questionCounter++;
            displayNext();
        }
    });

    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
        e.preventDefault();

        if(quiz.is(':animated')) {
            return false;
        }
        choose();
        questionCounter--;
        displayNext();
    });

    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
        e.preventDefault();

        if(quiz.is(':animated')) {
            return false;
        }
        questionCounter = 0;
        selections = [];
        displayNext();
        $('#start').hide();
    });

    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
        $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
        $(this).removeClass('active');
    });

    // Creates and returns the div that contains the questions and
    // the answer selections
    function createQuestionElement(index) {
        var qElement = $('<div>', {
            id: 'question'
        });

        var header = $('<h2>Vraag ' + (index + 1) + ':</h2>');
        qElement.append(header);

        var question = $('<p>').append(questions[index].question);
        qElement.append(question);

        var radioButtons = createRadios(index);
        qElement.append(radioButtons);

        return qElement;
    }

    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
        var radioList = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < questions[index].choices.length; i++) {
            item = $('<li>');
            input = '<input type="radio" name="answer" value=' + i + ' />';
            input += questions[index].choices[i];
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }

    // Reads the user selection and pushes the value to an array
    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }

    // Displays next requested element
    function displayNext() {
        quiz.fadeOut(function() {
            $('#question').remove();

            if(questionCounter < questions.length){
                var nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();
                if (!(isNaN(selections[questionCounter]))) {
                    $('input[value='+selections[questionCounter]+']').prop('checked', true);
                }

                // Controls display of 'prev' button
                if(questionCounter === 1){
                    $('#prev').show();
                } else if(questionCounter === 0){

                    $('#prev').hide();
                    $('#next').show();
                }
            }else {
                var scoreElem = displayScore();
                quiz.append(scoreElem).fadeIn();
                $('#next').hide();
                $('#prev').hide();
                $('#start').show();
            }
        });
    }
    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
        var score = $('<p>',{id: 'question'});

        var numCorrect = 0;
        for (var i = 0; i < selections.length; i++) {
            if (selections[i] === questions[i].correctAnswer) {
                numCorrect++;
            }
        }

        score.append('You got ' + numCorrect + ' questions out of ' +
            questions.length + ' right!!!');
        return score;
    }
})();