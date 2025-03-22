const WindDirection = () => {

    const voiceArray = [
        "Beep boop",
        "Bop-bop",
        "Wip bop",
        "Bweeeeee",
        "*R2-D2 scream*",
        "Bee bop",
        "Ding!",
        "do-do-do"
    ];
    const randomNumber = Math.floor(Math.random() * 8);
    const voice = voiceArray[randomNumber]

    const directionArray = [
        " the wind is blowing North",
        " the wind is blowing North East",
        " the wind is blowing East",
        " the wind is blowing South East",
        " the wind is blowing South",
        " the wind is blowing South West",
        " the wind is blowing West",
        " the wind is blowing North West",
    ]
    const writtenDirection = " the wind is blowing north east" //change to logic

    return (
        <div>
            <div>
                <p>{ voice }{ writtenDirection }</p>
            </div>
        </div>
    );
}
 
export default WindDirection