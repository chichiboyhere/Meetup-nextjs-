import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  /**Function runs during the build(page-loading process) */
  // fetch data from api
  const client = await MongoClient.connect(
    "mongodb+srv://chichiboyhere:okutupi@cluster0.wkkq2bj.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    // revalidate: 10 // for rerendering data
  };
}

// export async function getServerSideProps(context){
//    /**runs on the server after deployment. This is best suited for server being updated very frequently */
//    const req = context.req;
//    const res = context.res;
//    return{
//     props:{
//         meetups: DUMMY_MEETUPS
//     }
//    }
// }
export default HomePage;
