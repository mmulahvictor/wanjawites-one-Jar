import { Poem, VideoItem, Article, Achievement, GalleryItem, Service, NewsletterLetter } from '../types';

export const WANJA_PROFILE = {
  fullName: 'Faith Wanja',
  artistName: 'One-Jar Poetry',
  title: 'Communications Consultant | Culture Writer | Kenyan Poet & Documentarian',
  email: 'wanjawrites05@gmail.com',
  phone: '+254798217463',
  website: 'https://wanjawrites.africa/',
  linkedin: 'https://www.linkedin.com/in/faith-wanja-730650228/',
  youtube: 'https://www.youtube.com/@one_jar_poetry',
  tiktok: 'https://www.tiktok.com/@one_jar_poetry',
  instagram: 'https://www.instagram.com/one_jar_poetry',
  facebook: 'https://www.facebook.com/one_jar_poetry',
  whatsappChannel: 'https://whatsapp.com/channel/one_jar_poetry',
  tagline: 'My name is Wanja. I fill spaces with poems ONE JAR at a time.',
  coreQuestion: 'Who keeps the record of our becoming?',
  headshotUrl: '/images/wanja_headshot.jpg',
  academicPaper: {
    title: 'Blended Teacher Professional Development for Integrating Scratch Coding in Classrooms in Western Kenya',
    authors: 'Faith Wanja et al.',
    link: 'https://dl.acm.org/doi/10.1145/3769994.3770033',
    venue: 'ACM Digital Library / Educational Technology Research',
    year: '2025/2026'
  }
};

export const POEMS: Poem[] = [
  {
    id: 'p1',
    title: 'The Jar We Carry',
    slug: 'the-jar-we-carry',
    excerpt: 'We pack our mothers’ silence in terracotta jars, burying them in the garden where the rain remembers.',
    stanzas: [
      'We pack our mothers’ silence in terracotta jars,\nburying them deep in clay where the rain remembers.\nWe do not speak of what cracked inside the kiln,\nonly the weight of what survived the carrying.',
      'To hold a jar is to hold a witness:\nterracotta smooth against the calloused thumb,\na vessel built for water, or ashes, or song,\nwaiting for someone brave enough to uncork the dark.',
      'When I speak into the hollow mouth of the jar,\nthe sound comes back rewritten—\nno longer a whimpering prayer,\nbut a thunder that knows its name.'
    ],
    year: '2024',
    tags: ['Excavation', 'Memory', 'Motherhood', 'One-Jar Philosophy'],
    featured: true,
    context: 'Written during the Nairobi Spoken Word residency in late 2024. "The Jar We Carry" explores ancestral memory as a physical vessel—how silence, when stored long enough, ferments into spoken word.',
    youtubeId: 'dQw4w9WgXcQ', // example placeholder ID for video modal
    relatedWritingSlug: 'excavating-the-maternal-archive',
    relatedGalleryIds: ['g1', 'g3'],
    readTimeMinutes: 3
  },
  {
    id: 'p2',
    title: 'Anatomy of a Spoken Witness',
    slug: 'anatomy-of-a-spoken-witness',
    excerpt: 'The stage is not a throne; it is an excavation site. You bring a shovel disguised as a microphone.',
    stanzas: [
      'The stage is not a throne; it is an excavation site.\nYou bring a shovel disguised as a microphone,\ntapping against the bedrock of the room\nuntil everyone’s heart breaks in the exact same cadence.',
      'There is no lie that survives forty seconds of rhythm.\nThe lungs know when they are breathing second-hand dust;\nthe tongue refuses to bow to artificial light.',
      'When the light dims, you leave your echo on the wooden floor.\nLet them sweep it up tomorrow,\nor let them carry a piece home in their pocket.'
    ],
    year: '2025',
    tags: ['Spoken Word', 'Performance', 'Witness', 'Identity'],
    featured: true,
    context: 'First performed live at the African Writers Festival opening night. It reflects on the visceral responsibility of standing before an audience as a truth-teller.',
    youtubeId: 'L_LUpnjgPso',
    relatedWritingSlug: 'the-ethics-of-stage-vulnerability',
    relatedGalleryIds: ['g2'],
    readTimeMinutes: 2
  },
  {
    id: 'p3',
    title: 'Salt & Terracotta',
    slug: 'salt-and-terracotta',
    excerpt: 'Preserving grief requires a cold room and a patient hand. We season our memories with coarse salt.',
    stanzas: [
      'Preserving grief requires a cold room and a patient hand.\nWe season our memories with coarse sea salt,\nturning each grief over like a curing stone\nuntil it shines with an ancient, stubborn polish.',
      'Do not throw away the jar simply because it chipped.\nThe crack is where the light learns to whisper,\nwhere the scent of clove and old parchment escapes\nto remind you that you are still breathing.'
    ],
    year: '2023',
    tags: ['Grief', 'Memory', 'Excavation'],
    featured: true,
    context: 'Part of the early "One-Jar" suite written in Mombasa. Inspired by traditional coastal food preservation techniques and emotional endurance.',
    readTimeMinutes: 2
  },
  {
    id: 'p4',
    title: 'Nairobi Rain & Telegraph Wires',
    slug: 'nairobi-rain-and-telegraph-wires',
    excerpt: 'The city hums in E-minor whenever the October rains strike the copper roofs of Ngara.',
    stanzas: [
      'The city hums in E-minor whenever the October rains\nstrike the copper roofs of Ngara.\nUnder the dripping eaves, three elders share a single cigarette,\ntheir smoke tangling with electricity.',
      'We write poetry in the margins of matatu receipts,\nwhere speed is a dialect and patience is a luxury\nwe trade for a seat near the window.'
    ],
    year: '2024',
    tags: ['Nairobi', 'Urban Poetry', 'Storytelling'],
    featured: false,
    context: 'A tribute to the vibrant, rhythmic pulse of Nairobi street life and the impromptu literature created in transit.',
    readTimeMinutes: 2
  }
];

export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@one_jar_poetry';
export const YOUTUBE_CHANNEL_HANDLE = '@one_jar_poetry';

export const VIDEOS: VideoItem[] = [
  {
    id: 'ojp-v1',
    title: 'The Jar We Carry — Spoken Word Performance',
    event: 'One Jar Poetry Official Channel',
    date: '2025',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '04:12',
    thumbnailUrl: '/images/wanja_bw_stage.jpg',
    description: 'Headline spoken word performance of "The Jar We Carry" from the official @one_jar_poetry YouTube channel. Fusing acoustic kora, ambient soundscapes, and oral memory excavation.',
    transcript: 'We pack our mothers’ silence in terracotta jars... [Full spoken word performance from @one_jar_poetry].',
    category: 'spoken_word',
    poemSlug: 'the-jar-we-carry',
    status: 'published'
  },
  {
    id: 'ojp-v2',
    title: 'Unsealing the Silence — Live at Kenya National Theatre',
    event: 'One Jar Poetry Solos Showcase',
    date: '2024',
    youtubeId: 'L_LUpnjgPso',
    duration: '06:45',
    thumbnailUrl: '/images/wanja_blue_stage.jpg',
    description: 'Live spoken-word recital exploring silent ancestral archives and container metaphors, featured on @one_jar_poetry.',
    category: 'spoken_word',
    poemSlug: 'anatomy-of-a-spoken-witness',
    status: 'published'
  },
  {
    id: 'ojp-v3',
    title: 'Poetry as Excavation — Studio Reflection & Reading',
    event: 'One Jar Poetry Studio Sessions',
    date: '2025',
    youtubeId: '3JZ_D3ELwOQ',
    duration: '08:30',
    thumbnailUrl: '/images/wanja_headshot.jpg',
    description: 'An intimate studio session on the @one_jar_poetry channel where Wanja breaks down the philosophy of poetry as memory excavation.',
    category: 'reflection',
    status: 'published'
  },
  {
    id: 'ojp-v4',
    title: 'Salt & Terracotta — Coastal Sunset Recital',
    event: 'One Jar Poetry Outdoor Recital',
    date: '2024',
    youtubeId: '2g811Eo7K8U',
    duration: '03:50',
    thumbnailUrl: '/images/wanja_navy_stage.jpg',
    description: 'A coastal recital of "Salt & Terracotta" unsealed from the @one_jar_poetry archive.',
    category: 'reading',
    poemSlug: 'salt-and-terracotta',
    status: 'published'
  },
  {
    id: 'ojp-v5',
    title: 'Spoken Word & Social Memory — Keynote & Recital',
    event: 'Pan-African Writers Congress',
    date: '2024',
    youtubeId: 'fJ9rUzIMcZQ',
    duration: '18:45',
    thumbnailUrl: '/images/wanja_bw_stage.jpg',
    description: 'Keynote presentation on oral archives and poetry containers, recorded live for One Jar Poetry (@one_jar_poetry).',
    category: 'keynote',
    status: 'published'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'a1',
    type: 'blog',
    title: 'Excavating the Maternal Archive: Why We Store Stories in Jars',
    slug: 'excavating-the-maternal-archive',
    date: 'January 14, 2025',
    readTime: '6 min read',
    excerpt: 'Exploring how oral storytelling in East Africa preserves intergenerational memory through metaphorical containers and unspoken rituals.',
    content: [
      'In many traditional households, the jar is never just a kitchen vessel. It is an vault. It holds fermenting grains, salted lemons, honey gathered after rain, and the unwritten grievances of generations.',
      'When I established the *One-Jar Poetry* paradigm, I wanted to treat every poem as a sealed jar buried beneath the surface of everyday speech. Writing poetry is not about inventing pretty metaphors; it is an excavation process.',
      'When we unseal a poem written ten years ago, or a poem handed down through oral performance, we are breathing in the preserved atmosphere of that exact emotional moment. This is why spoken word carries such physical weight.'
    ],
    tags: ['Philosophy', 'Oral History', 'One-Jar', 'Motherhood'],
    relatedPoemSlug: 'the-jar-we-carry'
  },
  {
    id: 'a2',
    type: 'blog',
    title: 'The Ethics of Stage Vulnerability: What Does a Poet Owe the Room?',
    slug: 'the-ethics-of-stage-vulnerability',
    date: 'December 02, 2024',
    readTime: '8 min read',
    excerpt: 'A deep dive into the boundary between authentic emotional witness and performance trauma on the modern spoken-word stage.',
    content: [
      'There is an unwritten contract between the poet at the microphone and the audience sitting in the dark. Too often, young performers are taught that emotional bloodshed is equivalent to art.',
      'Vulnerability on stage must be intentional, not performative. As storytellers, our duty is to offer a container (the jar) that holds the emotion safely, rather than spilling raw, unmediated trauma across the front row.',
      'When done right, a spoken word performance leaves both the performer and the listener feeling restored, witnessed, and grounded.'
    ],
    tags: ['Performance', 'Poetics', 'Craft', 'Ethics'],
    relatedPoemSlug: 'anatomy-of-a-spoken-witness'
  },
  {
    id: 'a3',
    type: 'review',
    title: 'Review: "The Tradition" by Jericho Brown — Crafting the Duplex Form',
    slug: 'review-the-tradition-jericho-brown',
    date: 'November 20, 2024',
    readTime: '5 min read',
    excerpt: 'An analysis of Jericho Brown’s Pulitzer-winning collection, examining how form becomes a vessel for surviving violence and celebrating tenderness.',
    content: [
      'Jericho Brown’s invention of the "duplex" form—combining the sonnet, the ghazal, and the blues—is one of the most exciting formal innovations in modern poetry.',
      'In *The Tradition*, form is not an academic exercise; it is an armor. Brown repeats lines with subtle variations that feel like a heartbeat skipping under pressure.',
      'For readers interested in how poetry holds complex sociopolitical weight while maintaining acoustic perfection, this collection is essential reading.'
    ],
    tags: ['Book Review', 'Poetry', 'Formal Poetry', 'Jericho Brown'],
    itemReviewed: 'The Tradition by Jericho Brown',
    reviewSubjectType: 'Poetry Collection',
    rating: 5,
    quoteHighlight: 'Form is not an academic constraint; it is the armor that allows the poet to stand inside the fire.'
  },
  {
    id: 'a4',
    type: 'review',
    title: 'Review: "Dust" by Yvonne Adhiambo Owuor — Memory as Landscape',
    slug: 'review-dust-yvonne-owuor',
    date: 'October 10, 2024',
    readTime: '7 min read',
    excerpt: 'Examining Owuor’s majestic novel through the lens of silence, national memory, and poetic prose in post-colonial Kenya.',
    content: [
      'Yvonne Adhiambo Owuor writes prose that moves with the density and cadence of epic poetry. In *Dust*, silence is as much a character as Wuoth Ogik or Ajany.',
      'Owuor captures Kenya’s unhealed historical wounds with an unflinching eye. Every sentence feels carved out of red earth and dry wind.',
      'A masterpiece of East African literature that every storyteller and poet should study for its atmospheric mastery.'
    ],
    tags: ['Book Review', 'African Literature', 'Kenya', 'Prose'],
    itemReviewed: 'Dust by Yvonne Adhiambo Owuor',
    reviewSubjectType: 'Book',
    rating: 5,
    quoteHighlight: 'Owuor writes prose that moves with the density and acoustic weight of epic poetry.'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach1',
    year: '2025',
    title: 'East African Spoken Word Fellow',
    organization: 'African Creative Arts Initiative',
    category: 'Award',
    description: 'Awarded fellowship for excellence in oral archive preservation and contemporary spoken word performance.',
    highlight: true
  },
  {
    id: 'ach2',
    year: '2024',
    title: 'Headline Performer — Kenya National Theatre Showcase',
    organization: 'Kenya Cultural Centre',
    category: 'Performance',
    description: 'Sold-out solo poetry performance featuring "One-Jar Poetry" backed by live traditional instruments.',
    highlight: true
  },
  {
    id: 'ach3',
    year: '2024',
    title: 'Nominee — Pan-African Poetry Prize',
    organization: 'African Writers Network',
    category: 'Nomination',
    description: 'Shortlisted in the performance poetry & audio archive category for "The Jar We Carry".',
    highlight: true
  },
  {
    id: 'ach4',
    year: '2023',
    title: 'Keynote Speaker & Poet-in-Residence',
    organization: 'Coast Literary Residency, Mombasa',
    category: 'Keynote',
    description: 'Led workshops on memory excavation and poetry as community witness for 60+ emerging writers.',
    highlight: false
  },
  {
    id: 'ach5',
    year: '2023',
    title: 'Published Suite — "Terracotta Chronicles"',
    organization: 'Kwani Literary Journal',
    category: 'Publication',
    description: 'Featured suite of five poems exploring urban memory, domestic containers, and oral history.',
    highlight: false
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Poets You Should Know (PYSK) Women Slam',
    caption: 'Faith Wanja performing live during the PYSK Women Slam.',
    category: 'Performance',
    imageUrl: '/images/wanja_bw_stage.jpg',
    date: 'December 2025',
    location: 'Nairobi, Kenya'
  },
  {
    id: 'g2',
    title: 'Kitale Film Week Soft Launch & Opening Recital',
    caption: 'Faith Wanja delivering an opening recital at Baraza Media Lab / Kitale Film Week.',
    category: 'Performance',
    imageUrl: '/images/wanja_blue_stage.jpg',
    date: 'February 2026',
    location: 'Nairobi & Kitale, Kenya'
  },
  {
    id: 'g3',
    title: 'Official Headshot — Faith Wanja',
    caption: 'Official portrait for One-Jar Poetry & Wanja Writes.',
    category: 'Portrait',
    imageUrl: '/images/wanja_headshot.jpg',
    date: '2025',
    location: 'Nairobi, Kenya'
  },
  {
    id: 'g4',
    title: 'Poetry Slam Africa Grand Slam',
    caption: 'Stage performance during the Poetry Slam Africa Grand Slam competition.',
    category: 'Performance',
    imageUrl: '/images/wanja_navy_stage.jpg',
    date: 'January 2026',
    location: 'Nairobi, Kenya'
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Communications Consulting & Strategic Narratives',
    tagline: 'Designing strategic content, newsletters, reports, and digital campaigns for education & NGO initiatives.',
    description: 'Faith Wanja translates complex community development, educational, and social impact initiatives into human-centred narratives. Portfolio includes EduTab Africa, Watoto Watch Network, and Wanja Writes.',
    targetAudience: 'NGOs, Educational Networks, Social Impact Initiatives',
    deliverables: [
      'Strategic Newsletters & Executive Updates',
      'Event & Social Impact Reports (Safer Internet Day, World Read Aloud Day)',
      'Website Architecture & Narrative Content Strategy',
      'Social Media Content Management (LinkedIn, TikTok, Instagram, Facebook)'
    ],
    iconName: 'PenTool',
    typicalLeadTime: '1 - 3 weeks'
  },
  {
    id: 's2',
    title: 'Spoken Word Performances & Keynotes',
    tagline: 'Commanding live recitals on womanhood, generational healing, identity, and social justice.',
    description: 'Bring the raw, emotionally honest power of One-Jar Poetry to your stage. Faith Wanja delivers unforgettable recitals that interrogate silence and celebrate resilience.',
    targetAudience: 'Literary Festivals, Slams, Film Weeks, Cultural Galas, NGO Forums',
    deliverables: [
      '15–45 minute live poetry performance set',
      'Spoken word recitals (e.g. "When I Die", "Dear HR", "The Jar We Carry")',
      'Panel keynotes on oral archives and social memory'
    ],
    iconName: 'Mic',
    typicalLeadTime: '1 - 2 weeks'
  },
  {
    id: 's3',
    title: 'Culture Writing & Literary Scene Reviews',
    tagline: 'Documenting East Africa’s literary and poetry movement through incisive reviews and essays.',
    description: 'Faith Wanja writes event reviews, poetry slam coverage, and cultural profiles for the creative scene in Kenya.',
    targetAudience: 'Cultural Journals, Publications, Creative Arts Networks',
    deliverables: [
      'In-depth event review / cultural essay',
      'Artist profiles & poetry slam dispatches',
      'Published on WanjaWrites.africa & partner platforms'
    ],
    iconName: 'BookOpen',
    typicalLeadTime: '1 - 2 weeks'
  },
  {
    id: 's4',
    title: 'Webinars & Creative Writing Masterclasses',
    tagline: 'Planning and executing educational webinars, poetry masterclasses, and memory excavation sessions.',
    description: 'Facilitating interactive writing workshops and planning educational webinars for youth, educators, and social impact organizations.',
    targetAudience: 'Schools, Universities, Writing Collectives, NGO Teams',
    deliverables: [
      'Webinar conceptualization and execution support',
      'Interactive One-Jar writing exercises & workbooks',
      'Live feedback & spoken word coaching'
    ],
    iconName: 'Sparkles',
    typicalLeadTime: '2 weeks'
  }
];

export const SAMPLE_LETTERS: NewsletterLetter[] = [
  {
    id: 'l1',
    issueNumber: 2026,
    title: 'EduTab Africa Newsletter Jan 2026',
    date: 'January 2026',
    excerpt: 'Strategic updates on digital education, Scratch coding integration in Western Kenya classrooms, and teacher TPD.',
    previewText: 'Written and edited by Faith Wanja for EduTab Africa. Highlighting blended teacher professional development and classroom impact...'
  },
  {
    id: 'l2',
    issueNumber: 2025,
    title: 'Wanja Writes Newsletter 2025: Unsealing the Jar',
    date: '2025',
    excerpt: 'Reflections from stage wings, open mics at Rafinki & Mizani, and why we refuse to conceal discomfort in our art.',
    previewText: 'Dear Reader,\n\nWhen rain falls on terracotta, the smell is of earth remembering. In this issue of Wanja Writes, I share notes from the slam stage...'
  }
];

export const EPK_DATA = {
  shortBio: 'Faith Wanja (One-Jar Poetry) is a Kenyan poet, cultural documentarian, and communications consultant whose work centres on womanhood, generational healing, identity, and social justice. "My name is Wanja. I fill spaces with poems ONE JAR at a time."',
  mediumBio: 'Faith Wanja (One-Jar Poetry) is a Kenyan poet, cultural documentarian, and communications consultant. Immersed in the poetry scene in 2024, she features across open mics, competitive slams, and festivals including Rafinki, Nuetry, Mizani, Poets You Should Know (PYSK), Poetry Slam Africa Grand Slam, and Kitale Film Week 2026. Her poetry is marked by emotional honesty and a refusal to conceal discomfort. Driven by the question: "Who keeps the record of our becoming?"',
  fullBio: 'Faith Wanja (One-Jar Poetry) is a renowned Kenyan poet, cultural documentarian, and communications consultant with a background in Community Development. Operating under WanjaWrites and her signature performance brand One-Jar Poetry, Faith crafts deeply moving spoken word recitals that interrogate silence, inherited trauma, resilience, and freedom.\n\nHer work spans strategic communications for education and NGO initiatives (EduTab Africa, Watoto Watch Network), culture writing for Kenya’s literary scene, and co-authoring academic research in the ACM Digital Library. Selected features include Poetry Slam Africa Grand Slam, PYSK Women Slam, Mizani Slam, and Kitale Film Week 2026 Opening Night.',
  techRider: [
    '1x Wireless microphone (Shure SM58 or equivalent)',
    '1x Straight microphone stand with heavy round base',
    'Stage lighting: Warm amber spotlight on central performance zone',
    'Clean vocal monitor wedge / IEM feed',
    '3.5mm/XLR line input for ambient soundscape / acoustic accompaniment'
  ],
  pressQuotes: [
    {
      quote: "Faith Wanja brings an extraordinary emotional honesty to the stage. One-Jar Poetry interrogates silence with absolute bravery.",
      source: 'Poetry Slam Africa'
    },
    {
      quote: "Her performance at Kitale Film Week left the room suspended in silence. A true record-keeper of our becoming.",
      source: 'Kitale Film Week Cultural Dispatch'
    }
  ]
};
