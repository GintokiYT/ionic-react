import { IonContent, IonHeader, IonImg, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

interface User {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

interface Props {
  user: User
}

const UserComponent: React.FC<Props> = ({user}) => {

  return (
    <IonItem lines='none'>
      <div className='w-full flex gap-2 p-2'>
        <img 
          className='w-[48px] h-[48px] rounded-[48px]'
          src={ user.thumbnailUrl }
          alt={ user.url }
        />
        <IonLabel>{ user.title }</IonLabel>
      </div>
    </IonItem>
  )
}

const Home: React.FC = () => {

  const [ users, setUsers ] = useState<User[]>([]);

  const getData = () => {
    fetch('https://jsonplaceholder.typicode.com/photos')
    .then( res => res.json())
    .then( (data: User[]) => setUsers(data))
    .catch( error => console.log('error: ', error))
    .finally(() => console.log(users));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle class='text-center text-white'>Header</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class='w-full h-full flex flex-col bg-slate-950'>  
        <Virtuoso
          className='flex-1'
          totalCount={users.length}
          itemContent={ (index) => <UserComponent user={users[index]}/>}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
