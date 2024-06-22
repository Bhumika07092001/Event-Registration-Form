import React, { useState} from "react";

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    attendingWithGuest: "No",
    guestName: "",
  });
  const [showResponse, setShowResponse] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.age) newErrors.age = "Age is required";
    else if (isNaN(formData.age) || formData.age <= 0)
      newErrors.age = "Age must be a number greater than 0";
    if (formData.attendingWithGuest === "Yes" && !formData.guestName)
      newErrors.guestName = "Guest name is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResponse(true);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert(
        `Form Submitted\nName: ${formData.name}\nEmail: ${formData.email}\nAge: ${formData.age}\nAttending with Guest: ${formData.attendingWithGuest}\nGuest Name: ${formData.guestName}`
      );
    }
  };

  return (
    <>
      {showResponse ? (
        <div className="response">
          <h2>Thank you for registering!</h2>
          <p>
            <strong>submitted data</strong>
          </p>
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Age:</strong> {formData.age}
          </p>
          <p>
            <strong>Attending as guest:</strong> {formData.attendingWithGuest}
          </p>
          <p>
            <strong>Guest Name:</strong> {formData.guestName}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span>{errors.name}</span>}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
            {errors.age && <span>{errors.age}</span>}
          </div>
          <div>
            <label>Are you attending with a guest?</label>
            <select
              name="attendingWithGuest"
              value={formData.attendingWithGuest}
              onChange={handleChange}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          {formData.attendingWithGuest === "Yes" && (
            <div>
              <label>Guest Name:</label>
              <input
                type="text"
                name="guestName"
                value={formData.guestName}
                onChange={handleChange}
              />
              {errors.guestName && <span>{errors.guestName}</span>}
            </div>
          )}
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
};

export default EventRegistrationForm;
