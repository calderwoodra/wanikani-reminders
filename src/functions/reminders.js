import { getDoc } from "firebase/firestore";

export async function getReminders(user) {
  return Promise.all(user.reminders.map(r => getDoc(r))).then(reminders => {
    const results = [];
    for (const reminder of reminders) {
      if (reminder.exists()) {
        results.push(reminder.data());
      }
    }
    return results;
  });
}
