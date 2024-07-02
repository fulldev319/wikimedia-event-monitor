const express = require("express");
const EventSource = require("eventsource");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const eventSource = new EventSource(
    "https://stream.wikimedia.org/v2/stream/recentchange"
  );

  eventSource.onmessage = function (event) {
    res.write(`data: ${event.data}\n\n`);
  };

  eventSource.onerror = function (err) {
    console.error("Error:", err);
    res.status(500).send("Error receiving events");
  };

  req.on("close", () => {
    eventSource.close();
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
