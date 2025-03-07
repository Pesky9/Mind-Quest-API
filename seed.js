const mongoose = require("mongoose");
const QuizQuestion = require("./models/QuizQuestion");
const dotenv = require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB connected");

    const sampleQuestions = [
      {
        question:
          "Which sentence uses the correct form of 'to be' in the present tense?",
        options: [
          "He are happy in Mumbai.",
          "He is happy in Mumbai.",
          "He be happy in Mumbai.",
          "He am happy in Mumbai.",
        ],
        answer: 1,
        explanation: "For a singular third-person subject, 'is' is correct.",
      },
      {
        question:
          "Which sentence correctly uses a comma to separate items in a list?",
        options: [
          "I bought mangoes bananas and guavas.",
          "I bought mangoes, bananas, and guavas.",
          "I bought mangoes bananas, and guavas.",
          "I bought mangoes, bananas and guavas.",
        ],
        answer: 1,
        explanation: "Commas are used to separate items in a list.",
      },
      {
        question: "Choose the sentence with the correct use of an apostrophe.",
        options: [
          "The teacher's bag is blue.",
          "The teachers bag is blue.",
          "The teachers' bag is blue.",
          "The teacher bag's is blue.",
        ],
        answer: 0,
        explanation:
          "For a singular noun, add an apostrophe and s to show possession.",
      },
      {
        question:
          "Which sentence is correctly capitalized when referring to a city?",
        options: [
          "i visited delhi last summer.",
          "I visited delhi last summer.",
          "I visited Delhi last summer.",
          "I visited delhi Last summer.",
        ],
        answer: 2,
        explanation: "Proper nouns like 'Delhi' must be capitalized.",
      },
      {
        question:
          "What is the correct plural form of 'child' as used in a school context?",
        options: ["childs", "childes", "children", "child"],
        answer: 2,
        explanation: "The irregular plural of 'child' is 'children'.",
      },
      {
        question:
          "Choose the sentence with the correct past tense form in a scenario.",
        options: [
          "Yesterday, I go to the market.",
          "Yesterday, I went to the market.",
          "Yesterday, I gone to the market.",
          "Yesterday, I going to the market.",
        ],
        answer: 1,
        explanation: "'Went' is the correct past tense of 'go'.",
      },
      {
        question:
          "In the sentence 'She sings beautifully during the classical concert,' which word is an adverb?",
        options: ["sings", "beautifully", "she", "concert"],
        answer: 1,
        explanation:
          "'Beautifully' describes how she sings, making it an adverb.",
      },
      {
        question: "Identify the correct use of 'its' versus 'it's'.",
        options: [
          "Its a sunny day in Mumbai.",
          "It's a sunny day in Mumbai.",
          "Its' a sunny day in Mumbai.",
          "It is a sunny day in Mumbai.",
        ],
        answer: 1,
        explanation:
          "'It's' is the contraction of 'it is', which is correct here.",
      },
      {
        question:
          "Choose the sentence with the correct preposition usage in a classroom.",
        options: [
          "She is good in mathematics.",
          "She is good at mathematics.",
          "She is good on mathematics.",
          "She is good for mathematics.",
        ],
        answer: 1,
        explanation: "The phrase 'good at' is the correct collocation.",
      },
      {
        question: "Which sentence correctly uses the articles 'a' and 'an'?",
        options: [
          "He has an book.",
          "He has a apple.",
          "He has an apple.",
          "He has a egg.",
        ],
        answer: 2,
        explanation: "'An' is used before words that begin with a vowel sound.",
      },
      {
        question:
          "Which word is a conjunction in the sentence 'I wanted to visit Jaipur, but the train was delayed'?",
        options: ["wanted", "but", "visit", "delayed"],
        answer: 1,
        explanation: "'But' connects the two independent clauses.",
      },
      {
        question: "Choose the sentence with correct subject-verb agreement.",
        options: [
          "The cricket team are winning.",
          "The cricket team is winning.",
          "The cricket team be winning.",
          "The cricket team were winning.",
        ],
        answer: 1,
        explanation:
          "When a team is considered as a single unit, use the singular verb 'is'.",
      },
      {
        question: "Which sentence uses the correct homophone?",
        options: [
          "Their going to watch Bollywood tonight.",
          "They're going to watch Bollywood tonight.",
          "There going to watch Bollywood tonight.",
          "Theyre going to watch Bollywood tonight.",
        ],
        answer: 1,
        explanation:
          "'They're' is the contraction for 'they are' and is correct here.",
      },
      {
        question:
          "Identify the relative pronoun in the sentence 'The festival that we celebrated was vibrant.'",
        options: ["festival", "that", "we", "celebrated"],
        answer: 1,
        explanation: "'That' introduces the clause describing the festival.",
      },
      {
        question: "Which sentence correctly uses a semicolon?",
        options: [
          "I have a major exam tomorrow; I cannot go to the Diwali function.",
          "I have a major exam tomorrow, I cannot go to the Diwali function.",
          "I have a major exam tomorrow: I cannot go to the Diwali function.",
          "I have a major exam tomorrow - I cannot go to the Diwali function.",
        ],
        answer: 0,
        explanation:
          "A semicolon joins two closely related independent clauses.",
      },
      {
        question: "Which sentence correctly uses quotation marks?",
        options: [
          "He said, 'Chai is life.'",
          "He said, Chai is life.",
          "He said 'Chai is life'.",
          "He said Chai is life.",
        ],
        answer: 0,
        explanation: "Quotation marks should enclose the exact words spoken.",
      },
      {
        question:
          "Choose the sentence with the correct future tense form in a scenario.",
        options: [
          "I will goes to the market.",
          "I will go to the market.",
          "I will going to the market.",
          "I will gone to the market.",
        ],
        answer: 1,
        explanation:
          "The modal 'will' is followed by the base form of the verb.",
      },
      {
        question:
          "Which sentence uses correct punctuation in a compound sentence?",
        options: [
          "I wanted to visit Mumbai but it was too crowded.",
          "I wanted to visit Mumbai, but it was too crowded.",
          "I wanted to visit Mumbai but, it was too crowded.",
          "I wanted to visit Mumbai, but, it was too crowded.",
        ],
        answer: 1,
        explanation:
          "A comma before the conjunction separates the independent clauses.",
      },
      {
        question: "Which sentence is written in active voice?",
        options: [
          "The food was cooked by the chef.",
          "The chef cooked the food.",
          "The food is being cooked by the chef.",
          "The food had been cooked by the chef.",
        ],
        answer: 1,
        explanation:
          "Active voice places the subject first, as in 'The chef cooked the food.'",
      },
      {
        question: "Choose the correct comparative form of 'good'.",
        options: ["gooder", "more good", "better", "best"],
        answer: 2,
        explanation: "'Better' is the correct comparative form of 'good'.",
      },
      {
        question:
          "Which sentence uses the correct form of 'less' versus 'fewer'?",
        options: [
          "There are less vegetables in the basket.",
          "There are fewer vegetables in the basket.",
          "There are less vegetable in the basket.",
          "There are fewer vegetable in the basket.",
        ],
        answer: 1,
        explanation: "'Fewer' is used for countable items like vegetables.",
      },
      {
        question:
          "Identify the interjection in the sentence 'Wow, the monsoon rains are amazing!'",
        options: ["Wow", "monsoon", "rains", "amazing"],
        answer: 0,
        explanation:
          "Interjections express strong emotion; 'Wow' is the interjection here.",
      },
      {
        question: "Which sentence correctly uses a colon to introduce a list?",
        options: [
          "I need to buy: rice, dal, and spices.",
          "I need to buy rice: dal, and spices.",
          "I need to buy rice, dal, and spices.",
          "I need to buy: rice, dal and spices.",
        ],
        answer: 0,
        explanation:
          "A colon is used after an independent clause to introduce a list.",
      },
      {
        question: "Which sentence correctly uses the past perfect tense?",
        options: [
          "She had finished her assignment before the class started.",
          "She finished her assignment before the class started.",
          "She has finished her assignment before the class started.",
          "She finishes her assignment before the class started.",
        ],
        answer: 0,
        explanation:
          "The past perfect tense ('had finished') shows an action completed before another past event.",
      },
      {
        question: "Choose the sentence with correct subject pronoun usage.",
        options: [
          "Him and I went to the festival.",
          "He and me went to the festival.",
          "He and I went to the festival.",
          "Him and me went to the festival.",
        ],
        answer: 2,
        explanation:
          "Use subject pronouns ('He' and 'I') when they form the subject of the sentence.",
      },
      {
        question:
          "Which sentence correctly uses a hyphen in a compound adjective?",
        options: [
          "It was a well known actor.",
          "It was a well-known actor.",
          "It was a well known-actor.",
          "It was a well, known actor.",
        ],
        answer: 1,
        explanation:
          "A hyphen connects words in a compound adjective before a noun.",
      },
      {
        question:
          "Identify the sentence with proper punctuation for an introductory phrase.",
        options: [
          "After the ceremony we went for street food.",
          "After the ceremony, we went for street food.",
          "After, the ceremony we went for street food.",
          "After the ceremony, we went for street food.",
        ],
        answer: 1,
        explanation: "A comma should follow an introductory phrase.",
      },
      {
        question:
          "Which sentence uses the correct form of 'there' to indicate location",
        options: [
          "Their is the market near the temple.",
          "There is the market near the temple.",
          "They're is the market near the temple.",
          "Theres is the market near the temple.",
        ],
        answer: 1,
        explanation: "'There' is used to indicate location.",
      },
      {
        question: "Choose the sentence that correctly uses the word 'whom'.",
        options: [
          "To who did you send the invitation?",
          "To whom did you send the invitation?",
          "Who did you send the invitation to?",
          "Whom did you send the invitation to?",
        ],
        answer: 1,
        explanation: "'Whom' is used as the object of the preposition.",
      },
      {
        question:
          "Which sentence uses correct punctuation for non-restrictive clauses?",
        options: [
          "My uncle who lives in Bangalore is visiting.",
          "My uncle, who lives in Bangalore, is visiting.",
          "My uncle who lives in Bangalore, is visiting.",
          "My uncle, who lives in Bangalore is visiting.",
        ],
        answer: 1,
        explanation: "Non-restrictive clauses should be set off by commas.",
      },
      {
        question:
          "Identify the correct form of the verb in the sentence: 'Either the students or the teacher ____ responsible for the mistake in the exam results.'",
        options: ["are", "is", "were", "be"],
        answer: 1,
        explanation:
          "When subjects are joined by 'or', the verb agrees with the nearer subject ('teacher').",
      },
      {
        question: "Which sentence correctly uses the gerund form?",
        options: [
          "Dancing is fun.",
          "Dance is fun.",
          "To dance is fun.",
          "Danced is fun.",
        ],
        answer: 0,
        explanation: "A gerund (verb+ing) functions as a noun.",
      },
      {
        question: "Choose the correct sentence that uses an infinitive.",
        options: [
          "She likes to dance in the festival.",
          "She likes dancing in the festival.",
          "She likes danced in the festival.",
          "She likes dancely in the festival.",
        ],
        answer: 0,
        explanation: "The infinitive form 'to dance' is correctly used here.",
      },
      {
        question: "Which sentence uses correct parallel structure?",
        options: [
          "I like reading, to travel, and cooking.",
          "I like to read, travel, and cook.",
          "I like reading, traveling, and to cook.",
          "I like to read, traveling, and cooking.",
        ],
        answer: 1,
        explanation:
          "All items in the list must be in the same form for parallelism.",
      },
      {
        question: "Identify the correct use of a possessive pronoun.",
        options: [
          "This is her's diary.",
          "This is hers diary.",
          "This is hers.",
          "This is her diary.",
        ],
        answer: 2,
        explanation:
          "The possessive pronoun 'hers' does not take an apostrophe.",
      },
      {
        question: "Which sentence correctly uses 'that' versus 'which'?",
        options: [
          "The festival, that was colorful, was unforgettable.",
          "The festival which was colorful was unforgettable.",
          "The festival that was colorful was unforgettable.",
          "The festival, which was colorful, was unforgettable.",
        ],
        answer: 3,
        explanation:
          "Non-essential information should be set off by commas with 'which'.",
      },
      {
        question:
          "Choose the sentence with the correct punctuation for direct address.",
        options: [
          "Let's eat, mom!",
          "Let's eat mom!",
          "Lets eat, mom!",
          "Let's eat, mom.",
        ],
        answer: 0,
        explanation:
          "A comma separates the name when directly addressing someone.",
      },
      {
        question: "Which sentence uses the correct order of adjectives?",
        options: [
          "She wore a silk beautiful saree.",
          "She wore a beautiful silk saree.",
          "She wore a silk saree beautiful.",
          "She wore a saree beautiful silk.",
        ],
        answer: 1,
        explanation:
          "The correct order is 'beautiful' (opinion) before 'silk' (material).",
      },
      {
        question:
          "Identify the sentence with the correct use of the past continuous tense.",
        options: [
          "They was playing cricket when the rain started.",
          "They were playing cricket when the rain started.",
          "They playing cricket when the rain started.",
          "They are playing cricket when the rain started.",
        ],
        answer: 1,
        explanation:
          "The correct form is 'were playing' for the past continuous tense.",
      },
      {
        question:
          "Which sentence uses the correct form of 'to have' in the present perfect tense?",
        options: [
          "She have seen that Bollywood movie.",
          "She has seen that Bollywood movie.",
          "She seen that Bollywood movie.",
          "She having seen that Bollywood movie.",
        ],
        answer: 1,
        explanation: "'Has seen' is the proper present perfect form.",
      },
      {
        question:
          "Choose the sentence with proper punctuation in a complex sentence.",
        options: [
          "Although it was raining I enjoyed the street food.",
          "Although it was raining, I enjoyed the street food.",
          "Although, it was raining I enjoyed the street food.",
          "Although it was raining I, enjoyed the street food.",
        ],
        answer: 1,
        explanation:
          "A comma after the introductory clause is required for clarity.",
      },
      {
        question: "Which sentence uses correct pronoun-antecedent agreement?",
        options: [
          "Every student must bring their laptop.",
          "Every student must bring his or her laptop.",
          "Every student must bring them laptop.",
          "Every student must bring their laptops.",
        ],
        answer: 1,
        explanation:
          "For singular subjects, use singular pronouns like 'his or her'.",
      },
      {
        question:
          "Identify the sentence that correctly uses a dash for emphasis.",
        options: [
          "I need to study — the board exam is coming.",
          "I need to study, the board exam is coming.",
          "I need to study – the board exam is coming.",
          "I need to study; the board exam is coming.",
        ],
        answer: 0,
        explanation: "An em dash (—) is used here to create emphasis.",
      },
      {
        question:
          "Which sentence uses the correct punctuation for a compound-complex sentence?",
        options: [
          "I like reading, and I enjoy writing because it's fun.",
          "I like reading and I enjoy writing, because it's fun.",
          "I like reading, and I enjoy writing, because it's fun.",
          "I like reading, and I enjoy writing because, it's fun.",
        ],
        answer: 0,
        explanation:
          "Proper punctuation separates the independent and dependent clauses.",
      },
      {
        question: "Choose the sentence with the correct usage of a modal verb.",
        options: [
          "She can sings very well.",
          "She can sing very well.",
          "She cans sing very well.",
          "She can singing very well.",
        ],
        answer: 1,
        explanation:
          "A modal verb is followed by the base form of the main verb.",
      },
      {
        question:
          "Which sentence correctly uses the superlative form of 'happy'?",
        options: [
          "She is the happiest person I know in my college.",
          "She is the more happy person I know in my college.",
          "She is the most happiest person I know in my college.",
          "She is the happier person I know in my college.",
        ],
        answer: 0,
        explanation: "'Happiest' is the correct superlative form.",
      },
      {
        question:
          "Identify the sentence with correct punctuation for a tag question.",
        options: [
          "It's hot today, isn't it?",
          "Its hot today, isn't it?",
          "It's hot today isn't it?",
          "Its hot today isn't it?",
        ],
        answer: 0,
        explanation: "A comma is used to separate the statement from the tag.",
      },
      {
        question:
          "Which sentence uses correct capitalization for a famous Indian film title?",
        options: ["lagaan", "Lagaan", "Lagaaan", "lagAan"],
        answer: 1,
        explanation:
          "'Lagaan' is correctly capitalized as a proper film title.",
      },
      {
        question:
          "Choose the sentence with the correct use of 'who' versus 'whom'.",
        options: [
          "Who did you meet at the festival?",
          "Whom did you meet at the festival?",
          "Who did you meet whom at the festival?",
          "Whom did you meet who at the festival?",
        ],
        answer: 0,
        explanation: "'Who' is used as the subject in this question.",
      },
      {
        question:
          "Which sentence uses the correct form of a compound sentence?",
        options: [
          "I enjoy Bollywood movies, and I love Indian classical music.",
          "I enjoy Bollywood movies and I love Indian classical music.",
          "I enjoy Bollywood movies; and I love Indian classical music.",
          "I enjoy Bollywood movies, but I love Indian classical music.",
        ],
        answer: 0,
        explanation:
          "A comma with a coordinating conjunction joins two independent clauses correctly.",
      },
      {
        question:
          "Identify the correct form of the verb in a conditional sentence:",
        options: [
          "If I was rich, I would travel India.",
          "If I were rich, I would travel India.",
          "If I am rich, I would travel India.",
          "If I be rich, I would travel India.",
        ],
        answer: 1,
        explanation:
          "The subjunctive 'were' is used for hypothetical situations.",
      },
      {
        question:
          "Which sentence uses the correct punctuation for appositives?",
        options: [
          "My friend Ravi is coming over.",
          "My friend, Ravi is coming over.",
          "My friend, Ravi, is coming over.",
          "My friend Ravi, is coming over.",
        ],
        answer: 2,
        explanation: "The appositive 'Ravi' should be enclosed by commas.",
      },
      {
        question:
          "Choose the sentence with the correct use of an exclamation mark.",
        options: ["Watch out!", "Watch out.", "Watch out?", "Watch out"],
        answer: 0,
        explanation: "An exclamation mark shows strong emotion or urgency.",
      },
      {
        question: "Which sentence uses the correct plural form of 'mouse'?",
        options: ["mouses", "mice", "mouse", "mices"],
        answer: 1,
        explanation: "The plural of 'mouse' is 'mice'.",
      },
      {
        question:
          "Identify the sentence with correct use of a reflexive pronoun.",
        options: [
          "She made herself a cup of chai.",
          "She made her a cup of chai.",
          "She made hisself a cup of chai.",
          "She made self a cup of chai.",
        ],
        answer: 0,
        explanation: "'Herself' is the correct reflexive pronoun.",
      },
      {
        question:
          "Which sentence uses correct punctuation for a list within a sentence?",
        options: [
          "We need rice, dal, and chapati.",
          "We need rice dal, and chapati.",
          "We need rice, dal, chapati.",
          "We need, rice, dal, and chapati.",
        ],
        answer: 0,
        explanation: "Commas properly separate the items in the list.",
      },
      {
        question:
          "Choose the sentence with the correct use of a period at the end.",
        options: [
          "He enjoys cricket",
          "He enjoys cricket.",
          "He enjoys cricket!",
          "He enjoys cricket?",
        ],
        answer: 1,
        explanation: "A declarative sentence should end with a period.",
      },
      {
        question: "Which sentence uses the correct contraction for 'do not'?",
        options: ["don't", "do'nt", "dont", "do not"],
        answer: 0,
        explanation: "'Don't' is the correct contraction for 'do not'.",
      },
      {
        question:
          "Identify the sentence with the correct subject-verb inversion in a question.",
        options: [
          "You are coming?",
          "Are you coming?",
          "You coming are?",
          "Coming are you?",
        ],
        answer: 1,
        explanation: "In questions, the auxiliary verb precedes the subject.",
      },
      {
        question: "Which sentence correctly uses 'farther' versus 'further'?",
        options: [
          "She walked farther than I did.",
          "She walked further than I did.",
          "She walked farther then I did.",
          "She walked further then I did.",
        ],
        answer: 0,
        explanation: "'Farther' is used for physical distances.",
      },
      {
        question:
          "Choose the sentence with correct punctuation in a compound sentence with a conjunction.",
        options: [
          "He wanted to visit Delhi but stayed home.",
          "He wanted to visit Delhi, but stayed home.",
          "He wanted to visit Delhi, but he stayed home.",
          "He wanted, to visit Delhi but stayed home.",
        ],
        answer: 2,
        explanation: "Both independent clauses must be clearly separated.",
      },
      {
        question:
          "Which sentence uses the correct format for numbers under 10?",
        options: [
          "I have 3 books.",
          "I have three books.",
          "I have 03 books.",
          "I have 3 books.",
        ],
        answer: 1,
        explanation: "Numbers under 10 are typically written as words.",
      },
      {
        question: "Identify the sentence that correctly uses the Oxford comma.",
        options: [
          "I bought mangoes, bananas, and papayas.",
          "I bought mangoes, bananas and papayas.",
          "I bought mangoes bananas, and papayas.",
          "I bought mangoes, bananas and, papayas.",
        ],
        answer: 0,
        explanation:
          "The Oxford comma appears before the final 'and' in a list.",
      },
      {
        question: "Which sentence uses the correct pronoun case?",
        options: [
          "Between you and I, this is our secret recipe.",
          "Between you and me, this is our secret recipe.",
          "Between you and myself, this is our secret recipe.",
          "Between you and mine, this is our secret recipe.",
        ],
        answer: 1,
        explanation: "The object pronoun 'me' is appropriate after 'between'.",
      },
      {
        question:
          "Choose the sentence with the correct use of an ellipsis to indicate omission.",
        options: [
          "I was thinking... maybe we should try the new street food.",
          "I was thinking, maybe we should try the new street food.",
          "I was thinking... maybe, we should try the new street food.",
          "I was thinking maybe... we should try the new street food.",
        ],
        answer: 0,
        explanation: "An ellipsis indicates a pause or omitted text.",
      },
      {
        question: "Which sentence uses correct punctuation for a dialogue tag?",
        options: [
          "She said 'I am tired of the heat.'",
          "She said, 'I am tired of the heat.'",
          "She said: 'I am tired of the heat.'",
          "She said 'I am tired of the heat.'",
        ],
        answer: 1,
        explanation:
          "A comma should separate the dialogue tag from the quoted speech.",
      },
      {
        question:
          "Identify the sentence with correct subject placement in an imperative sentence.",
        options: [
          "Please, you sit down.",
          "Sit down, please.",
          "You please sit down.",
          "Sit please down.",
        ],
        answer: 1,
        explanation:
          "Imperative sentences typically omit the subject; the command comes first.",
      },
      {
        question: "Which sentence uses the correct form of the word 'their'?",
        options: [
          "Their house is near the temple.",
          "There house is near the temple.",
          "They're house is near the temple.",
          "Thier house is near the temple.",
        ],
        answer: 0,
        explanation:
          "The possessive pronoun 'their' correctly shows ownership.",
      },
      {
        question:
          "Choose the sentence with the correct punctuation in a compound sentence using a semicolon.",
        options: [
          "It was raining; so we stayed indoors.",
          "It was raining; we stayed indoors.",
          "It was raining, we stayed indoors.",
          "It was raining: we stayed indoors.",
        ],
        answer: 1,
        explanation:
          "A semicolon can join two closely related independent clauses without a conjunction.",
      },
      {
        question: "Which sentence uses the correct form of 'lay' versus 'lie'?",
        options: [
          "I will lay down for a nap.",
          "I will lie down for a nap.",
          "I will laid down for a nap.",
          "I will lying down for a nap.",
        ],
        answer: 1,
        explanation:
          "'Lie down' is the correct expression when referring to reclining.",
      },
      {
        question:
          "Identify the sentence that correctly uses a subordinate clause.",
        options: [
          "Because it was raining, we stayed inside.",
          "It was raining because we stayed inside.",
          "Because it was raining we stayed inside.",
          "It was raining, because we stayed inside.",
        ],
        answer: 0,
        explanation:
          "A subordinate clause introduced by 'because' should be followed by a comma when it comes first.",
      },
      {
        question: "Which sentence uses the correct demonstrative pronoun?",
        options: [
          "That is my cup of chai.",
          "Those is my cup of chai.",
          "This is my cup of chai.",
          "These is my cup of chai.",
        ],
        answer: 0,
        explanation:
          "The singular demonstrative 'that' is used correctly here.",
      },
      {
        question:
          "Choose the sentence with correct punctuation for a compound predicate.",
        options: [
          "She sang and danced at the festival.",
          "She sang, and danced at the festival.",
          "She sang and, danced at the festival.",
          "She sang, and, danced at the festival.",
        ],
        answer: 0,
        explanation: "No comma is needed in a compound predicate.",
      },
      {
        question:
          "Which sentence uses the correct form of 'affect' versus 'effect'?",
        options: [
          "The new policy will affect everyone.",
          "The new policy will effect everyone.",
          "The new policy will affect every one.",
          "The new policy will effect every one.",
        ],
        answer: 0,
        explanation:
          "'Affect' is the verb meaning to influence, while 'effect' is a noun.",
      },
      {
        question:
          "Identify the sentence that uses the correct punctuation for a list with descriptive phrases.",
        options: [
          "For breakfast, she had idli, dosa, and vada.",
          "For breakfast she had idli, dosa and vada.",
          "For breakfast, she had idli dosa, and vada.",
          "For breakfast she had idli dosa and, vada.",
        ],
        answer: 0,
        explanation: "Commas correctly separate the items in the list.",
      },
      {
        question: "Which sentence uses the correct conditional form?",
        options: [
          "If I win the lottery, I will travel across India.",
          "If I win the lottery, I travel across India.",
          "If I won the lottery, I travel across India.",
          "If I win the lottery, I traveled across India.",
        ],
        answer: 0,
        explanation:
          "The first conditional uses the present simple in the 'if'-clause and 'will' + base verb in the main clause.",
      },
      {
        question:
          "Choose the sentence that correctly uses the past simple tense.",
        options: [
          "She cooks dinner yesterday.",
          "She cooked dinner yesterday.",
          "She cook dinner yesterday.",
          "She cooking dinner yesterday.",
        ],
        answer: 1,
        explanation: "'Cooked' is the proper past tense form of 'cook'.",
      },
      {
        question:
          "Which sentence uses the correct order of words in a question?",
        options: [
          "You are coming to the Diwali party?",
          "Are you coming to the Diwali party?",
          "Coming are you to the Diwali party?",
          "Are coming you to the Diwali party?",
        ],
        answer: 1,
        explanation:
          "Questions in English should start with the auxiliary verb.",
      },
      {
        question:
          "Identify the sentence with correct use of a compound-complex structure.",
        options: [
          "Although I was tired, I went to the market, and I bought some sweets.",
          "Although I was tired I went to the market, and I bought some sweets.",
          "Although I was tired, I went to the market and I bought some sweets.",
          "Although I was tired I went to the market and I bought some sweets.",
        ],
        answer: 0,
        explanation:
          "The sentence correctly separates the clauses with commas.",
      },
      {
        question:
          "Which sentence uses the correct punctuation for a direct quotation within a sentence?",
        options: [
          "He said 'I am leaving now'.",
          "He said, 'I am leaving now.'",
          "He said: 'I am leaving now'.",
          "He said 'I am leaving now'.",
        ],
        answer: 1,
        explanation: "A comma should precede a direct quotation.",
      },
      {
        question:
          "Choose the sentence with the correct use of a colon for emphasis.",
        options: [
          "Remember: practice makes perfect.",
          "Remember, practice makes perfect.",
          "Remember practice: makes perfect.",
          "Remember, practice: makes perfect.",
        ],
        answer: 0,
        explanation: "A colon is used to emphasize what follows.",
      },
      {
        question: "Which sentence uses the correct reflexive pronoun?",
        options: [
          "They prepared themselves for the exam.",
          "They prepared themself for the exam.",
          "They prepared theirself for the exam.",
          "They prepared self for the exam.",
        ],
        answer: 0,
        explanation:
          "'Themselves' is the correct reflexive pronoun for 'they'.",
      },
      {
        question:
          "Identify the sentence that correctly uses an adverb to modify an adjective.",
        options: [
          "She is very talented.",
          "She is really talented.",
          "She is talented very.",
          "She is talentedly.",
        ],
        answer: 0,
        explanation:
          "Adverbs like 'very' should be placed immediately before the adjective.",
      },
      {
        question:
          "Which sentence uses the correct punctuation for a subordinate clause in the middle of a sentence?",
        options: [
          "My brother, who lives in Chennai, is visiting.",
          "My brother who lives in Chennai is visiting.",
          "My brother, who lives in Chennai is visiting.",
          "My brother who lives in Chennai, is visiting.",
        ],
        answer: 0,
        explanation: "Non-restrictive clauses must be enclosed in commas.",
      },
      {
        question:
          "Choose the sentence that correctly uses the past perfect continuous tense.",
        options: [
          "She had been working for hours before she took a break.",
          "She had worked for hours before she took a break.",
          "She was working for hours before she took a break.",
          "She had been work for hours before she took a break.",
        ],
        answer: 0,
        explanation:
          "Past perfect continuous is formed with 'had been' plus the present participle.",
      },
      {
        question: "Which sentence uses the correct plural form of 'ox'?",
        options: ["oxen", "oxes", "oxs", "ox"],
        answer: 0,
        explanation: "The plural of 'ox' is 'oxen'.",
      },
      {
        question:
          "Identify the sentence with correct punctuation for an introductory adverb.",
        options: [
          "Fortunately, we arrived on time for the train.",
          "Fortunately we arrived on time for the train.",
          "Fortunately, we arrived, on time for the train.",
          "Fortunately we arrived, on time for the train.",
        ],
        answer: 0,
        explanation: "An introductory adverb should be followed by a comma.",
      },
      {
        question: "Which sentence uses the correct format for title case?",
        options: [
          "a tale of two cities",
          "A Tale Of Two Cities",
          "A Tale of Two Cities",
          "A tale Of Two Cities",
        ],
        answer: 2,
        explanation: "In title case, principal words are capitalized.",
      },
      {
        question:
          "Choose the sentence with the correct use of a semicolon in complex lists.",
        options: [
          "On our trip, we visited Jaipur; Rajasthan, Agra; Uttar Pradesh, and Varanasi; Uttar Pradesh.",
          "On our trip, we visited Jaipur, Rajasthan; Agra, Uttar Pradesh; and Varanasi, Uttar Pradesh.",
          "On our trip we visited Jaipur; Rajasthan; Agra; Uttar Pradesh; and Varanasi; Uttar Pradesh.",
          "On our trip, we visited Jaipur Rajasthan; Agra Uttar Pradesh; and Varanasi Uttar Pradesh.",
        ],
        answer: 1,
        explanation:
          "Semicolons separate items in a complex list when the items contain commas.",
      },
      {
        question:
          "Which sentence uses the correct punctuation to indicate a sudden break in thought?",
        options: [
          "I was going to call her—then I changed my mind.",
          "I was going to call her, then I changed my mind.",
          "I was going to call her then— I changed my mind.",
          "I was going to call her then I changed my mind.",
        ],
        answer: 0,
        explanation:
          "An em dash (—) effectively indicates a sudden break in thought.",
      },
      {
        question:
          "Identify the sentence with the correct placement of commas in a compound sentence.",
        options: [
          "We went to the market, and we bought some sweets.",
          "We went to the market and, we bought some sweets.",
          "We went to the market, and, we bought some sweets.",
          "We went to the market and we bought some sweets.",
        ],
        answer: 0,
        explanation:
          "A comma before the conjunction separates the two independent clauses.",
      },
      {
        question: "Which sentence uses the correct comparative form of 'bad'?",
        options: ["worse", "badder", "more bad", "worst"],
        answer: 0,
        explanation: "'Worse' is the correct comparative form of 'bad'.",
      },
      {
        question:
          "Choose the sentence that correctly uses 'then' versus 'than'.",
        options: [
          "She is taller then her brother.",
          "She is taller than her brother.",
          "She is then taller than her brother.",
          "She is then than her brother.",
        ],
        answer: 1,
        explanation: "'Than' is used when making comparisons.",
      },
      {
        question:
          "Which sentence uses the correct order of words in an interrogative sentence?",
        options: [
          "What are you doing?",
          "What you are doing?",
          "You are doing what?",
          "Doing what are you?",
        ],
        answer: 0,
        explanation:
          "The standard interrogative form starts with the question word.",
      },
    ];

    await QuizQuestion.deleteMany({});
    await QuizQuestion.insertMany(sampleQuestions);
    console.log("Database seeded");
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));
