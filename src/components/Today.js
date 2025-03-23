const Today = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const today = new Date();
    const currentDay = days[today.getDay()];
    const currentDate = `${today.getDate()} ${months[today.getMonth()]}, ${today.getFullYear()}`;

    return (
        <div className="font-sans">
            <div className="text-3xl font-bold">{currentDay}</div>
            <div className="text-lg text-gray-600">{currentDate}</div>
        </div>
    );
}
 
export default Today;
