import { PiDogBold, PiTicketBold } from "react-icons/pi";
import { GiForestCamp } from "react-icons/gi";
import { GrWheelchair } from "react-icons/gr";
import { TbParking, TbTent } from "react-icons/tb";

export default function Amenities() {
    return (
        <>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <GrWheelchair className="" />
                <input type="checkbox" className="accent-primary" />
                <span>Wheelchair access</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <TbParking className="" />
                <input type="checkbox" className="accent-primary" />
                <span>Parking at trailhead</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <TbTent className="" />
                <input type="checkbox" className="accent-primary" />
                <span>Campsite</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <PiTicketBold className="" />
                <input type="checkbox" className="accent-primary" />
                <span>Permit required</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <PiDogBold className="" />
                <input type="checkbox" className="accent-primary" />
                <span>Pets Allow</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <GiForestCamp className="" />
                <input type="checkbox" className="accent-primary" />
                <span>Backcountry</span>
            </label>
        </>
    );
}
