import dayjs from "dayjs";
import { InvitationStatus } from "../../../../utils/constants";

const organiser = async (parent, _, context) => {
  const { data } = await context.database.users.getById(parent.organiserId);
  return data;
};

const getInvitationsByEvent = async (eventId, database) => {
  const { data } = await database.invitations.find({
    eventId,
  });
  return data;
};

const invitations = async (parent, _, context) =>
  getInvitationsByEvent(parent.id, context.database);

const attendeeInfo = async (parent, _, context) => {
  const claimedStatus = [InvitationStatus.claimed, InvitationStatus.accepted];
  const { maxCapacity, id: eventId } = parent;
  const invites = await getInvitationsByEvent(eventId, context.database);
  let pendingInvites = 0;
  let pendingCapacity = 0;
  let claimedCapacity = 0;
  for (const inv of invites) {
    if (inv.status === InvitationStatus.pending) {
      pendingInvites += 1;
      pendingCapacity += inv.numAttendees;
    } else if (claimedStatus.includes(inv.status)) {
      claimedCapacity += inv.numAttendees;
    }
  }
  return {
    pendingInvites,
    pendingCapacity,
    claimedCapacity,
    maxCapacity,
  };
};

const startDate = async (parent) =>
  dayjs.unix(parent.startDate).toDate().toUTCString();

const endDate = async (parent) =>
  dayjs.unix(parent.endDate).toDate().toUTCString();

const FoodDrive = {
  organiser,
  invitations,
  startDate,
  endDate,
  attendeeInfo,
};

export default {
  FoodDrive,
};
