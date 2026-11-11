import { Poem, VideoItem, Article, Achievement, GalleryItem, Service, NewsletterLetter } from '../types';

export const WANJA_PROFILE = {
  fullName: 'Faith Wanja',
  artistName: 'One-Jar Poetry',
  title: 'Kenyan Poet | Culture Writer | Communications Consultant | Filmmaker',
  email: 'wanjawrites05@gmail.com',
  phone: '+254798217463',
  website: 'https://wanjawrites.africa/',
  linkedin: 'https://www.linkedin.com/in/faith-wanja-730650228/',
  youtube: 'https://www.youtube.com/@one_jar_poetry',
  tiktok: 'https://www.tiktok.com/@one_jar_poetry',
  instagram: 'https://www.instagram.com/one_jar_poetry/',
  facebook: 'https://www.facebook.com/people/One-Jar-Poetry/61573983713068/',
  whatsappChannel: 'https://whatsapp.com/channel/one_jar_poetry',
  tagline: 'Wanja Writes is the creative practice of a Kenyan poet, culture writer, communications consultant, and filmmaker.',
  coreQuestion: 'Who keeps the record of our becoming?',
  headshotUrl: '/images/bio-wanja.jpg',
  heroBgUrl: '/images/hero-wanja.jpg',
  milestoneImgUrl: '/images/milestone-are-you-home.jpg',
  filmPosterUrl: '/images/film-job-hunt.jpg',
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
    id: 'p-find-a-woman',
    title: 'Find A Woman',
    slug: 'find-a-woman',
    excerpt: 'If you get lost, find a woman. Her energy is an asylum you can abide in before you find your way home.',
    stanzas: [
      `If you get lost,
Find a woman

Her energy is an asylum you can abide in
Before you find your way home.

She will hug your fear of abandonment,
And her chest will curve in for you in the same way your mother does`,

      `If you get lost,
Find a woman

Tell her you are trying to find your mother
And watch her maternal instinct take over your little disaster
“Are you cold?”
She’ll ask.
“Have you eaten?”
She’ll add.
“Don’t be afraid”
She’ll assure.

Run to her because a woman
Knows how to be a mother
Whether with or without a child
She inherited parentification while her brothers got land
Trust me, you’ll be safe with her.`,

      `If you get lost,
Find a woman.

Tell her the journey of life has been difficult
Let her learn the circles you’ve been running in.
Rest in her arms as peacefully as a breastfeeding child
Cling to her robe like a toddler
And watch her
Heal the inner child you’ve been seeking to tend to.

If you get lost,
Find a woman

Tell her you’ve lost your purpose
Seek the guidance of she who purposefully grows life in her
She who senses a child’s agony from miles away
Sit with her
Speak to her.
Listen to her.
Let her pour nutrients of reidentification into you
Like she fed the babies in her womb.`,

      `If you get lost,
Find a woman

She comes from a lineage of Matriarchs
And in this lineage,
Abundance flows
Healing flows
Ease flows
Clarity flows
It feels like home

If you ever get lost,
Find a woman.`
    ],
    year: '2026',
    tags: ['Womanhood', 'Healing', 'Matriarchy', 'One-Jar'],
    featured: true,
    context: 'A signature piece from the "Are You Home?" solo show. Explores the maternal sanctuary inherited by women across generations and the asylum found in feminine care.',
    readTimeMinutes: 3
  },
  {
    id: 'p-when-i-die',
    title: 'When I Die',
    slug: 'when-i-die',
    excerpt: 'When I die, bury me next to my father. Return the little girl in me to his presence—3 feet apart to be precise.',
    stanzas: [
      `When I die,
bury me next to my father.
Return the little girl in me to his presence
3 feet apart to be precise.
Let me lie facing him,
so I can rant about what the world above has become.
I will soak the ground between us
with the sorrow of my dead innocence,
telling him how Kinuthia lured me with a sweet.
And I will ask him between sobs,
“Why didn’t you teach me that sometimes sweets have bitter endings?”`,

      `I will continue unclothing my vulnerability,
welcoming my father further into the aches
of the girl he left behind.
I will hold his skeletons and say,
“I have kept thousands of these in my closet.
Nobody noticed that Uncle Jack touched me for years.”
If he begins to shift in discomfort,
I will ask him to buckle up
for this is only the beginning
of the things sons of Gikuyu
have been comfortably doing
in his absence.`,

      `I will wipe a tear threatening
to interrupt my rant,
break the wall between our ghosts
and say to him,
“My sisters and I are no longer safe.
In the name of resilience
We walk around dropping decaying pieces of these dilapidated structures
We call self dad.
We are getting attacked from all directions
To the East is Femicide,
a lake that feeds on our blood.
To the West is Sexual Violence,
a cult that dines on our flesh.
To the West are wars declared on our bodies
There are men invading land they are not welcomed in.
To the North are fists
forever stretching to meet our skin.
To the North are glass ceilings placed there by insecure men
Whose masculinity feels threatened by feminine energy.

To the South is ignorance,
a generation still pointing fingers
at its victims.”
To the South is black tax and societal expectations pulling us down

Finally, I will lie in silence,
swallowing the bitter pill of my defeat
hoping my father will comfort me now,
to make up for all the years
I could not run home
into his safe arms.`
    ],
    year: '2025',
    tags: ['Content Note: Sexual Abuse', 'Social Justice', 'Femicide', 'Grief', 'Vulnerability'],
    featured: true,
    context: 'Content note: sexual abuse. An unsparing examination of gender-based violence, femicide in Kenya, and the loss of childhood protection. Performed at Poetry Slam Africa and the "Are You Home?" show.',
    readTimeMinutes: 4
  },
  {
    id: 'p-war',
    title: 'War',
    slug: 'war',
    excerpt: 'There are things you experience and pray never to witness repeating themselves. They came at night... blazes lit up our village.',
    stanzas: [
      `There are things you experience
And pray never to witness
Repeating themselves

They came at night
Not many houses had electricity
But there was light everywhere
Blazes lit up our village

I locked eyes with a 16-year old boy
I thought he understood
That I was a child
Worth protecting.

But he came to me smiling
Ready to declare
A war on a 7-year old body.
I was yet to understand
The geography of this flesh
I didn’t know which borders
I needed to guard with my life`,

      `So he had his way
And so did the rest
One reached for my neck
Another navigated below my belly
And another held my hands down
I still wonder
What strength they expected
A 7 year old to have against them.

From the corner of our compound
I heard faint screams
More violence was raining
On the man I believed
Knew no defeat
They grilled my mother’s face
Forcing my father to watch it
He witnessed his masculinity
Being sliced with every finger
They chopped off my mother
Which man survives that
And manages to force their heart
To keep beating?`,

      `At seventeen,
I made a friend
Out of my therapist’s couch
Apparently I needed
To master the language of letting go

But how do you let go
When every time you open the TV
It invites you to relive trauma
You hear a politician say,
“Yule mkabila.”
And your scars begin to bleed again
You hear another say,
“hatutaki madoadoa.”
And your stitches cannot contain
The pain they remember`,

      `At twenty seven
I hear he’s married now
Happily, with three children
Two boys, one girl
And I’m expected to
Surrender my armour
And swear fealty
To the shackles of matrimony
To find pleasure
In an invasion
In an act of terror
Where pirates invaded my shores
And sailed away with my treasure
How do I explain the scar
Running a half marathon across my belly
How do I explain surrender to the stitches
That held my insides in

How do you introduce more sutures on a body
That has been held together by a mother’s prayers
And antidepressants
To bring forth a life
To be cradled by the hands of time
That has been known to wound.
To molest and displace Palestinian children
Who have become victims
Of a war they are yet to understand
I cry for them
I mourn the version of myself
I see in their eyes
The child who deserved protection
But was served violence instead`,

      `There’s no amount of therapy
That erases this kind of anger
There is no amount of therapy
That can make this agony disappear
No amount of rebuilding
Can replace lost faith
How do you rebuild a church
On the same ground
Where people were burned
And expect us to forget?

If I visit that church,
I don’t expect to hear
The voice of God
I will hear my mother’s cry
My father’s pain
And the child in me
Reliving her own

The scars I carry
Are a remembrance
Of the war I keep fighting
To forget the violence
I survived
Another seven
Is coming next year
Five years after the last two
The memories of 2007
Calling from the distant past
For us to congregate
Around the fire of tribalism
And warm ourselves with its flames.`
    ],
    year: '2026',
    tags: ['Content Note: Violence', '2007 Memory', 'Political Violence', 'Survival', 'Witness'],
    featured: true,
    context: 'Content note: sexual, ethnic, and political violence. Interrogating post-election violence in Kenya, historical trauma, collective memory, and the enduring scars carried by survivor bodies.',
    readTimeMinutes: 5
  },
  {
    id: 'p1',
    title: 'The Jar We Carry',
    slug: 'the-jar-we-carry',
    excerpt: 'We pack our mothers’ silence in terracotta jars, burying them in the garden where the rain remembers.',
    stanzas: [
      `We pack our mothers’ silence in terracotta jars,
burying them deep in clay where the rain remembers.
We do not speak of what cracked inside the kiln,
only the weight of what survived the carrying.`,
      `To hold a jar is to hold a witness:
terracotta smooth against the calloused thumb,
a vessel built for water, or ashes, or song,
waiting for someone brave enough to uncork the dark.`,
      `When I speak into the hollow mouth of the jar,
the sound comes back rewritten—
no longer a whimpering prayer,
but a thunder that knows its name.`
    ],
    year: '2024',
    tags: ['Excavation', 'Memory', 'Motherhood', 'One-Jar Philosophy'],
    featured: true,
    context: 'Written during the Nairobi Spoken Word residency in late 2024. "The Jar We Carry" explores ancestral memory as a physical vessel—how silence, when stored long enough, ferments into spoken word.',
    youtubeId: 'dQw4w9WgXcQ',
    readTimeMinutes: 3
  },
  {
    id: 'p2',
    title: 'Anatomy of a Spoken Witness',
    slug: 'anatomy-of-a-spoken-witness',
    excerpt: 'The stage is not a throne; it is an excavation site. You bring a shovel disguised as a microphone.',
    stanzas: [
      `The stage is not a throne; it is an excavation site.
You bring a shovel disguised as a microphone,
tapping against the bedrock of the room
until everyone’s heart breaks in the exact same cadence.`,
      `There is no lie that survives forty seconds of rhythm.
The lungs know when they are breathing second-hand dust;
the tongue refuses to bow to artificial light.`,
      `When the light dims, you leave your echo on the wooden floor.
Let them sweep it up tomorrow,
or let them carry a piece home in their pocket.`
    ],
    year: '2025',
    tags: ['Spoken Word', 'Performance', 'Witness', 'Identity'],
    featured: true,
    context: 'First performed live at the African Writers Festival opening night. It reflects on the visceral responsibility of standing before an audience as a truth-teller.',
    youtubeId: 'L_LUpnjgPso',
    readTimeMinutes: 2
  },
  {
    id: 'p3',
    title: 'Salt & Terracotta',
    slug: 'salt-and-terracotta',
    excerpt: 'Preserving grief requires a cold room and a patient hand. We season our memories with coarse salt.',
    stanzas: [
      `Preserving grief requires a cold room and a patient hand.
We season our memories with coarse sea salt,
turning each grief over like a curing stone
until it shines with an ancient, stubborn polish.`,
      `Do not throw away the jar simply because it chipped.
The crack is where the light learns to whisper,
where the scent of clove and old parchment escapes
to remind you that you are still breathing.`
    ],
    year: '2023',
    tags: ['Grief', 'Memory', 'Excavation'],
    featured: false,
    context: 'Part of the early "One-Jar" suite written in Mombasa. Inspired by traditional coastal food preservation techniques and emotional endurance.',
    readTimeMinutes: 2
  }
];

export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@one_jar_poetry';
export const YOUTUBE_CHANNEL_HANDLE = '@one_jar_poetry';

export const VIDEOS: VideoItem[] = [
  {
    id: 'job-hunt-film',
    title: 'Job Hunt — Short Film Showcase',
    event: 'The Four Frames Production',
    date: '2026',
    youtubeId: 'dQw4w9WgXcQ',
    duration: 'Coming Soon',
    thumbnailUrl: '/images/film-job-hunt.jpg',
    description: 'Job Hunt, a short film written by Faith Wanja and produced by The Four Frames. A quiet collapse exploring youth, unemployment, dignity, and urban perseverance in Nairobi. Coming to your screens soon.',
    category: 'reading',
    status: 'published'
  },
  {
    id: 'ojp-v1',
    title: 'The Jar We Carry — Spoken Word Performance',
    event: 'One Jar Poetry Official Channel',
    date: '2025',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '04:12',
    thumbnailUrl: '/images/gal-8-bw-performance.jpg',
    description: 'Headline spoken word performance of "The Jar We Carry" from the official @one_jar_poetry YouTube channel. Fusing acoustic accompaniment and oral memory excavation.',
    transcript: 'We pack our mothers’ silence in terracotta jars... [Full spoken word performance from @one_jar_poetry].',
    category: 'spoken_word',
    poemSlug: 'the-jar-we-carry',
    status: 'published'
  },
  {
    id: 'ojp-v2',
    title: 'Are You Home? — Live Show Highlights',
    event: 'Suave Kitchen and Social Club, Nairobi',
    date: '17 October 2026',
    youtubeId: 'L_LUpnjgPso',
    duration: '06:45',
    thumbnailUrl: '/images/milestone-are-you-home.jpg',
    description: 'Highlights from the sold-out solo show “Are You Home?” at Suave Kitchen and Social Club. 50 audience members, 15 poems performed with live collaborators.',
    category: 'spoken_word',
    poemSlug: 'find-a-woman',
    status: 'published'
  },
  {
    id: 'ojp-v3',
    title: 'Poetry with Live Guitar — Storytellers Film Lab Premiere',
    event: 'Storytellers Film Lab Red Carpet',
    date: '2026',
    youtubeId: '3JZ_D3ELwOQ',
    duration: '05:30',
    thumbnailUrl: '/images/gal-4-red-carpet.jpg',
    description: 'Live poetry performance with live acoustic guitar accompaniment at the Storytellers Film Lab red carpet premiere in Nairobi.',
    category: 'spoken_word',
    status: 'published'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'j-took-my-l',
    type: 'blog',
    title: 'I Took My L, not So Proudly: Poetry Slam Africa Grand Slam 2026',
    slug: 'i-took-my-l-not-so-proudly',
    date: '2026',
    readTime: '7 min read',
    excerpt: 'Of all the things that could break me, I never thought that my passion would be one of them.',
    content: [
      '> “If things don’t go your way, I hope you won’t take it personally.”',
      'A friend of mine had said to me.',
      'Of all the things that could break me, I never thought that my passion would be one of them. Never in my wildest dreams did I think that something that has carried me through so many storms would render me strengthless for an entire week.',
      'As I reflect on those words today, I lack proper grounds to express the embarrassment I felt in front of hundreds of people earlier this year.',
      'How did I get there? You may be wondering. I was among the 11 poets on Poetry Slam Africa’s Grand Slam Stage 2026. It had taken me a year of elimination rounds, lessons, countless drafts and thorough preparation to be there. I dedicated my entire 2025 to this. God, I did.',
      'I showed up equipped with 3 poems, House, Envy, and BBL, which I had prepared to perform in that order. I had shared the poems with my best friend, and she had approved of the order. I feel it would be right for me to mention at this point that at least 12 of my friends had confirmed their presence for the competition. Something about this gave me the urgent need to prove and outperform myself on this particular stage.',
      'I felt obligated to impress my friends more than I needed to impress the judges, ironic, because judges were the ones I needed to give a show to. My friends had travelled from as far as Kitale and Mombasa! There was no way I was going to waste their money, energy and time by giving a poor show.',
      'It’s safe to say the devil had placed a multi-bet on me that night. It started well. All 11 poets were introduced to the audience, and the struggle and petition for the 67th champion crown began. I don’t fully remember the number of poets that went before me, but I recall listening to Ogoti’s performance from beginning to end. Soon enough, I was called to the stage. As I walked to that mic, my prayers must have failed me because I felt my spirit detach from that stage. Instead of following my previously agreed order, I decided to perform ‘Envy’ first. Wrong move!',
      'I scanned the audience for my best friend’s face, and I could read the disappointment on her face. Somewhere along my performance, I lost my momentum. But I am not the kind to abandon projects halfway, I completed the piece and left the stage.',
      'This performance earned me a 6.5 and an early elimination from the competition. I remember begging the stage to cave in and bury me. It didn’t oblige. There, I stood, with my nakedness exposed under the proper lighting of that stage. My own words, my own poetry, my own vulnerability had turned against me. The embarrassment I felt at that moment still feels tattooed on my face.',
      'Rushing to hide in the changing room, I tried to recollect myself. My fear of being a disappointment was a lived reality. I wailed at this realisation. I looked at the woman staring back at me in the mirror, crumpled to her knees, and right there, something inside her died, and she buried it in that changing room.',
      'As if the gods spoke to them, my friends came to dig out the fresh grave. They hugged me, pouring reassurance into my broken dream.',
      '> “You are still a good poet. And we love you. You are still a slammer to us.”',
      'Truth is, they were right. Another truth is, I didn’t feel like it. And I allowed the two to coexist in that moment.',
      'The elimination sent me into a mourning period that reminded me of everything and everyone I have lost before. I remember drinking my sorrows away for the rest of the poetry festival. I remember crying myself to sleep. I remember waking up to cry. I remember calling my friends to hold my crumbling heart. I remember going home to my mother to cry. I remember trying not to cry when my brothers and sister called to reassure me that I was still their talented little sister. I remember putting up a post after that, claiming I would rest my pen. Soon after, I travelled to Kitale in search of some peace. The pain was weighing too heavily on my soul.',
      'When I think about it, it was a bittersweet night. I got to see my friends and acquaintances take the stage bravely. I saw a common love among us, for art, for poetry, for the stage, for the culture. I was genuinely happy for Timelines. He fought to take that title. However, ignoring the ache I felt would be an injustice to the little dreamer in me that dared to be on that stage with him.',
      'My mental state was shaken by that competition. My emotional foundation cracked, I won’t lie. My love for the stage was tested to the core. But I am born of resilience, and my mother has warned me of being a quitter. Writing this is a testament that I took my L, not so proudly, but I will live to try another day.'
    ],
    tags: ['Personal', 'Poetry Slam Africa', 'Stage', 'Resilience']
  },
  {
    id: 'j-beyond-the-borders',
    type: 'blog',
    title: 'Beyond The Borders: The Power of Poetic Exchange in Africa',
    slug: 'beyond-the-borders',
    date: '2026',
    readTime: '8 min read',
    excerpt: 'What happens when poets cross borders carrying not just poems, but also their histories, languages, and lived experiences?',
    content: [
      'What happens when poets cross borders carrying not just poems, but also their histories, performance styles, languages, and lived experiences? Across Africa, poetry is increasingly becoming a bridge for cultural exchange, artistic growth, and community building. Through inter-country and inter-continental collaborations, poets are trading more than metaphors; they are exchanging knowledge, skills, creative practices, and new ways of understanding both poetry and the world around them.',
      'Over the past several months, the continent has witnessed poets travelling beyond their home countries to share their craft with new audiences. These movements may seem simple on the surface, but they quietly contribute to shaping a stronger and more connected African poetry ecosystem.',
      'In March, Kenya’s seasoned poet Gufy, the 43rd Poetry Slam Africa Grand Slam Champion, travelled to South Sudan for an Open Mic feature and workshop session. Simultaneously, South Africa’s World Poetry Slam Champion 2022, Xabiso Vili, arrived in Kenya in May to share his world-renowned stagecraft. These exchanges raise an important question: what happens to the African poetry scene when poets intentionally move across borders to teach, perform, and learn from one another?',
      '## When Poets Trade Knowledge, We Expand How We View the World',
      'Every region carries its own relationship with poetry. Some communities use it as a tool for activism, others for preservation of language, healing, education, spirituality, or entertainment. Even performance styles differ across borders, from pacing and vocal projection to audience interaction and storytelling techniques.',
      'When poets encounter these differences firsthand, they begin to understand that there is no singular way to perform or experience poetry. Cross-country collaborations expose artists to new artistic possibilities, broadening how they think about language, stagecraft, and creative identity. In many ways, these exchanges allow poets to see the world through another artist’s cultural lens.',
      '## To Be a King or Queen Away from Your Kingdom',
      'There is something deeply humbling about performing away from familiar territory. Many creatives grow comfortable within audiences that already understand their references, humour, delivery style, and cultural context. But stepping onto unfamiliar stages tests the true elasticity of one’s craft.',
      'This in turn helps to answer these questions: Can your poetry travel? Can your storytelling resonate beyond your immediate environment? Can your stage presence survive outside your comfort zone?',
      'Cross-border features challenge poets to sharpen their craft in ways local spaces sometimes cannot. They force artists to adapt, evolve, and discover new dimensions of their artistry.',
      '## We Thrive When We Build Cohesive Communities',
      'One of the most beautiful things about these collaborations is how they create moments of collective excellence rather than competition.',
      'If you want to see the power of cohesive communities, look at the lineup in Nairobi last weekend. Xabiso Vili (World Poetry Slam Champion 2022), Slim Shaka (65th PSA Grand Slam Champion), Dominion (66th PSA Champion), Timelines (67th PSA Grand Slam Champion), One-Jar Poetry (PSA Grand Slam 2026 qualifier), and Hum Bubah shared a single stage.',
      'This wasn’t just a show; it was a gathering of lineages. It proved that the African poetry scene thrives through the power of champions who are willing to share their crowns.',
      'Moments like these matter because they allow audiences and emerging poets to witness greatness collectively. They remind the community that African poetry is not isolated within nations; it is interconnected, evolving, and deeply collaborative.',
      '## Seasoned Poets, Workshops, and Emerging Voices',
      'Beyond performances, workshops remain one of the most important outcomes of these artistic exchanges. They create spaces where experienced poets can openly share the lessons, failures, and discoveries that shaped their journeys.',
      'Xabiso Vili’s workshop, in particular, stood out for me as a memorable learning experience. Rather than presenting a rigid formula for success, he encouraged poets to discover what works uniquely for them. He challenged artists not to create from fear, but from experimentation and authenticity.',
      '> “Create your own niche and invite people to it.”',
      'That statement alone reminded us that poetry thrives when poets stop trying to imitate existing models and begin building spaces shaped by their own identities and interests.',
      'At the end of the workshop, I carried one question close,',
      '> “What do you do with your poetry after the stage?”',
      'It was a challenge directed at every poet in the room. Too often, poetry is confined to open mics and competitions, yet the craft has the potential to exist far beyond traditional stages. Poetry can live in classrooms, corporate spaces, podcasts, film, therapy spaces, archives, digital campaigns, museums, and community organising work.',
      'When poets begin blending their craft with other industries and passions, they introduce poetry to audiences who may have never considered themselves poetry consumers. In doing so, the art form expands its reach and relevance.',
      'Having attended Xabiso Vili’s workshop in Nairobi, Kenya and watched highlights from Gufy’s sessions in South Sudan, I couldn’t help but wonder,',
      '> Are emerging poets truly investing in learning more about the craft they claim to love so deeply?',
      '## What Would It Look Like If Systems Favoured These Collaborations?',
      'If more institutions, organisations, and cultural systems intentionally supported cross-border poetry collaborations, the impact could be transformative.',
      'Poets would sharpen their craft through continuous exposure and learning. African poetry would travel more freely across borders. Artists would gain greater opportunities to sustain themselves financially through their work. Most importantly, stronger literary and creative ecosystems would emerge across the continent.',
      'At its core, poetry collaboration is not simply about performance. It is about cultural preservation, artistic exchange, mentorship, economic possibility, and building communities that allow creativity to thrive collectively across Africa.'
    ],
    tags: ['Culture', 'Pan-African Poetry', 'Workshops', 'Artistic Exchange']
  },
  {
    id: 'a1',
    type: 'blog',
    title: 'Excavating the Maternal Archive: Why We Store Stories in Jars',
    slug: 'excavating-the-maternal-archive',
    date: 'January 14, 2025',
    readTime: '6 min read',
    excerpt: 'Exploring how oral storytelling in East Africa preserves intergenerational memory through metaphorical containers and unspoken rituals.',
    content: [
      'In many traditional households, the jar is never just a kitchen vessel. It is a vault. It holds fermenting grains, salted lemons, honey gathered after rain, and the unwritten grievances of generations.',
      'When I established the One-Jar Poetry paradigm, I wanted to treat every poem as a sealed jar buried beneath the surface of everyday speech. Writing poetry is not about inventing pretty metaphors; it is an excavation process.',
      'When we unseal a poem written ten years ago, or a poem handed down through oral performance, we are breathing in the preserved atmosphere of that exact emotional moment. This is why spoken word carries such physical weight.'
    ],
    tags: ['Personal', 'Oral History', 'One-Jar', 'Motherhood']
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-are-you-home',
    year: '2026',
    title: 'Are You Home? — Completed Solo Show',
    organization: 'Suave Kitchen and Social Club, Nairobi (17 October 2026)',
    category: 'Performance',
    description: 'Headline solo poetry show interrogating home, belonging, grief, and return. Performed to 50 audience members with 15 original poems and 2 musical/artistic collaborators.',
    highlight: true
  },
  {
    id: 'ach-pysk-2026',
    year: '2026',
    title: '2026 PYSK Featured Poet',
    organization: 'Poets You Should Know — Katiba Edition 2026',
    category: 'Performance',
    description: 'Featured headline performance poet at the PYSK Katiba Edition celebrating social justice and constitutional consciousness.',
    highlight: true
  },
  {
    id: 'ach-kitale-2026',
    year: '2026',
    title: '2026 Kitale Film Week Featured Poet',
    organization: 'Kitale Film Week Festival',
    category: 'Performance',
    description: 'Official festival poet delivering live opening and thematic spoken word recitals.',
    highlight: true
  },
  {
    id: 'ach1',
    year: '2025',
    title: 'East African Spoken Word Fellow',
    organization: 'African Creative Arts Initiative',
    category: 'Award',
    description: 'Awarded fellowship for excellence in oral archive preservation and contemporary spoken word performance.',
    highlight: true
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    title: 'In the moment, mid-poem',
    caption: 'Faith Wanja mid-stanza, sharing the visceral emotional rhythm of spoken word.',
    category: 'Performance',
    imageUrl: '/images/gal-1-mid-poem.jpg',
    date: '2026',
    location: 'Nairobi, Kenya'
  },
  {
    id: 'g2',
    title: 'Poetry in orange',
    caption: 'Performance in vibrant orange attire commanding the stage.',
    category: 'Performance',
    imageUrl: '/images/gal-2-orange.jpg',
    date: '2026',
    location: 'Nairobi, Kenya'
  },
  {
    id: 'g3',
    title: 'A smile at the mic',
    caption: 'Connection and warmth with the audience during live recital.',
    category: 'Performance',
    imageUrl: '/images/gal-3-mic-smile.jpg',
    date: '2026',
    location: 'Nairobi, Kenya'
  },
  {
    id: 'g4',
    title: 'Storytellers Film Lab Red Carpet Premiere',
    caption: 'Performing at the Storytellers Film Lab red carpet premiere with live guitar accompaniment.',
    category: 'Performance',
    imageUrl: '/images/gal-4-red-carpet.jpg',
    date: '2026',
    location: 'Nairobi, Kenya'
  },
  {
    id: 'g5',
    title: 'Poetry with live guitar',
    caption: 'Interweaving spoken verse with acoustic strings on stage.',
    category: 'Performance',
    imageUrl: '/images/gal-5-live-guitar.jpg',
    date: '2026',
    location: 'Nairobi, Kenya'
  },
  {
    id: 'g6',
    title: 'Sky blue on stage',
    caption: 'Performing under the theatre lights in sky blue.',
    category: 'Performance',
    imageUrl: '/images/gal-6-sky-blue.jpg',
    date: '2026',
    location: 'Nairobi, Kenya'
  },
  {
    id: 'g7',
    title: 'Performing in green',
    caption: 'Recital exploring memory, womanhood, and healing.',
    category: 'Performance',
    imageUrl: '/images/gal-7-green.jpg',
    date: '2026',
    location: 'Nairobi, Kenya'
  },
  {
    id: 'g8',
    title: 'Black and white, mid-performance',
    caption: 'Intimate monochrome portrait of vocal and emotional presence.',
    category: 'Performance',
    imageUrl: '/images/gal-8-bw-performance.jpg',
    date: '2026',
    location: 'Nairobi, Kenya'
  },
  {
    id: 'g9',
    title: 'Speaking to an audience',
    caption: 'Faith Wanja addressing attendees and unpacking the One-Jar practice.',
    category: 'Portrait',
    imageUrl: '/images/gal-9-audience.jpg',
    date: '2026',
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
      'Spoken word recitals (e.g. "Find A Woman", "When I Die", "War", "The Jar We Carry")',
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
    title: 'Wanja Writes Newsletter: Unsealing the Jar',
    date: '2025',
    excerpt: 'Reflections from stage wings, open mics at Rafinki & Mizani, and why we refuse to conceal discomfort in our art.',
    previewText: 'Dear Reader,\n\nWhen rain falls on terracotta, the smell is of earth remembering. In this issue of Wanja Writes, I share notes from the slam stage...'
  }
];

export const EPK_DATA = {
  shortBio: 'Faith Wanja (One-Jar Poetry) is a Kenyan poet, cultural documentarian, communications consultant, and filmmaker whose work centres on womanhood, generational healing, identity, and social justice. "My name is Wanja. I fill spaces with poems ONE JAR at a time."',
  mediumBio: 'Faith Wanja (One-Jar Poetry) is a Kenyan poet, cultural documentarian, communications consultant, and filmmaker. Immersed in the poetry scene, she features across open mics, competitive slams, and festivals including Rafinki, Nuetry, Mizani, Poets You Should Know (PYSK), Poetry Slam Africa Grand Slam, and Kitale Film Week 2026. Her poetry is marked by emotional honesty and a refusal to conceal discomfort.',
  fullBio: 'Faith Wanja (One-Jar Poetry) is a renowned Kenyan poet, cultural documentarian, communications consultant, and filmmaker with a background in Community Development. Operating under WanjaWrites and her signature performance brand One-Jar Poetry, Faith crafts deeply moving spoken word recitals that interrogate silence, inherited trauma, resilience, and freedom.\n\nHer work spans strategic communications for education and NGO initiatives (EduTab Africa, Watoto Watch Network), culture writing for Kenya’s literary scene, and co-authoring academic research in the ACM Digital Library. Selected features include Poetry Slam Africa Grand Slam, PYSK Women Slam, Mizani Slam, Kitale Film Week 2026 Opening Night, and the solo show “Are You Home?”.',
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
    },
    {
      quote: "“I loved everything about the show, from the venue, the setup, the sound, the performances, the poems👌🏾”",
      source: 'Are You Home? Audience Review, Nairobi'
    }
  ]
};
