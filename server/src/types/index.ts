// // types.ts
// export interface ChristmasMarket {
//   id: number;
//   name: string;
//   location: { lat: number; lng: number };
//   address: string;
//   number_of_exponents: number;
//   number_of_craftsmen: number;
//   place_type: string;
//   animation_type: string[];
//   animals_forbidden: boolean;
//   exposition: boolean;
//   santa_present: boolean;
//   restauration: "food" | "drink" | "both" | "none"; // Add this field
//   usual_days: string[]; // Add this field
//   user_id: number;
// }
export interface ChristmasMarket {
  id?: number;
  name: string;
  location: { lat: number; lng: number };
  address: string;
  number_of_exponents: number;
  number_of_craftsmen: number;
  place_type: string;
  animation_type: string[];
  animals_forbidden: boolean;
  exposition: boolean;
  santa_present: boolean;
  restauration: "food" | "drink" | "both" | "none";
  usual_days: string[];
  user_id: number;
}
