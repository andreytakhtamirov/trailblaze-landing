import { Feature } from "@/types/feature";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: "fa6-solid:route",
    title: "Bike-friendly Routing",
    description:
      "Generate optimized routes for cycling, featuring trails, paths, and smaller roads to keep you clear of busy traffic.",
    isCustomIcon: false,
  },
  {
    id: 2,
    icon: "material-symbols:tv-options-input-settings",
    title: "Customizable Options",
    description:
      "Adjust your route to be as direct or scenic as you like, balancing efficiency with enjoyment.",
    isCustomIcon: false,
  },
  {
    id: 3,
    icon: "ic:sharp-travel-explore",
    title: "Modes Tailored for Outdoor Exploration",
    description:
      "Choose from three available modes: hiking, cycling, and gravel cycling.",
    isCustomIcon: false,
  },
  {
    id: 4,
    icon: "icon-park-twotone:download-four",
    title: "Offline Access & Export",
    description:
      "Take your journey with you. Save routes to your account or export as GPX.",
    isCustomIcon: false,
  },
  {
    id: 5,
    icon: "tabler:barrier-block-off",
    title: "Area Avoidance",
    description:
      "Avoid known obstacles like flooded zones or closed roads, to let your route adapt to what's happening right now.",
    isCustomIcon: false,
  },
  {
    id: 6,
    icon: "solar:shuffle-bold",
    title: "Randomize Routes",
    description:
      "Not sure where to go? Just pick a distance and let Trailblaze generate a route for you.",
    isCustomIcon: false,
  },
];

export default featuresData;
