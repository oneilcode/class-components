import { useUserStore } from '../store/use-users-store';

export const UserList = () => {
  const users = useUserStore((state) => state.users);

  return (
    <div className="cards-container">
      {users.map((user) => (
        <div key={user.id} className="card">
          <div className="card-header">
            <h3 className="card-name">{user.name}</h3>
            <span className="card-gender">{user.gender}</span>
          </div>

          <div className="card-details">
            <p>📧 {user.email}</p>
            <p>🎂 {user.age} years old</p>
          </div>

          {user.file && (
            <div className="card-image">
              <img src={user.file} alt={user.name} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
