import React, { useState } from 'react';
import styles from './pruebaGrid.module.scss';

interface UserCardProps {
  name: string;
  imageUrl: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, imageUrl }) => {
  return (
    <div className={styles.user_card}>
      <img src={imageUrl} alt={name} className={styles.user_image} />
      <p className={styles.user_name}>{name}</p>
    </div>
  );
};

const UserGrid: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Usuario 1', imageUrl: 'https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2Ftmchrxrasnf51.jpg%3Fauto%3Dwebp%26s%3D5dd6b3b59969d258d069e3ce1b2621e7643b8d53' },
    { id: 2, name: 'Usuario 2', imageUrl: 'https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2Ftmchrxrasnf51.jpg%3Fauto%3Dwebp%26s%3D5dd6b3b59969d258d069e3ce1b2621e7643b8d53' },
    { id: 3, name: 'Usuario 3', imageUrl: 'https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2Ftmchrxrasnf51.jpg%3Fauto%3Dwebp%26s%3D5dd6b3b59969d258d069e3ce1b2621e7643b8d53' },
    { id: 4, name: 'Usuario 4', imageUrl: 'https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2Ftmchrxrasnf51.jpg%3Fauto%3Dwebp%26s%3D5dd6b3b59969d258d069e3ce1b2621e7643b8d53' },
    { id: 5, name: 'Usuario 5', imageUrl: 'https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2Ftmchrxrasnf51.jpg%3Fauto%3Dwebp%26s%3D5dd6b3b59969d258d069e3ce1b2621e7643b8d53' },
    { id: 6, name: 'Usuario 6', imageUrl: 'https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2Ftmchrxrasnf51.jpg%3Fauto%3Dwebp%26s%3D5dd6b3b59969d258d069e3ce1b2621e7643b8d53' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  
  const availableImages = [
    "https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2Ftmchrxrasnf51.jpg%3Fauto%3Dwebp%26s%3D5dd6b3b59969d258d069e3ce1b2621e7643b8d53",  
    "https://m.media-amazon.com/images/I/5154d3BdWfL._AC_UF894,1000_QL80_.jpg",  
    "https://www.sopitas.com/wp-content/uploads/2018/10/Mapache-3.png",  
    "https://st.depositphotos.com/5447696/61629/i/450/depositphotos_616297704-stock-photo-raccoon-racoon-common-north-american.jpg",  
    "https://img.freepik.com/fotos-premium/mapache-gordo-sentado-suelo-bosque_87934-1465.jpg"  
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddUser = () => {
    if (newUserName && selectedImageUrl) {
      const newUser = {
        id: users.length + 1,
        name: newUserName,
        imageUrl: selectedImageUrl,
      };
      setUsers([...users, newUser]);
      setNewUserName('');
      setSelectedImageUrl('');
      closeModal();
    }
  };

  return (
    <div className={styles.user_grid_container}>
      <div className={styles.user_grid}>
        {users.map((user) => (
          <UserCard key={user.id} name={user.name} imageUrl={user.imageUrl} />
        ))}
      </div>
      <button className={styles.add_profile_btn} onClick={openModal}>+</button>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <h2>Añadir nuevo perfil</h2>
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Nombre del perfil"
              className={styles.input}
            />
            <div className={styles.image_selection}>
              <h3>Seleccionar imagen</h3>
              <div className={styles.image_options}>
                {availableImages.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`opcion-${index}`}
                    className={`${styles.image_option} ${selectedImageUrl === imageUrl ? styles.selected : ''}`}
                    onClick={() => setSelectedImageUrl(imageUrl)}
                  />
                ))}
              </div>
            </div>
            <div className={styles.modal_buttons}>
              <button onClick={handleAddUser} className={styles.confirm_btn}>Confirmar</button>
              <button onClick={closeModal} className={styles.cancel_btn}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserGrid;
