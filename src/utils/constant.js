export const itemCategories = [
  "Electronics",
  "Books",
  "Stationery",
  "Clothing",
  "Accessories",
  "ID Cards",
  "Keys",
  "Wallets",
  "Bags",
  "Others"
];

export const locations = [
  "Library",
  "Cafeteria",
  "Main Building",
  "Sports Complex",
  "Dormitory A",
  "Dormitory B",
  "Parking Lot",
  "Auditorium",
  "Computer Lab",
  "Science Building",
  "Arts Center",
  "Student Union"
];

export const verificationQuestions = {
  electronics: [
    "Any scratches or marks on the device?",
    "Serial number (if known)?",
    "What case/cover does it have?",
    "Any stickers or personalizations?"
  ],
  books: [
    "Any notes written inside?",
    "Page numbers with dog ears?",
    "Stickers or bookmarks inside?",
    "Cover condition and color?"
  ],
  clothing: [
    "Any stains or tears?",
    "Brand and size?",
    "Unique patterns or designs?",
    "Any alterations made?"
  ],
  wallets: [
    "Color and material?",
    "Any cards inside?",
    "Distinctive features?",
    "Approximate cash amount?"
  ],
  bags: [
    "Color and brand?",
    "Any keychains attached?",
    "Contents inside?",
    "Distinctive marks?"
  ]
};

export const CONFIDENCE_WEIGHTS = {
  IMAGE_SIMILARITY: 0.5,
  DESCRIPTION_MATCH: 0.3,
  KNOWLEDGE_ACCURACY: 0.2
};