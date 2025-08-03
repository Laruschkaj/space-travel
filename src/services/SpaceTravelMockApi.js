import { nanoid } from "nanoid";

class SpaceTravelMockApi {
  static MOCK_DB = {
    planets: [
      {
        id: 0,
        name: "Mercury",
        currentPopulation: 0, // FIXED: Start with 0
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/Reprocessed_Mariner_10_image_of_Mercury.jpg"
      },
      {
        id: 1,
        name: "Venus",
        currentPopulation: 0, // FIXED: Start with 0
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Venus_globe.jpg/800px-Venus_globe.jpg"
      },
      {
        id: 2,
        name: "Earth",
        currentPopulation: 10000, // FIXED: Only Earth starts with population (matches Prispax capacity)
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28remastered%29.jpg/800px-The_Blue_Marble_%28remastered%29.jpg"
      },
      {
        id: 3,
        name: "Mars",
        currentPopulation: 0, // FIXED: Start with 0
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/800px-OSIRIS_Mars_true_color.jpg"
      },
      {
        id: 4,
        name: "Jupiter",
        currentPopulation: 0, // FIXED: Start with 0
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Jupiter%2C_image_taken_by_NASA%27s_Hubble_Space_Telescope%2C_June_2019.png/800px-Jupiter%2C_image_taken_by_NASA%27s_Hubble_Space_Telescope%2C_June_2019.png"
      },
      {
        id: 5,
        name: "Saturn",
        currentPopulation: 0, // FIXED: Start with 0
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/8423_20181_1saturn2016.jpg/1920px-8423_20181_1saturn2016.jpg"
      },
      {
        id: 6,
        name: "Uranus",
        currentPopulation: 0, // FIXED: Start with 0
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Uranus_as_seen_by_NASA%27s_Voyager_2_%28remastered%29_-_JPEG_converted.jpg/800px-Uranus_as_seen_by_NASA%27s_Voyager_2_%28remastered%29_-_JPEG_converted.jpg"
      },
      {
        id: 7,
        name: "Neptune",
        currentPopulation: 0, // FIXED: Start with 0
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/0/06/Neptune.jpg"
      }
    ],
    spacecrafts: [
      {
        id: "prispax",
        name: "Prispax",
        capacity: 10000,
        description: "Presenting the Astrolux Odyssey: a revolutionary spacecraft merging cutting-edge technology with lavish luxury, designed to usher 10,000 passengers into the solar system's embrace. A marvel of engineering, its sleek exterior is adorned with solar panels, fueling advanced propulsion while minimizing environmental impact." +
          "Within, the vessel transforms into a haven of opulence. Lavish suites offer cosmic panoramas, celestial artwork bedecks lounges, and sprawling gardens thrive in zero-gravity. Culinary excellence reigns in gourmet restaurants, while immersive theaters and VR chambers offer stellar entertainment." +
          "Safety remains paramount with cosmic radiation shielding and top-tier medical facilities. The Astrolux Odyssey not only advances space exploration but redefines elegance, uniting humanity's thirst for knowledge with a taste of the sublime.",
        pictureUrl: null,
        currentLocation: 2
      }
    ]
  };
  static MOCK_DB_KEY = "MOCK_DB";

  static prepareResponse() {
    return {
      isError: false,
      data: null
    };
  }

  static wait(duration = 1000) {
    return new Promise(resolve => setTimeout(resolve, duration));
  }

  static getMockDb() {
    let mockDb = localStorage.getItem(SpaceTravelMockApi.MOCK_DB_KEY);

    if (!mockDb) {
      localStorage.setItem(SpaceTravelMockApi.MOCK_DB_KEY, JSON.stringify(SpaceTravelMockApi.MOCK_DB));
      mockDb = SpaceTravelMockApi.MOCK_DB;
    } else {
      mockDb = JSON.parse(mockDb);
    }

    return mockDb;
  }

  static setMockDb(mockDb) {
    localStorage.setItem(SpaceTravelMockApi.MOCK_DB_KEY, JSON.stringify(mockDb));
  }

  static async getPlanets() {
    await SpaceTravelMockApi.wait();

    const response = SpaceTravelMockApi.prepareResponse();

    try {
      const mockDb = SpaceTravelMockApi.getMockDb();
      response.data = mockDb.planets;
    } catch (error) {
      response.isError = true;
      response.data = error;
    }

    return response;
  }

  static async getSpacecrafts() {
    await SpaceTravelMockApi.wait();

    const response = SpaceTravelMockApi.prepareResponse();

    try {
      const mockDb = SpaceTravelMockApi.getMockDb();
      response.data = mockDb.spacecrafts;
    } catch (error) {
      response.isError = true;
      response.data = error;
    }

    return response;
  }

  static async getSpacecraftById({ id }) {
    await SpaceTravelMockApi.wait();

    const response = SpaceTravelMockApi.prepareResponse();

    try {
      const mockDb = SpaceTravelMockApi.getMockDb();
      const spacecraft = mockDb.spacecrafts.find(sc => sc.id === id);

      if (spacecraft) {
        response.data = spacecraft;
      } else {
        response.isError = true;
        response.data = 'Spacecraft not found.';
      }
    } catch (error) {
      response.isError = true;
      response.data = error;
    }

    return response;
  }

  static async buildSpacecraft({ name, capacity, description, pictureUrl = undefined }) {
    await SpaceTravelMockApi.wait();

    const response = SpaceTravelMockApi.prepareResponse();

    try {
      const spacecraft = { id: nanoid(), name, capacity, description, pictureUrl, currentLocation: 2 };

      const mockDb = SpaceTravelMockApi.getMockDb();

      // FIXED: Add the spacecraft's capacity to Earth's population when created
      const earthPlanet = mockDb.planets.find(p => p.id === 2);
      if (earthPlanet) {
        earthPlanet.currentPopulation += capacity;
      }

      mockDb.spacecrafts.push(spacecraft);
      SpaceTravelMockApi.setMockDb(mockDb);
      response.data = spacecraft;
    } catch (error) {
      response.isError = true;
      response.data = error;
    }

    return response;
  }

  static async destroySpacecraftById({ id }) {
    await SpaceTravelMockApi.wait();

    const response = SpaceTravelMockApi.prepareResponse();

    try {
      const mockDb = SpaceTravelMockApi.getMockDb();
      const spacecraft = mockDb.spacecrafts.find(sc => sc.id === id);

      if (spacecraft) {
        // FIXED: Remove the spacecraft's capacity from its current planet's population
        const currentPlanet = mockDb.planets.find(p => p.id === spacecraft.currentLocation);
        if (currentPlanet) {
          currentPlanet.currentPopulation -= spacecraft.capacity;
          // Ensure population doesn't go below 0
          if (currentPlanet.currentPopulation < 0) {
            currentPlanet.currentPopulation = 0;
          }
        }

        // Remove the spacecraft
        mockDb.spacecrafts = mockDb.spacecrafts.filter(sc => sc.id !== id);
        SpaceTravelMockApi.setMockDb(mockDb);
        response.data = 'Spacecraft decommissioned.';
      } else {
        response.isError = true;
        response.data = 'Spacecraft not found.';
      }
    } catch (error) {
      response.isError = true;
      response.data = error;
    }

    return response;
  }

  static async sendSpacecraftToPlanet({ spacecraftId, targetPlanetId }) {
    await SpaceTravelMockApi.wait();

    const response = SpaceTravelMockApi.prepareResponse();

    try {
      const mockDb = SpaceTravelMockApi.getMockDb();
      const spacecraft = mockDb.spacecrafts.find(sc => sc.id === spacecraftId);
      const sourcePlanet = mockDb.planets.find(p => p.id === spacecraft.currentLocation);
      const targetPlanet = mockDb.planets.find(p => p.id === targetPlanetId);

      if (!spacecraft || !sourcePlanet || !targetPlanet) {
        throw new Error("Invalid spacecraft or planet.");
      }

      if (spacecraft.currentLocation === targetPlanetId) {
        throw new Error("The spacecraft is already on this planet!");
      }

      // FIXED: Transfer the spacecraft's capacity (not limited by current population)
      let transferredCapacity = spacecraft.capacity;

      sourcePlanet.currentPopulation -= transferredCapacity;
      targetPlanet.currentPopulation += transferredCapacity;
      spacecraft.currentLocation = targetPlanetId;

      // Ensure populations don't go below 0
      if (sourcePlanet.currentPopulation < 0) {
        sourcePlanet.currentPopulation = 0;
      }

      SpaceTravelMockApi.setMockDb(mockDb);
      response.data = 'Spacecraft dispatched successfully.';
    } catch (error) {
      response.isError = true;
      response.data = error.message || error;
    }

    return response;
  }
}

export default SpaceTravelMockApi;