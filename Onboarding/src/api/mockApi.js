// USER
export const mockUser = {
  success: true,
  username: 'Signe',
  role: 'admin'
}

// CLIENTS
export const mockClients = [
  {
    clientId: 1,
    clientName: 'Nike'
  },
  {
    clientId: 2,
    clientName: 'Lego'
  },
  {
    clientId: 3,
    clientName: 'Apple'
  }
]

// CLIENT INFO
export const mockClientInfo = {
  clientId: 1,
  clientName: 'Nike',

  survey: [
    {
      question:
        'Hvor mange ansatte?',

      answer: '150'
    },
    {
      question:
        'Bruger I SAP?',

      answer: 'Ja'
    }
  ]
}

// ONBOARDING
export const mockOnboarding = [
  {
    id: 1,
    title:
      'Introduktionsvideo',
    type:
      'youtube',
    src:
      'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },

  {
    id: 2,
    title:
      'Onboarding PDF',
    type:
      'pdf',
    src:
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
]

// PDF
export const mockPdfSlides = [
  {
    id: 1,
    title:
      'Velkomst PDF',
    type:
      'pdf',
    src:
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
]

// YOUTUBE
export const mockYoutubeLinks = [
  {
    id: 1,
    title:
      'Intro Video',
    type:
      'youtube',
    src:
      'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
]

// SURVEY QUESTIONS
export const mockSurveyQuestions = [
  {
    id: 1,
    question:
      'Hvilket system bruger I?'
  },

  {
    id: 2,
    question:
      'Hvor mange ansatte har I?'
  }
]

// ANSWERED SURVEYS
export const mockAnsweredSurveys = [
  {
    surveyId: 1,

    survey: [
      {
        question:
          'Hvilket system bruger I?',

        answer:
          'SAP'
      },
      {
        question:
          'Hvor mange ansatte?',

        answer:
          '250'
      }
    ]
  }
]