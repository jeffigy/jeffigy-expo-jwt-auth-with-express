import {
  timestamp,
  text,
  varchar,
  integer,
  pgTable,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { boolean } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  userId: varchar("user_id", { length: 255 }).primaryKey().$defaultFn(createId),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  picture: text("picture"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  roles: text("roles").array().notNull().default(["user"]),
  active: boolean("active").notNull().default(true),
});

export const moviesTable = pgTable("movies", {
  movieId: varchar("movie_id", { length: 255 })
    .primaryKey()
    .$defaultFn(createId),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  duration: integer("duration").notNull(),
  genre: text("genre").array(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const theatersTable = pgTable("theaters", {
  theaterId: varchar("theater_id", { length: 255 })
    .primaryKey()
    .$defaultFn(createId),
  name: varchar("name", { length: 100 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  seatCapacity: integer("seat_capacity").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const showtimesTable = pgTable("showtimes", {
  showtimeId: varchar("showtime_id", { length: 255 })
    .primaryKey()
    .$defaultFn(createId),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  theaterId: varchar("theater_id", { length: 255 }).notNull(),
  movieId: varchar("movie_id", { length: 255 }).notNull(),
});

export const reservationsTable = pgTable(
  "reservations",
  {
    reservationId: varchar("reservation_id", { length: 255 })
      .primaryKey()
      .$defaultFn(createId),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .$onUpdate(() => new Date()),
    seatNumbers: text("seat_numbers").array().notNull(),
    showtimeId: varchar("showtime_id", { length: 255 }).notNull(), // one showtime can have many reservations
    userId: varchar("user_id", { length: 255 }).notNull(), // one user can have many reservations
  }
  // (table) => {
  //   return {
  //     showtimeIdIndex: index("reservations_showtime_id_idx").on(
  //       table.showtimeId
  //     ),
  //   };
  // }
);

export const userRelations = relations(usersTable, ({ many }) => ({
  reservations: many(reservationsTable),
}));

export const movieRelations = relations(moviesTable, ({ many }) => ({
  showtimes: many(showtimesTable),
}));

export const theaterRelations = relations(theatersTable, ({ many }) => ({
  showtimes: many(showtimesTable),
}));

export const showTimeRelations = relations(showtimesTable, ({ one, many }) => ({
  movie: one(moviesTable, {
    fields: [showtimesTable.movieId],
    references: [moviesTable.movieId],
  }),

  theater: one(theatersTable, {
    fields: [showtimesTable.theaterId],
    references: [theatersTable.theaterId],
  }),
  reservations: many(reservationsTable),
}));

export const reservationsRelations = relations(
  reservationsTable,
  ({ one }) => ({
    showtime: one(showtimesTable, {
      fields: [reservationsTable.showtimeId],
      references: [showtimesTable.showtimeId],
    }),

    user: one(usersTable, {
      fields: [reservationsTable.userId],
      references: [usersTable.userId],
    }),
  })
);
