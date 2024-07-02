import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EventStream.css";
import FilterControls from "./FilterControls";

const EventStream = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const eventSource = new EventSource(
      "https://stream.wikimedia.org/v2/stream/recentchange"
    );

    eventSource.onmessage = function (event) {
      const eventData = JSON.parse(event.data);
      setEvents((prevEvents) => [eventData, ...prevEvents]);

      // Notify the user for events of interest
      if (eventData.title.includes("specific keyword")) {
        toast(`New event: ${eventData.title}`);
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const markAsSeen = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const filteredEvents = events.filter((event) => {
    return Object.keys(filters).every((filterKey) => {
      return event[filterKey] && event[filterKey].includes(filters[filterKey]);
    });
  });

  return (
    <div>
      <FilterControls onFilterChange={handleFilterChange} />
      <ToastContainer />
      {filteredEvents.map((event) => (
        <div key={event.id} className="event">
          <h3>{event.title}</h3>
          <p>{event.comment}</p>
          <button onClick={() => markAsSeen(event.id)}>Mark as Seen</button>
        </div>
      ))}
    </div>
  );
};

export default EventStream;
