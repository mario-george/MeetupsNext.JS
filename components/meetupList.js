import Meetup from './Meetup';

const DUMMY_MEETUPS = [
  {
    id: 'D1',
    title: 'first Meetup',
    description: 'first Meetup description',
    address: 'Addrss 1 ',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlnV1Ay4NLCdYwFKV92-9Gc5wqU8ov8ZfuLw&usqp=CAU',
  },
  {
    id: 'D2',
    title: 'second Meetup',
    description: 'second Meetup description',
    address: 'Addrss 2 ',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlnV1Ay4NLCdYwFKV92-9Gc5wqU8ov8ZfuLw&usqp=CAU',
  },
];

const MeetupList = (props) => {
  return (
    <>
      {props.meetups.map((m) => {
        return <Meetup m={m} key={m.id} />;
      })}
    </>
  );
};
export default MeetupList;
