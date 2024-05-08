import { useEffect, useState } from 'react';
import contactsData from '../../mocks/contacts.json';
import ContactsList from './components/ContactsList/ContactsList';
import SearchBox from './components/SearchBox/SearchBox';
import { Person } from './model';
import "./ContactsPage.css";

export default function ContactsPage() {
  // sortedContacts
  const sortedContacts = (contactsData as Person[]).sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  })
  const [contacts, setContacts] = useState<Person[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // load contacts
  useEffect(() => {
    console.log(currentPage)
    loadContacts();
  }, [currentPage]);

  // listen to scroll event
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  // load contacts based on the currentPage
  const loadContacts = () => {
    const startIndex = currentPage === 1 ? 0 : currentPage * 50;
    const endIndex = startIndex + 50;
    console.log(startIndex, endIndex)
    const newContacts = (sortedContacts as Array<Person>).slice(startIndex, endIndex);
    setContacts(prevContacts => [...prevContacts, ...newContacts]);
  }

  // increment currentPage when user scrolls to the bottom (infinite scroll)
  const handleScroll = () => {
    if(Math.round(document.documentElement.getBoundingClientRect().bottom) <= window.innerHeight) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  }

  const handleSearchInputChange = (event: any) => {
    setSearchQuery(event?.target?.value ?? "");
  }

  const filteredContacts = contacts.filter(contact => contact.name.includes(searchQuery))
  

  return (
    <div className="contacts-page">
      <h1>Contact List</h1>
      <div className="contacts-container">
        <SearchBox onInputChange={handleSearchInputChange} />
        { filteredContacts?.length > 0 ? <ContactsList contacts={filteredContacts} /> : <div> {'No Results found matching with the search query!'} </div>}
      </div>
    </div>
  );
}
