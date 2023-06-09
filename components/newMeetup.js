import { useRouter } from 'next/router';
import { useRef } from 'react';

export default function NewMeetup() {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const addressRef = useRef();
  const imageRef = useRef();
  const router = useRouter();
  async function submitHandler(event) {
    event.preventDefault();

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const address = addressRef.current.value;
    const image = imageRef.current.value;
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify({ title, description, image, address }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    console.log(data);
    router.push('/');
    //  router.replace('/') if you want to cancel the ability to go back
  }
  return (
    <div className="flex  my-10 justify-start items-center border-2 mx-auto w-1/2 p-2">
      <form
        onSubmit={submitHandler}
        className="flex w-full gap-3 flex-col font-bold">
        <label htmlFor="title">Meetup title</label>
        <input type="text" className="input-field " ref={titleRef} />
        <label htmlFor="title">Meetup Image</label>
        <input type="text" className="input-field" ref={imageRef} />
        <label htmlFor="title">Meetup Address</label>
        <input type="text" className="input-field " ref={addressRef} />
        <label htmlFor="title">Description</label>
        <textarea
          type="text"
          // rows = " " and cols=""
          className="input-field h-[10rem] py-0  "
          ref={descriptionRef}
        />
        <div className="flex w-full  justify-end">
          <button type="submit" className=" add-meetup items-center ">
            Add Meetup
          </button>
        </div>
      </form>
    </div>
  );
}
