import React, { useState } from "react";
import toast from "react-hot-toast";
import { push, ref, set } from "firebase/database";
import { db } from "../../../firebase";

const MessageForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      return toast.error("Please fill all fields");
    }

    try {
      setIsSending(true);
      const messagesRef = ref(db, "messages");
      const newMessageRef = push(messagesRef);

      await set(newMessageRef, {
        name,
        email,
        message,
        createdAt: new Date().toISOString(),
      });

      toast.success("Message sent successfully");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form className="mform" onSubmit={handleSendMessage}>
      <p className="section-eyebrow">Send Us Message</p>
      <h2>We are here to help with appointments, support, and guidance</h2>
      <p className="message-intro">
        Share your concern and our team will get back to you with the right
        support as quickly as possible.
      </p>

      <div className="message-form-grid">
        <label className="message-field">
          <span>Full Name</span>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="message-field">
          <span>Email Address</span>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>

      <label className="message-field">
        <span>Your Message</span>
        <textarea
          placeholder="Tell us how we can help you"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </label>

      <div className="message-form-footer">
        <div className="message-assurance">
          <i className="fa-solid fa-shield-heart"></i>
          <span>Your details stay secure with our team.</span>
        </div>

        <button className="btn message-submit-btn" type="submit" disabled={isSending}>
          {isSending ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
