import React, { useEffect, useState } from "react";
import "./EventStream.css";
import FilterControls from "./FilterControls";

const EventStream = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5000/events");

    eventSource.onmessage = function (event) {
      const eventData = JSON.parse(event.data);
      setEvents((prevEvents) => [eventData, ...prevEvents]);
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
      if (
        filterKey === "minor" ||
        filterKey === "bot" ||
        filterKey === "anonymous"
      ) {
        return filters[filterKey] ? event[filterKey] === true : true;
      } else if (filterKey === "titleRegex") {
        const regex = new RegExp(filters[filterKey], "i");
        return regex.test(event.title);
      } else if (filterKey === "domain") {
        return filters[filterKey]
          ? event.meta.domain.includes(filters[filterKey])
          : true;
      } else if (filterKey === "namespace") {
        return filters[filterKey]
          ? event.namespace.toString() === filters[filterKey]
          : true;
      } else {
        return true;
      }
    });
  });

  return (
    <div>
      <FilterControls onFilterChange={handleFilterChange} />
      {filteredEvents.map((event) => (
        <div key={event.id} className="event">
          <h3>{event.title}</h3>
          <p>
            <strong>Page:</strong>{" "}
            <a href={event.title_url} target="_blank" rel="noopener noreferrer">
              {event.title}
            </a>
          </p>
          <p>
            <strong>Comment:</strong> {event.comment}
          </p>
          <p>
            <strong>User:</strong> {event.user}
          </p>
          <p>
            <strong>Change Type:</strong> {event.type}
          </p>
          <p>
            <strong>Timestamp:</strong>{" "}
            {new Date(event.timestamp * 1000).toLocaleString()}
          </p>
          <p>
            <strong>Domain:</strong> {event.meta.domain}
          </p>
          <p>
            <strong>Namespace:</strong> {event.namespace}
          </p>
          <p>
            <strong>Bot:</strong> {event.bot ? "Yes" : "No"}
          </p>
          <p>
            <strong>Minor:</strong> {event.minor ? "Yes" : "No"}
          </p>
          <button onClick={() => markAsSeen(event.id)}>Mark as Seen</button>
        </div>
      ))}
    </div>
  );
};

export default EventStream;
