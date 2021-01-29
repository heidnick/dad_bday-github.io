let app;
glbl_questions = [
    ['This double entendre was awarded to the son with the hardest slap shot'],
    ['This word is attempted before dinner,', 'was sang to Nick before bedtime,', 'and is only achieved when there is agreement.'],
    ['A famous character who shares a name with what is flushed', `and who you used as a tool to make Nick's mouth gush.`],
    ['As a baby, Derek is swaddled and put down,', 'inside this, probably in a night gown.', 'As he grew older, it became his weapon of choice,',
     `ultimately silencing Matty's dad's voice.`],
    ['6 or 7 am, I cannot confirm,', 'a suddenly risen Derek began to squirm.', 'Until he looked up and saw the TV,', 'a T-Rex was shooting a machine gun at a Chimpanzee.',
     `"Terrorize," he screamed, and pulled out another gun,`, `"Time to go" a father said to his son.`, 'Off to the rink, the father and son did go,',
      'but what was the name of the early morning show?'],
    [`Imagine a time where computers were bigger.`, 'Your son, number one, used a mouse as a trigger.', 'In your office, he loaded the game quick,', 
     'the avatar fitted with helmet and pogo stick.', 'Battling aliens, but what was the name?', `A synonym for this "very sharp" game?`],
    [`The name of the beast that infested the room`, 'in the state that has the name which defines the emotion felt when in said state.'],
    [`A softball player, Ellie once was,`, 'working out and practicing just because.', 'In the backyard, she practiced her throws,', 'and mom would come out and check what she grows.',
     `Until one time Ellie's pitches lacked grace,`, 'the ball smacked mom straight in the face.', 'What was the tool that caused mom such harm,', 'and caused you such alarm?'],
    [`Filling our ears for many years,`, 'this ability you share with your daughter.']
];
glbl_answers = [
    'big stick',
    'harmony',
    'pooh bear',
    'cradle',
    'beast wars',
    'keen',
    'spider',
    'pitch back',
    'whistle'
];
math_questions = [
    'log(128) + 39/13',
    'The derivative of x^2',
    'The limit of [1/x] as x approaches 0',
    'C# Output of: Console.WriteLine(Math.Ceiling(7.03m))',
    'Hexadecimal value for red',
    'Who is the father of civil engineering?',
    'Who was the founder of the South Dakota School of Mines?',
    'Year your alma mater was founded'

];
math_answers = [
    ['12', '8', '10', '6', '10'],
    ['(2x^3)/2', '2x', 'x/2', '2/x', '2x'],
    ['Infinity', 'Negative Infinity', 'Does Not Exist', '0', 'Does Not Exist'],
    ['7', '7.0', '8.0', '8', '8'],
    ['#0FF000', '#FF0000', '#FFFF00', '#F0F000', '#FF0000'],
    ['John Smeaton', 'Benjamin Write', 'Charles Ellet Jr.', 'Albert Fink', 'John Smeaton'],
    ['Richard August Schleusener', 'Richard Joseph Gowen', 'Grubby the Miner', 'William P. Blake', 'William P. Blake'],
    ['1901', '1899', '1885', '1985', '1885']
];
var audio;



Vue.component('directions-component', {
    props: ['directions'],
    mounted() {
        audio = new Audio('./media/questionMaster.wav');
        audio.play();
    },
    template: `
        <div>
            <h3>Welcome</h3>
            <p>This site contains two hidden prizes that can only be accessed upon completion of the impending challenges.</p>
            <p>The first set of challenges include mind bending riddles requiring a mouse and keyboard.</p>
            <p>Click 'begin' to start the quest towards your first prize.</p>
        </div>
    `
});

Vue.component('math-directions-component', {
    props: ['directions'],
    mounted() {
        audio = new Audio('./media/quest.wav');
        audio.play();
    },
    template: `
        <div>
            <h3>Quest 2</h3>
            <p>The following questions are multiple choice.</p>
            <p>Select the correct answer and click submit.</p>
            <p>The questions will include various topics including programming, math and engineering history.</p>
            <p>Assume all logarithmic questions are base 2.</p>
            <p>Click below to start the quest towards your second prize.</p>
        </div>
    `
});

Vue.component("modal-component", {
    props: {
        video_number: Number
    },
    template: `
        <div>
        <transition name="modal">
            <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                <div class="modal-body">
                    <slot name="body">
                    <div class="col text-center">
                        <div v-if="video_number==2">
                        <iframe width="711" height="400" src="https://www.youtube.com/embed/GsIPBnpN_5g" frameborder="0" allow="accelerometer; autoplay; start=80; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                    <p style="color: white;">(begin video at 1:20)</p>
                    </br>
                    <button class="modal-default-button" @click="$emit('close')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                    </slot>
                </div>                
            </div>
            </div>
        </transition>
        </div>
    `
});

Vue.component("multiple-choice-component", {
    data: function() {
        return {completed: 0},
        {
            level: 0,
            current_question: '',
            question_idx: 0,
            answer: -1,
            correct:0,
            display_error: 0,
            impressive: 1,
        }
    },
    mounted() {
        //console.log('', this.text_questions)
        this.current_question = math_questions[0];
    },
    methods: {
        onClick: function(value) {
            this.answer = value;
        },
        sumbitAnswer: function() {
            //console.log('method called', this.answer)
            if (math_answers[this.question_idx][this.answer] == math_answers[this.question_idx][4]){
                this.display_error = 0;
                if (this.question_idx == 7 ){
                    audio = new Audio('./media/draw.wav');
                    audio.play();
                }
                else if (this.impressive == 1){
                    this.impressive = 0;
                    audio = new Audio('./media/impressive.wav');
                    audio.play();
                }else{
                    this.impressive = 1;
                    audio = new Audio('./media/mostImpressive.wav');
                    audio.play();
                }
                if (this.question_idx != math_questions.length - 1){
                    this.question_idx ++;
                    this.current_question = math_questions[this.question_idx];
                    this.answer = -1;
                }else {
                    this.answer = -1;
                    this.completed = 1;
                    this.$emit('complete')
                }
            }else {
                //console.log(math_answers[this.level][this.answer] + ' : ' + math_answers[this.level][4])
                audio = new Audio('./media/no.wav');
                audio.play();
                //console.log('runs')
                this.display_error = 1;
            }
        },
    },
    template: `
        <div>
            <p>Question {{question_idx + 1}} / {{math_questions.length}}</p>
            <h5>{{current_question}}</h5>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="q1" id="q1" value="option1" @click="onClick(0)">
                <label class="form-check-label" for="exampleRadios1">
                {{math_answers[question_idx][0]}}
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="q1" id="q1" value="option2" @click="onClick(1)">
                <label class="form-check-label" for="exampleRadios1">
                {{math_answers[question_idx][1]}}
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="q1" id="q1" value="option3" @click="onClick(2)">
                <label class="form-check-label" for="exampleRadios1">
                {{math_answers[question_idx][2]}}
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="q1" id="q1" value="option4" @click="onClick(3)">
                <label class="form-check-label" for="exampleRadios1">
                {{math_answers[question_idx][3]}}
                </label>
            </div>
            <div v-if="this.display_error">
                <small id="emailHelp" class="form-text text-muted">Please try again.</small>
            </div>
            </br>
            <button type="submit" class="btn btn-primary" v-on:click="sumbitAnswer()">Submit</button>
        </div>
    `
});

Vue.component('text-question-component', {
    data: function() {
        return {completed: 0},
        {
            level: 0,
            current_question: '',
            question_idx: 0,
            is_loaded: 0,
            answer: '',
            correct:0,
            display_error: 0
        }
    },
    props: ['questions_answered'],
    mounted() {
        //console.log('', this.text_questions)
        this.current_question = glbl_questions[0];
        this.is_loaded = 1;
    },
    methods: {
        sumbitAnswer: function() {
            //console.log('method called', this.answer)
            if (this.answer.toLowerCase() == glbl_answers[this.question_idx]){
                this.display_error = 0;
                audio = new Audio('./media/thatsEasy.wav');
                audio.play();
                if (this.question_idx != glbl_questions.length - 1){
                    this.question_idx ++;
                    this.current_question = glbl_questions[this.question_idx];
                    this.answer = '';
                }else {
                    this.answer = '';
                    this.completed = 1;
                    this.$emit('complete')
                }
            }else {
                audio = new Audio('./media/wrong.wav');
                audio.play();
                console.log('runs')
                this.display_error = 1;
            }
        },
    },
    template: `
        <div class="col text-center">
            <p>Question {{question_idx + 1}} / {{glbl_questions.length}}</p>
            <div v-if="this.is_loaded==1">
                <div>
                    <!--<h5>{{current_question}}</h5>-->
                    <h5 v-for="i in glbl_questions[question_idx]">{{i}}</h5>
                </div>
                <div class="form-group">
                    </br>
                    <input type="text" class="form-control" id="text_answer_box" placeholder="Answer here" v-model="answer">
                    <div v-if="this.display_error">
                        <small id="emailHelp" class="form-text text-muted">Please try again.</small>
                    </div>
                    <!---->
                </div>
                </br>
                <button type="submit" class="btn btn-primary" v-on:click="sumbitAnswer()">Submit</button>
            </div>
        </div>
    `
});

function init() {

/*------------------------Main Component--------------------------*/
    app = new Vue({
        el: '#app',
        data: {
            entered: 0,
            game_started:0,
            second_game_started:0,
            questions_answered:0,
            completed:0,
            second_completed:0,
            load_video:0,
            video_num: 0,
            begin_second_trials:0
        },
        methods: {
            enter() {
                audio = new Audio('./media/questionMaster.wav');
                audio.play();
                this.entered = 1;
            },
            beginGame() {
                audio = new Audio('./media/askMe.wav');
                audio.play();
                this.game_started = 1;
                //console.log(this.game_started)
            },
            beginSecondGame() {
                audio = new Audio('./media/worst.mp3');
                audio.play();
                this.second_game_started = 1;
            },
            loadVideo(value) {
                
                if (value==1){
                    window.open('https://www.youtube.com/watch?v=j0gwf8p07tk', '_blank');
                }else{
                    this.load_video = 1;
                    this.video_num = value;
                }
                
            },
            enterSecondTrials() {
                this.completed = 0;
                this.begin_second_trials = 1;
            }
        },
        template: `
        <div class="container">
            <div v-if="!entered">
                <h5>To ensure you achieve the best experience possible, please turn on your sound.</h5>
                </br>
                <div class="col text-center">
                    <button type="button" class="btn btn-outline-danger" v-on:click="enter()">Enter if you dare</button>
                </div>
            </div>
            <div v-else-if="completed">
                <h3>Congratulations!</h3>
                <p>You have completed the necessary tasks to unlock your first reward.</p>
                <p>After viewing your prize, continue to complete the next set of challenges.</p>
                </br>
                <div class="col text-center">
                    <button type="button" class="btn btn-outline-success" v-on:click="loadVideo(1)">Open Prize</button>
                </div>
                </br>
                <div class="col text-center">
                    <button type="button" class="btn btn-outline-primary" v-on:click="enterSecondTrials()">Enter next set of trials</button>
                </div>
                <div v-if="load_video">
                    <modal-component :video_number="video_num" @close="load_video = 0"></modal-component>
                </div>
            </div>
            <div v-else-if="second_completed">
                <h3>Congratulations!</h3>
                <p>You have completed the necessary tasks to unlock all rewards.</p>
                </br>
                <div class="col text-center">
                    <button type="button" class="btn btn-outline-success" v-on:click="loadVideo(1)">First Prize</button>
                    <button type="button" class="btn btn-outline-success" v-on:click="loadVideo(2)">Second Prize</button>
                </div>
                <div v-if="load_video">
                    <modal-component @close="load_video = 0" :video_number="video_num"></modal-component>
                </div>
            </div>
            <div v-else-if="begin_second_trials">
                <div v-if="!second_game_started">
                    <math-directions-component></math-directions-component>
                    <div class="col text-center">
                        <button type="button" class="btn btn-outline-primary" v-on:click="beginSecondGame()">Begin</button>
                    </div>
                </div>
                <div v-else>
                    <multiple-choice-component @complete="second_completed = 1"></multiple-choice-component>
                </div>
            </div>
            <div v-else>
                <div v-if="!game_started">
                    <directions-component></directions-component>
                    <div class="col text-center">
                        <button type="button" class="btn btn-outline-primary" v-on:click="beginGame()">Begin</button>
                    </div>
                </div>
                <div v-else>
                <div>
                    <text-question-component @complete="completed = 1"></text-question-component>
                </div>
            </div>
        </div>
        `
    }); 
}

