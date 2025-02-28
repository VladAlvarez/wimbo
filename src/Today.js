const Today = () => {
    const currentTemp = 13  // switch to data collected from Wimbo stored at AWS
    const currentWindSpeed = 15 // switch to data collected from Wimbo stored at AWS
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const currentDay = days[today.getDay()]; 

    return (
        <div>
            <div>
                <h1>{ currentTemp}C</h1>
                <h1>{ currentWindSpeed }KTS beep</h1>
            </div>
            <div>
                <p>{ currentDay }</p>
            </div>
        </div>
    );
}
 
export default Today;