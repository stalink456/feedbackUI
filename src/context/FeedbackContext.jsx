import React, { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  //FetchFeedback
  const fetchFeedback = async () => {
    const response = await fetch(`${process.env.REACT_APP_URL_DB}`);
    const data = await response.json();

    setFeedback(data);
    setIsLoading(false);
  };

  //delete current items
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you wonna sure delete this item?!")) {
      await fetch(`${process.env.REACT_APP_URL_DB}/${id}`, {
        method: "DELETE",
      });

      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  //add new items
  const addFeedback = async (newFeedback) => {
    const response = await fetch(`${process.env.REACT_APP_URL_DB}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();

    setFeedback([data, ...feedback]);
  };

  //update item
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`${process.env.REACT_APP_URL_DB}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updItem),
    });

    const data = await response.json();

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  //set item to updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
