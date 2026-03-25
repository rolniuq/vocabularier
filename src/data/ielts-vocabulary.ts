/**
 * IELTS Vocabulary Seed Data
 * Curated list of essential IELTS vocabulary for Band 6.5+
 * 
 * Topics covered:
 * - Environment & Climate Change
 * - Technology & Innovation
 * - Education & Learning
 * - Health & Wellbeing
 * - Society & Culture
 * - Work & Career
 * - Globalization & Economy
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

export const ieltsVocabulary: Word[] = [
  // Environment & Climate Change
  createWord({
    word: 'sustainable',
    phonetic: '/səˈsteɪnəbl/',
    partOfSpeech: 'adjective',
    definition: 'Able to continue over a period of time without causing damage to the environment or depleting natural resources',
    examples: [
      'The government is promoting sustainable development to protect the environment.',
      'We need to find sustainable solutions to reduce our carbon footprint.',
      'Sustainable agriculture practices can help preserve soil quality for future generations.',
    ],
    synonyms: ['eco-friendly', 'renewable', 'viable', 'maintainable'],
    antonyms: ['unsustainable', 'harmful', 'destructive'],
    collocations: ['sustainable development', 'sustainable energy', 'sustainable practices', 'sustainable growth'],
    ieltsContext: 'Frequently used in Writing Task 2 essays about environmental topics and Speaking Part 3 discussions about future planning.',
    difficulty: 'intermediate',
    topics: ['environment', 'economy', 'development'],
  }),

  createWord({
    word: 'deteriorate',
    phonetic: '/dɪˈtɪəriəreɪt/',
    partOfSpeech: 'verb',
    definition: 'To become progressively worse in quality, condition, or value',
    examples: [
      'Air quality continues to deteriorate in major cities.',
      'His health began to deteriorate after the diagnosis.',
      'Without proper maintenance, the building will deteriorate rapidly.',
    ],
    synonyms: ['decline', 'worsen', 'degrade', 'decay'],
    antonyms: ['improve', 'enhance', 'recover'],
    collocations: ['rapidly deteriorate', 'deteriorate significantly', 'deteriorate over time', 'health deteriorates'],
    ieltsContext: 'Useful for describing negative trends in IELTS Writing Task 1 and discussing problems in Part 2 and 3 of Speaking.',
    difficulty: 'intermediate',
    topics: ['environment', 'health', 'society'],
  }),

  createWord({
    word: 'exacerbate',
    phonetic: '/ɪɡˈzæsəbeɪt/',
    partOfSpeech: 'verb',
    definition: 'To make a problem, bad situation, or negative feeling worse',
    examples: [
      'Climate change is exacerbating the frequency of natural disasters.',
      'The economic crisis was exacerbated by poor government policies.',
      'Lack of sleep can exacerbate stress and anxiety levels.',
    ],
    synonyms: ['worsen', 'aggravate', 'intensify', 'compound'],
    antonyms: ['alleviate', 'mitigate', 'relieve', 'ease'],
    collocations: ['exacerbate the problem', 'exacerbate the situation', 'further exacerbate', 'exacerbate tensions'],
    ieltsContext: 'A sophisticated word for cause-effect essays in Writing Task 2, particularly when discussing how one problem leads to another.',
    difficulty: 'advanced',
    topics: ['environment', 'society', 'health'],
  }),

  createWord({
    word: 'mitigate',
    phonetic: '/ˈmɪtɪɡeɪt/',
    partOfSpeech: 'verb',
    definition: 'To make something less harmful, serious, or painful',
    examples: [
      'Governments must take action to mitigate the effects of climate change.',
      'Proper planning can help mitigate the risks associated with natural disasters.',
      'The company implemented measures to mitigate environmental damage.',
    ],
    synonyms: ['alleviate', 'reduce', 'lessen', 'diminish'],
    antonyms: ['aggravate', 'worsen', 'intensify', 'exacerbate'],
    collocations: ['mitigate the effects', 'mitigate risks', 'mitigate climate change', 'mitigate damage'],
    ieltsContext: 'Essential for Writing Task 2 when discussing solutions to problems. Often paired with "exacerbate" for contrast.',
    difficulty: 'advanced',
    topics: ['environment', 'policy', 'problem-solving'],
  }),

  createWord({
    word: 'biodiversity',
    phonetic: '/ˌbaɪəʊdaɪˈvɜːsəti/',
    partOfSpeech: 'noun',
    definition: 'The variety of plant and animal life in a particular habitat or on Earth as a whole',
    examples: [
      'Protecting biodiversity is crucial for maintaining healthy ecosystems.',
      'Deforestation poses a serious threat to biodiversity in tropical regions.',
      'Scientists are studying ways to preserve biodiversity in urban areas.',
    ],
    synonyms: ['biological diversity', 'species diversity', 'ecological variety'],
    antonyms: ['monoculture', 'uniformity'],
    collocations: ['protect biodiversity', 'loss of biodiversity', 'preserve biodiversity', 'biodiversity conservation'],
    ieltsContext: 'Commonly appears in Reading passages about wildlife and environment. Useful for Writing Task 2 essays on nature conservation.',
    difficulty: 'intermediate',
    topics: ['environment', 'science', 'conservation'],
  }),

  // Technology & Innovation
  createWord({
    word: 'ubiquitous',
    phonetic: '/juːˈbɪkwɪtəs/',
    partOfSpeech: 'adjective',
    definition: 'Present, appearing, or found everywhere',
    examples: [
      'Smartphones have become ubiquitous in modern society.',
      'Social media has achieved ubiquitous presence in our daily lives.',
      'Coffee shops are now ubiquitous in city centers.',
    ],
    synonyms: ['omnipresent', 'pervasive', 'widespread', 'universal'],
    antonyms: ['rare', 'scarce', 'uncommon', 'limited'],
    collocations: ['ubiquitous presence', 'become ubiquitous', 'ubiquitous technology', 'ubiquitous in modern life'],
    ieltsContext: 'A sophisticated adjective for describing widespread phenomena in technology and society essays.',
    difficulty: 'advanced',
    topics: ['technology', 'society', 'modern life'],
  }),

  createWord({
    word: 'innovative',
    phonetic: '/ˈɪnəvətɪv/',
    partOfSpeech: 'adjective',
    definition: 'Featuring new methods, ideas, or products; original and creative in thinking',
    examples: [
      'The company is known for its innovative approach to problem-solving.',
      'Innovative technologies are transforming the healthcare industry.',
      'Schools should encourage innovative thinking in students.',
    ],
    synonyms: ['creative', 'inventive', 'pioneering', 'groundbreaking'],
    antonyms: ['conventional', 'traditional', 'outdated', 'unoriginal'],
    collocations: ['innovative solutions', 'innovative approach', 'innovative technology', 'innovative ideas'],
    ieltsContext: 'Useful for discussing technology, education, and business topics in both Writing and Speaking.',
    difficulty: 'intermediate',
    topics: ['technology', 'business', 'education'],
  }),

  createWord({
    word: 'revolutionize',
    phonetic: '/ˌrevəˈluːʃənaɪz/',
    partOfSpeech: 'verb',
    definition: 'To completely change the way something is done, thought about, or made',
    examples: [
      'Artificial intelligence is revolutionizing the healthcare industry.',
      'The internet has revolutionized the way we communicate.',
      'Electric vehicles are set to revolutionize transportation.',
    ],
    synonyms: ['transform', 'modernize', 'reform', 'overhaul'],
    antonyms: ['preserve', 'maintain', 'conserve'],
    collocations: ['revolutionize the industry', 'revolutionize the way', 'revolutionize education', 'revolutionize healthcare'],
    ieltsContext: 'Strong verb for discussing technological and social changes in Writing Task 2 and Speaking Part 3.',
    difficulty: 'intermediate',
    topics: ['technology', 'change', 'innovation'],
  }),

  createWord({
    word: 'obsolete',
    phonetic: '/ˈɒbsəliːt/',
    partOfSpeech: 'adjective',
    definition: 'No longer produced or used; out of date',
    examples: [
      'Many traditional jobs are becoming obsolete due to automation.',
      'Typewriters became obsolete with the advent of computers.',
      'Some argue that physical textbooks will soon become obsolete.',
    ],
    synonyms: ['outdated', 'antiquated', 'archaic', 'outmoded'],
    antonyms: ['modern', 'current', 'contemporary', 'cutting-edge'],
    collocations: ['become obsolete', 'render obsolete', 'obsolete technology', 'obsolete skills'],
    ieltsContext: 'Useful for discussing technological change and its impact on employment in Writing Task 2.',
    difficulty: 'intermediate',
    topics: ['technology', 'work', 'change'],
  }),

  // Education & Learning
  createWord({
    word: 'curriculum',
    phonetic: '/kəˈrɪkjʊləm/',
    partOfSpeech: 'noun',
    definition: 'The subjects comprising a course of study in a school or college',
    examples: [
      'The school is updating its curriculum to include more technology courses.',
      'Critical thinking should be integrated into the curriculum at all levels.',
      'The national curriculum sets standards for what students should learn.',
    ],
    synonyms: ['syllabus', 'course of study', 'program', 'educational content'],
    antonyms: [],
    collocations: ['national curriculum', 'school curriculum', 'curriculum development', 'follow the curriculum'],
    ieltsContext: 'Essential vocabulary for education-related essays in Writing Task 2 and Speaking topics about schools.',
    difficulty: 'intermediate',
    topics: ['education', 'learning', 'schools'],
  }),

  createWord({
    word: 'pedagogical',
    phonetic: '/ˌpedəˈɡɒdʒɪkl/',
    partOfSpeech: 'adjective',
    definition: 'Relating to teaching methods and the practice of education',
    examples: [
      'The university is exploring new pedagogical approaches to online learning.',
      'Effective pedagogical strategies can significantly improve student outcomes.',
      'There is ongoing debate about the most effective pedagogical methods.',
    ],
    synonyms: ['educational', 'instructional', 'teaching', 'didactic'],
    antonyms: [],
    collocations: ['pedagogical approach', 'pedagogical methods', 'pedagogical strategies', 'pedagogical techniques'],
    ieltsContext: 'A sophisticated term for education essays, showing advanced vocabulary range.',
    difficulty: 'advanced',
    topics: ['education', 'learning', 'teaching'],
  }),

  createWord({
    word: 'aptitude',
    phonetic: '/ˈæptɪtjuːd/',
    partOfSpeech: 'noun',
    definition: 'A natural ability or talent for learning or doing something',
    examples: [
      'She showed a remarkable aptitude for languages from an early age.',
      'The test measures students\' aptitude for mathematical reasoning.',
      'Natural aptitude alone is not enough; hard work is equally important.',
    ],
    synonyms: ['talent', 'ability', 'gift', 'flair', 'capacity'],
    antonyms: ['inability', 'incompetence', 'weakness'],
    collocations: ['natural aptitude', 'aptitude for', 'aptitude test', 'show aptitude'],
    ieltsContext: 'Useful for discussing education, skills, and talent in both Writing and Speaking.',
    difficulty: 'intermediate',
    topics: ['education', 'skills', 'personal development'],
  }),

  // Health & Wellbeing
  createWord({
    word: 'sedentary',
    phonetic: '/ˈsedntri/',
    partOfSpeech: 'adjective',
    definition: 'Characterized by much sitting and little physical exercise',
    examples: [
      'A sedentary lifestyle can lead to various health problems.',
      'Office workers often lead sedentary lives due to their desk jobs.',
      'Children today are more sedentary than previous generations.',
    ],
    synonyms: ['inactive', 'stationary', 'desk-bound', 'immobile'],
    antonyms: ['active', 'mobile', 'energetic', 'dynamic'],
    collocations: ['sedentary lifestyle', 'sedentary work', 'sedentary behavior', 'sedentary job'],
    ieltsContext: 'Common in health-related Reading passages and useful for Writing Task 2 essays about modern lifestyle.',
    difficulty: 'intermediate',
    topics: ['health', 'lifestyle', 'work'],
  }),

  createWord({
    word: 'prevalent',
    phonetic: '/ˈprevələnt/',
    partOfSpeech: 'adjective',
    definition: 'Widespread in a particular area or at a particular time',
    examples: [
      'Obesity is becoming increasingly prevalent in developed countries.',
      'Mental health issues are more prevalent among young people today.',
      'The disease is particularly prevalent in tropical regions.',
    ],
    synonyms: ['widespread', 'common', 'predominant', 'pervasive'],
    antonyms: ['rare', 'uncommon', 'unusual', 'scarce'],
    collocations: ['increasingly prevalent', 'highly prevalent', 'prevalent among', 'prevalent in'],
    ieltsContext: 'Excellent for describing trends and patterns in both Writing Task 1 and Task 2.',
    difficulty: 'intermediate',
    topics: ['health', 'society', 'trends'],
  }),

  createWord({
    word: 'detrimental',
    phonetic: '/ˌdetrɪˈmentl/',
    partOfSpeech: 'adjective',
    definition: 'Tending to cause harm or damage',
    examples: [
      'Excessive screen time can be detrimental to children\'s development.',
      'Smoking has detrimental effects on both physical and mental health.',
      'Poor diet choices can have detrimental consequences for overall wellbeing.',
    ],
    synonyms: ['harmful', 'damaging', 'injurious', 'adverse'],
    antonyms: ['beneficial', 'advantageous', 'helpful', 'favorable'],
    collocations: ['detrimental effects', 'detrimental to health', 'detrimental impact', 'prove detrimental'],
    ieltsContext: 'Useful for discussing negative impacts in cause-effect essays and problem-solution essays.',
    difficulty: 'intermediate',
    topics: ['health', 'environment', 'society'],
  }),

  // Society & Culture
  createWord({
    word: 'homogeneous',
    phonetic: '/ˌhɒməˈdʒiːniəs/',
    partOfSpeech: 'adjective',
    definition: 'Of the same kind; consisting of parts all of the same type',
    examples: [
      'Japan is often described as a homogeneous society.',
      'The neighborhood has become less homogeneous with increased immigration.',
      'A homogeneous team may lack the diversity of perspectives needed for innovation.',
    ],
    synonyms: ['uniform', 'similar', 'identical', 'consistent'],
    antonyms: ['heterogeneous', 'diverse', 'varied', 'mixed'],
    collocations: ['homogeneous society', 'homogeneous group', 'culturally homogeneous', 'homogeneous population'],
    ieltsContext: 'Useful for discussing cultural diversity, immigration, and social cohesion in essays.',
    difficulty: 'advanced',
    topics: ['society', 'culture', 'diversity'],
  }),

  createWord({
    word: 'assimilate',
    phonetic: '/əˈsɪmɪleɪt/',
    partOfSpeech: 'verb',
    definition: 'To absorb and integrate into a wider society or culture; to fully understand information or ideas',
    examples: [
      'Immigrants often struggle to assimilate into a new culture.',
      'It takes time to assimilate large amounts of new information.',
      'Some argue that migrants should assimilate fully, while others prefer multiculturalism.',
    ],
    synonyms: ['integrate', 'adapt', 'absorb', 'incorporate'],
    antonyms: ['segregate', 'isolate', 'exclude'],
    collocations: ['assimilate into', 'assimilate information', 'fully assimilate', 'culturally assimilate'],
    ieltsContext: 'Important for essays about immigration, cultural integration, and learning.',
    difficulty: 'intermediate',
    topics: ['society', 'culture', 'immigration'],
  }),

  createWord({
    word: 'marginalized',
    phonetic: '/ˈmɑːdʒɪnəlaɪzd/',
    partOfSpeech: 'adjective',
    definition: 'Treated as insignificant or peripheral; pushed to the edges of society',
    examples: [
      'Marginalized communities often lack access to quality healthcare.',
      'The organization works to support marginalized groups in society.',
      'Education can help empower marginalized individuals.',
    ],
    synonyms: ['disadvantaged', 'excluded', 'neglected', 'disenfranchised'],
    antonyms: ['privileged', 'included', 'empowered', 'mainstream'],
    collocations: ['marginalized groups', 'marginalized communities', 'marginalized populations', 'socially marginalized'],
    ieltsContext: 'Useful for discussing social inequality, human rights, and government policy.',
    difficulty: 'intermediate',
    topics: ['society', 'inequality', 'human rights'],
  }),

  // Work & Career
  createWord({
    word: 'autonomous',
    phonetic: '/ɔːˈtɒnəməs/',
    partOfSpeech: 'adjective',
    definition: 'Having the freedom to act independently; self-governing',
    examples: [
      'Employees are given autonomous control over their projects.',
      'Autonomous vehicles are expected to transform transportation.',
      'Universities should be autonomous institutions free from government interference.',
    ],
    synonyms: ['independent', 'self-governing', 'self-directed', 'self-sufficient'],
    antonyms: ['dependent', 'controlled', 'subordinate', 'restricted'],
    collocations: ['autonomous vehicles', 'autonomous region', 'autonomous decision-making', 'fully autonomous'],
    ieltsContext: 'Applicable to essays about workplace, technology (AI/robotics), and governance.',
    difficulty: 'intermediate',
    topics: ['work', 'technology', 'governance'],
  }),

  createWord({
    word: 'meticulous',
    phonetic: '/məˈtɪkjʊləs/',
    partOfSpeech: 'adjective',
    definition: 'Showing great attention to detail; very careful and precise',
    examples: [
      'The researcher was meticulous in documenting every observation.',
      'A meticulous approach is essential for quality control.',
      'She is known for her meticulous planning and organization.',
    ],
    synonyms: ['thorough', 'careful', 'precise', 'painstaking', 'scrupulous'],
    antonyms: ['careless', 'sloppy', 'negligent', 'haphazard'],
    collocations: ['meticulous attention', 'meticulous planning', 'meticulous research', 'meticulous in'],
    ieltsContext: 'Useful for describing work habits, research methods, and personal qualities.',
    difficulty: 'intermediate',
    topics: ['work', 'personal qualities', 'research'],
  }),

  createWord({
    word: 'collaborate',
    phonetic: '/kəˈlæbəreɪt/',
    partOfSpeech: 'verb',
    definition: 'To work jointly with others on an activity or project',
    examples: [
      'Scientists from different countries collaborate on climate research.',
      'The companies decided to collaborate on developing new technologies.',
      'Students learn to collaborate effectively in group projects.',
    ],
    synonyms: ['cooperate', 'work together', 'partner', 'team up'],
    antonyms: ['compete', 'oppose', 'work alone'],
    collocations: ['collaborate with', 'collaborate on', 'closely collaborate', 'collaborate effectively'],
    ieltsContext: 'Common in discussions about teamwork, international cooperation, and workplace skills.',
    difficulty: 'beginner',
    topics: ['work', 'education', 'international relations'],
  }),

  // Globalization & Economy
  createWord({
    word: 'globalization',
    phonetic: '/ˌɡləʊbəlaɪˈzeɪʃn/',
    partOfSpeech: 'noun',
    definition: 'The process by which businesses, technologies, and philosophies spread throughout the world',
    examples: [
      'Globalization has both positive and negative impacts on local cultures.',
      'The effects of globalization can be seen in every aspect of modern life.',
      'Some argue that globalization has increased inequality between nations.',
    ],
    synonyms: ['internationalization', 'worldwide integration', 'global interconnection'],
    antonyms: ['localization', 'isolation', 'protectionism'],
    collocations: ['economic globalization', 'effects of globalization', 'cultural globalization', 'globalization process'],
    ieltsContext: 'A central topic in IELTS Writing and Speaking, often appearing in essays about culture, economy, and society.',
    difficulty: 'intermediate',
    topics: ['economy', 'culture', 'international relations'],
  }),

  createWord({
    word: 'disparity',
    phonetic: '/dɪˈspærəti/',
    partOfSpeech: 'noun',
    definition: 'A great difference or inequality between things',
    examples: [
      'There is a significant disparity in wealth between developed and developing nations.',
      'The disparity in educational opportunities must be addressed.',
      'Gender disparity in the workplace remains a pressing issue.',
    ],
    synonyms: ['inequality', 'difference', 'gap', 'discrepancy'],
    antonyms: ['equality', 'similarity', 'parity', 'balance'],
    collocations: ['income disparity', 'wealth disparity', 'gender disparity', 'disparity between'],
    ieltsContext: 'Essential for discussing inequality, social issues, and comparing data in Writing Task 1 and 2.',
    difficulty: 'intermediate',
    topics: ['economy', 'society', 'inequality'],
  }),

  createWord({
    word: 'burgeoning',
    phonetic: '/ˈbɜːdʒənɪŋ/',
    partOfSpeech: 'adjective',
    definition: 'Beginning to grow or develop rapidly; flourishing',
    examples: [
      'The burgeoning technology sector is creating new job opportunities.',
      'China\'s burgeoning middle class is driving consumer demand.',
      'There is a burgeoning interest in sustainable living.',
    ],
    synonyms: ['growing', 'expanding', 'flourishing', 'booming'],
    antonyms: ['declining', 'shrinking', 'diminishing', 'stagnating'],
    collocations: ['burgeoning industry', 'burgeoning market', 'burgeoning population', 'burgeoning demand'],
    ieltsContext: 'A sophisticated adjective for describing growth trends in economic and social contexts.',
    difficulty: 'advanced',
    topics: ['economy', 'development', 'trends'],
  }),

  createWord({
    word: 'fluctuate',
    phonetic: '/ˈflʌktʃueɪt/',
    partOfSpeech: 'verb',
    definition: 'To rise and fall irregularly in number or amount',
    examples: [
      'Oil prices tend to fluctuate based on global demand.',
      'The number of tourists fluctuates throughout the year.',
      'Exchange rates fluctuate daily based on market conditions.',
    ],
    synonyms: ['vary', 'change', 'oscillate', 'swing'],
    antonyms: ['stabilize', 'remain constant', 'steady'],
    collocations: ['fluctuate between', 'fluctuate widely', 'prices fluctuate', 'fluctuate over time'],
    ieltsContext: 'Essential for describing data trends in Writing Task 1 (graphs and charts).',
    difficulty: 'intermediate',
    topics: ['economy', 'data description', 'trends'],
  }),

  // Additional high-value words
  createWord({
    word: 'pragmatic',
    phonetic: '/præɡˈmætɪk/',
    partOfSpeech: 'adjective',
    definition: 'Dealing with things sensibly and realistically based on practical considerations',
    examples: [
      'We need a pragmatic approach to solving this complex issue.',
      'The government adopted a more pragmatic economic policy.',
      'Being pragmatic is essential when resources are limited.',
    ],
    synonyms: ['practical', 'realistic', 'sensible', 'matter-of-fact'],
    antonyms: ['idealistic', 'impractical', 'unrealistic', 'theoretical'],
    collocations: ['pragmatic approach', 'pragmatic solution', 'pragmatic decision', 'pragmatic view'],
    ieltsContext: 'Useful for discussing solutions and decision-making in various essay types.',
    difficulty: 'intermediate',
    topics: ['problem-solving', 'policy', 'decision-making'],
  }),

  createWord({
    word: 'profound',
    phonetic: '/prəˈfaʊnd/',
    partOfSpeech: 'adjective',
    definition: 'Very great or intense; having or showing deep insight',
    examples: [
      'Technology has had a profound impact on how we live.',
      'The book left a profound impression on me.',
      'There are profound differences between the two approaches.',
    ],
    synonyms: ['deep', 'significant', 'far-reaching', 'intense'],
    antonyms: ['superficial', 'shallow', 'insignificant', 'trivial'],
    collocations: ['profound impact', 'profound effect', 'profound change', 'profound influence'],
    ieltsContext: 'A versatile word for emphasizing the significance of changes, effects, or differences.',
    difficulty: 'intermediate',
    topics: ['general', 'change', 'impact'],
  }),

  createWord({
    word: 'inevitable',
    phonetic: '/ɪnˈevɪtəbl/',
    partOfSpeech: 'adjective',
    definition: 'Certain to happen; unavoidable',
    examples: [
      'Change is inevitable in any growing organization.',
      'Some argue that conflict between the two nations was inevitable.',
      'The inevitable consequences of climate change are already being felt.',
    ],
    synonyms: ['unavoidable', 'inescapable', 'certain', 'destined'],
    antonyms: ['avoidable', 'preventable', 'uncertain', 'unlikely'],
    collocations: ['inevitable consequence', 'inevitable result', 'inevitable change', 'seem inevitable'],
    ieltsContext: 'Useful for discussing predictions, consequences, and certainty in essays.',
    difficulty: 'intermediate',
    topics: ['general', 'change', 'prediction'],
  }),

  createWord({
    word: 'resilient',
    phonetic: '/rɪˈzɪliənt/',
    partOfSpeech: 'adjective',
    definition: 'Able to recover quickly from difficulties; tough and adaptable',
    examples: [
      'Children are often more resilient than we give them credit for.',
      'Building resilient communities is essential for disaster preparedness.',
      'The economy has proven resilient in the face of various challenges.',
    ],
    synonyms: ['adaptable', 'flexible', 'tough', 'hardy'],
    antonyms: ['fragile', 'weak', 'vulnerable', 'brittle'],
    collocations: ['resilient to', 'highly resilient', 'resilient communities', 'build resilience'],
    ieltsContext: 'Increasingly common in discussions about mental health, climate adaptation, and economic recovery.',
    difficulty: 'intermediate',
    topics: ['psychology', 'economy', 'environment'],
  }),

  createWord({
    word: 'unprecedented',
    phonetic: '/ʌnˈpresɪdentɪd/',
    partOfSpeech: 'adjective',
    definition: 'Never done or known before',
    examples: [
      'The pandemic caused unprecedented disruption to global travel.',
      'We are witnessing unprecedented levels of technological advancement.',
      'The government took unprecedented measures to support the economy.',
    ],
    synonyms: ['unparalleled', 'unequaled', 'extraordinary', 'exceptional'],
    antonyms: ['common', 'usual', 'ordinary', 'typical'],
    collocations: ['unprecedented levels', 'unprecedented times', 'unprecedented action', 'unprecedented growth'],
    ieltsContext: 'Powerful word for emphasizing uniqueness or extremity of situations.',
    difficulty: 'intermediate',
    topics: ['general', 'change', 'current affairs'],
  }),

  createWord({
    word: 'scrutinize',
    phonetic: '/ˈskruːtənaɪz/',
    partOfSpeech: 'verb',
    definition: 'To examine or inspect closely and thoroughly',
    examples: [
      'The committee will scrutinize the proposal before making a decision.',
      'Consumers are increasingly scrutinizing the environmental impact of products.',
      'Scientists scrutinize data carefully before drawing conclusions.',
    ],
    synonyms: ['examine', 'inspect', 'analyze', 'investigate'],
    antonyms: ['overlook', 'ignore', 'neglect', 'disregard'],
    collocations: ['scrutinize closely', 'scrutinize carefully', 'scrutinize the data', 'scrutinize every detail'],
    ieltsContext: 'Useful for discussing research methods, critical analysis, and evaluation.',
    difficulty: 'intermediate',
    topics: ['research', 'analysis', 'evaluation'],
  }),

  createWord({
    word: 'concur',
    phonetic: '/kənˈkɜː(r)/',
    partOfSpeech: 'verb',
    definition: 'To agree with a statement or opinion; to happen at the same time',
    examples: [
      'Most experts concur that immediate action is necessary.',
      'I concur with the previous speaker\'s assessment.',
      'Several factors concurred to create the perfect conditions.',
    ],
    synonyms: ['agree', 'accord', 'coincide', 'correspond'],
    antonyms: ['disagree', 'differ', 'oppose', 'contradict'],
    collocations: ['concur with', 'concur that', 'experts concur', 'generally concur'],
    ieltsContext: 'A formal alternative to "agree" that can elevate academic writing.',
    difficulty: 'intermediate',
    topics: ['opinion', 'agreement', 'academic writing'],
  }),

  createWord({
    word: 'encompass',
    phonetic: '/ɪnˈkʌmpəs/',
    partOfSpeech: 'verb',
    definition: 'To include comprehensively; to surround or cover completely',
    examples: [
      'The study encompasses a wide range of topics related to health.',
      'The term "education" encompasses both formal and informal learning.',
      'The project encompasses several different phases.',
    ],
    synonyms: ['include', 'cover', 'comprise', 'contain'],
    antonyms: ['exclude', 'omit', 'leave out'],
    collocations: ['encompass a range', 'encompass all aspects', 'broadly encompass', 'encompass various'],
    ieltsContext: 'Useful for introducing broad topics or explaining the scope of something.',
    difficulty: 'intermediate',
    topics: ['general', 'scope', 'definition'],
  }),
];

// Import extended vocabulary
import { extendedVocabulary } from './extended-vocabulary';

// Combine all vocabulary
export const allVocabulary = [...ieltsVocabulary, ...extendedVocabulary];

export default allVocabulary;
