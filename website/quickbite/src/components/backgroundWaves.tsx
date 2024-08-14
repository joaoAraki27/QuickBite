import Wave from "react-wavify";

const Waves = () => {
    return (
        <div className="waves-container">
            {/* top waves */}
            <Wave
                fill="#E5383B"
                paused={false}
                style={{ position: "absolute", top: 40, width: "100%", height: "30%", opacity: 1 ,transform: "rotate(180deg)", zIndex: -1}}
                options={{
                    height: 20,
                    amplitude: 40,
                    speed: 0.30,
                    points: 3,
                }}
            />
            <Wave
                fill="#BA181B"
                paused={false}
                style={{ position: "absolute", top: 20, width: "100%",height: "25%", opacity: 1, transform: "rotate(180deg)", zIndex: -1}}
                options={{
                    height: 20,
                    amplitude: 40,
                    speed: 0.25,
                    points: 3,
                }}
            />
            <Wave
                fill="#A4161A"
                paused={false}
                style={{ position: "absolute", top: 0, width: "100%",height: "20%", opacity: 1, transform: "rotate(180deg)", zIndex: -1 }}
                options={{
                    height: 20,
                    amplitude: 40,
                    speed: 0.20,
                    points: 3,
                }}
            />
        <div className="waves-container-bottom">
            {/* bottom waves */}
            {/* <Wave
                fill="#E5383B"
                paused={false}
                style={{ position: "absolute", bottom: 40, width: "100%",height: "25%", opacity: 1 }}
                options={{
                    height: 20,
                    amplitude: 40,
                    speed: 0.35,
                    points: 3,
                }}
            />
            <Wave
                fill="#BA181B"
                paused={false}
                style={{ position: "absolute", bottom: 20, width: "100%",height: "20%", opacity: 1 }}
                options={{
                    height: 20,
                    amplitude: 40,
                    speed: 0.3,
                    points: 3,
                }}
            /> */}
            <Wave
                fill="#A4161A"
                paused={false}
                style={{ position: "absolute", bottom: 0, width: "100%",height: "15%", opacity: 1}}
                options={{
                    height: 20,
                    amplitude: 40,
                    speed: 0.25,
                    points: 3,
                }}
            />
            </div>
        </div>
    );
};

export default Waves;
