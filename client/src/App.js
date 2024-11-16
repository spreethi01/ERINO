import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DialogBox from './component/DialogBox';


function App() {
  const [data, setData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [eData, setEData] = useState({
    'First Name': '',
    'Last Name': '',
    'Email': '',
    'Phone Number': '',
    'Company': '',
    'Job Title': ''
  })

  const handleDelete = (data) => {
    axios.delete(`http://localhost:4000/contact?fName=${data["First Name"]}&lName=${data["Last Name"]}`)
      .then((response) => {

        setData((prevData) => {
          return prevData.filter((contact) => contact["First Name"] != response.data.data["First Name"]);
        });

        handleCloseDialog();
      })
      .catch((error) => {
        console.error('Error delete contact:', error.response?.data || error.message);

        alert(
          `Failed to delete contact: ${error.response?.data?.message || error.message || 'Unknown error'
          }`
        );
      });

  }

  const handleOpenDialog = (event, data) => {
    setTitle(event == 'add' ? 'Add Contact' : 'Edit Contact');
    setEData(event == 'add' ?
      {
        'First Name': '',
        'Last Name': '',
        'Email': '',
        'Phone Number': '',
        'Company': '',
        'Job Title': ''
      } :
      {
        'First Name': data['First Name'],
        'Last Name': data['Last Name'],
        'Email': data['Email'],
        'Phone Number': data['Phone Number'],
        'Company': data['Company'],
        'Job Title': data['Job Title']
      }
    )
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleFormSubmit = (formData) => {

    if (title === 'Add Contact') {
      axios.post('http://localhost:4000/contact', {
        fName: formData.firstName,
        lName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phone,
        company: formData.company,
        jobTitle: formData.jobTitle
      })
        .then((response) => {

          setData((prevData) => [...prevData, response.data.data]);

          handleCloseDialog();
        })
        .catch((error) => {
          console.error('Error adding contact:', error.response?.data || error.message);

          alert(
            `Failed to add contact: ${error.response?.data?.message || error.message || 'Unknown error'
            }`
          );
        });
    } else {

      axios
        .put(`http://localhost:4000/contact/`, {
          fName: formData.firstName,
          lName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phone,
          company: formData.company,
          jobTitle: formData.jobTitle
        })
        .then((response) => {

          setData((prevData) => {
            return prevData.map((contact) =>
              contact["First Name"] === response.data.data["First Name"]
                ? response.data.data
                : contact
            );
          });

          handleCloseDialog();
        })
        .catch((error) => {
          console.error('Error editing contact:', error.response?.data || error.message);

          alert(
            `Failed to edit contact: ${error.response?.data?.message || error.message || 'Unknown error'
            }`
          );
        });
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost:4000/contact')
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <div className="app-container">
      <header className="header">
        <div className="header-actions">
          <button className="btn-primary" onClick={() => handleOpenDialog('add')}>+ Add New Contact</button>

          <input
            type="text"
            placeholder="Search contacts..."
            className="search-bar"
          />
        </div>
        <button className="btn-secondary">Filter</button>
      </header>
      <main className="content">
        <div className="table-wrapper">
          <table className="contact-table">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Job Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>1</td>
                      <td>{item['First Name']}</td>
                      <td>{item['Last Name']}</td>
                      <td>{item['Email']}</td>
                      <td>{item['Phone Number']}</td>
                      <td>{item['Company']}</td>
                      <td>{item['Job Title']}</td>
                      <td className="actions">
                        <button className="btn-edit" onClick={() => handleOpenDialog('edit', item)}>Edit</button>
                        <button className="btn-delete" onClick={() => handleDelete({ "First Name": item["First Name"], 'Last Name': item['Last Name'] })}>Delete</button>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </main>
      <DialogBox
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        title={title + ' dialog'}
        onSubmit={handleFormSubmit}
        data={eData}
      />
    </div>
  );
}

export default App;
