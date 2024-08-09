import { FAQ } from "@/types/faq";

const faqData: FAQ[] = [
  {
    id: 1,
    quest: "How does Trailblaze compare to other cycling/hiking apps?",
    ans: "Trailblaze prioritizes trails and quieter roads to provide safer, more enjoyable routes. Unlike other apps, Trailblaze focuses on offering routes that balance distance with enjoyability, providing longer, more scenic paths.",
  },
  {
    id: 2,
    quest: "Where is Trailblaze available?",
    ans: "Trailblaze is currently available across all of North America (United States, Canada, and Mexico). Expansion to other regions is planned for the future.",
  },
  {
    id: 3,
    quest: "Does Trailblaze provide turn-by-turn navigation?",
    ans: "Currently, Trailblaze does not offer turn-by-turn navigation, but this feature is planned for future updates.",
  },
  {
    id: 4,
    quest: "Where does Trailblaze get its data?",
    ans: "Trailblaze uses user-maintained road data from the OpenStreetMap (OSM) initiative.",
  },
];

export default faqData;
