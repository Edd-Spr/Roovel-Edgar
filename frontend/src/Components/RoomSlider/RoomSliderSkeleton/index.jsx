import Styles from "./RoomSliderSkeleton.module.css";
//import Styles from "../RoomSlider.module.css";

const RoomSliderSkeleton = () => {

    return (
        <div className={Styles.roomBoxSkeleton}>
            <div className={Styles.roomBoxInfoSkeleton}>
                <div className={Styles.roomAddressSkeleton}></div>
                <div className={Styles.roomAddressSkeleton}></div>
                <div className={Styles.roomAddressSkeleton}></div>
                <div className={Styles.roomAddressSkeleton}></div>
            </div>
        </div>
    );

};

export default RoomSliderSkeleton;