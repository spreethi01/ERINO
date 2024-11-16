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
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10); // Set your desired page limit

  const fetchContacts = () => {
    axios
      .get('http://localhost:4000/contact', {
        params: {
          page: currentPage,
          limit: limit,
        },
      })
      .then((response) => {
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  // Call fetchContacts when page or search query changes
  useEffect(() => {
    fetchContacts();
  }, [currentPage]);

  const handleDelete = (data) => {
    axios.delete(`http://localhost:4000/contact?fName=${data["First Name"]}&lName=${data["Last Name"]}`)
      .then((response) => {
        setData((prevData) => {
          return prevData.filter((contact) => contact["First Name"] + contact["Last Name"] !== response.data.data["First Name"] + response.data.data["Last Name"]);
        });
        handleCloseDialog();
      })
      .catch((error) => {
        console.error('Error delete contact:', error.response?.data || error.message);
        alert(`Failed to delete contact: ${error.response?.data?.message || error.message || 'Unknown error'}`);
      });
  };

  const handleOpenDialog = (event, data) => {
    setTitle(event === 'add' ? 'Add Contact' : 'Edit Contact');
    setEData(event === 'add'
      ? { 'First Name': '', 'Last Name': '', 'Email': '', 'Phone Number': '', 'Company': '', 'Job Title': '' }
      : {
        'First Name': data['First Name'],
        'Last Name': data['Last Name'],
        'Email': data['Email'],
        'Phone Number': data['Phone Number'],
        'Company': data['Company'],
        'Job Title': data['Job Title']
      });
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
          alert(`Failed to add contact: ${error.response?.data?.message || error.message || 'Unknown error'}`);
        });
    } else {
      axios.put(`http://localhost:4000/contact/`, {
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
          alert(`Failed to edit contact: ${error.response?.data?.message || error.message || 'Unknown error'}`);
        });
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-actions">
          <button className="btn-primary" onClick={() => handleOpenDialog('add')}>+ Add New Contact</button>
        </div>
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
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{(currentPage - 1) * limit + index + 1}</td>
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
                ))
              ) : (
                <tr>
                  <td colSpan="8">No contacts found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          <button
            className="btn-page"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>{`Page ${currentPage} of ${totalPages}`}</span>

          <button
            className="btn-page"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
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
