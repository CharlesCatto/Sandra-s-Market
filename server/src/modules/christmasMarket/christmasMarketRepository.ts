import type { Result, Rows } from "../../../database/client";
import databaseClient from "../../../database/client";
import type { ChristmasMarket } from "../../types";

class ChristmasMarketRepository {
  async createMarket(market: Omit<ChristmasMarket, "id">): Promise<number> {
    const query = `
      INSERT INTO christmas_market (
        name, location, address, number_of_exponents, number_of_craftsmen,
        place_type, animation_type, animals_forbidden, exposition, santa_present,
        restauration, usual_days, user_id
      )
      VALUES (?, ST_GeomFromText(?), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      market.name,
      `POINT(${market.location.lat} ${market.location.lng})`,
      market.address,
      market.number_of_exponents,
      market.number_of_craftsmen,
      market.place_type,
      JSON.stringify(market.animation_type), // Serialize array to JSON string
      market.animals_forbidden,
      market.exposition,
      market.santa_present,
      market.restauration,
      JSON.stringify(market.usual_days), // Serialize array to JSON string
      market.user_id,
    ];

    const [result] = await databaseClient.query<Result>(query, values);
    return result.insertId;
  }

  async getMarkets(): Promise<ChristmasMarket[]> {
    const query = `
      SELECT 
        id, name, ST_X(location) AS lat, ST_Y(location) AS lng, address,
        number_of_exponents, number_of_craftsmen, place_type, animation_type,
        animals_forbidden, exposition, santa_present, restauration, usual_days, user_id
      FROM christmas_market
    `;
    const [rows] = await databaseClient.query<Rows>(query);

    return rows.map((row) => {
      // Log the raw usual_days field
      console.info("Raw usual_days:", row.usual_days);

      // Parse usual_days into an array (handle NULL and empty values)
      // const usual_days =
      //   row.usual_days && typeof row.usual_days === "string"
      //     ? JSON.parse(row.usual_days)
      //     : [];
      const usual_days = Array.isArray(row.usual_days) ? row.usual_days : [];

      // Log the parsed usual_days
      console.info("Parsed usual_days:", usual_days);

      return {
        id: row.id,
        name: row.name,
        location: { lat: row.lat, lng: row.lng },
        address: row.address,
        number_of_exponents: row.number_of_exponents,
        number_of_craftsmen: row.number_of_craftsmen,
        place_type: row.place_type,
        animation_type: row.animation_type,
        animals_forbidden: row.animals_forbidden,
        exposition: row.exposition,
        santa_present: row.santa_present,
        restauration: row.restauration,
        usual_days, // Parsed JSON array (or empty array if NULL)
        user_id: row.user_id,
      };
    });
  }

  async getMarketById(id: number): Promise<ChristmasMarket | null> {
    const query = `
      SELECT 
        id, name, ST_X(location) AS lat, ST_Y(location) AS lng, address,
        number_of_exponents, number_of_craftsmen, place_type, animation_type,
        animals_forbidden, exposition, santa_present, restauration, usual_days, user_id
      FROM christmas_market
      WHERE id = ?
    `;
    const [rows] = await databaseClient.query<Rows>(query, [id]);

    if (rows.length === 0) return null;

    const row = rows[0];
    console.info("Retrieved Row:", row); // Log the entire row
    console.info("Animation Type (Raw):", row.animation_type); // Log the raw animation_type
    console.info("Usual Days (Raw):", row.usual_days); // Log the raw usual_days

    // Ensure animation_type and usual_days are parsed correctly
    const animation_type =
      row.animation_type && typeof row.animation_type === "string"
        ? JSON.parse(row.animation_type)
        : [];
    const usual_days =
      row.usual_days && typeof row.usual_days === "string"
        ? JSON.parse(row.usual_days)
        : [];

    return {
      id: row.id,
      name: row.name,
      location: { lat: row.lat, lng: row.lng },
      address: row.address,
      number_of_exponents: row.number_of_exponents,
      number_of_craftsmen: row.number_of_craftsmen,
      place_type: row.place_type,
      animation_type, // Parsed JSON array
      animals_forbidden: row.animals_forbidden,
      exposition: row.exposition,
      santa_present: row.santa_present,
      restauration: row.restauration,
      usual_days, // Parsed JSON array
      user_id: row.user_id,
    };
  }

  async updateMarket(market: ChristmasMarket): Promise<boolean> {
    const query = `
      UPDATE christmas_market
      SET 
        name = ?, location = ST_GeomFromText(?), address = ?,
        number_of_exponents = ?, number_of_craftsmen = ?, place_type = ?,
        animation_type = ?, animals_forbidden = ?, exposition = ?, santa_present = ?,
        restauration = ?, usual_days = ?
      WHERE id = ?
    `;
    const values = [
      market.name,
      `POINT(${market.location.lat} ${market.location.lng})`,
      market.address,
      market.number_of_exponents,
      market.number_of_craftsmen,
      market.place_type,
      JSON.stringify(market.animation_type), // Serialize array to JSON string
      market.animals_forbidden,
      market.exposition,
      market.santa_present,
      market.restauration,
      JSON.stringify(market.usual_days), // Serialize array to JSON string
      market.id,
    ];

    const [result] = await databaseClient.query<Result>(query, values);
    return result.affectedRows > 0;
  }

  async deleteMarket(id: number): Promise<boolean> {
    const query = "DELETE FROM christmas_market WHERE id = ?";
    const [result] = await databaseClient.query<Result>(query, [id]);
    return result.affectedRows > 0;
  }
}

export default new ChristmasMarketRepository();
