import "./styles.css"
import ProgressBar from "@ramonak/react-progress-bar";


const ClassProgress = ({classInfo}) => {
    return ( 
        <div className="progressbar-container">
            {
                classInfo?
                <>
                <h1>{classInfo.title}</h1>
                <ProgressBar 
                    completed={Math.floor(classInfo.completion_rate)}
                    bgColor={'rgb(0, 123, 255)'}
                />
                </>: ""
            }
        </div>
        
        
    );
}

export default ClassProgress;

