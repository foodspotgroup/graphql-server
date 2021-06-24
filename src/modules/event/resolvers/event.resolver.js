export const EventType = {
  giveaway: "GIVEAWAY",
  foodDrive: "FOODDRIVE",
  request: "REQUEST",
};

// General event resolver

const creator = (parent) =>
  // TODO query DB for user
  parent.creator;

const Event = {
  id: (parent) => parent.id,
  type: (parent) => parent.type,
  creator,
  datetime: (parent) => parent.datetime,
  location: (parent) => parent.location,
};

// Food event resolvers

const food = (parent) =>
  // TODO search food items in DB using IDs
  parent.food;

const attendees = (parent) =>
  // TODO search for attendees in DB using IDs
  parent.attendees;

const totalServings = (parent) =>
  // TODO add up all servings left in food list
  0;

const FoodEvent = {
  ...Event,
  food,
  attendees,
  totalServings,
};

// Request event resolvers

const RequestEvent = {
  ...Event,
  allergies: (parent) => parent.allergies,
};

export default {
  Event,
  FoodEvent,
  RequestEvent,
};
