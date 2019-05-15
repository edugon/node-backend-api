// insert some users
db.users.insert({ id: 1, name: "admin", password: "Admin", email: "admin@backend" });
db.users.insert({ id: 2, name: "batman", password: "Batman", email: "batman@backend" });
db.users.insert({ id: 3, name: "spiderman", password: "Spiderman", email: "spiderman@backend" });

// insert some workers
db.workers.insert({ id: 1, availability: ["Monday", "Wednesday", "Friday"], payrate: 7.50 });
db.workers.insert({ id: 2, availability: ["Tuesday", "Thursday"], payrate: 9.00 });
db.workers.insert({ id: 3, availability: ["Monday", "Tuesday", "Friday"], payrate: 8.00 });
db.workers.insert({ id: 4, availability: ["Thursday"], payrate: 12.25 });

// insert some shifts
db.shifts.insert({ id: 1, day: ["Monday"] });
db.shifts.insert({ id: 2, day: ["Tuesday"] });
db.shifts.insert({ id: 3, day: ["Wednesday"] });