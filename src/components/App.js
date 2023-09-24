import React, { useState, useEffect } from 'react';
import '../styles/App.css';



// Sample response from api below, dont use this data
// {
//   results: [
//     {
//       gender: "female",
//       name: {
//         title: "Miss",
//         first: "Zara",
//         last: "White"
//       },
//       location: {
//         street: {
//           number: 9548,
//           name: "Wairau Road"
//         },
//         city: "Hamilton",
//         state: "Tasman",
//         country: "New Zealand",
//         postcode: 52652,
//         coordinates: {
//           latitude: "68.0268",
//           longitude: "114.0576"
//         },
//         timezone: {
//           offset: "-1:00",
//           description: "Azores, Cape Verde Islands"
//         }
//       },
//       email: "zara.white@example.com",
//       login: {
//         uuid: "fd26ff4c-794a-41d9-bc82-c79997d6309b",
//         username: "bigrabbit521",
//         password: "liang",
//         salt: "JsOd1LTX",
//         md5: "c60353ef1d02626f8afcb50bc80baac2",
//         sha1: "2a0aea755e22c24f52a75b6b972af4e32a892997",
//         sha256: "f01f1d678bebaec80d452621a9a81f78296079a0c3fdb9bea24d1a74561863d2"
//       },
//       dob: {
//         date: "1978-03-29T10:36:08.698Z",
//         age: 44
//       },
//       registered: {
//         date: "2012-09-08T19:40:27.630Z",
//         age: 10
//       },
//       phone: "(483)-206-7882",
//       cell: "(986)-684-2134",
//       id: {
//         name: "",
//         value: null
//       },
//       picture: {
//         large: "https://randomuser.me/api/portraits/women/60.jpg",
//         medium: "https://randomuser.me/api/portraits/med/women/60.jpg",
//         thumbnail: "https://randomuser.me/api/portraits/thumb/women/60.jpg"
//       },
//       nat: "NZ"
//     }
//   ],
//     info: {
//     seed: "00bf0e8b7e323357",
//       results: 1,
//         page: 1,
//           version: "1.3"
//   }
// }
const App = () => {
  
  const [user, setUser] = useState(null);
  const [showInfo, setShowInfo] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      setUser(data.results[0]);
      setShowInfo(null); // Reset the displayed info
    } catch (error) {
      console.error('Error fetching random user:', error);
    }
  };

  const handleClick = (attribute) => {
    setShowInfo(attribute);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div id="main">
      <h1>Random User Info</h1>
      {user && (
        <div>
          <img src={user.picture.large} alt="image" />
          <p>{`${user.name.first} ${user.name.last}`}</p>
        </div>
      )}
      <div>
        <h2>Additional Info</h2>
        <button data-attr="age" onClick={() => handleClick('age')}>
          Age
        </button>
        <button data-attr="email" onClick={() => handleClick('email')}>
          Email
        </button>
        <button data-attr="phone" onClick={() => handleClick('phone')}>
          Phone
        </button>
        {showInfo && (
          <p>
            {showInfo === 'age' && user ? `Age: ${user.dob.age}` : null}
            {showInfo === 'email' && user ? `Email: ${user.email}` : null}
            {showInfo  === 'phone' && user ? `Phone: ${user.phone}` : null}
          </p>
        )}
      </div>
      <button id="getUser" onClick={fetchUser}>
        Get Another User
      </button>
    </div>
  );
}


export default App;
