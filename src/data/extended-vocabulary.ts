/**
 * Extended IELTS Vocabulary - Part 2
 * More high-frequency words for IELTS Band 6.5+
 */

import { Word } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const createWord = (data: Omit<Word, 'id' | 'source' | 'createdAt' | 'updatedAt'>): Word => ({
  ...data,
  id: uuidv4(),
  source: 'official',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const extendedVocabulary: Word[] = [
  // Academic & Research
  createWord({
    word: 'empirical',
    phonetic: '/ɪmˈpɪrɪkl/',
    partOfSpeech: 'adjective',
    definition: 'Based on observation or experience rather than theory or pure logic',
    examples: [
      'The study provides empirical evidence to support the hypothesis.',
      'Empirical research methods are essential in scientific investigation.',
      'We need more empirical data before drawing conclusions.',
    ],
    synonyms: ['observational', 'experimental', 'practical', 'factual'],
    antonyms: ['theoretical', 'hypothetical', 'speculative'],
    collocations: ['empirical evidence', 'empirical research', 'empirical data', 'empirical study'],
    ieltsContext: 'Crucial for Academic Writing Task 2 when discussing research-based arguments.',
    difficulty: 'advanced',
    topics: ['research', 'science', 'academic'],
  }),

  createWord({
    word: 'hypothesis',
    phonetic: '/haɪˈpɒθəsɪs/',
    partOfSpeech: 'noun',
    definition: 'A proposed explanation for something that can be tested through study and experimentation',
    examples: [
      'The researchers developed a hypothesis about climate change effects.',
      'The hypothesis was proven correct after extensive testing.',
      'Scientists must be willing to revise their hypothesis based on new evidence.',
    ],
    synonyms: ['theory', 'proposition', 'assumption', 'premise'],
    antonyms: ['fact', 'certainty', 'proof'],
    collocations: ['test a hypothesis', 'support the hypothesis', 'reject the hypothesis', 'working hypothesis'],
    ieltsContext: 'Useful in Reading passages about scientific studies and Writing Task 2 discussions.',
    difficulty: 'intermediate',
    topics: ['science', 'research', 'academic'],
  }),

  createWord({
    word: 'phenomenon',
    phonetic: '/fəˈnɒmɪnən/',
    partOfSpeech: 'noun',
    definition: 'A fact or situation that is observed to exist or happen, especially one whose cause is in question',
    examples: [
      'Global warming is a phenomenon that affects the entire planet.',
      'The phenomenon of social media addiction is increasingly common.',
      'Scientists are studying this unusual phenomenon.',
    ],
    synonyms: ['occurrence', 'event', 'happening', 'fact'],
    antonyms: [],
    collocations: ['natural phenomenon', 'social phenomenon', 'cultural phenomenon', 'explain the phenomenon'],
    ieltsContext: 'Frequently used in Reading passages and useful for describing trends in Writing.',
    difficulty: 'intermediate',
    topics: ['science', 'society', 'general'],
  }),

  createWord({
    word: 'paradigm',
    phonetic: '/ˈpærədaɪm/',
    partOfSpeech: 'noun',
    definition: 'A typical example or pattern of something; a model or framework of thinking',
    examples: [
      'The digital revolution has created a new paradigm in communication.',
      'There has been a paradigm shift in how we approach education.',
      'The old paradigm of economic growth is being challenged.',
    ],
    synonyms: ['model', 'pattern', 'framework', 'standard'],
    antonyms: [],
    collocations: ['paradigm shift', 'new paradigm', 'change the paradigm', 'current paradigm'],
    ieltsContext: 'A sophisticated term for discussing changes in thinking or approach.',
    difficulty: 'advanced',
    topics: ['academic', 'change', 'thinking'],
  }),

  // Social Issues
  createWord({
    word: 'inequality',
    phonetic: '/ˌɪnɪˈkwɒləti/',
    partOfSpeech: 'noun',
    definition: 'Difference in size, degree, circumstances, etc.; lack of equality',
    examples: [
      'Income inequality has been growing in many developed nations.',
      'Gender inequality remains a significant issue in the workplace.',
      'The report highlights educational inequality between regions.',
    ],
    synonyms: ['disparity', 'imbalance', 'unevenness', 'difference'],
    antonyms: ['equality', 'parity', 'balance', 'fairness'],
    collocations: ['social inequality', 'income inequality', 'gender inequality', 'reduce inequality'],
    ieltsContext: 'Essential for essays about social issues, economics, and development.',
    difficulty: 'intermediate',
    topics: ['society', 'economics', 'development'],
  }),

  createWord({
    word: 'demographic',
    phonetic: '/ˌdeməˈɡræfɪk/',
    partOfSpeech: 'adjective/noun',
    definition: 'Relating to the structure of populations; a particular section of a population',
    examples: [
      'Demographic changes are reshaping the workforce.',
      'The company targets a younger demographic.',
      'Demographic data shows an aging population.',
    ],
    synonyms: ['population-based', 'statistical', 'population segment'],
    antonyms: [],
    collocations: ['demographic change', 'demographic shift', 'demographic data', 'target demographic'],
    ieltsContext: 'Important for describing population trends in Writing Task 1 and Task 2.',
    difficulty: 'intermediate',
    topics: ['society', 'population', 'statistics'],
  }),

  createWord({
    word: 'indigenous',
    phonetic: '/ɪnˈdɪdʒənəs/',
    partOfSpeech: 'adjective',
    definition: 'Originating or occurring naturally in a particular place; native',
    examples: [
      'Indigenous communities have valuable knowledge about local ecosystems.',
      'The government is working to protect indigenous languages.',
      'Indigenous plants are better adapted to the local climate.',
    ],
    synonyms: ['native', 'original', 'aboriginal', 'local'],
    antonyms: ['foreign', 'imported', 'alien', 'non-native'],
    collocations: ['indigenous people', 'indigenous culture', 'indigenous species', 'indigenous knowledge'],
    ieltsContext: 'Useful for essays about culture, environment, and human rights.',
    difficulty: 'intermediate',
    topics: ['culture', 'environment', 'society'],
  }),

  // Environment & Sustainability
  createWord({
    word: 'renewable',
    phonetic: '/rɪˈnjuːəbl/',
    partOfSpeech: 'adjective',
    definition: 'Capable of being renewed or replaced; not depleted when used',
    examples: [
      'Solar and wind are examples of renewable energy sources.',
      'The country is investing heavily in renewable technology.',
      'Renewable resources must be managed sustainably.',
    ],
    synonyms: ['sustainable', 'replenishable', 'inexhaustible'],
    antonyms: ['non-renewable', 'finite', 'exhaustible'],
    collocations: ['renewable energy', 'renewable resources', 'renewable sources', 'renewable power'],
    ieltsContext: 'Essential vocabulary for environmental topics in both Writing and Speaking.',
    difficulty: 'beginner',
    topics: ['environment', 'energy', 'technology'],
  }),

  createWord({
    word: 'deforestation',
    phonetic: '/ˌdiːˌfɒrɪˈsteɪʃn/',
    partOfSpeech: 'noun',
    definition: 'The action of clearing a wide area of trees',
    examples: [
      'Deforestation in the Amazon is a major environmental concern.',
      'Deforestation contributes significantly to climate change.',
      'Efforts to reduce deforestation have had mixed results.',
    ],
    synonyms: ['forest clearing', 'logging', 'tree removal'],
    antonyms: ['afforestation', 'reforestation'],
    collocations: ['tropical deforestation', 'prevent deforestation', 'rate of deforestation', 'illegal deforestation'],
    ieltsContext: 'Key term for environmental essays and Reading passages about climate.',
    difficulty: 'intermediate',
    topics: ['environment', 'climate', 'conservation'],
  }),

  createWord({
    word: 'emission',
    phonetic: '/ɪˈmɪʃn/',
    partOfSpeech: 'noun',
    definition: 'The production and discharge of something, especially gas or radiation',
    examples: [
      'Carbon emissions from vehicles contribute to air pollution.',
      'The factory has reduced its emissions by 30%.',
      'Countries are working to cut greenhouse gas emissions.',
    ],
    synonyms: ['discharge', 'release', 'output', 'expulsion'],
    antonyms: ['absorption', 'capture'],
    collocations: ['carbon emissions', 'greenhouse gas emissions', 'reduce emissions', 'emission levels'],
    ieltsContext: 'Frequently used in environmental topics and climate change discussions.',
    difficulty: 'intermediate',
    topics: ['environment', 'climate', 'pollution'],
  }),

  createWord({
    word: 'conservation',
    phonetic: '/ˌkɒnsəˈveɪʃn/',
    partOfSpeech: 'noun',
    definition: 'The action of preserving, protecting, or restoring the natural environment or resources',
    examples: [
      'Wildlife conservation is essential for maintaining biodiversity.',
      'Energy conservation measures can reduce household bills.',
      'The conservation of historical buildings is a priority.',
    ],
    synonyms: ['preservation', 'protection', 'maintenance', 'safeguarding'],
    antonyms: ['destruction', 'exploitation', 'waste'],
    collocations: ['wildlife conservation', 'energy conservation', 'conservation efforts', 'conservation area'],
    ieltsContext: 'Important for environmental topics and discussions about sustainability.',
    difficulty: 'intermediate',
    topics: ['environment', 'wildlife', 'resources'],
  }),

  // Technology & Digital
  createWord({
    word: 'automation',
    phonetic: '/ˌɔːtəˈmeɪʃn/',
    partOfSpeech: 'noun',
    definition: 'The use of machines or computers to do work that was previously done by people',
    examples: [
      'Automation has transformed manufacturing industries.',
      'The automation of routine tasks frees workers for more creative work.',
      'Many jobs are at risk due to increasing automation.',
    ],
    synonyms: ['mechanization', 'computerization', 'robotization'],
    antonyms: ['manual labor', 'hand work'],
    collocations: ['industrial automation', 'automation technology', 'automation of jobs', 'workplace automation'],
    ieltsContext: 'Essential for essays about technology, employment, and the future of work.',
    difficulty: 'intermediate',
    topics: ['technology', 'work', 'economy'],
  }),

  createWord({
    word: 'artificial',
    phonetic: '/ˌɑːtɪˈfɪʃl/',
    partOfSpeech: 'adjective',
    definition: 'Made or produced by human beings rather than occurring naturally',
    examples: [
      'Artificial intelligence is transforming many industries.',
      'The lake is artificial, created for irrigation purposes.',
      'Scientists have developed artificial organs for transplants.',
    ],
    synonyms: ['synthetic', 'man-made', 'manufactured', 'simulated'],
    antonyms: ['natural', 'organic', 'genuine', 'real'],
    collocations: ['artificial intelligence', 'artificial light', 'artificial sweeteners', 'artificial materials'],
    ieltsContext: 'Key vocabulary for technology and science topics.',
    difficulty: 'beginner',
    topics: ['technology', 'science', 'innovation'],
  }),

  createWord({
    word: 'surveillance',
    phonetic: '/sɜːˈveɪləns/',
    partOfSpeech: 'noun',
    definition: 'Close observation, especially of a suspected person or place',
    examples: [
      'CCTV surveillance has become common in urban areas.',
      'Mass surveillance raises concerns about privacy.',
      'The building is under 24-hour surveillance.',
    ],
    synonyms: ['monitoring', 'observation', 'watching', 'scrutiny'],
    antonyms: ['privacy', 'freedom'],
    collocations: ['under surveillance', 'surveillance cameras', 'mass surveillance', 'surveillance technology'],
    ieltsContext: 'Useful for essays about privacy, security, and technology.',
    difficulty: 'intermediate',
    topics: ['technology', 'security', 'privacy'],
  }),

  // Health & Psychology
  createWord({
    word: 'chronic',
    phonetic: '/ˈkrɒnɪk/',
    partOfSpeech: 'adjective',
    definition: 'Persisting for a long time or constantly recurring; habitual',
    examples: [
      'Chronic diseases require long-term management.',
      'The city suffers from chronic air pollution problems.',
      'Chronic stress can have serious health consequences.',
    ],
    synonyms: ['persistent', 'long-term', 'continuous', 'ongoing'],
    antonyms: ['acute', 'temporary', 'brief', 'short-term'],
    collocations: ['chronic disease', 'chronic pain', 'chronic illness', 'chronic problem'],
    ieltsContext: 'Important for health-related topics and problem-solution essays.',
    difficulty: 'intermediate',
    topics: ['health', 'medicine', 'problems'],
  }),

  createWord({
    word: 'cognitive',
    phonetic: '/ˈkɒɡnətɪv/',
    partOfSpeech: 'adjective',
    definition: 'Relating to the mental processes of perception, memory, judgment, and reasoning',
    examples: [
      'Cognitive development is crucial in early childhood.',
      'The study examines cognitive abilities in elderly patients.',
      'Exercise has been shown to improve cognitive function.',
    ],
    synonyms: ['mental', 'intellectual', 'cerebral', 'psychological'],
    antonyms: ['physical', 'emotional'],
    collocations: ['cognitive development', 'cognitive skills', 'cognitive function', 'cognitive abilities'],
    ieltsContext: 'Useful for education and psychology topics.',
    difficulty: 'advanced',
    topics: ['psychology', 'education', 'health'],
  }),

  createWord({
    word: 'therapeutic',
    phonetic: '/ˌθerəˈpjuːtɪk/',
    partOfSpeech: 'adjective',
    definition: 'Relating to the healing of disease; having a beneficial effect on health or well-being',
    examples: [
      'Music can have therapeutic benefits for mental health.',
      'Therapeutic approaches vary depending on the condition.',
      'The garden was designed with therapeutic purposes in mind.',
    ],
    synonyms: ['healing', 'curative', 'medicinal', 'beneficial'],
    antonyms: ['harmful', 'damaging', 'detrimental'],
    collocations: ['therapeutic effects', 'therapeutic value', 'therapeutic treatment', 'therapeutic benefits'],
    ieltsContext: 'Useful for health and wellbeing topics.',
    difficulty: 'intermediate',
    topics: ['health', 'medicine', 'wellbeing'],
  }),

  // Business & Economics
  createWord({
    word: 'fiscal',
    phonetic: '/ˈfɪskl/',
    partOfSpeech: 'adjective',
    definition: 'Relating to government revenue and spending; financial',
    examples: [
      'The government announced new fiscal policies to stimulate growth.',
      'Fiscal responsibility is important for economic stability.',
      'The fiscal year ends in March.',
    ],
    synonyms: ['financial', 'monetary', 'economic', 'budgetary'],
    antonyms: [],
    collocations: ['fiscal policy', 'fiscal year', 'fiscal deficit', 'fiscal responsibility'],
    ieltsContext: 'Important for economic and government-related topics.',
    difficulty: 'advanced',
    topics: ['economics', 'government', 'finance'],
  }),

  createWord({
    word: 'infrastructure',
    phonetic: '/ˈɪnfrəstrʌktʃə/',
    partOfSpeech: 'noun',
    definition: 'The basic physical and organizational structures and facilities needed for the operation of a society',
    examples: [
      'The country needs to invest in modern infrastructure.',
      'Poor infrastructure hampers economic development.',
      'Digital infrastructure is becoming as important as physical infrastructure.',
    ],
    synonyms: ['framework', 'foundation', 'facilities', 'systems'],
    antonyms: [],
    collocations: ['transport infrastructure', 'digital infrastructure', 'infrastructure investment', 'infrastructure development'],
    ieltsContext: 'Key vocabulary for development and urbanization topics.',
    difficulty: 'intermediate',
    topics: ['development', 'economics', 'urbanization'],
  }),

  createWord({
    word: 'subsidize',
    phonetic: '/ˈsʌbsɪdaɪz/',
    partOfSpeech: 'verb',
    definition: 'To support financially; to pay part of the cost of something',
    examples: [
      'The government subsidizes public transportation.',
      'Farmers are subsidized to maintain food production.',
      'Some argue that fossil fuels should not be subsidized.',
    ],
    synonyms: ['fund', 'finance', 'support', 'sponsor'],
    antonyms: ['tax', 'charge'],
    collocations: ['heavily subsidized', 'government subsidize', 'subsidize the cost', 'subsidize industry'],
    ieltsContext: 'Useful for economic policy and government spending topics.',
    difficulty: 'intermediate',
    topics: ['economics', 'government', 'policy'],
  }),

  // Communication & Language
  createWord({
    word: 'articulate',
    phonetic: '/ɑːˈtɪkjʊleɪt/',
    partOfSpeech: 'verb/adjective',
    definition: 'To express an idea or feeling fluently and coherently; able to express thoughts clearly',
    examples: [
      'She articulated her concerns about the proposal clearly.',
      'He is an articulate speaker who can explain complex ideas simply.',
      'The report articulates the need for policy change.',
    ],
    synonyms: ['express', 'communicate', 'eloquent', 'fluent'],
    antonyms: ['inarticulate', 'unclear', 'mumble'],
    collocations: ['articulate clearly', 'articulate concerns', 'well-articulated', 'articulate speaker'],
    ieltsContext: 'Useful for describing communication skills and expressing ideas.',
    difficulty: 'intermediate',
    topics: ['communication', 'language', 'skills'],
  }),

  createWord({
    word: 'convey',
    phonetic: '/kənˈveɪ/',
    partOfSpeech: 'verb',
    definition: 'To communicate or express something with or without words',
    examples: [
      'Art can convey powerful emotions.',
      'The message was difficult to convey in writing.',
      'His expression conveyed deep concern.',
    ],
    synonyms: ['communicate', 'express', 'transmit', 'impart'],
    antonyms: ['conceal', 'hide', 'withhold'],
    collocations: ['convey meaning', 'convey a message', 'convey information', 'convey emotions'],
    ieltsContext: 'Useful for discussing communication and expression in essays.',
    difficulty: 'intermediate',
    topics: ['communication', 'expression', 'language'],
  }),

  // Critical Thinking
  createWord({
    word: 'subjective',
    phonetic: '/səbˈdʒektɪv/',
    partOfSpeech: 'adjective',
    definition: 'Based on or influenced by personal feelings, tastes, or opinions',
    examples: [
      'Beauty is subjective and varies across cultures.',
      'The assessment was too subjective to be reliable.',
      'Subjective experiences are difficult to measure scientifically.',
    ],
    synonyms: ['personal', 'individual', 'biased', 'prejudiced'],
    antonyms: ['objective', 'impartial', 'unbiased', 'factual'],
    collocations: ['subjective opinion', 'subjective experience', 'subjective judgment', 'highly subjective'],
    ieltsContext: 'Important for discussing opinions versus facts in essays.',
    difficulty: 'intermediate',
    topics: ['critical thinking', 'philosophy', 'research'],
  }),

  createWord({
    word: 'objective',
    phonetic: '/əbˈdʒektɪv/',
    partOfSpeech: 'adjective/noun',
    definition: 'Not influenced by personal feelings; based on facts; a goal or aim',
    examples: [
      'Scientists must remain objective in their research.',
      'The main objective is to improve customer satisfaction.',
      'Objective analysis requires looking at all the evidence.',
    ],
    synonyms: ['impartial', 'unbiased', 'neutral', 'goal'],
    antonyms: ['subjective', 'biased', 'partial'],
    collocations: ['main objective', 'objective analysis', 'objective view', 'achieve the objective'],
    ieltsContext: 'Essential for academic writing and research-related topics.',
    difficulty: 'intermediate',
    topics: ['critical thinking', 'research', 'goals'],
  }),

  createWord({
    word: 'valid',
    phonetic: '/ˈvælɪd/',
    partOfSpeech: 'adjective',
    definition: 'Having a sound basis in logic or fact; reasonable or cogent',
    examples: [
      'The argument is valid but not necessarily correct.',
      'Do you have a valid reason for being late?',
      'The research methodology must be valid and reliable.',
    ],
    synonyms: ['legitimate', 'sound', 'reasonable', 'logical'],
    antonyms: ['invalid', 'unsound', 'flawed', 'unreasonable'],
    collocations: ['valid argument', 'valid point', 'valid reason', 'valid concern'],
    ieltsContext: 'Useful for evaluating arguments and evidence in essays.',
    difficulty: 'beginner',
    topics: ['critical thinking', 'logic', 'argumentation'],
  }),

  createWord({
    word: 'bias',
    phonetic: '/ˈbaɪəs/',
    partOfSpeech: 'noun/verb',
    definition: 'Prejudice in favor of or against something; to influence unfairly',
    examples: [
      'The study may have been affected by selection bias.',
      'Media bias can influence public opinion.',
      'We must be aware of our own biases.',
    ],
    synonyms: ['prejudice', 'partiality', 'favoritism', 'inclination'],
    antonyms: ['objectivity', 'impartiality', 'fairness'],
    collocations: ['confirmation bias', 'gender bias', 'cultural bias', 'bias towards'],
    ieltsContext: 'Important for discussing research, media, and critical analysis.',
    difficulty: 'intermediate',
    topics: ['critical thinking', 'media', 'research'],
  }),

  // Abstract Concepts
  createWord({
    word: 'inherent',
    phonetic: '/ɪnˈhɪərənt/',
    partOfSpeech: 'adjective',
    definition: 'Existing as a natural or essential part of something',
    examples: [
      'There are inherent risks in any investment.',
      'The inherent beauty of nature inspires artists.',
      'Creativity is inherent in human nature.',
    ],
    synonyms: ['innate', 'intrinsic', 'built-in', 'fundamental'],
    antonyms: ['acquired', 'external', 'extrinsic'],
    collocations: ['inherent in', 'inherent risk', 'inherent problem', 'inherent value'],
    ieltsContext: 'Useful for discussing fundamental characteristics in essays.',
    difficulty: 'advanced',
    topics: ['abstract', 'philosophy', 'nature'],
  }),

  createWord({
    word: 'tangible',
    phonetic: '/ˈtændʒəbl/',
    partOfSpeech: 'adjective',
    definition: 'Perceptible by touch; clear and definite; real',
    examples: [
      'The project has produced tangible results.',
      'We need tangible evidence to support the claim.',
      'The benefits of exercise are both tangible and intangible.',
    ],
    synonyms: ['concrete', 'real', 'material', 'palpable'],
    antonyms: ['intangible', 'abstract', 'immaterial'],
    collocations: ['tangible results', 'tangible benefits', 'tangible evidence', 'tangible assets'],
    ieltsContext: 'Useful for contrasting concrete and abstract concepts.',
    difficulty: 'intermediate',
    topics: ['abstract', 'business', 'results'],
  }),

  createWord({
    word: 'notion',
    phonetic: '/ˈnəʊʃn/',
    partOfSpeech: 'noun',
    definition: 'A conception of or belief about something; an idea',
    examples: [
      'The notion that money brings happiness is widely debated.',
      'Traditional notions of family are changing.',
      'She rejected the notion that success requires sacrifice.',
    ],
    synonyms: ['idea', 'concept', 'belief', 'view'],
    antonyms: ['fact', 'reality', 'certainty'],
    collocations: ['the notion that', 'common notion', 'reject the notion', 'support the notion'],
    ieltsContext: 'Useful for introducing ideas and beliefs in essays.',
    difficulty: 'intermediate',
    topics: ['ideas', 'beliefs', 'philosophy'],
  }),
];

export default extendedVocabulary;
