const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const { createServer: createViteServer } = require("vite");

const app = express();
const PORT = process.env.PORT || 5173;
const dataDir = path.resolve(__dirname, "data");
const dbPath = path.join(dataDir, "ecocycle.db");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Unable to open database", err);
    process.exit(1);
  }
});

function initializeDatabase() {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        points INTEGER NOT NULL DEFAULT 0
      )`
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        item TEXT NOT NULL,
        points INTEGER NOT NULL,
        createdAt TEXT NOT NULL,
        FOREIGN KEY(userId) REFERENCES users(id)
      )`
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS pickups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        address TEXT NOT NULL,
        slot TEXT NOT NULL,
        deviceDetails TEXT,
        status TEXT NOT NULL DEFAULT 'Scheduled',
        requestedAt TEXT NOT NULL,
        FOREIGN KEY(userId) REFERENCES users(id)
      )`
    );

    db.all("PRAGMA table_info(users)", (err, rows) => {
      if (!err && rows) {
        const hasUsername = rows.some((col) => col.name === "username");
        if (!hasUsername) {
          db.run("ALTER TABLE users ADD COLUMN username TEXT");
        }
      }
    });

    db.get("SELECT COUNT(*) AS count FROM users", (err, row) => {
      if (!err && row && row.count === 0) {
        db.run(
          "INSERT INTO users (name, username, email, password, points) VALUES (?, ?, ?, ?, ?)",
          ["Demo User", "demo_user", "demo@ecocycle.app", "demo123", 850]
        );
      }
    });
  });
}

function sendError(res, message, status = 400) {
  res.status(status).json({ error: message });
}

app.use(cors());
app.use(express.json());

app.post("/api/auth/signup", (req, res) => {
  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password) {
    return sendError(res, "Name, user ID, email, and password are required.");
  }

  db.run(
    "INSERT INTO users (name, username, email, password, points) VALUES (?, ?, ?, ?, 0)",
    [name.trim(), username.trim().toLowerCase(), email.trim().toLowerCase(), password],
    function (err) {
      if (err) {
        if (err.code === "SQLITE_CONSTRAINT") {
          return sendError(res, "User ID or email is already registered.", 409);
        }
        return sendError(res, "Could not create account.");
      }
      res.json({ id: this.lastID, name, username: username.trim().toLowerCase(), email: email.trim().toLowerCase(), points: 0 });
    }
  );
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return sendError(res, "Email and password are required.");
  }

  db.get(
    "SELECT id, name, username, email, points FROM users WHERE email = ? AND password = ?",
    [email.trim().toLowerCase(), password],
    (err, row) => {
      if (err) {
        return sendError(res, "Login failed.");
      }
      if (!row) {
        return sendError(res, "Invalid email or password.", 401);
      }
      res.json(row);
    }
  );
});

app.get("/api/history", (req, res) => {
  const userId = Number(req.query.userId || 0);
  if (!userId) {
    return sendError(res, "userId is required.");
  }

  db.all(
    "SELECT id, item, points, createdAt FROM history WHERE userId = ? ORDER BY createdAt DESC",
    [userId],
    (err, rows) => {
      if (err) {
        return sendError(res, "Could not load history.");
      }
      res.json(rows);
    }
  );
});

app.post("/api/history", (req, res) => {
  const { userId, item, points } = req.body;
  if (!userId || !item || !points) {
    return sendError(res, "userId, item, and points are required.");
  }

  const createdAt = new Date().toISOString();
  db.run(
    "INSERT INTO history (userId, item, points, createdAt) VALUES (?, ?, ?, ?)",
    [Number(userId), item.trim(), Number(points), createdAt],
    function (err) {
      if (err) {
        return sendError(res, "Could not save history.");
      }
      const historyId = this.lastID;
      
      // Update user points
      db.run(
        "UPDATE users SET points = points + ? WHERE id = ?",
        [Number(points), Number(userId)],
        function(errUpdate) {
          if (errUpdate) {
            console.error("Failed to update user points", errUpdate);
            // Still return success for history but log error
          }
          res.json({ id: historyId, item: item.trim(), points: Number(points), createdAt });
        }
      );
    }
  );
});

app.post("/api/pickup", (req, res) => {
  const { userId, address, slot, deviceDetails } = req.body;
  if (!userId || !address || !slot) {
    return sendError(res, "userId, address, and slot are required.");
  }

  const requestedAt = new Date().toISOString();
  db.run(
    "INSERT INTO pickups (userId, address, slot, deviceDetails, requestedAt) VALUES (?, ?, ?, ?, ?)",
    [Number(userId), address.trim(), slot.trim(), deviceDetails ? deviceDetails.trim() : "", requestedAt],
    function (err) {
      if (err) {
        return sendError(res, "Could not schedule pickup.");
      }
      res.json({
        success: true,
        id: this.lastID,
        userId: Number(userId),
        address: address.trim(),
        slot: slot.trim(),
        deviceDetails: deviceDetails || "",
        status: "Scheduled",
        requestedAt,
        trackingId: `ECO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        message: "Pickup scheduled successfully"
      });
    }
  );
});

app.get("/api/pickups", (req, res) => {
  const userId = Number(req.query.userId || 0);
  if (!userId) {
    return sendError(res, "userId is required.");
  }

  db.all(
    "SELECT id, address, slot, deviceDetails, status, requestedAt FROM pickups WHERE userId = ? ORDER BY requestedAt DESC",
    [userId],
    (err, rows) => {
      if (err) {
        return sendError(res, "Could not load pickups.");
      }
      res.json(rows);
    }
  );
});

// Recycling Centers Database
const recyclingCenters = [
  { id: 1, name: "GreenTech Recycling", lat: 28.6139, lng: 77.2090, address: "123 Eco Street, Tech Park, Delhi", status: "Open", rating: 4.8, reviews: 342, workingHours: "9:00 AM - 6:00 PM", services: ["E-Waste", "Plastic", "Metal", "Glass"], icon: "♻️", color: "#2DC653" },
  { id: 2, name: "CleanEarth Center", lat: 28.5244, lng: 77.1855, address: "456 Green Avenue, City Center, Delhi", status: "Open", rating: 4.7, reviews: 289, workingHours: "8:00 AM - 7:00 PM", services: ["E-Waste", "Paper", "Cardboard"], icon: "🌿", color: "#2DC653" },
  { id: 3, name: "EcoHub Facility", lat: 28.5567, lng: 77.2273, address: "789 Nature Lane, South Delhi", status: "Open", rating: 4.9, reviews: 418, workingHours: "10:00 AM - 6:00 PM", services: ["E-Waste", "Batteries", "Metals"], icon: "🌍", color: "#00B4D8" },
  { id: 4, name: "Sustainable Solutions", lat: 28.6292, lng: 77.0639, address: "321 Eco Park, West Delhi", status: "Closed", rating: 4.5, reviews: 156, workingHours: "9:00 AM - 5:00 PM", services: ["E-Waste", "Plastic", "Hazardous"], icon: "♻️", color: "#2DC653" },
  { id: 5, name: "Green Depot", lat: 28.4089, lng: 77.3178, address: "654 Recycle Road, East Delhi", status: "Open", rating: 4.6, reviews: 201, workingHours: "8:30 AM - 6:30 PM", services: ["E-Waste", "Glass", "Composting"], icon: "🌱", color: "#2DC653" },
];

// Coupons Database
const coupons = [
  { id: "amazon10", brand: "Amazon", discount: "10% off", pts: 200, icon: "🛍️", description: "On orders above ₹500", active: true },
  { id: "flipkart150", brand: "Flipkart", discount: "₹150 off", pts: 300, icon: "📦", description: "On electronics above ₹1000", active: true },
  { id: "paytm50", brand: "Paytm", discount: "₹50 cash", pts: 150, icon: "💸", description: "Add money to wallet", active: true },
  { id: "swiggy", brand: "Swiggy", discount: "Free delivery", pts: 100, icon: "🍔", description: "On orders above ₹300", active: true },
  { id: "zomato", brand: "Zomato", discount: "₹100 off", pts: 250, icon: "🍕", description: "On orders above ₹500", active: true },
  { id: "bookmyshow", brand: "BookMyShow", discount: "₹200 off", pts: 400, icon: "🎬", description: "On movie tickets", active: true },
];

// Calculate distance between two coordinates
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Get nearby centers
app.get("/api/centers/nearby", (req, res) => {
  const userLat = parseFloat(req.query.lat) || 28.6139;
  const userLng = parseFloat(req.query.lng) || 77.2090;
  
  const centersWithDistance = recyclingCenters
    .map(center => ({
      ...center,
      distance: calculateDistance(userLat, userLng, center.lat, center.lng)
    }))
    .sort((a, b) => a.distance - b.distance);
  
  res.json(centersWithDistance);
});

// Get all coupons
app.get("/api/coupons", (req, res) => {
  res.json(coupons.filter(c => c.active));
});

// Redeem coupon
app.post("/api/coupons/redeem", (req, res) => {
  const { userId, couponId, points } = req.body;
  if (!userId || !couponId) {
    return sendError(res, "userId and couponId are required");
  }
  
  const coupon = coupons.find(c => c.id === couponId);
  if (!coupon) {
    return sendError(res, "Coupon not found", 404);
  }
  
  // Update user points in database
  db.run(
    "UPDATE users SET points = points - ? WHERE id = ?",
    [coupon.pts, userId],
    function(err) {
      if (err) {
        return sendError(res, "Could not redeem coupon");
      }
      
      res.json({
        success: true,
        couponCode: `ECO${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        coupon: coupon,
        message: "Coupon redeemed successfully"
      });
    }
  );
});

// Save a center
app.post("/api/centers/save", (req, res) => {
  const { userId, centerId } = req.body;
  if (!userId || !centerId) {
    return sendError(res, "userId and centerId are required");
  }
  
  const center = recyclingCenters.find(c => c.id === centerId);
  if (!center) {
    return sendError(res, "Center not found", 404);
  }
  
  res.json({ success: true, center, message: "Center saved successfully" });
});

// Get user rewards
app.get("/api/rewards", (req, res) => {
  const userId = Number(req.query.userId || 0);
  if (!userId) {
    return sendError(res, "userId is required");
  }
  
  db.get(
    "SELECT points FROM users WHERE id = ?",
    [userId],
    (err, row) => {
      if (err) {
        return sendError(res, "Could not load rewards");
      }
      if (!row) {
        return sendError(res, "User not found", 404);
      }
      
      res.json({
        totalPoints: row.points,
        availablePoints: row.points,
        currentTier: row.points >= 1000 ? "Platinum" : row.points >= 500 ? "Gold" : "Silver"
      });
    }
  );
});

app.get("/api/ping", (req, res) => {
  res.json({ status: "ok" });
});

async function startServer() {
  initializeDatabase();

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true } });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`EcoCycle server running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error(error);
  process.exit(1);
});
