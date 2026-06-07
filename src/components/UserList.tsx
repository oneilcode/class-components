import { useEffect, useRef, useState } from 'react';
import { useUserStore } from '../store/use-users-store';

export const UserList = () => {
  const users = useUserStore((state) => state.users);
  const [highlightedUser, setHighlightedUser] = useState(null);
  const prevLengthRef = useRef(users.length);

  useEffect(() => {
    if (users.length > prevLengthRef.current) {
      const lastUser = users[users.length - 1];
      setHighlightedUser(lastUser.id);

      const timer = setTimeout(() => {
        setHighlightedUser(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [users.length, users]);

  return (
    <div className="cards-container">
      {users.map((user) => (
        <div
          key={user.id}
          className={highlightedUser === user.id ? 'highlight card' : 'card'}
        >
          <div className="card-header">
            <h3 className="card-name">{user.name}</h3>
            <span className="card-gender">{user.gender}</span>
          </div>

          <div className="card-details">
            <p>📧 {user.email}</p>
            <p>🎂 {user.age} years old</p>
            <p>🏙️ {user.country}</p>
          </div>

          {user.file ? (
            <div className="card-image">
              <img src={user.file} alt={user.name} />
            </div>
          ) : (
            <div className="card-image">
              <img src="src/assets/react.svg" alt={user.name} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
