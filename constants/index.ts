import { Operator } from "~/types";

export const OPERATORS: Operator[] = [
  {
    label: "+",
    value: "+",
  },
  {
    label: "-",
    value: "-",
  },
  {
    label: "x",
    value: "*",
  },
  {
    label: ":",
    value: "/",
  },
  {
    label: "(",
    value: "(",
  },
  {
    label: ")",
    value: ")",
  },
];

export const INSULTS = {
  mild: ["Even my granpa can count that", "Good game, well played!", "Too ez"],
  toxic: ["Almost is never enough tho, hehe", "Pfffffttt", "GG EZ"],
  uninstall: [
    "Consider back to scrolling T*ktok",
    "Have you encountered math before?",
    "Bro how you even live until now",
  ],
};

export const TIME_TO_COMPLETE = 60; // second
