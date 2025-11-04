const menuItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "Meet Vivek" },
  {
    label: "Books",
    submenu: [
      { path: "/books", label: "All Books" },
      { path: "/books/the-accursed-god", label: "The Accursed God" },
      { path: "/books/manas", label: "Manas" },
      { path: "/books/the-lost-epic-2", label: "The Lost Epic (Book #2)" }
    ]
  },

 // { path: "/videos", label: "YouTube" },
  {
    label: "Mahabharata Ek Khoj",
    submenu: [
      //{ path: "/mahabharata/faq", label: "FAQ" },
      { path: "/mahabharata/query", label: "Ask Vivek" },
      { path: "/mahabharata/youtube", label: "YouTube" },
      { path: "/mahabharata/podcast", label: "Podcast" },
    ]
  },
  // {
  //   label: "Podcast",
  //   path: "/podcast",
  //   // submenu: [
  //   //   { path: "/podcast/episodes", label: "All Episodes" },
  //   //   { path: "/podcast/latest", label: "Latest Episode" }
  //   // ]
  // },

  // { 
  //   label: "Blog",
  //   submenu: [
  //     { path: "/blog", label: "All Posts" },
  //     { path: "/blog/category/books", label: "Book Reviews" },
  //     { path: "/blog/category/writing", label: "Writing Tips" }
  //   ]
  // },
  { path: "/contact", label: "Contact" }
];


export default menuItems;