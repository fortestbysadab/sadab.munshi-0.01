import type { Translations } from "./types";

export const en: Translations = {
  locale: "en",

  nav: {
    home: "Home",
    about: "About",
    blog: "Blog",
    projects: "Projects",
    contact: "Contact",
    resume: "Résumé",
    getInTouch: "Get in touch",
  },

  footer: {
    site: "Site",
    writing: "Writing",
    connect: "Connect",
    watching: "Watching",
    rights: "All rights reserved.",
  },

  home: {
    heroTitle: "I get curious.\nThen I build something.",
    heroBody:
      "When I see new technology, I want to know how it works. So I read about it, try things, break it sometimes, and then build something small with it. This site is where I keep what I have built and learned so far.",
    ctaBuild: "See what I've built",
    ctaBlog: "Read the notes",
    introBody:
      "You'll find notes from that exploration, things I've built along the way, and an about page with what's occupying my attention right now. It's a work in progress — like me.",
    todayNote: "Today's note",
    recentTitle: "From the notebook",
    allWriting: "All writing →",
    readMore: "Read more →",
    notesLabel: "notes from that exploration",
    tagline: "Learning by doing",
    signature: "Sadab Munshi",
    moods: [
      "Currently trying to understand something I've never touched before. That's the good part.",
      "Broke something interesting today. Now I know more.",
      "The documentation said it was simple. It was not simple.",
      "Reading about a technology I haven't tried yet. That itch is real.",
      "Shipping small things is better than planning big things forever.",
    ],
  },

  about: {
    title: "About",
    intro:
      "I'm Sadab. I got curious about how money works and haven't stopped pulling on that thread.",
    body: "I'm a student. Finance is what I keep coming back to — how systems are built, how money moves, why most tools for managing it feel like they were made for someone else. When something doesn't make sense to me, I try to make a small version of it myself. Writing is how I make sure I actually understood it.",
    nowTitle: "Now",
    nowSubtitle: "What I'm focused on at the moment.",
    nowDoing: [
      "Student. Trying to figure out how things work before I run out of time to be curious.",
      "Working on a project in the finance space.",
      "Trying to understand how financial systems actually work underneath.",
      "Writing about what I learn, including the parts that didn't go as planned.",
    ],
    watchingLink: "/watching",
    watchingLinkLabel: "See what I'm watching →",
    closingLine: "Start wherever you're curious.",
    closingProjects: "Projects",
    closingBlog: "Blog",
  },

  blog: {
    title: "Blog",
    description: "Notes on paying attention. Published when clarity arrives.",
    newLabel: "New",
  },

  projects: {
    title: "Projects",
    description: "Things I've built to learn, solve a problem, or just see if I could.",
    liveLabel: "Live ↗",
    inProgress: "In Progress",
    projects: [
      {
        name: "FinFlow",
        description:
          "A Personal Finance Management System that automatically categorizes spending and forecasts future expenses. Built to help me understand where my money actually goes.",
        tags: ["Next.js", "Node.js", "TypeScript"],
        href: "https://app.sadabmunshi.online",
      },
      {
        name: "Next Project",
        description: "Something interesting is in the works. Stay tuned.",
        tags: ["TBD"],
        muted: true,
      },
    ],
  },

  watching: {
    title: "Watching",
    description: "Movies and shows.",
    intro:
      "I do not watch a lot, but when I do, I prefer things that make me think or feel something. No particular genre — just good storytelling.",
    lastUpdated: "Last updated:",
    recommendation: "Have a recommendation?",
    recommendationLink: "Let me know",
    sections: [
      {
        category: "Recently Watched",
        items: [
          { title: "The Social Network", year: "2010", note: "A classic. Makes you want to build something." },
        ],
      },
      {
        category: "Currently Watching",
        items: [
          { title: "Severance", year: "2022–", note: "Work-life balance taken to the extreme." },
        ],
      },
      {
        category: "Want to Watch",
        items: [
          { title: "Dune: Part Two", year: "2024", note: "Heard it is incredible." },
          { title: "The Bear", year: "2022–", note: "Everyone keeps recommending this." },
        ],
      },
      {
        category: "All-Time Favorites",
        items: [
          { title: "Good Will Hunting", year: "1997", note: "It is not your fault." },
          { title: "The Prestige", year: "2006", note: "Nolan at his best." },
          { title: "Whiplash", year: "2014", note: "Obsession and excellence." },
        ],
      },
    ],
  },

  contact: {
    title: "Get in touch.",
    subtitle: "Have a question or just want to say hello? I would love to hear from you.",
    nameLabel: "Your Name",
    namePlaceholder: "John Doe",
    emailLabel: "Email Address",
    emailPlaceholder: "john@example.com",
    messageLabel: "Your Message",
    messagePlaceholder: "Tell me what is on your mind...",
    send: "Send Message",
    sending: "Sending…",
    successTitle: "Message sent.",
    orLabel: "or",
    emailDirect: "Email me directly",
    errorFill: "Please fill in all fields.",
    errorGeneric: "Something went wrong. Please try again.",
  },

  notFound: {
    emoji: "¯\\_(ツ)_/¯",
    title: "Page Not Found",
    body: "The page you are looking for does not exist. Maybe it moved. Maybe it never existed. Maybe you mistyped.",
    cta: "Go Home",
  },

  langSwitcher: {
    auto: "Auto",
  },
};
