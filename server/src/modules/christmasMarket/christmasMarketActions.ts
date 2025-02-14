import type { RequestHandler } from "express";
import christmasMarketRepository from "./christmasMarketRepository";
import type { ChristmasMarket } from "../../types/index";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const markets = await christmasMarketRepository.getMarkets();
    res.json(markets);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const marketId = Number(req.params.id);
    if (Number.isNaN(marketId)) {
      res.status(400).json({ error: "Invalid market ID" });
      return;
    }

    const market = await christmasMarketRepository.getMarketById(marketId);
    if (market == null) {
      res.sendStatus(404).json({ error: "Market not found" });
    } else {
      res.json(market);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    console.info("Request Body:", req.body); // Log the entire request body

    const {
      name,
      location,
      address,
      number_of_exponents,
      number_of_craftsmen,
      place_type,
      animation_type,
      animals_forbidden,
      exposition,
      santa_present,
      restauration,
      usual_days,
      user_id,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !location ||
      !location.lat ||
      !location.lng ||
      !address ||
      !user_id
    ) {
      console.error("Missing required fields in request body:", {
        name,
        location,
        address,
        user_id,
      }); // Log missing fields
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    console.info("Location Object:", location); // Log the location object

    const newMarket: Omit<ChristmasMarket, "id"> = {
      name,
      location,
      address,
      number_of_exponents,
      number_of_craftsmen,
      place_type,
      animation_type,
      animals_forbidden,
      exposition,
      santa_present,
      restauration,
      usual_days,
      user_id,
    };

    console.info("New Market Data:", newMarket); // Log the new market data

    const insertId = await christmasMarketRepository.createMarket(newMarket);
    console.info("Insert ID:", insertId); // Log the insert ID

    const createdMarket =
      await christmasMarketRepository.getMarketById(insertId);
    console.info("Created Market:", createdMarket); // Log the created market

    if (!createdMarket) {
      throw new Error("Failed to fetch the newly created market");
    }

    res.status(201).json(createdMarket);
  } catch (err) {
    console.error("Error in add function:", err); // Log any errors
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const marketId = Number(req.params.id);
    if (Number.isNaN(marketId)) {
      res.status(400).json({ error: "Invalid market ID" });
      return;
    }

    const updatedMarket: ChristmasMarket = {
      id: marketId,
      ...req.body,
    };

    const result = await christmasMarketRepository.updateMarket(updatedMarket);
    if (result) {
      res.status(200).json({ message: "Market updated successfully 🎉" });
    } else {
      res.status(404).json({ message: "Market not found 👀" });
    }
  } catch (err) {
    next(err);
  }
};

const remove: RequestHandler = async (req, res, next) => {
  try {
    const marketId = Number(req.params.id);
    if (Number.isNaN(marketId)) {
      res.status(400).json({ error: "Invalid market ID" });
      return;
    }

    const result = await christmasMarketRepository.deleteMarket(marketId);
    if (result) {
      res.status(200).json({ message: "Market deleted successfully 💥" });
    } else {
      res.status(404).json({ message: "Market not found 👀" });
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, remove };
