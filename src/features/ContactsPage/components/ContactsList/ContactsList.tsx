import { Person } from "../../model";
import "./ContactsList.css"

const ContactsList: React.FC<{ contacts: Person[] }> = ({ contacts }) => {
    return ( 
        <div className='contacts-list'>
        {(contacts as Person[]).map((contact, index) => 
            (
                contacts[index - 1]?.name?.charAt(0) === contact?.name?.charAt(0) 
                ?
                    <div className="contact" key={contact.id + Math.random()}> 
                        <p>{contact.name }</p>
                    </div> 
                : 
                    <div className="contact" key={contact.id + Math.random()}>
                        <h3 >{contact?.name?.charAt(0)}</h3>
                        <div> 
                            <p>{contact.name }</p>
                        </div>
                    </div>
            )
        )}
        </div>
    )
}

export default ContactsList;