export const QUESTION_CATEGORIES = [
  {
    id: "event-validation",
    label: "Event Validation",
    examples: [
      {
        question: "Did Draupadi actually laugh at Duryodhana?",
        link: "/mahabharata/faq/draupadi-laugh-myth"
      },
      {
        question: "Did Draupadi forbid Karna from Participation in Swyamvara?",
        link: "/mahabharata/faq/draupadi-karna-swayamvara"
      },
      {
        question: "Who ordered Draupadi's disrobing?",
        link: "/mahabharata/faq/draupadi-disrobing"
      },
      {
        question: "Was Abhimanyu really 16 during the Chakravyuha incident?",
        link: null
      }
    ]
  },
  {
    id: "character-analysis",
    label: "Character Analysis",
    examples: [
      {
        question: "Was Karna truly the most generous person?",
        link: "/mahabharata/faq/karna-danveer-analysis"
      },
      {
        question: "Why Arjuna stopped Bhishmasena from protecting Draupadi?",
        link: "/mahabharata/faq/arjuna-stops-bhimasena"
      },
    ]
  },
  {
    id: "fact-or-myth",
    label: "Fact or Myth?",
    examples: [
      {
        question: "Was Barbarik really the greatest warrior of Mahabharata?",
        link: "/mahabharata/faq/barbarika"
      },
      {
        question: "What is the story of Five Golden Arrow Bhishma gave to Duryodhana?",
        link: "/mahabharata/faq/five-golden-arrows"
      },
      {
        question: "Was Dhrishtadyumna a rebirth of Ekalavya?",
        link: "/mahabharata/faq/dhrishtadyumna-ekalavya-rebirth"
      },
    ]
  },
];


export const MAHABHARATA_FAQ =[
    {
        id: "draupadi-laugh-myth",
        question: "Did Draupadi actually laugh at Duryodhana?",
        answer: "The claim that Draupadi laughed at Duryodhana is a myth. In reality, she was humiliated by him during the game of dice, which led to significant events in the Mahabharata.",
        link: "/mahabharata/faq/draupadi-laugh-myth",
        references: [ 
            "Mahabharata, Adi Parva, Section 67",
            "Mahabharata, Sabha Parva, Section 29"
        ],
        vidoes:[

        ],
        podcasts:[

        ],
        categories: ["event-validation","character-analysis"]
    },
    {
        id: "draupadi-karna-swayamvara",
        question: "Did Draupadi forbid Karna from Participation in Swyamvara?",
        answer: "Yes, Draupadi did not allow Karna to participate in her Swayamvara due to his perceived low status as a charioteer's son. This incident is often debated in terms of its implications on caste and social norms.",
        link: "/mahabharata/faq/draupadi-karna-swayamvara",
        references: [
            "Mahabharata, Adi Parva, Section 186",
            "Mahabharata, Sabha Parva, Section 2"
        ],
        vidoes:[

        ],
        podcasts:[

        ],
        categories: ["event-validation","character-analysis"]
    },
    {
        id: "karna-danveer-analysis",
        question: "Was Karna truly the most generous person?",
        answer: "Karna is often referred to as 'Danveer' for his legendary generosity. However, his actions and motivations are complex and can be interpreted in various ways.",
        link: "/mahabharata/faq/karna-danveer-analysis",
        references: [
            "Mahabharata, Anushasana Parva, Section 26",
            "Mahabharata, Udyoga Parva, Section 72"
        ],
        vidoes:[

        ],
        podcasts:[

        ],
        categories: ["character-analysis"]
    },
    {
      id: "abhi-chakravyuha",
      question: "Was Abhimanyu really 16 during the Chakravyuha incident?",
      answer: "Abhimanyu was indeed around 16 years old when he bravely entered the Chakravyuha formation during the Kurukshetra war. His age and valor are often highlighted in discussions about his tragic fate.",
      link: null,
      references: [
          "Mahabharata, Drona Parva, Section 46",
          "Mahabharata, Drona Parva, Section 47"
      ],
      vidoes:[

      ],
      podcasts:[

      ],
      categories: ["event-validation"]
    },
   
]