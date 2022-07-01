import classes from './MeetupDetails.module.css'

function MeetupDetails(props) {
    return(
    <segment className={classes.detail}>
        <img src={props.image} alt={props.title} />
        <h1>{props.title}</h1>
        <p>{props.address}</p>
        <p>{props.description}</p>
    </segment>
    )
}
export default MeetupDetails;