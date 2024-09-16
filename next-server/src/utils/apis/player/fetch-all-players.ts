import axios from "axios";
import { playerType } from "@/types/player-type";

// Define the base URL of your API
const API_BASE_URL = "http://localhost:3001"; // Replace with your actual API base URL

// Define a function to fetch all players
export async function fetchAllPlayers(): Promise<playerType[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/players`);

    if (response.status === 200) {
      return response.data as playerType[];
    } else {
      throw new Error(`Failed to fetch players: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
}
