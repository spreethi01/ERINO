import React, { useEffect, useState } from 'react';
import './DialogBox.css';

const DialogBox = ({ isOpen, onClose, title, onSubmit, data }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: ''
    });

    useEffect(() => {
        if (data) {
            setFormData({
                firstName: data['First Name'] || '',
                lastName: data['Last Name'] || '',
                email: data['Email'] || '',
                phone: data['Phone Number'] || '',
                company: data['Company'] || '',
                jobTitle: data['Job Title'] || ''
            });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                <div className="dialog-header">
                    <h2>{title}</h2>
                    <button className="close-btn" onClick={onClose}>X</button>
                </div>
                <div className="dialog-content">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                placeholder="Enter first name"
                                readOnly={title === 'Edit Contact dialog'}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                placeholder="Enter last name"
                                readOnly={title === 'Edit Contact dialog'}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter email"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="Enter phone number"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="company">Company</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                required
                                placeholder="Enter company name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="jobTitle">Job Title</label>
                            <input
                                type="text"
                                id="jobTitle"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                required
                                placeholder="Enter job title"
                            />
                        </div>

                        <div className="dialog-footer">
                            <button className="btn cancel-btn" type="button" onClick={onClose}>Cancel</button>
                            <button className="btn submit-btn" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DialogBox;
