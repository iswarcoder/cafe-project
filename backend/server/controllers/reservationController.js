import Reservation from "../models/Reservation.js";

export const createReservation = async (req, res, next) => {
  try {
    const { name, email, date, time, people, numberOfPeople } = req.body;
    const finalPeople = people ?? numberOfPeople;

    if (!name || !email || !date || !time || !finalPeople) {
      return res.status(400).json({ message: "All reservation fields are required" });
    }

    const reservation = await Reservation.create({
      name,
      email,
      date,
      time,
      people: Number(finalPeople)
    });
    return res.status(201).json({ message: "Reservation submitted", reservation });
  } catch (error) {
    next(error);
  }
};

export const getReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    return res.status(200).json(reservations);
  } catch (error) {
    next(error);
  }
};
