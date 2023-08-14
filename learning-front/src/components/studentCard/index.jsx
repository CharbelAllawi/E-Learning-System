import './styles.css'

const StudentCard = ({childName, onCall}) => {
    const border_colors = [
        'rgb(255, 153, 0)',
        'rgb(0, 123, 255)',
        'rgba(0, 255, 13)',
        'rgb(128, 0, 128)',
        'rgb(255, 0, 0)',
        'rgb(0, 255, 255)',
        'rgb(255, 255, 0)',
        'rgb(128, 128, 128)'
    ];

    const colors = [
        'rgba(255, 153, 0, 0.1)',
        'rgba(0, 123, 255, 0.1)',
        'rgba(0, 255, 13, 0.1)',
        'rgba(128, 0, 128, 0.1)',
        'rgba(255, 0, 0, 0.1)',
        'rgba(0, 255, 255, 0.1)',
        'rgba(255, 255, 0, 0.1)',
        'rgba(128, 128, 128, 0.1)'
    ];
    const random_number = Math.floor(Math.random() * colors.length)
    const random_color = colors[random_number];
    const random_border_color = border_colors[random_number];
    
    return ( 
        <div onClick={onCall} className='student-card' style={ {backgroundColor: random_color, borderLeft: `3px solid ${random_border_color}`}}>
            <span className='student-card-name-text'>{childName}</span>
        </div>
    );
}

export default StudentCard;